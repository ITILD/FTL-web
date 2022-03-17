class RenderSimple {

  /**
   * 无固定场景宽度点线面
   */
  constructor() {

  }
  /**
   * 带高程
   * @param {*} pointPrimitives PointPrimitiveCollection
   * @param {*} position 经度，纬度和高度值的列表。
   * @param {*} width 线宽
   * @param {*} color 颜色 "#FF0000"   Cesium.Color.fromCssColorString('#67ADDF')   Cesium.Color.fromAlpha(Cesium.Color.RED, 0.9); Cesium.Color.fromRgba(0x67ADDFFF);
   * @param {*} outlineWidth 外轮廓
   */
  static simplePointByPrimitives(
    PrimitiveCollection,
    position,
    width,
    color1,
    outlineWidth
  ) {

    let pointPrimitive = PrimitiveCollection.add({
      show: true,
      position: position,
      pixelSize: width,
      color: color1 || Cesium.Color.WHITE,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: outlineWidth || 1.0,
      id: undefined
    });

    return pointPrimitive
  }

  /**
   * 带高程
   * @param {*} PrimitiveCollection PrimitiveCollection
   * @param {*} positions 
   * @param {*} width 线宽
   * @param {*} color 颜色 "#FF0000"
   * @param {*} alpha 透明度
   */
  static simpleLineByPrimitive(
    PrimitiveCollection,
    positions,
    width,
    color,
    alpha
  ) {
    debugger
    let linePrimitive = PrimitiveCollection.add({
      positions: positions,
      width: width,
      // https://www.jianshu.com/p/a983160234ad 材质
      material: Cesium.Material.fromType(Cesium.Material.PolylineGlowType, {
        glowPower: 0.2,
        taperPower: 0.9, //锥体
        color: color
      }),
    });
    return linePrimitive
  }

  static simplePolygonByPrimitive(
    PrimitiveCollection,
    positions,
    width,
    color,
    alpha) {}



  static simplePolygonByPrimitiveInstance(
    PrimitiveCollection,
    positions,
    color,
    DiffuseMapImage) {
    let materialOption
    if (color) {
      materialOption = {
        fabric: {
          type: 'Color',
          uniforms: {
            color: color
          }
        }
      }
    }
    if (DiffuseMapImage) {
      materialOption = {
        fabric: {
          type: 'DiffuseMap',
          uniforms: {
            image: DiffuseMapImage,
            repeat: { x: 1, y: 1 }, //不重复
          }
        }
      }
    }
    let polygonInstance = new Cesium.GeometryInstance({
      geometry: new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(positions),
        perPositionHeight: true, //真实高度
      }),
      // attributes: { color: color }
    });
    PrimitiveCollection.add(new Cesium.Primitive({
      geometryInstances: [polygonInstance],
      appearance: new Cesium.MaterialAppearance({
        material: new Cesium.Material(materialOption)
      })
    }));
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


// 任意几何体
              var instance = new Cesium.GeometryInstance({
  geometry : new Cesium.RectangleGeometry({
    rectangle : Cesium.Rectangle.fromDegrees(-100.0, 20.0, -90.0, 30.0),
    vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
  })
});

scene.primitives.add(new Cesium.Primitive({
  geometryInstances : instance,
  appearance : new Cesium.EllipsoidSurfaceAppearance({
    material : Cesium.Material.fromType('Stripe')
  })
}));

   */


}


// 贴地 模型
// classificationType: Cesium.ClassificationType.BOTH,
// entity.polyline.clampToGround=true;

// https://www.jianshu.com/p/a983160234ad 材质
export {
  RenderSimple
}