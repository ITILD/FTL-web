/**
 * @description 日期格式化(插件)
 * new Date().Format('yyyy-MM-dd')
 * new Date().Format('hh时mm分ss秒')
 * @param {String} fmt 
 * @returns 
 */
 Date.prototype.Format =function(fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


/**
 * @description 导出文件
 * let jsonStr = {name: '000',url: '111',}
 * let time= new Date().Format('hh时mm分ss秒')
 * let name = 'mockdata'+time+'.json'
 * @param {String} data 
 * @param {String} name 
 */
let exportRaw=(data, name)=> {
  let urlObject = window.URL || window.webkitURL || window
  let export_blob = new Blob([data])
  let save_link = document.createElement('a')
  save_link.href = urlObject.createObjectURL(export_blob)
  save_link.setAttribute('download', name)// save_link.download = name
  save_link.click()
}
