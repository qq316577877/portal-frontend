$(function () {

    addInfo()

    /*
     * 添加页面数据
     * */
    function addInfo() {
        httpRequest({
            url: AjaxUrl.member_get_user_auth_information_ajax,
            success: function (response) {
                $(".telNum").text(response.data.mobile);
            }
        });
    }
})