/**
 * name:itild
 * email:geolifestudy@gmail.com
 */
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YWVjNGJlZC05MjEzLTRlNDEtYjcwYy05NzY2NmJiMzBjNGQiLCJpZCI6MTExODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTgzNzQ5MTV9.0jiPX8lzZIYzTd-tzeNju0hOFnBmMyxiPtxSeXaA8s0";
// var viewer = new Cesium.Viewer('cesiumContainer');
const viewer = new Cesium.Viewer("cesiumContainer");
const cyanPolygon = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(121.590758, 38.909046),
  ellipse: {
    semiMinorAxis: 10.0,
    semiMajorAxis: 10.0,
    height: 10.0,
    extrudedHeight: 100.0,
    rotation: Cesium.Math.toRadians(-40.0),
    material: Cesium.Color.RED,
  },
});
viewer.zoomTo(viewer.entities);



//封装PrimitiveTriangles
class PrimitiveTriangles {
  constructor(viewer, Cartesians, Colors) {
    this.viewer = viewer;
    this.vertexShader = getVS();
    this.fragmentShader = getFS();
    debugger;
    console.log(this.viewer.scene.primitives);
    debugger;
    //let geometry;
    //let appearance;

    if (Cartesians && Cartesians.length >= 2) {
      let postionsTemp = []; //postionsTemp [0x 0y 0z 1x 1y ....]
      let indicesTesm = []; //indicesTesm []
      for (let i = 0; i < Cartesians.length; i++) {
        postionsTemp.push(Cartesians[i].x);
        postionsTemp.push(Cartesians[i].y);
        postionsTemp.push(Cartesians[i].z);
      }
      for (let i = 0; i < Cartesians.length; i+=3) {
        indicesTesm.push(i);
        indicesTesm.push(i + 1);
        indicesTesm.push(i + 2);
      }
      this.positionArr = new Float64Array(postionsTemp);
      this.colorArr = new Float32Array(Colors);
      this.indiceArr = new Uint16Array(indicesTesm);
    }


    this.geometry = CreateGeometry(
      this.positionArr,
      this.colorArr,
      this.indiceArr);

    this.appearance = CreateAppearence(this.fragmentShader, this.vertexShader);
    debugger;
    this.primitive = this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: this.geometry
        }),
        appearance: this.appearance,
        asynchronous: false
      }));

  }

  remove() {
    if (this.primitive != null) {
      this.viewer.scene.primitives.remove(this.primitive);
      this.positionArr = null;
      this.colorArr = null;
      this.indiceArr = null;
      this.geometry = null;
      this.appearance = null;
      this.primitive = null;
    }
  }
  updateCartesianPosition(cartesians) {
    if (this.primitive != null) {
      this.viewer.scene.primitives.remove(this.primitive);
      if (cartesians && cartesians.length < 2) {
        return;
      }

      //默认蓝色
      let postionsTemp = [];
      let colorsTemp = [];
      let indicesTesm = [];
      for (let i = 0; i < cartesians.length; i++) {
        postionsTemp.push(cartesians[i].x);
        postionsTemp.push(cartesians[i].y);
        postionsTemp.push(cartesians[i].z);

        colorsTemp.push(0.0);
        colorsTemp.push(0.0);
        colorsTemp.push(1.0);
        colorsTemp.push(1.0);
      }
      for (let i = 0; i < cartesians.length; i += 3) {
        indicesTesm.push(i);
        indicesTesm.push(i + 1);
        indicesTesm.push(i + 2);
      }
      this.positionArr = new Float64Array(postionsTemp);
      this.colorArr = new Float32Array(colorsTemp);
      this.indiceArr = new Uint16Array(indicesTesm);

      this.geometry = CreateGeometry(
        this.positionArr,
        this.colorArr,
        this.indiceArr);

      this.appearance = CreateAppearence(this.fragmentShader, this.vertexShader);

      this.primitive = this.viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: this.geometry
          }),


          appearance: this.appearance,
          asynchronous: false
        }));



    } else {
      return;
    }
  }
  updateCartesianPositionColor(cartesians, colors) {
    if (colors.length === cartesians.length * 4) {} else {
      return;
    }
    if (this.primitive != null) {
      this.viewer.scene.primitives.remove(this.primitive);
      if (cartesians && cartesians.length < 2) {
        return;
      }

      let postionsTemp = [];
      let indicesTesm = [];

      for (let i = 0; i < cartesians.length; i++) {
        postionsTemp.push(cartesians[i].x);
        postionsTemp.push(cartesians[i].y);
        postionsTemp.push(cartesians[i].z);
      }
      for (let i = 0; i < cartesians.length; i += 3) {
        indicesTesm.push(i);
        indicesTesm.push(i + 1);
        indicesTesm.push(i + 2);
      }
      this.positionArr = new Float64Array(postionsTemp);
      this.colorArr = new Float32Array(colors);
      this.indiceArr = new Uint16Array(indicesTesm);

      this.geometry = CreateGeometry(
        this.positionArr,
        this.colorArr,
        this.indiceArr);

      this.appearance = CreateAppearence(this.fragmentShader, this.vertexShader);

      this.primitive = this.viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: this.geometry
          }),


          appearance: this.appearance,
          asynchronous: false
        }));



    } else {
      return;
    }
  }
}



function CreateGeometry(positions, colors, indices) {
  return new Cesium.Geometry({
    attributes: {
      position: new Cesium.GeometryAttribute({
        componentDatatype: Cesium.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: positions
      }),


      color: new Cesium.GeometryAttribute({
        componentDatatype: Cesium.ComponentDatatype.FLOAT,
        componentsPerAttribute: 4,
        values: colors
      })
    },




    indices: indices,
    primitiveType: Cesium.PrimitiveType.TRIANGLES,//三角
    boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
  });


}

function CreateAppearence(fs, vs) {
  return new Cesium.Appearance({
    renderState: {
      blending: Cesium.BlendingState.PRE_MULTIPLIED_ALPHA_BLEND,
      depthTest: { enabled: true },
      depthMask: true

      //lineWidth: 4.0
    },
    fragmentShaderSource: fs,
    vertexShaderSource: vs
  });


}
// 参考  https://blog.csdn.net/A873054267/article/details/105136507
function getVS() {
  return "attribute vec3 position3DHigh;\
          attribute vec3 position3DLow;\
          attribute vec4 color;\
          varying vec4 v_color;\
          attribute float batchId;\
          void main()\
          {\
              vec4 p = czm_computePosition();\
              v_color =color;\
              p = czm_modelViewProjectionRelativeToEye * p;\
              gl_Position = p;\
          }\
          ";
}


function getFS() {
  return "varying vec4 v_color;\
          void main()\
          {\
              gl_FragColor =v_color;\
          }\
          ";
}


//定义顶点坐标（经纬度）
var positions = new Float64Array([110.2, 20.6, 110.2, 21.9, 111, 23]);
var cartesian3Positions = Cesium.Cartesian3.fromDegreesArray(positions);

//定义颜色（4个元素定义一个点的颜色（红绿蓝透明度））
var Colors = new Float64Array([
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0
]);


// let p = new PrimitiveTriangles(viewer, cartesian3Positions, Colors);
let temp = 0;
temp += 3;
positions = new Float64Array([
  119 + temp,
  37 + temp,
  121 + temp,
  37 + temp,
  120 + temp,
  39 + temp
]);
// 
cartesian3Positions = Cesium.Cartesian3.fromDegreesArray(positions);
debugger
cartesian3Positions = [
  {
  "x": -2603382.5008735373,
  "y": 4233193.539858554,
  "z": 3984483.2325129174
},
{
  "x": -2603379.6854002164,
  "y": 4233188.837782714,
  "z": 3984490.0218893816
},
{
  "x": -2603382.401556348,
  "y": 4233189.703945439,
  "z": 3984491.9094761834
},
// 第二三角形
{
  "x": -2603387.07574924,
  "y": 4233197.3043509,
  "z": 3984499.1115732444
},
{
  "x": -2603388.2442974625,
  "y": 4233199.204452264,
  "z": 3984500.912097509
},
{
  "x": -2603387.5541261146,
  "y": 4233198.206224008,
  "z": 3984488.721148249
},
// {
//   "x": -2603388.7226743377,
//   "y": 4233200.106325375,
//   "z": 3984490.5216725143
// },



];

Colors = new Float64Array([
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(), //rgba的a
  Math.random(),
  Math.random(),
  Math.random(),
  1.0,
  Math.random(),
  Math.random(),
  Math.random(),
  1.0,

  // 第二三角形
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(), //rgba的a
  Math.random(),
  Math.random(),
  Math.random(),
  1.0,
  Math.random(),
  Math.random(),
  Math.random(),
  1.0,
]);

// 构造新三角形
new PrimitiveTriangles(
  viewer,
  cartesian3Positions,
  Colors);