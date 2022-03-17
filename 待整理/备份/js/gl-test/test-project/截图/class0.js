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
    let map = new ol.Map({
      target: canvasOutDivId,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });

    let viewer = map

    this.viewers.set(canvasOutDivId, viewer)

    return viewer
  }
}
export { Class0 }
