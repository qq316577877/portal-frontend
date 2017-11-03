//$(function() {
//	//直接请求ajax看是否有银行卡
//	$Ajax();
//	//全部变量接受银行的json
//	var oData,
//		oldBankCard;
//	//正则是star
//	//开户名称
//	$('#accountName').blur(function() {
//		var oVal = $(this).val(),
//			max=25,
//			min=4,
//			str = "开户名称为4-25个字符";
//		valLength(oVal,max,min,str,$(this));
//	});
//
//	//开户支行
//	$('#bankName').blur(function() {
//		var oVal = $(this).val(),
//			max=25,
//			min=4,
//			str = "开户支行称为4-25个字符";
//		valLength(oVal,max,min,str,$(this));
//	});
//
//	//银行账号
//	$('#bankCard').on('input', function() {
//		var oVal = $(this).val();
//		var $estimate = /^[0-9]{16,21}$/;
//		var id = $('.inform .hide-input').val();
//		var str = '只能输入数字16-21位';
//		var pass=$(this).attr("pass");
//		yesOrNo(oVal, $estimate, $(this), str);
//		if(oVal.length <16|| oVal.length >21) return false;
//		if(!id) {
//			$AjaxBank(oVal,$(this));
//		} else if(id && oVal != oldBankCard) {
//			$AjaxBank(oVal,$(this));
//		}
//	});
//	//正则是end
//
//	//取消判断的红框star
//	//当区改变
//	$('.province').change(function() {
//		$('.selectList').next('.judge').css('display', 'none');
//	});
//
//	//当选择银行改变
//	$('#bankTypeId').change(function() {
//		$('#bankTypeId').next('.judge').css('display', 'none');
//	});
//	//取消判断的红框end
//
//	//赋值给修改框
//	function modification(num) {
//		for(var i = 0; i < oData.length; i++) {
//			if(num == oData[i].id) {
//				$('#accountName').val(oData[i].accountName);
//				$('#bankName').val(oData[i].bankName);
//				$('#bankCard').val(oData[i].bankCard);
//				$('#bankCard').attr('type','yes');
//				$('#bankTypeId').val(oData[i].bankTypeId);
//
//				$('.province').val(oData[i].provinceId);
//				$('.province').change();
//				$('.city').val(oData[i].cityId);
//				$('.city').change();
//				$('.district').val(oData[i].districtId);
//				$('#hide-input').val(num);
//				oldBankCard = $('#bankCard').val();
//				$('#province').change();
//				break;
//			}
//
//		}
//	};
//
//	//正则验证方法
//	function yesOrNo(val, reg, $this, str) {
//		if(val.length<1)return false;
//		if(reg.test(val)) {
//			$this.next('.judge').css('display', 'none');
//			$this.css('border', '1px solid #00aa5c');
//			$this.removeAttr('pass');
//		} else {
//			$this.attr('pass', '1');
//			$this.next('.judge').css({
//				'display': 'block',
//				'color': 'red'
//			}).text(str);
//			$this.css('border', '1px solid red');
//		}
//	};
//	//只校验长度
//	function valLength(oVal,max,min,str,$this) {
//		var valNum,
//			 oVal=$.trim(oVal);//去除前后空格
//		if(oVal.length<1)return false;
//		if(/[\u4e00-\u9fa5]/.test(oVal)){
//			valNum=oVal.length + oVal.match(/[^x00-xff]/g).length;
//		}else {
//			valNum=oVal.length;
//		};
//		if (valNum) {
//			if(valNum<min||valNum>max) {
//				$this.attr('pass', '1');
//				$this.next('.judge').css({
//					'display': 'block',
//					'color': 'red'
//				}).text(str);
//				$this.css('border', '1px solid red');
//			} else {
//				$this.next('.judge').css('display', 'none');
//				$this.css('border', '1px solid #00aa5c');
//				$this.removeAttr('pass');
//			};
//		};
//	};
//
//	//新增修改时验证银行卡号是否重复
//	function $AjaxBank(num,$this) {
//
//		httpRequest({
//			url: AjaxUrl.member_check_user_bank_information_ajax,
//			params:  {bankCard: num},
//			success: function (response) {
//				var pass=$("#bankCard").attr("pass");
//				if(response.code == 200&&pass==undefined) {
//					$('.inform #bankCard').next('.judge').css('display', 'block').text(response.msg).css('color', 'green');
//					$this.attr('type','yes');
//				} else if(response.code == 405&&pass==undefined)  {
//					$('.inform #bankCard').next('.judge').css('display', 'block').text(response.msg).css('color', 'red');
//					$this.attr('type','no');
//				}
//			}
//		});
//	};
//
//	//获取银行类型
//	$.each(__DATA.bankList, function(i) {
//		var $obj = __DATA.bankList;
//		var $option = $('<option value="' + $obj[i].id + '">' + $obj[i].name + '</option>');
//		$('#bankTypeId').append($option);
//	});
//
//	function $Ajax() {
//		$.post(AjaxUrl.member_get_user_bank_information_ajax,function(res) {
//			if(res.code == 200) {
//				oData = res.data.bankCards;
//				if(!oData) {
//					$('.main-r-show').css('display', 'block');
//					$('.main-r-hide').css('display', 'none');
//				} else {
//					$('.addBox .gree').text(oData.length);
//					$('.main-r-show').css('display', 'none');
//					$('.main-r-hide').css('display', 'block');
//					for(var i = 0; i < oData.length; i++) {
//						var $lists = $("<li class='site-list'>" +
//							"        		<div class='list-top'>" +
//							"        			<h2 class='listName'>" + oData[i].accountName + "</h2>" +
//							"        		</div>" +
//							"        		<div class='list-body'>" +
//							"        			<div class='characterBox' >" +
//							"        				<p class='character left'>开户名称:</p>" +
//							"        				<p class='character' >" + oData[i].accountName + "</p>" +
//							"        			</div>" +
//							"        			" +
//							"        			<div class='characterBox' >" +
//							"        				<p class='character left'>开户所在地:</p>" +
//							"        				<p class='character mr12' provinceId='" + oData[i].provinceId + "'>" + oData[i].provinceName + "</p>" +
//							"        				<p class='character mr12' cityId='" + oData[i].cityId + "' >" + oData[i].cityName + "</p>" +
//							"        				<p class='character' districtId='" + oData[i].districtId + "' >" + oData[i].districtName + "</p>" +
//							"        			</div>" +
//							"        			<div class='characterBox'>" +
//							"        				<p class='character left'>开户支行:</p>" +
//							"        				<p class='character'>" + oData[i].bankName + "</p>" +
//							"        			</div>" +
//							"        			<div class='characterBox'>" +
//							"        				<p class='character left'>银行账号:</p>" +
//							"        				<p class='character'>" + oData[i].bankCard + "</p>" +
//							"        			</div>" +
//							"        			" +
//							"        			<a href='javascript:void(0);' data-ID='" + oData[i].id + "' class='shutOut'></a>" +
//							"        			<div class='select'>" +
//							"        				<a class='EditAddress' data-ID='" + oData[i].id + "' href='javascript:void(0);'>修改账号</a>" +
//							"        			</div>" +
//							"        		</div>" +
//							"        	</li>");
//						$('#lists').append($lists);
//
//					}
//				}
//
//			};
//		});
//	}
//	//控制弹窗消失/显示
//	//新增
//	$('.pop-up').click(function() {
//		if($('.mask').hasClass('animated')) {
//			$('.mask').removeClass('animated bounceOut');
//			$('.mask').css('display', 'none');
//			$('.inform').css('display', 'block')
//		}
//		$('.mask').css('display', 'block');
//		$('.mask').addClass('animated pulse');
//		$('.inform-1').css('display', 'none');
//		$('.inform-2').css('display', 'none');
//		$('.inform-3').css('display', 'none');
//		$('.inform').css('display', 'block');
//	});
//
//	//显示修改弹窗
//	$('#lists').on('click', '.EditAddress', function() {
//		if($('.mask').hasClass('animated')) {
//			$('.mask').removeClass('animated bounceOut');
//			$('.mask').css('display', 'none');
//			$('.inform').css('display', 'block')
//		}
//		$('.mask').css('display', 'block');
//		$('.mask').addClass('animated pulse');
//		$('.inform-1').css('display', 'none');
//		$('.inform').css('display', 'block');
//		$('.inform-head .fl').text('修改银行卡号');
//		var oNum = $(this).attr('data-ID');
//		$('.inform .hide-input').val($(this).attr('data-ID'));
//		modification(oNum);
//
//	});
//
//	//删除地址
//	$('#lists').on('click', '.shutOut', function() {
//		if($('.mask').hasClass('animated')) {
//			$('.mask').removeClass('animated bounceOut');
//			$('.mask').css('display', 'none');
//			$('.inform-1').css('display', 'block')
//		}
//		$('.mask').css('display', 'block');
//		$('.mask').addClass('animated pulse');
//		$('.inform').css('display', 'none')
//		$('.inform-1').css('display', 'block');
//		//值给页面上的input
//		$('.inform-1 .hide-input').val($(this).attr('data-ID'));
//
//	});
//	//取消背景和弹窗
//	$('.cancel').click(function() {
//		location=location;
//		$('.mask').addClass('animated bounceOut');
//
//	})
//
//	$('.out').click(function() {
//		$('.mask').addClass('animated bounceOut');
//	})
//
//	//点击新增保存按钮
//	$(".save").click(function() {
//		var id = $('.inform .hide-input').val();
//		var oNum = 0; //用于判断所有框格式是否合格
//		var accountName =$.trim($('#accountName').val());
//		var bankName =$.trim($('#bankName').val());
//		var bankCard = $('#bankCard').val();
//		var bankTypeId = $('#bankTypeId').val();
//		var provinceId = $('.inform .province').val();
//		var cityId = $('.inform .city').val();
//		var districtId = $('.inform .district').val();
//
//		if(provinceId == undefined || provinceId == 0) {
//			$('.inform .selectList').next('.judge').css('display', 'block').text('请选择省/市/区');
//			oNum++;
//		}
//		if(bankTypeId == undefined || bankTypeId == 0) {
//			$('#bankTypeId').next('.judge').css('display', 'block').text('请选择开户银行');
//			oNum++;
//		}
//		if(accountName == '') {
//			$('#accountName').next('.judge').css('display', 'block').text('此选项不能为空');
//			$('#accountName').css("border-color","#b9b9b9");
//			oNum++;
//		}
//		if(bankName == '') {
//			$('#bankName').next('.judge').css('display', 'block').text('此选项不能为空');
//			$('#accountName').css("border-color","#b9b9b9");
//			oNum++;
//		}
//		if(bankCard == '') {
//			$('#bankCard').next('.judge').css('display', 'block').text('此选项不能为空');
//			$('#accountName').css("border-color","#b9b9b9");
//			oNum++;
//		}
//		if($('#accountName').attr('pass') == 1) oNum++;
//		if($('#bankName').attr('pass') == 1) oNum++;
//		if($('#bankCard').attr('pass') == 1||$('#bankCard').attr('type')=="no") oNum++;
//
//		if(oNum == 0 && id == "") {
//			httpRequest({
//				url:AjaxUrl.member_add_user_bank_information_ajax,
//				params:{
//					accountName: accountName,
//					provinceId: provinceId,
//					cityId: cityId,
//					districtId: districtId,
//					bankTypeId: bankTypeId,
//					bankName: bankName,
//					bankCard: bankCard
//				},
//				success: function (response) {
//					location=location;
//					$('.mask').addClass('animated bounceOut');
//				}
//			})
//		}else if(oNum == 0 && id != "") {
//			httpRequest({
//				url:AjaxUrl.member_update_user_bank_information_ajax,
//				params:{
//					id:id,
//					accountName:accountName,
//					provinceId: provinceId,
//					cityId: cityId,
//					districtId: districtId,
//					bankTypeId:bankTypeId,
//					bankName: bankName,
//					bankCard:bankCard
//				},
//				success: function (response) {
//					location=location;
//					$('.mask').addClass('animated bounceOut');
//				}
//			})
//		}
//
//	});
//	//点击删除确定
//	$('.shutOut-true').click(function() {
//		var oVal = $('.inform-1 .hide-input').val();
//		console.log(oVal);
//		httpRequest({
//			url:AjaxUrl.member_delete_user_bank_information_ajax,
//			params:{
//				id:oVal
//			},
//			success: function (response) {
//				location=location;
//				$('.mask').addClass('animated bounceOut');
//			}
//		})
//	});
//
//});
$(function () {

    //validate控件
    $("#addBank").validate({
        errorClass: 'error formError errorBottom', // default input error message class
        debug: false, //调试模式取消submit的默认提交功能
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        onkeyup: false,
        submitHandler: function (form) {   //表单提交句柄,为一回调函数，带一个参数：form
            //判断银行卡是不是存在
            //AjaxBank()
            //
            ////提交
            //submit();
            var id = $('.inform .hide-input').val();
            var accountName = $.trim($('#accountName').val());
            var bankName = $.trim($('#bankName').val());
            var bankCard = $('#bankCard').val();
            var bankTypeId = $('#bankTypeId').val();
            var provinceId = $('.inform .province').val();
            var cityId = $('.inform .city').val();
            var districtId = $('.inform .district').val();



            if (id == "") {
                AjaxBank()

            } else if (id != "") {
                httpRequest({
                    url: AjaxUrl.member_update_user_bank_information_ajax,
                    params: {
                        id: id,
                        accountName: accountName,
                        provinceId: provinceId,
                        cityId: cityId,
                        districtId: districtId,
                        bankTypeId: bankTypeId,
                        bankName: bankName,
                        bankCard: bankCard
                    },
                    success: function (response) {
                        location = location;
                        $('.mask').addClass('animated bounceOut');
                    }
                })
            }
        },
        rules: {
            province: {
                required: true,
                min: 1
            },
            city: {
                required: true,
                min: 1
            },
            district: {
                required: true,
                min: 1
            },
            bankTypeId: {
                required: true,
                min: 1
            },
            accountName: {
                required: true,
                isAccountName: true,
            },
            bankName: {
                required: true,
                isAccountName: true,
            },
            bankCard: {
                required: true,
                isBankCard: true
            },
        },
        messages: {
            province: '请选择省/市/区',
            city: '请选择省/市/区',
            district: '请选择省/市/区',
            bankTypeId: '请选择开户银行',
            accountName: {
                required: '此选项不能为空',
            },
            bankName: {
                required: '此选项不能为空',
            },
            credential: {
                required: '此选项不能为空',
            },
            bankCard: {
                required: '此选项不能为空',
            },

        }
    });

    //直接请求ajax看是否有银行卡
    $Ajax();
    //全部变量接受银行的json
    var oData,
        oldBankCard;
    //正则是star
    //开户名称
    //$('#accountName').blur(function () {
    //    var oVal = $(this).val(),
    //        max = 25,
    //        min = 4,
    //        str = "开户名称为4-25个字符";
    //    valLength(oVal, max, min, str, $(this));
    //});
    //
    ////开户支行
    //$('#bankName').blur(function () {
    //    var oVal = $(this).val(),
    //        max = 25,
    //        min = 4,
    //        str = "开户支行称为4-25个字符";
    //    valLength(oVal, max, min, str, $(this));
    //});
    //
    ////银行账号
    //$('#bankCard').on('input', function () {
    //    var oVal = $(this).val();
    //    var $estimate = /^[0-9]{16,21}$/;
    //    var id = $('.inform .hide-input').val();
    //    var str = '只能输入数字16-21位';
    //    var pass = $(this).attr("pass");
    //    yesOrNo(oVal, $estimate, $(this), str);
    //    if (oVal.length < 16 || oVal.length > 21) return false;
    //    if (!id) {
    //        $AjaxBank(oVal, $(this));
    //    } else if (id && oVal != oldBankCard) {
    //        $AjaxBank(oVal, $(this));
    //    }
    //});
    //正则是end

    //取消判断的红框star
    //当区改变
    $('.province').change(function () {
        $('.selectList').next('.judge').css('display', 'none');
    });

    //当选择银行改变
    $('#bankTypeId').change(function () {
        $('#bankTypeId').next('.judge').css('display', 'none');
    });
    //取消判断的红框end



    //正则验证方法
    //function yesOrNo(val, reg, $this, str) {
    //    if (val.length < 1)return false;
    //    if (reg.test(val)) {
    //        $this.next('.judge').css('display', 'none');
    //        $this.css('border', '1px solid #00aa5c');
    //        $this.removeAttr('pass');
    //    } else {
    //        $this.attr('pass', '1');
    //        $this.next('.judge').css({
    //            'display': 'block',
    //            'color': 'red'
    //        }).text(str);
    //        $this.css('border', '1px solid red');
    //    }
    //};
    ////只校验长度
    //function valLength(oVal, max, min, str, $this) {
    //    var valNum,
    //        oVal = $.trim(oVal);//去除前后空格
    //    if (oVal.length < 1)return false;
    //    if (/[\u4e00-\u9fa5]/.test(oVal)) {
    //        valNum = oVal.length + oVal.match(/[^x00-xff]/g).length;
    //    } else {
    //        valNum = oVal.length;
    //    }
    //    ;
    //    if (valNum) {
    //        if (valNum < min || valNum > max) {
    //            $this.attr('pass', '1');
    //            $this.next('.judge').css({
    //                'display': 'block',
    //                'color': 'red'
    //            }).text(str);
    //            $this.css('border', '1px solid red');
    //        } else {
    //            $this.next('.judge').css('display', 'none');
    //            $this.css('border', '1px solid #00aa5c');
    //            $this.removeAttr('pass');
    //        }
    //        ;
    //    }
    //    ;
    //};

    //新增修改时验证银行卡号是否重复
    //function $AjaxBank(num, $this) {
    //
    //    httpRequest({
    //        url: AjaxUrl.member_check_user_bank_information_ajax,
    //        params: {bankCard: num},
    //        success: function (response) {
    //            var pass = $("#bankCard").attr("pass");
    //            if (response.code == 200 && pass == undefined) {
    //                $('.inform #bankCard').next('.judge').css('display', 'block').text(response.msg).css('color', 'green');
    //                $this.attr('type', 'yes');
    //            } else if (response.code == 405 && pass == undefined) {
    //                $('.inform #bankCard').next('.judge').css('display', 'block').text(response.msg).css('color', 'red');
    //                $this.attr('type', 'no');
    //            }
    //        }
    //    });
    //};

    //获取银行类型
    $.each(__DATA.bankList, function (i) {
        var $obj = __DATA.bankList;
        var $option = $('<option value="' + $obj[i].id + '">' + $obj[i].name + '</option>');
        $('#bankTypeId').append($option);
    });



    //控制弹窗消失/显示
    //新增
    $('.pop-up').click(function () {
        addPop()
    });

    //显示修改弹窗
    $('#lists').on('click', '.EditAddress', function () {
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
            $('.inform').css('display', 'block')
        }
        $('.mask').css('display', 'block');
        $('.mask').addClass('animated pulse');
        $('.inform-1').css('display', 'none');
        $('.inform').css('display', 'block');
        $('.inform-head .fl').text('修改银行卡号');
        var oNum = $(this).attr('data-ID');
        $('.inform .hide-input').val($(this).attr('data-ID'));
        //console.log($('.inform .hide-input').val());
        modification(oNum);

    });

    //删除地址
    $('#lists').on('click', '.shutOut', function () {
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
            $('.inform-1').css('display', 'block')
        }
        $('.mask').css('display', 'block');
        $('.mask').addClass('animated pulse');
        $('.inform').css('display', 'none')
        $('.inform-1').css('display', 'block');
        //值给页面上的input
        $('.inform-1 .hide-input').val($(this).attr('data-ID'));

    });
    //取消背景和弹窗
    $('.cancel').click(function () {
        location = location;
        $('.mask').addClass('animated bounceOut');

    })

    $('.out').click(function () {
        $('.mask').addClass('animated bounceOut');
    })

    //点击新增保存按钮
    $(".save").click(function () {
        //var id = $('.inform .hide-input').val();
        //var oNum = 0; //用于判断所有框格式是否合格
        //var accountName = $.trim($('#accountName').val());
        //var bankName = $.trim($('#bankName').val());
        //var bankCard = $('#bankCard').val();
        //var bankTypeId = $('#bankTypeId').val();
        //var provinceId = $('.inform .province').val();
        //var cityId = $('.inform .city').val();
        //var districtId = $('.inform .district').val();
        //
        //if (provinceId == undefined || provinceId == 0) {
        //    $('.inform .selectList').next('.judge').css('display', 'block').text('请选择省/市/区');
        //    oNum++;
        //}
        //if (bankTypeId == undefined || bankTypeId == 0) {
        //    $('#bankTypeId').next('.judge').css('display', 'block').text('请选择开户银行');
        //    oNum++;
        //}
        //if (accountName == '') {
        //    $('#accountName').next('.judge').css('display', 'block').text('此选项不能为空');
        //    $('#accountName').css("border-color", "#b9b9b9");
        //    oNum++;
        //}
        //if (bankName == '') {
        //    $('#bankName').next('.judge').css('display', 'block').text('此选项不能为空');
        //    $('#accountName').css("border-color", "#b9b9b9");
        //    oNum++;
        //}
        //if (bankCard == '') {
        //    $('#bankCard').next('.judge').css('display', 'block').text('此选项不能为空');
        //    $('#accountName').css("border-color", "#b9b9b9");
        //    oNum++;
        //}
        //if ($('#accountName').attr('pass') == 1) oNum++;
        //if ($('#bankName').attr('pass') == 1) oNum++;
        //if ($('#bankCard').attr('pass') == 1 || $('#bankCard').attr('type') == "no") oNum++;
        //
        //if (oNum == 0 && id == "") {
        //    httpRequest({
        //        url: AjaxUrl.member_add_user_bank_information_ajax,
        //        params: {
        //            accountName: accountName,
        //            provinceId: provinceId,
        //            cityId: cityId,
        //            districtId: districtId,
        //            bankTypeId: bankTypeId,
        //            bankName: bankName,
        //            bankCard: bankCard
        //        },
        //        success: function (response) {
        //            location = location;
        //            $('.mask').addClass('animated bounceOut');
        //        }
        //    })
        //} else if (oNum == 0 && id != "") {
        //    httpRequest({
        //        url: AjaxUrl.member_update_user_bank_information_ajax,
        //        params: {
        //            id: id,
        //            accountName: accountName,
        //            provinceId: provinceId,
        //            cityId: cityId,
        //            districtId: districtId,
        //            bankTypeId: bankTypeId,
        //            bankName: bankName,
        //            bankCard: bankCard
        //        },
        //        success: function (response) {
        //            location = location;
        //            $('.mask').addClass('animated bounceOut');
        //        }
        //    })
        //}
        //$("#addBank").submit()
    });
    //点击删除确定
    $('.shutOut-true').click(function () {
        shutOutTrue()
    });




    /*
    * 赋值给修改框
    * */
    function modification(num) {
        for (var i = 0; i < oData.length; i++) {
            if (num == oData[i].id) {
                $('#accountName').val(oData[i].accountName);
                $('#bankName').val(oData[i].bankName);
                $('#bankCard').val(oData[i].bankCard);
                $('#bankCard').attr('type', 'yes');
                $('#bankTypeId').val(oData[i].bankTypeId);

                $('.province').val(oData[i].provinceId);
                $('.province').change();
                $('.city').val(oData[i].cityId);
                $('.city').change();
                $('.district').val(oData[i].districtId);
                $('#hide-input').val(num);
                oldBankCard = $('#bankCard').val();
                $('#province').change();
                break;
            }

        }
    };


    /*
    * 点击新增弹窗出现
    * */
    function addPop (){
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
            $('.inform').css('display', 'block')
        }
        $('.mask').css('display', 'block');
        $('.mask').addClass('animated pulse');
        $('.inform-1').css('display', 'none');
        $('.inform-2').css('display', 'none');
        $('.inform-3').css('display', 'none');
        $('.inform').css('display', 'block');
    }

    /*
    * 加载页面信息
    * */
    function $Ajax() {
        $.post(AjaxUrl.member_get_user_bank_information_ajax, function (res) {
            if (res.code == 200) {
                oData = res.data.bankCards;
                if (!oData) {
                    $('.main-r-show').css('display', 'block');
                    $('.main-r-hide').css('display', 'none');
                } else {
                    $('.addBox .gree').text(oData.length);
                    $('.main-r-show').css('display', 'none');
                    $('.main-r-hide').css('display', 'block');
                    for (var i = 0; i < oData.length; i++) {
                        var $lists = $("<li class='site-list'>" +
                            "        		<div class='list-top'>" +
                            "        			<h2 class='listName'>" + oData[i].accountName + "</h2>" +
                            "        		</div>" +
                            "        		<div class='list-body'>" +
                            "        			<div class='characterBox' >" +
                            "        				<p class='character left'>开户名称:</p>" +
                            "        				<p class='character' >" + oData[i].accountName + "</p>" +
                            "        			</div>" +
                            "        			" +
                            "        			<div class='characterBox' >" +
                            "        				<p class='character left'>开户所在地:</p>" +
                            "        				<p class='character mr12' provinceId='" + oData[i].provinceId + "'>" + oData[i].provinceName + "</p>" +
                            "        				<p class='character mr12' cityId='" + oData[i].cityId + "' >" + oData[i].cityName + "</p>" +
                            "        				<p class='character' districtId='" + oData[i].districtId + "' >" + oData[i].districtName + "</p>" +
                            "        			</div>" +
                            "        			<div class='characterBox'>" +
                            "        				<p class='character left'>开户支行:</p>" +
                            "        				<p class='character'>" + oData[i].bankName + "</p>" +
                            "        			</div>" +
                            "        			<div class='characterBox'>" +
                            "        				<p class='character left'>银行账号:</p>" +
                            "        				<p class='character'>" + oData[i].bankCard + "</p>" +
                            "        			</div>" +
                            "        			" +
                            "        			<a href='javascript:void(0);' data-ID='" + oData[i].id + "' class='shutOut'></a>" +
                            "        			<div class='select'>" +
                            "        				<a class='EditAddress' data-ID='" + oData[i].id + "' href='javascript:void(0);'>修改账号</a>" +
                            "        			</div>" +
                            "        		</div>" +
                            "        	</li>");
                        $('#lists').append($lists);

                    }
                }

            }
            ;
        });
    }

    /*
    *点击删除
    * */
    function shutOutTrue (){
        var oVal = $('.inform-1 .hide-input').val();
        console.log(oVal);
        httpRequest({
            url: AjaxUrl.member_delete_user_bank_information_ajax,
            params: {
                id: oVal
            },
            success: function (response) {
                location = location;
                $('.mask').addClass('animated bounceOut');
            }
        })
    }

    /*
    * 提交审核
    * */
    function submit() {
        var id = $('.inform .hide-input').val();
        var accountName = $.trim($('#accountName').val());
        var bankName = $.trim($('#bankName').val());
        var bankCard = $('#bankCard').val();
        var bankTypeId = $('#bankTypeId').val();
        var provinceId = $('.inform .province').val();
        var cityId = $('.inform .city').val();
        var districtId = $('.inform .district').val();


        if (id == "") {
            httpRequest({
                url: AjaxUrl.member_add_user_bank_information_ajax,
                params: {
                    accountName: accountName,
                    provinceId: provinceId,
                    cityId: cityId,
                    districtId: districtId,
                    bankTypeId: bankTypeId,
                    bankName: bankName,
                    bankCard: bankCard
                },
                success: function (response) {
                    location = location;
                    $('.mask').addClass('animated bounceOut');
                }
            })
        } else if (id != "") {
            httpRequest({
                url: AjaxUrl.member_update_user_bank_information_ajax,
                params: {
                    id: id,
                    accountName: accountName,
                    provinceId: provinceId,
                    cityId: cityId,
                    districtId: districtId,
                    bankTypeId: bankTypeId,
                    bankName: bankName,
                    bankCard: bankCard
                },
                success: function (response) {
                    location = location;
                    $('.mask').addClass('animated bounceOut');
                }
            })
        }
    }

    /*
    * 新增修改时验证银行卡号是否重复
    * */
    function AjaxBank() {
        var accountName = $.trim($('#accountName').val());
        var bankName = $.trim($('#bankName').val());
        var bankCard = $('#bankCard').val();
        var bankTypeId = $('#bankTypeId').val();
        var provinceId = $('.inform .province').val();
        var cityId = $('.inform .city').val();
        var districtId = $('.inform .district').val();
        httpRequest({
            url: AjaxUrl.member_check_user_bank_information_ajax,
            params: {bankCard: $('#bankCard').val()},
            success: function (response) {
                httpRequest({
                    url: AjaxUrl.member_add_user_bank_information_ajax,
                    params: {
                        accountName: accountName,
                        provinceId: provinceId,
                        cityId: cityId,
                        districtId: districtId,
                        bankTypeId: bankTypeId,
                        bankName: bankName,
                        bankCard: bankCard
                    },
                    success: function (response) {
                        location = location;
                        $('.mask').addClass('animated bounceOut');
                    }
                })
            },
            error: function (response) {
                $('.inform #bankCard').siblings('.judge').css('display', 'block').text(response.msg).css('color', 'red');
                return
            }
        })
        ;
    };

});