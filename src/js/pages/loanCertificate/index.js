/**
 * 开通安心签账户
 * Created by qinmenghuan  on 2017/8/11.
 */

$(function () {
    // 全局变量

    // 绑定事件
    $("#signCertificate").click(signCertificate);
    // 绑定上传控件
    var uc=new UploadCommon({
        uploadUrl:"/file/upload_seal_pic_ajax",
        elementId:"filePicker3",
        success:function (file,res) {
            $("#showImg3").attr("src", res.data.url).attr('data-path', res.data.path);
            $("#filePicker3").parent().next().css("display","none");
        },
        error:function (file) {
            $("#filePicker3").parent().next().css("display","block").text("上传失败");
        }
    });

    // 签约安心签
    function signCertificate() {
        // 初始化校验
        $(".judge").css("display","none");
        $(".agreement").css("display","none");

        //校验
        var flag=true;
        var imgUrl=$("#showImg3")[0].src;
        console.log("b:",imgUrl);
        var imgUrlArray=imgUrl.split("/");
        var imgUrlStr=imgUrlArray[imgUrlArray.length-1];
        console.log("aa:",imgUrlStr);
        if(imgUrlStr=="upload.gif"){
            $(".judge").css("display","block");
            flag=false;
        }
        // 校验协议
        if(!$("#agreementcbx")[0].checked){
            $(".agreement").css("display","block");
            flag=false;
        }
        if(!flag){
            return;
        }

        Loading.open();

        var imgPath = $('#showImg3').data('path');
        httpRequest({
            url: "/loan/auth/contract/account_open_ajax",
            params:  {
                sealPath: imgPath
            },
            success: function (response) {
                location.href="/loan/auth/quota/apply";
            },
            complete:function (response) {
                Loading.close();
            }
        });
    }

});