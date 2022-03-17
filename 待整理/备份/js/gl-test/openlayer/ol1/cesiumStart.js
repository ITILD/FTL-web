// var viewer = new Cesium.Viewer("cesiumContainer");
import { InitViewer } from './initViewer.js'

let initViewer = InitViewer.getInstance()
window.initViewer = initViewer
initViewer.addViewer('cesiumContainer0')
initViewer.addViewer('cesiumContainer1')
initViewer.addViewer('cesiumContainer2')
initViewer.addViewer('cesiumContainer3')

var canvas = document.getElementsByTagName('canvas')[2]


let gl = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
//图片导出为 png 格式
// var canvasElement = document.getElementsByTagName('canvas')[2];

//     var MIME_TYPE = "image/png";

//     var imgURL = canvasElement.toDataURL(MIME_TYPE);

//     var dlLink = document.createElement('a');
//     var fileName = 'test.jpeg'
//     dlLink.download = fileName;
//     dlLink.href = imgURL;
//     dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

//     document.body.appendChild(dlLink);
//     dlLink.click();
//     document.body.removeChild(dlLink);

setTimeout(() => {
  var image = canvas
    .toDataURL('image/png', 0.5)
    .replace('image/png', 'image/octet-stream')

  var link = document.createElement('a')
  var strDataURI = image.substr(22, image.length)
  var blob = dataURLtoBlob(image)
  var objurl = URL.createObjectURL(blob)
  link.download = 'pic.png'
  link.href = objurl
  link.click()
}, 5000)

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// // let initViewer = new InitViewer()
// let initViewer = InitViewer.getInstance()
// window.initViewer = initViewer
// initViewer.addViewer("cesiumContainer0")
// initViewer.addViewer("cesiumContainer1")
// let initViewer0 = new InitViewer()
// initViewer0.addViewer("cesiumContainer2")
// let initViewer1 = InitViewer.getInstance()
// console.log("initViewer0", initViewer0)
// console.log(initViewer)
// console.log("initViewer1", initViewer1)
