class InitViewer {
  /**
   * 
   * @param {*} defaultAccessToken 外网cesium ion 密钥
   */
  constructor(defaultAccessToken) {
    this.viewers = new Map()
    Cesium.Ion.defaultAccessToken = defaultAccessToken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MTRiM2IxYy1iZGZkLTRmOTktYWVhMi0xZTE2ZjU4NzliMDMiLCJpZCI6Mzc0NjAsImlhdCI6MTYwNTA3NzQ1MX0.GEvT_KwEV9MjAqyXHyS-ezcITyKc53X3MQDWBLPElI0'

  }

  static getInstance() {
    if (!this.Instance) {
      this.Instance = new InitViewer();
    }
    return this.Instance;
  }


  addViewer(viewerId) {
    let viewer = new Cesium.Viewer(viewerId, {
      /**
       * 小部件
       */
      //true	如果设置为false，将不创建“动画”窗口小部件。
      animation: !false,
      //true 	如果设置为false，则不会创建BaseLayerPicker窗口小部件。
      baseLayerPicker: !false,
      //true 	如果设置为false，将不会创建FullscreenButton小部件。
      fullscreenButton: !false,
      //false 	如果设置为true，将创建VRButton小部件。
      vrButton: false,
      //true 	如果设置为false，则不会创建Geocoder小部件。 地理编码查询
      //布尔 | Array。< GeocoderService > 	<可选>
      geocoder: false,
      //true 	如果设置为false，将不会创建HomeButton小部件。
      homeButton: false,
      //true 	如果设置为false，则不会创建InfoBox小部件。
      infoBox: false,
      //true 	如果设置为false，将不会创建SceneModePicker小部件。
      sceneModePicker: false,
      //true 	如果设置为false，将不会创建SelectionIndicator小部件。
      selectionIndicator: false,
      //true 	如果设置为false，则不会创建“时间轴”窗口小部件。
      timeline: !false,
      //true 	如果设置为false，将不会创建导航帮助按钮。
      navigationHelpButton: false,
      //true 	如果导航说明最初应该是可见的，则为true；如果直到用户明确单击该按钮才显示，则为false。
      navigationInstructionsInitiallyVisible: false,
      //false 	true设为时，每个几何实例将仅以3D渲染以节省GPU内存。
      //scene3DOnly: true,
      //false 	true默认情况下时钟是否应尝试提前模拟时间，false否则。此选项优先于setting Viewer#clockViewModel。
      //shouldAnimate : true,
      // 新ClockViewModel（clock） 	用于控制当前时间的时钟视图模型。ClockViewModel 	<可选>
      // clockViewModel 	
      // 当前基础影像图层的视图模型（如果未提供）将使用第一个可用的基础图层。仅当“ baseLayerPicker”设置为true时，此值才有效。
      // selectedImageryProviderViewModel 	ProviderViewModel 	<可选>
      // createDefaultImageryProviderViewModels（） 	可以从BaseLayerPicker中选择的ProviderViewModels数组。仅当“ baseLayerPicker”设置为true时，此值才有效。

      // imageryProviderViewModels 	Array。< ProviderViewModel > 	<可选>
      // 当前基础地形图层的视图模型（如果未提供）将使用第一个可用的基础图层。仅当“ baseLayerPicker”设置为true时，此值才有效。
      // selectedTerrainProviderViewModel 	ProviderViewModel 	<可选>
      // createDefaultTerrainProviderViewModels（） 	可以从BaseLayerPicker中选择的ProviderViewModels数组。仅当“ baseLayerPicker”设置为true时，此值才有效。
      // terrainProviderViewModels 	Array。< ProviderViewModel > 	<可选>
      // createWorldImagery（） 	要使用的图像提供者。仅当“ baseLayerPicker”设置为false时，此值才有效。
      // imageryProvider 	影像提供者 	<可选>
      // imageryProvider: new Cesium.OpenStreetMapImageryProvider({
      //   url: 'https://a.tile.openstreetmap.org/'
      // }),
      //   新的EllipsoidTerrainProvider（） 	DEM 	<可选>
      // terrainProvider: Cesium.createWorldTerrain({//cesium世界地形
      //   requestWaterMask: true, // required for water effects
      //   requestVertexNormals: true // required for terrain lighting
      // }),
      //     用来渲染星星的天空盒。当为时undefined，使用默认星号。如果设置为false，则不会添加skyBox，Sun或Moon。
      // skyBox 	天空盒 | false 	<可选>



      // 蓝天，以及围绕地球四肢的辉光。设置为false将其关闭。 球内天空盒？？
      // skyAtmosphere: false,
      //   document.body 	按下全屏按钮时要置于全屏模式的元素或ID。
      // fullscreenElement 	元素 | 细绳 	<可选>

      // useDefaultRenderLoop 
      //true 	如果此小部件应控制渲染循环，则为true，否则为false。
      // targetFrameRate 	数字 	<可选>
      //     使用默认渲染循环时的目标帧速率。
      // showRenderLoopErrors 
      //true 	如果为true，则在发生渲染循环错误时，此小部件将自动向包含false用户显示HTML面板。
      // useBrowserRecommendedResolution 
      //true 	如果为true，则以浏览器建议的分辨率进行渲染，然后忽略window.devicePixelRatio。
      // automaticallyTrackDataSourceClocks 
      //true 	如果为true，则此小部件将自动跟踪新添加的数据源的时钟设置，并在数据源的时钟发生更改时进行更新。如果要独立配置时钟，请将其设置为false。
      // contextOptions 	目的 	<可选>
      //     与options传递给的上下文和WebGL创建属性相对应Scene。
      // sceneMode 	场景模式 	<可选>
      //   SceneMode.SCENE3D 	初始场景模式。
      // mapProjection 	地图投影 	<可选>
      //   新的GeographicProjection（） 	在2D和Columbus View模式下使用的地图投影。
      // globe 	地球仪 | false 	<可选>
      //   新Globe（mapProjection.ellipsoid） 	场景中使用的地球仪。如果设置为false，则不会添加任何地球仪。
      // orderIndependentTranslucency 
      //true 	如果为true且配置支持它，则使用顺序无关的半透明性。
      // creditContainer 	元素 | 细绳 	<可选>
      //     包含的DOM元素或ID CreditDisplay。如果未指定，则将信用额添加到小部件本身的底部。






      //     包含由创建的弹出广告的DOM元素或ID CreditDisplay。如果未指定，它将显示在小部件本身上。

      // creditViewport 	元素 | 细绳 	<可选>
      //   新的DataSourceCollection（） 	小部件可视化的数据源集合。如果提供此参数，则假定实例由调用方拥有，并且在销毁查看器时不会销毁该实例。

      // dataSources 	数据源集合 	<可选>
      //   1.0 	用于放大地形的标量。请注意，地形夸张不会修改任何其他相对于椭球的图元。

      // terrainExaggeration 	数字 	<可选>
      //   false 	确定阴影是否由光源投射。

      // shadows 
      //   ShadowMode.RECEIVE_ONLY 	确定地形是投射还是接收来自光源的阴影。

      // terrainShadows 	阴影模式 	<可选>
      //   MapMode2D.INFINITE_SCROLL 	确定2D地图是可旋转的还是可以在水平方向上无限滚动。

      // mapMode2D 	MapMode2D 	<可选>
      //   false 	如果设置为true，将创建ProjectionPicker小部件。

      // projectionPicker 
      //   false 	如果为true，则仅根据场景中的更改确定是否需要渲染帧。启用可减少应用程序的CPU / GPU使用率，并减少移动设备上的电池消耗，但需要Scene#requestRender在此模式下显式渲染新帧。在API的其他部分对场景进行更改后，在许多情况下这是必要的。请参见使用显式渲染提高性能。

      // requestRenderMode 
      //   0.0 	如果requestRenderMode为true，则此值定义在请求渲染之前允许的最大模拟时间更改。请参见使用显式渲染提高性能。

      // maximumRenderTimeChange 	数字 	<可选>


    });
    viewer.imageryLayers.removeAll()
    this.viewers.set(viewerId, viewer)

    return viewer;
  }

}
export { InitViewer }

// https://blog.csdn.net/moyebaobei1/article/details/106102726/