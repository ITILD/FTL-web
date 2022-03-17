function indexHtml(indexConfig) {
  // let serverLibsource = indexConfig.serverLibsource;

  // 添加项目列表
  let projectTabQuickMapDom = document.getElementsByClassName("projectTabQuickMap-navigation")[0]; // 上部快速导航栏内容i
  let projectTabQuickMapHtml = ''

  let projectGroupListDom = document.getElementsByClassName("projectGroupListQuick-navigation")[0]; // 左侧快速导航栏内容i
  let projectChildDom = document.getElementsByClassName("projectGroupList-navigation")[0];; // 内容导航块内容
  let projectGroupList = indexConfig.projectGroupList;
  // 重点项目  quick 导航
  let projectTabQuickArray = [];
  // 项目组列表
  for (let i = 0; i < projectGroupList.length; i++) {
    const projectGroup = projectGroupList[i];
    // 快速导航栏内容ia
    projectGroupListDom.insertAdjacentHTML('beforeend', '<a class="projectGroupQuick-navigation" href="/">' + i + ':' + projectGroup.title + '</a>');
    // 内容导航块内容
    projectChildDom.insertAdjacentHTML('beforeend', '<div class="projectGroup-navigation"><h2 class = "projectGroup-navigation-title">' + projectGroup.title + '</h2></div>');

    // 项目组->项目
    let projectGroupDom = document.getElementsByClassName("projectGroup-navigation")[i];
    let projectList = projectGroup.children;
    let projectHtml = '';
    for (let j = 0; j < projectList.length; j++) {
      const project = projectList[j];
      projectHtml += '<span class="project-navigation">' +
        '<a class="projectTitle" href="/">' + project.title + '</a>' +
        '</span>'
      // project.level && (projectTabQuickArray[project.level] = { title: project.title, url: 'todo' })
      project.level && (projectTabQuickMapHtml += ('<a href="/"><button class="projectTabQuick-btn">' + project.title + '</button></a>'))
    }
    projectGroupDom.insertAdjacentHTML('beforeend', projectHtml);

  }
  projectTabQuickMapDom.insertAdjacentHTML('beforeend', projectTabQuickMapHtml);

  console.log(projectTabQuickArray)
  console.log(test)
}




export { indexHtml };