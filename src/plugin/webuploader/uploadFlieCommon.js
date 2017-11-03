/**
 * 上传文件
 * Created by qinmenghuan on 2017/7/19.
 */

function UploadCommon(upobj) {

    // 提示对象

    // 初始化Web Uploader
    var uploaderObj = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf: './Uploader.swf',

        // 文件接收服务端。
        // server: '/file/upload_seal_pic_ajax',
        server: upobj.uploadUrl,

        // fileSingleSizeLimit:maxSize*1024*1024,   //设定单个文件大小

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        // pick: '#filePicker3',
        pick: '#' + upobj.elementId,

        // 只允许选择图片文件。
        accept: {
            title: 'Images',

            extensions: 'gif,jpg,jpeg,bmp,png,bmp',
            mimeTypes: 'image/png,image/jpg,image/jpeg,imge/bmp,image/gif'

        },

        // png格式
        // accept: {
        // 	title: 'Images',
        // 	extensions: 'png',
        // 	mimeTypes: 'image/png'
        // },

        // 不压缩image
        resize: false,

        // 可以重复上传
        duplicate: true
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploaderObj.on('uploadSuccess', function (file, res) {
        if ($.isFunction(upobj.success)) {
            upobj.success(file, res);
        }
    });

    // 文件上传失败，显示上传出错。
    uploaderObj.on('uploadError', function (file) {
        if ($.isFunction(upobj.error)) {
            upobj.error(file);
        }
    });
}