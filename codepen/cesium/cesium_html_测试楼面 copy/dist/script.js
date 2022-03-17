// 停止;
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YWVjNGJlZC05MjEzLTRlNDEtYjcwYy05NzY2NmJiMzBjNGQiLCJpZCI6MTExODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTgzNzQ5MTV9.0jiPX8lzZIYzTd-tzeNju0hOFnBmMyxiPtxSeXaA8s0";
const viewer = new Cesium.Viewer("cesiumContainer");
// 121.590758,38.909046
const cyanPolygon = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(121.590758, 38.909046),
  ellipse: {
    semiMinorAxis: 10.0,
    semiMajorAxis: 10.0,
    height: 10.0,
    extrudedHeight: 100.0,
    rotation: Cesium.Math.toRadians(-40.0),
    material: Cesium.Color.RED,
  },
});




viewer.zoomTo(viewer.entities);

function TetrahedronGeometry() {
  const negativeRootTwoOverThree = -Math.sqrt(2.0) / 3.0;
  const negativeOneThird = -1.0 / 3.0;
  const rootSixOverThree = Math.sqrt(6.0) / 3.0;
  const positions = new Float64Array(4 * 3);

  // 四面体有4个三角形，共计12个点，但是由于重合的关系，可以只记录4个点
  // 点0 坐标
  positions[0] = 0.0;
  positions[1] = 0.0;
  positions[2] = 1.0;

  // 点1 坐标
  positions[3] = 0.0;
  positions[4] = (2.0 * Math.sqrt(2.0)) / 3.0;
  positions[5] = negativeOneThird;

  // 点2 坐标
  positions[6] = -rootSixOverThree;
  positions[7] = negativeRootTwoOverThree;
  positions[8] = negativeOneThird;

  // 点3 坐标
  positions[9] = rootSixOverThree;
  positions[10] = negativeRootTwoOverThree;
  positions[11] = negativeOneThird;

  // 创建顶点属性中的坐标
  const attributes = new Cesium.GeometryAttributes({
    position: new Cesium.GeometryAttribute({
      componentDatatype: Cesium.ComponentDatatype.DOUBLE,
      componentsPerAttribute: 3,
      values: positions
    })
  });

  const indices = new Uint16Array(4 * 3);

  // 后面的三角形用到 0、1、2 号点坐标
  indices[0] = 0;
  indices[1] = 1;
  indices[2] = 2;

  // 左边的三角形用到 0、2、3 号点坐标
  indices[3] = 0;
  indices[4] = 2;
  indices[5] = 3;

  // 右边的三角形用到 0、3、1 号点坐标
  indices[6] = 0;
  indices[7] = 3;
  indices[8] = 1;

  // 下面的三角形用到 2、1、3 号点坐标
  indices[9] = 2;
  indices[10] = 1;
  indices[11] = 3;

  // 指定此四面体的各种属性
  this.attributes = attributes;
  this.indices = indices;
  this.primitiveType = Cesium.PrimitiveType.TRIANGLES;
  this.boundingSphere = undefined;
  // this.boundingSphere = BoundingSphere.fromVertices(positions);
  // this.boundingSphere = new BoundingSphere(new Cartesian3(0.0, 0.0, 0.0), 1.0);
}


// 看似复杂，其实只是对经纬度 (-100, 40) 这个点做垂直地表向上平移200km的计算，并将几何体放大50w倍（即变成500km那么大），返回矩阵而已
let testTemp = Cesium.Cartographic.fromDegrees(-100.0, 40.0)
let testTemp1 = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Ellipsoid.WGS84.cartographicToCartesian(
  testTemp))
debugger
let testTemp2 = Cesium.Matrix4.multiplyByTranslation(testTemp1, new Cesium.Cartesian3(0.0, 0.0, 200000.0), new Cesium.Matrix4())
debugger
const modelMatrix = Cesium.Matrix4.multiplyByUniformScale(
  testTemp2, 500000.0, new Cesium.Matrix4()); // 缩放计算，矩阵·50w

const instance = new Cesium.GeometryInstance({
  geometry: new TetrahedronGeometry(), // 如果直接写在代码而不是构建出来的，可以直接 new TetrahedronGeometry()
  modelMatrix: modelMatrix,
  attributes: {
    color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.WHITE) // 快捷计算顶点颜色
  }
});

/* 使用 Primitive API 绘制几何 */
viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances: instance,
  appearance: new Cesium.PerInstanceColorAppearance({
    flat: true,
    translucent: false
  })
}));