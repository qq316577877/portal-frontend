$(function() {
	//上传图片

	// 初始化Web Uploader
	var uploader = WebUploader.create({
		// 选完文件后，是否自动上传。
		auto: true,

		// swf文件路径
		swf: './Uploader.swf',

		// 文件接收服务端。
		server: '/file/upload_private_ajax',

		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: '#filePicker1',

		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png,bmp',
			mimeTypes: 'image/png,image/jpg,image/jpeg,imge/bmp,image/gif'
		}
	});

	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on('uploadSuccess', function(file, res) {
		$("#showImg1").attr("src", res.data.url).attr('data-path', res.data.path);
		$("#filePicker1").parent().next().css("display","none");
	});

	// 文件上传失败，显示上传出错。
	uploader.on('uploadError', function(file) {
		$("#filePicker1").parent().next().css("display","block").text("上传失败");
	});

	// 初始化Web Uploader
	var uploader2 = WebUploader.create({
		// 选完文件后，是否自动上传。
		auto: true,

		// swf文件路径
		swf: './Uploader.swf',

		// 文件接收服务端。
		server: '/file/upload_private_ajax',

		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: '#filePicker22',

		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png,bmp',
			mimeTypes: 'image/png,image/jpg,image/jpeg,imge/bmp,image/gif'
		}
	});

	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader2.on('uploadSuccess', function(file, res) {
		$("#showImg22").attr("src", res.data.url).attr('data-path', res.data.path);
		$("#filePicker22").parent().next().css("display","none");
		
	});

	// 文件上传失败，显示上传出错。
	uploader2.on('uploadError', function(file) {
		$("#filePicker22").parent().next().css("display","block").text("上传失败");
	});

	// 初始化Web Uploader
	var uploader3 = WebUploader.create({
		// 选完文件后，是否自动上传。
		auto: true,

		// swf文件路径
		swf: './Uploader.swf',

		// 文件接收服务端。
		server: '/file/upload_private_ajax',

		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: '#filePicker3',

		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png,bmp',
			mimeTypes: 'image/png,image/jpg,image/jpeg,imge/bmp,image/gif'
		}
	});

	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader3.on('uploadSuccess', function(file, res) {
		$("#showImg3").attr("src", res.data.url).attr('data-path', res.data.path);
		$("#filePicker3").parent().next().css("display","none");
	});

	// 文件上传失败，显示上传出错。
	uploader3.on('uploadError', function(file) {
		$("#filePicker3").parent().next().css("display","block").text("上传失败");
	});

	// 初始化Web Uploader
	var uploader4 = WebUploader.create({
		// 选完文件后，是否自动上传。
		auto: true,

		// swf文件路径
		swf: './Uploader.swf',

		// 文件接收服务端。
		server: '/file/upload_private_ajax',

		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: '#filePicker4',

		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png,bmp',
			mimeTypes: 'image/png,image/jpg,image/jpeg,imge/bmp,image/gif'
		}
	});

	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader4.on('uploadSuccess', function(file, res) {
		$("#showImg4").attr("src", res.data.url).attr('data-path', res.data.path);
		$("#filePicker4").parent().next().css("display","none");
	});

	// 文件上传失败，显示上传出错。
	uploader4.on('uploadError', function(file) {
		$("#filePicker4").parent().next().css("display","block").text("上传失败");
	});
})