$(function () {
    var t_pwd = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,20}$/; //密码正则
    var certificate;
    inLoad();
    //上个页面传值
    function inLoad() {
        var myText = window.location.search;
        certificate = myText.substring(13, myText.length);
    };

    //密码验证
    $("#pwd").focus(function () {
        if (!($(".pwd-false")[0].style.display == "inline-block")) {
            $(".hint").css("display", "inline-block")
        }
        $(this).addClass("focus");

    });
    $("#pwd").on("input", function () {
        $(".hint").css("display", "none")
        if (!t_pwd.test(this.value)) {
            $(".pwd-true").css("display", "none");
            $(".pwd-false").css("display", "inline-block");
            $(this).addClass("tel-f");
            $(this).siblings(".input-l").addClass("text-f")
            $(this).removeAttr("pass");
        } else {
            $(".pwd-true").css("display", "inline-block");
            $(".pwd-false").css("display", "none");
            $(this).removeClass("tel-f");
            $(this).siblings(".input-l").removeClass("text-f").end().removeClass("focus");
            $(this).attr("pass", "1")
        }
        ;
        if ($("#pwd1").val().length > 1) {
            twoPwd();
        }
        ;
    });

    //再次输入密码
    $("#pwd1").focus(function () {
        $(this).addClass("focus")
    });
    $("#pwd1").change(function () {
        twoPwd();
    });

    $(".sub").click(function () {
        inputNull();
        if ($("#pwd").attr("pass") == 1 && twoPwd()) {
            var password = $("#pwd").val();
            httpRequest({
                url: AjaxUrl.member_reset_password_ajax,
                params: {
                    certificate: certificate,
                    password: password
                },
                success: function (response) {
                    console.log(response);
                    $(this).attr("value", "正在提交...");
                    $(".sub")[0].disabled = true;
                    $(".sub").css("background", "#999");
                    location.href = response.data.url;
                },
                error: function (response) {
                    Prompt.alertMsg({
                        msg: "修改失败,请返回上一步",
                        type: "error"
                    });
                }
            });
        }
        ;
    });
    //判断两次密码是否一致
    function twoPwd() {
        var pwd = $("#pwd").val();
        var pwd2 = $("#pwd1").val();
        if (pwd === pwd2) {
            $(".pwd1-true").css("display", "inline-block");
            $(".pwd1-false").css("display", "none");
            $("#pwd1").removeClass("tel-f");
            $("#pwd1").siblings(".input-l").removeClass("text-f").end().removeClass("focus");
            return true;
        } else {
            $(".pwd1-true").css("display", "none");
            $(".pwd1-false").css("display", "inline-block").html('两次密码不一致');
            $("#pwd1").addClass("tel-f");
            $("#pwd1").siblings(".input-l").addClass("text-f");
            return false;
        }
        ;
    };

    function inputNull() {
        var pwd = $("#pwd").val();
        var pwd2 = $("#pwd1").val();
        if (pwd === "") {
            $(".pwd-true").css("display", "none");
            $(".pwd-false").css("display", "inline-block");
            $("#pwd").addClass("tel-f");
            $("#pwd").siblings(".input-l").addClass("text-f");
        }
        if (pwd2 === "") {
            $(".pwd1-false").text("此项必填");
            $(".pwd1-false").css("display", "inline-block");
            $("#pwd1").addClass("tel-f");
            $("#pwd1").siblings(".input-l").addClass("text-f");
            return false;
        }
        ;
    };


});