let wgs84 = {
  // a:6378135,//长半轴
  // a:6378137.0 ,//长半轴
  a: 50000.0, //长半轴
  b: 6356752.3142451793, //短 cesium
  // e2:0.00669437999013//第一偏心率平方//cesium   0.00669437999014137873879720633416
  e2: 0.00669437999014137873879720633416 //第一偏心率平方//cesium   0.00669437999014137873879720633416
};
// https://www.bbsmax.com/A/GBJrk64E50/


var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false
  });
};
var createScene = function () {

  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);
  // 使用右手坐标系
  scene.useRightHandedSystem = true;
  // This creates and positions a free camera (non-mesh)
  // var camera = new BABYLON.FreeCamera(
  //   "camera1",
  //   // new BABYLON.Vector3(0, 5, -10),
  //   // new BABYLON.Vector3(0,0, wgs84.a),
  //   new BABYLON.Vector3(wgs84.a,wgs84.a, wgs84.a),
  //   scene
  // );
 //由FreeCamera改为新版本的“通用相机”，据说可以默认支持各种操作设备。
  var camera = new BABYLON.UniversalCamera("FreeCamera", new BABYLON.Vector3(wgs84.a, wgs84.a, wgs84.a), scene);
  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'sphere' shape.
  var sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",

    // { diameterX: 6378137.0,diameterY:6378137.0,diameterZ:6356752.3142451793, segments: 32 },
    { diameterX: wgs84.a, diameterY: wgs84.a, diameterZ: wgs84.a, segments: 32 },
    scene
  );

  // // Move the sphere upward 1/2 its height
  // // sphere.position.y = 1;
  sphere.position.y = 0;

  // Our built-in 'ground' shape.
  // var ground = BABYLON.MeshBuilder.CreateGround(
  //   "ground",
  //   { width: 600, height: 600 },
  //   scene
  // );

  return scene;
};
window.initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  window.engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";
  startRenderLoop(engine, canvas);
  window.scene = createScene();

  // BabylonHelp.showAxis(800)
  BabylonHelp.showAxisXYZ(wgs84.a)




};
//
initFunction().then(() => {
  sceneToRender = scene;
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});


// const myPoints = [
//   new BABYLON.Vector3(-2, -1, 0),
//   new BABYLON.Vector3(0, 1, 0),
//   new BABYLON.Vector3(2, -1, 0),
// ]

// const lines = BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints});
// BabylonHelp.showAxis(800)