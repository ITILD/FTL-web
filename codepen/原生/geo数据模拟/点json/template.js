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
  let point = {
    "type": "FeatureCollection",
    "name": "pointMockByJs",
    "crs": {
      "type": "name",
      "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" }
    },
    "features": [
      // {
      //   "type": "Feature",
      //   "geometry": {
      //     "type": "Point",
      //     "coordinates": [125.6, 10.1]
      //   },
      //   "properties": {
      //     "name": "Dinagat Islands"
      //   }
      // }
    ]
  }
  let fid = 0

  /**
   * 84椭球赤道长   40075.02   km
   * 1经度赤道长度       40075.02/360 = 111.3195  km
   * 
   */
  let chidao = 40075.02

  let long500m = 0.5 / chidao * 360


  lonAdd = long500m //步长
  latAdd = long500m //步长
  // 限定范围
  // let pointThis = {
  //   lonMin: 121.0,
  //   lonMax: 123.6,
  //   latMin: 38.7,
  //   latMax: 40.2
  // }
  let pointThis = {
    lonMin: 121.51,
    lonMax: 121.52,
    latMin: 39.0,
    latMax: 39.1
  }

  for (let lon = pointThis.lonMin; pointThis.lonMin <= lon && lon < pointThis.lonMax; lon += lonAdd) {
    for (let lat =  pointThis.latMin; pointThis.latMin <= lat && lat <  pointThis.latMax; lat += latAdd) {
      fid++
      console.log(fid, ' ', lon, ' ', lat)
      let featurepoint = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [lon, lat, 0.0],
        },
        "properties": {
          "properties": { "fid": fid, "name": lon + ',' + lat },
        }
      }



      point.features.push(featurepoint)

    }
  }
  return point
}