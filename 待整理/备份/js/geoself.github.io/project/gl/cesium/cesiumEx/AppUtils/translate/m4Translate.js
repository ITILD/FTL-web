// 尺度变化
// Creates
//   [7.0, 0.0, 0.0, 0.0]
//   [0.0, 8.0, 0.0, 0.0]
//   [0.0, 0.0, 9.0, 0.0]
//   [0.0, 0.0, 0.0, 1.0]
var scaleXYZ = Cesium.Matrix4.fromScale(new Cesium.Cartesian3(1, 2, 3));
Cesium.Matrix4.multiply(modelMatrix, scaleXYZ, modelMatrix);

//坐标位移
//创建平移矩阵方法一
const mat4 = Cesium.Matrix4.fromArray([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  x, y, z, 1.0
]);
//创建平移矩阵方法二
const translation = Cesium.Cartesian3.fromArray([x, y, z]);
const mat4 = Cesium.Matrix4.fromTranslation(translation);
//旋转
const mat3RoateX = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(45))
const mat4 = Cesium.Matrix4.fromRotationTranslation(mat3RoateX)

//一个点正北方向x米的另一个点的坐标
function getNorthPointByDistance(position, distance) {
  //以点为原点建立局部坐标系（东方向为x轴,北方向为y轴,垂直于地面为z轴），得到一个局部坐标到世界坐标转换的变换矩阵
  var localToWorld_Matrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
  return Cesium.Matrix4.multiplyByPoint(localToWorld_Matrix, Cesium.Cartesian3.fromElements(0, distance, 0), new Cesium.Cartesian3())
}