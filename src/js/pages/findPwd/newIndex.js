/**
 * Created by yl on 2017/8/9.
 */
-$(function() {


    // form 加上校验
    $("#findPwdForm").validate({
        errorClass: 'error formError errorRight', // default input error message class
        debug: false, //调试模式取消submit的默认提交功能
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        onkeyup: false,
        submitHandler: function (form) {   //表单提交句柄,为一回调函数，带一个参数：form
            submit();
        },
        rules: {
            tel:"required",
            patterning:"required",
            telCode:"required"
        },
        messages: {
            tel: "请输入手机号",
            patterning: "请输入验证码",
            telCode: "请输入短信验证码"
        }
    });

    var tel = /0?(13|14|15|17|18)[0-9]{8,9}$/,
        num = 60, //短信定时器时间
        timer = null,
        inum = 0,
        imgId; //图形验证码id
    //设置短信发送不可用
    $('#btn-passage')[0].disabled = true;
    $('#btn-passage').css({
        'background': '#ccc',
        "color":"#666"
    });

    //载入图形验证码
    requeset_img();

    $('.input-pass').on('input',function(){
        $('.message-false').css('display','none');
    });

    //手机号码验证
    $('#tel').focus(function() {
        $(this).addClass('focus');
    });
    $("#tel").on('input', function() {
        // if(!tel.test($(this).val())) {
            // $('.tel-true').css('display', 'none');
            // $('.tel-false').css('display', 'inline-block');
            // $('.tel-verify-w').css('display', 'none');
            // $(this).addClass('tel-f');
            // $(this).siblings('.input-l').addClass('text-f')
        //
        // } else {
            //验证是否符合手机号规则
            $('.tel-false').css('display', 'none');
            $(this).removeClass('tel-f');
            $(this).siblings('.input-l').removeClass('text-f').end().removeClass('focus');
            $('.tel-true').css('display', 'inline-block');

            //验证手机号是否被占用

            httpRequest({
                url: AjaxUrl.member_is_mobile_registered_ajax,
                params: {
                    mobile: this.value
                },
                success: function (response) {
                    $('.tel-verify-w').css('display', 'none');
                    $('#tel').attr('pass', '1');
                    $('#patterning').val('');
                },
                error:function (response) {
                    $('.tel-true').css('display', 'none');
                    $('.tel-verify-r').css('display', 'none');
                    $('.tel-verify-w').html('手机未注册');
                    $('.tel-verify-w').css('display', 'inline-block');
                    $('#tel').attr('pass', '2');
                    $('#patterning').val('');
                }
            });

        // }
    });

    //图形验证码
    //刷新验证码-------这里
    $('.main-p').click(function() {
        requeset_img();
        $("#patterning").val('');
    })
    //验证图形
    $('#patterning').focus(function() {
        $(this).addClass('focus')
    });

    $('#patterning').on('input', function() {
        var oVal = $(this).val();
        var oTel = $('#tel').attr('pass');
        var $click= $('#patterning').attr('click');
        $('.img-false').css('display', 'none');
        if(oTel == 2) {
            $('#btn-passage')[0].disabled = true;
            $('#btn-passage').css({
                'background': '#ccc',
                "color":"#666"
            });
        };


        if(oVal.length == 4) {
            if($('#tel').val() == "") {
                $('.tel-verify-w').css('display', 'inline-block');
                $('.tel-false').css('display', 'none');
                $('.tel-verify-w').text('请先输入手机号');
            }
            if(oTel == 2) {
                $('.tel-verify-w').css('display', 'inline-block');
                $('.tel-verify-w').text('该手机号不可用');
                $('.tel-false').css('display', 'none');
            } else if(oTel == 1&&$click=="no"){
                return false;
            }else if(oTel == 1){
                $('#btn-passage')[0].disabled = false;
                $('#btn-passage').css({
                    'background': '#00aa5c',
                    "color":"#fff"
                })
            }

        }
    });


    //发送短信
    $('#btn-passage').click(function() {
        if($("#patterning").val()==""){
            $(".img-false").css("display","inline-block").text("验证码不能为空");
            return
        }
        $('#message-false').css('display','none');

        capth();
    });

    //发送请求
    $('.input-pass').focus(function() {
        $(this).addClass('focus')
    });
    $('.input-pass').on('input', function() {
        var $val = $(this).val();
        if($val.length == 4) {
            $(this).attr('pass', '1');
        }
    });


    $('form .sub').click(function() {
        $("#findPwdForm").submit();
       });


    /*
    * 发送短信
    * */
    function capth (){
        httpRequest({
            url:AjaxUrl.captcha_send_sms_ajax,
            params:{
                mobile: $('#tel').val(),
                captcha: $('#patterning').val(),
                id: imgId,
                type: 2
            },
            success: function (response) {
                $('#patterning').attr('click',"no");
                timer = setInterval(function() {
                    num--;
                    $("#btn-passage")[0].disabled = true;
                    $('#btn-passage').css({
                        'background': '#ccc',
                        "color":"#666"
                    });
                    $('#btn-passage').val(num + "秒后重发");
                    if(num === 0) {
                        $("#tel").removeAttr('readonly');
                        $("patterning").removeAttr('readonly');
                        clearInterval(timer); //一定清理
                        $('#btn-passage').val('免费获取验证码');
                        $('#btn-passage')[0].disabled = false; //不要再禁用了
                        num = 60;
                        $('#btn-passage').css({
                            'background': '#00aa5c',
                            "color":"#fff"
                        })
                        $('#patterning').attr('click',"yes");
                    }
                }, 1000);
            },
            error: function (response) {
                if(response.msg){
                    $('.img-false').css('display', 'inline-block');
                    $('.img-false').text(response.msg);
                    $('#btn-passage').val('再次点击');
                };
            }
        });
    }

    /*
    * 提交ajax
    * */
    function submit (){
        httpRequest({
            url:AjaxUrl.member_check_mobile_captcha_ajax,
            params:{
                mobile: $('#tel').val(),
                mobileCaptcha: $('#telCode').val()
            },
            success: function (response) {
                location.href=response.data.reset_url
            },
            error: function (response) {
                $('.message-false').css('display', 'inline-block')
                $('.message-false').text('手机验证码错误');
            }
        })
    }

    /*
    * 封装图形码验证请求
    * */
    function requeset_img() {
        httpRequest({
            url:AjaxUrl.captcha_pic_generate_ajax,
            params:{
                type: 2
            },
            success: function (response) {
                var src = response.data.captcha;
                $('.main-img img').attr('src', src);
                imgId = response.data.id;
            }
        });

    };

});