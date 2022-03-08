// todo mock axios 中断
let IndexInfo = {}

IndexInfo.workList = [
  {
    title: 'App',
    key: '/App/Templates/GL/TemplateControls',
    realPath:[true,''],
    completeness: 0.01, //百分比完成度 >0开始包含路由可以跳转   否则灰色
    abstract: '测试App',
    children: [
      {
        title: 'Templates',
        // completeness: 0.01,
        abstract: '模板',
        key: '0-3',
        children: [
          {
            abstract: 'GL',
            title: 'GL',
            completeness: 0.01,
            key: '/App/Templates/GL',
            children: [
              {
                abstract: 'ccc',
                completeness: 0.01,
                title: 'TemplateControls',
                key: '/App/Templates/GL/TemplateControls',
              },
              {
                abstract: 'ccc',
                completeness: 0.01,
                title: 'TemplateParams',
                key: '/App/Templates/GL/TemplateParams',
              }]
          },
          {
            abstract: 'Index',
            title: 'Index',
            completeness: 0.01,
            key: '/App/Templates/Index',
            children: [
              {
                abstract: 'ccc',
                completeness: 0.01,
                title: 'Axios',
                key: '/App/Templates/Index/Axios',
              },
              {
                abstract: 'ccc',
                completeness: 0.01,
                title: 'TemplateParams',
                key: '/App/Templates/Index/Axios',
              }]
          },
        
        ]
      }
    ],
  },
]

export { IndexInfo }
