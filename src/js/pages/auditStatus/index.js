$(function () {
    init();


    $('.sub').click(function () {
        var type = $("#stateType").data("type");
        if (type == 1) {
            location.href = '/member/register/enterprise?type=1'
        } else {
            location.href = '/member/register/enterprise'
        }

    });

    /*
    * 初始化
    * */
    function init (){
        //获取状态
        httpRequest({
            url: AjaxUrl.member_enterprise_auth_status_ajax,
            success: function (response) {
                var $type = response.data.enterpriseVerifyStatus;
                var $text = response.data.rejectNote;
                if ($type == 1) {
                    $('#typeText').css('color', '#00AA5C');
                } else if ($type == 2) {
                    $('#typeText').css('color', '#333');
                } else if ($type == 3) {
                    $('#typeText').css('color', '#FC0');
                } else if ($type == 4) {
                    $('#typeText').css('color', 'red');
                    $('#rejectNote').text($text).css('color', 'red');
                    $('.main .cause').css('display', 'inline-block');
                    $('.mainBox .sub').css('display', 'block');
                }
            }
        });

        // 获取内容
        httpRequest({
            url: AjaxUrl.member_get_user_auth_information_ajax,
            success: function (response) {
                var $obj = response.data;
                console.log($obj);
                $('#typeText').text($obj.enterpriseVerifyStatusDesc);
                $('.two #stateType').text($obj.typeDesc).attr('data-type', response.data.type);

                if ($obj.type == 2) {
                    $('#enterprise').show();
                    $('#enterpriseName').text($obj.enterpriseName);
                    $('#credential').text($obj.credential);
                    $('#area').text($obj.countryName + $obj.provinceName + $obj.cityName + $obj.districtName);
                    $('#address').text($obj.address);
                    $('#phoneNum').text($obj.phoneNum);
                    $('#name').text($obj.name);
                    $('#identity').text($obj.identity);
                    $('#licence').attr('src', $obj.licence);
                    $('#identityFront').attr('src', $obj.identityFront);
                    $('#identityBack').attr('src', $obj.identityBack);

                } else if ($obj.type == 1) {
                    $('.showHide').eq(1).css('display', 'block');
                    $('#pre-name').text($obj.name);
                    $('#pre-identity').text($obj.identity);
                    $('#pre-area').text($obj.countryName + $obj.provinceName + $obj.cityName + $obj.districtName);
                    $('#pre-address').text($obj.address);
                    $('#pre-phoneNum').text($obj.phoneNum);
                    $('#pre-attachmentOne').attr('src', $obj.attachmentOne);
                    $('#pre-attachmentTwo').attr('src', $obj.attachmentTwo);
                    $('#pre-identityFront').attr('src', $obj.identityFront);
                    $('#pre-identityBack').attr('src', $obj.identityBack);

                    $('#pre .imgList li:nth-of-type(3) p').html('个人身份证正面')
                    $('#pre .imgList li:nth-of-type(4) p').html('个人身份证反面')
                }
            }
        });
    }
})