
const $ = id => document.getElementById(id)
const $$ = className => document.querySelector(className)
let testFunc =async  (data) => {
  console.log('test:', data)
  let info = await (await fetch('./DongLuZhang.json')).json()
  let features = info.features
  for (let i = 0; i < features.length; i++) {
    let coordinates =features[i].geometry.coordinates
    let center = [(coordinates[0][0]+coordinates[1][0])/2,(coordinates[0][1]+coordinates[1][1])/2]
    console.log(center)
  }
  console.log(info)
}


$('testFunc').onclick = testFunc