
// GLSL 文件加载 
var GLSLLoader = function () {

	// 加载单个着色器文件
	this.loadShader = function (url) {

		return new Promise(function (resolve, reject) {

			loader(url, function (response) {

				resolve(response);

			}, function (error) {

				reject(error)

			})

		})

	}

	// 加载文件数组
	this.loadArrays = function (arrays, onload) {

		if (!(arrays instanceof Array)) {
			console.warn('variable is not Array');
		}

		var results = [];

		arrays.forEach(values => {

			scope.loadShader(values).then(data => {

				// 以对象的形式返回着色器代码
				results.push({
					name: values, shader: data
				});

				if (results.length === arrays.length) {
					onload(results);
				}

			})

		})

	}

	// 加载两个着色器文件
	this.loadVertexFragment = function (urls, onLoad, onError) {

		var shader = {};

		if ((typeof urls) == 'string') {

			urls = [urls];

		}

		urls.forEach(values => {

			scope.loadShader(values).then(function (data) {

				var fragment = data.includes('gl_FragColor');

				if (fragment) {
					shader.fragment = data;
				} else {
					shader.vertex = data;
				}

				if (shader.vertex && shader.fragment) onLoad(shader);

			}, function (error) {

				onError(error)

			})

		});

	}

	var scope = this;

	function loader(url, onLoad, onError) {

		if (!url) console.warn('url is error or is undefined...');

		var xhr = new XMLHttpRequest();

		xhr.open('GET', url, true);

		xhr.addEventListener('load', function (event) {

			var responseText = this.responseText;

			if (this.status !== 200) {

				onError(event);

			} else {

				// 通过正则表达式去掉注释
				responseText = responseText.replace(/(\n)|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, '');

				onLoad(responseText);

			}

		}, false);

		xhr.addEventListener('error', function (event) {

			onError(event);

		}, false);

		xhr.send(null);

	}

}

// 依据文件名查找着色器代码
Array.prototype.findShader = function (shader_name) {

	var object = this.find(value => {

		return value.name.includes(shader_name);

	})

	object = object !== undefined ? object : { shader: null };

	return object.shader;

}