// 默认新窗口
(function () {

  var list_a = Array.prototype.slice.call(document.getElementsByTagName('a'));

  list_a.forEach(function (value) {
    value.setAttribute('target', '_blank');
  });

}());