// 停止;
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YWVjNGJlZC05MjEzLTRlNDEtYjcwYy05NzY2NmJiMzBjNGQiLCJpZCI6MTExODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTgzNzQ5MTV9.0jiPX8lzZIYzTd-tzeNju0hOFnBmMyxiPtxSeXaA8s0";
const viewer = new Cesium.Viewer("cesiumContainer");
viewer.scene.debugShowFramesPerSecond = true;
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

class ChangePloygonPrimitive {
  constructor() {
    this.positionArrays = null;
    this.geometryInstances = [];
    this.primitivePolygons = new Cesium.PrimitiveCollection();
    viewer.scene.primitives.add(this.primitivePolygons)
  }



  update(positionArrays) {
    let oldprimitive = this.primitive 
    
    this.positionArrays = positionArrays
    // 添加实例化
    for (let index = 0; index < this.positionArrays.length; index++) {
      const positionArray = this.positionArrays[index];
      let geometry = new Cesium.PolygonGeometry({
        // polygonHierarchy: new Cesium.PolygonHierarchy(
        //   Cesium.Cartesian3.fromDegreesArrayHeights(positionArray)
        // ),
        // 跳过new类  默认无空洞
        polygonHierarchy: {positions : Cesium.Cartesian3.fromDegreesArrayHeights(positionArray)},
        perPositionHeight: true
      })

      let geometryInstance = new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: { color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({ alpha: 0.6 })) }
      })
      this.geometryInstances[index] = geometryInstance
    }

    this.primitive = new Cesium.Primitive({
      geometryInstances: this.geometryInstances,
      appearance: new Cesium.PerInstanceColorAppearance(),
      asynchronous: false,
      // show:true
    });
    this.primitivePolygons.add(
      this.primitive
    );
    this.primitivePolygons.remove(
      oldprimitive
    );
  }


  destroy() {
    this.primitive = this.primitive && this.primitive.destroy()
    this.geometryInstances = []
    this.positionArrays = null
  }
}




// ************************************************************test ***********************************************************
let polygonSize = 5000
let positionArrays = []
for (let i = 0; i < polygonSize; i += 1) {
  let lat = 41.0 + i / 1000
  positionArrays[i] = [
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
    0
  ]
}




let changePloygonPrimitive = new ChangePloygonPrimitive()
changePloygonPrimitive.update(positionArrays)


let changeEnd = (temp1) => {
  for (let i = 0; i <polygonSize; i += 1) {
    let lat = 41.0 + i / 1000
    // positionArrays[i] = [
    //   120 + temp1,
    //   lat,
    //   0,
    //   120 + temp1,
    //   lat,
    //   1000,
    //   120.01 + temp1,
    //   lat,
    //   1000,
    //   120.01 + temp1,
    //   lat,
    //   0
    // ]

    positionArrays[i] = [
      120 + temp1,
      lat,
      0,
      120 + temp1,
      lat,
      1000,
      120 + temp1,
      lat,
      2000,
      120 + temp1,
      lat,
      3000,
      120.01 + temp1,
      lat,
      3000,
      120.01 + temp1,
      lat,
      2000,
      120.01 + temp1,
      lat,
      1000,
      120.01 + temp1,
      lat,
      0
    ]
  }
}

let temp1 = 0.005;
// let temp1 = 0.005;





// setInterval(() => {
//   changeEnd(temp1)
//   changePloygonPrimitive.update(positionArrays)
//   // temp1 = -temp1
//   temp1+=0.001
// }, 200 );



// let animloop = () => {
//   changeEnd(temp1)
//   changePloygonPrimitive.update(positionArrays)
//   // temp1 = -temp1
//   temp1+=0.001
//   window.requestAnimationFrame(animloop);
// };

// animloop()


var fps = 14
var fpsInterval = 1000 / fps
var last = new Date().getTime() //上次执行的时刻
let endAnimate

function animate() {
 
  endAnimate = requestAnimationFrame(animate);
    // 执行时的时间
    var now = new Date().getTime()
    var elapsed = now - last;
    // 经过了足够的时间
    if (elapsed > fpsInterval) {
        last = now - (elapsed % fpsInterval); //校正当前时间
        
        // 循环的代码
        // drawSomething()
        changeEnd(temp1)
        changePloygonPrimitive.update(positionArrays)
        // temp1 = -temp1
        temp1+=0.001
    }
}


// cancelAnimationFrame(endAnimate);//结束