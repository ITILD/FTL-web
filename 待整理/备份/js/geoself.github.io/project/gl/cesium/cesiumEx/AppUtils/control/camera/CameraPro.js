class CameraPro {
  /**
   * 相机状态
   * @param {*} camera 
   */
  constructor(camera) {
    this.camera = camera
  }

  /**
   * 相机视角 scene.camera.cancelFlight();
   * @param {Object} params {"y":39.092423,"x":121.990975,"z":87.84,"heading":23.4,"pitch":-51.9,"roll":0}
   */

  static cameraFlyTo(params, viewer) {
    viewer.camera.flyTo({
      // duration:10,
      // cancel:()=>{console.log("中断")},
      destination: Cesium.Cartesian3.fromDegrees(params.x, params.y, params.z),
      orientation: {
        heading: Cesium.Math.toRadians(params.heading),
        pitch: Cesium.Math.toRadians(params.pitch),
        roll: Cesium.Math.toRadians(params.roll),
      },
    });
  }

  /**
   * 相机视角
   * @param {Object} params {"y":39.092423,"x":121.990975,"z":87.84,"heading":23.4,"pitch":-51.9,"roll":0}
   */
  static cameraSetView(params, viewer) {
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(params.x, params.y, params.z),
      orientation: {
        heading: Cesium.Math.toRadians(params.heading),
        pitch: Cesium.Math.toRadians(params.pitch),
        roll: Cesium.Math.toRadians(params.roll),
      },
    });
  }



  /**
   * 相机视角
   * @param {Object} params {"y":39.092423,"x":121.990975,"z":87.84,"heading":23.4,"pitch":-51.9,"roll":0}
   */
  static cameraSetViewGraphic(params, viewer) {
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(params.lon, params.lat, params.h),
      orientation: {
        heading: Cesium.Math.toRadians(params.heading),
        pitch: Cesium.Math.toRadians(params.pitch),
        roll: Cesium.Math.toRadians(params.roll),
      },
    });
  }



  /**
   * 相机视角
   * @param {Object} params {"y":39.092423,"x":121.990975,"z":87.84,"heading":23.4,"pitch":-51.9,"roll":0}
   */
  static cameraSetViewCartesian3(params, viewer) {
    viewer.camera.setView({
      destination: { x: params.x, y: params.y, z: params.z },
      orientation: {
        heading: Cesium.Math.toRadians(params.heading),
        pitch: Cesium.Math.toRadians(params.pitch),
        roll: Cesium.Math.toRadians(params.roll),
      },
    });
  }







}




// // tileset.readyPromise.then(function (tileset) {
// //   // Set the camera to view the newly added tileset
// //   viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
// // });

// viewer.zoomTo(tileset);


export { CameraPro }



// https://blog.csdn.net/u010447508/article/details/105562542