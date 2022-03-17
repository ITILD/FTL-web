// importScripts("https://cdn.jsdelivr.net/npm/cesium@1.80.0/Build/Cesium/Cesium.js");
onmessage = function (e) {
  let data = e.data;
  data.push('hello');
  console.log('worker:', data); // worker: [1, 2, 3, "hello"]
  // console.log('Cesium.Cartesian3.UNIT_X', new Cesium.Cartesian3(1.0, 0.0, 0.0))
  postMessage(data);
};