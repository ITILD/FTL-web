var clippingPlanecollection1 = new Cesium.ClippingPlaneCollection({
  planes: [
    new Cesium.ClippingPlane(new Cesium.Cartesian3(1.0, 0.0, 0.0), 0.0),
    new Cesium.ClippingPlane(
      new Cesium.Cartesian3(-1.0, 0.0, 0.0),
      -500.0
    ),
    new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 1.0, 0.0), -15.0),
    new Cesium.ClippingPlane(
      new Cesium.Cartesian3(0.0, -1.0, 0.0),
      -15.0
    ),
  ],
});
var clippingPlanecollection2 = new Cesium.ClippingPlaneCollection({
  planes: [
    new Cesium.ClippingPlane(new Cesium.Cartesian3(1.0, 0.0, 0.0), 1000),
    new Cesium.ClippingPlane(
      new Cesium.Cartesian3(-1.0, 0.0, 0.0),
      -2000.0
    ),
    new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 1.0, 0.0), -15.0),
    new Cesium.ClippingPlane(
      new Cesium.Cartesian3(0.0, -1.0, 0.0),
      -15.0
    ),
  ],
});

globe.multiClippingPlanes = new Cesium.MultiClippingPlaneCollection({
  collections: [clippingPlanecollection1, clippingPlanecollection2],
  modelMatrix: entity.computeModelMatrix(Cesium.JulianDate.now()),
  edgeWidth: 1,
  edgeColor: Cesium.Color.WHITE,
});