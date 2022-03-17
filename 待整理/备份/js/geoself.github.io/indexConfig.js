// 加判断  静态依赖url路径代理   默认为空
let serverLibsource = ""

let projectGroupList = [
  // // 模板
  // {
  //   id: 0,
  //   title: "title",
  //   children: [{
  //     icon: "/source/icon/cesium/cesium-logomark.svg",
  //     title: "3S融合概念及软件架构综述",
  //     abstractEn: "3D geospatial visualization for the web", //摘要简介
  //     abstractZh: "浏览器端地理空间三维可视化引擎", //摘要简介
  //     url: "/source/icon/cesium/cesium-logomark.svg",
  //     other: {
  //       doc: "/自己的翻译路径",
  //       github: "https://github.com/CesiumGS/cesium",
  //     }
  //   }, {
  //     title: "childrenTitle",
  //   }]
  // },

  {
    title: "3S快速开发",
    children: [
      // 从基础 ide使用 
      {
        level: 1,
        icon: "/source/icon/cesium/cesium-logomark.svg",
        title: "3S软件架构综述及快速开始",
        abstractEn: "3D geospatial visualization for the web", //摘要简介
        abstractZh: "浏览器端地理空间三维可视化引擎", //摘要简介
        url: "/source/icon/cesium/cesium-logomark.svg",
        other: {
          doc: "/自己的翻译路径",
          github: "https://github.com/CesiumGS/cesium",
        }
      }, {
        icon: "/source/icon/cesium/cesium-logomark.svg",
        level: 3,
        title: "Cesium/Openlayers",
        abstractEn: "3D/2D geospatial visualization for the web", //摘要简介
        abstractZh: "浏览器端地理空间二三维可视化引擎", //摘要简介
        url: "/source/icon/cesium/cesium-logomark.svg",
      }, {
        title: "Postgresql/Postgis"
      }, {
        title: "Geoserver"
      }, {
        title: "Springboot+Geo库集成"
      }, {
        title: "3S计算工具"
      }
    ]
  },
  // 3S概念与数理基础
  {
    title: "3S概念与数理基础",

    children: [
    {
      //  提供基础包
      level: 0,
      title: "3S基础知识图谱/路线图",
      abstractZh: "3S各自和融合路线图"
    }, {
      // 计算机图形学 GNSS坐标系  大地测量学  控制测量 矿山地下坐标系
      title: "3S数据获取与坐标系综述",
    }, {
      title: "线性代数/eigen3/ND4J/nmpy",
    }, {
      title: "数理统计基础及3s交叉",
      abstractEn: "", //摘要简介
      abstractZh: "矢量误差处理，栅格", //摘要简介
    }, {
      title: "3S算法原理与实现",
      abstractZh: "3S各类算法与来源，数据运算，数据可视化echart和matlab", //摘要简介
    }, {
      title: "几何",
      abstractZh: "黎曼 分形 解析", //摘要简介
    }, {
      title: "CV/GL与3S数据可视化",
      abstractZh: "数字图像处理  数据快速可视化echart和matlab", //摘要简介
    }]
  },
  // 基础语言快速使用  面向工程但结合原理 不脱离
  {
    title: "基础语言",
    children: [{

      title: "JAVA",
    }, {

      title: "JS/HTML/CSS/VUE",
    }, {
      title: "nodejs/electron",
    }, {
      title: "WebGL-WebGPU",
      abstractEn: "Cross-platform Computer Graphics",
      abstractZh: "跨平台计算机图形学"
    }, {
      title: "C++/QT/osg",
    }]
  },
  // 怪异数据
  {
    title: "仿真数据",
    children: [{
      level: 2,
      title: "开源数据与账户",
    }, {
      title: "M78星云",
    }, {

      title: "鸟不拉屎星",
    }, {
      title: "蓬莱岛",
    }, {
      title: "大模型",
    }, {
      title: "小模型",
    }, ]
  }, {
    title: "万能链接",
    children: [{
      level: 4,
      title: "网址大全",
    }, {
      title: "工具大全",
    }]
  }, // 怪异实验室 自己工程
  {
    title: "自娱自乐",
    children: [{
      // 原生和cesium球   局部坐标系假三维
      title: "渲染规则",
    }, {

      title: "物理规则",
    }, {
      // 曲谱转化
      title: "声音规则",
    }, {

      title: "Spore（综合单体）",
    }, {
      title: "小王子（综合单体）",
    }, {
      title: "虚拟3D/3D打印/vr...",
    }, {
      title: "2D/3D像素化真实乐高",
      abstractZh: "支持导入图片和模型像素化"
    }, {
      title: "在线手绘板",
    }, {
      // 发量
      title: "大神识别器",
    }]
  },
  // 前沿学习
  {
    title: "前沿学习",
    children: [{
      title: "websocket浏览器集群",
    }, {
      title: "electron浏览器p2p集群",
    }, {
      title: "webgpu/webgl模拟Qt",
    }, {
      title: "可视化数据流",
    }, {
      // 曲谱转化
      title: "代码可视化 帮助分析算法和内存",
      abstractZh: "帮助分析算法和内存   如何与浏览器dev差异化 参考vue dev  考虑rust"
    }, {
      title: "webgl编辑器",
      abstractZh: "支持导入图片和模型像素化"
    }, {
      title: "wasm/works",
    }, {
      title: "急速硬件平台",
    }, ]
  }
]


// 设计网站
// https://bennettfeely.com/clippy/


export { projectGroupList, serverLibsource };