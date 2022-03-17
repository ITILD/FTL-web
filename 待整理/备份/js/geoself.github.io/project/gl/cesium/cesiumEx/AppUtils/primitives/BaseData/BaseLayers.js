class BaseLayers {
  /**
   * 基础图层添加管理
   * 原始函数！
   * @param {*} viewer 
   */
  constructor(viewer) {
    this.viewer = viewer
    this.layers = new Map()
  }

  /**
   * 
   * @param {*} name 
   * @param {*} type 
   * @param {*} index 叠加顺序 默认最高
   * @param {*} config 非默认图层配置
   * @returns 
   */
  addLayer(name, type, index, config) {
    let provider;
    switch (type) {


    case "tms": //tms
      provider = new Cesium.createTileMapServiceImageryProvider({
        url: config.url //url为文件夹地址
      })
      break;

    case "geoserver_WMTS": //geoserver WMTS
      let matrixIds = [
        'EPSG:4326:0',
        'EPSG:4326:1',
        'EPSG:4326:2',
        'EPSG:4326:3',
        'EPSG:4326:4',
        'EPSG:4326:5',
        'EPSG:4326:6',
        'EPSG:4326:7',
        'EPSG:4326:8',
        'EPSG:4326:9',
        'EPSG:4326:10',
        'EPSG:4326:11',
        'EPSG:4326:12',
        'EPSG:4326:13',
        'EPSG:4326:14',
        'EPSG:4326:15',
        'EPSG:4326:16',
        'EPSG:4326:17',
        'EPSG:4326:18',
        'EPSG:4326:19',
        'EPSG:4326:20',
        'EPSG:4326:21',
      ]
      //1.新建ImageryProvider
      let provider = new Cesium.WebMapTileServiceImageryProvider({
        url: config.url,
        layer: config.typename,
        style: '',
        format: 'image/png',
        tileMatrixSetID: 'EPSG:4326',
        tileMatrixLabels: matrixIds,
        tilingScheme: new Cesium.GeographicTilingScheme({
          numberOfLevelZeroTilesX: 2,
          numberOfLevelZeroTilesY: 1,
        }),
      })
      break;
    case "osm_vt": //矢量图
      provider = new Cesium.OpenStreetMapImageryProvider({
        url: 'https://a.tile.openstreetmap.org/'
      })
      break;
      //天地图影像
    case "tdt_img":
      let key = config.key || '8a7a551905711535885142a660a10111'
      provider = new Cesium.WebMapTileServiceImageryProvider({
        url: "http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
          "&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
          "&style=default&format=tiles&tk=" + key,
        layer: "tdtCva",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "c",
        subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        tilingScheme: new Cesium.GeographicTilingScheme(),
        tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
        maximumLevel: 18,
        show: false
      })
      break;
      //天地图标注
    case "tdt_lb":
      let key = config.key || '8a7a551905711535885142a660a10111'
      provider = new Cesium.WebMapTileServiceImageryProvider({
        url: "http://{s}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
          "&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
          "&style=default&format=tiles&tk=" + key,
        layer: "tdtCva",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "c",
        subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        tilingScheme: new Cesium.GeographicTilingScheme(),
        tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
        maximumLevel: 17,
        show: false
      })
      break;
    case "bing_img": //bing 影像
      provider = Cesium.createWorldImagery({
        style: Cesium.IonWorldImageryStyle.AERIAL,
      })
      break;
    case "bing_lb": //bing影像附带标注
      provider = Cesium.createWorldImagery({
        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
      })
      break;

    default:
      break;
    }

    if (!provider) {
      return
    }
    let imageryLayer = this.viewer.imageryLayers.addImageryProvider(provider, index)
    this.layers.set(name, imageryLayer)
    console.log("添加图层：" + name)
  }

  remove(name) {
    let imageryLayer = this.layers.get(name)
    this.viewer.imageryLayers.remove(imageryLayer)
  }
}
export { BaseLayers }