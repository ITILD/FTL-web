
import { Class0 } from './class0.js'

let class0 = Class0.getInstance()
window.class0 = class0
class0.addCanvas('glTestContainer0')
class0.addCanvas('glTestContainer1')
class0.addCanvas('glTestContainer2')
class0.addCanvas('glTestContainer3')

let canvas = document.getElementsByTagName('canvas')[0]



setTimeout(() => {
  let image = canvas
    .toDataURL('image/png', 0.5)
    .replace('image/png', 'image/octet-stream')

  let link = document.createElement('a')
  let strDataURI = image.substr(22, image.length)
  let blob = dataURLtoBlob(image)
  let objurl = URL.createObjectURL(blob)
  link.download = 'pic.png'
  link.href = objurl
  link.click()
}, 2000)

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

