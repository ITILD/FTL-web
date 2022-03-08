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
    0.0]),

    perPositionHeight: true,
    material: Cesium.Color.CYAN.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK } });



viewer.zoomTo(viewer.entities);

function changeLinePrimitive(options) {
  let { semiMajorAxis, semiMinorAxis, extrudedHeight, position } = options;
  this.semiMajorAxis = semiMajorAxis;
  this.semiMinorAxis = semiMinorAxis;
  this.extrudedHeight = extrudedHeight;
  this.position = position;
}

changeLinePrimitive.prototype.getGeometry = function () {
  return new Cesium.EllipseGeometry({
    center: this.position,
    semiMajorAxis: this.semiMajorAxis,
    semiMinorAxis: this.semiMinorAxis,
    extrudedHeight: this.extrudedHeight });

};
changeLinePrimitive.prototype.update = function (
context,
frameState,
commandList)
{
  var geometry = this.getGeometry();
  if (!geometry) {
    return;
  }

  this._primitive = new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: geometry }),

    releaseGeometryInstances: false,
    appearance: new Cesium.EllipsoidSurfaceAppearance({
      material: Cesium.Material.fromType("Stripe") }),

    asynchronous: false
    // show:true
  });
  var primitive = this._primitive;

  primitive.update(context, frameState, commandList);
};

let billEntity = [];
let pr = new changeLinePrimitive({
  semiMajorAxis: 1000.0,
  semiMinorAxis: 1000.0,
  extrudedHeight: 0,
  position: Cesium.Cartesian3.fromDegrees(121, 37.03883) });

viewer.scene.primitives.add(pr);

let temp = 0;
setInterval(() => {
  temp += 10000;
  pr.extrudedHeight = temp;
}, 1000);


let arrGeometry =[]
for (let i = 0; i < 100; i += 3) {
  let billEntity = [];
  let pr = new changeLinePrimitive({
    semiMajorAxis: 10000.0,
    semiMinorAxis: 10000.0,
    extrudedHeight: 0,
    position: Cesium.Cartesian3.fromDegrees(121 + i / 30, 39.03883) });

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