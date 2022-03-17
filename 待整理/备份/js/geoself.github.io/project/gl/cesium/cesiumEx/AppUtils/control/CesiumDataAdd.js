/**
 * map3dDataAdd
 *
 * @author wangxu
 * @date 2020/11/13
 */


/**
 * 相机视角 scene.camera.cancelFlight();
 * @param {Object} params {"y":39.092423,"x":121.990975,"z":87.84,"heading":23.4,"pitch":-51.9,"roll":0}
 */

function cameraFlyTo(params) {
    viewer.camera.flyTo({
        // duration:10,
        // cancel:()=>{console.log("中断")},
        destination: Cesium.Cartesian3.fromDegrees(params.x, params.y, params.z),
        orientation: {
            heading: Cesium.Math.toRadians(params.heading),
            pitch: Cesium.Math.toRadians(params.pitch),
            roll: Cesium.Math.toRadians(params.roll),
        },
    });
}

/**
 * 相机视角
 * @param {Object} params {"y":39.092423,"x":121.990975,"z":87.84,"heading":23.4,"pitch":-51.9,"roll":0}
 */
function cameraSetView(params) {
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(params.x, params.y, params.z),
        orientation: {
            heading: Cesium.Math.toRadians(params.heading),
            pitch: Cesium.Math.toRadians(params.pitch),
            roll: Cesium.Math.toRadians(params.roll),
        },
    });
}

function pointByPrimitive() {

}

//
function lineByPrimitive(geoJsonLine,width,color,alpha) {
    let boolAlpha = (alpha!=null)
    let linePrimitive = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.PolylineGeometry({
                positions: Cesium.Cartesian3.fromDegreesArray(geoJsonLine),
                width: 1,//线宽
                vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT
            }),
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString(color).withAlpha(alpha)),//color  必须设置 不然没有效果
            }
        }),
        appearance: new Cesium.PolylineColorAppearance({
            translucent: boolAlpha
        })
    });
    return linePrimitive
}

function polygonByPrimitive() {

}

function labelByPrimitive(featuresCenter,text,fontSize,outlineWidth) {
    let primitiveName = {
        position:  Cesium.Cartesian3.fromDegrees(...featuresCenter),
        text: text,
        font: fontSize+"px Helvetica",
        fillColor: Cesium.Color.RED,
        // outlineColor: Cesium.Color.BLACK,
        outlineWidth: outlineWidth,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        horizontalOrigin:Cesium.HorizontalOrigin.CENTER
    }
    return primitiveName
}

// function lineByEntity(url) {
//     jsonByFile(url).then(function (dataSource) {
//         viewer.dataSources.add(dataSource);
//         for (var i = 0; i < dataSource.entities.values.length; i++) {
//             var entity = dataSource.entities.values[i];
//             entity.polyline.material = new mars3d.LineFlowMaterial({//动画线材质
//                 color: new Cesium.Color.fromCssColorString("#00FFFF"),
//                 // duration: 20000, //时长，控制速度
//                 // url: 'webjars/marsgis/img/textures/LinkPulse.png'
//             });
//             entity.polyline.width = 10;
//             // entity.click = function () {
//             //             //     lineClickEvent(this);
//             //             // };
//         }
//     }).otherwise(function (error) {
//         alert(url + "加载错误");
//     });
// }


function jsonByFile(url, geojsonOptions) {
    if (!geojsonOptions) {
        geojsonOptions = {
            clampToGround: true //使数据贴地
        };
    }
    return Cesium.GeoJsonDataSource.load(url, geojsonOptions);

}


// export {start}