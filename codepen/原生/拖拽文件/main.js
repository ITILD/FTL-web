let dropTarget = document.getElementById('droptarget');

function handleEvent(event) {
  let info = '',
    output = document.getElementById('output'),
    files,
    i,
    len;
  event.preventDefault();

  if (event.type == 'drop') {
    files = event.dataTransfer.files;
    i = 0;
    len = files.length;

    debugger
    while (i < len) {
      info += `${files[i].name} (${files[i].type}, ${files[i].size} bytes)<br />`;
     
      //读取文件的内容
      if (files[i]) {
        var reader = new FileReader();
        reader.readAsText(files[i]);
        reader.onload = function () {
          console.log("结果")
          console.log(this.result)
        };
      }
      i++;


    }
    output.innerHTML = info;


    // for (var f of files) {
    //   var reader = new FileReader();
    //   reader.readAsText(f);
    //   //读取文件的内容
    //   reader.onload = function () {
    //       console.log("结果")
    //       console.log(this.result)
    //   };

    // }

  }
}

dropTarget.addEventListener('dragenter', handleEvent);
dropTarget.addEventListener('dragover', handleEvent);
dropTarget.addEventListener('drop', handleEvent);