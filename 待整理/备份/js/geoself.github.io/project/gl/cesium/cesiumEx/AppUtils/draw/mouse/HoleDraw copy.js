import { MouseListen } from "../../control/mouse/MouseListen.js"
import { RenderSimple } from '../../primitives/renderGeom/RenderSimple.js'
import { LocalAndWorldTransform } from "../../translate/LocalAndWorldTransform.js"

class HoleDraw extends MouseListen {
  /**
   * 基础绘制类  点线面 （贴地点，贴地线,贴地面） 
   * 自行继承组织点线面切面等几何图形
   * 
   * 单独考虑地形 3dtiles glb切面生成 不支持单切面
   * @param {*} viewer 
   */
  constructor(viewer) {
    super(viewer)
    // 绘制开关  支持种类
    this.holeTerrainDrawBool = false
    this.hole3DtilesDrawBool = false
  }

  stateStart() {
    super.stateStart()
    // 总绘制
    this.PrimitiveAll = this.PrimitiveAll ||
      this.viewer.scene.primitives.add(new Cesium.PrimitiveCollection())

    // 空洞相关
    this.globe = this.viewer.scene.globe
    //// 绘制方向
    this.polygonDirectionStart = null //初始顺逆绘制方向
    this.polygonDirection = null //实时记录

    // 墙面
    this._polygonPrimitives = this.PrimitiveAll.add(new Cesium.PrimitiveCollection()) //真实纯粹多面  非顺序三角面（综合）
    this._holeWallPositions = [] // 单次绘制插值数组
    this._holeDownPositions = null // 单次总绘制数组总底面

    // test!!!
    this._pointPrimitives = this.PrimitiveAll.add(new Cesium.PointPrimitiveCollection()) //默认贴地
  }

  /**
   * 绘制点  多单点  双击一批次
   */
  holeTerrainDrawStart() { this.holeTerrainDrawBool = !this.holeTerrainDrawBool }
  hole3DtilesDrawStart(url) {
    this.hole3DtilesDrawBool = !this.hole3DtilesDrawBool
    this.viewer.scene.primitives._primitives.forEach(primitive => {
      // (primitive._url == "https://assets.cesium.com/354759/tileset.json?v=1") && (this.tileset = primitive)

      (primitive._url == "https://assets.cesium.com/96188/tileset.json?v=13") && (this.tileset = primitive)
    });
    console.log(this.tileset === window.tileset)
    console.log(window.tileset)
    console.log(this.tileset)
    this.localAndWorldTransform = new LocalAndWorldTransform(this.tileset.boundingSphere.center)
  }

  // 监听绘制过程   确认绘制方向
  set click_MOUSE_MOVE(value) {

    if (this._clickPositions.length == 3) {
      this.polygonDirectionSet()
      this.polygonDirectionStart = this.polygonDirection //初始旋转
      // this.renderTerrainPlanes() //初始挖坑
    }
    if (this._clickPositions.length > 3) {
      this.polygonDirectionSet()
      // this.renderTerrainPlanes() //初始挖坑
    }


    if (this.holeTerrainDrawBool) {
      // this.polygonDirectionSet()
      // 确认绘制旋转方向

    }

    if (this.hole3DtilesDrawBool) {

    }






  }

  set click_LEFT_CLICK(value) {
    if (this.singleLeftClickBool()) {
      // let clickScene = this._clickPositions[this._clickPositions.length - 1]
      if (this.holeTerrainDrawBool) {
        if (this._clickPositions.length == 1) {

          // 清除空洞
          this.viewer.scene.globe.clippingPlanes && (this.viewer.scene.globe.clippingPlanes = null)

        }
      }
      if (this.hole3DtilesDrawBool) {
        if (this._clickPositions.length == 1) {

          // 清除空洞
          this.tileset.clippingPlanes && (this.tileset.clippingPlanes = new Cesium.ClippingPlaneCollection())

        }

      }

    }


  }




  set click_LEFT_DOUBLE_CLICK(value) {
    // let clickScene = this._clickPositions[this._clickPositions.length - 1]
    let pointsLength = this._clickPositions.length
    // 三点以上绘制
    if (pointsLength > 2) {
      // 清除原有
      console.log('清除原有')
      this._polygonPrimitives.removeAll()
    }

    if (this.holeTerrainDrawBool) {

      // 注意后续异步this._clickPositions已重置 深拷    this._clickPositions为传入点击数组 
      let pointsLength = this._clickPositions.length
      // 三点以上绘制
      if (pointsLength > 2) {

        //1、 获取墙面和底面 绘制墙面 
        //底面集合
        this._holeDownPositions = []
        for (let index = 0; index < this._clickPositionsStatic.length; index++) {
          // 下个表面和墙面点集合
          let cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(this._clickPositionsStatic[index])
          cartographic.height = -50
          this._holeDownPositions.push(Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height))
        }
        debugger
        // 墙面集合
        for (let index = 0; index < this._clickPositionsStatic.length; index++) {
          let nextIndex = (index + 1) % pointsLength
          let positionsTwo = [this._clickPositionsStatic[index], this._clickPositionsStatic[nextIndex]]
          // console.log('开始绘制两点', positionsTwo)
          let positionsUpFull = getLerpByPoints(positionsTwo, 1) //插值单次集合 插值密度1/m

          //获取上边表面点集合
          let promise0 = this.viewer.scene.clampToHeightMostDetailed(positionsUpFull
            // [window.glbTest] //屏蔽的模型
          ).then((updatedCartesians) => { //上边表面点集合
            // console.log('上边表面点集合', updatedCartesians)
            //剔除空值 某些位置获取不到表面高度undefined
            for (let index = 0; index < updatedCartesians.length; index++) {
              let updatedCartesian = updatedCartesians[index];
              (updatedCartesian == undefined || updatedCartesian == null) && updatedCartesians.splice(index, 1)
            }
            // 墙面集合  todo考虑阴影直接蒙皮
            updatedCartesians.push(this._holeDownPositions[nextIndex], this._holeDownPositions[index]) //拼接  注意翻转 绘制顺序

            let polygonInstance = new Cesium.GeometryInstance({
              geometry: new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(updatedCartesians),
                perPositionHeight: true,
              }),
              // attributes: { color: color }
            });
            this._polygonPrimitives.add(new Cesium.Primitive({
              geometryInstances: [polygonInstance],
              appearance: new Cesium.MaterialAppearance({
                material: new Cesium.Material({
                  fabric: {
                    type: 'Color',
                    uniforms: {
                      color: Cesium.Color.fromBytes(161, 169, 173, 255)
                    }
                  }
                })
              })
            }));
            //最后一面计算后开挖
            if (index == this._clickPositionsStatic.length - 1) {
              this.renderTerrainPlanes()
              // 3dtiles局部坐标集合
              let point3DtilesPositions = []
              this._clickPositionsStatic.forEach(clickPosition => {
                let postion = this.localAndWorldTransform.WorldCoordinatesTolocal(clickPosition)
                point3DtilesPositions.push(postion)
              });
              console.log('point3DtilesPositions', point3DtilesPositions)
              // this.localAndWorldTransform.



              this.render3DtilesPlanes(point3DtilesPositions, this.tileset)



            }
          })
        }

        // 绘制底面
        let polygonInstance = new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(this._holeDownPositions),
            perPositionHeight: true,
          }),
          // attributes: { color: color }
        });
        this._polygonPrimitives.add(new Cesium.Primitive({
          geometryInstances: [polygonInstance],
          appearance: new Cesium.MaterialAppearance({
            material: new Cesium.Material({
              fabric: {
                // 漫反射贴图
                type: 'DiffuseMap',
                uniforms: {
                  image: './work/img/excavate_bottom_min.jpg',
                  repeat: { x: 1, y: 1 }, //不重复
                }
              }
            })
          })
        }));

      }
    }



    if (this.hole3DtilesDrawBool) {
      if (pointsLength > 2) {

        // // 3dtiles局部坐标集合
        // let point3DtilesPositions = []
        // this._clickPositionsStatic.forEach(clickPosition => {
        //   let postion = this.localAndWorldTransform.WorldCoordinatesTolocal(clickPosition)
        //   point3DtilesPositions.push(postion)
        // });
        // console.log('point3DtilesPositions', point3DtilesPositions)
        // // this.localAndWorldTransform.



        // this.render3DtilesPlanes(point3DtilesPositions, this.tileset)

      }
    }

  }


  /**
   * 绘制凸包检测toleft简单验证
   */
  polygonDirectionSet() {
    // ToLeftTest  凸包  考虑最后
    let i = this._clickPositions.length - 1
    let points = this._clickPositions
    let directionLast = Cesium.Cartesian3.subtract(points[i - 1], points[i - 2], new Cesium.Cartesian3())
    let directionNow = Cesium.Cartesian3.subtract(points[i], points[i - 1], new Cesium.Cartesian3())
    // 前向
    let directionUpNow = Cesium.Cartesian3.cross(directionLast, directionNow, new Cesium.Cartesian3())
    let directionPointDirectionUpNowAngle = Cesium.Cartesian3.angleBetween(directionUpNow, points[i]) // 前向绘制线法向
    // 后向
    let directionEnd = Cesium.Cartesian3.subtract(points[i], points[0], new Cesium.Cartesian3())
    let directionUpEnd = Cesium.Cartesian3.cross(directionEnd, directionNow, new Cesium.Cartesian3())
    let directionPointDirectionUpEndAngle = Cesium.Cartesian3.angleBetween(directionUpEnd, points[i]) // 后向绘制线法向

    // 凹多边形（绘制中顺逆变化）
    if (directionPointDirectionUpNowAngle < 1.57) {
      if (directionPointDirectionUpEndAngle > 1.57) {
        // debugger
        // 指示出错
        // this._mouseMovePointPrimitives.position = this._clickPositions[this._clickPositions.length - 2]
        // alert('false')
      }
      console.log('逆时针')
      this.polygonDirection = 1

    } else {
      if (directionPointDirectionUpEndAngle < 1.57) {
        // debugger
        // this._mouseMovePointPrimitives.position = this._clickPositions[this._clickPositions.length - 2]
        // alert('false')
      }
      console.log('顺时针')
      this.polygonDirection = -1
    }

  }



  renderTerrainPlanes() {
    debugger
    console.log('开挖')
    // this.globe.depthTestAgainstTerrain = true
    // let points = this._clickPositions
    let points = this._clickPositionsStatic
    let pointsLength = points.length
    let clippingPlanes = []
    for (let i = 0; i < pointsLength; ++i) {
      // 每个两点中点坐标   球面法线方向
      let nextIndex = (i + 1) % pointsLength
      let midpoint = Cesium.Cartesian3.add(points[i], points[nextIndex], new Cesium.Cartesian3()) //接近中点
      // *标量  缩减1/2  没用  被标准化覆盖
      //  Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);
      // 标准化 地球表面正上方 与模型局部正上方 let up = new Cesium.Cartesian3(0, 0, 10)不一致 
      let up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3())
      // 坐标差  0->1矢量
      let right = Cesium.Cartesian3.subtract(points[i], points[nextIndex], new Cesium.Cartesian3())
      // 标准化
      // right = Cesium.Cartesian3.normalize(right, right)
      // 根据绘制方向修改方向
      Cesium.Cartesian3.multiplyByScalar(right, -this.polygonDirectionStart, right) /************ */
      // 法线 裁切方向
      let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3())
      // normal = Cesium.Cartesian3.normalize(normal, normal)

      // 1
      // let originCenteredPlane = new Cesium.Plane(normal, 0.0)
      // let distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint) //距离
      // clippingPlanes.push(new Cesium.ClippingPlane(normal, distance))
      // 2
      let planeTmp = Cesium.Plane.fromPointNormal(midpoint, normal)
      clippingPlanes.push(Cesium.ClippingPlane.fromPlane(planeTmp))

    }

    //裁切
    this.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
      planes: clippingPlanes,
      edgeWidth: 3,
      // unionClippingRegions: !false,
      edgeColor: Cesium.Color.fromBytes(161, 169, 173, 255),
      // edgeColor: Cesium.Color.WHITE,
    })

  }


  render3DtilesPlanes(points, primitive) {
    let pointsLength = points.length
    let clippingPlanes = []
    for (let i = 0; i < pointsLength; ++i) {
      // 每个两点中点坐标   球面法线方向
      let nextIndex = (i + 1) % pointsLength

      let up = new Cesium.Cartesian3(0, 0, 10)
      // 坐标差  点1->2矢量
      let right = Cesium.Cartesian3.subtract(points[nextIndex], points[i], new Cesium.Cartesian3())
      // 标准化
      // 根据绘制方向修改方向
      Cesium.Cartesian3.multiplyByScalar(right, this.polygonDirectionStart, right) /************ */
      // 法线 裁切方向
      let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3())
      let planeTmp = Cesium.Plane.fromPointNormal(points[nextIndex], normal)
      clippingPlanes.push(Cesium.ClippingPlane.fromPlane(planeTmp))

    }

    //裁切
    primitive.clippingPlanes = new Cesium.ClippingPlaneCollection({
      planes: clippingPlanes,
      edgeWidth: 3,
      // unionClippingRegions: !false,
      edgeColor: Cesium.Color.fromBytes(161, 169, 173, 255),
      // edgeColor: Cesium.Color.WHITE,
    })

  }




  removeAll() {
    super.removeAll()
    this.PrimitiveAll.removeAll()
    // 鼠标移动指示
    // this._mouseMovePointPrimitivesCollection.remove(this._mouseMovePointPrimitives)
    this._mouseMovePointPrimitives = null

    // 清除空洞
    this.viewer.scene.globe.clippingPlanes = null
  }
}




// 点插值
/**
 * 计算最佳线性插值 加密点
 * @param {*} positionTwo 
 * @param {*} density  密度 点数/m   最佳5？
 * @returns 
 */
function getLerpByPoints(positionTwo, density) {
  let pointStart = positionTwo[0]
  let pointEnd = positionTwo[1]
  let positions = [pointStart]
  // 总点数 向上取整
  let countPoints = Math.ceil(density * Cesium.Cartesian3.distance(pointStart, pointEnd, new Cesium.Cartesian3())) //密度*长度
  for (let i = 1; i < countPoints; i++) {
    let ponitThis = Cesium.Cartesian3.lerp(pointStart, pointEnd, i / countPoints, new Cesium.Cartesian3())
    positions.push(ponitThis);
  }
  positions.push(pointEnd);
  return positions
}

export { HoleDraw }