// import {  } from "../../data";

let cesiumDataControlUtil = new CesiumDataControlUtil()

function add3Dtiles() {
  let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    // url: '../../../data/freedata/SampleData/Cesium3DTiles/Batched/BatchedColors/tileset.json'
    // url: '../../../data/freedata/SampleData/Cesium3DTiles/Classification/Photogrammetry/tileset.json'
    url: Cesium.IonResource.fromAssetId(40866)
  }));
  // tileset.readyPromise.then(function (tileset) {
  //   // Set the camera to view the newly added tileset
  //   viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
  // });

  viewer.zoomTo(tileset);



  // tileset.style = new Cesium.Cesium3DTileStyle({
  //   color: "rgba(255, 0, 0, 0.5)",
  // });
}