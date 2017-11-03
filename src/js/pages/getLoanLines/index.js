/**
 * 签合同
 * Created by yl on 2017/8/11.
 */

$(function () {
    var errMsg = __DATA.errMsg;
    var ifCan = checkIfCanSignContract(errMsg);
    if(ifCan){
        allowedAndGoOn();
    }else{
        notAllowedAndshowError();
    }


    /**
     * 根据预埋数据errMsg判断是否能签合同
     */
    function checkIfCanSignContract(errMsg){
        if(errMsg && errMsg!=""){//不能签合同
            return false;
        }else{
            return true;
        }
    }

    /**
     * 满足签合同条件时展示页面正常内容
     */
    function allowedAndGoOn(){
        var num =60;
        var timer;
        $('#sub').click(function () {
            if(timer){
                num=60;
                clearInterval(timer);
                $('#sendBtn').val('免费获取验证码');
                $('#sendBtn')[0].disabled = false;
                $('#sendBtn').css('background', '#00aa5c').end().css('color', '#fff');
            }
            $('#errormsg').css('visibility', 'hidden');
            $('#mask').show();
            $("#capth").val("");
        });

        var contractUrl =__DATA.contractPath;
        var contractId =__DATA.contractId;

        $('#downloanContract').attr('href',contractUrl);
        var options = {
            fallbackLink: "<p>该浏览器不支持pdf预览，请点击<a href='["+contractUrl+"]'>此处</a>下载预览</p>"
        };
        // decodeURIComponent(contractUrl)
        // 生成合同
        PDFObject.embed(contractUrl, "#pdf1", options);

        // 获取手机号
        httpRequest({
            url:AjaxUrl.loan_get_loan_user_auth_information_ajax,
            success: function (response) {
                var str = response.data.mobile;
                $('#userTel').attr('tel', str);
                var str2 = str.substr(0, 3) + "****" + str.substr(7);
                $('#userTel').html(str2);
            }
        });

        $('#sendBtn').click(function () {
            $('#sendBtn')[0].disabled = true;
            $('#sendBtn').css('background', '#ccc');
            $('#capth').val('');
            timer = setInterval(function () {
                //clearInterval(timer)
                num--;
                $('#sendBtn').val(num + "秒后重发");
                if (num === 0) {
                    clearInterval(timer); //一定清理
                    $('#sendBtn').val('免费获取验证码');
                    $('#sendBtn')[0].disabled = false;//不要再禁用了
                    num = 60;
                    $('#sendBtn').css('background', '#00aa5c').end().css('color', '#fff');
                }
            }, 1000);
            httpRequest({
                url: AjaxUrl.loan_captcha_send_ajax,
                success: function (response) {
                },
                error:function (response) {
                    $("#errormsg").html(response.msg);
                    $('#errormsg').css('visibility', 'visible');
                }
            });
        });

        // 授权事件
        $('#mask').on('click','#grantBtn', function () {
            console.log("点击");
            var code=$("#capth").val().trim();
            // 校验
            if(code==""||code.length!=6){
                $("#errormsg").html("请输入有效的验证码");
                $('#errormsg').css('visibility', 'visible');
                return;
            }

            Loading.open();

            httpRequest({
                url: AjaxUrl.loan_online_sign_ajax,
                params:{
                    contractId:contractId,
                    captchaCode:$('#capth').val()
                },
                success: function (response) {
                    $('#mask').hide();
                    Prompt.alertMsg({textAlgin:"left",msg: "您的借款合同签署成功，已转入资金方签署环节，预计2小时内完成。完成后，借款合同立即生效并获得您的可用贷款额度。稍后，您可以在【会员中心-我的申请】查看您的可用贷款额度，感谢您的支持！",btnClick:function () {
                        location.href="/loan/auth/loanAplication";
                    }});
                },
                error:function (response) {
                    $("#errormsg").html(response.msg);
                    $('#errormsg').css('visibility', 'visible');
                },
                complete:function (response) {
                    Loading.close();
                }
            });
        });
        $('#mask').on('click','#cancelBtn', function () {
            $('#mask').hide();
        });
    }

    /**
     * 不满足签合同条件时展示showError
     */
    function notAllowedAndshowError(){
        //目前页面元素隐藏
        $("#pdf1").hide();
        $("#sub").hide();
        $("#mask").hide();
        //$("#showError").show();
        Prompt.alertMsg({msg: "您的合同信息客户经理正在快马加鞭的录入哦，</br>请稍后再试!",btnClick:function () {
            location.href="/loan/auth/loanAplication"}});
    }
});