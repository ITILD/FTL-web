import {
  LocalAndWorldTransform
} from "../../translate/LocalAndWorldTransform.js";


/**
 * 根据三维图形Geom裁剪隐藏渲染内容
 * 
 */
class ClippingPlanesByGeom {
  /**
   * 裁剪 单个gltf模型，3D Tileset或Globe的指定对象列表外部区域中的渲染 entity._model
   */
  constructor() {}
  /**
   * 
   * @param {*} modelsArray 
   * @param {*} points 
   * @param {*} directionStart 顺时针1逆时针-1 确定各面法线方向
   */
  static setClippingPlanesSimple(modelsArray, points, directionStart) {
    debugger
    for (let index = 0; index < modelsArray.length; index++) {
      let model = modelsArray[index];
      let clippingPlanes = []
      switch (model.constructor.name) {
      case "Globe":
        debugger
        for (let i = 0; i < points.length; ++i) {
          // 每个两点中点坐标   球面法线方向
          let nextIndex = (i + 1) % points.length
          // 地球表面正上方 与模型局部正上方 let up = new Cesium.Cartesian3(0, 0, 10)不一致 
          let up = Cesium.Cartesian3.add(points[i], points[nextIndex], new Cesium.Cartesian3()) //接近中点
          // 坐标差  0->1矢量
          let right = Cesium.Cartesian3.subtract(points[i], points[nextIndex], new Cesium.Cartesian3())
          Cesium.Cartesian3.multiplyByScalar(right, directionStart, right) // 根据绘制方向修改方向
          // 法线 裁切方向
          let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3())
          // 裁剪面
          let planeTmp = Cesium.Plane.fromPointNormal(points[i], normal)
          clippingPlanes.push(Cesium.ClippingPlane.fromPlane(planeTmp))

        }
        break;
      case "Cesium3DTileset":
        debugger
        // 3dtiles局部坐标集合
        let point3DtilesPositions = []
        let localAndWorldTransform = new LocalAndWorldTransform(model.boundingSphere.center)
        points.forEach(clickPosition => {
          let postion = localAndWorldTransform.WorldCoordinatesTolocal(clickPosition)
          point3DtilesPositions.push(postion)
        });
        debugger
        for (let i = 0; i < point3DtilesPositions.length; ++i) {
          let nextIndex = (i + 1) % point3DtilesPositions.length
          let up = new Cesium.Cartesian3(0, 0, 10) //局部坐标垂向
          let right = Cesium.Cartesian3.subtract(point3DtilesPositions[i], point3DtilesPositions[nextIndex], new Cesium.Cartesian3()) // 坐标差  点1->2矢量
          Cesium.Cartesian3.multiplyByScalar(right, directionStart, right)
          // 法线 裁切方向
          let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3())
          let planeTmp = Cesium.Plane.fromPointNormal(point3DtilesPositions[i], normal)
          clippingPlanes.push(Cesium.ClippingPlane.fromPlane(planeTmp))

        }
        break;
      case "Model":

        break;

      default:
        break;
      }
      //裁切
      model.clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: clippingPlanes,
        edgeWidth: 1,
        edgeColor: Cesium.Color.WHITE,
        // unionClippingRegions: !false,
        // edgeColor: Cesium.Color.fromBytes(161, 169, 173, 255),

      })

    }
  }

  static destroyAll(modelsArray) {
    modelsArray.forEach(model => {
      model.clippingPlanes = model.clippingPlanes && model.clippingPlanes.destroy();
    });

  }

}


export {
  ClippingPlanesByGeom
}