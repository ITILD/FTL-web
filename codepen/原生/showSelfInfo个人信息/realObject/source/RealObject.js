class RealObject extends ArrayBuffer {
  // constructor(){
  //   // this.data = 
  // }

  /**
   * to ArrayBuffer
   */
  setObj() {

  }
  /**
   * 解析成obj 组织规则
   * https://blog.csdn.net/weixin_43130350/article/details/122335034
   * // 来自数组
var arr = new Uint8Array([21,31]);
console.log(arr[1]); // 31
   * 
   */
  parse() {
    const obj = {}
    const view1 = new DataView(this);
    const view2 = new DataView(this, 12, 4); //from byte 12 for the next 4 bytes
    view1.setInt8(12, 42); // put 42 in slot 12

    console.log(view2.getInt8(0));
    obj.time = {}
    return obj

  }

}