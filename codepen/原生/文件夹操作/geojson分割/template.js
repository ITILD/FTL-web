let testFunc = (data) => {
  let fetchRes = fetch(
    "./data/smile.gif");
  // fetchRes is the promise to resolve
  // it by using.then() method
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#body
  fetchRes.then(res =>
    res.blob()).then(d => {
    console.log(d)
    var zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    var img = zip.folder("images");
    img.file("smile.gif", d, { base64: true });

    const buffer = new ArrayBuffer(21) //21bytes  8*21bit
    const view1 = new DataView(buffer)
    view1.setUint8(0, 1,true) //1字节无符号整数  默认使用大端法，true设置为小端法
    view1.setUint32(1, 1,true) // 4字节无符号整数
    view1.setFloat64(5, 1.123456789,true) //8字节双精度数
    view1.setFloat64(13, 1.123456789,true)
    img.file("buffer.txt", buffer);

    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
      });

  })

  
  console.log('test:', data)
}