/**
 * 我的贷款申请
 * Created by yangdezong  on 2017/8/4.
 */

$(function () {
    // 全局变量
    console.log("aabbcc");

    $("getAmount").click(function () {
        console.log("获取金额");
    });
    
    stateJudgement();

    /*
     * 添加页面信息
     * */
    function stateJudgement() {
        // /loan/auth/quota/apply
        httpRequest({
            url: AjaxUrl.get_loan_user_credit_information_ajax,
            success: function (response) {
                if (response.data) {

                    $(".apply-for").attr("href", "javascript:void(0)");
                    $(".btnBox .apply-for").css({
                        "background": "rgb(204, 204, 204)",
                        "color": "rgb(153, 153, 153)"
                    });
                    if (response.data.status == 2) {
                        $(".btnBox .apply-for").text("待批复,请等待...");
                    } else if (response.data.status == 3) {
                        $(".btnBox .apply-for").text("已拒绝/被驳回");
                    }else if (response.data.status == 5) {
                       location.href="/loan/auth/quota/apply";
                    }
                }
            }
        });

    };

    $("#calculate").click(function () {
        Calculator.open();
    });
});