let testFunc = (data) =>{
  console.log('test:',data)
  // var openRequest = indexedDB.open('person', 1);
  // var db;

  // openRequest.onsuccess = function (e) {
  //   console.log('Success!');
   
  //   add();
  // }


  // function add() {
  //   db = openRequest.result;
  //   var request = db.transaction(['person'], 'readwrite')
  //     .objectStore('person')
  //     .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });
  
  //   request.onsuccess = function (event) {
  //     console.log('数据写入成功');
  //   };
  
  //   request.onerror = function (event) {
  //     console.log('数据写入失败');
  //   }
  // }
  const dbName = "the_name";

  var request = indexedDB.open(dbName, 2);
  
  request.onerror = function(event) {
    // 错误处理
  };
  request.onupgradeneeded = function(event) {
    var db = event.target.result;
  
    // 建立一个对象仓库来存储我们客户的相关信息，我们选择 ssn 作为键路径（key path）
    // 因为 ssn 可以保证是不重复的
    var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
  
    // 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引
    objectStore.createIndex("name", "name", { unique: false });
  
    // 使用邮箱建立索引，我们向确保客户的邮箱不会重复，所以我们使用 unique 索引
    objectStore.createIndex("email", "email", { unique: true });
  
    // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
    objectStore.transaction.oncomplete = function(event) {
      // 将数据保存到新创建的对象仓库
      var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
      const customerData = [
        { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
        { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
      ];
      customerData.forEach(function(customer) {
        customerObjectStore.add(customer);
      });

    };
  };


}
