import * as esbuild from './lib/browser.min.js'

const $ = id => document.getElementById(id)
const $$ = className => document.querySelector(className)
let testFunc = (data) => {
  console.log('test:', data)


  esbuild.initialize({
    wasmURL: './lib/esbuild.wasm',
  }).then(() => {

    let a = esbuild.transform(`let x: number = 1
    
    console.log('未编译代码块')
    
    `, {
      loader: 'ts',
    }).then(result => {
      console.log(result)
      // eval(result.code)


      const sum = new Function('a', 'b', result.code);
      sum(2, 6)
      // console.log(sum(2, 6));
    })
    // console.log(a)

  })

}


$('testFunc').onclick = testFunc