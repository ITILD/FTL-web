import * as BABYLON from '@babylonjs/core'
// import { GLTF2Export } from '@babylonjs/serializers'
// import earcut from 'earcut' //三角剖切
function test(params) {
   // Get the canvas DOM element
   let canvas = document.getElementById('CADMain_Start') // 得到canvas对象的引用
   // Load the 3D engine // 初始化 BABYLON 3D engine
   let engine = new BABYLON.Engine(canvas, true, {
     preserveDrawingBuffer: true,
     stencil: true
   })
   /******* CreateScene function that creates and return the scene ******/

   // Create a basic BJS Scene object 创建一个场景scene
   let scene = new BABYLON.Scene(engine)
   // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}  添加一个相机
   let camera = new BABYLON.FreeCamera(
     'camera1',
     new BABYLON.Vector3(0, 10, -5),
     scene
   )
   camera.setTarget(new BABYLON.Vector3(0, -20, 10))
   camera.attachControl(canvas, false)
   // Create a basic light, aiming 0, 1, 0 - meaning, to the sky 添加一组灯光到场景
   let light = new BABYLON.HemisphericLight(
     'light1',
     new BABYLON.Vector3(1, 1, 0),
     scene
   )
   window.scene = scene
  //  var sphere = BABYLON.Mesh.CreateSphere(
  //   'sphere1',
  //   16,
  //   2,
  //   scene,
  //   false,
  //   BABYLON.Mesh.FRONTSIDE
  // )

   // call the createScene function
   // let scene = createScene()

   engine.runRenderLoop(function () {
     scene.render()
   })
   window.addEventListener('resize', function () {
     engine.resize()
   })
   /***************************End World Axes***************************/
 
}

export{test}