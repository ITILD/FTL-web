import { MouseListen } from '../../control/mouse/MouseListen.js'
import { ClippingPlanesByGeom } from '../../primitives/clipPlanes/ClippingPlanesByGeom.js'
import { RenderSimple } from '../../primitives/renderGeom/RenderSimple.js'
import { LocalAndWorldTransform } from '../../translate/LocalAndWorldTransform.js'
import { ComputationalGeom } from '../../math/ComputationalGeom.js'

class HoleDraw extends MouseListen {
  /**
   * 基础绘制类  点线面 （贴地点，贴地线,贴地面）
   * 自行继承组织点线面切面等几何图形
   * 单独考虑地形 3dtiles glb切面生成 不支持单切面
   * @param {*} viewer
   * @param {*} holeBottomImgPath 下表面材质
   *
   */
  constructor(viewer, holeBottomImgPath) {
    super(viewer)
    // 绘制开关  支持种类
    this.holeTerrainDrawBool = false
    this.hole3DtilesDrawBool = false
    this.pointDensity = 1 //默认不插值 无边墙时不影响
    // this.hole3DtilesUrl = "https://assets.cesium.com/96188/tileset.json?v=13"
    this.holeBottomImgPath =
      holeBottomImgPath || './work/img/excavate_bottom_min.jpg'
    this.holeBottomDepth = -50 //开挖深度
  }

  stateStart() {
    super.stateStart()
    // 总绘制
    this.PrimitiveAll =
      this.PrimitiveAll ||
      this.viewer.scene.primitives.add(new Cesium.PrimitiveCollection())

    // 空洞相关
    this.globe = this.viewer.scene.globe
    //// 绘制方向
    this.polygonDirectionStart = null //初始顺逆绘制方向
    this.polygonDirection = null //实时记录

    // 墙面
    this._polygonPrimitives = this.PrimitiveAll.add(
      new Cesium.PrimitiveCollection()
    ) //真实纯粹多面  非顺序三角面（综合）
    this._holeWallPositions = [] // 单次绘制插值数组
    this._holeDownPositions = null // 单次总绘制数组总底面
    // test!!!
    // this._pointPrimitives = this.PrimitiveAll.add(new Cesium.PointPrimitiveCollection()) //默认贴地

    this.clippingPlanesModels = []
  }

  /**
   * 绘制点  多单点  双击一批次
   */
  holeTerrainDrawStart() {
    this.holeTerrainDrawBool = true
    this.clippingPlanesModels.push(this.globe)
  }
  hole3DtilesDrawStart(hole3DtilesUrl) {
    this.hole3DtilesDrawBool = true
    hole3DtilesUrl = 'https://assets.cesium.com/354759/tileset.json?v=1'
    this.viewer.scene.primitives._primitives.forEach((primitive) => {
      if (primitive._url == hole3DtilesUrl) {
        this.tileset = primitive
        this.localAndWorldTransform = new LocalAndWorldTransform(
          this.tileset.boundingSphere.center
        )
        this.clippingPlanesModels.push(this.tileset)
      }
    })
  }

  // 监听绘制过程   确认绘制方向
  set click_MOUSE_MOVE(value) {
    if (this._clickPositions.length == 3) {
      this.polygonDirection = ComputationalGeom.polygonDirectionSet(
        this._clickPositions,
        this.polygonDirection
      )
      this.polygonDirectionStart = this.polygonDirection //初始旋转
      // this.renderTerrainPlanes() //初始挖坑
    }
    if (this._clickPositions.length > 3) {
      this.polygonDirection = ComputationalGeom.polygonDirectionSet(
        this._clickPositions,
        this.polygonDirection
      )
    }
    if (this.holeTerrainDrawBool) {
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
          this.viewer.scene.globe.clippingPlanes &&
            (this.viewer.scene.globe.clippingPlanes = null)
        }
      }
      if (this.hole3DtilesDrawBool) {
        if (this._clickPositions.length == 1) {
          // 清除空洞
          // this.tileset.clippingPlanes && (this.tileset.clippingPlanes = new Cesium.ClippingPlaneCollection())
          this.tileset &&
            this.tileset.clippingPlanes &&
            this.tileset.clippingPlanes.destroy()
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
      this._polygonPrimitives.removeAll()
    }

    if (this.holeTerrainDrawBool) {
      // 注意后续异步this._clickPositions已重置 深拷    this._clickPositions为传入点击数组
      let pointsLength = this._clickPositions.length

      let holeBottomAltitude =
        Cesium.Ellipsoid.WGS84.cartesianToCartographic(
          this._clickPositionsStatic[0]
        ).height + this.holeBottomDepth
      // 三点以上绘制
      if (pointsLength > 2) {
        //1、 获取墙面和底面 绘制墙面
        //底面集合
        this._holeDownPositions = []
        for (
          let index = 0;
          index < this._clickPositionsStatic.length;
          index++
        ) {
          // 下个表面和墙面点集合
          let cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(
            this._clickPositionsStatic[index]
          )
          cartographic.height = holeBottomAltitude
          this._holeDownPositions.push(
            Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              cartographic.height
            )
          )
        }

        // 墙面集合
        for (
          let index = 0;
          index < this._clickPositionsStatic.length;
          index++
        ) {
          let nextIndex = (index + 1) % pointsLength
          let positionsTwo = [
            this._clickPositionsStatic[index],
            this._clickPositionsStatic[nextIndex],
          ]
          // console.log('开始绘制两点', positionsTwo)
          let positionsUpFull = ComputationalGeom.getLerpByPoints(
            positionsTwo,
            this.pointDensity
          ) //插值单次集合 插值密度1/m

          //获取上边表面点集合
          let promise0 = this.viewer.scene
            .clampToHeightMostDetailed(
              positionsUpFull
              // [window.glbTest] //屏蔽的模型
            )
            .then((updatedCartesians) => {
              //上边表面点集合
              // console.log('上边表面点集合', updatedCartesians)
              //剔除空值 某些位置获取不到表面高度undefined
              for (let index = 0; index < updatedCartesians.length; index++) {
                let updatedCartesian = updatedCartesians[index]
                ;(updatedCartesian == undefined || updatedCartesian == null) &&
                  updatedCartesians.splice(index, 1)
              }
              // 墙面集合
              updatedCartesians.push(
                this._holeDownPositions[nextIndex],
                this._holeDownPositions[index]
              ) //拼接  注意翻转 绘制顺序
              RenderSimple.simplePolygonByPrimitiveInstance(
                this._polygonPrimitives,
                updatedCartesians,
                Cesium.Color.fromBytes(161, 169, 173, 255)
              )
              //最后一面计算后开挖   TODO无法确认全部完成
              if (index == this._clickPositionsStatic.length - 1) {
                ClippingPlanesByGeom.setClippingPlanesSimple(
                  this.clippingPlanesModels,
                  this._clickPositionsStatic,
                  this.polygonDirectionStart
                )
              }
            })
        }
        RenderSimple.simplePolygonByPrimitiveInstance(
          this._polygonPrimitives,
          this._holeDownPositions,
          null,
          this.holeBottomImgPath
        ) // 绘制底面
      }
    }

    if (this.hole3DtilesDrawBool) {
      if (pointsLength > 2) {
      }
    }
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

export { HoleDraw }
