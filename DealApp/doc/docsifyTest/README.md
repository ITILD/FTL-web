## 文档测试
https://docsify-preview.vercel.app/#/zh-cn/more-pages

需要在 ./docs 目录创建 .nojekyll 命名的空文件，阻止 GitHub Pages 忽略命名是下划线开头的文件。


## 自动侧边

```py
import os
files = [f for f in os.listdir('.') if os.path.isfile(f)]

sidebar_file = open('_sidebar.md', 'w')

for file in files:
	if ".md" in file:
		name = file.split(".md")
		file = file.replace(" ", "%20")
		sidebar_file.write( f"* [{name[0]}]({file})\n" )

sidebar_file.close()
```