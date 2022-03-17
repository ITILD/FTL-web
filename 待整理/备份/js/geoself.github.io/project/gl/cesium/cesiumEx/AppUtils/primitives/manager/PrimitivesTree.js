/**
 * 初始化渲染，db和PrimitiveCollection组织管理
 * 
 * 初次加载缓存？？？
 */
class PrimitivesTree {
  constructor(viewer) {
    this.viewer = viewer;
    // 渲染模型集合
    this.primitiveModelCollection = new Cesium.PrimitiveCollection() //总体
    this.viewer.scene.primitives.add(this.primitiveModelCollection, '100');
    this.tree = new Map(); //id,primitive parentNode childrenNode[Map0 Map1...]
    // db todo

  }

  addNode() {

  }

  getNode() {

  }

  removeNode() {

  }

  updateNode() {

  }



}