// https://www.cnblogs.com/s313139232/p/8371548.html

// html按钮：
// 复制代码

// <button  onclick="showFull();">
//                 全屏
//             </button>
// <button  onclick="delFull();">
//                 退出全屏
//             </button>

// 复制代码

// js调用：
// 复制代码

// function showFull(){
//                var full=document.getElementById("container");
//                launchIntoFullscreen(full);
//             }

// function delFull() {
//                 exitFullscreen();
//             }

// 复制代码

// 全屏方法封装：
// 复制代码

//  function launchIntoFullscreen(element) {
//                 if(element.requestFullscreen){
//                     element.requestFullscreen();
//                 }
//                 else if(element.mozRequestFullScreen) {
//                     element.mozRequestFullScreen();
//                 }
//                 else if(element.webkitRequestFullscreen) {
//                     element.webkitRequestFullscreen();
//                 }
//                 else if(element.msRequestFullscreen) {
//                     element.msRequestFullscreen();
//                 }
//             }

// 复制代码

// 退出全屏方法封装：
// 复制代码

//  function exitFullscreen() {
//                 if(document.exitFullscreen) {
//                     document.exitFullscreen();
//                 } else if(document.mozCancelFullScreen) {
//                     document.mozCancelFullScreen();
//                 } else if(document.webkitExitFullscreen) {
//                     document.webkitExitFullscreen();
//                 }
//             }

// 复制代码





// // 总控
// $("#cesiumContainer").keydown(function (event) {
//   console.log(event.keyCode)
//   if (event.keyCode == 112) { //F1
//     // layer.open({
//     //   type: 1,
//     //   content: '传入任意的文本或html' //这里content是一个普通的String
//     // });

//   }


//   if (event.keyCode == 113) { //F2
//     console.log("-------------test-------------")
//   }
// });