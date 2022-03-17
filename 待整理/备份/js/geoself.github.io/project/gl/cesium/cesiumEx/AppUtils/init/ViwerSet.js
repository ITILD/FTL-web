/**
 * 管线类viewer初始设置
 * @param {*} viewer 
 */
function initViewer0(viewer) {
  // 禁用默认的实体双击动作。
  viewer.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );
  viewer.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_CLICK
  );

  //移动设备上禁掉以下几个选项，可以相对更加流畅
  if (!haoutil.system.isPCBroswer()) {
    viewer.targetFrameRate = 20; //限制帧率
    viewer.requestRenderMode = true; //取消实时渲染
    viewer.scene.fog.enable = false;
    viewer.scene.skyAtmosphere.show = false;
    viewer.scene.fxaa = false;
  }

  //IE浏览器优化
  if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 0) {
    viewer.targetFrameRate = 20; //限制帧率
    viewer.requestRenderMode = true; //取消实时渲染
  }

  //更改配置，性能优化
  viewer.scene.logarithmicDepthBuffer = false;

  //  开启抗锯齿功能(会造成字体和图片不清晰)
  viewer.scene.postProcessStages.fxaa.enabled = false;
  console.log("--------", "postProcessStages.fxaa.enabled = true")
  // langxj 关闭HDR模式，让界面显示更清晰
  viewer.scene.highDynamicRange = false;
  Cesium.RequestScheduler.maximumRequests = 100;
  Cesium.RequestScheduler.maximumRequestsPerServer = 100;

  //二三维切换不用动画
  if (viewer.sceneModePicker) viewer.sceneModePicker.viewModel.duration = 0.0;


  //抗锯齿
  var supportsImageRenderingPixelated = viewer.cesiumWidget._supportsImageRenderingPixelated;
  if (supportsImageRenderingPixelated) {
    // 直接拿到设备的像素比例因子 - 如我设置的1.25
    var vtxf_dpr = window.devicePixelRatio;
    // 这个while我们在后面会做一个说明，但不是解决问题的说明
    while (vtxf_dpr >= 2.0) { vtxf_dpr /= 2.0; }
    // 设置渲染分辨率的比例因子
    viewer.resolutionScale = vtxf_dpr;
  }

}


export { initViewer0 };