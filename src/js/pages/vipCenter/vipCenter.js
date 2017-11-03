$(function () {
    var num = 60;
    var certificate;//旧手机认证信息
    var t_email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;//邮箱正则
    var timer1, timer2;
    var tel = /0?(13|14|15|17|18)[0-9]{9}$/;//电话正则
    var qqCheck = /[1-9][0-9]{3,}/;//qq正则
    var capthCheck = /[0-9]{6,}/; //短信验证码
    var imgId;
    // 加跳转会员认证
    $(".attestation .skip").attr("href", "/member/register/enterpriseIn");
    // 会员认证状态
    //初始化
    init();

    $("#changePwd").validate({
        debug: false, //调试模式取消submit的默认提交功能
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        onkeyup: false,
        submitHandler: function (form) {   //表单提交句柄,为一回调函数，带一个参数：form
            console.log('submitHandler');
            changeNewPwd();
        },
        rules: {
            oldpwd: {
                required: true,
                isPassWord: true
            },
            newpwd: {
                required: true,
                isPassWord: true
            },
            newpwd2: {
                required: true,
                equalTo: "#newpwd"
            }
        },
        messages: {
            oldpwd: {
                required: "请输入原密码",
            },
            newpwd: "输入错误",
            newpwd2: "两次密码不一致",
        }
    });

    // 更新状态值


    $('.main-l ul:nth-of-type(1) li:nth-of-type(1) a').css('color', '#00aa5c');


    $('#changeTel').click(function () {
        alertUpdateTel();
    });
    $('.cancel').click(function () {
        $('.mask').hide();
        $('#oldImgCapth').val('')
        //setTimeout(resetDom, 1000)
    });
    $('.nextStep-2').click(function () {
        $('.inform-2').css('display', 'none');
        $('.mask').css('display', 'none');
        history.go(0);
    });

    // 手机号输入校验
    $('.newTel').on('input', checkNewTelType);

    //发送短信验证
    $('#old-telBtn').click(oldTelCapth)
    //发送短信验证码（登录状态）
    $('.nextStep').click(capthNext);
    //点击下一步
    $('.nextStep-1').click(checkNewTel)

    //绑定邮箱
    $('.skip-email').click(function () {
        $('.wrong-email').css('display', 'none');
        alertEmailUpdate();
    });
    //$('.new_email').blur(checkEmail);

    $('.nextStep-3').click(bindEmail);

    $('.nextStep-4').click(function () {
        $('.inform-4').css('display', 'none');
        $('.mask').css('display', 'none');
        history.go(0);
    });

    // 修改qq邮箱 弹框
    $('.skip-qq').click(skipQQ);

    //  qq校验 下一步
    $('.nextStep-7').click(changeQQ);

    // 修改qq 关闭事件
    $('.nextStep-8').click(function () {
        $('.inform-8').css('display', 'none');
        $('.mask').css('display', 'none');
        history.go(0);
    });

    //修改密码
    $('#revise').click(clickReviewPwd);
    // 修改密码提交

    $('.nextStep-5').click(function () {
        $("#changePwd").submit();

    })
    $('.nextStep-6').click(function () {
        $('.inform-6').css('display', 'none');
        $('.mask').css('display', 'none');
    });


    // 绑定邮箱
    $('#update_email').click(function () {
        $('.inform-3 .wrong-email').css('display', 'none');
        alertEmailUpdate();
    });
    // 绑定修改手机号
    $('#update_phone').click(function () {
        alertUpdateTel();
    });

    //控制qq长度
    $('.new_qq').on('input propertychange', function () {
        checkQQLenghth()
    })

    /*
     * 初始化 判断会员认证状态 邮箱绑定状态
     * */
    function init() {
        var enterpriseVerifyText = "";
        switch (__DATA.enterpriseVerifyStatus) {
            case 1:
                enterpriseVerifyText = "已认证";
                break;
            case 2:
                enterpriseVerifyText = "未认证";
                break;
            case 3:
                enterpriseVerifyText = "认证审核中";
                break;
            case 4:
                enterpriseVerifyText = "认证未通过";
                break;
        }
        $(".attestation i").text(enterpriseVerifyText);


        // 判断邮箱是否存在
        if (__DATA.mail) {
            var htmlstr = "<i class='able fl'></i><span class='fl'>已启用</span>"
            $(".using").eq(0).html(htmlstr);
        }
        ;

        //会员认证通过按钮消失
        httpRequest({
            url: AjaxUrl.member_get_user_auth_information_ajax,
            success: function (response) {
                if (!response.data) return false;
                $(".skip").eq(1).text("查看会员认证");
            }
        })


        //发送请求
        var useTel = __DATA.mobile;
        $('#tel').html(useTel);
        $('.using-info')[1].innerHTML = useTel;
        $('.account').eq(3).find('i').html(__DATA.qq);
        if (__DATA.mail == null || __DATA.mail == '') {
            $('.account').eq(2).find('i').html('未绑定邮箱');
            $('.using-info').eq(0).html('未绑定邮箱，绑定后可接收重要订单通知')
            $('#update_email').html('绑定');
            $('.skip-email').html('绑定邮箱')
        } else {
            $('.account').eq(2).find('i').html(__DATA.mail);
            $('.using-info').eq(0).html(__DATA.mail);
            $('#update_email').html('修改');
            $('.skip-email').html('修改邮箱')
        }
        ;

        if (__DATA.qq == null || __DATA.qq == '') {
            $('.skip-qq').html('绑定QQ')
        }
    }

    /*
     *修改手机号
     * */
    function alertUpdateTel() {
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
            $('.inform').css('display', 'none')
            $('.inform-1').css('display', 'none')
            $('.inform-2').css('display', 'block')
        }
        console.log($('#old-telBtn').html());
        if($('#old-telBtn').html()!='获取短信验证码'){
            $('#old-telBtn').attr('disabled',true)
        }else{
            $('#old-telBtn').removeAttrs('disabled')
        }
        //$('#old-telBtn').html('免费获取验证码')
        $('.mask').css('display', 'block');
        $('#old-Null').css('display', 'none');
        $('.mask').addClass('animated pulse');
        $('.inform').css('display', 'block');
        $('.inform-1').css('display', 'none');
        $('.inform-2').css('display', 'none');
        $('.inform-3').css('display', 'none');
        $('.inform-4').css('display', 'none');
        $('.inform-5').css('display', 'none');
        $('.inform-7').css('display', 'none');
        $('.inform-8').css('display', 'none');
        var useTel = __DATA.mobile;
        $('.oldTel').html(useTel);
        requeset_img()
    };

    /*
     * 更换验证码
     * */
    $('.mask').on('click', '#changeCapth', function () {
        requeset_img();
        $('#oldImgCapth').val('');
    })

    /*
     * 短信验证码定时器
     * */
    function resetDom() {
        $("input").val("");
        num = 60;
        $('#old-telBtn').text("获取短信验证码");
        $('#old-telBtn')[0].disabled = false;//不要再禁用了
        $('#old-telBtn').css({
            'background': '#00aa5c',
            "color": "#fff"
        });
        // if (timer)clearInterval(timer);
    };


    /*
     * 校验手机号共同方法
     * */
    function checkTel(telphone) {
        if (!tel.test(telphone)) {
            $('.tel-true').css('display', 'none');
            $('.tel-false').css('display', 'inline-block');
            $("#tel").addClass('tel-f');
            $("#tel").siblings('.input-l').addClass('text-f');
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
                    mobile: telphone
                },
                success: function (response) {
                    $('.tel-verify-w').css('display', 'none');
                    $('.tel-verify-r').html(response.msg);
                    $('.tel-verify-r').css('display', 'inline-block');
                    $('#tel').attr('pass', '1');
                },
                error: function (response) {
                    $('.tel-verify-r').css('display', 'none');
                    $('.tel-verify-w').html('手机已被注册');
                    $('.tel-verify-w').css('display', 'inline-block');
                }
            })
        }
    }

    /*
     * 新手机号校验
     * */
    function checkNewTelType() {
        var telNum = $('.newTel').val().length;
        var $click = $('.newTel').attr("click");
        if (telNum >= 10 && $click == "no" || telNum <= 11) {
            if ($click == "no")return false;
            $('#new-telBtn')[0].disabled = false;
            $('#new-telBtn').css({
                'background': '#00aa5c',
                "color": "#fff"
            });
            $('.wrong-tel').css('display', 'none');
            // checkTel(this.value);
        } else {
            $('#new-telBtn')[0].disabled = true;
            $('#new-telBtn').css({
                'background': '#ccc',
                "color": "#666"
            });
        }
    }

    /*
     * 旧手机验证码校验
     * */
    function oldTelCapth() {
        if($('#oldImgCapth').val()==''){
            $('#falseImgCapth').html('请输入图形验证码').show();
            return
        }else{
            $('#falseImgCapth').hide()
        }
        var useTel = __DATA.mobile;

        var captcha =$('#oldImgCapth').val();


        httpRequest({
            url: AjaxUrl.captcha_send_sms_ajax,
            params: {
                mobile: useTel,
                type: 3,
                captcha:captcha,
                id:imgId
            },
            success: function (response) {
                $('#old-telBtn')[0].disabled = true;
                $('#old-telBtn').css({
                    'background': '#ccc',
                    "color": "#666"
                });

                timer = setInterval(function () {
                    num--;
                    $('#old-telBtn').html(num + "秒后重发");

                    if (num === 0) {
                        clearInterval(timer); //一定清理
                        $('#old-telBtn').html('免费获取验证码');
                        $('#old-telBtn')[0].disabled = false;//不要再禁用了
                        num = 60;
                        $('#old-telBtn').css({
                            'background': '#00aa5c',
                            "color": "#fff"
                        });
                    }
                }, 1000)
            },
            error: function () {
                $('#falseImgCapth').html('验证码错误').show()
            }
        })
    }

    /*
     * 输入手机验证码后点击下一步
     * */
    function capthNext() {
        if ($('#old-img').val() == "") {
            $('#old-Null').text("验证码不能为空");
            $('#old-Null').css('display', 'block')
        } else if ($('#old-img').val().length != 6) {
            $('.inform #old-Null').css('display', 'block');
            $('.inform #old-Null').html('请输入6位数字验证码');
            return
        }

        else {
            $('#old-Null').css('display', 'none');
            httpRequest({
                url: AjaxUrl.member_check_current_mobile_ajax,
                params: {
                    captcha: $('#old-img').val()
                },
                success: function (response) {
                    //验证码正确
                    //下一个弹出框出现
                    clearInterval(timer); //一定清理
                    $('.inform').css('display', 'none');
                    $('.inform-1').css('display', 'block');
                    $('#old-img').val('');

                    // 清空
                    $('.newTel').val('');
                    $('.img-1').val('');
                    $('.inform #old-Null').css('display', 'none');
                    requeset_img();
                    // $('.gain-1').css('disabled',true);
                    $('#new-telBtn')[0].disabled = true;//不要再禁用了


                    $('.gain').html('免费获取验证码');
                    //$('.gain-1')[0].disabled = true;
                    // 更换手机窗口
                    certificate = response.data.certificate;
                    num = 60;
                    //再次发送验证码
                    $('#new-telBtn').click(function () {

                        var oTel = $(".newTel").val();

                        if($('#NewImgCapthNew').val()==''){
                            $('#falseImgCapthNew').show().html('请输入验证码');
                            return
                        }else{
                            $('#falseImgCapthNew').hide()
                        }

                        if (tel.test(oTel)) {
                            oldNewTel(oTel);
                        } else {
                            $('.wrong-tel').css('display', 'block')
                        }

                    })
                },
                error: function (response) {
                    $('#old-Null').text(response.msg);
                    $('#old-Null').css('display', 'block');
                }
            })
        }
    }

    /*
     * 手机号校验
     * */
    function oldNewTel(tel) {
        httpRequest({
            url: AjaxUrl.member_check_mobile_ajax,
            params: {
                mobile: tel
            },
            success: function (response) {
                $(".wrong-tel").css("display", "none");
                $(".newTel").attr("click", "no");

                var captcha =$('#NewImgCapthNew').val();
                httpRequest({
                    url: AjaxUrl.captcha_send_sms_ajax,
                    params: {
                        mobile: $('.newTel').val(),
                        type: 3,
                        captcha:captcha,
                        id:imgId
                    },
                    success: function (response) {
                        if(response.code==200){
                            $("#new-telBtn").disabled = true;
                            $("#new-telBtn").css({
                                'background': '#ccc',
                                "color": "#666"
                            });
                            timer1 = setInterval(function () {
                                num--;
                                // clearInterval(timer1)
                                $('#new-telBtn').html(num + "秒后重发");
                                if (num === 0) {
                                    $(".newTel").attr("click", "yes")
                                    clearInterval(timer1); //一定清理
                                    $('#new-telBtn').html('免费获取验证码');
                                    $('#new-telBtn')[0].disabled = false;//不要再禁用了
                                    num = 60;
                                    $('#new-telBtn').css({
                                        'background': '#00aa5c',
                                        "color": "#fff"
                                    });
                                }
                            }, 1000);
                        }else{
                            $('#falseImgCapthNew').show().html(response.msg)
                        }
                    },
                    error: function (response) {
                        $('#falseImgCapthNew').show().html(response.msg)
                    }
                })
            },
            error: function (response) {
                $(".wrong-tel").text(response.msg).css("display", "block");
            }
        })
    };

    /*
     * 弹出邮箱修改框
     * */
    function alertEmailUpdate() {
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
        }
        $('.mask').css('display', 'block');

        $('.inform').css('display', 'none');
        $('.inform-1').css('display', 'none');
        $('.inform-2').css('display', 'none');
        $('.inform-3').css('display', 'block');
        $('.inform-4').css('display', 'none');
        $('.inform-5').css('display', 'none');
        $('.inform-7').css('display', 'none');
        $('.inform-8').css('display', 'none');
    }

    /*
     * 验证新手机
     * */
    function checkNewTel() {
        var checkFlag = true;
        if ($('.img-1').val() == "") {
            $('.wrong-1').html('验证码不能为空');
            $('.wrong-1').css('display', 'block');
            checkFlag = false;
        }
        if ($('.img-1').val().length != 6) {
            $('.inform-1 .wrong-1').css('display', 'block');
            $('.inform-1 .wrong-1').html('请输入6位数字验证码');
            return
        }
        if ($('.newTel').val() == "") {
            $('.wrong-tel').html('请输入正确的手机号');
            $('.wrong-tel').css('display', 'block');
            checkFlag = false;
        }
        if (!checkFlag) {
            return;
        }
        $('.inform-1 .wrong-1').css('display', 'none');

        httpRequest({
            url: AjaxUrl.member_new_mobile_ajax,
            params: {
                mobile: $('.newTel').val(),
                certificate: certificate,
                captcha: $('.img-1').val()
            },
            success: function (response) {
                //验证码正确
                //下一个弹出框出现
                $('.inform-1').css('display', 'none');
                $('.inform-2').css('display', 'block');

                var tag = '<p>修改绑定手机成功！</p>' +
                    '<p>新手机号码为：' + $('.newTel').val() + '</p>';
                $('.inform-2 .inform-body-2').html(tag);
                $('.nextStep-2').click(function () {
                    $('.inform-2').css('display', 'none');
                    $('.mask').css('display', 'none');
                    history.go(0);
                })
            },
            error: function (response) {
                $('.wrong-1').html(response.msg);
                $('.wrong-1').css('display', 'block')
            }
        })
    }

    /*
     * 绑定新邮箱
     * */
    function bindEmail() {
        if ($('.new_email').val() == '') {
            $('.wrong-email span').html('邮箱不能为空');
            $('.wrong-email').css('display', 'block');
            return
        } else if (!t_email.test($('.new_email').val())) {
            $('.wrong-email').html('邮箱格式错误');
            $('.wrong-email').css('display', 'block');
            return
        } else {
            $('.wrong-email').css('display', 'none')
        }
        httpRequest({
            url: AjaxUrl.member_binding_mail_ajax,
            params: {
                mail: $('.new_email').val()
            },
            success: function (response) {
                $('.inform-3').css('display', 'none');
                $('.inform-4').css('display', 'block');
            },
            error: function (response) {
                $('.wrong-email').css('display', 'block');
                $('.wrong-email span').html(response.msg)

            }
        })
    }


    /*
     * 修改qq弹窗
     * */
    function skipQQ() {
        $('.wrong-email').css('display', 'none');
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
        }
        $('.mask').css('display', 'block');

        $('.inform').css('display', 'none');
        $('.inform-1').css('display', 'none');
        $('.inform-2').css('display', 'none');
        $('.inform-3').css('display', 'none');
        $('.inform-4').css('display', 'none');
        $('.inform-5').css('display', 'none');
        $('.inform-7').css('display', 'block');
        $('.inform-8').css('display', 'none');
    }


    /*
     * 修改qq
     * */
    function changeQQ() {
        $('.wrong-email').css('display', 'none');
        // 校验
        var qq = $('.new_qq').val();
        if (qq === "") {
            $('.wrong-email span').text('QQ不能为空');
            $('.wrong-email').css('display', 'block');
            return;
        }
        ;
        if (!qqCheck.test(qq)) {
            $('.wrong-email span').text('请输入4-11位QQ号');
            $('.wrong-email').css('display', 'block');
            return;
        }
        httpRequest({
            url: AjaxUrl.member_modify_qq_ajax,
            params: {
                qq: $('.new_qq').val()
            },
            success: function (response) {
                $('.inform-7').css('display', 'none');
                $('.inform-8').css('display', 'block');
                $('.inform-4').css('display', 'none');
            },
            error: function (response) {
                $('.wrong-email span').text(response.msg);
                $('.wrong-email').css('display', 'block');
            }
        })
    }


    /*
     * 修改密码弹窗
     * */
    function clickReviewPwd() {
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
        }
        $('.mask').css('display', 'block');
        $('.fail-pwd').css('display', 'none');
        $('.inform').css('display', 'none');
        $('.inform-1').css('display', 'none');
        $('.inform-2').css('display', 'none');
        $('.inform-3').css('display', 'none');
        $('.inform-4').css('display', 'none');
        $('.inform-5').css('display', 'block');
        $('.inform-7').css('display', 'none');
        $('.inform-8').css('display', 'none');
    }

    /*
     * 修改密码
     * */
    function changeNewPwd() {
        httpRequest({
            url: AjaxUrl.member_modify_pwd_ajax,
            params: {
                oldPassword: $('.oldpwd').val(),
                newPassword: $('.newpwd').val()
            },
            success: function (response) {
                $('.inform-5').css('display', 'none');
                $('.inform-6').css('display', 'block');
            },
            error: function (response) {
                // 提交不成功
                //$('.fail-pwd').text(response.msg);
                $('.fail-pwd').text('原密码输入错误');
                $('.fail-pwd').css('display', 'block');
                $('.newpwd2-w').css('display', 'none')
            }
        })
    }

    /*
     * 控制qq长度
     * */
    function checkQQLenghth() {
        if (!qqCheck.test($('.new_qq').val())) {
            $('.inform-7 .wrong-email').css('display', 'block');
            $('.inform-7 .wrong-email span').html('请输入4-11位QQ号');
        } else {
            $('.inform-7 .wrong-email').css('display', 'none');
        }
    }

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
})