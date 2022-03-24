// 停止;
Cesium.Ion.defaultAccessToken =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YWVjNGJlZC05MjEzLTRlNDEtYjcwYy05NzY2NmJiMzBjNGQiLCJpZCI6MTExODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTgzNzQ5MTV9.0jiPX8lzZIYzTd-tzeNju0hOFnBmMyxiPtxSeXaA8s0";
const viewer = new Cesium.Viewer("cesiumContainer");
// 121.590758,38.909046
const cyanPolygon = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(121.590758,38.909046),
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

class ChangePloygonPrimitive {
  constructor() {
      this.positionArrays = null;
      this.geometryInstances = [];
      this.primitivePolygons = new Cesium.PrimitiveCollection();
      viewer.scene.primitives.add(this.primitivePolygons)
  }


  update(positionArrays) {
      this.geometryInstances = [];
      let oldprimitive = this.primitive

      this.positionArrays = positionArrays
      // 添加实例化
      for (let index = 0; index < this.positionArrays.length; index++) {
          const positionArrayOne = this.positionArrays[index];

          for (let i = 0; i <positionArrayOne.length ; i++) {
              const positionArray = positionArrayOne[i];
              let geometry = new Cesium.PolygonGeometry({
                  // polygonHierarchy: new Cesium.PolygonHierarchy(
                  //   Cesium.Cartesian3.fromDegreesArrayHeights(positionArray)
                  // ),
                  // 跳过new类  默认无空洞
                  // polygonHierarchy: {positions: Cesium.Cartesian3.fromDegreesArrayHeights(positionArray)},
                  // closeTop:false,
                  // closeBottom:false,
                  // arcType: ArcType.RHUMB,
                  // vertexFormat:Cesium.VertexFormat.ALL,
                  polygonHierarchy: {positions: positionArray},
                  perPositionHeight: true,

              })

              let geometryInstance = new Cesium.GeometryInstance({
                  geometry: geometry,
                  // attributes: {color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha: 0.8}))}
                  attributes: {color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromHsl(i/28,0.7,0.7,0.7))}
                  // attributes: {color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE)}
              })
              // this.geometryInstances[index] = geometryInstance
              this.geometryInstances.push( geometryInstance)
          }

      }

      this.primitive = new Cesium.Primitive({
          geometryInstances: this.geometryInstances,
          appearance: new Cesium.PerInstanceColorAppearance(
              {
                  // flat : true,//平面光照
                  translucent : false//开启透明混合
              }
          ),
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


  removeAll() {
      this.primitive = this.primitive && this.primitive.destroy()
      this.geometryInstances = []
      this.positionArrays = null
  }
}



// polygonHierarchy: {positions: positionArray},



let positionArrays =[[
[
 
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
]]

debugger
for (let index = 0; index < positionArrays[0][0].length; index++) {
  const element = positionArrays[0][0][index];
  debugger

  // height = 100000.0 + 200000.0 * i;

  viewer.entities.add({
    // position: Cesium.Cartesian3.fromDegrees(-100.0, 45.0, height),
    id:index+' x:'+element.x+' y:'+element.y+' z:'+element.z,
    position: element,
    ellipsoid: {
      radii: new Cesium.Cartesian3(1.0,1.0, 1.0),
      material: Cesium.Color.fromHsl(index/positionArrays[0][0].length/2,0.7,0.7,0.7),
    },
  });
}


let changePloygonPrimitive = new ChangePloygonPrimitive()


positionArrays&&changePloygonPrimitive.update(positionArrays)