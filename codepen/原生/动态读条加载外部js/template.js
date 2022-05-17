const $ = id => document.getElementById(id)
const $$ = className => document.querySelector(className)
let testFunc = async (data) => {
  console.log('test:', data)
  const response = await fetch('./source/opencv4.5.5.js');
  const filesize = response.headers.get('content-length'); //文件字节长度   若跨域请求，则获取不到。
  filesize ? console.log('文件长度', filesize) : console.log('跨域或不存在')
  // 核心函数
  const reader = response.body.getReader();

  let LoadedLength = 0; // 已下载字节
  const chunks = {}; // 分块存储

  while (true) { // 持续读取流
    const { done, value } = await reader.read();
    if (done) break;
    // 保存分块数据 => {0:[Uint8Array]}
    chunks[LoadedLength] = value;
    // 已下载的字节
    LoadedLength += value.length;
    // 下载进度
    const progress = (LoadedLength / filesize) * 100;
    // document.body.innerHTML = Math.floor(progress) + '%';
    console.log(value.length)
  }

  // 组合分块数据
  let chunksAll = new Uint8Array(LoadedLength);
  for (const index in chunks) { // for (const index of Object.keys(chunks)) {
    chunksAll.set(chunks[index], index) // Uint8Array.prototype.set(数组,偏移值)
  }

  // 转码为字符串const textDecoder = new TextDecoder('gb2312');
  const textDecoder = new TextDecoder();
  const jsCode = textDecoder.decode(chunksAll)
  console.log(textDecoder.decode(chunksAll));


  const sum = new Function(jsCode);
  sum()
  // const sum2 = new Function('a', 'b', 'var a =1;console.log("test")');
  // sum2(2, 6)

  todo()
}


function todo(params) {
  
  $('status').innerHTML = 'ready.';
  let imgElement = $('imageSrc');
  let inputElement = $('fileInput');
  inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
  }, false);
  imgElement.onload = function () {
    let mat = cv.imread(imgElement);
    
    let dataMat = mat.data
    for (let index = 0; index < dataMat.length; index++) {
      const element = dataMat[index];
      // console.log(element)
      if(index%128===0&&index>0){
        dataMat[index]=255
      }
      
    }
    cv.imshow('canvasOutput', mat);
    
    
    mat.delete();
  };
}


$('testFunc').onclick = testFunc