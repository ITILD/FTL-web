function createModel(url, height) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height);
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
            uri: url,
            minimumPixelSize: 128,
            maximumScale: 20000
        }
    });
    viewer.trackedEntity = entity;
}


function createModel(url, height, heading, pitch, roll) {
    height = Cesium.defaultValue(height, 0.0);
    heading = Cesium.defaultValue(heading, 0.0);
    pitch = Cesium.defaultValue(pitch, 0.0);
    roll = Cesium.defaultValue(roll, 0.0);
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);

    var origin = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height);
    var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(origin, hpr);

    scene.primitives.removeAll(); // Remove previous model
    model = scene.primitives.add(Cesium.Model.fromGltf({
        url: url,
        modelMatrix: modelMatrix,
        minimumPixelSize: 128
    }));

    model.readyPromise.then(function (model) {
        model.color = Cesium.Color.fromAlpha(getColor(viewModel.color), Number(viewModel.alpha));
        model.colorBlendMode = getColorBlendMode(viewModel.colorBlendMode);
        model.colorBlendAmount = viewModel.colorBlendAmount;
        // Play and loop all animations at half-speed
        model.activeAnimations.addAll({
            speedup: 0.5,
            loop: Cesium.ModelAnimationLoop.REPEAT
        });

        var camera = viewer.camera;

        // Zoom to model
        var controller = scene.screenSpaceCameraController;
        var r = 2.0 * Math.max(model.boundingSphere.radius, camera.frustum.near);
        controller.minimumZoomDistance = r * 0.5;

        var center = Cesium.Matrix4.multiplyByPoint(model.modelMatrix, model.boundingSphere.center, new Cesium.Cartesian3());
        var heading = Cesium.Math.toRadians(230.0);
        var pitch = Cesium.Math.toRadians(-20.0);
        camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, r * 2.0));
    }).otherwise(function (error) {
        window.alert(error);
    });
}