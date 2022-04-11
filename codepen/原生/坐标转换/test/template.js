let testFunc = () => {
  // let jsonStr = dataMock()
  // data = JSON.stringify(jsonStr)
  // let time = new Date().Format('hh时mm分ss秒')
  // let name = 'mockdata' + time + '.json'
  // exportRaw(data, name)
  
  var polygonPoints =
  [
  [118.22166324000011,33.94018013200008],
  [118.22166694800001,33.940138392000051],
  [118.22167282000009,33.940096924000045],
  [118.22168107000005,33.940055637000057],
  [118.22170407500005,33.939955487000077],
  [118.2217123260001,33.939914291000036],
  [118.22171830600007,33.93987282300003],
  [118.22172190500009,33.939831083000058],
  [118.22175552400006,33.939267271000062],
  [118.22175661300003,33.939258077000034],
  [118.22544694300007,33.939262686000063],
  [118.22536301900004,33.940659324000023],
  [118.2216439660001,33.940503869000054],
  [118.22166324000011,33.94018013200008]
  ];
  var newPolygonsArray = [];
  var arrlen = polygonPoints.length;
  console.log(111,arrlen)
  for(var i = 0;i<arrlen;i++){
      // console.log(polygonPoints[i])
      var temp = polygonPoints[i].push(0);
      var blhobj = {b:polygonPoints[i][0],l:polygonPoints[i][1],h:polygonPoints[i][2]};
      var xyz = _BLH2XYZ('wgs84',blhobj);
      var litarr = [xyz.X,xyz.Y];
      
      newPolygonsArray.push(litarr);
  }
  console.log("WWWWWWWWW",newPolygonsArray)
  for(let i=0;i<newPolygonsArray.length;i++){
      console.log(newPolygonsArray[i])
  }
}

let dataMock = () => {
  /**
   * 全球瓦块geojson数组
   */
  let polygon = {
    "type": "FeatureCollection",
    "name": "polygonMockByJs",
    "crs": {
      "type": "name",
      "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" }
    },
    "features": [
      // {
      //   "type": "Feature",
      //   "properties": { "fid": 1, "name": null },
      //   "geometry": {
      //     "type": "Polygon",
      //     "coordinates": [
      //       [
      //         [-180.0, 90.0, 0.0],
      //         [-160.0, 90.0, 0.0],
      //         [-160.0, 80.0, 0.0],
      //         [-180.0, 80.0, 0.0],
      //         [-180.0, 90.0, 0.0]
      //       ]
      //     ]
      //   }
      // },
      // {
      //   "type": "Feature",
      //   ...
      // }
    ]
  }
  let fid = 0
  lonAdd = 10.0
  latAdd = 10.0
  for (let lon = -180; - 180.0 <= lon && lon < 180.0; lon += lonAdd) {
    for (let lat = -90.0; - 90.0 <= lat && lat < 90.0; lat += latAdd) {
      fid++
      console.log(fid,' ',lon,' ',lat)
      let featurePolygon = {
        "type": "Feature",
        "properties": { "fid": fid, "name": lon+','+lat },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [lon, lat, 0.0],
              [lon + lonAdd, lat, 0.0],
              [lon + lonAdd, lat + latAdd, 0.0],
              [lon, lat + latAdd, 0.0],
              [lon, lat, 0.0]
            ]
          ]
        }
      }
      polygon.features.push(featurePolygon)

    }
  }
  return polygon
}




/**
 * Created by xsg on 2014/6/23.
 */
var pi_180 = Math.PI / 180;
var _180_pi = 180 / Math.PI;
var projectionTypes = {};
projectionTypes.bj54 = {
    a:6378245,//长半轴
    e2:0.006693421622966//第一偏心率平方
};
projectionTypes.wgs84 = {
    a:6378135,//长半轴
    e2:0.00669437999013//第一偏心率平方
};

var myparams = {
    dx : 31.4,
    dy : -144.3,
    dz : -74.8,
    rx : 0,
    ry : 0,
    rz : 0.814,
    m : -0.38
};
//7坐标系统转换方法
//sourceType:源投影类型 targetType：目标投影类型 params： 7参数 blh：源大地坐标
function coordinateTransfUse7params(sourceType,targetType,params,blh){
    sourceType = sourceType.toLowerCase();
    targetType = targetType.toLowerCase();
    var XYZ1 = _BLH2XYZ(sourceType,blh);
    var XYZ2 = _transXYZBy7params(XYZ1,params);
    var blh2 = _XYZ2BLH(targetType,XYZ2);
    console.log(blh2);
}

function _BLH2XYZ(projectionType,blhObj){//将大地坐标喜欢换为空间直角坐标系
    var e2 = projectionTypes[projectionType].e2;//第一偏心率平方值
    var a = projectionTypes[projectionType].a;//长半轴
    var N = a / Math.sqrt(1 - e2 * Math.sin(blhObj.b * pi_180) * Math.sin(blhObj.b * pi_180));
    var X = (N + blhObj.h) * Math.cos(blhObj.b * pi_180) * Math.cos(blhObj.l * pi_180);
    var Y = (N + blhObj.h) * Math.cos(blhObj.b * pi_180) * Math.sin(blhObj.l * pi_180);
    var Z = [N * (1 - e2 ) + blhObj.h] * Math.sin(blhObj.b * pi_180);
    var resultObj = {};
    resultObj.X = X;
    resultObj.Y = Y;
    resultObj.Z = Z;
    return resultObj;
}

function _transXYZBy7params(xyz0,params){//根据7参数对空间直角坐标系进行运算
    var x0 = xyz0.X;
    var y0 = xyz0.Y;
    var z0 = xyz0.Z;
    var dx = params.dx;
    var dy = params.dy;
    var dz = params.dz;
    var rx = params.rx;
    var ry = params.ry;
    var rz = params.rz;
    var m = params.m;
    var x1 = dx + (1 + m) * x0 + Math.sin(rz / 60 / 60 * pi_180) * y0 - Math.sin(ry / 60 / 60 * pi_180) * z0;
    var y1 = dy + (1 + m) * y0 - Math.sin(rz / 60 / 60 * pi_180) * x0 + Math.sin(rx / 60 / 60 * pi_180) * z0;
    var z1 = dz + (1 + m) * z0 + Math.sin(ry / 60 / 60 * pi_180) * x0 - Math.sin(rx / 60 / 60 * pi_180) * y0;
    var resultObj = {};
    resultObj.X = x1;
    resultObj.Y = y1;
    resultObj.Z = z1;
    return resultObj;
}

function _XYZ2BLH(projectionType,xyz1){
    var a = projectionTypes[projectionType].a;
    var e2 = projectionTypes[projectionType].e2;//第一偏心率平方值
    var X = xyz1.X;
    var Y = xyz1.Y;
    var Z = xyz1.Z;
    var L = Math.atan(Y / X) * _180_pi;
    var B = Math.atan(Z / Math.sqrt(X * X + Y * Y));
    while(true){//迭代计算
        var N = a / Math.sqrt(1 - e2 * Math.sin(B) * Math.sin(B));
        var tempB = Math.atan((N  * e2 * Math.sin(B) + Z ) / Math.sqrt(X * X + Y * Y ));
        B = Math.atan((Z + N * e2 * Math.sin(tempB)) / Math.sqrt(X * X + Y * Y ));
        if(tempB == B){
            break;
        }
    }
    var H = Z / Math.sin(B) - N * (1 - e2);
    B = B * _180_pi;
    var resultObj = {};
    resultObj.L = L;
    resultObj.B = B;
    resultObj.H = H;
    if( resultObj.B < 0 ){
        resultObj.B = resultObj.B + 180;
    }
    if(resultObj.L < 0 ){
        resultObj.L = resultObj.L + 180;
    }
    return resultObj;
}

