$(function () {
    var oData;
    var tel = /0?(13|14|15|17|18)[0-9]{9,10}$/;
    var areaNum = /^[0-9]{3,4}$/;
    var tesePhone = /^[0-9]{7,10}$/;
    $("#addSuppier").validate({
        errorClass: 'error formError errorBottom', // default input error message class
        debug: false, //调试模式取消submit的默认提交功能
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        onkeyup: false,
        submitHandler: function (form) {   //表单提交句柄,为一回调函数，带一个参数：form
            //判断选填的内容
            if ($('#cellPhone').val() == '' && $('#phoneNum').val() == '') {
                $(".reminder").html("手机号或座机号必填一个");
                return
            }
            ;

            if ($('#cellPhone').val() != '') {
                if ($('#cellPhone-c option:selected').html() == '选择国家') {
                    $('#cellPhone-c').siblings('.judge').html('请选择国家').css('display', 'block');
                    return
                } else if (!tel.test($('#cellPhone').val())) {
                    $('#cellPhone-c').siblings('.judge').html('请输入有效的手机号码').css('display', 'block');
                    return
                }
            }
            ;

            if ($('#address').val().length >= 120) {
                $('#address').siblings('.judge').css('display', 'block').html('详细地址为4-120个字符');
                return
            }

            if ($('#phoneNum').val() != '') {
                if ($('#phoneNum-c option:selected').html() == '选择国家') {
                    $('#phoneNum-c').siblings('.judge').html('请选择国家').css('display', 'block');
                    return
                } else if (!areaNum.test($('#area').val())) {
                    $('#phoneNum-c').siblings('.judge').html('区号只能输入3-4位数字').css('display', 'block');
                    $('#area').focus()
                    return
                } else if (!tesePhone.test($('#phoneNum').val())) {
                    $('#phoneNum-c').siblings('.judge').html('只能输入数字7-10位').css('display', 'block');
                    return
                }
            }
            // 新增供应商
            addSupplier();
        },
        rules: {
            country: {
                required: true,
                min: 1
            },
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
            address: {
                required: true,
                //isAddress: true,
                limitSumAdd: true
            },
            zipCode: {
                required: true,
                isZipCode: true,

            },
            supplierName: {
                required: true,
                //isSupplierName: true,
                limitSumName: true
            },
            supplierContact: {
                required: true,
                isReceiver: true,
                limitSumNa: true,
            },
        },
        messages: {
            country: '请选择国家和省/市/区',
            province: '请选择国家和省/市/区',
            city: '请选择国家和省/市/区',
            district: '请选择国家和省/市/区',
            address: {
                required: '带*选项不能为空',
            },
            zipCode: {
                required: '带*选项不能为空',
            },
            supplierName: {
                required: '带*选项不能为空',
            },
            receiver: {
                required: '带*选项不能为空',
            },
            supplierContact: {
                required: '带*选项不能为空',
            }
        }
    });


    //直接请求ajax看是否有收货地址
    $Ajax();
    //$('#address').blur(function() {
    //	var oVal = $(this).val(),
    //		max=120,
    //		min=4,
    //		str = "详细地址为4-120个字符";
    //	valLength(oVal,max,min,str,$(this));
    //});
    ////邮政编码
    //$('#zipCode').blur(function() {
    //	var oVal = $(this).val();
    //	var $estimate = /^[0-9]{5,}$/g;
    //	var str = "请输入数字，不清楚请填000000";
    //	yesOrNo(oVal, $estimate, $(this), str);
    //
    //});
    //
    ////供应商名称
    //$('#supplierName').blur(function() {
    //	var oVal = $(this).val(),
    //		max=120,
    //		min=10,
    //		str = "供应商名称为10-120个字符";
    //	valLength(oVal,max,min,str,$(this));
    //
    //});
    //
    ////供应商联系人
    //$('#supplierContact').blur(function() {
    //	var oVal = $(this).val(),
    //		max=25,
    //		min=4,
    //		str = "联系人为4-25个字符";
    //	valLength(oVal,max,min,str,$(this));
    //});
    //
    ////手机号
    //$('#cellPhone').blur(function() {
    //	var oVal = $(this).val();
    //	var $area = /^[0-9]{9,13}$/;
    //	var str = '只能输入数字9-13位';
    //	if(oVal !== "") {
    //		yesOrNo(oVal, $area, $(this), str);
    //	} else {
    //		$(this).next('.judge').css('display', 'none');
    //		$(this).css('border', '1px solid #b9b9b9');
    //	}
    //});
    //
    ////座机号
    //$('#phoneNum').blur(function() {
    //	var oVal = $(this).val();
    //	var $cellPhone = /^[0-9]{6,10}$/;
    //	var str = '只能输入数字8位,选座机请填区号';
    //	if(oVal !== "") {
    //		yesOrNo(oVal, $cellPhone, $(this), str);
    //	} else {
    //		$(this).next('.judge').css('display', 'none');
    //		$(this).css('border', '1px solid #b9b9b9');
    //	}
    //
    //});
    ////座机区号
    //$("#area").blur(function() {
    //	var oVal = $(this).val();
    //	var $cellPhone = /^[0-9]{3,}$/;
    //	var str = "区号只能输入3-4位数字";
    //	if(oVal !== "") {
    //		yesOrNo(oVal, $cellPhone, $(this), str);
    //	} else {
    //		$(this).next(".judge").css("display", "none");
    //		$(this).css("border", "1px solid #b9b9b9");
    //	}
    //
    //});
    //正则验证方法
    //function yesOrNo(val, reg, $this, str) {
    //	if(val.length<1)return false;
    //	if(reg.test(val)) {
    //		$this.next(".judge").css("display", "none");
    //		$this.css("border", "1px solid #00aa5c");
    //		$this.removeAttr("pass");
    //	} else {
    //		console.log(str);
    //		$this.attr("pass", "1");
    //		$this.siblings(".judge").css("display", "block").text(str);
    //		$this.css("border", "1px solid red");
    //	}
    //
    //};
    ////校验长度
    //function valLength(oVal,max,min,str,$this) {
    //	var valNum,
    //		oVal=$.trim(oVal);//去除前后空格
    //	if(oVal.length<1)return false;
    //	if(/[\u4e00-\u9fa5]/.test(oVal)){
    //		valNum=oVal.length + oVal.match(/[^x00-xff]/g).length;
    //	}else {
    //		valNum=oVal.length;
    //	};
    //	if (valNum) {
    //		if(valNum<min||valNum>max) {
    //			$this.attr('pass', '1');
    //			$this.next('.judge').css({
    //				'display': 'block',
    //				'color': 'red'
    //			}).text(str);
    //			$this.css('border', '1px solid red');
    //		} else {
    //			$this.next('.judge').css('display', 'none');
    //			$this.css('border', '1px solid #00aa5c');
    //			$this.removeAttr('pass');
    //		};
    //	};
    //};


    infoChange()

    //控制弹窗消失/显示
    //新增
    $('.pop-up').click(addPop);

    //修改
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
        $('.inform-head .fl').text('修改供应商信息');
        var oNum = $(this).attr('data-ID');
        $('.inform .hide-input').val($(this).attr('data-ID'));
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
        $('.inform').css('display', 'none');
        $('.inform-1').css('display', 'block');
        //值给页面上的input
        $('.inform-1 .hide-input').val($(this).attr('data-ID'));

    });

    //取消背景和弹窗
    $('.cancel').click(function () {
        //		$('input').val('').css('border-color', '#B9B9B9');
        //		$('.judge').hide();
        //		$('.country').val(0);
        //		changeVal(0);
        location = location;
        $('.mask').addClass('animated bounceOut');

    })

    $('.out').click(function () {
        $('.mask').addClass('animated bounceOut');
    })


    //点击新增保存按钮
    $("#addSuppierBtn").click(function () {
        //$("#addSuppier").submit();
    });
    //点击删除确定
    $('.shutOut-true').click(clickDelete);

    //获取国家
    getCountry()


    //当国家值改变
    $("#country").change(function () {
        var id = $("#country").val();
        // console.log(id);
        if (id == 0) {
            $('.province').html('<option value="0">选择省</option>');
            $('.city').html('<option value="0">选择市</option>');
            $('.district').html('<option value="0">选择区</option>');
        }
        countryAjax(id);

    });

    /*
     * 新增供应商方法
     * */
    function addSupplier() {

        var id = $(".inform .hide-input").val();
        var oNum = 0; //用于判断所有框格式是否合格
        var address = ($.trim($('#address').val()))
        var zipCode = $('#zipCode').val();
        var supplierName = ($.trim($('#supplierName').val()));
        var supplierContact = $.trim($('#supplierContact').val());
        var countryId = $('#country').val();
        var provinceId = $('.inform .province').val();
        var cityId = $('.inform .city').val();
        var districtId = $('.inform .district').val();

        var cellPhone = $('#cellPhone').val();
        var cellPhoneC = $('#cellPhone-c').find("option:selected").data('tel');
        var Area = $('#area').val();
        var phoneNum = $('#phoneNum').val();
        var phoneNumC = $('#phoneNum-c').find("option:selected").data('tel');

        //if (countryId == 0) {
        //    $('#country').parents().next('.judge').css('display', 'block').text('请选择所在地');
        //    oNum++;
        //}
        //if (address == '') {
        //    $('#address').next('.judge').css('display', 'block').text('此选项不能为空');
        //    $('#address').css("border-color", "#b9b9b9");
        //    oNum++;
        //}
        //if (supplierName == '') {
        //    $('#supplierName').next('.judge').css('display', 'block').text('此选项不能为空');
        //    $('#supplierName').css("border-color", "#b9b9b9");
        //    oNum++;
        //}
        //if (zipCode == '') {
        //    $('#zipCode').next('.judge').css('display', 'block').text('此选项不能为空');
        //    $('#zipCode').css("border-color", "#b9b9b9");
        //    oNum++;
        //}
        //if (supplierContact == '') {
        //    $('#supplierContact').next('.judge').css('display', 'block').text('此选项不能为空');
        //    $('#supplierContact').css("border-color", "#b9b9b9");
        //    oNum++;
        //}
        //if (cellPhone == '' && phoneNum == '') {
        //    $('#cellPhone').next('.judge').css('display', 'block').text('手机号座机号必填一个');
        //    $('#phoneNum').next('.judge').css('display', 'block').text('手机号座机号必填一个');
        //    oNum++;
        //}
        //;
        if (cellPhone != '') {
            if (cellPhoneC == undefined || cellPhoneC == 0) {
                $('#cellPhone').next('.judge').css('display', 'block').text('请选择国家');
                oNum++;
            } else {
                cellPhone = cellPhoneC + '-' + cellPhone;
                if ($('#cellPhone').attr('pass') == 1) oNum++;
            }
        }
        //;
        if (phoneNum != '') {
            if (Area == "") {
                $("#phoneNum").next('.judge').css('display', 'block').text('请输入区号');
                $("#area").css('border', '1px solid red');
                oNum++;
            } else if (phoneNumC == undefined || phoneNumC == 0) {
                $("#phoneNum").next('.judge').css('display', 'block').text('请选择国家');
            } else {
                if ($('#phoneNum').attr('pass') == 1) oNum++;
                phoneNum = phoneNumC + '-' + Area + '-' + phoneNum;
            }
        }
        //;
        //if ($('#address').attr('pass') == 1) oNum++;
        //if ($('#zipCode').attr('pass') == 1) oNum++;
        //if ($('#receiver').attr('pass') == 1) oNum++;
        //if ($('#area').attr('pass') == 1) {
        //    oNum++;
        //    $('#phoneNum').next('.judge').css('display', 'block').text('只能输入数字3-4位');
        //}
        ;
        if (id == "") {
            httpRequest({
                url: AjaxUrl.member_add_user_supplier_information_ajax,
                params: {
                    supplierName: supplierName,
                    countryId: countryId,
                    provinceId: provinceId,
                    cityId: cityId,
                    districtId: districtId,
                    address: address,
                    zipCode: zipCode,
                    supplierContact: supplierContact,
                    cellPhone: cellPhone,
                    phoneNum: phoneNum
                },
                success: function (response) {
                    location = location;
                    $('.mask').addClass('animated bounceOut');

                }
            });
        } else if (id != "") {

            httpRequest({
                url: AjaxUrl.member_update_user_supplier_information_ajax,
                params: {
                    id: id,
                    supplierName: supplierName,
                    countryId: countryId,
                    provinceId: provinceId,
                    cityId: cityId,
                    districtId: districtId,
                    address: address,
                    zipCode: zipCode,
                    supplierContact: supplierContact,
                    cellPhone: cellPhone,
                    phoneNum: phoneNum
                },
                success: function (response) {
                    $('.mask').addClass('animated bounceOut');
                    location = location;
                    $('.mask').addClass('animated bounceOut');
                }
            });
        }
        ;
    }


    /*
     * 当信息改变
     * */
    function infoChange() {
        //当国家改变
        $('#country').change(function () {
            $('.selectList').next('.judge').css('display', 'none');
        });

        //当座机号改动
        $('#phoneNum').change(function () {
            $('#cellPhone').next('.judge').css('display', 'none');
            $('#phoneNum').next('.judge').css('display', 'none');
        });
        //当区号改变
        $('#area').change(function () {
            $('#phoneNum').next('.judge').css('display', 'none');
            $(this).css('border', '1px solid #00aa5c');
        });

        $('#phoneNum-c').change(function () {
            $('#phoneNum').next('.judge').css('display', 'none');
            $('#area').css('border', '1px solid  #b9b9b9');
        });

        //当手机号改动
        $('#cellPhone').change(function () {
            $('#cellPhone').next('.judge').css('display', 'none');
            $('#phoneNum').next('.judge').css('display', 'none');
            $('#area').css('border', '1px solid  #b9b9b9');
        });

        $('#cellPhone-c').change(function () {
            $('#cellPhone').next('.judge').css('display', 'none');
        });
        //当详细地址
        $('#address').on("input", function () {
            $('#address').next('.judge').css('display', 'none');
        });
    }

    /*
     * 获取供应商信息
     * */
    function $Ajax() {

        httpRequest({
            url: AjaxUrl.member_get_user_supplier_information_ajax,
            success: function (response) {
                oData = response.data.supplierList;
                if (!oData) {

                    $('.main-r-show').css('display', 'block');
                    $('.main-r-hide').css('display', 'none');
                } else {
                    oData = response.data.supplierList;
                    $('.addBox .gree').text(oData.length);
                    $('.main-r-show').css('display', 'none');
                    $('.main-r-hide').css('display', 'block');
                    for (var i = 0; i < oData.length; i++) {
                        $('#lists').append("<li class='site-list'>" +
                            "        		<div class='list-top'>" +
                            "        			<h2 class='listName'>" + (oData[i].supplierName) + "</h2>" +
                            "        		</div>" +
                            "        		<div class='list-body'>" +
                            "        			<div class='characterBox' >" +
                            "        				<p class='character left'>供应商名称:</p>" +
                            "        				<p class='character'>" + (oData[i].supplierName) + "</p>" +
                            "        			</div>" +
                            "        			<div class='characterBox' >" +
                            "        				<p class='character left'>所在地区:</p>" +
                            "        				<p class='character mr12'>" + oData[i].countryName + "</p>" +
                            "        				<p class='character mr12'>" + oData[i].provinceName + "</p>" +
                            "        				<p class='character mr12'>" + oData[i].cityName + "</p>" +
                            "        			</div>" +
                            "        			<div class='characterBox'>" +
                            "        				<p class='character left'>详细地址:</p>" +
                            "        				<p class='character'>" + (oData[i].address) + "</p>" +
                            "        			</div>" +
                            "        			<div class='characterBox'>" +
                            "        				<p class='character left'>邮政编码:</p>" +
                            "        				<p class='character'>" + oData[i].zipCode + "</p>" +
                            "        			</div>" +
                            "        			<div class='characterBox'>" +
                            "        				<p class='character left'>联系人:</p>" +
                            "        				<p class='character'>" + oData[i].supplierContact + "</p>" +
                            "        			</div>" +
                            "        			<div class='characterBox'>" +
                            "        				<p class='character left'>手机号:</p>" +
                            "        				<p class='character'>" + oData[i].cellPhone + "</p>" +
                            "        			</div>" +
                            "        			<div class='characterBox'>" +
                            "        				<p class='character left'>电话号码:</p>" +
                            "        				<p class='character'>" + oData[i].phoneNum + "</p>" +
                            "        			</div>" +
                            "        			<a href='javascript:void(0);' data-ID='" + oData[i].id + "' class='shutOut'></a>" +
                            "        			<div class='select'>" +
                            "        				<a class='EditAddress' data-ID='" + oData[i].id + "' href='javascript:void(0);'>修改供应商信息</a>" +
                            "        			</div>" +
                            "        		</div>" +
                            "        	</li>");

                    }
                    ;
                }
                ;
            }
        });
    };

    /*
     * 新增弹窗出现
     * */
    function addPop() {
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
            $('.inform').css('display', 'block')
        }
        $('.mask').css('display', 'block');
        $('.mask').addClass('animated pulse');
        $('.inform-1').css('display', 'none');
        $('.inform').css('display', 'block')
    }

    /*
     * 赋值给修改框
     * */
    function modification(num) {
        for (var i = 0; i < oData.length; i++) {
            if (num == oData[i].id) {
                console.log(oData[i]);
                //赋值手机
                if (oData[i].cellPhone) {
                    var $Num = [];
                    $Num = (oData[i].cellPhone).split("-");
                    console.log($Num);
                    var cellPhone = $Num[1];
                    var cellPhoneC = $Num[0];
                    console.log(cellPhone, cellPhoneC);
                    var $option = $('#cellPhone-c option');
                    $.each($option, function (i) {
                        if (cellPhoneC == $option.eq(i).data('tel')) {
                            $(this).attr('selected', 'selected');
                            return false;
                        }
                    });
                    $('#cellPhone').val(cellPhone);
                }
                //赋值座机
                if (oData[i].phoneNum) {
                    var $Num = [];
                    $Num = (oData[i].phoneNum).split("-");
                    console.log($Num);
                    var phoneNumC = $Num[0];
                    var areaNum = $Num[1];
                    var phoneNum = $Num[2];
                    var $option = $('#phoneNum-c option');
                    $.each($option, function (i) {
                        if (phoneNumC == $option.eq(i).data('tel')) {
                            $(this).attr('selected', 'selected');
                            return false;
                        }
                    });
                    $('#phoneNum').val(phoneNum);
                    $('#area').val(areaNum);
                }
                ;

                $('#receiver').val(oData[i].receiver);
                $('#address').val((oData[i].address));
                $('#zipCode').val(oData[i].zipCode);
                $('#supplierName').val((oData[i].supplierName));
                $('#supplierContact').val(oData[i].supplierContact);

                //赋值省市区
                var countryId = oData[i].countryId,
                    provinceId = oData[i].provinceId,
                    cityId = oData[i].cityId,
                    districtId = oData[i].districtId;

                countryAjax(countryId, provinceId, cityId, districtId);
                $('#country').val(countryId);

                break;
            }

        }
    };

    /*
     * 点击删除
     * */
    function clickDelete() {
        var id = $('.inform-1 .hide-input').val();
        httpRequest({
            url: AjaxUrl.member_delete_user_supplier_information_ajax,
            params: {
                id: id
            },
            success: function (response) {
                location = location;
                $('.mask').addClass('animated bounceOut');
            }
        });
    }


    /*
     * 获取国家
     * */
    function getCountry() {
        //获取国家
        httpRequest({
            url: AjaxUrl.common_supported_countries_ajax,
            success: function (response) {
                $.each(response.data, function (k, v) {
                    $('.country').append('<option value=' + v.id + ' data-tel="' + v.areaCode + '">' + v.name + v.areaCode + '</option>');
                    $("#country").append('<option value=' + v.id + ' data-tel="' + v.areaCode + '">' + v.name + '</option>');

                });
            }
        });
    }

    /*
     * 获取省市县
     * */
    function countryAjax(countryId, provinceId, cityId, districtId) {
        httpRequest({
            url: AjaxUrl.common_supported_cities_ajax,
            params: {
                countryId: countryId
            },
            success: function (response) {

                $(".selectList").each(function () {
                    var areaJson = response.data;
                    // console.log(areaJson);
                    var temp_html;
                    var oProvince = $(this).find(".province");
                    var oCity = $(this).find(".city");
                    var oDistrict = $(this).find(".district");
                    //初始化省
                    var province = function () {
                        $.each(areaJson, function (i, province) {
                            temp_html += "<option value='" + province.id + "'>" + province.name + "</option>";
                        });
                        oProvince.html(temp_html);
                        city();
                    };
                    //赋值市
                    var city = function () {
                        temp_html = "";
                        var n = oProvince.get(0).selectedIndex;
                        $.each(areaJson[n].cities, function (i, city) {
                            temp_html += "<option value='" + city.id + "'>" + city.name + "</option>";
                        });
                        oCity.html(temp_html);
                        district();
                    };
                    //赋值县
                    var district = function () {
                        temp_html = "";

                        var m = oProvince.get(0).selectedIndex;
                        var n = oCity.get(0).selectedIndex;
                        if (typeof(areaJson[m].cities[n].areas) == "undefined") {
                            oDistrict.css("display", "none");
                        } else {
                            oDistrict.css("display", "inline");
                            $.each(areaJson[m].cities[n].areas, function (i, district) {
                                temp_html += "<option value='" + district.id + "'>" + district.name + "</option>";
                            });
                            oDistrict.html(temp_html);
                        }
                        ;
                    };
                    //选择省改变市
                    oProvince.change(function () {
                        city();
                    });
                    //选择市改变县
                    oCity.change(function () {
                        district();
                    });
                    province();
                    if (!provinceId)return false;
                    $('.province').val(provinceId);
                    $('.province').change();
                    $('.city').val(cityId);
                    $('.city').change();
                    $('.district').val(districtId);
                });

            }
        });
    };

});