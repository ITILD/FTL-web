import './style.css'
import MyWorker from './worker/worker0?worker'
const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
console.time('worker0')
const worker = new MyWorker()
worker.onmessage = (evt)=> {
  //接收子线程消息
  console.log(evt.data) //hello received
  // 释放内存和避免僵尸线程
  console.timeEnd('worker0')
  worker.terminate()
}

// worker.postMessage('hello') //向子线程发送消息
let data = new Uint8Array(500 * 1024 * 1024)
worker.postMessage(data, [data.buffer])

// rollup-plugin-web-worker-loader