import { RenderSimple } from '../../../cesiumEx/AppUtils/primitives/renderGeom/RenderSimple.js'
import { CameraPro } from '../../../cesiumEx/AppUtils/control/camera/CameraPro.js'
class MouseListen {
  /**
   * 监听器 记录鼠标移动点选双击
   * 
   * @param {*} viewer 
   */
  constructor(viewer) {
    // cesium
    this.viewer = viewer
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
  }
  /**
   * 监听鼠标状态
   * 鼠标场景位置集合  
   * （自行继承组织点线面切面等几何图形）
   */
  stateStart() {
    this._clickPositionsArrays = [] //多次
    this._clickPositions = [0] //动态单次  使用数组最后一位记录移动标识
    this.click_LEFT_CLICK_Time = new Date()
  }

  drawListen() {
    this.stateStart()
    // 动态
    this.handler.setInputAction((movement) => {
      if (!movement.endPosition) { return }
      let clickScene = this.viewer.scene.pickPosition(movement.endPosition) //let clickWindow = click.position/movement.endPosition
      if (clickScene) { this._clickPositions[this._clickPositions.length - 1] = clickScene }
      this.click_MOUSE_MOVE = this._clickPositions
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 过程固定  
    this.handler.setInputAction((click) => {
      let clickScene = this.viewer.scene.pickPosition(click.position) //防止空洞选取
      if (clickScene && this.singleLeftClickBool()) { //单击和双击第一次点击
        // 直接保留最后
        this.click_LEFT_CLICK = this._clickPositions
        // 默认监move听到最后一点，随意加移动新点
        this._clickPositions.push(0) //0
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 固定
    this.handler.setInputAction((click) => {
      let clickWindow = click.position
      let clickScene = this.viewer.scene.pickPosition(clickWindow)
      if (clickScene) {
        // 剔除最后移动点
        this._clickPositions.pop()
        //位置集合 直接保留最后
        this._clickPositionsArrays.push(this._clickPositions)
        this.click_LEFT_DOUBLE_CLICK = this._clickPositions
        /***********************************注意重置本次鼠标记录数组 添加移动点0****************************************** */
        this._clickPositions = [0]
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  // 监听
  set click_MOUSE_MOVE(value) { this.test() }
  set click_LEFT_CLICK(value) { this.test() }
  set click_LEFT_DOUBLE_CLICK(value) { this.test() }

  removeAll() {
    this.handler = this.handler && this.handler.destroy();
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
    this._clickPositionsArrays = null //多次集成
    this._clickPositions = null //动态单次

  }

  /**
   * 判断此次点击 单击true/双击false  默认双击包含最后一次单击
   * @returns 
   */
  singleLeftClickBool() {
    let click_LEFT_CLICK_TimeNew = new Date()
    let leftClickTimeBool = (click_LEFT_CLICK_TimeNew - this.click_LEFT_CLICK_Time) > 300 //时间判定mm
    let leftClickDistanceBool = (this._clickPositions.length < 2) || //第一次点选默认距离符合单击
      (Cesium.Cartesian3.distance(this._clickPositions[this._clickPositions.length - 1], this._clickPositions[this._clickPositions.length - 2]) > 0.1) //双击距离判定m
    this.click_LEFT_CLICK_Time = click_LEFT_CLICK_TimeNew

    return leftClickTimeBool || leftClickDistanceBool
  }

  test() {
    console.log(this._clickPositions)
    console.log(this._clickPositionsArrays)
  }

}

class BaseDraw extends MouseListen {
  /**
   * 基础绘制类  点线面 （贴地点，贴地线,贴地面） 
   * 自行继承组织点线面切面等几何图形
   * @param {*} viewer 
   */
  constructor(viewer) {
    super(viewer)
    // 绘制开关  支持种类
    this.pointDrawBool = false
    this.lineDrawBool = false
    this.polygonDrawBool = false
    this.lineGroundDrawBool = false
    this.polygonGroundDrawBool = false

    this.linearr = [];
  }
  randomColor() {
    this.pointColor = Cesium.Color.fromRandom()
    this.lineColor = Cesium.Color.fromAlpha(this.pointColor, 0.7)
    this.polygonColor = Cesium.Color.fromAlpha(this.pointColor, 0.3)
  }
  stateStart() {
    super.stateStart()
    this.randomColor()
    // 总绘制
    this.PrimitiveAll = this.PrimitiveAll ||
      this.viewer.scene.primitives.add(new Cesium.PrimitiveCollection())

    // 鼠标移动指示  监听指示
    if (!this._mouseMovePointPrimitives) {
      this._mouseMovePointPrimitivesCollection = this.viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
      this._mouseMovePointPrimitives =
        RenderSimple.simplePointByPrimitives(this._mouseMovePointPrimitivesCollection, Cesium.Cartesian3.ZERO, 20, Cesium.Color.fromAlpha(Cesium.Color.RED, 0.5), 3.0)
    }

    /**
     * 图形状态
     * 绘制点线面和其他
     */
    this._pointPrimitives = this.PrimitiveAll.add(new Cesium.PointPrimitiveCollection()) //默认贴地
    this._polylinePrimitive = this.PrimitiveAll.add(new Cesium.PolylineCollection()) //真实悬空线
    this._polygonPrimitives = this.PrimitiveAll.add(new Cesium.PrimitiveCollection()) //真实纯粹多面  非顺序三角面（综合）
    this._polylineGroundPrimitive = this.PrimitiveAll.add(new Cesium.PrimitiveCollection()) //贴地线
    this._polygonGroundPrimitive = this.PrimitiveAll.add(new Cesium.PrimitiveCollection()) //贴地面

    // 活动线
    this.mouseLinePrimitive = null
    this.mousePolygonPrimitive = null //贴地面
    this.mouseLineGroundEntity = null //贴地线

  }

  /**
   * 绘制点  多单点  双击一批次
   */
  drawPointStart() { this.pointDrawBool = !this.pointDrawBool }
  drawLineStart() { this.lineDrawBool = !this.lineDrawBool }
  drawPolygonStart() { this.polygonDrawBool = !this.polygonDrawBool }
  drawGroundLineStart() { this.lineGroundDrawBool = !this.lineGroundDrawBool }
  drawGroundPolygonStart() { this.polygonGroundDrawBool = !this.polygonGroundDrawBool }



  // 监听
  set click_MOUSE_MOVE(value) {
    // 开启监听提供指示
    this._mouseMovePointPrimitives.position = this._clickPositions[this._clickPositions.length - 1]

    if (this.pointDrawBool) {}
    if (this.lineDrawBool && this.mouseLinePrimitive) { this.mouseLinePrimitive.positions = this._clickPositions } //更新线

    if (this.polygonDrawBool) {}
    if (this.lineGroundDrawBool && this.mouseLineGroundEntity) {

    }
    if (this.polygonGroundDrawBool) {

    }
  }

  set click_LEFT_CLICK(value) {


    let clickScene = this._clickPositions[this._clickPositions.length - 1]
    if (this.pointDrawBool) { RenderSimple.simplePointByPrimitives(this._pointPrimitives, clickScene, 10, Cesium.Color.fromAlpha(this.pointColor, 0.5), 3.0) }
    if (this.lineDrawBool) {
      // 不存在->添加初始线
      this.mouseLinePrimitive = this.mouseLinePrimitive || RenderSimple.simpleLineByPrimitive(this._polylinePrimitive, this._clickPositions, 10, this.lineColor)
    }
    if (this.polygonDrawBool) {

    }
    if (this.lineGroundDrawBool) {

      if (!this.mouseLineGroundEntity) {
        this.mouseLineGroundEntity = this.viewer.entities.add({
          name: 'line',
          polyline: {
            positions: new Cesium.CallbackProperty(() => {
              return this._clickPositions;
            }, false),
            width: 3,
            material: Cesium.Color.fromAlpha(this.lineColor, 0.5),
            clampToGround: true,
          }
        });
      }
      // console.log(this.mouseLineGroundEntity.polyline)

    }
    if (this.polygonGroundDrawBool) {

    }
  }

  set click_LEFT_DOUBLE_CLICK(value) {
    let clickScene = this._clickPositions[this._clickPositions.length - 1]
    if (this.pointDrawBool) { //无需绘制
    }
    if (this.lineDrawBool) {
      this.mouseLinePrimitive = null
    }
    if (this.lineGroundDrawBool) {
      console.log(this.mouseLineGroundEntity.polyline)
      // this.mouseLineGroundEntity.polyline._callback = null
      this.mouseLineGroundEntity.polyline.positions = this._clickPositions
      this.mouseLineGroundEntity = null
    }
    if (this.polygonDrawBool) {
      console.log('绘制真实面', this._clickPositions)
      let color = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromAlpha(this.pointColor, 0.5))
      // let color = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.5))
      let polygonInstance = new Cesium.GeometryInstance({
        geometry: new Cesium.PolygonGeometry({
          polygonHierarchy: new Cesium.PolygonHierarchy(this._clickPositions),
          perPositionHeight: true,
        }),
        attributes: { color: color }
      });
      this._polygonPrimitives.add(new Cesium.Primitive({
        geometryInstances: [polygonInstance],
        appearance: new Cesium.PerInstanceColorAppearance()
      }));
    }

    if (this.polygonGroundDrawBool) {
      let color = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromAlpha(this.pointColor, 0.5))
      let polygonInstance = new Cesium.GeometryInstance({
        geometry: new Cesium.PolygonGeometry({ polygonHierarchy: new Cesium.PolygonHierarchy(this._clickPositions) }), // id: 'polygon ',
        attributes: { color: color }
      });
      this._polygonGroundPrimitive.add(new Cesium.GroundPrimitive({ geometryInstances: [polygonInstance] }));
    }


    this.randomColor()
  }

  removeAll() {
    super.removeAll()
    // 鼠标移动指示
    this._mouseMovePointPrimitivesCollection.remove(this._mouseMovePointPrimitives)
    this._mouseMovePointPrimitives = null
    // 图形
    this.PrimitiveAll.removeAll()
  }
}



class HoleDraw extends MouseListen {
  /**
   * 基础绘制类  点线面 （贴地点，贴地线,贴地面） 
   * 自行继承组织点线面切面等几何图形
   * @param {*} viewer 
   */
  constructor(viewer) {
    super(viewer)
    this.holeDrawBool = false // 绘制开关  支持种类
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
  drawHoleDrawStart() { this.holeDrawBool = !this.holeDrawBool }


  // 监听
  set click_MOUSE_MOVE(value) {
    if (this.holeDrawBool) {
      // this.polygonDirectionSet()
      // 确认绘制旋转方向
      if (this._clickPositions.length == 3) {
        this.polygonDirectionSet()
        this.polygonDirectionStart = this.polygonDirection //初始旋转
        // this.renderPlanes() //初始挖坑
      }
      if (this._clickPositions.length > 3) {
        this.polygonDirectionSet()
        // this.renderPlanes() //初始挖坑
      }


    }
  }

  set click_LEFT_CLICK(value) {
    if (this.singleLeftClickBool()) {
      let clickScene = this._clickPositions[this._clickPositions.length - 1]
      if (this.holeDrawBool) {


      }
    }


  }

  set click_LEFT_DOUBLE_CLICK(value) {
    let clickScene = this._clickPositions[this._clickPositions.length - 1]

    if (this.holeDrawBool) {



      let pointsLength =
        // 两次点击之间绘制侧边
        if ( >= 2) {


          let nextIndex = (i + 1) % pointsLength


















          let positionsTwo = this._clickPositions.slice(this._clickPositions.length - 2)

          // 下个表面和墙面点集合
          let cartographic
          if (!this._holeDownPositions) {
            this._holeDownPositions = []
            cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(positionsTwo[0])
            cartographic.height = -50 //TODO 动态     后期考虑基础地形 默认地形高度最低下挖10米？？异步内异步？？
            this._holeDownPositions.push(Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height))
          }
          cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(positionsTwo[1])
          cartographic.height = -50
          this._holeDownPositions.push(Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height))
          console.log('test', cartographic)


          //获取上边表面点集合
          // this.getRealPositions(positionsUpFull) //上边表面点集合
          let positionsUpFull = getLerpByPoints(positionsTwo, 5) //插值单次集合          // console.log('插值', positionsUpFull) 
          let promise0 = this.viewer.scene.clampToHeightMostDetailed(positionsUpFull
            // [window.glbTest] //屏蔽的模型
          ).then((updatedCartesians) => {
            //剔除空值 某些位置获取不到表面高度undefined

            for (let index = 0; index < updatedCartesians.length; index++) {
              let updatedCartesian = updatedCartesians[index];
              (updatedCartesian == undefined || updatedCartesian == null) && (console.log('删除！！！！！！！'))
              (updatedCartesian == undefined || updatedCartesian == null) && updatedCartesians.splice(index, 1)
            }
            // 考虑阴影直接蒙皮
            // 墙面集合
            updatedCartesians.push(...this._holeDownPositions.slice(this._holeDownPositions.length - 2).reverse()) //拼接  注意结尾翻转 绘制顺序
            console.log('墙面集合', updatedCartesians)
            console.log(positionsTwo)
            console.log('下表面', this._holeDownPositions)
            let withtest = 20
            // updatedCartesians.forEach(element => {
            //   withtest -= 2
            //   RenderSimple.simplePointByPrimitives(this._pointPrimitives, element, withtest, Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.5), 3.0)
            // });
            // this._clickPositions

            let color = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromAlpha(Cesium.Color.BLUE, 1))
            let polygonInstance = new Cesium.GeometryInstance({
              geometry: new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(updatedCartesians),
                perPositionHeight: true,
              }),
              // attributes: { color: color }
            });
            this._polygonPrimitives.add(new Cesium.Primitive({
              geometryInstances: [polygonInstance],
              // 材质使用纯色或贴图
              // appearance: new Cesium.PerInstanceColorAppearance()
              // appearance: new Cesium.EllipsoidSurfaceAppearance({
              //   material: Cesium.Material.fromType('Stripe')
              // })

              appearance: new Cesium.MaterialAppearance({
                material: new Cesium.Material({
                  fabric: {
                    // type: 'Color',
                    // uniforms: {
                    //   // color: new Cesium.Color(1.0, 1.0, 0.0, 1.0)

                    //   color: Cesium.Color.fromBytes(160, 225, 255, 155)
                    // }

                    // type: 'Image',
                    // uniforms: {
                    //   image: './work/img/excavate_bottom_min.jpg'
                    // }

                    // type: 'SpecularMap',
                    // uniforms: {
                    //   image: './work/img/excavate_bottom_min.jpg',
                    //   // channel: 'a'
                    // }
                    type: 'DiffuseMap',
                    uniforms: {
                      image: './work/img/excavate_bottom_min.jpg',
                      repeat: new Cesium.Cartesian2(1, 1),
                    }

                    //   repeat : {
                    //     x : 10,
                    //     y : 2
                    //     x : 4,
                    //     y : 4
                    //   }
                    // }
                  }
                })
              })


            }));


          })

        }

      // if (this._clickPositions.length >= 3) {
      //   // this.polygonDirectionSet()
      //   this.renderPlanes() //初始挖坑
      // }













      // this.renderPlanes()
      this.polygonDirectionStart = null //初始顺逆绘制方向
      this.polygonDirection = null //实时记录


      // 单次绘制底面清空
      this._holeDownPositions = null

    }

  }

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



  renderPlanes() {
    // this.globe.depthTestAgainstTerrain = true
    let points = this._clickPositions
    let pointsLength = points.length
    let clippingPlanes = []
    for (let i = 0; i < pointsLength; ++i) {
      // 每个两点中点坐标   球面法线方向
      let nextIndex = (i + 1) % pointsLength
      let midpoint = Cesium.Cartesian3.add(points[i], points[nextIndex], new Cesium.Cartesian3())
      // *标量  缩减1/2  没用  被标准化覆盖
      //  Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);
      // 标准化
      let up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3())
      // 坐标差  点1->2矢量
      let right = Cesium.Cartesian3.subtract(points[nextIndex], midpoint, new Cesium.Cartesian3())
      right = Cesium.Cartesian3.normalize(right, right)
      Cesium.Cartesian3.multiplyByScalar(right, this.polygonDirectionStart, right) /************ */
      // 法线 裁切方向
      let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3())
      normal = Cesium.Cartesian3.normalize(normal, normal)

      let originCenteredPlane = new Cesium.Plane(normal, 0.0)
      let distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint) //距离

      clippingPlanes.push(new Cesium.ClippingPlane(normal, distance))
      // console.log('面：' + i)
      // console.log(normal, distance)
    }

    //裁切
    this.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
      planes: clippingPlanes,
      edgeWidth: 1,
      // unionClippingRegions: !false,
      edgeColor: Cesium.Color.RED,
    })

  }


  // /**
  //  * 自动计算高程最佳插值   结尾添加两个底面点 
  //  * //TODO
  //  * 计算最表层
  //  * @param {*} positions 两个点
  //  * @param {*} entity  排除表面   地表（无地形/有地形）3dtiles/model
  //  * @returns 
  //  */
  // getRealPositions(positions, entity) {
  //   //屏蔽业务数据 集合无效？？？
  //   let promise0 = this.viewer.scene.clampToHeightMostDetailed(positions
  //     // [window.glbTest]
  //   ).then((updatedCartesians) => {
  //     // console.log('异步********updatedCartesians', updatedCartesians)
  //     // updatedCartesians.forEach(element => {
  //     //   RenderSimple.simplePointByPrimitives(this._pointPrimitives, element, 2, Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.5), 3.0)
  //     // });


  //     // RenderSimple.simplePointByPrimitives(newPointPrimitive, updatedCartesians[0], 10, Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.5), 3.0)
  //     // console.log('模型高', updatedCartesians, Cesium.Ellipsoid.WGS84.cartesianToCartographic(updatedCartesians[0]))
  //     this._holeWallPositions = [] // 单次绘制插值数组


  //     this._holeDownPositions = [] // 单次总绘制数组总底面
  //     // updatedCartesians.push(0)
  //     // return 1
  //   })
  //   return end
  // }



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

export { MouseListen, BaseDraw, HoleDraw }



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





// function changeLinePrimitive(options) {
//   this.positions = options.positions
// }

// changeLinePrimitive.prototype.getGeometry = function () {
//   return new Cesium.PolylineGeometry({
//     positions: this.positions,
//     height: 50,
//     width: 5,
//     vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEXchangeLinePrimitiveFORMAT,

//   });
// };
// changeLinePrimitive.prototype.update = function (context, frameState, commandList) {
//   var geometry = this.getGeometry();
//   if (!geometry) {
//     return;
//   }

//   this._primitive = new Cesium.Primitive({
//     geometryInstances: new Cesium.GeometryInstance({
//       geometry: geometry,
//       id: "111",
//     }),
//     appearance: new Cesium.PolylineMaterialAppearance({
//       aboveGround: false
//     }),
//     asynchronous: false
//   });
//   var primitive = this._primitive

//   primitive.update(context, frameState, commandList);

// };



// TODO  修改

// if (!this.mouseLineGroundEntity) {
//   this.mouseLineGroundEntity = new changeGroundLinePrimitive(this._clickPositions, 3.0, Cesium.Color.fromAlpha(this.lineColor, 0.5))
//   this.PrimitiveAll.add(this.mouseLineGroundEntity);
// }

class changeGroundLinePrimitive {
  constructor(positions, width, color) {
    this.positions = positions
    this.width = width || 3.0
    this.color = color || Cesium.Color.RED
  }

  update(frameState) {

    console.log(frameState)
    let geometry = new Cesium.GroundPolylineGeometry({
      positions: this.positions,
      width: this.width
    })
    // if (!geometry) {return}
    this._primitive = new Cesium.GroundPolylinePrimitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: { color: Cesium.ColorGeometryInstanceAttribute.fromColor(this.color) }
      }),
      appearance: new Cesium.PolylineColorAppearance(),
      asynchronous: false
    })
    // this._primitive.update(frameState);

  };
}