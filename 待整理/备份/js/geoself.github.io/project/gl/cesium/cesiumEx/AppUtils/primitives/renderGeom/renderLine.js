/**
 *
 * @param {*} PrimitiveCollection PrimitiveCollection
 * @param {*} coordinates 经度和纬度值的列表。值交替显示[经度，纬度，经度，纬度...]。
 * @param {*} width 线宽
 * @param {*} color 颜色
 * @param {*} alpha 透明度
 */
function simpleLineByPrimitive(
  PrimitiveCollection,
  coordinates,
  width,
  color,
  alpha
) {
  let boolAlpha = (alpha != null)
  let linePrimitive = new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray(coordinates),
        width: width, //线宽
        vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
      }),
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.fromCssColorString(color).withAlpha(alpha)
        ), //color  必须设置 不然没有效果
      },
    }),
    appearance: new Cesium.PolylineColorAppearance({
      translucent: boolAlpha,
    }),
  })
  // return linePrimitive
  PrimitiveCollection.add(linePrimitive)
}

/**
 * 带高程
 * @param {*} PrimitiveCollection PrimitiveCollection
 * @param {*} coordinates 经度，纬度和高度值的列表。值交替显示[经度，纬度，高度，经度，纬度，高度...]。
 * @param {*} width 线宽
 * @param {*} color 颜色 "#FF0000"
 * @param {*} alpha 透明度
 */
function simpleLineHeightByPrimitive(
  PrimitiveCollection,
  positions,
  coordinates,
  width,
  color,
  alpha
) {
  let boolAlpha = alpha || false
  let linePrimitive = new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: positions || Cesium.Cartesian3.fromDegreesArrayHeights(coordinates),
        width: width, //线宽
        vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
      }),
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.fromCssColorString(color).withAlpha(alpha)
        ), //color  必须设置 不然没有效果
      },
    }),
    appearance: new Cesium.PolylineColorAppearance({
      translucent: boolAlpha,
    }),
  })
  // return linePrimitive
  PrimitiveCollection.add(linePrimitive)
}


/** 
 *            // 创建材质，在MaterialAppearance中若不添加基础材质，模型将会透明
            var material = new Cesium.Material.fromType("Color");
                material.uniforms.color =  Cesium.Color.WHITE;
            // 自定义材质
            const aper = new Cesium.MaterialAppearance({
                material: material,
                translucent: true,
                closed: true,
            })
                   // 加载模型
            var p = viewer.scene.primitives.add(
                new Cesium.Primitive({
                    geometryInstances: [instance, instance2],
                    appearance: aper,
                    releaseGeometryInstances: false,
                    compressVertices: false,
                })
            )
 */

export {
  simpleLineByPrimitive,
  simpleLineHeightByPrimitive
}