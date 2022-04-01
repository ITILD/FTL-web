// 停止;
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YWVjNGJlZC05MjEzLTRlNDEtYjcwYy05NzY2NmJiMzBjNGQiLCJpZCI6MTExODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTgzNzQ5MTV9.0jiPX8lzZIYzTd-tzeNju0hOFnBmMyxiPtxSeXaA8s0";
const viewer = new Cesium.Viewer("cesiumContainer");

const cyanPolygon = viewer.entities.add({
  name: "Cyan vertical polygon with per-position heights and outline",
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
      118.0,
      41.0,
      0.0,
      120.0,
      41.0,
      500000.0,
      122.0,
      41.0,
      0.0
    ]),

    perPositionHeight: true,
    material: Cesium.Color.CYAN.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK
  }
});



viewer.zoomTo(viewer.entities);
class changeLinePrimitive {
  constructor(semiMajorAxis, semiMinorAxis, extrudedHeight, position) {
    this.semiMajorAxis = semiMajorAxis;
    this.semiMinorAxis = semiMinorAxis;
    this.extrudedHeight = extrudedHeight;
    this.position = position;
  }

  update(
    context,
    frameState,
    commandList)
  {
    let geometry = new Cesium.EllipseGeometry({
      center: this.position,
      semiMajorAxis: this.semiMajorAxis,
      semiMinorAxis: this.semiMinorAxis,
      extrudedHeight: this.extrudedHeight
    });

    // this._primitive.destroy()
    this._primitive = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: geometry
      }),

      // releaseGeometryInstances: false,
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: Cesium.Material.fromType("Stripe")
      }),

      asynchronous: false
      // show:true
    });
    let primitive = this._primitive;

    primitive.update(context, frameState, commandList);
  }
}





let billEntity = [];
let pr = new changeLinePrimitive(1000.0, 1000.0, 0,Cesium.Cartesian3.fromDegrees(121, 37.03883)
);

viewer.scene.primitives.add(pr);

let temp = 0;
setInterval(() => {
  temp += 10000;
  pr.extrudedHeight = temp;
}, 1000);


let arrGeometry = []
for (let i = 0; i < 100; i += 3) {
  let billEntity = [];
  let pr = new changeLinePrimitive( 10000.0,10000.0, 0,Cesium.Cartesian3.fromDegrees(121 + i / 30, 41)
  );

  viewer.scene.primitives.add(pr);
  arrGeometry.push(pr)

}


let temp1 = 0;
setInterval(() => {
  temp1 += 1000;
  arrGeometry.forEach(pr => {
    pr.extrudedHeight = temp1;
  });


}, 33);