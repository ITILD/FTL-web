class preLoadFullUtil {
  constructor() {

  }

  loadScript(src, callback) {
    var script = document.createElement('script'),
      head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
      script.addEventListener('load', function () {
        callback();
      }, false);
    } else if (script.attachEvent) {
      script.attachEvent('onreadystatechange', function () {
        var target = window.event.srcElement;
        if (target.readyState == 'loaded') {
          callback();
        }
      });
    }
    head.appendChild(script);
  }
}

//  loadScript('http://cdn.staticfile.org/jquery/1.6.2/jquery.min.js',function(){console.log('onload');});


// http://localforage.docschina.org/
localforage.setItem('somekey', 'some value').then(function (value) {
  // 当值被存储后，可执行其他操作
  console.log(value);
}).catch(function (err) {
  // 当出错时，此处代码运行
  console.log(err);
});