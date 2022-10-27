
// const $ = id => document.getElementById(id)
// const $$ = className => document.querySelector(className)
// let testFunc = (data) => {
//   console.log('test:', data)

// }


// $('testFunc').onclick = testFunc
import { XRShow } from "./XRShow.js";

let xrShow = new XRShow('renderCanvas')
xrShow.createScence()
xrShow.transPhotoOption('./textures/1.JPG', 2,0)