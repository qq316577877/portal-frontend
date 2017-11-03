// $(function() {
// 	$("input[type=radio]").click(function() {
// 		if($(this).val() == 1) {
// 			location.href = '/member/register/enterpriseIn?type=1'
// 		}
// 	});
//
// 	//正则
// 	//企业认证
// 	$('#enterpriseName').blur(function() {
// 		var oVal = $(this).val(),
// 			max=120,
// 			min=10,
// 			str = "企业名称应为10-120个字符";
// 		valLength(oVal,max,min,str,$(this));
// 		if(oVal.length>5){
// 			enterpriseAjax(oVal,$(this));
// 		};
// 	});
// 	$('#credential').blur(function() {
// 		var oVal = $(this).val();
// 		var RegExp = /^[0-9/a-z/A-Z]{15,}$/g;;
// 		var str = "证件号为15位或18位(数字/字母)";
// 		yesOrNo(oVal, RegExp, $(this), str);
// 	});
// 	$('#address').blur(function() {
// 		var oVal = $(this).val(),
// 			max=120,
// 			min=4,
// 			str = "详细地址为4-120个字符";
// 		valLength(oVal,max,min,str,$(this));
// 	});
// 	$('#phoneNum').blur(function() {
// 		var oVal = $(this).val();
// 		var RegExp = /^[0-9]{6,}$/g;
// 		var str = "6-20个数字";
// 		yesOrNo(oVal, RegExp, $(this), str);
// 	});
// 	$('#legalPerson').blur(function() {
// 		var oVal = $(this).val(),
// 			max=25,
// 			min=4,
// 			str = "4-25个字符";
// 		valLength(oVal,max,min,str,$(this));
// 	});
// 	$('#identity').blur(function() {
// 		var oVal = $(this).val();
// 		var RegExp = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
// 		var str = "请输入正确格式的身份证号码";
// 		yesOrNo(oVal, RegExp, $(this), str);
// 	});
//
// 	//当省发生改变
// 	$('#country').on("input",function() {
// 		$('.district ').next('.judge').css('display', 'none');
// 	});
// 	$("#address").on("input",function() {
// 		$("#address ").next(".judge").css("display", "none");
// 	});
//
// 	//	//正则验证方法
// 	function yesOrNo(val, reg, $this, str) {
// 		if(reg.test(val)) {
// 			$this.next(".judge").css("display", "none");
// 			$this.css("border", "1px solid #00aa5c");
// 			$this.removeAttr("pass");
// 		} else {
// 			$this.next(".judge").css("display", "inline-block").text(str);
// 			$this.css("border", "1px solid red");
// 			$this.attr("pass","1");
// 		}
//
// 	};
// 	//只校验长度
// 	function valLength(oVal,max,min,str,$this) {
// 		var valNum,
// 			oVal=$.trim(oVal);//去除前后空格
// 		if(oVal.length<1)return false;
// 		if(/[\u4e00-\u9fa5]/.test(oVal)){
// 			valNum=oVal.length + oVal.match(/[^x00-xff]/g).length;
// 		}else {
// 			valNum=oVal.length;
// 		};
// 		if (valNum) {
// 			if(valNum<min||valNum>max) {
// 				$this.attr('pass', '1');
// 				$this.next('.judge').css({
// 					'display': 'inline-block',
// 					'color': 'red'
// 				}).text(str);
// 				$this.css('border', '1px solid red');
// 			} else {
// 				$this.next('.judge').css('display', 'none');
// 				$this.css('border', '1px solid #00aa5c');
// 				$this.removeAttr('pass');
// 			};
// 		};
// 	};
// 	//企业判断函数
// 	function enterpriseAjax(oVal,$this){
// 		httpRequest({
// 			url:AjaxUrl.member_is_enter_name_available_ajax,
// 			params:{
// 				enterpriseName: oVal
// 			},
// 			success: function (response) {
// 				$this.removeAttr('pass');
// 			},
// 			error: function (response) {
// 				$this.attr('pass', 'no');
// 				$this.next('.judge').css('display', 'inline-block').text(data.data.msg);
// 			}
// 		});
// 	};
//
//
// 	//点击提交
// 	$('.sub').click(function() {
// 		//企业
// 		var oNum = 0;
// 		var enterpriseName = $.trim($('#enterpriseName').val());
// 		var credential = $('#credential').val();
// 		var address =$.trim($('#address').val());
// 		var phoneNum = $('#phoneNum').val();
// 		var legalPerson = $.trim($('#legalPerson').val());
// 		var identity = $('#identity').val();
//
// 		var countryId=$("#country").val();
// 	 	// var countryId = $('.country').find("option:selected").attr('value');
// 		var provinceId = $('.province').find("option:selected").attr('value');
// 		var cityId = $('.city').find("option:selected").attr('value');
// 		var districtId = $('.district').find("option:selected").attr('value');
//
// 		var licence = $('#showImg1').data('path');
// 		var identityFront = $('#showImg22').data('path');
// 		var identityBack = $('#showImg3').data('path');
//
// 	if(licence == undefined) {
// 		$("#filePicker1").parent().next().css("display","block").text("请上传图片");
// 		oNum++;
//
// 		}
// 	if(identityFront == undefined) {
// 		$("#filePicker22").parent().next().css("display","block").text("请上传图片");
// 		oNum++;
//
// 		}
// 	if(identityBack == undefined) {
// 		$("#filePicker3").parent().next().css("display","block").text("请上传图片");
// 		oNum++;
//
// 		}
//
// 		if(provinceId == undefined || provinceId == 0||countryId==0) {
// 			$(".district").next(".judge").css("display", "inline-block").text("请选择省/市/区");
// 			oNum++;
// 		}
// 		if(enterpriseName == "") {
// 			$("#enterpriseName").next(".judge").css("display", "inline-block").text("此选项不能为空");
// 			oNum++;
// 		}
// 		if($("#enterpriseName").attr("inquire")=="no") {
// 			$("#enterpriseName").next(".judge").css("display", "inline-block").text("企业已注册");
// 			oNum++;
// 		}
//
// 		if(credential == "") {
// 			$("#credential").next(".judge").css("display", "inline-block").text("此选项不能为空");
// 			oNum++;
// 		}
// 		if(address == "") {
// 			$("#address").next(".judge").css("display", "inline-block").text("此选项不能为空");
// 			oNum++;
// 		}
// 		if(phoneNum == "") {
// 			$("#phoneNum").next(".judge").css("display", "inline-block").text("此选项不能为空");
// 			oNum++;
// 		}
// 		if(legalPerson == "") {
// 			$("#legalPerson").next(".judge").css("display", "inline-block").text("此选项不能为空");
// 			oNum++;
// 		}
// 		if(identity == "") {
// 			$("#identity").next(".judge").css("display", "inline-block").text("此选项不能为空");
// 			oNum++;
// 		}
// 		if($("#address").attr("pass")==1)oNum++;
// 		if($("#enterpriseName").attr("pass")==1)oNum++;
// 		if($("#credential").attr("pass")==1)oNum++;
// 		if($("#phoneNum").attr("pass")==1)oNum++;
// 		if($("#legalPerson").attr("pass")==1)oNum++;
// 		if($("#identity").attr("pass")==1)oNum++;
//
// 		if(oNum == 0) {
// 			Loading.open();
// 			httpRequest({
// 				url:AjaxUrl.member_enterprise_auth_ajax,
// 				params:{
// 					enterpriseName: enterpriseName, //企业名称
// 					credential: credential, //证件号
// 					countryId: countryId,
// 					provinceId: provinceId,
// 					cityId: cityId,
// 					districtId: districtId,
// 					address: address,
// 					phoneNum: phoneNum, //联系电话，可能为座机
// 					legalPerson: legalPerson, //法人姓名
// 					identity: identity, //法人身份证号
// 					identityFront: identityFront, //法人身份证正面地址
// 					identityBack: identityBack, //法人身份证反面地址
// 					licence: licence //营业执照 或 社会信用代码证
// 				},
// 				success: function (response) {
// 					Loading.close();
// 					Prompt.alertMsg({
// 						msg:"提交成功",
// 						btnClick:function () {
// 							location.href = "/member/enterprise/auth/auditSucceed";
// 						}
// 					});
// 				},
// 				error: function (response) {
// 					Loading.close();
// 					Prompt.alertMsg({
// 						msg:response.msg
// 					});
// 				}
// 			});
// 		};
// 	});
// 	$("#cancel").click(function() {
// 		$(this).parents(".inform-head").parents("#inform_2").css("display", "none");
// 		$(".mask").css("display", "none")
// 	});
// 	$("#btn").click(function() {
// 							$("#cancel").click();
// 	});
// 	//获取国家
// 	httpRequest({
// 		url:AjaxUrl.common_supported_countries_ajax,
// 		success: function (response) {
// 			$.each(response.data, function(k, v) {
// //			console.log(k, v)
// 				$('.country').append('<option value=' + v.id + ' data-tel="'+v.areaCode+'">' + v.name +v.areaCode+ '</option>');
// 				$("#country").append('<option value=' + v.id + ' data-tel="'+v.areaCode+'">' +v.name+ '</option>');
//
// 			});
// 		}
// 	});
//
// 	//当国家值改变
// 	$("#country").change(function() {
// 		var id = $("#country").val();
// 		if(id==0){
// 			$('.province').html('<option value="0">选择省</option>');
// 			$('.city').html('<option value="0">选择市</option>');
// 			$('.district').html('<option value="0">选择区</option>');
// 		}
// 		countryAjax(id);
//
// 	});
// 	function countryAjax(countryId,provinceId,cityId,districtId) {
// 		httpRequest({
// 			url:AjaxUrl.common_supported_cities_ajax,
// 			params:{
// 				countryId:countryId
// 			},
// 			success: function (response) {
// 				$(".selectList").each(function() {
// 					var areaJson = response.data;
// 					console.log(areaJson);
// 					var temp_html;
// 					var oProvince = $(this).find(".province");
// 					var oCity = $(this).find(".city");
// 					var oDistrict = $(this).find(".district");
// 					//初始化省
// 					var province = function() {
// 						$.each(areaJson, function(i, province) {
// 							temp_html += "<option value='" + province.id + "'>" + province.name + "</option>";
// 						});
// 						oProvince.html(temp_html);
// 						city();
// 					};
// 					//赋值市
// 					var city = function() {
// 						temp_html = "";
// 						var n = oProvince.get(0).selectedIndex;
// 						$.each(areaJson[n].cities, function(i, city) {
// 							temp_html += "<option value='" + city.id + "'>" + city.name + "</option>";
// 						});
// 						oCity.html(temp_html);
// 						district();
// 					};
// 					//赋值县
// 					var district = function() {
// 						temp_html = "";
//
// 						var m = oProvince.get(0).selectedIndex;
// 						var n = oCity.get(0).selectedIndex;
// 						if(typeof(areaJson[m].cities[n].areas) == "undefined") {
// 							oDistrict.css("display", "none");
// 						} else {
// 							oDistrict.css("display", "inline");
// 							$.each(areaJson[m].cities[n].areas, function(i, district) {
// 								temp_html += "<option value='" + district.id + "'>" + district.name + "</option>";
// 							});
// 							oDistrict.html(temp_html);
// 						};
// 					};
// 					//选择省改变市
// 					oProvince.change(function() {
// 						city();
// 					});
// 					//选择市改变县
// 					oCity.change(function() {
// 						district();
// 					});
// 					province();
// 					if(!provinceId)return false;
// 					$('.province').val(provinceId);
// 					$('.province').change();
// 					$('.city').val(cityId);
// 					$('.city').change();
// 					$('.district').val(districtId);
// 				});
// 			}
// 		});
// 	};
// });