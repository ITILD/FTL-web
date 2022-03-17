import { Class0 } from './class0.js'
import { AddLayer } from './openlayerPlugin/core/render/addLayer.js'


let class0 = Class0.getInstance()
window.class0 = class0
class0.addCanvas('glTestContainer0')
class0.addCanvas('glTestContainer1')
class0.addCanvas('glTestContainer2')
class0.addCanvas('glTestContainer3')

let Map0 = class0.viewers.get('glTestContainer0')








let canvas = document.getElementsByTagName('canvas')[0]

function screenshots(params) {
  alert('截图')
  // setTimeout(() => {  }, 10)
  let image = canvas
    .toDataURL('image/png', 0.5)
    .replace('image/png', 'image/octet-stream')

  let link = document.createElement('a')
  // let strDataURI = image.substr(22, image.length)
  let blob = dataURLtoBlob(image)
  let objurl = URL.createObjectURL(blob)
  link.download = 'pic.png'
  link.href = objurl
  link.click()
}

function screenshotsFull(params) {
  let opts = {
    // scale: scale, // 添加的scale 参数
    // canvas: canvas, //自定义 canvas
    logging: false, //日志开关，便于查看html2canvas的内部执行流程
    // width: $("#exportMapDiv").width(), //dom 原始宽度
    // height: $("#exportMapDiv").height(),
    useCORS: true // 【重要】开启跨域配置
  };
  // new html2canvas(document.getElementById('displayList'), {
  html2canvas(document.querySelector("#displayList"), opts).then(canvas => {
    // html2canvas(document.querySelector("#glTestContainer0"), opts).then(canvas => {
    canvas.toBlob(function (blob) {
      // /*
      //  * 注意第一个File的构造方法第一个参数必须要用[]包起来，表明这是一个数组
      //  * 第二个参数是这个文件名
      //  * 第三个参数是选项，其中通过type指定这个文件的mime值
      //  */
      // let file2 = new File([blob], 'a.jpg', { type: 'image/jpg' })

      // // ajax上传文件不能像上传普通对象那样，得用上FormData
      // let formData = new FormData()
      // formData.append('file', file2)

      let objurl = URL.createObjectURL(blob)
      let link = document.createElement('a')
      link.download = 'pic.png'
      link.href = objurl
      link.click()

    })
  })
}



function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}


function addTMS(params) {
  // Map0
  let tmsLayer = AddLayer.loadTMSLayer('http://192.168.0.253', 'DOM/dalian_1.8m_84/Tmsout')
  Map0.getLayers().insertAt(2, tmsLayer)
}

function addWTMS(params) {
  // let wmtsLayer = AddLayer.loadWMTSLayer('Map-New-ALL')
  let wmtsLayer = AddLayer.loadWMTSLayer("http://192.168.0.253:8081/geoserver/gwc/service/wmts", 'Map:Map-New-DL')
  Map0.getLayers().insertAt(1, wmtsLayer)
}

function flyto(params) {
  Map0.getView().animate({
    center: ol.proj.fromLonLat([120, 38.9]),
    zoom: 8
  })
}



document.querySelector('#screenshots').onclick = function () { screenshots() };
document.querySelector('#screenshotsFull').onclick = function () { screenshotsFull() };
document.querySelector('#addTMS').onclick = function () { addTMS() };
document.querySelector('#addWTMS').onclick = function () { addWTMS() };
document.querySelector('#flyto').onclick = function () { flyto() };