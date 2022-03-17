onmessage = function(e) {
  console.log(viewer)
  console.log('Message received from main script');
  var workerResult = 'Result: ' + e.data[0] +" "+ e.data[1];
  console.log('Posting message back to main script');
  postMessage(workerResult);
}


onmessage1 = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + e.data[0] +" "+ e.data[1];
  console.log('Posting message back to main script');
  postMessage(workerResult);
}