$(function () {
//添加class
    $(".index-nav a").eq(4).addClass("on");
    init()


    /*
     * 添加页面信息
     * */
    function init() {
        httpRequest({
            url: AjaxUrl.member_get_user_auth_information_ajax,
            success: function (response) {
                if (!response.data || response.data.enterpriseVerifyStatus != 1) {
                    $("#apply-for").css({
                        "background": "#999",
                        "color": "#666"
                    }).attr("href", "javascript:;").attr("title", "请先进行会员认证");
                };
            }
        });
    };
    $("#calculate").click(function () {
        Calculator.open();
    });

});
