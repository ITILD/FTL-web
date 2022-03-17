import { RenderSimple } from '../../../cesiumEx/AppUtils/primitives/renderGeom/RenderSimple.js'
import { CameraPro } from '../../../cesiumEx/AppUtils/control/camera/CameraPro.js'

class TestInteraction {
  /**
   * 交互
   * @param {*} viewer
   */
  constructor(viewer) {
    this.viewer = viewer
    this.handler
    this.newPrimitive = new Cesium.PrimitiveCollection()
    this.viewer.scene.primitives.add(this.newPrimitive)
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
  }

  // getCamera() {
  //   console.log('相机参数')
  //   let param = { camera: { "y": 39.092423, "x": 121.990975, "z": 87.84, "heading": 23.4, "pitch": -51.9, "roll": 0 } }

  // }

  flyto() {
    // https://zhuanlan.zhihu.com/p/66434400
    // 控制参考
    // let param = {
    //   x: 1532699.583622491,
    //   y: -4465869.97289537,
    //   z: 4274209.540937506,
    //   lon: -71.05763015974205,
    //   lat: 42.34458986850002,
    //   h: 353.8816693983285,
    //   heading: 21.333659539637726,
    //   pitch: -58.74435969634331,
    //   roll: 0.13499009988196406,
    // }
    let param = {
      h: 1567.9855743901433,
      heading: 21.98044650951645,

      lat: 42.3534417026535,

      lon: -71.05980083549828,

      pitch: -77.75571355232125,

      roll: 0.34294193787960303,

      x: 1532606.6091789035,

      y: -4466150.142919737,

      z: 4275754.210693352,
    }
    // let param = {
    //   y: 39.092423,
    //   x: 121.990975,
    //   z: 87.84,
    //   heading: 23.4,
    //   pitch: -51.9,
    //   roll: 0,
    // }
    CameraPro.cameraSetViewGraphic(param, this.viewer)
    // -2602091.939508,4231233.399473,3987398.060792
    // 大连
    // param = {
    //   x: -2602091.939508,
    //   y: 4231233.399473,
    //   z: 3987398.060792,
    //   heading: 23.4,
    //   pitch: -51.9,
    //   roll: 0,
    // }
    // CameraPro.cameraSetViewCartesian3(param, this.viewer)
  }
  getClick() {
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
    this.handler.setInputAction((click) => {
      let newPointPrimitive = new Cesium.PointPrimitiveCollection()
      this.newPrimitive.add(newPointPrimitive)
      let paramFull = {
        camera: {},
        // clickReal: { title: '点选实际位置（需要深度检测）' },
        // clickGloble: { title: '点选地形位置？' },
        // clickTest: { title: '当前视角点选地表位置？' },
        click: {},
      }

      // 相机视点坐标 (笛卡尔)ECEF坐标
      let cameraPosition = this.viewer.camera.position
      transPosition(cameraPosition, paramFull.camera)
      paramFull.camera.heading = Cesium.Math.toDegrees(
        this.viewer.camera.heading
      )
      paramFull.camera.pitch = Cesium.Math.toDegrees(this.viewer.camera.pitch)
      paramFull.camera.roll = Cesium.Math.toDegrees(this.viewer.camera.roll)
      // Cesium.Math.toRadians

      // 点击
      let clickWindow = click.position
      paramFull.clickWindow = clickWindow

      // 点选实际位置（需要深度检测） 包含所有
      let clickScene = this.viewer.scene.pickPosition(clickWindow)
      if (!clickScene) {
        console.log('点选位置为空')
        return
      }
      let clickSceneResult = (paramFull.click.clickScene = {})
      transPosition(clickScene, clickSceneResult)
      let testa = RenderSimple.simplePointByPrimitives(
        newPointPrimitive,
        clickScene,
        100,
        Cesium.Color.fromAlpha(Cesium.Color.BLUE, 0.5),
        3.0
      )

      // 点击视线射线与地球表面相交  包含地形
      let ray = this.viewer.camera.getPickRay(clickWindow)
      let clickGlobe = this.viewer.scene.globe.pick(ray, this.viewer.scene)
      let clickGlobeResult = (paramFull.click.clickGlobe = {})
      transPosition(clickGlobe, clickGlobeResult)
      RenderSimple.simplePointByPrimitives(
        newPointPrimitive,
        clickGlobe,
        15,
        Cesium.Color.fromAlpha(Cesium.Color.GREEN, 0.5),
        3.0
      )

      // 点击视线射线返回椭球上的点   不包含地形
      let clickEllipsoid = this.viewer.scene.camera.pickEllipsoid(
        clickWindow,
        this.viewer.scene.globe.ellipsoid
      )
      let clickEllipsoidResult = (paramFull.click.clickEllipsoid = {})
      transPosition(clickEllipsoid, clickEllipsoidResult)
      RenderSimple.simplePointByPrimitives(
        newPointPrimitive,
        clickEllipsoid,
        20,
        Cesium.Color.fromAlpha(Cesium.Color.RED, 0.5),
        3.0
      )

      // 模型最大细节高度       lampToHeightMostDetailed
      // 地形 sampleTerrainMostDetailed
      // 根据点选位置获取模型和地形高度
      let clickHeightDetailed = (paramFull.click.clickHeightDetailed = {})

      // 模型  前面绘制的几何体会影响后面高度检测
      // let cartesian = new Cesium.Cartesian3()
      // Cesium.Cartesian3.clone(clickScene, cartesian)
      let cartesians = [clickScene]
      let promise0 = this.viewer.scene.clampToHeightMostDetailed(cartesians, [
        window.glbTest,
        testa,
      ]) //屏蔽业务数据 集合无效？？？
      promise0.then((updatedCartesians) => {
        // entities[0].position = updatedCartesians[0];
        // entities[1].position = updatedCartesians[1];
        RenderSimple.simplePointByPrimitives(
          newPointPrimitive,
          updatedCartesians[0],
          25,
          Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.5),
          3.0
        )
        console.log(
          '模型高',
          updatedCartesians,
          Cesium.Ellipsoid.WGS84.cartesianToCartographic(updatedCartesians[0])
        )
      })

      // 地形
      if (this.viewer.terrainProvider) {
        let positions = [
          Cesium.Cartographic.fromDegrees(
            paramFull.click.clickScene.lon,
            paramFull.click.clickScene.lat
          ),
        ]
        let promise1 = Cesium.sampleTerrainMostDetailed(
          this.viewer.terrainProvider,
          positions
        )
        Cesium.when(promise1, (updatedPositions) => {
          console.log('地形高大地', updatedPositions)
          let position = Cesium.Cartesian3.fromRadiansArrayHeights([
            updatedPositions[0].longitude,
            updatedPositions[0].latitude,
            updatedPositions[0].height,
          ])
          RenderSimple.simplePointByPrimitives(
            newPointPrimitive,
            position[0],
            30,
            Cesium.Color.fromAlpha(Cesium.Color.YELLOW, 0.5),
            3.0
          )
          console.log('地形高', position)
        })
      }

      showInfo(paramFull)

      // 椭球默认0
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    // 图块右键信息   变色
    this.handler.setInputAction((click) => {
      var feature = this.viewer.scene.pick(click.position)
      if (feature instanceof Cesium.Cesium3DTileFeature) {
        feature.color = Cesium.Color.fromCssColorString('#68c3ff')
        // var propertyNames = feature.getPropertyNames();
        // var length = propertyNames.length;
        // for (var i = 0; i < length; ++i) {
        //   var propertyName = propertyNames[i];
        //   console.log(propertyName + ': ' + feature.getProperty(propertyName));
        // }
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

    // this.handler.setInputAction((movement) => {
    //   var feature = this.viewer.scene.pick(movement.endPosition);
    //   if (feature instanceof Cesium.Cesium3DTileFeature) {
    //     feature.color = Cesium.Color.YELLOW;
    //   }
    // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  /**
   * 销毁点选监听和绘制
   */
  destroy() {
    this.handler = this.handler && this.handler.destroy()
    // this.viewer.scene.primitives.remove(this.newPrimitive)
    this.newPrimitive.removeAll()
  }

  /**
   * 抗锯齿
   */
  fxaa() {
    //是否开启抗锯齿
    viewer.scene.fxaa = true
    viewer.scene.postProcessStages.fxaa.enabled = true
  }
}

export { TestInteraction }

/**
 * 转换位置信息
 * @param {*} Position
 * @param {*} pickResult
 */
function transPosition(Position, pickResult) {
  if (Position) {
    pickResult.x = Position.x
    pickResult.y = Position.y
    pickResult.z = Position.z
    // let cameraCatographic = Cesium.Cartographic.fromCartesian(cameraPosition)//其他坐标系 默认Cesium.Ellipsoid.WGS84.cartesianToCartographic
    let positionRadiansArray =
      Cesium.Ellipsoid.WGS84.cartesianToCartographic(Position)
    // { longitude: -1.2401877595579294, latitude: 0.7390897322079129, height: -23.82495725068516 }
    pickResult.lon = Cesium.Math.toDegrees(positionRadiansArray.longitude)
    pickResult.lat = Cesium.Math.toDegrees(positionRadiansArray.latitude)
    pickResult.h = positionRadiansArray.height
  } else {
    // pickResult = null
  }
}

function showInfo(paramFull) {
  paramFull.jsonString = JSON.stringify(paramFull)
  localforage.setItem('场景参数' + new Date(), paramFull).then(() => {
    // markDistrict++
    // (districtGeojsonArray.length == markDistrict) && localforage.setItem('markDistrict', markDistrict)
    console.log(paramFull)
  })
}
