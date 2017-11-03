$(function () {
    var oData;
    var tel = /0?(13|14|15|17|18)[0-9]{9,10}$/;
    var areaNum = /^[0-9]{3,4}$/;
    var tesePhone = /^[0-9]{7,10}$/;
    // 地址校验
    $("#addAddress").validate({
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

            // 保存收获地址
            saveAddress();
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
            receiver: {
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
            receiver: {
                required: '带*选项不能为空',
            },

        }
    });

    //直接请求ajax看是否有收货地址
    $Ajax();
    //详细地址
    //$('#address').blur(function() {
    //	var oVal = $(this).val(),
    //		max=120,
    //		min=4,
    //		str = "详细地址为4-120个字符";
    //	valLength(oVal,max,min,str,$(this));
    //});
    //邮政编码
    //$('#zipCode').blur(function () {
    //    var oVal = $(this).val();
    //    var $postalcode = /^[0-9]{6,10}$/g;
    //    var str = '只能使用数字6-10位';
    //    yesOrNo(oVal, $postalcode, $(this), str);
    //});
    ////收件人姓名
    //$('#receiver').blur(function () {
    //    var oVal = $(this).val(),
    //        max = 25,
    //        min = 4,
    //        str = "收件人姓名为4-25个字符";
    //    valLength(oVal, max, min, str, $(this));
    //});
    ////手机号
    //$('#cellPhone').blur(function () {
    //    var oVal = $(this).val();
    //    var $area = /^[0-9]{9,13}$/;
    //    var str = '只能输入数字9-13位';
    //    if (oVal !== "") {
    //        yesOrNo(oVal, $area, $(this), str);
    //    } else {
    //        $(this).next('.judge').css('display', 'none');
    //        $(this).css('border', '1px solid #b9b9b9');
    //    }
    //});
    ////座机号
    //$("#phoneNum").blur(function () {
    //    var oVal = $(this).val();
    //    var $cellPhone = /^[0-9]{8,10}$/;
    //    var str = "只能输入数字8到10位,选座机请填区号";
    //    if (oVal !== "") {
    //        yesOrNo(oVal, $cellPhone, $(this), str);
    //    } else {
    //        $(this).next(".judge").css("display", "none");
    //        $(this).css("border", "1px solid #b9b9b9");
    //    }
    //});
    ////座机区号
    //$("#area").blur(function () {
    //    var oVal = $(this).val();
    //    var $cellPhone = /^[0-9]{3,}$/;
    //    var str = "只能输入数字3位数字";
    //    if (oVal !== "") {
    //        yesOrNo(oVal, $cellPhone, $(this), str);
    //    } else {
    //        $(this).next(".judge").css("display", "none");
    //        $(this).css("border", "1px solid #b9b9b9");
    //    }
    //});
    //当区改变
    $("#country").change(function () {
        $(".selectList").next(".judge").css("display", "none");
    });
    //当座机号改动
    $("#phoneNum").change(function () {
        $("#cellPhone").next(".judge").css("display", "none");
        $("#phoneNum").next(".judge").css("display", "none");
        $("#area").css("border", "1px solid  #b9b9b9");
    });
    //当区号改变
    $("#area").change(function () {
        $("#phoneNum").next(".judge").css("display", "none");
        $(this).css("border", "1px solid #00aa5c");
    });
    $("#phoneNum-c").change(function () {
        $("#phoneNum").next(".judge").css("display", "none");
        $("#area").css("border", "1px solid  #b9b9b9");
    });
    //当手机号改动
    $("#cellPhone").change(function () {
        $("#cellPhone").next(".judge").css("display", "none");
        $("#phoneNum").next(".judge").css("display", "none");
        $("#area").css("border", "1px solid  #b9b9b9");
    });
//当详细地址
    $('#address').on("input", function () {
        $('#address').next('.judge').css('display', 'none');
    });



    //控制弹窗消失/显示
    //新增/修改弹窗
    $('.pop-up').click(function () {
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
            $('.inform').css('display', 'block')
        }
        $('.mask').css('display', 'block');
        $('.mask').addClass('animated pulse');
        $('.inform-1').css('display', 'none');
        $('.inform-2').css('display', 'none');
        $('.inform').css('display', 'block');
    });
    $('#lists').on('click', '.EditAddress', function () {
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
            $('.inform').css('display', 'block')
        }
        $('.mask').css('display', 'block');
        $('.mask').addClass('animated pulse');
        $('.inform-1').css('display', 'none');
        $('.inform-2').css('display', 'none');
        $('.inform').css('display', 'block');
        var oNum = $(this).data().id;
        $('.inform .hide-input').val($(this).data().id);
        $('.inform-head .fl').text('修改收货地址');
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
        $('.inform-2').css('display', 'none');
        $('.inform-1').css('display', 'block');
        //值给页面上的input
        $('.inform-1 .hide-input').val($(this).data().id);
    });
    //设为默认
    $('#lists').on('click', '.SetDefault', function () {
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
            $('.inform-2').css('display', 'block')
        }
        $('.mask').css('display', 'block');
        $('.mask').addClass('animated pulse');
        $('.inform').css('display', 'none')
        $('.inform-1').css('display', 'none');
        $('.inform-2').css('display', 'block')
        $('.inform-2 .hide-input').val($(this).data().id);
    });
    $('.cancel').click(function () {
        //		$('input').val('').css('border-color', '#B9B9B9');
        //		$('.judge').hide();
        //		$('.country').val(0);
        //		changeVal(0);
        location = location;
        $('.mask').addClass('animated bounceOut');
    });
    $('.out').click(function () {
        $('.mask').addClass('animated bounceOut');
    })

    //点击新增保存按钮
    $(".save").click(function () {
        return;
    });



    //点击删除确定
    $('.shutOut-true').click(deleteAdd);

    //设为默认的确定
    $('.SetDefault-true').click(SetDefaultTrue);

    //获取国家
    getCountry();

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
    *正则验证方法
    * */
    function yesOrNo(val, reg, $this, str) {
        if (val.length < 1)return false;
        if (reg.test(val)) {
            $this.next(".judge").css("display", "none");
            $this.css("border", "1px solid #00aa5c");
            $this.removeAttr("pass");
        } else {
            $this.attr("pass", "1");
            $this.next(".judge").css("display", "block").text(str);
            $this.css("border", "1px solid red");
        }
    };

    /*
    *只校验长度
    * */
    function valLength(oVal, max, min, str, $this) {
        var valNum,
            oVal = $.trim(oVal);//去除前后空格
        if (oVal.length < 1)return false;
        if (/[\u4e00-\u9fa5]/.test(oVal)) {
            valNum = oVal.length + oVal.match(/[^x00-xff]/g).length;
        } else {
            valNum = oVal.length;
        }
        ;
        if (valNum) {
            if (valNum < min || valNum > max) {
                $this.attr('pass', '1');
                $this.next('.judge').css({
                    'display': 'block',
                    'color': 'red'
                }).text(str);
                $this.css('border', '1px solid red');
            } else {
                $this.next('.judge').css('display', 'none');
                $this.css('border', '1px solid #00aa5c');
                $this.removeAttr('pass');
            }
            ;
        }
        ;
    };

    /*
    * 获取收货地址信息
    * */
    function $Ajax() {
        httpRequest({
            url: AjaxUrl.member_get_user_receive_address_ajax,
            success: function (response) {
                oData = response.data.receiveAddress;
                if (!oData || oData.length == 0) {

                    $('.main-r-show').css('display', 'block');
                    $('.main-r-hide').css('display', 'none');
                } else {
                    $('.addBox .gree').text(oData.length);
                    $('.main-r-show').css('display', 'none');
                    $('.main-r-hide').css('display', 'block');
                    for (var i = 0; i < oData.length; i++) {
                        var $lists = $("<li class='site-list'>" +
                            "        		<div class='list-top'>" +
                            "        			<h2 class='listName'>" + oData[i].receiver + "</h2>" +
                            "        			<span class='default" + oData[i].selected + "'>默认地址</span>" +
                            "        		</div>" +
                            "        		<div class='list-body'>" +
                            "        			<div class='characterBox' >" +
                            "        				<p class='character left'>收件人:</p>" +
                            "        				<p class='character'>" + oData[i].receiver + "</p>" +
                            "        			</div>" +
                            "        			" +
                            "        			<div class='characterBox' >" +
                            "        				<p class='character left'>所在地:</p>" +
                            "        				<p class='character mr12 provinceId' provinceId='" + oData[i].provinceId + "' >" + oData[i].provinceName + "</p>" +
                            "        				<p class='character mr12 cityId' cityId='" + oData[i].cityId + "' >" + oData[i].cityName + "</p>" +
                            "        				<p class='character districtId' districtId='" + oData[i].districtId + "' >" + oData[i].districtName + "</p>" +
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
                            "        				<p class='character left'>手机:</p>" +
                            "        				<p class='character'>" + oData[i].cellPhone + "</p>" +
                            "        			</div>" +
                            "        			<div class='characterBox'>" +
                            "        				<p class='character left'>固定电话:</p>" +
                            "        				<p class='character'>" + oData[i].phoneNum + "</p>" +
                            "        			</div>" +
                            "        			<a href='javascript:void(0);' data-id='" + oData[i].id + "' class='shutOut'></a>" +
                            "        			<div class='select'>" +
                            "        				<a href='javascript:void(0);' data-id='" + oData[i].id + "' class='SetDefault mr40 show-" + oData[i].selected + "'>设为默认地址</a>" +
                            "        				<a href='javascript:void(0);' data-id='" + oData[i].id + "' class='EditAddress'>编辑地址</a>" +
                            "        			</div>" +
                            "        		</div></li>");
                        $('#lists').append($lists);
                    }
                    ;
                }
                ;
            }
        });
    };

    /*
    * 修改收货地址
    * 赋值给修改框
    * */
    function modification(num) {
        for (var i = 0; i < oData.length; i++) {
            if (num == oData[i].id) {

                console.log(oData[i]);
                //赋值手机
                //if(oData[i].cellPhone) {
                //	var $Num=[];
                //	$Num=(oData[i].cellPhone).split("-");
                //	var cellPhone =$Num[1];
                //	var cellPhoneC =$Num[0];
                //	console.log(cellPhone,cellPhoneC);
                //	var $option = $('#cellPhone-c option');
                //	$.each($option, function(i) {
                //		if(cellPhoneC == $option.eq(i).data('tel')) {
                //			$(this).attr('selected', 'selected');
                //			return false;
                //		}
                //	});
                //	$('#cellPhone').val(cellPhone);
                //}
                ////赋值座机
                //if(oData[i].phoneNum) {
                //	var $Num=[];
                //	$Num=(oData[i].phoneNum).split("-");
                //	var phoneNumC =$Num[0];
                //	var areaNum = $Num[1];
                //	var phoneNum = $Num[2];
                //	var $option = $('#phoneNum-c option');
                //	$.each($option, function(i) {
                //		if(phoneNumC == $option.eq(i).data('tel')) {
                //			$(this).attr('selected', 'selected');
                //			return false;
                //		}
                //	});
                //	$('#phoneNum').val(phoneNum);
                //	$('#area').val(areaNum);
                //};
                //赋值输入框
                if (oData[i].cellPhone) {
                    var $Num = [];
                    $Num = (oData[i].cellPhone).split("-");
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
    *保存收获地址
    * */
    function saveAddress() {
        var oNum = 0; //用于判断所有框格式是否合格
        var id = $('.inform .hide-input').val();
        var address = ($.trim($('#address').val()));
        var zipCode = $('#zipCode').val();
        var receiver = $.trim($('#receiver').val());
        var selected = $('.moren')[0].checked ? 1 : 0;
        var countryId = $('#country').val();
        var provinceId = $('.province').val();
        var cityId = $('.inform .city').val();
        var districtId = $('.inform .district').val();
        var cellPhone = $('#cellPhone').val();
        var cellPhoneC = $('#cellPhone-c').find("option:selected").data('tel');
        var Area = $('#area').val();
        var phoneNum = $('#phoneNum').val();
        var phoneNumC = $('#phoneNum-c').find("option:selected").data('tel');
        if(cellPhone==''){
            cellPhone=''
        }else{
            cellPhone=cellPhoneC + '-' +cellPhone
        };

        if(phoneNum==''){
            phoneNum=''
        }else{
            phoneNum =phoneNumC +'-'+Area +'-'+phoneNum
        }
        console.log(cellPhone);
        if (oNum == 0 && id == "") {
            httpRequest({
                url: AjaxUrl.member_add_user_receive_address_ajax,
                params: {
                    receiver: receiver,
                    countryId: countryId,
                    provinceId: provinceId,
                    cityId: cityId,
                    districtId: districtId,
                    address: address,
                    zipCode: zipCode,
                    cellPhone: cellPhone,
                    phoneNum: phoneNum,
                    selected: selected
                },
                success: function (response) {
                    location = location;
                    $('.mask').addClass('animated bounceOut');
                }
            });
        } else if (oNum == 0 && id != "") {
            httpRequest({
                url: AjaxUrl.member_update_user_receive_address_ajax,
                params: {
                    id: id,
                    receiver: receiver,
                    countryId: countryId,
                    provinceId: provinceId,
                    cityId: cityId,
                    districtId: districtId,
                    address: address,
                    zipCode: zipCode,
                    cellPhone: cellPhone,
                    phoneNum: phoneNum,
                    selected: selected
                },
                success: function (response) {
                    location = location;
                    $('.mask').addClass('animated bounceOut');
                }
            });
        }
        ;
    }

    /*
    * 点击删除
    * */
    function deleteAdd (){
        var oVal = $('.inform-1 .hide-input').val();
        httpRequest({
            url:AjaxUrl.member_delete_user_receive_address_ajax,
            params:{
                id: oVal
            },
            success: function (response) {
                $('.mask').addClass('animated bounceOut');
                //						$('#lists').empty();
                //						$Ajax();
                location = location;
                $('.mask').addClass('animated bounceOut');
            }
        })
    }


    /*
    * 设置默认的收货地址
    * */
    function SetDefaultTrue (){
        var oVal = $('.inform-2 .hide-input').val();
        httpRequest({
            url: AjaxUrl.member_set_default_address_ajax,
            params: {
                id: oVal
            },
            success: function (response) {
                $('.mask').addClass('animated bounceOut');
                //						$('#lists').empty();
                //						$Ajax();
                location = location;
                $('.mask').addClass('animated bounceOut');
            }
        });
    }

    /*
    * 获取国家
    * */
    function getCountry (){
        httpRequest({
            url: AjaxUrl.common_supported_countries_ajax,
            success: function (response) {
                // 初始化国家下拉框   测试共通下拉框
                // var countrySelect=new FruitSelect("country",{
                //     class:"country",
                //     name:"country",
                //     selectData:response.data,
                //     keyVal:{name:"name",value:"id"},
                //     defaultValObj:{name:"请选择国家",value:"0"},
                //     defaultVal:"0",
                //     change:function () {
                //         console.log("change:",$(this).val());
                //     }
                // });

                // 绑定下拉框
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