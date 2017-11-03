$(function () {

    // form 加上校验
    $("#loginForm").validate({
        errorClass: 'error formError errorBottom', // default input error message class
        debug: false, //调试模式取消submit的默认提交功能
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        onkeyup: false,
        submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form
            var checked= $('#checkbox')[0].checked;
            var value=checked?1:0;
            login(value)
        },
        rules: {
            usename: {
                required:true,
                rangelength:[11,11],
                isMobile:true
            },
            pwd: "required"
        },
        messages: {
            usename:{
                required: "请输入手机号",
                rangelength: "请输入有效的手机号",
                isMobile:"请输入有效手机号"
            },
            pwd: "请输入密码",
        }
    });

    //定义变量
    var tel = /0?(13|14|15|17|18)[0-9]{9}$/;
    var url = location.href;
    //直接点击登陆
    $('.login').click(function () {
        $("#loginForm").submit();
    });

    //点击登录
    $("body").keydown(function() {
        if (event.keyCode == 13) {//keyCode=13是回车键
            var checked= $('#checkbox')[0].checked;
            var value=checked?1:0;
            login(value);
        }
    });

    /*
    * 封装登录请求
    * */
    function login(id) {
        var requestParams = {
            mobile: $('#usename').val(),
            password: $('#pwd').val(),
            auto_login: id
        };
        // 请求
        var data ={
            mobile: $('#usename').val(),
            password: $('#pwd').val(),
            auto_login: id
        };
        data =JSON.stringify(data);
        httpRequest({
            url: AjaxUrl.member_login_ajax,
            params: data,
            contentType:'application/json;charset=utf-8',

            success: function (response) {
                $('.tel-false').css('display', 'none')
                removec(this, 'focus');
                removec(this, 'focus-f');
                var url = new Url(location.href);
                location.href=decodeURIComponent(url.search("redir")) || "/home";
            },
            error:function (response) {
                $('.pwd-false-1').css('display', 'block');
                $('.pwd-false').css('display', 'none');
                addc(this, 'focus-f');
            }
        });
    }

    /*
    * 封装添加类名函数函数
    * */
    function addc(dom, classname) {
        $(dom).siblings('.usename-icon').addClass(classname).end().addClass(classname);
        $(dom).siblings('.usename-icon').children('.yonghu').addClass(classname);
    }

    /*
    * 封装移除类名函数函数
    * */
    function removec(dom, classname) {
        $(dom).siblings('.usename-icon').removeClass(classname).end().removeClass(classname);
        $(dom).siblings('.usename-icon').children('.yonghu').removeClass(classname);
    }
})
