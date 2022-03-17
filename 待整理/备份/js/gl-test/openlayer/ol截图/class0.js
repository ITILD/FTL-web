class Class0 {
  /**
   *
   * @param {*}  in0
   */
  constructor(in0) {
    this.viewers = new Map()
  }

  /**
   *
   * @returns 单例
   */
  static getInstance() {
    if (!this.Instance) {
      this.Instance = new Class0()
    }
    return this.Instance
  }

  addCanvas(canvasOutDivId) {
    // let thisLayer =  loadWMTSLayer()
    let map = new ol.Map({
      target: canvasOutDivId,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
        // thisLayer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([121.5, 38.9]),
        zoom: 10
      })
    });

    let viewer = map
    this.viewers.set(canvasOutDivId, viewer)

    return viewer
  }
}
export { Class0 }

