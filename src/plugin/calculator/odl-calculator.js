$(function(){
	//打开关闭计算器
	$("#calculate").click(function () {

		//获取月利率
		$.ajax({
			url:'/loan/info/get_loan_info_interest_rate_ajax',
			type:'post',
			success: function (data) {
				var monthInterestRate =data.data.monthInterestRate;
				monthInterestRate=monthInterestRate*100;
				$('#monthRet').html(monthInterestRate+'%');
			}
		})

        $(".mask").css("display", "block");
        $(".inform").css("display", "block");
		$("#inform_1").css("display", "none");
		$('#inform4').css('display','none');
		$('#address_inform').css('display','none');

    });
     $("#cancel").click(function () {
    	$("#btn_2").click();
        $(this).parents(".inform-head").parents("#inform_2").css("display", "none");
        $(".mask").css("display", "none")
    });

	//贷款计算器
	$("#money_loan").on("input",function(){
		var oVal=$(this).val();
		var Reg=/^(0\.\d{1,2}|[1-9]\d*(\.\d{1,2})?)$/;
		if(Reg.test(oVal)){
			$("#empty").css("display","none");
			$(".inform-body .error").hide();
		} else {
			$("#empty").text("请输入正整数").css({
				"color":"red",
				"display":"block"
			});
		}

	});
	$("#money-day").on("input",function(){
		var oVal=$(this).val();
		var Reg=/^[0-9]{0,}$/;
		if(Reg.test(oVal)){
			$("#wrong-day").css("display","none");
			$(".inform-body .error").hide();
		} else {
			$("#wrong-day").text("请输入数字").css({
				"color":"red",
				"display":"block"
			});
		}

	});
 $("#btn_1").click(function () {

	 if($("#money_loan").val()==""){
 		$("#empty").text("请输入数字").css({
				"color":"red",
				"display":"block"
			});
 	}else if($("#money-day").val()==""){
 		$("#wrong-day").text("请输入数字").css({
				"color":"red",
				"display":"block"
			});
 	}else if ($("#empty").css("display") == "block" || $("#wrong-day").css("display") == "block") {
            $(".inform-body .error").show();
        } else {
        	var time=$("#money-day").val();
            var ret = (parseInt($("#money-day").val())) / 30;
            var money_1 = $("#money_loan").val();
		 console.log(ret);
		 interests = ret *(parseInt($('#monthRet').html())/100)* (parseInt($("#money_loan").val()));
            service = (parseInt($("#money_loan").val())) * 0.001;
            $("#principal").text("到期还本金：" + money_1 + "元");
            $("#interest").text("借满"+time+"天总利息：" + interests.toFixed(2) + "元");
            $("#coverCharge").text("借款服务费：" + service + "元");
            $(".loan-details").show();

        }
    });
    //重置计算器
    $("#btn_2").click(function () {
        $("#money_loan").val("");
        $("#money-day").val("");
        $("#empty").hide();
         $("#wrong-day").hide();
        $(".loan-details").hide();
    });
})

   
