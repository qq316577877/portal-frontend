// $(function() {
// 	$("input[type=radio]").click(function() {
// 		if($(this).val() == 2) {
// 			location.href = "/member/register/enterpriseIn"
// 		}
// 	});
// 	//正则
// 	//个人认证
// 	$("#per-name").blur(function() {
// 		var oVal = $(this).val(),
// 			max=25,
// 			min=4,
// 			str = "4-25个字符";
// 		valLength(oVal,max,min,str,$(this));
// 	});
// 	$("#per-identity").blur(function() {
// 		var oVal = $(this).val();
// 		var RegExp =/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
// 		var str = "请输入正确格式的身份证号码";
// 		yesOrNo(oVal, RegExp, $(this), str);
// 	});
// 	$("#per-phoneNum").blur(function() {
// 		var oVal = $(this).val();
// 		var RegExp = /^[0-9]{6,}$/g;
// 		var str = "6-20位(数字)";
// 		yesOrNo(oVal, RegExp, $(this), str);
// 	});
// 	//当省发生改变
// 	$(".province").on("input",function() {
// 		$(".district ").next(".judge").css("display", "none");
// 	});
// 	$("#per-address").on("input",function() {
// 		$("#per-address ").next(".judge").css("display", "none");
// 	});
// //	//正则验证方法
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
// 	//点击提交
// 	$(".sub").click(function() {
// 		var oNum = 0;
// 		var name = $.trim($("#per-name").val());
// 		var identity = $("#per-identity").val();
// 		var address =  $.trim($("#per-address").val());
// 		var phoneNum = $("#per-phoneNum").val();
// 		var countryId = $("#country").val();
// 		var provinceId = $(".province").val();
// 		var cityId = $(".city").val();
// 		var districtId = $(".district").val();
// 		var attachmentOne = $("#showImg1").data("path");
// 		var attachmentTwo= $("#showImg4").data("path");
// 		var identityFront = $("#showImg22").data("path");
// 		var identityBack = $("#showImg3").data("path");
//
// 		if(attachmentOne == undefined) {
// 			$("#filePicker1").parent().next().css("display","block").text("请上传图片");
// 			oNum++;
// 		}
// 		if(attachmentTwo == undefined) {
// 			$("#filePicker4").parent().next().css("display","block").text("请上传图片");
// 			oNum++;
// 		}
// 		if(identityFront == undefined) {
// 			$("#filePicker22").parent().next().css("display","block").text("请上传图片");
// 			oNum++;
// 		}
// 		if(identityBack == undefined) {
// 			$("#filePicker3").parent().next().css("display","block").text("请上传图片");
// 			oNum++;
// 		}
//
//
// 		if(provinceId == undefined || provinceId == 0 ||countryId==0) {
// 			$(".district ").next(".judge").css("display", "inline-block").text("请选择省/市/区");
// 			oNum++;
// 		}
// 		if(name == "") {
// 			$("#per-name").next(".judge").css("display", "inline-block").text("此选项不能为空");
// 			oNum++;
// 		}
// 		if(identity == "") {
// 			$("#per-identity").next(".judge").css("display", "inline-block").text("此选项不能为空");
// 			oNum++;
// 		}
// 		if(address == "") {
// 			$('#per-address').next('.judge').css('display', 'inline-block').text('此选项不能为空');
// 			oNum++;
// 		}
// 		if(phoneNum == '') {
// 			$('#per-phoneNum').next('.judge').css('display', 'inline-block').text('此选项不能为空');
// 			oNum++;
// 		}
// 		if($("#per-address").attr("pass")==1)oNum++;
// 		if($("#per-name").attr("pass")==1)oNum++;
// 		if($("#per-identity").attr("pass")==1)oNum++;
// 		if($("#per-phoneNum").attr("pass")==1)oNum++;
// 		if(oNum == 0) {
// 			Loading.open();
// 			httpRequest({
// 				url:AjaxUrl.member_personal_auth_ajax,
// 				params:{
// 					name: name,
// 					identity: identity, //身份证号
// 					countryId: countryId,
// 					provinceId: provinceId,
// 					cityId: cityId,
// 					districtId: districtId,
// 					address: address,
// 					phoneNum: phoneNum, //联系电话，可能为座机
// 					identityFront: identityFront, //身份证正面地址
// 					identityBack: identityBack, //身份证反面地址
// 					attachmentOne: attachmentOne, //附件1地址
// 					attachmentTwo: attachmentTwo //附件2地址
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
// 		$("#cancel").click();
// 	});
// //获取国家
// 	$.post(AjaxUrl.common_supported_countries_ajax,function(response){
// 		$.each(response.data, function(k, v) {
// 			$('.country').append('<option value=' + v.id + ' data-tel="'+v.areaCode+'">' + v.name +v.areaCode+ '</option>');
// 			$("#country").append('<option value=' + v.id + ' data-tel="'+v.areaCode+'">' +v.name+ '</option>');
// 		});
// 	});
// 	//当国家值改变
// 	$("#country").change(function() {
// 		var id = $("#country").val();
// 		// console.log(id);
// 		if(id==0){
// 			$('.province').html('<option value="0">选择省</option>');
// 			$('.city').html('<option value="0">选择市</option>');
// 			$('.district').html('<option value="0">选择区</option>');
// 		}
// 		countryAjax(id);
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
// 					// console.log(areaJson);
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