// import { RenderSimple } from '../../../cesiumEx/AppUtils/primitives/renderGeom/RenderSimple.js'
// import { CameraPro } from '../../../cesiumEx/AppUtils/control/camera/CameraPro.js'
// class MouseListen {
//   /**
//    * 监听器 记录鼠标移动点选双击
//    * 
//    * @param {*} viewer 
//    */
//   constructor(viewer) {
//     // cesium
//     this.viewer = viewer
//     this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
//   }
//   /**
//    * 监听鼠标状态
//    * 鼠标场景位置集合  
//    * （自行继承组织点线面切面等几何图形）
//    */
//   stateStart() {
//     this._clickPositionsArrays = [] //多次
//     this._clickPositions = [0] //动态单次  使用数组最后一位记录移动标识
//     this.click_LEFT_CLICK_Time = new Date()
//   }

//   drawListen() {
//     this.stateStart()
//     // 动态
//     this.handler.setInputAction((movement) => {
//       if (!movement.endPosition) { return }
//       let clickScene = this.viewer.scene.pickPosition(movement.endPosition) //let clickWindow = click.position/movement.endPosition
//       if (clickScene) { this._clickPositions[this._clickPositions.length - 1] = clickScene }
//       this.click_MOUSE_MOVE = this._clickPositions
//     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

//     // 过程固定  
//     this.handler.setInputAction((click) => {
//       let clickScene = this.viewer.scene.pickPosition(click.position) //防止空洞选取
//       if (clickScene && this.singleLeftClickBool()) { //单击和双击第一次点击
//         // 直接保留最后
//         this.click_LEFT_CLICK = this._clickPositions
//         // 默认监move听到最后一点，随意加移动新点
//         this._clickPositions.push(0) //0
//       }
//     }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

//     // 固定
//     this.handler.setInputAction((click) => {
//       let clickWindow = click.position
//       let clickScene = this.viewer.scene.pickPosition(clickWindow)
//       if (clickScene) {
//         // 剔除最后移动点
//         this._clickPositions.pop()
//         //位置集合 直接保留最后
//         this._clickPositionsArrays.push(this._clickPositions)
//         this._clickPositionsStatic = this._clickPositions.slice(0)
//         this.click_LEFT_DOUBLE_CLICK = this._clickPositions
//         /***********************************注意重置本次鼠标记录数组 添加移动点0****************************************** */
//         this._clickPositions = [0]
//       }
//     }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
//   }

//   // 监听
//   set click_MOUSE_MOVE(value) { this.test() }
//   set click_LEFT_CLICK(value) { this.test() }
//   set click_LEFT_DOUBLE_CLICK(value) { this.test() }

//   removeAll() {
//     this.handler = this.handler && this.handler.destroy();
//     this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
//     this._clickPositionsArrays = null //多次集成
//     this._clickPositions = null //动态单次

//   }

//   /**
//    * 判断此次点击 单击true/双击false  默认双击包含最后一次单击
//    * @returns 
//    */
//   singleLeftClickBool() {
//     let click_LEFT_CLICK_TimeNew = new Date()
//     let leftClickTimeBool = (click_LEFT_CLICK_TimeNew - this.click_LEFT_CLICK_Time) > 300 //时间判定mm
//     let leftClickDistanceBool = (this._clickPositions.length < 2) || //第一次点选默认距离符合单击
//       (Cesium.Cartesian3.distance(this._clickPositions[this._clickPositions.length - 1], this._clickPositions[this._clickPositions.length - 2]) > 0.1) //双击距离判定m
//     this.click_LEFT_CLICK_Time = click_LEFT_CLICK_TimeNew

//     return leftClickTimeBool || leftClickDistanceBool
//   }

//   test() {
//     console.log(this._clickPositions)
//     console.log(this._clickPositionsArrays)
//   }

// }

// class BaseDraw extends MouseListen {
//   /**
//    * 基础绘制类  点线面 （贴地点，贴地线,贴地面） 
//    * 自行继承组织点线面切面等几何图形
//    * @param {*} viewer 
//    */
//   constructor(viewer) {
//     super(viewer)
//     // 绘制开关  支持种类
//     this.pointDrawBool = false
//     this.lineDrawBool = false
//     this.polygonDrawBool = false
//     this.lineGroundDrawBool = false
//     this.polygonGroundDrawBool = false

//     this.linearr = [];
//   }
//   randomColor() {
//     this.pointColor = Cesium.Color.fromRandom()
//     this.lineColor = Cesium.Color.fromAlpha(this.pointColor, 0.7)
//     this.polygonColor = Cesium.Color.fromAlpha(this.pointColor, 0.3)
//   }
//   stateStart() {
//     super.stateStart()
//     this.randomColor()
//     // 总绘制
//     this.PrimitiveAll = this.PrimitiveAll ||
//       this.viewer.scene.primitives.add(new Cesium.PrimitiveCollection())

//     // 鼠标移动指示  监听指示
//     if (!this._mouseMovePointPrimitives) {
//       this._mouseMovePointPrimitivesCollection = this.viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
//       this._mouseMovePointPrimitives =
//         RenderSimple.simplePointByPrimitives(this._mouseMovePointPrimitivesCollection, Cesium.Cartesian3.ZERO, 20, Cesium.Color.fromAlpha(Cesium.Color.RED, 0.5), 3.0)
//     }

//     /**
//      * 图形状态
//      * 绘制点线面和其他
//      */
//     this._pointPrimitives = this.PrimitiveAll.add(new Cesium.PointPrimitiveCollection()) //默认贴地
//     this._polylinePrimitive = this.PrimitiveAll.add(new Cesium.PolylineCollection()) //真实悬空线
//     this._polygonPrimitives = this.PrimitiveAll.add(new Cesium.PrimitiveCollection()) //真实纯粹多面  非顺序三角面（综合）
//     this._polylineGroundPrimitive = this.PrimitiveAll.add(new Cesium.PrimitiveCollection()) //贴地线
//     this._polygonGroundPrimitive = this.PrimitiveAll.add(new Cesium.PrimitiveCollection()) //贴地面

//     // 活动线
//     this.mouseLinePrimitive = null
//     this.mousePolygonPrimitive = null //贴地面
//     this.mouseLineGroundEntity = null //贴地线

//   }

//   /**
//    * 绘制点  多单点  双击一批次
//    */
//   drawPointStart() { this.pointDrawBool = !this.pointDrawBool }
//   drawLineStart() { this.lineDrawBool = !this.lineDrawBool }
//   drawPolygonStart() { this.polygonDrawBool = !this.polygonDrawBool }
//   drawGroundLineStart() { this.lineGroundDrawBool = !this.lineGroundDrawBool }
//   drawGroundPolygonStart() { this.polygonGroundDrawBool = !this.polygonGroundDrawBool }



//   // 监听
//   set click_MOUSE_MOVE(value) {
//     // 开启监听提供指示
//     this._mouseMovePointPrimitives.position = this._clickPositions[this._clickPositions.length - 1]

//     if (this.pointDrawBool) {}
//     if (this.lineDrawBool && this.mouseLinePrimitive) { this.mouseLinePrimitive.positions = this._clickPositions } //更新线

//     if (this.polygonDrawBool) {}
//     if (this.lineGroundDrawBool && this.mouseLineGroundEntity) {

//     }
//     if (this.polygonGroundDrawBool) {

//     }
//   }

//   set click_LEFT_CLICK(value) {


//     let clickScene = this._clickPositions[this._clickPositions.length - 1]
//     if (this.pointDrawBool) { RenderSimple.simplePointByPrimitives(this._pointPrimitives, clickScene, 10, Cesium.Color.fromAlpha(this.pointColor, 0.5), 3.0) }
//     if (this.lineDrawBool) {
//       // 不存在->添加初始线
//       this.mouseLinePrimitive = this.mouseLinePrimitive || RenderSimple.simpleLineByPrimitive(this._polylinePrimitive, this._clickPositions, 10, this.lineColor)
//     }
//     if (this.polygonDrawBool) {

//     }
//     if (this.lineGroundDrawBool) {

//       if (!this.mouseLineGroundEntity) {
//         this.mouseLineGroundEntity = this.viewer.entities.add({
//           name: 'line',
//           polyline: {
//             positions: new Cesium.CallbackProperty(() => {
//               return this._clickPositions;
//             }, false),
//             width: 3,
//             material: Cesium.Color.fromAlpha(this.lineColor, 0.5),
//             clampToGround: true,
//           }
//         });
//       }
//       // console.log(this.mouseLineGroundEntity.polyline)

//     }
//     if (this.polygonGroundDrawBool) {

//     }
//   }

//   set click_LEFT_DOUBLE_CLICK(value) {
//     let clickScene = this._clickPositions[this._clickPositions.length - 1]
//     if (this.pointDrawBool) { //无需绘制
//     }
//     if (this.lineDrawBool) {
//       this.mouseLinePrimitive = null
//     }
//     if (this.lineGroundDrawBool) {
//       console.log(this.mouseLineGroundEntity.polyline)
//       // this.mouseLineGroundEntity.polyline._callback = null
//       this.mouseLineGroundEntity.polyline.positions = this._clickPositions
//       this.mouseLineGroundEntity = null
//     }
//     if (this.polygonDrawBool) {
//       console.log('绘制真实面', this._clickPositions)
//       let color = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromAlpha(this.pointColor, 0.5))
//       // let color = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.5))
//       let polygonInstance = new Cesium.GeometryInstance({
//         geometry: new Cesium.PolygonGeometry({
//           polygonHierarchy: new Cesium.PolygonHierarchy(this._clickPositions),
//           perPositionHeight: true,
//         }),
//         attributes: { color: color }
//       });
//       this._polygonPrimitives.add(new Cesium.Primitive({
//         geometryInstances: [polygonInstance],
//         appearance: new Cesium.PerInstanceColorAppearance()
//       }));
//     }

//     if (this.polygonGroundDrawBool) {
//       let color = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromAlpha(this.pointColor, 0.5))
//       let polygonInstance = new Cesium.GeometryInstance({
//         geometry: new Cesium.PolygonGeometry({ polygonHierarchy: new Cesium.PolygonHierarchy(this._clickPositions) }), // id: 'polygon ',
//         attributes: { color: color }
//       });
//       this._polygonGroundPrimitive.add(new Cesium.GroundPrimitive({ geometryInstances: [polygonInstance] }));
//     }


//     this.randomColor()
//   }

//   removeAll() {
//     super.removeAll()
//     // 鼠标移动指示
//     this._mouseMovePointPrimitivesCollection.remove(this._mouseMovePointPrimitives)
//     this._mouseMovePointPrimitives = null
//     // 图形
//     this.PrimitiveAll.removeAll()
//   }
// }



// class HoleDraw extends MouseListen {
//   /**
//    * 基础绘制类  点线面 （贴地点，贴地线,贴地面） 
//    * 自行继承组织点线面切面等几何图形
//    * 
//    * 单独考虑地形 3dtiles glb切面生成 不支持单切面
//    * @param {*} viewer 
//    */
//   constructor(viewer) {
//     super(viewer)
//     // 绘制开关  支持种类
//     this.holeTerrainDrawBool = false
//     this.hole3DtilesDrawBool = false
//   }

//   stateStart() {
//     super.stateStart()
//     // 总绘制
//     this.PrimitiveAll = this.PrimitiveAll ||
//       this.viewer.scene.primitives.add(new Cesium.PrimitiveCollection())

//     // 空洞相关
//     this.globe = this.viewer.scene.globe
//     //// 绘制方向
//     this.polygonDirectionStart = null //初始顺逆绘制方向
//     this.polygonDirection = null //实时记录

//     // 墙面
//     this._polygonPrimitives = this.PrimitiveAll.add(new Cesium.PrimitiveCollection()) //真实纯粹多面  非顺序三角面（综合）
//     this._holeWallPositions = [] // 单次绘制插值数组
//     this._holeDownPositions = null // 单次总绘制数组总底面

//     // test!!!
//     this._pointPrimitives = this.PrimitiveAll.add(new Cesium.PointPrimitiveCollection()) //默认贴地
//   }

//   /**
//    * 绘制点  多单点  双击一批次
//    */
//   holeTerrainDrawStart() { this.holeTerrainDrawBool = !this.holeTerrainDrawBool }
//   hole3DtilesDrawStart() { this.hole3DtilesDrawBool = !this.hole3DtilesDrawBool }

//   // 监听绘制过程   确认绘制方向
//   set click_MOUSE_MOVE(value) {

//     if (this._clickPositions.length == 3) {
//       this.polygonDirectionSet()
//       this.polygonDirectionStart = this.polygonDirection //初始旋转
//       // this.renderPlanes() //初始挖坑
//     }
//     if (this._clickPositions.length > 3) {
//       this.polygonDirectionSet()
//       // this.renderPlanes() //初始挖坑
//     }


//     if (this.holeTerrainDrawBool) {
//       // this.polygonDirectionSet()
//       // 确认绘制旋转方向

//     }

//     if (this.hole3DtilesDrawBool) {

//     }






//   }

//   set click_LEFT_CLICK(value) {
//     if (this.singleLeftClickBool()) {
//       // let clickScene = this._clickPositions[this._clickPositions.length - 1]
//       if (this.holeTerrainDrawBool) {
//         if (this._clickPositions.length == 1) {

//         }
//       }
//     }


//   }




//   set click_LEFT_DOUBLE_CLICK(value) {
//     // let clickScene = this._clickPositions[this._clickPositions.length - 1]
//     let pointsLength = this._clickPositions.length
//     // 三点以上绘制
//     if (pointsLength > 2) {
//       // 清除原有
//       console.log('清除原有')
//       this._polygonPrimitives.removeAll()
//     }

//     if (this.holeTerrainDrawBool) {

//       // 注意后续异步this._clickPositions已重置 深拷    this._clickPositions为传入点击数组 
//       let pointsLength = this._clickPositions.length
//       // 三点以上绘制
//       if (pointsLength > 2) {

//         console.log('开始绘制')

//         // 清除原有
//         this._polygonPrimitives.removeAll()
//         // 清除空洞
//         // this.viewer.scene.globe.clippingPlanes = null

//         //1、 获取墙面和底面 绘制墙面 
//         //底面集合
//         this._holeDownPositions = []
//         for (let index = 0; index < this._clickPositionsStatic.length; index++) {
//           // 下个表面和墙面点集合
//           let cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(this._clickPositionsStatic[index])
//           cartographic.height = -50
//           this._holeDownPositions.push(Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height))
//         }
//         debugger
//         // 墙面集合
//         for (let index = 0; index < this._clickPositionsStatic.length; index++) {
//           let nextIndex = (index + 1) % pointsLength
//           let positionsTwo = [this._clickPositionsStatic[index], this._clickPositionsStatic[nextIndex]]
//           // console.log('开始绘制两点', positionsTwo)
//           let positionsUpFull = getLerpByPoints(positionsTwo, 2) //插值单次集合 插值密度1/m

//           //获取上边表面点集合
//           let promise0 = this.viewer.scene.clampToHeightMostDetailed(positionsUpFull
//             // [window.glbTest] //屏蔽的模型
//           ).then((updatedCartesians) => { //上边表面点集合
//             // console.log('上边表面点集合', updatedCartesians)
//             //剔除空值 某些位置获取不到表面高度undefined
//             for (let index = 0; index < updatedCartesians.length; index++) {
//               let updatedCartesian = updatedCartesians[index];
//               (updatedCartesian == undefined || updatedCartesian == null) && updatedCartesians.splice(index, 1)
//             }
//             // 墙面集合  todo考虑阴影直接蒙皮
//             updatedCartesians.push(this._holeDownPositions[nextIndex], this._holeDownPositions[index]) //拼接  注意翻转 绘制顺序

//             let polygonInstance = new Cesium.GeometryInstance({
//               geometry: new Cesium.PolygonGeometry({
//                 polygonHierarchy: new Cesium.PolygonHierarchy(updatedCartesians),
//                 perPositionHeight: true,
//               }),
//               // attributes: { color: color }
//             });
//             this._polygonPrimitives.add(new Cesium.Primitive({
//               geometryInstances: [polygonInstance],
//               appearance: new Cesium.MaterialAppearance({
//                 material: new Cesium.Material({
//                   fabric: {
//                     type: 'Color',
//                     uniforms: {
//                       color: Cesium.Color.fromBytes(161, 169, 173, 255)
//                     }
//                   }
//                 })
//               })
//             }));
//             //最后一面计算后开挖
//             if (index == this._clickPositionsStatic.length - 1) {
//               this.renderPlanes()
//             }
//           })
//         }

//         // 绘制底面
//         let polygonInstance = new Cesium.GeometryInstance({
//           geometry: new Cesium.PolygonGeometry({
//             polygonHierarchy: new Cesium.PolygonHierarchy(this._holeDownPositions),
//             perPositionHeight: true,
//           }),
//           // attributes: { color: color }
//         });
//         this._polygonPrimitives.add(new Cesium.Primitive({
//           geometryInstances: [polygonInstance],
//           appearance: new Cesium.MaterialAppearance({
//             material: new Cesium.Material({
//               fabric: {
//                 // 漫反射贴图
//                 type: 'DiffuseMap',
//                 uniforms: {
//                   image: './work/img/excavate_bottom_min.jpg',
//                   repeat: { x: 1, y: 1 }, //不重复
//                 }
//               }
//             })
//           })
//         }));

//       }
//     }



//     if (this.hole3DtilesDrawBool) {
//       if (pointsLength > 2) {

//         let tileset
//         this.viewer.scene.primitives._primitives.forEach(primitive => {
//           (primitive._url == "https://assets.cesium.com/354759/tileset.json?v=1") && (tileset = primitive)
//         });
//         console.log(tileset === window.tileset)






//         tileset.clippingPlanes = new Cesium.ClippingPlaneCollection({
//           planes: [
//             new Cesium.ClippingPlane(
//               new Cesium.Cartesian3(0.0, 0.0, -1.0),
//               0.0
//             ),
//             new Cesium.ClippingPlane(
//               new Cesium.Cartesian3(1.0, 0.0, 0.0),
//               -500.0
//             ),
//             new Cesium.ClippingPlane(
//               new Cesium.Cartesian3(-1.0, 0.0, 0.0),
//               -500.0
//             ),
//             new Cesium.ClippingPlane(
//               new Cesium.Cartesian3(0.0, 1.0, 0.0),
//               -500.0
//             ),
//             new Cesium.ClippingPlane(
//               new Cesium.Cartesian3(0.0, -1.0, 0.0),
//               -500.0
//             ),
//           ],
//           edgeWidth: 1.0,
//         });




//       }
//     }

//   }


//   /**
//    * 绘制凸包检测toleft简单验证
//    */
//   polygonDirectionSet() {
//     // ToLeftTest  凸包  考虑最后
//     let i = this._clickPositions.length - 1
//     let points = this._clickPositions
//     let directionLast = Cesium.Cartesian3.subtract(points[i - 1], points[i - 2], new Cesium.Cartesian3())
//     let directionNow = Cesium.Cartesian3.subtract(points[i], points[i - 1], new Cesium.Cartesian3())
//     // 前向
//     let directionUpNow = Cesium.Cartesian3.cross(directionLast, directionNow, new Cesium.Cartesian3())
//     let directionPointDirectionUpNowAngle = Cesium.Cartesian3.angleBetween(directionUpNow, points[i]) // 前向绘制线法向
//     // 后向
//     let directionEnd = Cesium.Cartesian3.subtract(points[i], points[0], new Cesium.Cartesian3())
//     let directionUpEnd = Cesium.Cartesian3.cross(directionEnd, directionNow, new Cesium.Cartesian3())
//     let directionPointDirectionUpEndAngle = Cesium.Cartesian3.angleBetween(directionUpEnd, points[i]) // 后向绘制线法向

//     // 凹多边形（绘制中顺逆变化）
//     if (directionPointDirectionUpNowAngle < 1.57) {
//       if (directionPointDirectionUpEndAngle > 1.57) {
//         // debugger
//         // 指示出错
//         // this._mouseMovePointPrimitives.position = this._clickPositions[this._clickPositions.length - 2]
//         // alert('false')
//       }
//       console.log('逆时针')
//       this.polygonDirection = 1

//     } else {
//       if (directionPointDirectionUpEndAngle < 1.57) {
//         // debugger
//         // this._mouseMovePointPrimitives.position = this._clickPositions[this._clickPositions.length - 2]
//         // alert('false')
//       }
//       console.log('顺时针')
//       this.polygonDirection = -1
//     }

//   }



//   renderPlanes() {
//     debugger
//     console.log('开挖')
//     // this.globe.depthTestAgainstTerrain = true
//     // let points = this._clickPositions
//     let points = this._clickPositionsStatic
//     let pointsLength = points.length
//     let clippingPlanes = []
//     for (let i = 0; i < pointsLength; ++i) {
//       // 每个两点中点坐标   球面法线方向
//       let nextIndex = (i + 1) % pointsLength
//       let midpoint = Cesium.Cartesian3.add(points[i], points[nextIndex], new Cesium.Cartesian3())
//       // *标量  缩减1/2  没用  被标准化覆盖
//       //  Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);
//       // 标准化
//       let up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3())
//       // 坐标差  点1->2矢量
//       let right = Cesium.Cartesian3.subtract(points[nextIndex], midpoint, new Cesium.Cartesian3())
//       right = Cesium.Cartesian3.normalize(right, right)
//       Cesium.Cartesian3.multiplyByScalar(right, this.polygonDirectionStart, right) /************ */
//       // 法线 裁切方向
//       let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3())
//       normal = Cesium.Cartesian3.normalize(normal, normal)

//       let originCenteredPlane = new Cesium.Plane(normal, 0.0)
//       let distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint) //距离

//       clippingPlanes.push(new Cesium.ClippingPlane(normal, distance))
//       // console.log('面：' + i)
//       // console.log(normal, distance)
//     }

//     //裁切
//     this.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
//       planes: clippingPlanes,
//       edgeWidth: 3,
//       // unionClippingRegions: !false,
//       edgeColor: Cesium.Color.fromBytes(161, 169, 173, 255),
//       // edgeColor: Cesium.Color.WHITE,
//     })

//   }


//   removeAll() {
//     super.removeAll()
//     this.PrimitiveAll.removeAll()
//     // 鼠标移动指示
//     // this._mouseMovePointPrimitivesCollection.remove(this._mouseMovePointPrimitives)
//     this._mouseMovePointPrimitives = null

//     // 清除空洞
//     this.viewer.scene.globe.clippingPlanes = null
//   }
// }

// export { MouseListen, BaseDraw, HoleDraw }



// // 点插值
// /**
//  * 计算最佳线性插值 加密点
//  * @param {*} positionTwo 
//  * @param {*} density  密度 点数/m   最佳5？
//  * @returns 
//  */
// function getLerpByPoints(positionTwo, density) {
//   let pointStart = positionTwo[0]
//   let pointEnd = positionTwo[1]
//   let positions = [pointStart]
//   // 总点数 向上取整
//   let countPoints = Math.ceil(density * Cesium.Cartesian3.distance(pointStart, pointEnd, new Cesium.Cartesian3())) //密度*长度
//   for (let i = 1; i < countPoints; i++) {
//     let ponitThis = Cesium.Cartesian3.lerp(pointStart, pointEnd, i / countPoints, new Cesium.Cartesian3())
//     positions.push(ponitThis);
//   }
//   positions.push(pointEnd);
//   return positions
// }