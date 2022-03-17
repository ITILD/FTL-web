
class DatGuiHelp {
  constructor(){
    
  }
  static test(){
    console.log('DatGuiHelp')
  }
  /**
   * 创建
   * @param {*} datGuiDOM '#datGui'
   * @param {*} ControlName 'MainControl'
   * @param {*} top 2
   * @param {*} left 2
   * @returns 
   */
  static createControl(datGuiDOM, ControlName, top, left) {
    let options_0 = { CONTROL: ControlName }
    const box = document.querySelector(datGuiDOM)
    const gui_0_root = new dat.GUI({ autoPlace: false })
    box.appendChild(gui_0_root.domElement)
    gui_0_root.domElement.style = 'position: absolute; top: ' + top + 'px; left: ' + left + 'px;'
    gui_0_root.add(options_0, 'CONTROL')
    return {
      box: box,
      gui_0_root: gui_0_root
    }
  }


  /**
   * 辅助开关附属控制面板
   * @param {*} gui_0_f0 
   * @param {*} otherControlSetting 
   * @param {*} openString 
   * @param {*} newControl 
   */
  static openSetting(gui_0_f0, otherControlSetting, openString, newControl) {
    let newControl_open = gui_0_f0.add(otherControlSetting, openString),thisNewControl
    newControl_open.onChange(value => { value ? thisNewControl = newControl() : thisNewControl.destroy() })
  }
}
