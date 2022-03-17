class MouseListen {
  /**
   * 监听器 记录鼠标移动点选双击
   * 
   * @param {*} viewer 
   */
  constructor(viewer) {
    // cesium
    this.viewer = viewer
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
  }
  /**
   * 监听鼠标状态
   * 鼠标场景位置集合  
   * （自行继承组织点线面切面等几何图形）
   */
  stateStart() {
    this._clickPositionsArrays = [] //多次
    this._clickPositions = [0] //动态单次  使用数组最后一位记录移动标识
    this.click_LEFT_CLICK_Time = new Date()
  }

  drawListen() {
    this.stateStart()
    // 动态
    this.handler.setInputAction((movement) => {
      if (!movement.endPosition) { return }
      let clickScene = this.viewer.scene.pickPosition(movement.endPosition) //let clickWindow = click.position/movement.endPosition
      if (clickScene) { this._clickPositions[this._clickPositions.length - 1] = clickScene }
      this.click_MOUSE_MOVE = this._clickPositions
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 过程固定  
    this.handler.setInputAction((click) => {
      let clickScene = this.viewer.scene.pickPosition(click.position) //防止空洞选取
      if (clickScene && this.singleLeftClickBool()) { //单击和双击第一次点击
        // 直接保留最后
        this.click_LEFT_CLICK = this._clickPositions
        // 默认监move听到最后一点，随意加移动新点
        this._clickPositions.push(clickScene) //0
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 固定
    this.handler.setInputAction((click) => {
      let clickWindow = click.position
      let clickScene = this.viewer.scene.pickPosition(clickWindow)
      if (clickScene) {
        // 剔除最后移动点
        this._clickPositions.pop()
        //位置集合 直接保留最后
        this._clickPositionsArrays.push(this._clickPositions)
        this._clickPositionsStatic = this._clickPositions.slice(0)
        this.click_LEFT_DOUBLE_CLICK = this._clickPositions
        /***********************************注意重置本次鼠标记录数组 添加移动点0****************************************** */
        this._clickPositions = [0]
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  // 监听
  set click_MOUSE_MOVE(value) { this.test() }
  set click_LEFT_CLICK(value) { this.test() }
  set click_LEFT_DOUBLE_CLICK(value) { this.test() }

  removeAll() {
    this.handler = this.handler && this.handler.destroy();
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
    this._clickPositionsArrays = null //多次集成
    this._clickPositions = null //动态单次

  }

  /**
   * 判断此次点击 单击true/双击false  默认双击包含最后一次单击
   * @returns 
   */
  singleLeftClickBool() {
    let click_LEFT_CLICK_TimeNew = new Date()
    let leftClickTimeBool = (click_LEFT_CLICK_TimeNew - this.click_LEFT_CLICK_Time) > 300 //时间判定mm
    let leftClickDistanceBool = (this._clickPositions.length < 2) || //第一次点选默认距离符合单击
      (Cesium.Cartesian3.distance(this._clickPositions[this._clickPositions.length - 1], this._clickPositions[this._clickPositions.length - 2]) > 0.1) //双击距离判定m
    this.click_LEFT_CLICK_Time = click_LEFT_CLICK_TimeNew

    return leftClickTimeBool || leftClickDistanceBool
  }

  test() {
    console.log(this._clickPositions)
    console.log(this._clickPositionsArrays)
  }

}
export { MouseListen }