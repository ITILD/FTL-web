class WorldPositionTransform {
  constructor() {

  }

  /**
   * 经纬度高程修改positions
   * @param {*} positions 
   * @param {*} heightAdd  m高度改正 
   * @param {*} lonRadiansAdd 弧度！！！
   * @param {*} latRadiansAdd 弧度
   */
  static PositionByCartographicChange(positions, heightAdd, lonRadiansAdd, latRadiansAdd) {
    let positionResult
    for (let i = 0; i < positions.length; i++) {
      let cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(positions[i])
      heightAdd && (cartographic.height += heightAdd)
      lonRadiansAdd && (cartographic.lon += lonRadiansAdd)
      latRadiansAdd && (cartographic.lat += latRadiansAdd)

      positionResult[i] = Cesium.Cartesian3.fromRadians(cartographic)
    }
    return positionResult
  }




  /**
   * 获取完整位置信息
   * @param {*} coordinate 
   * @param {*} type 
   * @param {*} result 
   */
  static getPositionAndCartographic(coordinate, type, result) {
    let position
    let cartographicRadians
    let cartographicDegrees
    switch (type) {
    case 'position':
      position = coordinate
      break;
    case 'cartographicDegrees':
      cartographicRadians = coordinate
      position = Cesium.Cartesian3.fromDegrees(coordinate.longitude, coordinate.latitude, coordinate.height)
      // Cesium.Cartographic.fromDegrees
      break;
    case 'cartographicRadians':
      cartographicDegrees = coordinate
      position = Cesium.Cartesian3.fromRadians(coordinate.longitude, coordinate.latitude, coordinate.height)

      break;

    default:
      break;
    }
    result.position = position
    // let cameraCatographic = Cesium.Cartographic.fromCartesian(cameraPosition)//其他坐标系 默认Cesium.Ellipsoid.WGS84.cartesianToCartographic
    result.cartographicRadians = cartographicRadians = cartographicRadians || Cesium.Ellipsoid.WGS84.cartesianToCartographic(position) // { longitude: -1.2401877595579294, latitude: 0.7390897322079129, height: -23.82495725068516 }
    result.cartographicDegrees = cartographicDegrees || {
      longitude: Cesium.Math.toDegrees(cartographicRadians.longitude),
      latitude: Cesium.Math.toDegrees(cartographicRadians.latitude),
      height: cartographicRadians.height
    }

  }
}