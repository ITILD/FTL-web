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
    semiMinorAxis: 1.0,
    semiMajorAxis: 1.0,
    height: 20.0,
    extrudedHeight: 10.0,
    rotation: Cesium.Math.toRadians(-40.0),
    material: Cesium.Color.GREEN,
  },
});
viewer.zoomTo(viewer.entities);



//封装PrimitiveTriangles
class PrimitiveTriangles {
  /**
   * 
   * @param {*} viewer 
   * @param {Uint16Array} indiceArr 索引 [0,0,1,2,3,4,4,5,5,5,7,8,9] 可以通用
   */
  constructor(viewer,indiceArr) {
    this.viewer = viewer;
    this.indiceArr = indiceArr; //构造三角带索引（退化后）
    this.vertexShader = "attribute vec3 position3DHigh;\
    attribute vec3 position3DLow;\
    attribute float color_H;\
    varying float v_color;\
    attribute float batchId;\
    void main()\
    {\
        v_color =color_H;\
        gl_Position = czm_modelViewProjectionRelativeToEye * czm_computePosition();\
    }\
    ";
    this.fragmentShader = "varying float v_color;\
    vec3 hsv2rgb(vec3 c) {\
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\
    }\
    void main()\
    {\
        gl_FragColor =vec4(hsv2rgb(vec3(v_color ,1.0,1.0)),0.5);\
    }\
    ";
  }
  /**
   * 设置
   * @param {Float64Array} positionArr 退化三角坐标序列（笛卡尔空间直角）
   * @param {Float32Array} colorArr 

   */
  updatePositionColorArr(positionArr, colorArr) {
    this.positionArr = positionArr;
    this.colorArr = colorArr;
    this.geometry = new Cesium.Geometry({
      attributes: {
        position: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: this.positionArr
        }),
        color: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          componentsPerAttribute: 1,
          values: this.colorArr
        })
      },
      indices: this.indiceArr,
      primitiveType: Cesium.PrimitiveType.TRIANGLE_STRIP, //三角带
      boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
    });
    this.appearance = new Cesium.Appearance({
      renderState: {
        blending: Cesium.BlendingState.PRE_MULTIPLIED_ALPHA_BLEND,
        depthTest: { enabled: true },
        depthMask: true
        //lineWidth: 4.0
      },
      fragmentShaderSource: this.fragmentShader,
      vertexShaderSource: this.vertexShader
    });
    this.primitive && this.viewer.scene.primitives.remove(this.primitive);
    this.primitive = this.viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({ geometry: this.geometry }),
        appearance: this.appearance,
        // asynchronous: false
      }));
    // 内存释放？？？
  }

  remove() {
    this.primitive && this.viewer.scene.primitives.remove(this.primitive);
    this.positionArr = null;
    this.colorArr = null;
    this.indiceArr = null;
    this.geometry = null;
    this.appearance = null;
    this.primitive = null;
  }
  // TODO  
  static makePositionArrIndiceArrByCartesians(Cartesians){
    let postionsTemp = []; //postionsTemp [0x 0y 0z 1x 1y ....]
    let indicesTemp = []; //indicesTesm []
    let ColorsTemp = []
    for (let i = 0; i < Cartesians.length; i++) {
      postionsTemp.push(Cartesians[i].x);
      postionsTemp.push(Cartesians[i].y);
      postionsTemp.push(Cartesians[i].z);
      ColorsTemp.push(i / 62 / 2)
      indicesTemp.push(i);
    }


    let positionArr = new Float64Array(postionsTemp);
    let colorArr = new Float32Array(ColorsTemp);
    let indiceArr = new Uint16Array(indicesTemp);
    return [positionArr,colorArr,indiceArr]
  }
}



// function 

// function 
// 参考  https://blog.csdn.net/A873054267/article/details/105136507



/**
 *     let postionsTemp = []; //postionsTemp [0x 0y 0z 1x 1y ....]
    let indicesTesm = []; //indicesTesm []
    for (let i = 0; i < Cartesians.length; i++) {
      postionsTemp.push(Cartesians[i].x);
      postionsTemp.push(Cartesians[i].y);
      postionsTemp.push(Cartesians[i].z);
      // 退化三角形分割
      if (i ==19||i ==20) indicesTesm.push(i);
      indicesTesm.push(i);
    }
    // this.positionArr = new Float32Array(postionsTemp);//精度不够
    this.positionArr = new Float64Array(postionsTemp);
    this.colorArr = new Float32Array(Colors);
    this.indiceArr = new Uint16Array(indicesTesm);
 */
/**
 *
  vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

 */

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
    "x": -2603387.5541261146,
    "y": 4233198.206224008,
    "z": 3984488.721148249
  },
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


// for (let index = 0; index < 10000; index++) {
//   new PrimitiveTriangles(
//     viewer,
//     cartesian3Positions,
//     Colors);

// }

// 构造新三角形
// new PrimitiveTriangles(
//   viewer,
//   cartesian3Positions,
//   Colors);



let positionArrays1 = [

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
  {
    "x": -2603383.57010457,
    "y": 4233191.604046803,
    "z": 3984493.7100004475
  },
  {
    "x": -2603384.7386527937,
    "y": 4233193.504148169,
    "z": 3984495.510524713
  },
  {
    "x": -2603385.907201017,
    "y": 4233195.404249534,
    "z": 3984497.3110489785
  },
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
    "x": -2603389.4128456856,
    "y": 4233201.104553631,
    "z": 3984502.712621774
  },
  {
    "x": -2603390.581393909,
    "y": 4233203.004654996,
    "z": 3984504.5131460396
  },
  {
    "x": -2603391.749942133,
    "y": 4233204.904756362,
    "z": 3984506.313670305
  },
  {
    "x": -2603392.918490356,
    "y": 4233206.804857725,
    "z": 3984508.114194569
  },
  {
    "x": -2603394.087038579,
    "y": 4233208.704959091,
    "z": 3984509.914718835
  },
  {
    "x": -2603395.255586802,
    "y": 4233210.605060456,
    "z": 3984511.7152431007
  },
  {
    "x": -2603396.424135025,
    "y": 4233212.505161821,
    "z": 3984513.515767366
  },
  {
    "x": -2603397.592683248,
    "y": 4233214.405263187,
    "z": 3984515.316291631
  },
  {
    "x": -2603398.7612314713,
    "y": 4233216.305364553,
    "z": 3984517.116815896
  },
  {
    "x": -2603399.9297796944,
    "y": 4233218.205465918,
    "z": 3984518.9173401613
  },
  {
    "x": -2603401.0983279175,
    "y": 4233220.105567283,
    "z": 3984520.717864427
  },
  {
    "x": -2603402.26687614,
    "y": 4233222.005668648,
    "z": 3984522.5183886923
  },
  {
    "x": -2603403.4354243637,
    "y": 4233223.905770013,
    "z": 3984524.3189129573
  },
  {
    "x": -2603404.6039725873,
    "y": 4233225.80587138,
    "z": 3984526.1194372224
  },
  {
    "x": -2603405.77252081,
    "y": 4233227.705972743,
    "z": 3984527.9199614874
  },
  {
    "x": -2603406.9410690325,
    "y": 4233229.60607411,
    "z": 3984529.720485753
  },
  {
    "x": -2603408.109617256,
    "y": 4233231.506175475,
    "z": 3984531.5210100184
  },
  {
    "x": -2603409.2781654787,
    "y": 4233233.406276839,
    "z": 3984533.321534283
  },
  {
    "x": -2603410.4467137023,
    "y": 4233235.306378204,
    "z": 3984535.1220585485
  },
  {
    "x": -2603411.6152619254,
    "y": 4233237.206479571,
    "z": 3984536.9225828135
  },
  {
    "x": -2603412.783810149,
    "y": 4233239.106580935,
    "z": 3984538.7231070795
  },
  {
    "x": -2603413.952358372,
    "y": 4233241.006682301,
    "z": 3984540.5236313445
  },
  {
    "x": -2603415.1209065956,
    "y": 4233242.906783666,
    "z": 3984542.32415561
  },
  {
    "x": -2603416.2894548182,
    "y": 4233244.806885031,
    "z": 3984544.124679875
  },
  {
    "x": -2603419.104928139,
    "y": 4233249.508960871,
    "z": 3984537.335303411
  },
  {
    "x": -2603417.9363799156,
    "y": 4233247.6088595055,
    "z": 3984535.534779146
  },
  {
    "x": -2603416.7678316925,
    "y": 4233245.70875814,
    "z": 3984533.73425488
  },
  {
    "x": -2603415.5992834694,
    "y": 4233243.808656776,
    "z": 3984531.933730615
  },
  {
    "x": -2603414.4307352463,
    "y": 4233241.90855541,
    "z": 3984530.13320635
  },
  {
    "x": -2603413.2621870227,
    "y": 4233240.008454044,
    "z": 3984528.3326820848
  },
  {
    "x": -2603412.0936388,
    "y": 4233238.10835268,
    "z": 3984526.5321578197
  },
  {
    "x": -2603410.925090577,
    "y": 4233236.208251315,
    "z": 3984524.7316335537
  },
  {
    "x": -2603409.7565423534,
    "y": 4233234.30814995,
    "z": 3984522.9311092887
  },
  {
    "x": -2603408.5879941303,
    "y": 4233232.408048583,
    "z": 3984521.130585023
  },
  {
    "x": -2603407.419445908,
    "y": 4233230.50794722,
    "z": 3984519.3300607586
  },
  {
    "x": -2603406.2508976846,
    "y": 4233228.607845853,
    "z": 3984517.529536493
  },
  {
    "x": -2603405.0823494615,
    "y": 4233226.707744488,
    "z": 3984515.7290122276
  },
  {
    "x": -2603403.913801239,
    "y": 4233224.807643123,
    "z": 3984513.9284879626
  },
  {
    "x": -2603402.7452530153,
    "y": 4233222.907541758,
    "z": 3984512.1279636975
  },
  {
    "x": -2603401.576704792,
    "y": 4233221.007440392,
    "z": 3984510.327439432
  },
  {
    "x": -2603400.4081565687,
    "y": 4233219.107339026,
    "z": 3984508.5269151665
  },
  {
    "x": -2603399.239608346,
    "y": 4233217.207237662,
    "z": 3984506.7263909015
  },
  {
    "x": -2603398.071060123,
    "y": 4233215.307136297,
    "z": 3984504.9258666364
  },
  {
    "x": -2603396.9025118994,
    "y": 4233213.407034931,
    "z": 3984503.125342371
  },
  {
    "x": -2603395.7339636763,
    "y": 4233211.506933565,
    "z": 3984501.3248181054
  },
  {
    "x": -2603394.565415453,
    "y": 4233209.606832201,
    "z": 3984499.5242938404
  },
  {
    "x": -2603393.39686723,
    "y": 4233207.706730835,
    "z": 3984497.723769576
  },
  {
    "x": -2603392.228319007,
    "y": 4233205.80662947,
    "z": 3984495.92324531
  },
  {
    "x": -2603391.0597707834,
    "y": 4233203.906528104,
    "z": 3984494.122721045
  },
  {
    "x": -2603389.891222561,
    "y": 4233202.00642674,
    "z": 3984492.32219678
  },
  {
    "x": -2603388.7226743377,
    "y": 4233200.106325375,
    "z": 3984490.5216725143
  },
  {
    "x": -2603387.5541261146,
    "y": 4233198.206224008,
    "z": 3984488.721148249
  },
  {
    "x": -2603386.385577892,
    "y": 4233196.306122644,
    "z": 3984486.9206239847
  },
  {
    "x": -2603385.2170296684,
    "y": 4233194.406021279,
    "z": 3984485.120099719
  },
  {
    "x": -2603382.5008735373,
    "y": 4233193.539858554,
    "z": 3984483.2325129174
  },


]
let positionArrays = [

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
  {
    "x": -2603383.57010457,
    "y": 4233191.604046803,
    "z": 3984493.7100004475
  },
  {
    "x": -2603384.7386527937,
    "y": 4233193.504148169,
    "z": 3984495.510524713
  },
  {
    "x": -2603385.907201017,
    "y": 4233195.404249534,
    "z": 3984497.3110489785
  },
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
    "x": -2603389.4128456856,
    "y": 4233201.104553631,
    "z": 3984502.712621774
  },
  {
    "x": -2603390.581393909,
    "y": 4233203.004654996,
    "z": 3984504.5131460396
  },
  {
    "x": -2603391.749942133,
    "y": 4233204.904756362,
    "z": 3984506.313670305
  },
  {
    "x": -2603392.918490356,
    "y": 4233206.804857725,
    "z": 3984508.114194569
  },
  {
    "x": -2603394.087038579,
    "y": 4233208.704959091,
    "z": 3984509.914718835
  },
  {
    "x": -2603395.255586802,
    "y": 4233210.605060456,
    "z": 3984511.7152431007
  },
  {
    "x": -2603396.424135025,
    "y": 4233212.505161821,
    "z": 3984513.515767366
  },
  {
    "x": -2603397.592683248,
    "y": 4233214.405263187,
    "z": 3984515.316291631
  },
  {
    "x": -2603398.7612314713,
    "y": 4233216.305364553,
    "z": 3984517.116815896
  },
  {
    "x": -2603399.9297796944,
    "y": 4233218.205465918,
    "z": 3984518.9173401613
  },
  {
    "x": -2603401.0983279175,
    "y": 4233220.105567283,
    "z": 3984520.717864427
  },
  {
    "x": -2603402.26687614,
    "y": 4233222.005668648,
    "z": 3984522.5183886923
  },
  {
    "x": -2603403.4354243637,
    "y": 4233223.905770013,
    "z": 3984524.3189129573
  },
  {
    "x": -2603404.6039725873,
    "y": 4233225.80587138,
    "z": 3984526.1194372224
  },
  {
    "x": -2603405.77252081,
    "y": 4233227.705972743,
    "z": 3984527.9199614874
  },
  {
    "x": -2603406.9410690325,
    "y": 4233229.60607411,
    "z": 3984529.720485753
  },
  {
    "x": -2603408.109617256,
    "y": 4233231.506175475,
    "z": 3984531.5210100184
  },
  {
    "x": -2603409.2781654787,
    "y": 4233233.406276839,
    "z": 3984533.321534283
  },
  {
    "x": -2603410.4467137023,
    "y": 4233235.306378204,
    "z": 3984535.1220585485
  },
  {
    "x": -2603411.6152619254,
    "y": 4233237.206479571,
    "z": 3984536.9225828135
  },
  {
    "x": -2603412.783810149,
    "y": 4233239.106580935,
    "z": 3984538.7231070795
  },
  {
    "x": -2603413.952358372,
    "y": 4233241.006682301,
    "z": 3984540.5236313445
  },
  {
    "x": -2603415.1209065956,
    "y": 4233242.906783666,
    "z": 3984542.32415561
  },
  {
    "x": -2603416.2894548182,
    "y": 4233244.806885031,
    "z": 3984544.124679875
  },
  {
    "x": -2603419.104928139,
    "y": 4233249.508960871,
    "z": 3984537.335303411
  },
  {
    "x": -2603417.9363799156,
    "y": 4233247.6088595055,
    "z": 3984535.534779146
  },
  {
    "x": -2603416.7678316925,
    "y": 4233245.70875814,
    "z": 3984533.73425488
  },
  {
    "x": -2603415.5992834694,
    "y": 4233243.808656776,
    "z": 3984531.933730615
  },
  {
    "x": -2603414.4307352463,
    "y": 4233241.90855541,
    "z": 3984530.13320635
  },
  {
    "x": -2603413.2621870227,
    "y": 4233240.008454044,
    "z": 3984528.3326820848
  },
  {
    "x": -2603412.0936388,
    "y": 4233238.10835268,
    "z": 3984526.5321578197
  },
  {
    "x": -2603410.925090577,
    "y": 4233236.208251315,
    "z": 3984524.7316335537
  },
  {
    "x": -2603409.7565423534,
    "y": 4233234.30814995,
    "z": 3984522.9311092887
  },
  {
    "x": -2603408.5879941303,
    "y": 4233232.408048583,
    "z": 3984521.130585023
  },
  {
    "x": -2603407.419445908,
    "y": 4233230.50794722,
    "z": 3984519.3300607586
  },
  {
    "x": -2603406.2508976846,
    "y": 4233228.607845853,
    "z": 3984517.529536493
  },
  {
    "x": -2603405.0823494615,
    "y": 4233226.707744488,
    "z": 3984515.7290122276
  },
  {
    "x": -2603403.913801239,
    "y": 4233224.807643123,
    "z": 3984513.9284879626
  },
  {
    "x": -2603402.7452530153,
    "y": 4233222.907541758,
    "z": 3984512.1279636975
  },
  {
    "x": -2603401.576704792,
    "y": 4233221.007440392,
    "z": 3984510.327439432
  },
  {
    "x": -2603400.4081565687,
    "y": 4233219.107339026,
    "z": 3984508.5269151665
  },
  {
    "x": -2603399.239608346,
    "y": 4233217.207237662,
    "z": 3984506.7263909015
  },
  {
    "x": -2603398.071060123,
    "y": 4233215.307136297,
    "z": 3984504.9258666364
  },
  {
    "x": -2603396.9025118994,
    "y": 4233213.407034931,
    "z": 3984503.125342371
  },
  {
    "x": -2603395.7339636763,
    "y": 4233211.506933565,
    "z": 3984501.3248181054
  },
  {
    "x": -2603394.565415453,
    "y": 4233209.606832201,
    "z": 3984499.5242938404
  },
  {
    "x": -2603393.39686723,
    "y": 4233207.706730835,
    "z": 3984497.723769576
  },
  {
    "x": -2603392.228319007,
    "y": 4233205.80662947,
    "z": 3984495.92324531
  },
  {
    "x": -2603391.0597707834,
    "y": 4233203.906528104,
    "z": 3984494.122721045
  },
  {
    "x": -2603389.891222561,
    "y": 4233202.00642674,
    "z": 3984492.32219678
  },
  {
    "x": -2603388.7226743377,
    "y": 4233200.106325375,
    "z": 3984490.5216725143
  },
  {
    "x": -2603387.5541261146,
    "y": 4233198.206224008,
    "z": 3984488.721148249
  },
  {
    "x": -2603386.385577892,
    "y": 4233196.306122644,
    "z": 3984486.9206239847
  },
  {
    "x": -2603385.2170296684,
    "y": 4233194.406021279,
    "z": 3984485.120099719
  },
  {
    "x": -2603382.5008735373,
    "y": 4233193.539858554,
    "z": 3984483.2325129174
  },


]
let floor = positionArrays.length / 2
let newPositionArrays = new Array(floor)
let newColor = []

for (let index = 0; index < positionArrays.length; index++) {
  const element = positionArrays[index];
  // newColor.push(Math.random())
  newColor.push(index / 62 / 2)
  // newColor.push(Math.random())
  // newColor.push(Math.random())
  // newColor.push(Math.random())
  if (index < floor) {
    newPositionArrays[2 * index] = element
  } else {
    newPositionArrays[2 * (positionArrays.length - index) - 1] = element
  }
}
debugger
let NewColor = new Float64Array(newColor)



new PrimitiveTriangles(
  viewer,
  newPositionArrays,
  NewColor);


for (let index = 0; index < newPositionArrays.length; index++) {
  const element = newPositionArrays[index];
  debugger

  // height = 100000.0 + 200000.0 * i;

  viewer.entities.add({
    // position: Cesium.Cartesian3.fromDegrees(-100.0, 45.0, height),
    id: index + ' x:' + element.x + ' y:' + element.y + ' z:' + element.z,
    position: element,
    ellipsoid: {
      radii: new Cesium.Cartesian3(1.0, 1.0, 1.0),
      material: Cesium.Color.fromHsl(index / newPositionArrays.length / 2, 0.7, 0.7, 0.7),
    },
  });
}