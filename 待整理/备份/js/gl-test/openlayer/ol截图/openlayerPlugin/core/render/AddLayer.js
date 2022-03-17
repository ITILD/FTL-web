class AddLayer {



  // 加载栅格瓦片，返回图层对象
  /**
   * 
   * @param {*} baseUrl "http://192.168.0.253:8081/geoserver/gwc/service/wmts"
   * @param {*} layerName 'Map:Map-New-DL'
   * @returns 
   */
  static loadWMTSLayer(baseUrl, layerName) {

    let gridsetName = 'EPSG:4326';
    let gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8',
      'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18',
      'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'
    ];
    let projection = new ol.proj.Projection({
      code: 'EPSG:4326',
      units: 'degrees',
      axisOrientation: 'neu',
      global: false
    });
    let resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625,
      6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5,
      5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7
    ];

    let source = new ol.source.WMTS({
      crossOrigin: 'anonymous', //跨域
      url: baseUrl,
      layer: layerName,
      matrixSet: gridsetName,
      format: "image/png",
      projection: projection,
      tileGrid: new ol.tilegrid.WMTS({
        tileSize: [256, 256],
        extent: [-180.0, -90.0, 180.0, 90.0],
        origin: [-180.0, 90.0],
        resolutions: resolutions,
        matrixIds: gridNames
      }),
      style: '',
      wrapX: true
    });

    let tile = new ol.layer.Tile({
      source: source
    });
    return tile
  }


  static loadTMSLayer(baseUrl, layerName) {
    let projection = new ol.proj.Projection({
      code: 'EPSG:4326',
      units: 'degrees',
      axisOrientation: 'neu',
      global: false
    });

    //切片图层
    return new ol.layer.Tile({
    
      // preload: Infinity,
      // title: layerConfig.name,
      // name: layerConfig.layer,
      // visible: iTob(layerConfig.showByDefault),
      source: new ol.source.XYZ({
        crossOrigin: 'anonymous', //跨域
        projection: projection,
        tileGrid: ol.tilegrid.createXYZ({ extent: [-180, -90, 180, 90] }),
        tileUrlFunction: function (tileCoord, pixelRatio, proj) {
          return baseUrl + '/' +layerName + '/' + (tileCoord[0] - 1) + '/' + tileCoord[1] + '/' + (Math.pow(2, tileCoord[0] - 1) + tileCoord[2]) + '.png';
        }
      })
    });
  }




  
// // 创建wms的tile切片图层（有缓存，速度快）
// function createWmsTileLayer(layerConfig) {
//   return new ol.layer.Tile({
//       title: layerConfig.name,
//       name: layerConfig.layer,
//       preload: Infinity,
//       visible: iTob(layerConfig.showByDefault),
//       //source : new ol.source.ImageWMS({
//       source: new ol.source.TileWMS({
//           url: mapConfig.wmsUrl,
//           params: {
//               'FORMAT': mapConfig.format,
//               'VERSION': '1.1.1',
//               STYLES: '',
//               LAYERS: layerConfig.layer,
//               tilesOrigin: mapConfig.tilesOrigin,
//               transition: 0
//           }
//       })
//   });
// }

// // 创建wms的非切片图层（无缓存速度慢）
// function createWmsSingleTileLayer(layerConfig) {
//   return new ol.layer.Image({
//       title: layerConfig.name,
//       name: layerConfig.layer,
//       visible: iTob(layerConfig.showByDefault),
//       source: new ol.source.ImageWMS({
//           url: mapConfig.wmsUrl,
//           params: {
//               'FORMAT': mapConfig.format,
//               'VERSION': '1.1.1',
//               STYLES: '',
//               LAYERS: layerConfig.layer,
//               tilesOrigin: mapConfig.tilesOrigin,
//               transition: 0
//           }
//       })
//   });
// }


}

export { AddLayer }