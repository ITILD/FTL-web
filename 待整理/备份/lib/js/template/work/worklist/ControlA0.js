function ControlA0(params) {
  const box = document.querySelector('#datGui')
  const gui_0_root = new dat.GUI({ autoPlace: false })
  box.appendChild(gui_0_root.domElement)
  let options_0 = {
    CONTROL: 'ControlA0',
  }
  gui_0_root.domElement.style = 'position: absolute; top: 200px; left: 2px;'
  gui_0_root.add(options_0, 'CONTROL')

  // --------测试

  let settingFull = {
    // --------------------------------------------场景参数---------------------------------------------------
    sceneParam: {
      title: '模型创建导出',
      geojsonType: 'ArcGIS',
      String_Number: '数值/字符',
      UpModelFile: () => {
        console.log('test---------------UpModelFile')
      },
      cameraList: 'camera0',
      cameraListFull: ['camera0', 'camera1', 'camera2'],
      cameras: {
        camera0: {
          h: 210917.61076129225,
        },
        camera1: {
          h: 6760.697812575909,
        },
        camera2: {
          h: 1567.9855743901433,
        },
      },
    },

    // --------------------------------------------场景监听---------------------------------------------------
  }

  // 选择参数
  let geojsonTypeChange = gui_0_root.add(
    settingFull.sceneParam,
    'geojsonType',
    ['ArcGIS', 'OGC']
  )
  geojsonTypeChange.onChange(function (value) {
    geojsonType = value
    console.log('onChange:' + value)
  })

  // 数值填写设置
  let String_Number = gui_0_root.add(settingFull.sceneParam, 'String_Number')
  String_Number.onChange(function (value) {
    moveX = Number(value)
    console.log('onChange:' + value)
  })

  // 对象选择
    // 视角控制
   let cameras = gui_0_root.add(
      settingFull.sceneParam,
      "cameraList",
      settingFull.sceneParam.cameraListFull
    );
    // 默认参数
    console.log('onChange_default_value:' + settingFull.sceneParam.cameras[settingFull.sceneParam.cameraList].h)

    cameras.onFinishChange((value) => {
      console.log('onChange:' + value)
      console.log('onChange_value:' + settingFull.sceneParam.cameras[value].h)
 
      
    })

  // 按键动作
  settingFull.sceneParam.UpModelFile = () => {
    console.log('获取目录')
    // 获取文件
    // getFile();
    // 目录
    getDir()
  }
  gui_0_root.add(settingFull.sceneParam, 'UpModelFile')

  // --------功能
  // --------
  // gui_0_root.closed = true

  // 销毁时动作
  function destroy() {
    // todo
    //
    gui_0_root.destroy()
    box.removeChild(gui_0_root.domElement)
  }

  return { destroy: destroy }
}


async function getFile() {
  console.log('获取文件test')

  let fileHandle;
  
    // open file picker
    [fileHandle] = await window.showOpenFilePicker();

    if (fileHandle.kind === "file") {
      // run file code
      console.log(fileHandle);
    } else if (fileHandle.kind === "directory") {
      // run directory code
      console.log("directory", fileHandle);
    }

    // 如果没有选择文件，就不需要继续执行了
    if (!fileHandle) {
      return;
    }

    // 这里的 options 用来声明对文件的权限，能否写入
    const options = {
      writable: true,
      mode: "readwrite"
    };
    // 然后向用户要求权限
    if (
      (await fileHandle.queryPermission(options)) !== "granted" &&
      (await fileHandle.requestPermission(options)) !== "granted"
    ) {
      alert("Please grant permissions to read & write this file.");
      return;
    }

    // 前面获取的是 FileHandle，需要转换 File 才能用
    // outFileName = fileHandle.name.replace(".json", "");
    const file = await fileHandle.getFile();
    // 接下来，`file` 就是普通 File 实例，你想怎么处理都可以，比如，获取文本内容
    const code = await file.text();
    console.log(code)
}


async function getDir() {
  console.log('获取文件目录test')

  let fileHandle;
  
    // open file picker
    // [fileHandle] = await window.showDirectoryPicker();
    fileHandle = await window.showDirectoryPicker();

    if (fileHandle.kind === "file") {
      // run file code
      console.log(fileHandle);
    } else if (fileHandle.kind === "directory") {
      // run directory code
      console.log("directory", fileHandle,fileHandle.values());

      for await (const it of fileHandle.values()) {
        // console.log('[[ %s ]] is %s', it.name, it.kind);
        const testa = await it.getFile()

        console.log(await testa.text());

      }
    }

    // 如果没有选择文件，就不需要继续执行了
    if (!fileHandle) {
      return;
    }

    // 这里的 options 用来声明对文件的权限，能否写入
    const options = {
      writable: true,
      mode: "readwrite"
    };
    // 然后向用户要求权限
    if (
      (await fileHandle.queryPermission(options)) !== "granted" &&
      (await fileHandle.requestPermission(options)) !== "granted"
    ) {
      alert("Please grant permissions to read & write this file.");
      return;
    }

    // 前面获取的是 FileHandle，需要转换 File 才能用
    // outFileName = fileHandle.name.replace(".json", "");
    const file = await fileHandle.getFile();
    // 接下来，`file` 就是普通 File 实例，你想怎么处理都可以，比如，获取文本内容
    const code = await file.text();
    console.log(code)
}