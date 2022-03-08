// 停止;
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YWVjNGJlZC05MjEzLTRlNDEtYjcwYy05NzY2NmJiMzBjNGQiLCJpZCI6MTExODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTgzNzQ5MTV9.0jiPX8lzZIYzTd-tzeNju0hOFnBmMyxiPtxSeXaA8s0";
const viewer = new Cesium.Viewer("cesiumContainer");

const cyanPolygon = viewer.entities.add({
  name: "Cyan vertical polygon with per-position heights and outline",
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
      120.0,
      41.0,
      0.0,
      120.0,
      41.0,
      10000.0,
      120.0001,
      41.0,
      0.0
    ]),

    perPositionHeight: true,
    // material: Cesium.Color.CYAN.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK
  }
});


let tempbool = 0
viewer.zoomTo(viewer.entities);
class hangePloygonPrimitive {
  constructor(positionArray) {
    this.positionArray = positionArray;
    this.geometry

    this._primitive = null
  }

 

  update(
    context,
    frameState,
    commandList)
  {
    tempbool+=1
    if (tempbool%5 != 1) {
      return
    }
    this.geometry = null
    this.geometry = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArrayHeights(this.positionArray)
      ),
      perPositionHeight: true
    })

    // this._primitive.destroy()
    this._primitive = null
    this._primitive = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: this.geometry,
        attributes: { color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED) }
      }),
      appearance : new Cesium.PerInstanceColorAppearance(),
      asynchronous: false,
      // show:true
    });
    this._primitive.update(context, frameState, commandList);
  }
}



// let pr = new changePloygonPrimitive(
//   [
//     117.0,
//       41.0,
//       0.0,
//       118.0,
//       41.0,
//       30000.0,
//       119.0,
//       41.0,
//       0.0
//   ]
// );

// viewer.scene.primitives.add(pr);


// setInterval(() => {
//   pr.positionArray[5] +=330
// },200);


let arrGeometry = []
for (let i = 0; i < 1000; i += 3) {
// for (let i = 0; i < 10; i += 3) {
  let lat = 41.0+i/100
  // let pr = new changePloygonPrimitive(  [
  //   120,
  //   lat,
  //   0,
  //   120,
  //   lat,
  //   1000,
  //   120.01,
  //   lat,
  //   1000,
  //   120.01,
  //   lat,
  //   0,

  // ]);
  let pr = new changePloygonPrimitive(  [
    120,
    lat,
    0,
    120,
    lat,
    1000,
    120.01,
    lat,
    1000,
    120.01,
    lat,
    0,

  ]);

  viewer.scene.primitives.add(pr);
  arrGeometry.push(pr)

}


let temp1 = 0.005;
// let temp1 = 0.005;
setInterval(() => {
  arrGeometry.forEach(pr => {
    pr.positionArray[0] +=temp1
    pr.positionArray[3] +=temp1
    pr.positionArray[6] +=temp1
    pr.positionArray[9] +=temp1
  
  });
  temp1 = -temp1

},33);