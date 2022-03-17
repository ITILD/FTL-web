var lng = 121.9;
var lat = 39.4;
var bounds = [ 120.97129800100004,38.67281923300004,123.51617636000003,40.202889423000045];
//地图坐标系
var projection = new ol.proj.Projection({
    code: 'EPSG:4326',
    units: 'degrees',
    axisOrientation: 'neu',
    global: false
});
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
//初始化影像及其他图层.
var layerParams = [
    {
        title: '大连地图',
        layer:'Map:Map-Temp-dalian',
        visible: true,
        tiled: true,
        name: 'Map-Temp-dalian',
        isGwc: true,
        group: "底图"
    }
];

//图层数组
var layers = [];

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

for (var i = 0; i < layerParams.length; i++) {
    if (layerParams[i].isGwc == true) {
        layers.push(getGwcLayer(layerParams[i].layer, layerParams[i].title, layerParams[i].visible));
    } else if (layerParams[i].isGwc == false) {
        layers.push(getPointLayer(layerParams[i].lng, layerParams[i].lat))
    }
}
var defulatControl=ol.control.defaults({
    zoom: false,
    rotate: false,
    attribution: false,
    doubleClickZoom: false,// 取消双击放大功能交互
    shiftDragZoom: false, // 取消shift+wheel左键拖动交互
});
var map = new ol.Map({
    controls: defulatControl,
    target: 'map',
    layers: layers,
    view: new ol.View({
        center: [122.212790738599,39.5094592242078], // 中心点坐标
        zoom: 8.5, // 缩放等级，对应切片名数组的第11个
        maxZoom:20,
        minZoom:8,
        projection: projection
    }),
    overlays: [overlay],
});
map.getView().on('change:resolution',checkZoom);//zoom监听事件checkZoom为调用的函数
var pointAnimationLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
})
 map.addLayer(pointAnimationLayer);

var waringLayer=new ol.layer.Vector({
    source: new ol.source.Vector()
})
map.addLayer(waringLayer);

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
});
 map.addLayer(vectorLayer);

var cameralayer = new ol.layer.Vector({
    source: new ol.source.Vector()
})
map.addLayer(cameralayer);

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};
map.on('singleclick', function (evt) {
    debugger
    const coordinate = evt.coordinate;
    var pixel = map.getEventPixel(evt.originalEvent);
    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
    });
    if(feature){
      if(mapnum==1||mapnum == ""){
          if(feature.getProperties().id==""||feature.getProperties().id==null||feature.getProperties().id=="undefined"){
              container.style.display = 'block';
              content.innerHTML = '<p>'+feature.getProperties().name+'</p>';
              overlay.setPosition(coordinate);
          }else{
              layer.open({
                  type: 2,
                  title: '详情信息',
                  maxmin: true,
                  shadeClose: false, // 点击遮罩关闭层
                  area: ['860px', '560px'],
                  skin: "layer-mars-dialog",
                  content: '/basedata/detail/index?id=' + feature.getProperties().id
              });
          }
      }else if(mapnum==2||mapnum==3){
          if(feature.getProperties().status=="1"){
              /* container.style.display = 'block';
               content.innerHTML = '<p>'+feature.getProperties().cameraid+'</p>';
               overlay.setPosition(coordinate);*/
              play_1(feature.getProperties().cameraid);//调用首页第一个视频窗口
          }else if(feature.getProperties().status=="0"||feature.getProperties().status=="2"){
              container.style.display = 'block';
              content.innerHTML = '<p>'+feature.getProperties().cameraname+"摄像头已离线！"+'</p>';
              overlay.setPosition(coordinate);
          }
      }

    }else{
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    }


});
$(function(){
    $(window).resize(function () {
        if (map) {
            map.updateSize();

        }
    });

    pointAnimationLayer.on('postrender',animation);
    convertData();
    getWaring();
    getFactoryGeom();


});

function getGwcLayer(layerName, title, visible) {
    var gridsetName = 'EPSG:4326';
    var gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];

    var style = [];
    var layerName = layerName;
    baseParams = ['VERSION', 'LAYER', 'STYLE', 'TILEMATRIX', 'TILEMATRIXSET', 'SERVICE', 'FORMAT'];
    params = {
        'VERSION': '1.0.0',
        'LAYER': layerName,
        'STYLE': style,
        'TILEMATRIX': gridNames,
        'TILEMATRIXSET': gridsetName,
        'SERVICE': 'WMTS',
        'FORMAT': 'image/png'
    };
    var layer = new ol.layer.Tile({
        title: title,
        visible: visible,
        name: layerName,
        source: constructSource()
    });
    return layer;
}

function constructSource() {
    var baseUrl = gwcUrl;
    var resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
    var url = baseUrl + '?'
    for (var param in params) {
        if (baseParams.indexOf(param.toUpperCase()) < 0) {
            url = url + param + '=' + params[param] + '&';
        }
    }
    url = url.slice(0, -1);
    var source = new ol.source.WMTS({
        url: url,
        layer: params['LAYER'],
        matrixSet: params['TILEMATRIXSET'],
        format: params['FORMAT'],
        projection: projection,
        tileGrid: new ol.tilegrid.WMTS({
            tileSize: [256, 256],
            extent: [-180.0, -90.0, 180.0, 90.0],
            origin: [-180.0, 90.0],
            resolutions: resolutions,
            matrixIds: params['TILEMATRIX']
        }),
        style: params['STYLE'],
        wrapX: true
    });
    return source;
}
var radius = 1;
//动画

function animation(event){
    if(companyids=="") {
        return;
    }

    if(radius >= 20){
        radius = 0
    }
    var opacity =  (20 - radius) * (1 / 20) ;//不透明度
    var pointStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius:radius,
            stroke: new ol.style.Stroke({
                color: 'rgba(255,0,0' + opacity + ')',
                width: 2 - radius / 10
            })
        })
    })
    var companys=companyids.split(',');
    var features = pointAnimationLayer.getSource().getFeatures();
    var vectorContext = ol.render.getVectorContext(event);
    vectorContext.setStyle(pointStyle);
    features.forEach(element => {
        if(companys.indexOf(element.getProperties().companyid) > -1){
            var geom = element.getGeometry();
            vectorContext.drawGeometry(geom);
        }
    });
    radius = radius + 0.3;
    //触发map的postcompose事件
    map.render();
}

// 点坐标数据
function convertData() {
    pointAnimationLayer.getSource().clear();
    overlay.setPosition(undefined);
    closer.blur();
    $.ajax({
        url: "/basedata/screen/pointForMap",
        data:{
            "districtId": $("#district").val(),
            "factoryType":''
        },
        type: "get",
        async:false,
        success: function (data) {
            if(data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var geoCoordPoint =[];
                    geoCoordPoint[0] = data[i].lon;
                    geoCoordPoint[1] = data[i].lat;
                    var color="";
                    //将点添加到图层
                    switch (data[i].factory_type){
                        case "JY_CZ":
                            color= '#FFFF00'
                            break;
                        case "JY_SJ":
                            color= '#90EE90'
                                break;
                        case "JY_GF":
                            color= '#FF00FF'
                            break;
                    }
                    if (color=="")continue;
                    var ft = new ol.Feature({
                        name:data[i].company_name
                        ,companyid:data[i].id,
                        color:color
                        ,geometry: new ol.geom.Point(geoCoordPoint)
                    });
                    ft.setStyle(new ol.style.Style({
                       //在地图点后加企业名称

                        /*text: new ol.style.Text({
                            font: '15px Microsoft YaHei',
                            text: data[i].company_name,
                            offsetX:10,
                            textAlign:'left',
                            fill: new ol.style.Fill({
                                color: '#ffffff'
                            })
                        }),*/
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: color
                            }),
                            radius: 4
                        })
                        ,zIndex:9
                    }));
                    pointAnimationLayer.getSource().addFeature(ft);
                }
            }
            if(pointAnimationLayer.getSource().getFeatures().length==0)return;
            // map.getView().fit(pointAnimationLayer.getSource().getExtent(),{
            //     constrainResolution: false,
            //     earest:true,
            //     padding: [50, 50,50, 50],
            //     maxZoom:15
            // });
        }
    })
}

function getWaring(){
    waringLayer.getSource().clear();
    $.ajax({
        url: "/basedata/screen/getWaringList",
        data: {
            "districtId": $("#district").val()
        },
        type: "get",
        async: false,
        success: function (data) {
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if(data[i].waringJd==null || data[i].waringJd=="")continue;
                    var geoCoordPoint = [];
                    geoCoordPoint[0] = data[i].waringJd;
                    geoCoordPoint[1] = data[i].waringWd;
                    var imgUrl="";
                    switch (data[i].waringLevel){
                        case "1":
                            imgUrl="/img/screen/oneLevel.png";
                            break;
                        case '2':
                            imgUrl="/img/screen/twoLevel.png";
                            break;
                        case '3':
                            imgUrl="/img/screen/threeLevel.png";
                            break;
                        case '4':
                            imgUrl="/img/screen/fourLevel.png";
                            break;
                    }
                    if(imgUrl=="")continue;
                    var ft = new ol.Feature({
                        geometry: new ol.geom.Point(geoCoordPoint)
                    });
                    ft.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            src: imgUrl,
                            anchor: [0.5, 0.5], // 设置图标位置
                            scale: 0.3
                        })
                        ,zIndex:10
                    }));
                    waringLayer.getSource().addFeature(ft);
                }
            }
            var flag=true;
            var times=1;
            var animation=setInterval(() => {
                flag=!flag
                if(times>11){
                    waringLayer.setVisible(false);
                    clearInterval(animation)
                    return;
                }
                waringLayer.setVisible(flag)
                times++;
            }, 500);
        }
    });
}

var styleFunction = function (feature) {//feature.getProperties().name
    var color="";
    //将点添加到图层
    switch (feature.getProperties().factory_type){
        case "JY_CZ":
            // imgUrl="/img/screen/czdw.png" ;
            color= 'rgba(255,255,0,0.8)'
            break;
        case "JY_SJ":
            //   imgUrl="/img/screen/czdw2.png" ;
            color= 'rgba(144,238,144,0.8)'
            break;
        case "JY_GF":
            //   imgUrl="/img/screen/sjdw.png" ;
            color= 'rgba(255,0,255,0.8)'
            break;
    }
    if(color=="")return
    if(feature.getGeometry().getType()=="Point"||feature.getGeometry().getType()=="MultiPoint"){
        return  new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: color
                }),
                radius: 4
            })
            ,zIndex:0
        });
    }
    else if(feature.getGeometry().getType()=="MultiPolygon"){
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: 1,
            }),
            fill: new ol.style.Fill({
                color:'rgba(170,170,170,0.1)',//RGB(170,170,170)
            })
            ,zIndex:1
        });
    }
}
function getFactoryGeom(){
    $.ajax({
        url:"/basedata/screen/getFactoryGeom"
        ,data: {
                "districtId": $("#district").val()
            }
        ,type: "get"
        ,async: false
        ,success: function(data){
            if(vectorLayer.getSource().getFeatures().length>0){
                vectorLayer.getSource().clear();
            }
            var layerSource=JSON.parse(data);
            if(layerSource.features==null)return;
            const vectorSource =new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(JSON.parse(data)),
            });
            vectorLayer.setSource(vectorSource);
            vectorLayer.setStyle(styleFunction);
        }
    })
}

function setCenter(){
 /*   var zoomLevel="13";
    if($('#district').val()==1){
        zoomLevel=8;
    }
   var lon=parseFloat($('#district').find("option:selected").attr("lon")) ;
   var lat=parseFloat($('#district').find("option:selected").attr("lat")) ;
   //var centerPoint=new ol.proj.fromLonLat([lon,lat]);
    map.getView().animate({
        center: [lon, lat],
        zoom:zoomLevel,
        duration: 2000,
    });*/

    $.ajax({
        url:"/basedata/screen/getDistrictJson"
        ,data: {
            "districtId": $("#district").val()
        }
        ,type: "get"
        ,async: false
        ,success: function(data){
            var districtJson=JSON.parse(data);
            if(districtJson.features==null)return;
            const vectorSource =new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(districtJson),
            });
            map.getView().fit(vectorSource.getExtent(),{
                constrainResolution: false,
                earest:true,
                padding: [50, 50,50, 50],
                maxZoom:13
            });
        }
    })
}

function cameraDate(factorytoId) {
    pointAnimationLayer.getSource().clear();
    //vectorLayer.getSource().clear();
    cameralayer.getSource().clear();
    $.ajax({
        url: "/basedata/screen/factorytoId"
        , data: {
            "factoryId": factorytoId
        }
        , type: "get"
        , async: false
        , success: function (data) {
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].cameraJd == null || data[i].cameraJd == "") continue;
                    var geoCoordPoint = [];
                    geoCoordPoint[0] = data[i].cameraJd;
                    geoCoordPoint[1] = data[i].cameraWd;
                    var imgUrl = "";
                    switch (data[i].status) {
                        case "0":
                            imgUrl = "/img/tree_icon/sp1.png";
                            break;
                        case '1':
                            imgUrl = "/img/tree_icon/sp2.png";
                            break;
                        case '2':
                            imgUrl = "/img/tree_icon/sp1.png";
                            break;

                    }
                    if (imgUrl == "") continue;
                    var ft = new ol.Feature({
                        status:data[i].status
                        ,cameraid:data[i].cameraindexcode,
                        cameraname:data[i].cameraname,
                        geometry: new ol.geom.Point(geoCoordPoint)
                    });

                    ft.setStyle(new ol.style.Style({
                        text: new ol.style.Text({
                            font: '15px Microsoft YaHei',
                            offsetX:15,
                            text: data[i].cameraname,
                            textAlign:'left',
                            fill: new ol.style.Fill({
                                color: '#ffffff'
                            })
                        }),
                        image: new ol.style.Icon({
                            src: imgUrl,
                            anchor: [0.5, 0.5], // 设置图标位置
                            scale: 0.2
                        })
                        , zIndex: 10
                    }));
                    cameralayer.getSource().addFeature(ft);
                }
            }
        }
    });
}

function reloadmap(){
    $(window).resize(function () {
        if (map) {
            map.updateSize();

        }
    });

    pointAnimationLayer.on('postrender',animation);
    convertData();
    getWaring();
    getFactoryGeom();
    cameralayer.getSource().clear();
}
var zoomflag=false;

function checkZoom() {//根据地图zoom等级进行添加样式
debugger
    var feature = pointAnimationLayer.getSource().getFeatures();
    var zoom = map.getView().getZoom();
    if (mapnum == 1||mapnum == "") {
        if (zoom > 15 && !zoomflag) {
            if (feature) {
                for (var i = 0; i < feature.length; i++) {
                    var ft = new ol.Feature({});
                    feature[i].setStyle(new ol.style.Style({
                        //在地图点后加企业名称
                        text: new ol.style.Text({
                            font: '15px Microsoft YaHei',
                            text: feature[i].getProperties().name,
                            offsetX: 10,
                            textAlign: 'left',
                            fill: new ol.style.Fill({
                                color: '#ffffff'
                            })
                        }),
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: feature[i].getProperties().color
                            }),
                            radius: 4
                        })
                        , zIndex: 9
                    }));
                    pointAnimationLayer.getSource().addFeature(ft);
                    zoomflag = true;
                }

            }
            if (pointAnimationLayer.getSource().getFeatures().length == 0) return;


        } else if (zoom <= 15 && zoomflag) {
            if (feature) {
                for (var i = 0; i < feature.length; i++) {


                    var ft = new ol.Feature({});
                    feature[i].setStyle(new ol.style.Style({

                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: feature[i].getProperties().color
                            }),
                            radius: 4
                        })
                        , zIndex: 9
                    }));
                    pointAnimationLayer.getSource().addFeature(ft);
                    zoomflag = false;
                }

            }
            if (pointAnimationLayer.getSource().getFeatures().length == 0) return;
        }
    }
}
