# upload-file
## 使用原生js编写的文件上传组件

由于input[type=file]的默认样式无法控制, 采用隐藏原生的input框, 通过给自定义dom元素绑定点击事件去触发隐藏的input的选择浏览文件, 来实现文件上传,上传进度条显示等功能, 已达到样式自定义的要求. 基本用法如下:

html文件中引入Upload.js: 
```
    <button id="btn" type="button">选择文件</button>
    <!-- 进度条 -->
    <div class="progress">
	<span class="text"><span class="num">0.0</span> %</span>
	<div class="wrap" style="width: 0%"></div>
    </div>
    
    <!-- js -->
    <script type="text/javascript" src="./js/Upload.js"></script>
    <script type="text/javascript">
      // 页面DOM
      var oBtn = document.getElementById('btn');
      var oNum = document.querySelector('.num');
      var oWrap = document.querySelector('.wrap');
      
      // 实例化上传组件
      var upload = new Upload(oBtn, {
        // 上传的服务器接口地址
        url: 'register.php',	
        // 服务器接收的表单参数
        name: 'file',
        // 是否为多文件上传
        multiple: false,
        // 上传成功的回调
        onSuccess: function(res) {
          console.log('上传成功! ');
          console.log(res.data);
        },
        // 上传进度控制的回调
        onProgress: function(percentage) {
          // 页面上实时更新进度条
          oNum.innerText = (percentage * 100).toFixed(1);
          oWrap.style.width = (percentage * 100) + '%';
        },
        // 上传开始的回调
        onStart: function(ev) {
          console.log('上传开始!');
        },
        // 上传结束的回调(无论是失败还是成功)
        onEnd: function(ev) {
          console.log('上传已结束!');
        },
        // 上传失败的回调
        onError: function(err) {
          console.log('上传失败! 错误代码:', err.code, err.message);
        }
      });
    </script>
```

上传文件使用了ajax发送表单的方式请求服务器, 采用HTML5 API的**FormData**来组装文件数据, 因此不兼容IE 10以下的低版本IE浏览器.
