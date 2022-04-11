let testFunc = () => {
  let jsonStr = dataMock()
  data = JSON.stringify(jsonStr)
  let time = new Date().Format('hh时mm分ss秒')
  let name = 'mockdata' + time + '.json'
  exportRaw(data, name)
}

let dataMock = () => {
  /**
   * 全球瓦块geojson数组
   */
  let polygon = {
    "type": "FeatureCollection",
    "name": "polygonMockByJs",
    "crs": {
      "type": "name",
      "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" }
    },
    "features": [
      // {
      //   "type": "Feature",
      //   "properties": { "fid": 1, "name": null },
      //   "geometry": {
      //     "type": "Polygon",
      //     "coordinates": [
      //       [
      //         [-180.0, 90.0, 0.0],
      //         [-160.0, 90.0, 0.0],
      //         [-160.0, 80.0, 0.0],
      //         [-180.0, 80.0, 0.0],
      //         [-180.0, 90.0, 0.0]
      //       ]
      //     ]
      //   }
      // },
      // {
      //   "type": "Feature",
      //   ...
      // }
    ]
  }
  return polygon
}