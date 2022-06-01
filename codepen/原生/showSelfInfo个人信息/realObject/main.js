const $ = id => document.getElementById(id)
const $$ = className => document.querySelector(className)

async function asyncMain(params) {
  let info = await (await fetch('./info.json')).json()
  console.log(info)
}
asyncMain()
console.log('test')


