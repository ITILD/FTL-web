let myVar

function preLoadListen() {
  myVar = setInterval(() => { myTimer() }, 1000);
}

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("preLoadListen").innerHTML = t;
}


// 监听
let myVar0
let temp = 0

function preLoadListen0() {
  myVar0 = setInterval(() => { myTimer0() }, 1000);
}

function myTimer0() {
  temp++
  (temp == 3) && clearInterval(myVar0); //禁用下次  本次函数继续执行
  document.getElementById("preLoadListen0").innerHTML = "--" + temp + "--";

}



// //行政区外围维护
// let markDistrictSimpleBorder = 1
// localforage.getItem('districtSimpleBorder').then((districtSimpleBorder) => {
//     console.log("检测预加载简单边界0");
//     (districtSimpleBorder == markDistrictSimpleBorder) || listAllWithoutGeom();
// })

// function listAllWithoutGeom() {
//     console.log("开始加载简单边界1");
//     $.ajax({
//         type: "GET",
//         url: "/common/district/listAllWithoutGeom",
//         data: {id: 1},
//         success: function (districtSimpleBorder) {
//             localforage.setItem('districtSimpleBorder', districtSimpleBorder)
//         }
//     });
// }


// //先执行一次
// let temp = 0
// let myVar0 = setInterval(myTimer0(), 500);

// function myTimer0() {
//     temp++
//     localforage.getItem('districtSimpleBorder').then((districtSimpleBorder) => {
//         console.log("简单边界加载延迟2", temp);
//         if (districtSimpleBorder != null) {
//             //结束
//             clearInterval(myVar0)

//             changeZTree(districtSimpleBorder)
//             zNodes = districtSimpleBorder
//             $.fn.zTree.init($("#treeOverlaysDircts"), setting, zNodes);

//         }
//     })
//     return myTimer0;//防止执行一次
// }


// https://blog.csdn.net/datou0529/article/details/54319029