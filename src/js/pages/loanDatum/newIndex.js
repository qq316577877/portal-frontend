/**
 * Created by yl on 2017/8/9.
 */
$(function() {
    var $url;
    //添加页面数据

    init()

    // $.post("/loan/auth/get_loan_user_auth_information_ajax", function(res) {
    // 	if(res.code == 200) {
    // 		$("#username").text(res.data.username);
    // 		$("#identity").text(res.data.identity);
    // 		$("#mobile").text(res.data.mobile);
    // 	}
    // });



    //设置婚姻状况
    $(".radeioBox").on("click", "input", function(){
        $("#partnerName").val("").removeClass("focus");
        $("#partnerIdentity").val("").removeClass("focus");
        if($(this).index() == 1) {
            $(".showHide").show();
        } else {
            $(".showHide").hide();
        }
    });
    //配偶姓名
    $("#partnerName").on("input", function() {
        var value = $(this).val();
        var reg = /^[\a-z\A-Z\u4E00-\u9FA5]{2,}$/g;
        if(value.length >= 1) {
            $(this).siblings(".false").css("display", "none");
            $(this).siblings(".true").css("display", "inline-block");
            $(this).siblings(".input-l").removeClass("text-f").end().removeClass("focus-f");
            $(this).attr("pass", "1").addClass("focus");
            // yesOrNo(reg, value, $(this));
        } else {
            $(this).siblings(".false").css("display", "none");
            $(this).siblings(".true").css("display", "none");
            $(this).siblings(".input-l").removeClass("text-f").end().removeClass("focus");
        }
    });

    $("#partnerIdentity").on("input", function() {
        var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
        var value = $(this).val().trim();
        if(value.length >= 1) {
            yesOrNo(reg, value, $(this));
        } else if(value.length < 1) {
            $(this).siblings(".false").css("display", "none");
            $(this).siblings(".true").css("display", "none");
            $(this).siblings(".input-l").removeClass("text-f").end().removeClass("focus");
        }
    });

    $(".province").on("input", function() {
        $(this).siblings(".judge").css("display", "none");
    });
    $("#checkbox").click(function() {
        if($("#checkbox").is(":checked")) {
            $("#read .judge").css("display", "none");
        }

    });



    //点击下一步
    $(".sub").click(function(){
        submit()
    });

    $("#btn").click(function() {
        if($("#btn").attr("skip") == "no") {
            $("#cancel").click();
        } else {
            location = $url;
        }
    });

    // 弹出框关闭
    $("#cancel").click(function() {
        $(this).parents(".inform-head").parents("#inform").css("display", "none");
        $(".mask").css("display", "none");
    });


    /*
    * 初始化
    * */
    function init (){
        httpRequest({
            url: AjaxUrl.get_loan_credit_maritalStatus_list_ajax,
            success: function (response) {
                $(".radeioBox").empty();
                var obj = response.data.statusList;
                for(var i = 0; i < obj.length; i++) {
                    $(".radeioBox").append("<input type='radio' name='marriage' value='" + obj[i].id + "'/>" + obj[i].value);
                }
                $(".radeioBox input").eq(0).attr("checked", "checked");
            }
        });
        httpRequest({
            url: AjaxUrl.loan_get_loan_user_auth_information_ajax,
            success: function (response) {
                $("#username").text(response.data.username);
                $("#identity").text(response.data.identity);
                $("#mobile").text(response.data.mobile);
            }
        });
    }


    /*
    * 正则判断
    * */
    function yesOrNo(reg, value, $this) {
        if(!reg.test(value)) {
            $this.siblings(".true").css("display", "none");
            $this.siblings(".false").css("display", "inline-block");
            $this.siblings(".input-l").addClass("text-f" );
            $this.addClass("focus-f");
            $this.removeAttr("pass");
        } else {
            $this.siblings(".false").css("display", "none");
            $this.siblings(".true").css("display", "inline-block");
            $this.siblings(".input-l").removeClass("text-f").end().removeClass("focus-f");
            $this.attr("pass", "1").addClass("focus");
        }
    }

    /*
    * 跳转
    * */
    function submit (){
        var username = $("#username").text(), //申请人姓名
            identity = $("#identity").text(), //身份证号
            mobile = $("#mobile").text(), //贷款人手机号码
            maritalStatus = $("input:radio[name='marriage']:checked").val(), //婚姻状态，1.未婚，2.已婚，3.离异
            partnerName = $("#partnerName").val(), //配偶姓名
            partnerIdentity = $("#partnerIdentity").val(), //配偶身份证号
            countryId = $("#country").val(),
            provinceId = $(".province").find("option:selected").attr("value"),
            cityId = $(".city").find("option:selected").attr("value"),
            districtId = $(".district").find("option:selected").attr("value"),
            address = $("#address").val(),
            oNum = 0;
        if(address == "") {
            $("#address").siblings(".true").css("display", "none");
            $("#address").siblings(".false").css("display", "inline-block");
            oNum++;
        }
        if(!$("#checkbox").is(":checked")) {
            $("#read .judge").css("display", "inline-block");
            oNum++;
        }
        if(provinceId == undefined || provinceId == 100000 || countryId == 0) {
            $(".selectList .judge").css("display", "inline-block");
            oNum++;
        }
        if(maritalStatus == 2) {
            if(partnerName == "" || $("#partnerName").attr("pass") != 1) {
                oNum++;
                $("#partnerName").siblings(".false").css("display", "inline-block");
            }
            if(partnerIdentity == "" || $("#partnerIdentity").attr("pass") != 1) {
                oNum++;
                $("#partnerIdentity").siblings(".false").css("display", "inline-block");
            }
        }
        if(oNum == 0) {
            Loading.open();
            httpRequest({
                url: AjaxUrl.add_loan_user_credit_personal_ajax,
                params:  {
                    username: username, //申请人姓名
                    identity: identity, //身份证号
                    mobile: mobile, //贷款人手机号码
                    maritalStatus: maritalStatus, //婚姻状态，1.未婚，2.已婚，3.离异
                    partnerName: partnerName, //配偶姓名
                    partnerIdentity: partnerIdentity, //配偶身份证号
                    countryId: countryId,
                    provinceId: provinceId,
                    cityId: cityId,
                    districtId: districtId,
                    address: address,
                },
                success: function (response) {
                    Loading.close();
                    $("#btn").attr("skip", "yes");
                    $("#view-font").text("申请成功");
                    $(".mask").css("display", "block");
                    $(".inform").css("display", "block");
                    $url = response.data.url;
                },
                error:function (response) {
                    Loading.close();
                    $("#btn").attr("skip", "no");
                    $("#view-font").text(response.msg).css("color","red");
                    $(".mask").css("display", "block");
                    $(".inform").css("display", "block");
                }
            });
        };
    }


    /*
    * 跳转
    * */
    function skip($url) {
        location = $url;
    }
});