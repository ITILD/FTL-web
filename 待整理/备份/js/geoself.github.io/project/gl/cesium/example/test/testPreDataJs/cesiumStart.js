// import a from "../../../data/freedata/SampleData/Cesium3DTiles/Batched/BatchedColors/tileset.json"

var viewer = new Cesium.Viewer("cesiumContainer");
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
  url: '../../../data/freedata/SampleData/Cesium3DTiles/Batched/BatchedColors/tileset.json'
}));
tileset.readyPromise.then(function (tileset) {
  // Set the camera to view the newly added tileset
  viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
});