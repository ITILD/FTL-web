import { Engine, Scene, ArcRotateCamera, PhotoDome, Vector3, PointerEventTypes, Texture, Color4, HemisphericLight, PointLight, MeshBuilder } from "https://cdn.jsdelivr.net/npm/@babylonjs/core@5.29.0/index.min.js"

class XRShow {
  /**
   * 初始化后
   */
  constructor(domID) {
    // this.canvas = document.getElementById("renderCanvas"); // 得到canvas对象的引用
    try {
      this.canvas = document.getElementById(domID); // 得到canvas对象的引用
    }
    catch (e) { console.error('XRShow初始化问题', e.message) }
    // finally
    this.engine = new Engine(this.canvas, true); // 初始化 BABYLON 3D engine
  }

  /**
   * 初始化空
   * 空图片底部备用
   */
  createScence() {
    
    this.scene = new Scene(this.engine); // 创建一个场景scene
    this.scene.clearColor = new Color4(0, 0, 0, 0); //背景 
    // 添加一个相机，并绑定鼠标事件
    this.camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, Vector3.Zero(), this.scene);
    this.camera.attachControl(this.canvas, true); //相机绑定场景后再修改
    this.camera.inputs.attached.mousewheel.detachControl(this.canvas);
    // this.camera.alpha =2
    // 默认视角级别
    this.zoomLevel = 0.75;
    this.dome = new PhotoDome("testdome", "./textures/4.JPG", { resolution: 32, size: 1000, useDirectMapping: false }, this.scene);

    // this.scene.registerAfterRender(() => { this.dome.fovMultiplier = this.zoomLevel; 
    
    // // console.log(this.camera.alpha)
    // });
    // // 只修改镜头fov
    // this.scene.onPointerObservable.add( (e)=> {
    //   if (this.dome === undefined) { return; }

    //   this.zoomLevel += e.event.wheelDelta * -0.0005; //滚轮速度：镜头级别
    //   if (this.zoomLevel < 0.1) { this.zoomLevel = 0.1; } // 限制最小镜头级别
    //   if (this.zoomLevel > 0.75) { this.zoomLevel =0.75; }
    // }, PointerEventTypes.POINTERWHEEL);

    window.cameraBB=this.camera

    //开始loop
    this.engine.runRenderLoop( ()=> { this.scene.render(); });
    window.addEventListener("resize",  ()=> { this.engine.resize(); }); // 监听浏览器改变大小


    // window.fovMultiplier =this.dome.fovMultiplier
  }

  /**
   * 修改图像和场景参数
   */
  transPhotoOption(photoUrl,alpha,radius) {
    // alert(alpha)
    this.scene.clearColor = new Color4(0, 0, 0, 0); //背景 
    this.zoomLevel = 0.75
    // this.camera.alpha = -Math.PI / 2//恢复视角
    // this.camera.radius = Math.PI / 2//恢复视角
    
    this.dome.dispose()
    //  dome.photoTexture =new Texture("http://127.0.0.1:5173/img/babylon/textures/qc.jpg");//错误  直接替换纹理贴图拼接处有bug
    this.dome = new PhotoDome(
      "testdome",
      photoUrl,
      {
        resolution: 32,
        size: 1000,
        useDirectMapping: false
      },
      this.scene
    );
    
    this.camera.alpha = alpha
 
    this.camera.radius = radius
    //camera bug
    // this.dome.onReady = ()=>{
    //   let vrHelper = this.scene.createDefaultVRExperience();
    // }

  
  }


  hide(){

  }

  show(){

  }


  /**
   * 释放资源
   */
   dispose() {

    this.dome =null;
    this.scene.dispose()
    this.camera = null

  }

}

/**
 * 异步版本
 */
class XRShowAsync {
  constructor(scene) {



  }
}

export {
  XRShow
}