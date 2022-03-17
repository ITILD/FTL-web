class ComputationalGeom {
  /**
   * 几何部分计算
   */
  constructor() {

  }


  // 快速

  static booleanClockwise() {

  }
  // 窗口坐标   最快顺逆时针
  static booleanClockwiseWindow() {

  }
  // 地球法线方向顺逆
  static booleanClockwiseGloble() {

  }

  //凸包（完全顺时针 完全逆时针）





  // 点插值
  /**
   * 计算最佳线性插值 加密点
   * @param {*} positionTwo 
   * @param {*} density  密度 点数/m   最佳5？
   * @returns 
   */
  static getLerpByPoints(positionTwo, density) {
    let pointStart = positionTwo[0]
    let pointEnd = positionTwo[1]
    let positions = [pointStart]
    // 总点数 向上取整
    let countPoints = Math.ceil(density * Cesium.Cartesian3.distance(pointStart, pointEnd, new Cesium.Cartesian3())) //密度*长度
    for (let i = 1; i < countPoints; i++) {
      let ponitThis = Cesium.Cartesian3.lerp(pointStart, pointEnd, i / countPoints, new Cesium.Cartesian3())
      positions.push(ponitThis);
    }
    positions.push(pointEnd);
    return positions
  }





  /**
   * 绘制凸包检测toleft简单验证  地球法线正向
   */
  static polygonDirectionSet(clickPositions, polygonDirection) {
    // ToLeftTest  凸包  考虑最后
    let i = clickPositions.length - 1
    let points = clickPositions
    let directionLast = Cesium.Cartesian3.subtract(points[i - 1], points[i - 2], new Cesium.Cartesian3())
    let directionNow = Cesium.Cartesian3.subtract(points[i], points[i - 1], new Cesium.Cartesian3())
    // 前向
    let directionUpNow = Cesium.Cartesian3.cross(directionLast, directionNow, new Cesium.Cartesian3())
    let directionPointDirectionUpNowAngle = Cesium.Cartesian3.angleBetween(directionUpNow, points[i]) // 前向绘制线法向
    // 后向
    let directionEnd = Cesium.Cartesian3.subtract(points[i], points[0], new Cesium.Cartesian3())
    let directionUpEnd = Cesium.Cartesian3.cross(directionEnd, directionNow, new Cesium.Cartesian3())
    let directionPointDirectionUpEndAngle = Cesium.Cartesian3.angleBetween(directionUpEnd, points[i]) // 后向绘制线法向

    // 凹多边形（绘制中顺逆变化）
    if (directionPointDirectionUpNowAngle < 1.57) {
      if (directionPointDirectionUpEndAngle > 1.57) {
        // 中途变化
        // debugger
        // 指示出错
        // this._mouseMovePointPrimitives.position = this._clickPositions[this._clickPositions.length - 2]
        // alert('false')
      }
      console.log('逆时针')
      polygonDirection = -1

    } else {
      if (directionPointDirectionUpEndAngle < 1.57) {
        // debugger
        // this._mouseMovePointPrimitives.position = this._clickPositions[this._clickPositions.length - 2]
        // alert('false')
      }
      console.log('顺时针')
      polygonDirection = 1
    }


    return polygonDirection

  }

}
export { ComputationalGeom }