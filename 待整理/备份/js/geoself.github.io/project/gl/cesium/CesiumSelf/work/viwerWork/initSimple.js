// var viewer = new Cesium.Viewer("cesiumContainer");
import { InitViewer } from "../../../cesiumEx/AppUtils/init/initViewer.js";

function initSimple() {


  let initViewer = InitViewer.getInstance()
  window.initViewer = initViewer
  window.viewer = initViewer.addViewer("cesiumContainer")
  // 初始viewer
  let viewer = initViewer.viewers.get("cesiumContainer")

  let provider = Cesium.createWorldImagery({
    style: Cesium.IonWorldImageryStyle.AERIAL,
  })

  viewer.imageryLayers.addImageryProvider(provider);


  // //cesium世界地形
  // viewer.terrainProvider = Cesium.createWorldTerrain({
  //   requestWaterMask: true, // required for water effects
  //   // requestVertexNormals: true, // required for terrain lighting
  // })

  // 开启深度检测
  viewer.scene.globe.depthTestAgainstTerrain = true;


  // viewer.scene.primitives.remove(tileset)
}

export { initSimple };



// https://blog.csdn.net/qq_25064691/article/details/114493038
// 天地图参看