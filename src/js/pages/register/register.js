

$(function () {
    //帐号验证//    "src/plugin/jquery-validation/validateform.js",
    var tel = /0?(13|14|15|17|18)[0-9]{9}$/,//电话正则
        t_pwd = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,20}$/,//密码正则
        t_email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,//邮箱正则
        t_qq = /[1-9]([0-9]{5,11})/,//qq正则
        num = 60,//短信定时器时间
        longtimer = 60,
        timer = null,
        inum = 0,
        imgId,//图形验证码id
        tel_num;

    requeset_img()
    init();
    // 设置协议条款在新窗口打开
    $('.checkbox2 a').attr('target', '_blank');

    // form 加上校验
    $("#register").validate({

        errorClass: 'error formError errorRight', // default input error message class
        debug: false, //调试模式取消submit的默认提交功能
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        onkeyup: false,
        submitHandler: function (form) {   //表单提交句柄,为一回调函数，带一个参数：form

            if ($('.input-box')[0].checked == false) {
                // alert('请阅读用户协议1');
                $('#rule').remove();
                var tag = '<div id="rule">请先阅读并同意《九创金服服务条款》</div>';
                $('.main form .sub').before(tag);
                $('.sub').removeClass('tel-f');
                return false;
            }
            if (!canSms) {
                $('.sub').removeClass('tel-f');
                return
            }
            if($('.pwd1-false').css('display')=='inline-block'){
                $('.pwd1-false').css('display','none')
            }


            if($('#msg_code').val().length!==6){
                $('.message-false').css('display','inline-block');
                $('.message-false').text('请输入6位验证码');
                return
            }
            Loading.open()

            submit()
        },
        rules: {
            tel: {
                required: true,
            },
            patterning:"required",
            msg_code:"required",
            pwd1:"required",
            pwd: "required",
        },
        messages: {
            tel: {
                required:"请输入11位手机号",
            },
            patterning: "请输入验证码",
            msg_code: "请输入短信验证码",
            pwd: "请输入密码",
            pwd1: "请再次输入密码",

        }
    })
    ;

    // formValidation("register");

    //手机号码验证
    $('#tel').focus(function () {
        $(this).addClass('focus')
    });
    // 手机号输入校验

    $('#tel').bind('input propertychange', function () {
        checkTel();
    });
    //$('#tel').bind('input propertychange', checkTel);




    $('.input-pass').focus(function () {
        $(this).addClass('focus')
    });
    //$('.input-pass').blur(function () {
    //    if (data.code !== 200) {
    //        $('.message-true').css('display', 'none');
    //        $('.message-false').css('display', 'inline-block');
    //        $('.message-false').html(data.msg);
    //
    //        $(this).addClass('tel-f');
    //        $(this).siblings('.input-l').addClass('text-f')
    //    } else {
    //        $('.message-true').css('display', 'inline-block');
    //        $('.message-false').css('display', 'none');
    //        $(this).removeClass('tel-f');
    //        $(this).siblings('.input-l').removeClass('text-f').end().removeClass('focus');
    //
    //    }
    //});
    //载入图形验证码


    var canSms = false;

    //点击发送验证码
    $('#btn-passage').click(function () {

        if ($('#tel').val().length == 11) {
            checkTel();
        }
        checkPatterningLength();

        if (canSms) {
            sms();
        }
    })


    // 手机号输入框失去焦点

    tel_num = $('#tel').val();
    //图形验证码
    //刷新验证码-------这里
    $('.main-p').click(function () {
        requeset_img()
    })

    //验证图形
    $('#patterning').focus(function () {
        // 判断手机号
        if (!canSms) {
            $('.tel-true').css('display', 'none');
            $('#tel').addClass('tel-f');
            $('#tel').siblings('.input-l').addClass('text-f');
            return;
        }
        $(this).addClass('focus');
    });

    //密码验证
    $('#pwd').focus(function () {
        pwdFocus()
    });


    $('#pwd').blur(function () {
        pwdBlur()
    })


    //再次输入密码
    $('#pwd1').focus(function () {
        $(this).addClass('focus');
    });
    $('#pwd1').blur(function () {
        pwdAgin()
    })
    $('#pwd').on('input', function () {
        twoPwd();
    })

    //邮箱
    $('#email').focus(function () {
        $(this).addClass('focus')
    });
    $('#email').blur(function () {
        emailBlur()
    })

    //qq
    $('#qq').focus(function () {
        $(this).addClass('focus')
    });
    $('#qq').blur(function () {
        QQBlur()
    })


    $('.input-box').on('change', function () {
        if ($('.input-box')[0].checked) {
            $('#rule').remove();
        }
    })


    // 提交校验
    $('.sub').click(function () {

        $("#register").submit();
        //return;
    });

    /*
    *设置默认属性
    * */
    function init (){
        $('#tel').attr('maxlength', '11');
        $('.input-pass').attr('maxlength', '6')
        $('#patterning').attr('maxlength', '4');
        $('#msg_code').attr('maxlength', '6');
        $('#pwd').attr('maxlength', '20');
        $('#pwd1').attr('maxlength', '20');

        $('#email').attr('maxlength', '50');
        $('#qq').attr('maxlength', '13');

        $('#rule').css('display', 'none')
        //$('.input-box')[0].disabled = true;
        // 允许点击提交，
        // $('.sub')[0].disabled = true;
        $('.input-box').attr('checked', false);
        //设置短信发送不可用
        $('#btn-passage').css('background', '#00aa5c');
        $('#btn-passage').css('color', '#fff');
    }

    /*
    *封装图形码验证请求
    * */
    function requeset_img() {
        httpRequest({
            url: AjaxUrl.captcha_pic_generate_ajax,
            params: {
                type: 1
            },
            success: function (response) {
                var src = response.data.captcha;
                $('.main-img img').attr('src', src);
                imgId = response.data.id;
                return imgId;
            }
        })
    };

    /*
    *封装发送短信
    * */
    function sms() {
        httpRequest({
            url: AjaxUrl.captcha_send_sms_ajax,
            params: {
                mobile: $('#tel').val(),
                captcha: $('#patterning').val(),
                id: imgId,
                type: 1
            },
            success: function (response) {
                clearInterval(timer);
                $('.img-true').css('display', 'inline-block');
                $('.img-false').css('display', 'none');
                $('#patterning').removeClass('tel-f');
                $('#patterning').siblings('.input-l').removeClass('text-f').end().removeClass('focus');


                $('#btn-passage')[0].disabled = true;//不要再禁用了
                $('#btn-passage').css('background', '#ccc');


                timer = setInterval(function () {
                    num--;
                    $('#btn-passage').val(num + "秒后重发");
                    if (num === 0) {
                        clearInterval(timer); //一定清理
                        $('#btn-passage').val('免费获取验证码');
                        $('#btn-passage')[0].disabled = false;//不要再禁用了
                        num = longtimer;
                        $('#btn-passage').css('background', '#00aa5c').css('color', '#fff');

                    }

                }, 1000);
                $('.input-pass').blur(function () {
                    if(this.value==''){
                        if($(this).siblings('.error').css('display')=='none'){
                            $('.message-false').css('display','inline-block');
                        }else{
                            $('.message-false').css('display','none');
                        }
                        $('.message-false').text('请输入验证码');
                        return
                    }else if(this.value.length!==6){
                        $('.message-false').css('display','inline-block');
                        $('.message-false').text('请输入6位验证码');
                        return
                    }
                    $('.message-true').css('display', 'inline-block');
                    $('.message-false').css('display', 'none');
                    $(this).removeClass('tel-f');
                    $(this).siblings('.input-l').removeClass('text-f').end().removeClass('focus');
                });
            },
            error: function (response) {
                $('.img-true').css('display', 'none');

                $('.img-false').css('display', 'inline-block');
                $('.img-false').text(response.msg);
                requeset_img();
                $('.input-pass').blur(function () {
                    if(this.value==''){
                        if($(this).siblings('.error').css('display')=='none'){
                            $('.message-false').css('display','inline-block');
                        }else{
                            $('.message-false').css('display','none');
                        }
                        $('.message-false').html('请输入验证码');
                        return
                    }else if(this.value.length!==6){
                        $('.message-false').css('display','inline-block');
                        $('.message-false').text('请输入6位验证码');
                        return
                    }
                    $('.message-true').css('display', 'none');
                    $('.message-false').css('display', 'inline-block');
                    $('.message-false').html(response.msg);
                    $(this).addClass('tel-f');
                    $(this).siblings('.input-l').addClass('text-f')
                });
            }
        })
    }

    /*
    * 校验手机号共同方法
    *
    * */
    function checkTel() {

        var telphone = $('#tel').val();
        if (!tel.test(telphone)) {
            $('.tel-verify-w').css('display', 'none');
            $('.tel-verify-r').css('display', 'none');
            $('.tel-true').css('display', 'none');
            $('.tel-false').css('display', 'inline-block');
            $("#tel").addClass('tel-f');
            $("#tel").siblings('.input-l').addClass('text-f');
            $('label[for="tel"]').css('display','none')
            canSms = false;

        } else {
            //验证是否符合手机号规则
            $('.tel-true').css('display', 'inline-block');
            $('.tel-false').css('display', 'none');
            $("#tel").removeClass('tel-f');
            $("#tel").siblings('.input-l').removeClass('text-f').end().removeClass('focus');

            //验证手机号是否被占用
            httpRequest({
                url: AjaxUrl.member_check_mobile_ajax,
                params: {
                    mobile: $('#tel').val()
                },
                success: function (response) {
                    $('.tel-verify-w').css('display', 'none');
                    $('.tel-verify-r').html(response.msg);
                    $('.tel-false').css('display', 'none');
                    $('.tel-verify-r').css('display', 'inline-block');
                    $('#tel').siblings('.error').css('display','none');
                    canSms = true;
                },
                error: function (response) {
                    $('.tel-verify-r').css('display' , 'none');
                    $('.tel-verify-w').html('手机已被注册');
                    $(".tel-true").css('display', 'none')
                    $('.tel-verify-w').css('display', 'inline-block');
                    $('label[for="tel"]').css('display','none')
                    canSms = false;
                }
            })
        }

    }

    /*
    * 验证图形验证码的长度
    * */
    function checkPatterningLength() {
        if ($('#patterning').val().length != 4) {
            $('.img-false').css('display', 'inline-block');
            $('#patterning').siblings('.error').css('display','none')
            canSms = false;
        } else {
            canSms = true;
        }

    }

    /*
    * 输入密码校验
    * */
    function pwdBlur (){
        $('.hint').css('display', 'none')
        if (!t_pwd.test($('#pwd').val())) {
            $('.pwd-true').css('display', 'none');
            if($('#pwd').siblings('.error').css('display')=='none' || $('#pwd').siblings('.error').length==0){
                $('.pwd-false').css('display', 'inline-block');
            }
            $('#pwd').addClass('tel-f');
            $('#pwd').siblings('.input-l').addClass('text-f')

            canSms = false;

        } else {
            $('.pwd-true').css('display', 'inline-block');
            $('.pwd-false').css('display', 'none');
            $('#pwd').removeClass('tel-f');
            $('#pwd').siblings('.input-l').removeClass('text-f').end().removeClass('focus');

            canSms = true;
        }
    }

    /*
    * 输入密码焦点提示框
    * */
    function pwdFocus(){
        if (!($('.pwd-false')[0].style.display == 'inline-block')) {
            $('.hint').css('display', 'inline-block')
        }
        $(this).addClass('focus');
        $('#pwd').siblings('.error').css('display','none')
    }

    /*
    * 验证再次输入密码
    * */
    function pwdAgin (){
        if ($('#pwd')[0].value !== $('#pwd1')[0].value) {//两次密码不一样
            $('.pwd1-true').css('display', 'none');
            if($('#pwd1').siblings('.error').css('display')=='none'){
                $('.pwd1-false').css('display', 'inline-block');
            }
            $('#pwd1').addClass('tel-f');
            $('#pwd1').siblings('.input-l').addClass('text-f')

            canSms = false;
        }
        else if ($('#pwd1').val() == '') {//输入为空
            $('.pwd1-true').css('display', 'none');
            if($('#pwd1').siblings('.error').css('display')=='none'){
                $('.pwd1-false').css('display', 'inline-block');
            }
            $('#pwd1').addClass('tel-f');
            $('#pwd1').siblings('.input-l').addClass('text-f')
            canSms = false;
        }
        else {
            $('.pwd1-true').css('display', 'inline-block');
            $('.pwd1-false').css('display', 'none');
            $('#pwd1').removeClass('tel-f');
            $('#pwd1').siblings('.input-l').removeClass('text-f').end().removeClass('focus');

            canSms = true;
        }
    }

    /*
    * email失去焦点
    * */
    function emailBlur (){
        if ($('#email').val() == '') {
            $('#email').siblings('.input-l').removeClass('text-f').end().removeClass('focus');
            return
        }
        else if (!t_email.test($('#email').val())) {
            $('.email-true').css('display', 'none');
            $('.email-false').css('display', 'inline-block');
            $('#email').addClass('tel-f');
            $('#email').siblings('.input-l').addClass('text-f')

        } else {
            $('.email-true').css('display', 'inline-block');
            $('.email-false').css('display', 'none');
            $('#email').removeClass('tel-f');
            $('#email').siblings('.input-l').removeClass('text-f').end().removeClass('focus');
        }
    }

    /*
    * qq失去焦点
    * */
    function QQBlur (){
        if ($('#qq').val() == '') {//如果输入为空  直接跳出函数
            $('#qq').siblings('.input-l').removeClass('text-f').end().removeClass('focus');
            return
        }
        else if (!t_qq.test($('#qq').val())) {
            $('.qq-true').css('display', 'none');
            $('.qq-false').css('display', 'inline-block');
            $('#qq').addClass('tel-f');
            $('#qq').siblings('.input-l').addClass('text-f')

        } else {
            $('.qq-true').css('display', 'inline-block');
            $('.qq-false').css('display', 'none');
            $('#qq').removeClass('tel-f');
            $('#qq').siblings('.input-l').removeClass('text-f').end().removeClass('focus');
        }
    }


    /*
    * 再次输入密码判断两次密码是否一致
    * */
    function twoPwd() {
        var pwd=$("#pwd").val();
        var pwd2=$("#pwd1").val();
        if(pwd===pwd2){
            $(".pwd1-true").css("display", "inline-block");
            $(".pwd1-false").css("display", "none");
            $("#pwd1").removeClass("tel-f");
            $("#pwd1").siblings(".input-l").removeClass("text-f").end().removeClass("focus");
            return true;
        }else {
            $(".pwd1-true").css("display", "none");
            if($('#pwd1').siblings('.error').css('display')=='none' ||$('#pwd1').siblings('label').length==0 ){
                $(".pwd1-false").css("display", "inline-block");
            }

            $("#pwd1").addClass("tel-f");
            $("#pwd1").siblings(".input-l").addClass("text-f");
            return false;
        };

    };

    //判断条件
    /*
    * 提交注册申请
    * */
    function submit(){
        //提交给后台
        httpRequest({
            url: AjaxUrl.member_register_account_ajax,
            params: {
                mobile: $('#tel').val(),
                password: $('#pwd').val(),
                mobileCaptcha: $('.input-pass').val(),
                qq: $('#qq').val(),
                email: $('#email').val()
            },
            success: function (response) {
                Loading.close();
                window.location.href = response.data.url;
            },
            error: function (response) {
                Loading.close();
                $('.message-true').css('display', 'none');
                if($('#msg_code').siblings('.error').css('display')=='none' ||$('#msg_code').siblings('label').length==0){
                    $('.message-false').css('display', 'inline-block');
                    $('.message-false').html(response.msg);
                }
                $('.sub')[0].disabled = false;
                $('.sub').css('background', '#00aa5c');
                $('.sub').val('点击提交');
                clearInterval(timer)
                $('#btn-passage').css('background', '#00aa5c');
                $('#btn-passage').val('免费获取验证码');
                $('#btn-passage').removeAttr('disabled');
                requeset_img();
                $('#patterning').val('')
                $('.input-pass').val('')
                $('.img-true').css('display', 'none');
                $('#patterning').attr('imgPwd', '1');
            }
        })
        $(this).attr('value', '正在提交...');
        $('.sub')[0].disabled = true;
        $('.sub').css('background', '#999');
    }
})