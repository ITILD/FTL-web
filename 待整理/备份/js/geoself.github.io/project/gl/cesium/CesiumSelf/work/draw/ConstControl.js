// import { HoleDraw } from "../../../cesiumEx/AppUtils/draw/mouse/HoleDraw.js";
import { ClippingPlanesByGeom } from "../../../cesiumEx/AppUtils/primitives/clipPlanes/ClippingPlanesByGeom.js";


class ConstControl {
  constructor() {}

  static drawHole(viewer) {
    // let holeDraw = new HoleDraw(viewer)

    ClippingPlanesByGeom.setClippingPlanesSimple([viewer.scene.globe],
      [
        { x: -2452736.7548017967, y: 4197260.19592993, z: 4115045.1915792297 },
        { x: -2499148.1215788424, y: 4384693.149035873, z: 3886841.7816859786 },
        { x: -2829675.04101285, y: 4205662.754088855, z: 3858192.5514180525 }
      ], -1)
  };


  static webwork(viewer) {
    //     var myTask = `
    //     onmessage = function (e) {
    //         var data = e.data;
    //         data.push('hello');
    //         console.log('worker:', data); // worker: [1, 2, 3, "hello"]
    //         postMessage(data);
    //     };
    // `;

    //     var blob = new Blob([myTask]);
    //     var myWorker = new Worker(window.URL.createObjectURL(blob));
    var myWorker = new Worker('work/draw/work.js')
    myWorker.onmessage = function (e) {
      var data = e.data;
      console.log('page:', data); // page: [1, 2, 3, "hello"]
      console.log('arr:', arr); // arr: [1, 2, 3]
    };

    var arr = [1, 2, 3];
    myWorker.postMessage(arr);
  }
}

export { ConstControl }

// [{x:-2452736.7548017967,y: 4197260.19592993, z: 4115045.1915792297 }​, { x: -2499148.1215788424, y: 4384693.149035873, z: 3886841.7816859786 }, { x: -2829675.04101285, y: 4205662.754088855, z: 3858192.5514180525 }​, { x: -2745948.689792442, y: 4023627.9018627447, z: 4103332.875654802 }],