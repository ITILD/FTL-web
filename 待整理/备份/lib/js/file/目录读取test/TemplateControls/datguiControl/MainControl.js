import dat from 'dat.gui'
import { DatGuiHelp } from '../datguiHelp.js'

import { ControlA0 } from './ControlA0'
import { ControlA1 } from './ControlA1'
import { ControlA3 } from './ControlA3'

function MainControl(params) {
  //--------------------------------------------主控---------------------------------------------------

  console.log('主控')
  let fullBox = DatGuiHelp.createControl('#datGui', 'MainControl', '2', '2')
  const box = fullBox.box
  const gui_0_root = fullBox.gui_0_root

  // --------测试
  // --------功能

  // 新窗口控制
  let gui_0_f0 = gui_0_root.addFolder(otherControlSetting.title)
  DatGuiHelp.openSetting(gui_0_f0, otherControlSetting, 'ControlA0', ControlA0)
  DatGuiHelp.openSetting(gui_0_f0, otherControlSetting, 'ControlA1', ControlA1)


   // 新窗口控制
   let gui_0_f1 = gui_0_root.addFolder(otherControlSetting1.title)
   DatGuiHelp.openSetting(gui_0_f1, otherControlSetting1, 'ControlA3', ControlA3)
  
}


// --------------------------------------------场景参数---------------------------------------------------


let otherControlSetting = {
  title: 'OtherControlSetting',
  ControlA0: false,
  ControlA1: false,
}

let otherControlSetting1 = {
  title: 'OtherControlSetting1',
  ControlA3: false
}

// --------------------------------------------datgui控制面板---------------------------------------------------



export { MainControl }