/**

 * 局部坐标系与世界坐标系转换，局部坐标系的轴方向由可选参数direction控制，默认是eastNorthUp北、东、上为轴线

 * 初始化转换用逆矩阵

 * @param {Number} RCSorigincenter 世界坐标系中的笛卡尔三维坐标

 * @param {Number} direction 坐标轴方向，值是"northEastDown","northUpEast","northWestUp","eastNorthUp"(默认)!!

 */

class LocalAndWorldTransform {
  constructor(RCSorigincenter, direction) {
    // let RCSorigincenter = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);

    if (direction == "northEastDown")

      this.RCSMatrix = Cesium.Transforms.northEastDownToFixedFrame(RCSorigincenter);

    else if (direction == "northUpEast")

      this.RCSMatrix = Cesium.Transforms.northUpEastToFixedFrame(RCSorigincenter);

    else if (direction == "northWestUp")

      this.RCSMatrix = Cesium.Transforms.northWestUpToFixedFrame(RCSorigincenter);

    else

      this.RCSMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(RCSorigincenter);

    this.RCSmatrixInverse = Cesium.Matrix4.inverseTransformation(this.RCSMatrix, new Cesium.Matrix4());
  }

  /**

   * 局部坐标转换成对应的世界坐标

   *

   * @param {Object} localCoordinates 局部坐标系_笛卡尔，如 {x:1,y:1,z:1}

   * @param {Object} result 世界坐标系_笛卡尔
   * @returns

   */

  localToWorldCoordinates(localCoordinates, result) {

    if (!result) {

      result = new Cesium.Cartesian3();

    }

    Cesium.Matrix4.multiplyByPoint(this.RCSMatrix, localCoordinates, result);

    return result;

  };

  /**

   * 世界坐标转换成对应的局部坐标

   *

   * @param {Object} WorldCoordinates 世界坐标系_笛卡尔

   * @param {Object} result 局部坐标系_笛卡尔

   * @returns

   */

  WorldCoordinatesTolocal(WorldCoordinates, result) {

    if (!result) {

      result = new Cesium.Cartesian3();

    }

    Cesium.Matrix4.multiplyByPoint(this.RCSmatrixInverse, WorldCoordinates, result);

    return result;

  }


}


export {
  LocalAndWorldTransform
}