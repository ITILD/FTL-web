let testFunc = (data) => {
  console.log('test:', data)

  let list = [
    { id: 1013, pid: 0 },
    { id: 1014, pid: 0 },
    { id: 1061, pid: 1013 },
    { id: 1063, pid: 1014 },
    { id: 1066, pid: 1014 },
    { id: 1067, pid: 1066 }
  ]
  let tree = []


  // 用for循环的方法
  for (var i = 0; i < list.length; i++) {
    for (var j = 0; j < list.length; j++) {
      // 如果有父节点
      if (list[i].pid === list[j].id) {
        // 放进它父节点的children数组中；如果children不存在，初始化为空数组
        list[j].children = list[j].children || []
        list[j].children.push(list[i])
        // 因为每个节点至多有一个父节点，所以这里可以退出本次循环，避免无z意义的运算
        break
      }
    }
    // 如果j的值等于list的长度，说明在内层循环中没有触发break，也就是说这个节点是根节点
    if (j === list.length) tree.push(list[i])
  }
  console.log(tree)



  // // filter筛选符合条件的元素，返回一个包含所有符合条件的元素的新数组
  // tree = list.filter(item1 => !list.find((item2, index) => {
  //   // 如果有父节点
  //   if (item1.pid === item2.id) {
  //     // 放进它父节点的children数组中；如果children不存在，初始化为空数组
  //     list[index].children = list[index].children || []
  //     list[index].children.push(item1)
  //   }
  //   // find返回第一个符合条件的元素，找到后，剩余的元素不再判断
  //   return item1.pid === item2.id
  // }))

}