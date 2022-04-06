self.onmessage =function(event) { //接收主线程消息
  let uint8Array = event.data;
  for (let index = 0; index < uint8Array.length; index++) {
    uint8Array[index]= 1
    
  }

  postMessage(uint8Array); //发送子线程消息
};