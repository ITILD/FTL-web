
const $ = id => document.getElementById(id)
const $$ = className => document.querySelector(className)
let testFunc = (data) => {
  console.log('test:', data)

}


$('testFunc').onclick = testFunc