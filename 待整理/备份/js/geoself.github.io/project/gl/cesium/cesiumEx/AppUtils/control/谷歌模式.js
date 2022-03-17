/**
 * 调整相机操作方式

osgEarth相机操作方式：

平移：左键拖拽; 缩放：中键滚动; 旋转：右键拖拽;

Cesium相机操作方式：

平移：左键拖拽; 缩放：中键滚动、右键拖拽; 旋转：中键拖拽;

为了将Cesium的相机操作改为osgEarth，则需要用到screenSpaceCameraController类

具体代码如下：
 */

var scene = viewer.scene;
var screenSpaceCameraController = scene.screenSpaceCameraController;

//修改缩放操作
screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH];

//修改旋转操作
screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.RIGHT_DRAG];