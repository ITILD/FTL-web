/**
 * 分块请求渲染几何及模型
 * 几何集中渲染 模型实例化渲染   
 * 状态管理机制
 */
//TODO 加载几何 相机中心改为视锥体？？？
class CesiumPrimitivesProvider {


  /**
   * 分割与取图块分离!!!  切割坐标与OSM一致 经纬度计算（弧度）
   * 初始化视图和相机    每次新加载需要setParams来切瓦块
   * @param {Object} viewer
   *
   */
  constructor(viewer) {
    this.viewer = viewer;
    this.camera = viewer.scene.camera;
  }

  /**
   * 设置切片和加载参数初始化切片状态
   * @param {*} levZ 瓦块级别
   * @param {Number} tilesCountAdd 请求瓦片一侧添加行列数0 1 2
   * @param {Number} requestHeight 开始加载和判定高度
   * @param {Array} renderArrayHeight 渲染距离范围 [最小,最大]
   * @param {*} startDlat 不确定levZ通过单个瓦块内最大纬度差来确定级别   弧度  
   */
  setParams(levZ, tilesCountAdd, requestHeight, renderArrayHeight, startDlat) {
    this.tilesCountAdd = tilesCountAdd;
    this.tilesCount = 2 * this.tilesCountAdd + 1; //每行列数
    this.tilesSize = Math.pow(this.tilesCount, 2); //每次渲染瓦块数
    this.requestHeight = requestHeight;
    this.renderArrayHeight = renderArrayHeight;
    if (levZ) {
      this.levZ = levZ;
    } else if (startDlat) {
      //根据单片纬度差求级别  向下取整
      this.levZ = Math.floor(Math.log(Math.PI / startDlat) / Math.log(2));
    }
    // 瓦片跨越步长  纬度差
    this.dlat = Math.PI / Math.pow(2, this.levZ);
    this.dlon = 2 * this.dlat;

    // 初始设置清空  新的瓦片组 归零
    this.row = 0;
    this.col = 0;
    this.tilesIdArraysOld = [];
    // 待添加和删除
    this.tilesMapWillAdd = new Map(); //id position
    this.tilesSetWillDelete = new Set(); //id
    // 已渲染的
    this.tilesMapRenderNow = new Map(); //{经纬度标号， position，primative，}
  }

  /**
   * 设置监听（包含校准参数） 初始化具体业务
   * @param {Function} featureFunction   分块内业务  空为测试范围块
   */
  startListener(featureFunction) {
    // 外部业务所需参数 TODO cesiumParams endRender改为全局
    this.cesiumParams = {
      viewer: this.viewer,
      camera: this.camera,
      endRender: false,
    };
    // 业务初始化
    this.featureFunction = featureFunction;
    //监听  移动结束（防止移动加载卡顿）this.removeEnd = this.camera.moveEnd.addEventListener
    //监听  比率变化（平滑大数据量卡顿）this.removeChanged = this.camera.changed.addEventListener
    // 
    if (!featureFunction) {
      // 业务为校准方法
      this.featureFunction = this.testCameraBox;
    }
    // console.log("------------开始监听----------", this.removeEnd)
    this.batchRender(); //初次执行再绑定监听  防止范围内直接加载数据不移动相机
    this.removeChanged = this.camera.changed.addEventListener(() => {
      this.batchRender();
    });
  }

  /**
   * 移除监听
   */
  endListener() {
    // this.removeEnd();
    this.removeChanged();
    // 销毁图块状态和渲染
    this.destoryTiles();
    // console.log("------------结束监听----------", this.removeEnd);
  }

  /**
   * 销毁切片
   */
  destoryTiles() {
    // 未请求待渲染 清除
    this.tilesMapWillAdd.clear();
    // 已请求待渲染 停止继续渲染
    this.cesiumParams.endRender = true;

    this.tilesIdArraysOld = [];
    this.tilesMapRenderNow.forEach((primitiveTileDestory, idDestory) => {
      {
        debugger
        // 去除几何
        this.viewer.scene.primitives.remove(primitiveTileDestory);
        // 更新渲染状态
        this.tilesMapRenderNow.delete(idDestory);
      }
    });
  }

  /**
   * 校准参数
   */
  calibration() {
    let cameraPosition = this.camera.positionCartographic;
    // 图块组变化后渲染
    if (cameraPosition.height < this.requestHeight) {
      if (
        this.getTilesArrays(cameraPosition.longitude, cameraPosition.latitude)
      ) {
        //渲染待添加集合内几何数据
        this.tilesMapWillAdd.forEach((positionArrays, id) => {
          // 更新待添加状态
          this.tilesMapWillAdd.delete(id);

          // 测试  换成具体图形业务
          this.testCameraBox(positionArrays, id);
        });
        // 删除范围外图块
        this.tilesSetWillDelete.forEach((tileDelete) => {
          // 更新待删除状态
          this.tilesSetWillDelete.delete(tileDelete);
          // 去除几何
          this.viewer.scene.primitives.remove(
            this.tilesMapRenderNow.get(tileDelete)
          );
          // 更新渲染状态
          this.tilesMapRenderNow.delete(tileDelete);
        });
      }
    }
    // else {  TODO
    //   //离开范围销毁渲染内容 不需要判断 空不循环
    //   this.destoryTiles();
    // }
  }

  /**
   * 校准中 测试图形  无异步问题  不需要设置异步后硬质渲染
   * @param {Array} positionArrays  图块定位数组
   * @param {String} id 图块编号  行_列
   */

  testCameraBox(
    cesiumParams,
    tilesMapRenderNow,
    positionArrays,
    id,
    renderArrayHeight
  ) {
    let viewer = cesiumParams.viewer;
    // 几何
    let primitiveTile = null;
    let greenPolygonInstance = new Cesium.GeometryInstance({
      geometry: Cesium.PolygonGeometry.fromPositions({
        extrudedHeight: 10.0,
        positions: Cesium.Cartesian3.fromDegreesArray(positionArrays),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      }),
      attributes: {
        distanceDisplayCondition: new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(
          renderArrayHeight[0],
          renderArrayHeight[1]
        ),
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.fromRandom({
            alpha: 0.5,
          })
        ),
      },
    });

    primitiveTile = new Cesium.Primitive({
      geometryInstances: [greenPolygonInstance], //绑定一起渲染，效率更高
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
        translucent: false,
      }),
    });
    viewer.scene.primitives.add(primitiveTile);
    // 更新渲染状态
    tilesMapRenderNow.set(id, primitiveTile);
  }

  /**
   * 计算切片 2:1多叉   切片状态管理
   * 通过经纬度获取数据范围
   * @param {*} lon
   * @param {*} lat
   */
  getTilesArrays(lon, lat) {
    // osm  以-180->180(x) 90->-90(y)为坐标轴展开地图，以左上角为原点的经纬度值
    let xLon = Math.PI + lon;
    let yLat = Math.PI / 2 - lat;
    let x = xLon / this.dlon; //levZ级OSM编号 小数 不能直接求余
    let y = yLat / this.dlat;
    //levZ级OSM编号
    let rowNew = Math.floor(y);
    let colNew = Math.floor(x); //向下取整
    let rowChange = rowNew - this.row; //增加的编号 +右移动
    let colChange = colNew - this.col; //+下移动
    if (rowChange == 0 && colChange == 0) {
      return false; //图块无变化
    }

    //取新图块组
    let tilesArrays = [];
    let tilesIdArrays = [];

    let PI = Math.PI;
    let cc2rd = 180 / PI;
    for (let i = -this.tilesCountAdd; i <= this.tilesCountAdd; i++) {
      for (let j = -this.tilesCountAdd; j <= this.tilesCountAdd; j++) {
        // key图块行列号 value 图块四角坐标 [列 行号字符串，[经度，纬度]]
        let tile = { id: colNew + j + " " + (rowNew + i) };
        tile.positionArrays = [
          ((colNew + j) * this.dlon - PI) * cc2rd, //
          (PI / 2 - (rowNew + i) * this.dlat) * cc2rd,
          ((colNew + j + 1) * this.dlon - PI) * cc2rd,
          (PI / 2 - (rowNew + i) * this.dlat) * cc2rd,
          ((colNew + j + 1) * this.dlon - PI) * cc2rd,
          (PI / 2 - (rowNew + i + 1) * this.dlat) * cc2rd,
          ((colNew + j) * this.dlon - PI) * cc2rd,
          (PI / 2 - (rowNew + i + 1) * this.dlat) * cc2rd,
        ];
        // tile.geom = null;
        tilesArrays.push(tile);
        tilesIdArrays.push(tile.id);
      }
    }
    //最新一次的差集 旧集合不含有新集合的部分 删除  array
    let tilesArraysDeleteNew = this.tilesIdArraysOld.filter(
      (id) => !new Set(tilesIdArrays).has(id)
    );
    //最新一次的差集差集 新集合 旧的没有  添加  附带坐标   array包含id等
    let tilesArraysAddNew = tilesArrays.filter(
      (item) => !new Set(this.tilesIdArraysOld).has(item.id)
    );
    // 更新状态
    if (this.tilesIdArraysOld) {
      for (let i = 0; i < tilesArraysDeleteNew.length; i++) {
        this.tilesSetWillDelete.add(tilesArraysDeleteNew[i]);
        this.tilesMapWillAdd.delete(tilesArraysDeleteNew[i]);
      }
    }
    for (let i = 0; i < tilesArraysAddNew.length; i++) {
      this.tilesMapWillAdd.set(
        tilesArraysAddNew[i].id,
        tilesArraysAddNew[i].positionArrays
      );
      // this.tilesSetWillDelete.delete(tilesArraysAddNew[i].id);
    }

    // console.log("旧图块id集合", this.tilesIdArraysOld);
    // console.log("新图块id集合", tilesIdArrays);
    // console.log("新图块集合", tilesArrays);
    // console.log("新图块待删除队列", this.tilesSetWillDelete);
    // console.log("新图块待添加队列", this.tilesMapWillAdd);
    //更新前图块ID
    // 添加 tilesIdArrays.slice()
    // this.tilesIdArraysOld.push(...tilesIdArrays);//删不干净考虑
    this.tilesIdArraysOld = tilesIdArrays.slice();
    this.row = Math.floor(y);
    this.col = Math.floor(x);
    return true;
  }

  /**
   * 批量加载删除
   * @param {*} WFSUrl
   */
  batchRender() {
    // 图块中心点  TODO 视线中心
    let cameraPosition = this.camera.positionCartographic;

    // 图块组变化后渲染
    if (
      cameraPosition.height < this.requestHeight &&
      this.getTilesArrays(cameraPosition.longitude, cameraPosition.latitude) //切片计算
    ) {
      //1渲染待添加集合内几何数据
      this.tilesMapWillAdd.forEach((positionArrays, id) => {
        // 更新待添加状态
        this.tilesMapWillAdd.delete(id);
        this.featureFunction(
          this.cesiumParams,
          this.tilesMapRenderNow,
          positionArrays,
          id,
          this.renderArrayHeight
        );
      });

      // 2删除范围外图块
      this.tilesSetWillDelete.forEach((tileDelete) => {
        // 删除已经渲染的，防止删除已请求但未返回进行渲染
        if (this.tilesMapRenderNow.get(tileDelete)) {
          // 去除几何
          this.viewer.scene.primitives.remove(
            this.tilesMapRenderNow.get(tileDelete)
          );
          // 更新待删除状态
          this.tilesSetWillDelete.delete(tileDelete);
          // 更新渲染状态
          this.tilesMapRenderNow.delete(tileDelete);
        }
      });
    }
  }
}


export { CesiumPrimitivesProvider };