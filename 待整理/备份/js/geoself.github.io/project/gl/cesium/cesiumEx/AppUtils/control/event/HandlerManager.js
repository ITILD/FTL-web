/**
 * HandlerManager
 *
 * @author Wangxu
 * @date 2021/5/6
 */

class HandlerManager {
    constructor() {
        this.handlers = new Map()
    }

    static getInstance() {
        if (!this.Instance) {
            this.Instance = new HandlerManager();
        }
        return this.Instance;
    }

    addHandler(id,viewer) {
        let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        this.handlers.set(id,handler)
    }


}