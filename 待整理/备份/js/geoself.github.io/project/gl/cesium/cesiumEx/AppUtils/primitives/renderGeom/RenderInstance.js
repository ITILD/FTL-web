class RenderInstance {
  constructor(viewer) {
    this.viewer = viewer;
  }

  /**
   * 添加单模型
   * @param {*} url 
   * @param {*} modelMatrix 
   * @param {*} primitiveModelCollection  要添加的渲染集合
   * @param {*} modelPosition 混合样式 动画设置 
   */
  PolylineVolumeGeometryInstance(id, polylinePositions, PrimitiveCollection, shapePositions) {
    let polylinevolumeinstance = new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineVolumeGeometry({
        vertexFormat: Cesium.MaterialAppearance.MaterialSupport.BASIC.vertexFormat,
        polylinePositions: polylinePositions,
        // Cesium.Cartesian3.fromDegreesArrayHeights(
        //   [
        //     90, 35, 50000,
        //     110, 35, 50000
        //   ]),
        shapePositions: shapePositions,
        // cornerType: Cesium.CornerType.MITERED
      }),

      id: id
    });

    PrimitiveCollection.add(new Cesium.Primitive({
      geometryInstances: [polylinevolumeinstance],
      appearance: new Cesium.MaterialAppearance({
        material: Cesium.Material.fromType('Color', {
          color: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#79D9FF'), 0.4)
        }),
        // faceForward: true
        flat: true
      }) //PolylineColorAppearance/PolylineMaterialAppearance请区分使用场景
    }));
  }


}


/**
 * 带高程
 * @param {*} PrimitiveCollection PrimitiveCollection
 * @param {*} coordinates 经度，纬度和高度值的列表。
 * @param {*} width 点宽10
 * @param {*} color 颜色 "#FF0000"
 * @param {*} alpha 透明度
 */
function simpleVolumeBox(
  PrimitiveCollection,
  coordinates,
  width,
  color,
  alpha
) {
  PrimitiveCollection.add({
    show: true,
    position: Cesium.Cartesian3.ZERO,
    pixelSize: width,
    color: Cesium.ColorGeometryInstanceAttribute.fromColor(
      Cesium.Color.fromCssColorString(color).withAlpha(alpha)
    ), //color  必须设置 不然没有效果,
    outlineColor: Cesium.Color.TRANSPARENT,
    outlineWidth: 0.0,
    id: undefined
  });
}









export {
  simpleVolumeBox,
  RenderInstance
}