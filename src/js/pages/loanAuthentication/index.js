
$(function () {
    var num = 60, //短信定时器时间
        timer = null,
        inum = 0,
        $url,
        imgId;
    //设置短信发送不可用
    $("#btn-passage")[0].disabled = true;
    $("#btn-passage").css({
        "background": "#ccc",
        "color": "#666"
    });

    requeset_img()
    httpRequest({
        url: AjaxUrl.member_get_user_auth_information_ajax,
        success: function (response) {
            $("#name").text(response.data.name);
            $("#identity").text(response.data.identity);
        }
    });
    //获取页面数据
    //赋值银行卡下拉框
    $.each(__DATA.bankList, function (i) {
        var $obj = __DATA.bankList;
        var $option = $("<option value=" + $obj[i].id + ">" + $obj[i].name + "</option>");
        $('#bankId').append($option);
    });

    //银行卡号验证

    $('#changeCapth').click(requeset_img)

    $('#bankCard').blur(function () {
        var reg = /^[0-9]{11,}$/;
        if (!reg.test(this.value)) {
            $(this).siblings('.bankCard-true').css('display', 'none');
            $(this).siblings('.bankCard-false').css('display', 'inline-block');
            $(this).addClass('bankCard-f');
            $(this).siblings('.input-l').addClass('text-f');
            $(this).removeAttr('pass').addClass('focus-f');
        } else {
            $('.bankCard-false').css('display', 'none');
            $(this).siblings('.bankCard-true').css('display', 'inline-block');
            $(this).removeClass('bankCard-f');
            $(this).siblings('.input-l').removeClass('text-f').end().removeClass('focus');
            $(this).attr('pass', '1').removeClass('focus-f');
            $(this).addClass('focus');
        }
        ;
    });
    //手机号码验证
    $("#mobile").on('input', function () {
        var tel = /[0-9]{9,13}$/;
        if (!tel.test(this.value)) {
            $(this).siblings('.tel-true').css('display', 'none');
            $(this).siblings('.tel-false').css('display', 'inline-block');
            $(this).addClass('tel-f');
            $(this).siblings('.input-l').addClass('text-f')
            $(this).removeAttr('pass').addClass('focus-f');
            $('#btn-passage')[0].disabled = true;
            $("#btn-passage").css({
                "background": "#ccc",
                "color": "#666"
            });
        } else {
            //验证是否符合手机号规则
            $('.tel-true').css('display', 'inline-block');
            $('.tel-false').css('display', 'none');
            $(this).removeClass('tel-f');
            $(this).siblings('.input-l').removeClass('text-f').end().removeClass('focus');
            $(this).attr('pass', '1').addClass('focus');
            $(this).removeClass('focus-f');
            if ($(".input-pass").attr('click') == "no") return false;
            $('#btn-passage')[0].disabled = false;
            $("#btn-passage").css({
                "background": "#00aa5c",
                "color": "#fff"
            });
        }
        ;

    });

    $("#bankId").on('input', function () {

        $('.bankId-false').css('display', 'none');
    });
    $(".input-pass").on('input', function () {
        $('.message-false').css('display', 'none');

    });

    //发送短信
    $('#btn-passage').click(function () {

        if($('#oldImgCapth').val()==''){
            $('.imgCapth-false').css('display','inline-block').html('请输入图形验证码');
            return
        }else{
            $('.imgCapth-false').hide();
        }

        var captcha =$('#oldImgCapth').val();

        httpRequest({
            url: AjaxUrl.captcha_send_sms_ajax,
            params: {
                mobile: $('#mobile').val(),
                type: 4,
                captcha:captcha,
                id:imgId
            },
            success: function (response) {
                timer = setInterval(function () {
                    num--;
                    $(".input-pass").attr('click', 'no');
                    $("#btn-passage")[0].disabled = true;
                    $("#btn-passage").css({
                        "background": "#ccc",
                        "color": "#666"
                    });
                    $("#btn-passage").val(num + "秒后重发");
                    if (num === 0) {
                        $(".input-pass").attr('click', 'yes');
                        $("#tel").removeAttr('readonly');
                        $("patterning").removeAttr('readonly');
                        clearInterval(timer); //一定清理
                        $("#btn-passage").val("免费获取验证码");
                        $("#btn-passage")[0].disabled = false; //不要再禁用了
                        $("#btn-passage").css({
                            "background": "#00aa5c",
                            "color": "#fff"
                        });
                        num = 60;
                    }
                    ;
                }, 1000);
            },
            error: function (response) {
                $('.imgCapth-false').css('display','inline-block').html(response.msg);
                $("#oldImgCapth").focus();
                $("#btn-passage").text("再次点击");
            }
        });
    });

    $("#cancel").click(function () {
        $(this).parents(".inform-head").parents("#inform_2").css("display", "none");
        $(".mask").css("display", "none")
    });

    //点击下一步
    $(".sub").click(function () {
        var username = $("#name").text(),
            identity = $("#identity").text(),
            mobile = $("#mobile").val(),
            bankId = $("#bankId").val(),
            bankCard = $("#bankCard").val(),
            captcha = $(".input-pass").val(),
            oNum = 0;
        if (bankCard.length < 11) {
            oNum++
            $("#bankCard").siblings(".bankCard-true").css("display", "none");
            $("#bankCard").siblings(".bankCard-false").css("display", "inline-block");
            $("#bankCard").addClass("bankCard-f");
        }
        ;
        if (mobile.length < 11) {
            oNum++
            $("#mobile").siblings(".tel-true").css("display", "none");
            $("#mobile").siblings(".tel-false").css("display", "inline-block");
            $("#mobile").addClass("tel-f");
        }
        ;
        if (captcha.length < 6) {
            oNum++
            $(".input-pass").siblings(".message-true").css("display", "none");
            $(".input-pass").siblings(".message-false").css("display", "inline-block");
            $(".input-pass").addClass("message-f");
            $(".message-false").text("请获取并输入验证码");
        }
        ;
        if (bankId == 0) {
            oNum++
            $("#bankId").siblings(".bankId-true").css("display", "none");
            $("#bankId").siblings(".bankId-false").css("display", "inline-block");
            $("#bankId").addClass("bankId-f");
        }
        ;

        if (oNum == 0) {
            Loading.open();
            httpRequest({
                url: AjaxUrl.add_loan_user_auth_information_ajax,
                params: {
                    username: username,
                    identity: identity,
                    mobile: mobile,
                    captcha: captcha,
                    bankId: bankId,
                    bankCard: bankCard,
                },
                success: function (response) {
                    Loading.close();
                    $("#btn").attr("skip", "yes");
                    $("#view-font").text("认证成功");
                    $(".mask").css("display", "block");
                    $(".inform").css("display", "block");
                    $url = response.data.url;
                },
                error: function (response) {
                    Loading.close();
                    console.log(response);
                    $("#btn").attr("skip", "no");
                    if (!response.msg)return false;
                    if (response.msg.length > 7) {
                        $("#view-font").text(response.msg).css("color", "red");
                        $(".mask").css("display", "block");
                        $(".inform").css("display", "block");
                    } else {
                        $(".input-pass").siblings(".message-false").css("display", "inline-block");
                        $(".input-pass").addClass("message-f");
                        $(".message-false").text(response.msg);
                    }
                    ;
                }
            });

        }
        ;
    });

    $("#btn").click(function () {
        if ($("#btn").attr("skip") == "no") {
            $("#cancel").click();
        } else {
            location = $url;
        }
        ;

    });
    function skip($url) {
        location = $url;
    };



    /*
     *封装图形码验证请求
     * */
    function requeset_img() {
        httpRequest({
            url: AjaxUrl.captcha_pic_generate_ajax,
            params: {
                type: 3
            },
            success: function (response) {
                var src = response.data.captcha;
                $('.main-img img').attr('src', src);
                imgId = response.data.id;
                return imgId;
            }
        })
    };
});