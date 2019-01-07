/**
 * name: Upload.js
 * desc: 文件上传组件
 * date: 2019/1/5
 * author: allen2001
 */

/* 构造函数 Upload */
function Upload(btn, options) {
	// 触发按钮DOM
	this.btn = btn;
	// 上传配置参数
	this.options = options;
	// 上传百分比
	this.percentage = 0;

	// 初始化实例
	this.init();
}

/* 初始化 */
Upload.prototype.init = function() {
	// 保存当前实例
	var _this = this;
	// 绑定点击事件 选择文件
	this.btn.addEventListener('click', function(ev) {
		// 创建一个file input (默认只能选择一个文件)
		var input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    // 判断是否能选择多个文件上传
    if (_this.options.multiple) {
      input.setAttribute('multiple', 'multiple');
    }
		// 绑定input 选择文件后的回调
		input.onchange = function() {
			// 获取已选择的文件对象集合
      var files = this.files;
      
			// 创建formdata
      var formdata = new FormData();
      for (var i = 0; i < files.length; i++) {
        formdata.append(_this.options.name, files[i]);
      }
      
			// 发起一个ajax请求
			var xhr = new XMLHttpRequest();

			// 监听上传开始的事件
			xhr.addEventListener('loadstart', _this.options.onStart);
			// 监听progress事件
			xhr.upload.addEventListener('progress', function(ev) {
				if (ev.lengthComputable) {
					// 更新进度百分比
					_this.percentage = ev.loaded / ev.total;
					_this.options.onProgress(_this.percentage);
				}
			})
			// 监听上传结束的事件(不管成功与失败)
      xhr.addEventListener('loadend', _this.options.onEnd);
      // 监听onload事件
      xhr.addEventListener('load', _this.options.onLoad);
      // 监听onerror事件
      xhr.addEventListener('error', _this.options.onError);

			var url = _this.options.url;
			xhr.open('POST', url);
			// 监听事件
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						// 请求成功
						_this.options.onSuccess({
							status: 200,
							data: xhr.responseText
						});
					} else {
						// 请求失败
						_this.options.onError({
							code: xhr.status,
							message: xhr.statusText
						});
					}
				}
			}
			// 发送请求
			xhr.send(formdata);
		}
    // 自动触发选择文件操作
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
    
	}, false);
}

/* 上传文件 */
Upload.prototype.upload = function() {

}

/* 上传完成后重置回到初始状态 */
Upload.prototype.reset = function() {
	this.percentage = 0;
	
}