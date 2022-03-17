import { ClippingPlanesByGeom } from '../../../cesiumEx/AppUtils/primitives/clipPlanes/ClippingPlanesByGeom.js'
import { CameraPro } from '../../../cesiumEx/AppUtils/control/camera/CameraPro.js'
import { RenderGlb } from '../../../cesiumEx/AppUtils/primitives/renderModel/RenderGlb.js'
import { LocalAndWorldTransform } from '../../../cesiumEx/AppUtils/translate/LocalAndWorldTransform.js'
import { RenderSimple } from '../../../cesiumEx/AppUtils/primitives/renderGeom/RenderSimple.js'

/**
 * 测试数据添加
 */
class TestDataAdd {
  constructor(viewer) {
    this.viewer = viewer
    this.tileset = null
    this.model = null
    this.terrain = null
    // console.log(this.viewer.scene)
  }

  addTest3dtiles() {
    if (this.tileset) {
      this.viewer.scene.primitives.remove(this.tileset)
      this.tileset = null
      console.log('3dtiles移除')
      return
    }
    console.log('3dtiles添加')

    this.tileset = this.viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        // url: '../../../data/freedata/SampleData/Cesium3DTiles/Batched/BatchedColors/tileset.json'
        // url: '../../../data/freedata/SampleData/Cesium3DTiles/Classification/Photogrammetry/tileset.json'
        // url: '../data/test/BHZ_GJ_FL_98.json',

        // url: Cesium.IonResource.fromAssetId(354307)
        // url: 'https://assets.cesium.com/96188/tileset.json?v=13',
        // url: Cesium.IonResource.fromAssetId(96188), //osm
        url: Cesium.IonResource.fromAssetId(354759), //TODO node爬一个
        maximumScreenSpaceError: 2, //最大的屏幕空间误差
        maximumNumberOfLoadedTiles: 10000, //最大加载瓦片个数
        show: !false,
      })
    )
    // 云层？？雾

    this.viewer.scene.globe.depthTestAgainstTerrain = true
    let m = Cesium.Matrix4.fromArray([
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      0.0,
      5.0,
      1.0, //x, y, z, 1.0
    ])
    this.tileset._modelMatrix = m
    // test
    window.tileset = this.tileset

    // tileset.readyPromise.then(static (tileset) {
    //   // Set the camera to view the newly added tileset
    //   this.viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
    // });
    // this.viewer.zoomTo(this.tileset);
    // CameraPro.cameraFlyTo()
  }

  addTest3dtilesOSM() {
    if (this.tilesetOSM) {
      this.viewer.scene.primitives.remove(this.tilesetOSM)
      this.tilesetOSM = null
      console.log('3dtiles移除')
      return
    }
    console.log('3dtiles添加')

    this.tilesetOSM = this.viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        // url: '../../../data/freedata/SampleData/Cesium3DTiles/Batched/BatchedColors/tileset.json'
        // url: '../../../data/freedata/SampleData/Cesium3DTiles/Classification/Photogrammetry/tileset.json'

        // url: Cesium.IonResource.fromAssetId(354307)
        // url: 'https://assets.cesium.com/96188/tileset.json?v=13',
        url: Cesium.IonResource.fromAssetId(96188), //osm
        // url: Cesium.IonResource.fromAssetId(354759), //TODO node爬一个
        maximumScreenSpaceError: 2, //最大的屏幕空间误差
        maximumNumberOfLoadedTiles: 10000, //最大加载瓦片个数
        show: !false,
      })
    )
    // 云层？？雾

    this.viewer.scene.globe.depthTestAgainstTerrain = true
    // let m = Cesium.Matrix4.fromArray([
    //   1.0, 0.0, 0.0, 0.0,
    //   0.0, 1.0, 0.0, 0.0,
    //   0.0, 0.0, 1.0, 0.0,
    //   0.0, 0.0, 5.0, 1.0 //x, y, z, 1.0
    // ]);
    // this.tileset._modelMatrix = m;
    // // test
    // window.tileset = this.tileset

    // tileset.readyPromise.then(static (tileset) {
    //   // Set the camera to view the newly added tileset
    //   this.viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
    // });
    // this.viewer.zoomTo(this.tileset);
    // CameraPro.cameraFlyTo()
  }

  addTestTerrain() {
    if (this.viewer.terrainProvider._ready) {
      console.log('删除地形')
      this.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({})
      return
    }

    this.viewer.terrainProvider = Cesium.createWorldTerrain({
      requestWaterMask: true, // required for water effects
      // requestVertexNormals: true, // required for terrain lighting
    })
    // this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    //   url: "http://192.168.0.253/DEM/common",
    //   // requestWaterMask: true
    // });

    console.log('添加地形')
  }

  addTestGlb() {
    let url = '../data/freedata/cesium_model/xyzBLR.gltf'
    let position = {
      x: 1532250.593519417,
      y: -4465019.220640106,
      z: 4275114.038722895,
    }
    window.glbTest = RenderGlb.renderGlbPositionGraphic(
      this.viewer,
      url,
      position,
      null,
      100
    )
    url = '../data/freedata/cesium_model/tg+Y345.gltf'
    position = {
      x: 1532250.593519417,
      y: -4465019.220640106,
      z: 4275114.038722895,
    }
    window.glbTest0 = RenderGlb.renderGlbPositionGraphic(
      this.viewer,
      url,
      position,
      null,
      100
    )
    url = '../data/freedata/cesium_model/tg.gltf'
    // url = '../data/freedata/cesium_model/tg_b.glb'
    position = {
      x: 1532250.593519417,
      y: -4465019.220640106,
      z: 4275114.038722895,
    }
    window.glbTest1 = RenderGlb.renderGlbPositionGraphic(
      this.viewer,
      url,
      position,
      null,
      100
    )

    console.log('glb')
  }

  addTestEntity() {
    let viewer = this.viewer
    // 简化xy维度分量曲线拟合（简单正弦替代） h自变量
    // let geomPositionsDown = [
    // {
    //   "x": 1532162.1808632398,
    //   "y": -4464940.472248416,
    //   "z": 4274840.0172978
    // },
    // {
    //   "x": 1532228.0557139297,
    //   "y": -4464961.787788805,
    //   "z": 4274794.450434736
    // },
    // {
    //   "x": 1532228.8361617175,
    //   "y": -4464967.542114518,
    //   "z": 4274788.203813634
    // },
    // {
    //   "x": 1532231.8379998512,
    //   "y": -4464969.60207644,
    //   "z": 4274784.998056613
    // },
    // {
    //   "x": 1532204.2695545384,
    //   "y": -4465016.507431232,
    //   "z": 4274746.163173296
    // },
    // {
    //   "x": 1532146.7362315175,
    //   "y": -4465003.1601245245,
    //   "z": 4274780.495235253
    // },
    // {
    //   "x": 1532171.4639137292,
    //   "y": -4464967.867945545,
    //   "z": 4274808.295865715
    // },
    // {
    //   "x": 1532146.5895440953,
    //   "y": -4464961.616725904,
    //   "z": 4274823.637764902
    // }]
    // let geomPositionsDown = [
    // {
    //   "x": 1532708.5012404223,
    //   "y": -4464891.525464672,
    //   "z": 4274696.342226522
    // },
    // {
    //   "x": 1532700.518549107,
    //   "y": -4464916.953313482,
    //   "z": 4274672.803506404
    // },
    // {
    //   "x": 1532764.836287581,
    //   "y": -4464939.458132267,
    //   "z": 4274626.546451784
    // },
    // {
    //   "x": 1532772.5541741783,
    //   "y": -4464917.278392582,
    //   "z": 4274646.810138061
    // }]

    let postyionsArrays = [
      [
        {
          x: 1532591.9829997814,
          y: -4464470.650219566,
          z: 4275140.715453387,
        },
        {
          x: 1532582.8865936932,
          y: -4464458.573295453,
          z: 4275157.454097067,
        },
        {
          x: 1532554.6430184883,
          y: -4464473.503858321,
          z: 4275153.040845757,
        },
        {
          x: 1532565.220783658,
          y: -4464485.881360914,
          z: 4275136.70124246,
        },
      ],
      [
        {
          x: 1532574.746268167,
          y: -4464454.800106165,
          z: 4275164.601935279,
        },
        {
          x: 1532553.4879222056,
          y: -4464464.8978446685,
          z: 4275160.645455847,
        },
        {
          x: 1532572.5000092841,
          y: -4464490.0636935495,
          z: 4275128.222645452,
        },
        {
          x: 1532593.3228141556,
          y: -4464478.223595554,
          z: 4275131.705421425,
        },
      ],
      [
        {
          x: 1532616.8098224772,
          y: -4464467.764671173,
          z: 4275134.959286815,
        },
        {
          x: 1532664.2679271442,
          y: -4464444.542129741,
          z: 4275141.955206959,
        },
        {
          x: 1532648.1053669974,
          y: -4464420.147659904,
          z: 4275173.440352376,
        },
        {
          x: 1532598.1257858593,
          y: -4464445.573187119,
          z: 4275164.622785165,
        },
      ],
      [
        {
          x: 1532611.2593839522,
          y: -4464400.595034288,
          z: 4275227.455253822,
        },
        {
          x: 1532614.5998030524,
          y: -4464403.32227554,
          z: 4275224.51202115,
        },
        {
          x: 1532618.309029304,
          y: -4464402.549458787,
          z: 4275223.713243681,
        },
        {
          x: 1532629.6373367365,
          y: -4464418.147264135,
          z: 4275204.965226638,
        },
        {
          x: 1532626.3371398437,
          y: -4464418.965753806,
          z: 4275203.298509954,
        },
        {
          x: 1532627.10773398,
          y: -4464422.77105387,
          z: 4275198.553353854,
        },
        {
          x: 1532593.622019727,
          y: -4464440.4251844715,
          z: 4275192.298476904,
        },
        {
          x: 1532591.0441729121,
          y: -4464437.172185627,
          z: 4275196.353297146,
        },
        {
          x: 1532587.769537559,
          y: -4464438.718540488,
          z: 4275196.206504322,
        },
        {
          x: 1532584.3012920201,
          y: -4464437.971311861,
          z: 4275197.965247476,
        },
        {
          x: 1532574.1992016018,
          y: -4464426.730837232,
          z: 4275212.547368545,
        },
        {
          x: 1532575.2956550075,
          y: -4464423.352802365,
          z: 4275216.062547035,
        },
        {
          x: 1532578.035609224,
          y: -4464422.403774116,
          z: 4275216.838540405,
        },
        {
          x: 1532576.1217971775,
          y: -4464419.093421957,
          z: 4275220.4087642245,
        },
      ],
      [
        {
          x: 1532568.9554433217,
          y: -4464445.005577473,
          z: 4275177.940150113,
        },
        {
          x: 1532625.7691848567,
          y: -4464412.44135029,
          z: 4275189.50113463,
        },
        {
          x: 1532625.1567556374,
          y: -4464407.89304637,
          z: 4275194.29669309,
        },
        {
          x: 1532627.257006268,
          y: -4464406.825898286,
          z: 4275194.555526016,
        },
        {
          x: 1532627.2560997203,
          y: -4464402.910302736,
          z: 4275198.665018237,
        },
        {
          x: 1532617.1356361054,
          y: -4464392.183705931,
          z: 4275213.515654761,
        },
        {
          x: 1532613.1819564083,
          y: -4464391.6068017045,
          z: 4275216.714188213,
        },
        {
          x: 1532593.796823256,
          y: -4464379.24730059,
          z: 4275235.384968918,
        },
        {
          x: 1532587.782164336,
          y: -4464382.2060368955,
          z: 4275236.22999008,
        },
        {
          x: 1532578.8059441021,
          y: -4464372.629657024,
          z: 4275247.55154419,
        },
        {
          x: 1532565.8955727585,
          y: -4464368.002099845,
          z: 4275256.638376093,
        },
        {
          x: 1532549.7696669896,
          y: -4464365.091380732,
          z: 4275266.272090874,
        },
        {
          x: 1532528.8424695032,
          y: -4464361.119649807,
          z: 4275277.138034315,
        },
        {
          x: 1532524.15769259,
          y: -4464363.220040614,
          z: 4275275.61344651,
        },
        {
          x: 1532539.274432611,
          y: -4464389.768519726,
          z: 4275243.665235208,
        },
        {
          x: 1532549.7843789516,
          y: -4464385.862634942,
          z: 4275244.204789899,
        },
        {
          x: 1532559.2377782913,
          y: -4464387.981091878,
          z: 4275238.506602847,
        },
        {
          x: 1532562.4276590014,
          y: -4464393.604223807,
          z: 4275231.993216713,
        },
        {
          x: 1532556.9773145968,
          y: -4464401.821864734,
          z: 4275225.669165182,
        },
        {
          x: 1532547.476822442,
          y: -4464405.28986282,
          z: 4275223.996697566,
        },
      ],
      [
        {
          x: 1532514.7011900197,
          y: -4464373.390364323,
          z: 4275268.647490221,
        },
        {
          x: 1532508.694662969,
          y: -4464362.430654721,
          z: 4275282.350027879,
        },
        {
          x: 1532356.4550573113,
          y: -4464427.4362968365,
          z: 4275268.762865765,
        },
        {
          x: 1532363.5250388456,
          y: -4464440.098366429,
          z: 4275253.553726424,
        },
      ],
      [
        {
          x: 1532369.8469707947,
          y: -4464449.870623441,
          z: 4275241.329398862,
        },
        {
          x: 1532378.3864991204,
          y: -4464461.040881344,
          z: 4275226.869751675,
        },
        {
          x: 1532527.0784142585,
          y: -4464394.021069539,
          z: 4275241.212868616,
        },
        {
          x: 1532520.5717824101,
          y: -4464383.098956387,
          z: 4275257.278712875,
        },
      ],
      [
        {
          x: 1532536.8844409382,
          y: -4464410.153628187,
          z: 4275223.024776519,
        },
        {
          x: 1532384.3159012878,
          y: -4464478.375731674,
          z: 4275207.031123211,
        },
        {
          x: 1532393.7376809337,
          y: -4464492.008198107,
          z: 4275191.361620822,
        },
        {
          x: 1532543.5140291713,
          y: -4464425.329026599,
          z: 4275206.621376921,
        },
      ],
      [
        {
          x: 1532561.923575787,
          y: -4464449.32617667,
          z: 4275173.287114939,
        },
        {
          x: 1532548.6175695779,
          y: -4464429.58158752,
          z: 4275200.076797383,
        },
        {
          x: 1532497.7735711443,
          y: -4464451.0988042485,
          z: 4275194.4459109,
        },
        {
          x: 1532499.9186572852,
          y: -4464451.528466289,
          z: 4275193.298200555,
        },
        {
          x: 1532513.3788903905,
          y: -4464473.631355003,
          z: 4275167.739520659,
        },
      ],
    ]

    let h = 100
    let precision = 0.2 //边墙插值精度
    let density = 1 / precision
    let timeWait = 2 //等待时间
    let timeMove = 5 //晃动时间

    // 起始时间
    var start = Cesium.JulianDate.fromDate(new Date(2017, 7, 11))
    // 结束时间
    var stop = Cesium.JulianDate.addSeconds(start, 100, new Cesium.JulianDate())

    // 设置始时钟始时间
    this.viewer.clock.startTime = start.clone()
    // 设置时钟当前时间
    this.viewer.clock.currentTime = start.clone()
    // 设置始终停止时间
    this.viewer.clock.stopTime = stop.clone()
    // 时间速率，数字越大时间过的越快
    this.viewer.clock.multiplier = 1
    // 时间轴
    this.viewer.timeline.zoomTo(start, stop)
    // // 循环执行,即为2，到达终止时间，重新从起点时间开始
    // this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;

    let myEntityCollection = new Cesium.CustomDataSource('testEntityCollection')
    this.viewer.dataSources.add(myEntityCollection)
    this.entities = myEntityCollection.entities

    // 1
    let moveEntity = new MoveEntityCollection(
      this.viewer,
      this.entities,
      start,
      stop,
      0.4
    )
    moveEntity.add(postyionsArrays[0], 140, 20)
    moveEntity.add(postyionsArrays[1], 20, 5)
    moveEntity = new MoveEntityCollection(
      this.viewer,
      this.entities,
      start,
      stop,
      1.1
    )
    moveEntity.add(postyionsArrays[2], 30, 10)
    moveEntity = new MoveEntityCollection(
      this.viewer,
      this.entities,
      start,
      stop,
      2.1
    )
    moveEntity.add(postyionsArrays[3], 50, 10)
    moveEntity.add(postyionsArrays[4], 15, 5)
    moveEntity = new MoveEntityCollection(
      this.viewer,
      this.entities,
      start,
      stop,
      1.5
    )
    moveEntity.add(postyionsArrays[5], 18, 6)
    moveEntity.add(postyionsArrays[6], 12, 4)
    moveEntity.add(postyionsArrays[7], 18, 6)
    moveEntity = new MoveEntityCollection(
      this.viewer,
      this.entities,
      start,
      stop,
      1.5
    )
    moveEntity.add(postyionsArrays[8], 40, 10)
  }
  addTestEntity_qk() {
    let viewer = this.viewer
    // 简化xy维度分量曲线拟合（简单正弦替代） h自变量
    // let geomPositionsDown = [
    // {
    //   "x": 1532162.1808632398,
    //   "y": -4464940.472248416,
    //   "z": 4274840.0172978
    // },
    // {
    //   "x": 1532228.0557139297,
    //   "y": -4464961.787788805,
    //   "z": 4274794.450434736
    // },
    // {
    //   "x": 1532228.8361617175,
    //   "y": -4464967.542114518,
    //   "z": 4274788.203813634
    // },
    // {
    //   "x": 1532231.8379998512,
    //   "y": -4464969.60207644,
    //   "z": 4274784.998056613
    // },
    // {
    //   "x": 1532204.2695545384,
    //   "y": -4465016.507431232,
    //   "z": 4274746.163173296
    // },
    // {
    //   "x": 1532146.7362315175,
    //   "y": -4465003.1601245245,
    //   "z": 4274780.495235253
    // },
    // {
    //   "x": 1532171.4639137292,
    //   "y": -4464967.867945545,
    //   "z": 4274808.295865715
    // },
    // {
    //   "x": 1532146.5895440953,
    //   "y": -4464961.616725904,
    //   "z": 4274823.637764902
    // }]
    // let geomPositionsDown = [
    // {
    //   "x": 1532708.5012404223,
    //   "y": -4464891.525464672,
    //   "z": 4274696.342226522
    // },
    // {
    //   "x": 1532700.518549107,
    //   "y": -4464916.953313482,
    //   "z": 4274672.803506404
    // },
    // {
    //   "x": 1532764.836287581,
    //   "y": -4464939.458132267,
    //   "z": 4274626.546451784
    // },
    // {
    //   "x": 1532772.5541741783,
    //   "y": -4464917.278392582,
    //   "z": 4274646.810138061
    // }]

    let postyionsArrays = [
      [
        {
          x: 1532591.9829997814,
          y: -4464470.650219566,
          z: 4275140.715453387,
        },
        {
          x: 1532582.8865936932,
          y: -4464458.573295453,
          z: 4275157.454097067,
        },
        {
          x: 1532554.6430184883,
          y: -4464473.503858321,
          z: 4275153.040845757,
        },
        {
          x: 1532565.220783658,
          y: -4464485.881360914,
          z: 4275136.70124246,
        },
      ],
      [
        {
          x: 1532574.746268167,
          y: -4464454.800106165,
          z: 4275164.601935279,
        },
        {
          x: 1532553.4879222056,
          y: -4464464.8978446685,
          z: 4275160.645455847,
        },
        {
          x: 1532572.5000092841,
          y: -4464490.0636935495,
          z: 4275128.222645452,
        },
        {
          x: 1532593.3228141556,
          y: -4464478.223595554,
          z: 4275131.705421425,
        },
      ],
      [
        {
          x: 1532616.8098224772,
          y: -4464467.764671173,
          z: 4275134.959286815,
        },
        {
          x: 1532664.2679271442,
          y: -4464444.542129741,
          z: 4275141.955206959,
        },
        {
          x: 1532648.1053669974,
          y: -4464420.147659904,
          z: 4275173.440352376,
        },
        {
          x: 1532598.1257858593,
          y: -4464445.573187119,
          z: 4275164.622785165,
        },
      ],
      [
        {
          x: 1532611.2593839522,
          y: -4464400.595034288,
          z: 4275227.455253822,
        },
        {
          x: 1532614.5998030524,
          y: -4464403.32227554,
          z: 4275224.51202115,
        },
        {
          x: 1532618.309029304,
          y: -4464402.549458787,
          z: 4275223.713243681,
        },
        {
          x: 1532629.6373367365,
          y: -4464418.147264135,
          z: 4275204.965226638,
        },
        {
          x: 1532626.3371398437,
          y: -4464418.965753806,
          z: 4275203.298509954,
        },
        {
          x: 1532627.10773398,
          y: -4464422.77105387,
          z: 4275198.553353854,
        },
        {
          x: 1532593.622019727,
          y: -4464440.4251844715,
          z: 4275192.298476904,
        },
        {
          x: 1532591.0441729121,
          y: -4464437.172185627,
          z: 4275196.353297146,
        },
        {
          x: 1532587.769537559,
          y: -4464438.718540488,
          z: 4275196.206504322,
        },
        {
          x: 1532584.3012920201,
          y: -4464437.971311861,
          z: 4275197.965247476,
        },
        {
          x: 1532574.1992016018,
          y: -4464426.730837232,
          z: 4275212.547368545,
        },
        {
          x: 1532575.2956550075,
          y: -4464423.352802365,
          z: 4275216.062547035,
        },
        {
          x: 1532578.035609224,
          y: -4464422.403774116,
          z: 4275216.838540405,
        },
        {
          x: 1532576.1217971775,
          y: -4464419.093421957,
          z: 4275220.4087642245,
        },
      ],
      [
        {
          x: 1532568.9554433217,
          y: -4464445.005577473,
          z: 4275177.940150113,
        },
        {
          x: 1532625.7691848567,
          y: -4464412.44135029,
          z: 4275189.50113463,
        },
        {
          x: 1532625.1567556374,
          y: -4464407.89304637,
          z: 4275194.29669309,
        },
        {
          x: 1532627.257006268,
          y: -4464406.825898286,
          z: 4275194.555526016,
        },
        {
          x: 1532627.2560997203,
          y: -4464402.910302736,
          z: 4275198.665018237,
        },
        {
          x: 1532617.1356361054,
          y: -4464392.183705931,
          z: 4275213.515654761,
        },
        {
          x: 1532613.1819564083,
          y: -4464391.6068017045,
          z: 4275216.714188213,
        },
        {
          x: 1532593.796823256,
          y: -4464379.24730059,
          z: 4275235.384968918,
        },
        {
          x: 1532587.782164336,
          y: -4464382.2060368955,
          z: 4275236.22999008,
        },
        {
          x: 1532578.8059441021,
          y: -4464372.629657024,
          z: 4275247.55154419,
        },
        {
          x: 1532565.8955727585,
          y: -4464368.002099845,
          z: 4275256.638376093,
        },
        {
          x: 1532549.7696669896,
          y: -4464365.091380732,
          z: 4275266.272090874,
        },
        {
          x: 1532528.8424695032,
          y: -4464361.119649807,
          z: 4275277.138034315,
        },
        {
          x: 1532524.15769259,
          y: -4464363.220040614,
          z: 4275275.61344651,
        },
        {
          x: 1532539.274432611,
          y: -4464389.768519726,
          z: 4275243.665235208,
        },
        {
          x: 1532549.7843789516,
          y: -4464385.862634942,
          z: 4275244.204789899,
        },
        {
          x: 1532559.2377782913,
          y: -4464387.981091878,
          z: 4275238.506602847,
        },
        {
          x: 1532562.4276590014,
          y: -4464393.604223807,
          z: 4275231.993216713,
        },
        {
          x: 1532556.9773145968,
          y: -4464401.821864734,
          z: 4275225.669165182,
        },
        {
          x: 1532547.476822442,
          y: -4464405.28986282,
          z: 4275223.996697566,
        },
      ],
      [
        {
          x: 1532514.7011900197,
          y: -4464373.390364323,
          z: 4275268.647490221,
        },
        {
          x: 1532508.694662969,
          y: -4464362.430654721,
          z: 4275282.350027879,
        },
        {
          x: 1532356.4550573113,
          y: -4464427.4362968365,
          z: 4275268.762865765,
        },
        {
          x: 1532363.5250388456,
          y: -4464440.098366429,
          z: 4275253.553726424,
        },
      ],
      [
        {
          x: 1532369.8469707947,
          y: -4464449.870623441,
          z: 4275241.329398862,
        },
        {
          x: 1532378.3864991204,
          y: -4464461.040881344,
          z: 4275226.869751675,
        },
        {
          x: 1532527.0784142585,
          y: -4464394.021069539,
          z: 4275241.212868616,
        },
        {
          x: 1532520.5717824101,
          y: -4464383.098956387,
          z: 4275257.278712875,
        },
      ],
      [
        {
          x: 1532536.8844409382,
          y: -4464410.153628187,
          z: 4275223.024776519,
        },
        {
          x: 1532384.3159012878,
          y: -4464478.375731674,
          z: 4275207.031123211,
        },
        {
          x: 1532393.7376809337,
          y: -4464492.008198107,
          z: 4275191.361620822,
        },
        {
          x: 1532543.5140291713,
          y: -4464425.329026599,
          z: 4275206.621376921,
        },
      ],
      [
        {
          x: 1532561.923575787,
          y: -4464449.32617667,
          z: 4275173.287114939,
        },
        {
          x: 1532548.6175695779,
          y: -4464429.58158752,
          z: 4275200.076797383,
        },
        {
          x: 1532497.7735711443,
          y: -4464451.0988042485,
          z: 4275194.4459109,
        },
        {
          x: 1532499.9186572852,
          y: -4464451.528466289,
          z: 4275193.298200555,
        },
        {
          x: 1532513.3788903905,
          y: -4464473.631355003,
          z: 4275167.739520659,
        },
      ],
    ]

    let h = 100
    let precision = 0.2 //边墙插值精度
    let density = 1 / precision
    let timeWait = 2 //等待时间
    let timeMove = 5 //晃动时间

    // 起始时间
    var start = Cesium.JulianDate.fromDate(new Date(2017, 7, 11))
    // 结束时间
    var stop = Cesium.JulianDate.addSeconds(start, 100, new Cesium.JulianDate())

    // 设置始时钟始时间
    this.viewer.clock.startTime = start.clone()
    // 设置时钟当前时间
    this.viewer.clock.currentTime = start.clone()
    // 设置始终停止时间
    this.viewer.clock.stopTime = stop.clone()
    // 时间速率，数字越大时间过的越快
    this.viewer.clock.multiplier = 1
    // 时间轴
    this.viewer.timeline.zoomTo(start, stop)
    // // 循环执行,即为2，到达终止时间，重新从起点时间开始
    // this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;

    let myEntityCollection = new Cesium.CustomDataSource('testEntityCollection')
    this.viewer.dataSources.add(myEntityCollection)
    this.entities = myEntityCollection.entities

    // 1
    let moveEntity = new MoveEntityCollection(
      this.viewer,
      this.entities,
      start,
      stop,
      0.4
    )
    moveEntity.add(postyionsArrays[0], 140, 20)
    moveEntity.add(postyionsArrays[1], 20, 5)
    moveEntity = new MoveEntityCollection(
      this.viewer,
      this.entities,
      start,
      stop,
      1.1
    )
    moveEntity.add(postyionsArrays[2], 30, 10)
    moveEntity = new MoveEntityCollection(
      this.viewer,
      this.entities,
      start,
      stop,
      2.1
    )
    moveEntity.add(postyionsArrays[3], 50, 10)
    moveEntity.add(postyionsArrays[4], 15, 5)
    moveEntity = new MoveEntityCollection(
      this.viewer,
      this.entities,
      start,
      stop,
      1.5
    )
    moveEntity.add(postyionsArrays[5], 18, 6)
    moveEntity.add(postyionsArrays[6], 12, 4)
    moveEntity.add(postyionsArrays[7], 18, 6)
    moveEntity = new MoveEntityCollection(
      this.viewer,
      this.entities,
      start,
      stop,
      1.5
    )
    moveEntity.add(postyionsArrays[8], 40, 10)
  }
}
export { TestDataAdd }

class MoveEntityCollection {
  /**
   * 同样动画
   * @param {*} viewer
   * @param {*} entities
   * @param {*} startTime
   * @param {*} endTime
   */
  constructor(viewer, entities, startTime, endTime, timenew) {
    this.viewer = viewer
    this.entities = entities
    this.startTime = startTime
    this.endTime = endTime
    this.timenew = timenew //不同
  }

  add(geomPositionsDown, height, precision) {
    // let Cartesian3ZERO = { x: 0, y: 0, Z: 0 }
    // // 局部ENU坐标系 转换
    let localAndWorldTransform = new LocalAndWorldTransform(
      geomPositionsDown[1]
    ) //简写 没用中心
    let groundPositionsLength = geomPositionsDown.length //上底面点数 柱子数
    let pillarsPositoinsLength = Math.floor(height / precision) + 1 //柱子点数

    let pillarsPositoinsArrays = [] //柱子集合
    let geomPositoinsSideArrays = [] //侧面集合
    let geomPositionsUp = [] //上表面
    let geomPositionsFullArrays = [geomPositionsDown, geomPositionsUp] //总面[底面,上表面，立面]
    // 几何面、

    // 初始化垂直边
    for (let i = 0; i < groundPositionsLength; i++) {
      debugger
      let pillarsPositoins = []
      pillarsPositoinsArrays.push(pillarsPositoins)
      let thisPointPositionLocal =
        localAndWorldTransform.WorldCoordinatesTolocal(geomPositionsDown[i])
      let h = 0
      let j = 0
      while (h < height) {
        thisPointPositionLocal.z = h
        console.log(thisPointPositionLocal.z)
        /**********************x*********************** */
        let newPillarsPositoin = localAndWorldTransform.localToWorldCoordinates(
          thisPointPositionLocal
        )
        pillarsPositoins.push(newPillarsPositoin)
        h += precision
        j++
      }
      // 顶端单独处理
      /**********************x*********************** */
      thisPointPositionLocal.z = height
      let newPillarsPositoin = localAndWorldTransform.localToWorldCoordinates(
        thisPointPositionLocal
      )
      pillarsPositoins.push(newPillarsPositoin)
      // RenderSimple.simplePointByPrimitives(this.viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection()), pillarsPositoins[j], 2, Cesium.Color.fromAlpha(Cesium.Color.RED, 0.5), 3.0)
    }
    console.log('pillarsPositoinsArrays', pillarsPositoinsArrays)

    // 绑定并初始化
    for (let i = 0; i < groundPositionsLength; i++) {
      let indexNext = (i + 1) % groundPositionsLength
      let thisPillarsPositoins = pillarsPositoinsArrays[i]
      let nextPillarsPositoins = pillarsPositoinsArrays[indexNext]
      geomPositionsFullArrays.push([])
      // 垂直面和顶面
      for (let j = 0; j < pillarsPositoinsLength; j++) {
        geomPositionsFullArrays[i + 2][j] = thisPillarsPositoins[j]
        geomPositionsFullArrays[i + 2][pillarsPositoinsLength + j] =
          nextPillarsPositoins[pillarsPositoinsLength - 1 - j]
      }
      geomPositionsFullArrays[1][i] =
        thisPillarsPositoins[pillarsPositoinsLength - 1]
    }
    console.log('geomPositionsFullArrays', geomPositionsFullArrays)
    // let geomPositoinsArrays = [geomPositionsDown, []] //总面[底面,上表面，立面]

    let pillarsPositoinsArraysClone = JSON.parse(
      JSON.stringify(pillarsPositoinsArrays)
    )

    // 循环更新位置
    let loop = setInterval(() => {
      if (
        this.viewer.clock.currentTime.secondsOfDay > this.endTime.secondsOfDay
      ) {
        clearInterval(loop)
      }

      // // 生成垂直边
      let dtime =
        this.viewer.clock.currentTime.secondsOfDay - this.startTime.secondsOfDay
      console.log('dtime', dtime)
      if (dtime > 0.5) {
        dtime += this.timenew
        for (let i = 0; i < groundPositionsLength; i++) {
          for (let j = 0; j < pillarsPositoinsLength; j++) {
            let pillarsPositoins = pillarsPositoinsArrays[i][j]
            let pillarsPositoinsClone = pillarsPositoinsArraysClone[i][j]
            // ENU局部坐标下不同高度位移
            let thisPillarsPositoins =
              localAndWorldTransform.WorldCoordinatesTolocal(pillarsPositoins)
            let thisPillarsPositoinsClone =
              localAndWorldTransform.WorldCoordinatesTolocal(
                pillarsPositoinsClone
              )
            // thisPillarsPositoins.x += 1
            // thisPillarsPositoins.x = thisPillarsPositoinsClone.x
            thisPillarsPositoins.x =
              thisPillarsPositoinsClone.x +
              this.moveSin(dtime, thisPillarsPositoins.z)
            thisPillarsPositoins.y =
              thisPillarsPositoinsClone.y +
              this.moveSin(dtime + 1, thisPillarsPositoins.z)
            let newPillarsPositoin =
              localAndWorldTransform.localToWorldCoordinates(
                thisPillarsPositoins
              )
            pillarsPositoins.x = newPillarsPositoin.x
            pillarsPositoins.y = newPillarsPositoin.y
            pillarsPositoins.z = newPillarsPositoin.z
          }
        }
      }
    }, 100)

    // // this._mouseMovePointPrimitives.position = geomPositoinsArrays[1][2]
    for (let index = 0; index < geomPositionsFullArrays.length; index++) {
      let mousePolygonGroundEntity = this.entities.add({
        // name: 'polygon',
        polygon: {
          hierarchy: new Cesium.CallbackProperty(() => {
            // console.log(viewer.clock.currentTime)
            return new Cesium.PolygonHierarchy(geomPositionsFullArrays[index])
          }, false),
          perPositionHeight: true,
          // hierarchy: new Cesium.PolygonHierarchy(geomPositoinsArrays[0]),
          material: Cesium.Color.fromAlpha(Cesium.Color.WHITE, 0.8),
        },
      })
    }
  }

  /**
   * 单方向偏移规则   高度修改
   * @param {*} dtime 相对时间
   * @param {*} h 相对底面高度
   * @returns
   */
  moveSin(dtime, h) {
    console.log('dtime', h)
    // y=Asin(ωx+φ)+k
    //画正弦曲线
    //dot 原点
    let amplitude = 2 //振幅 -- A 最大振幅m
    let initialPhase = 0 //初相 -- φ 位置
    let setover = 0 // 偏距 -- k
    let palstance = 2 //角速度 -- ω  波宽
    //len 周期数
    let x = dtime + h / 100
    let y =
      (h / 60) * amplitude * Math.sin(palstance * x + initialPhase) + setover
    console.log('y', y)
    return y //单方向偏移量
  }
}
