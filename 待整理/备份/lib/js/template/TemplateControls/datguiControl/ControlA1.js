
function ControlA1(params) {
  const box = document.querySelector('#datGui')
  const gui_0_root = new dat.GUI({ autoPlace: false })
  box.appendChild(gui_0_root.domElement)
  let options_0 = {
    CONTROL: 'ControlA1',
  }
  gui_0_root.domElement.style = 'position: absolute; top: 300px; left: 2px;'
  gui_0_root.add(options_0, 'CONTROL')
  // --------测试
  // --------功能
  // --------
  // gui_0_root.closed = true
  function destroy() {
    gui_0_root.destroy()
    box.removeChild(gui_0_root.domElement)
  }

  return {destroy:destroy}
  
}