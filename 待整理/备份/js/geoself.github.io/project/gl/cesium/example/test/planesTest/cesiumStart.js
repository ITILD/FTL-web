// import a from "../../../data/freedata/SampleData/Cesium3DTiles/Batched/BatchedColors/tileset.json"

// var viewer = new Cesium.Viewer("cesiumContainer");


import { InitViewer } from "../../../cesiumEx/AppUtils/init/initViewer.js";

let initViewer = InitViewer.getInstance()
window.initViewer = initViewer
initViewer.addViewer("cesiumContainer")
let viewer = initViewer.viewers.get("cesiumContainer")

//cesium世界地形
viewer.terrainProvider = Cesium.createWorldTerrain({

  requestWaterMask: true, // required for water effects
  // requestVertexNormals: true, // required for terrain lighting
})

// let provider = new Cesium.OpenStreetMapImageryProvider({
//   url: 'https://a.tile.openstreetmap.org/'
// })

// let provider = Cesium.createWorldImagery({
//   style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
// })

let provider = Cesium.createWorldImagery({
  style: Cesium.IonWorldImageryStyle.AERIAL,
})

viewer.imageryLayers.addImageryProvider(provider);

let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
  // url: '../../../data/freedata/SampleData/Cesium3DTiles/Batched/BatchedColors/tileset.json'
  // url: '../../../data/freedata/SampleData/Cesium3DTiles/Classification/Photogrammetry/tileset.json'
  // url: Cesium.IonResource.fromAssetId(354307)
  url: Cesium.IonResource.fromAssetId(354759),
  maximumScreenSpaceError: 2, //最大的屏幕空间误差
  maximumNumberOfLoadedTiles: 10000, //最大加载瓦片个数


}));

viewer.scene.globe.depthTestAgainstTerrain = true;
let m = Cesium.Matrix4.fromArray([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 5.0, 1.0 //x, y, z, 1.0
]);

tileset._modelMatrix = m;
// tileset.readyPromise.then(function (tileset) {
//   // Set the camera to view the newly added tileset
//   viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
// });

viewer.zoomTo(tileset);