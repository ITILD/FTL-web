//POINT-> TRIANGLES
/**
 * _ 私有属性和方法
 *
 * 无状态或纯pipe式处理 静态工具类
 */
class GLStart {
  constructor() {}

  /**
   * 编译shader代码
   * @param {*} gl
   * @param {*} type
   * @param {*} source
   *  const vertexShader = _loadShader(gl, gl.VERTEX_SHADER, vsSource);
   * @returns
   */
  static _loadShader(gl, type, source) {
    const shader = gl.createShader(type); // 创建着色器对象
    gl.shaderSource(shader, source); // 提供shader代码  绑定资源
    gl.compileShader(shader); // 编译 -> 生成着色器
    return shader;
  }

  /**
   * 初始化一个着色程序
   * @param {*} gl
   * @param {*} vsSource
   * @param {*} fsSource
   * @returns
   */
  static initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = this._loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this._loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    return shaderProgram;
  }
}

// 顶点着色器代码(决定顶在哪里，大小)
let VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "uniform vec4 v_move;\n" +
  "varying vec4 v_color;\n" +
  "void main() {\n" +
  // "gl_Position = a_Position+v_move;\n" + // 设置顶点的位置
  "gl_Position = a_Position;\n" + // 设置顶点的位置
   "v_color = gl_Position  + 0.5;\n" + // 设置color
  //  "v_color = gl_Position;\n" + // 设置color
  "}\n";

// 片元着色器代码（给像素上色）let FSHADER_SOURCE 

let FSHADER_SOURCE =
 "precision mediump float;\n" +
  "varying vec4 v_color;\n" +
  "void main() {\n" +
 "gl_FragColor = v_color;\n" + // 设置顶点的颜色
  "}\n";
// 1.获取webgl
let canvas = document.getElementById("webgldom");
let gl = canvas.getContext("webgl"); //WebGLRenderingContext对象 绘图上下文
// 2.清空屏幕
gl.clearColor(0.5, 0.5, 0.5, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 3.初始化着色器程序
let program = GLStart.initShaderProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
gl.program = program;
gl.useProgram(program);
let n = initVertexBuffers(gl, [-1.0, 1.0,1.0, 1.0, -1.0, -1.0, 1.0, -1.0]);//Z

// 画n个点
gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

function initVertexBuffers(gl, jsArray) {
  let vertices = new Float32Array(jsArray);

  let vertexBuffer = gl.createBuffer(); // 创建一个缓存对象，用于存放顶点数据
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // 绑定缓存对象
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // 把数据写到缓冲对象中
  let a_Position = gl.getAttribLocation(gl.program, "a_Position"); // 获取顶点着色器代码中的顶点变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0); // 设置变量获取数据规则
  gl.enableVertexAttribArray(a_Position); // 允许变量从 ARRAY_BUFFER目标上绑定的缓冲区对象获取数据
  // 设置全局变量v_move
  let v_move = gl.getUniformLocation(gl.program, 'v_move');
  // gl.uniform4f(v_move, 0.1, 0.0, 0.0, 0.0);     // r g b a
  gl.uniform4f(v_move, 0.0, 0.0, 0.0, 0.0);     // r g b a
  
  return vertices.length / 2; //返回顶点数量
}



