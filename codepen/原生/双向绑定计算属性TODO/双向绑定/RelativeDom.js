/**
 * 双向绑定计算属性
 * @param {Object} obj
 * https://blog.csdn.net/qweeryyioop/article/details/121760685
 */
class Relative {
  /**
   * 
   * @param {Object} obj  待计算对象
   * @param  {...Function} fns  可变参数，可以传入多个计算属性
   */
  constructor(obj,...fns) {
    this.obj = obj;
    this.fns = fns;
  }

  update() {
    
  }
  call() {
    this.fns.forEach(fn => {
      fn.call(this.obj);
    });
  }
}