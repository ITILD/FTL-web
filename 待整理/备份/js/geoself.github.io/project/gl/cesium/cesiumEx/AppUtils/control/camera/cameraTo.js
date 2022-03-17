

/**
 * 相机视角 scene.camera.cancelFlight();
 * @param {Object} params {"y":39.092423,"x":121.990975,"z":87.84,"heading":23.4,"pitch":-51.9,"roll":0}
 */

function cameraFlyTo(params,viewer) {
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
function cameraSetView(params,viewer) {
  viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(params.x, params.y, params.z),
      orientation: {
          heading: Cesium.Math.toRadians(params.heading),
          pitch: Cesium.Math.toRadians(params.pitch),
          roll: Cesium.Math.toRadians(params.roll),
      },
  });
}

export {cameraFlyTo,cameraSetView}