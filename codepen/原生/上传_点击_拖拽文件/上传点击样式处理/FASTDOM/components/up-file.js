
/**
 * 拖动或点击上传
 */
class UpFileElement extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template();

  }
  connectedCallback() {
    console.log('my-app element is connected');
    this.moveLabel = this.shadowRoot.getElementById('moveLabel');
    this.clickInput = this.shadowRoot.getElementById('clickInput');
    this.clickInput.addEventListener('click', function (ev) {
      console.log('单次点击test')
    })
    this.action()
  }


  /**
   * dom字符串
   * @returns 模板dom
   */
  template() {
    return `
    <style>
      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .form-group {
          padding: 1em;
          margin: 1em;
        }

        input[type=file] {
          outline: 0;
          opacity: 0;
          pointer-events: none;
          user-select: none;
        }

        #moveLabel {
          width: 120px;
          border: 2px dashed grey;
          border-radius: 5px;
          display: block;
          padding: 1.2em;
          transition: border 300ms ease;
          cursor: pointer;
          text-align: center;
        }
        #moveLabel i {
          display: block;
          font-size: 42px;
          padding-bottom: 16px;
        }
        #moveLabel i,
        #moveLabel .title {
          color: grey;
          transition: 200ms color;
        }
        #moveLabel:hover {
          border: 2px solid black;
        }
        #moveLabel:hover i,
        #moveLabel:hover .title {
          color: black;
        }
    </style>

    <div class="form-group">
    <label  id="moveLabel" for ='clickInput'>
      <i class="material-icons">icon</i>
      <span class="title">Add File</span>
    </label>
    <input type="file"  id ='clickInput'/>
</div>



    `;
  }


  action() {
   
    function handleEvent(event) {

      event.preventDefault();

      if (event.type == 'drop') {
        let files = event.dataTransfer.files;
        let reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = function () {
          if (reader.result) {

            debugger
            //显示文件内容
            console.log('移动')
            // console.log(reader.result)
            // if('存入window全局||indexdb||sql.js||后端？？传入type 和地址'){

            // }
            window.geojson = reader.result
            // window.geojson = JSON.parse(reader.result)
            // console.log(this.result)
            console.log('传入数据')
          }
        };
      }
    }


    function showPreview(e) {
      let files = e.target.files;
      let reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = function () {
        if (reader.result) {
          //显示文件内容
          console.log('点击')
          console.log(reader.result)
        }
      };
    }
    this.moveLabel.addEventListener('dragenter', handleEvent);//非drop用来阻止默认行为跳转
    this.moveLabel.addEventListener('dragover', handleEvent);
    this.moveLabel.addEventListener('drop', handleEvent);
    this.clickInput.addEventListener('change', showPreview);//文件


  }
}

/**
 * 注册
 */
if(!customElements.get('up-file')){
  customElements.define('up-file', UpFileElement);
  console.log('注册')
}


// export {UpFileElement}