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
    let positionRadiansArray = Cesium.Ellipsoid.WGS84.cartesianToCartographic(Position)
    pickResult.lon = Cesium.Math.toDegrees(positionRadiansArray.longitude)
    pickResult.lat = Cesium.Math.toDegrees(positionRadiansArray.latitude)
    pickResult.h = positionRadiansArray.height

  } else {
    // pickResult = null
  }

}


