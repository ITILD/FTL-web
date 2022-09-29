class MyVue {
  constructor (option) {
    this.option = option
    // proxy 对象代理，监听数据的改变
    this.data = this.observe(this.option.data)
    // 保存数据对应的节点
    this.prop2nodes = {}
    this.el = document.querySelector(this.option.el)
    // 渲染数据
    this.compileNode(this.el)
  }

  observe (data) {
    return new Proxy (data, {
      // 监听到数据被修改
      set: (target, prop, newValue) => {
        // 通过 Reflect 设置数据
        Reflect.set(target, prop, newValue)
        // 新建 CustomEvent，detail中存放事件相关的数据，这里放了数据被修改后的新值
        var changeDataEvent = new CustomEvent ('dataChanged', {
          detail: {
            newValue
          }
        })
        // 获取所有设计到该数据的节点
        var nodesRelated = this.prop2nodes[prop]
        // 为每个节点手动触发'dataChanged'事件, 事件对象为 changeDataEvent
        for (var node of nodesRelated) {
          node.dispatchEvent(changeDataEvent)
        }

        return true
      }
    })
  }

  compileNode (el) {
    var childNodes = el.childNodes
    ;[... childNodes].forEach((node) => {
      // 文本节点
      if (node.nodeType === 3) {
        var reg = /\{\{([^{}]+)\}\}/g
        var templateText = node.textContent
        
        // 数据渲染，通过正则替换
        node.textContent = templateText.replace(reg, (match, capture1) => this.data[capture1])

        // 将该节点涉及的数据保存到 prop2nodes 中
        var execResult, prop
        while (execResult = reg.exec(templateText)) {
          prop = execResult[1]     
          if (this.prop2nodes[prop]) this.prop2nodes[prop].push(node)
          else this.prop2nodes[prop] = [node]
        }

        // 为该节点注册'dataChanged'事件， 通过事件对象能拿到数据被修改后的新值
        node.addEventListener('dataChanged', (e) => {
          // 数据修改后，正则替换，重新渲染
          node.textContent = templateText.replace(reg, (match, capture1) => this.data[capture1])
        })

      // 元素节点
      } else if (node.nodeType === 1) {
        var prop = node.getAttribute('v-model')
        // 如果设置了v-model属性
        if (prop) {
          debugger
          // 渲染数据
          node.value = this.data[prop]
          // 将该节点涉及的数据保存到 prop2nodes 中
          if (this.prop2nodes[prop]) this.prop2nodes[prop].push(node)
          else this.prop2nodes[prop] = [node]
          // 注册 dataChanged 事件，数据被修改后，重新设置该元素节点的value
          node.addEventListener('dataChanged', (e) => {
            node.value = e.detail.newValue
          })
          // 注册 input 事件，监听用户修改数据。实现 Dom -> data 的绑定
          node.addEventListener('input', (e) => {
            this.data[prop] = node.value
          })
        }
        // 递归遍历该元素节点的子节点
        this.compileNode(node)
      }
    })
  }
}
