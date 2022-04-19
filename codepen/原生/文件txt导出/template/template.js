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
  let fid = 0
  lonAdd = 10.0
  latAdd = 10.0
  for (let lon = -180; - 180.0 <= lon && lon < 180.0; lon += lonAdd) {
    for (let lat = -90.0; - 90.0 <= lat && lat < 90.0; lat += latAdd) {
      fid++
      console.log(fid,' ',lon,' ',lat)
      let featurePolygon = {
        "type": "Feature",
        "properties": { "fid": fid, "name": lon+','+lat },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [lon, lat, 0.0],
              [lon + lonAdd, lat, 0.0],
              [lon + lonAdd, lat + latAdd, 0.0],
              [lon, lat + latAdd, 0.0],
              [lon, lat, 0.0]
            ]
          ]
        }
      }
      polygon.features.push(featurePolygon)

    }
  }
  return polygon
}