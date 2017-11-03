/**
 * 进口下单第二步弹框
 * Created by 杨隆
 */
$(function() {
    var tel = /0?(13|14|15|17|18)[0-9]{9,10}$/;
    var areaNum = /^[0-9]{3,4}$/;
    var tesePhone = /^[0-9]{7,10}$/;
    //validate控件

    $("#addAdress").validate({
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

            var receiver = $('#receiver').val();
            var countryId = $('#country').val();
            var provinceId = $('.selectList>.province').find("option:selected").attr('value')
            var cityId = $('.selectList>.city').find("option:selected").attr('value')
            var districtId = $('.selectList>.district').find("option:selected").attr('value')
            var address = ($('#address').val());
            var zipCode = $('#zipCode').val();
            //var cellPhone = $('#cellPhone-c option:selected').attr('countryid')+'-'+ $('#cellPhone').val();
            var cellPhone =  $('#cellPhone').val();
            if(cellPhone==''){
                cellPhone=''
            }else{
                cellPhone = $('#cellPhone-c option:selected').attr('countryid')+'-'+ $('#cellPhone').val();
            }
            //var supplierName = $('#supplierName').val();
            var Area = $('#area').val();
            var phoneNum = $('#phoneNum-c option:selected').attr('countryid')+'-'+ Area + '-' + $('#phoneNum').val();

            if (Area == '') {
                phoneNum = ''
            } else {
                phoneNum = $('#phoneNum-c option:selected').attr('countryid')+'-'+ Area + '-' + $('#phoneNum').val();
            }
            //发送请求
            httpRequest({
                url: AjaxUrl.member_add_user_receive_address_ajax,
                params:   {
                    receiver: receiver,
                    countryId: countryId,
                    provinceId: provinceId,
                    cityId: cityId,
                    districtId: districtId,
                    address: address,
                    zipCode: zipCode,
                    cellPhone: cellPhone,
                    phoneNum: phoneNum,
                },
                success: function (response) {
                    location = location;
                    $('.mask').addClass('animated bounceOut');
                    $('#address_inform').css('display','none');
                    $('.mask').css('display','none');
                    // 更新
                    refreshAddress();
                }
            });
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
                limitSumAdd:true,
                maxlength:120,
            },
            zipCode: {
                required: true,
                isZipCode: true,

            },
            receiver: {
                required: true,
                isReceiver: true,
                limitSumNa:true,
                maxlength:120,
            },
        },
        messages: {
            country: '请选择国家和省/市/区',
            province: '请选择国家和省/市/区',
            city: '请选择国家和省/市/区',
            district: '请选择国家和省/市/区',
            address: {
                required: '带*选项不能为空',
                maxlength:'详细地址为4-120个字符'
            },
            zipCode: {
                required: '带*选项不能为空',
            },
            receiver: {
                required: '带*选项不能为空',
                maxlength:'长度为2-25个字符'
            },

        }
    });

    
    // 初始化页面
    init();
    // 新增收获地址弹框
    $('#add_1').click(createAddressForm);
    // 保存收获地址
    $("#saveAdress").click(function () {
       // $("#addAdress").submit()
    });

    // 页面初始化
    function init() {
        //获取国家
        $("#country").html('<option value="">请选择</option>');
        $.post(AjaxUrl.common_supported_countries_ajax,{},function(res){
            $.each(res.data, function(k, v) {
                $("#country").append('<option value=' + v.id + ' countryid="'+v.areaCode+'">' +v.name+ '</option>');
            });
        });
        //获取国家
        $("#cellPhone-c").html('<option value="">选择国家</option>');
        $("#phoneNum-c").html('<option value="">选择国家</option>');
        $.post(AjaxUrl.common_supported_countries_ajax,{},function(res){
            $.each(res.data, function(k, v) {
                $("#cellPhone-c").append('<option value=' + v.id + ' countryid="'+v.areaCode+'">' +v.name+ '</option>');
            });
            $.each(res.data, function(k, v) {
                $("#phoneNum-c").append('<option value=' + v.id + ' countryid="'+v.areaCode+'">' +v.name+ '</option>');
            });
        });
    }

    //初始化
    function createAddressForm() {
        $('.mask').css('display','block');
        $('.mask').eq(1).css('display','none');
        $('.inform').css('display','block');
        $('#inform_2').css('display','none')
        $('#inform4').css('display','none');
        // 清空收货地址
        $('#address').val("");
        $('#country').val("");
        //$('#country')
        //$('#country').html('<option>请选择</option>');
        $('.province').html('<option>请选择</option>');
        $('.city').html('<option>请选择</option>');
        $('.district').html('<option>请选择</option>');
        $('#country_phone').html('<option>请选择</option>');
        $('#zipCode').val('');
        $('#supplierName').val('');
        $('#receiver').val('');
        $('#cellPhone').val('');
        $('#phoneNum').val('');
        $('#area').val('');
    };

    //详细地址
    //$('#address').blur(function() {
    //    var oVal = $(this).val();
    //    var $address = /[\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
    //    var str = "只能输入汉字、字母、数字";
    //    yesOrNo(oVal, $address, $(this), str);
    //});
    //
    ////邮政编码
    //$('#zipCode').blur(function() {
    //    var oVal = $(this).val();
    //    var $postalcode = /^[0-9]{6,10}$/g;
    //    var str = '只能使用数字6-10位';
    //    yesOrNo(oVal, $postalcode, $(this), str);
    //});
    //
    ////收件人姓名
    //$('#receiver').blur(function() {
    //    var oVal = $(this).val();
    //    var $receiver = /[\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
    //    var str = '只能输入汉字、字母、数字';
    //    yesOrNo(oVal, $receiver, $(this), str);
    //});
    //
    //// 手机号
    //$('#cellPhone').blur(function() {
    //    var oVal = $(this).val();
    //    var $area = /^[0-9]{9,13}$/;
    //    var str = '只能输入数字9-13位';
    //    if(oVal !== "") {
    //        yesOrNo(oVal, $area, $(this), str);
    //    } else {
    //        $(this).next('.judge').css('display', 'none');
    //        $(this).css('border', '1px solid #b9b9b9');
    //    }
    //});
    //
    //// 座机号
    //$("#phoneNum").blur(function() {
    //    var oVal = $(this).val();
    //    var $cellPhone = /^[0-9]{8,10}$/;
    //    var str = "只能输入数字8位,选座机请填区号";
    //    if(oVal !== "") {
    //        yesOrNo(oVal, $cellPhone, $(this), str);
    //    } else {
    //        $(this).next(".judge").css("display", "none");
    //        $(this).css("border", "1px solid #b9b9b9");
    //    }
    //});
    //
    ////座机区号
    //$("#area").blur(function() {
    //    var oVal = $(this).val();
    //    var $cellPhone = /^[0-9]{3,4}$/;
    //    var str = "区号只能输入3-4位数字";
    //    if(oVal !== "") {
    //        yesOrNo(oVal, $cellPhone, $(this), str);
    //    } else {
    //        $(this).next(".judge").css("display", "none");
    //        $(this).css("border", "1px solid #b9b9b9");
    //    }
    //});
    //
    ////当区改变
    //$("#country").change(function() {
    //    $(".selectList").next(".judge").css("display", "none");
    //});
    //
    ////当座机号改动
    //$("#phoneNum").change(function() {
    //    $("#cellPhone").next(".judge").css("display", "none");
    //    $("#phoneNum").next(".judge").css("display", "none");
    //    $("#area").css("border", "1px solid  #b9b9b9");
    //});
    //
    ////当区号改变
    //$("#area").change(function() {
    //    $("#phoneNum").next(".judge").css("display", "none");
    //    $(this).css("border", "1px solid #00aa5c");
    //});
    //
    //$("#phoneNum-c").change(function() {
    //    $("#phoneNum").next(".judge").css("display", "none");
    //    $("#area").css("border", "1px solid  #b9b9b9");
    //});
    //
    ////当手机号改动
    //$("#cellPhone").change(function() {
    //    $("#cellPhone").next(".judge").css("display", "none");
    //    $("#phoneNum").next(".judge").css("display", "none");
    //    $("#area").css("border", "1px solid  #b9b9b9");
    //});
    //
    ////正则验证方法
    //function yesOrNo(val, reg, $this, str) {
    //    if(reg.test(val)) {
    //        $this.next(".judge").css("display", "none");
    //        $this.css("border", "1px solid #00aa5c");
    //        $this.removeAttr("pass");
    //    } else {
    //        $this.attr("pass", "1");
    //        $this.siblings(".judge").css("display", "block").text(str);
    //        $this.css("border", "1px solid red");
    //    }
    //};

    // 关闭
    $('.cancel').click(function() {
        $('.mask').addClass('animated bounceOut');
    });
    $('.out').click(function() {
        $('.mask').addClass('animated bounceOut');
    })



    // 更新地址
    function  refreshAddress() {

        httpRequest({
            url: AjaxUrl.member_get_user_receive_address_ajax,
            success: function (response) {
                $('#select').html('');
                var data=response.data.receiveAddress;
                $.each(data, function (k, v) {
                    var tag = '<option>' + v.receiver + '</option>';
                    $('#select').append(tag);
                    $('#select option:last-of-type').attr('selected','true').attr('deliveryId',v.id)
                    if (v.id == $('#select option:selected').attr('deliveryid')) {
                        deliveryId = v.id;
                        var tag = '  <li>' +
                            '<span>收件人：</span>' + data[k].receiver +
                            '</li>' +
                            '<li>' +
                            '<span>所在地区：</span>' +
                            '<div class="country">' + data[k].countryName + '</div>' +
                            '<div class="province">' + data[k].provinceName + '</div>' +
                            '<div class="xian">' + data[k].districtName + '</div>' +
                            '</li>' +
                            '<li>' +
                            '<span>详细地址：</span>' + (data[k].address) +
                            '</li>' +
                            '<li>' +
                            '<span>邮政编码：</span>' + data[k].zipCode +
                            '</li>' +
                            '<li>' +
                            '<span>手机：</span>' + data[k].cellPhone +
                            '</li>' +
                            '<li>' +
                            '<span>固定电话：</span>' + data[k].phoneNum +
                            '</li>';
                        $('#select_list').html(tag);
                        $('#select_list').css('display', 'block');
                    }
                })
            }
        });
    }

    //当国家值改变
    $("#country").change(function() {
        var id = $("#country").val();
        if(id==0){
            $('.province').html('<option value="0">选择省</option>');
            $('.city').html('<option value="0">选择市</option>');
            $('.district').html('<option value="0">选择区</option>');
        }
        countryAjax(id);
    });

    function countryAjax(countryId,provinceId,cityId,districtId) {

        httpRequest({
            url: AjaxUrl.common_supported_cities_ajax,
            params:  {
                countryId:countryId
            },
            success: function (response) {
                $(".selectList").each(function() {
                    var areaJson = response.data;
                    var temp_html;
                    var oProvince = $(this).find(".province");
                    var oCity = $(this).find(".city");
                    var oDistrict = $(this).find(".district");
                    //初始化省
                    // initProvince(areaJson);
                    var province = function() {
                        $.each(areaJson, function(i, province) {
                            temp_html += "<option value='" + province.id + "'>" + province.name + "</option>";
                        });
                        oProvince.html(temp_html);
                        city();
                    };
                    //赋值市
                    var city = function() {
                        temp_html = "";
                        var n = oProvince.get(0).selectedIndex;
                        $.each(areaJson[n].cities, function(i, city) {
                            temp_html += "<option value='" + city.id + "'>" + city.name + "</option>";
                        });
                        oCity.html(temp_html);
                        district();
                    };
                    //赋值县
                    var district = function() {
                        temp_html = "";

                        var m = oProvince.get(0).selectedIndex;
                        var n = oCity.get(0).selectedIndex;
                        if(typeof(areaJson[m].cities[n].areas) == "undefined") {
                            oDistrict.css("display", "none");
                        } else {
                            oDistrict.css("display", "inline");
                            $.each(areaJson[m].cities[n].areas, function(i, district) {
                                temp_html += "<option value='" + district.id + "'>" + district.name + "</option>";
                            });
                            oDistrict.html(temp_html);
                        };
                    };
                    //选择省改变市
                    oProvince.change(function() {
                        city();
                    });
                    //选择市改变县
                    oCity.change(function() {
                        district();
                    });
                    province();
                    if(!provinceId)return false;
                    $('.province').val(provinceId);
                    $('.province').change();
                    $('.city').val(cityId);
                    $('.city').change();
                    $('.district').val(districtId);
                });
            }
        });
    };

    // 初始化省
    function initProvince (areaJson) {
        $.each(areaJson, function(i, province) {
            temp_html += "<option value='" + province.id + "'>" + province.name + "</option>";
        });
        $(".selectList .province").html(temp_html);
        initCity(areaJson);
    };

    // 初始化市
    function initCity(areaJson) {
        temp_html = "";
        var n = $(".selectList .province").get(0).selectedIndex;
        $.each(areaJson[n].cities, function(i, city) {
            temp_html += "<option value='" + city.id + "'>" + city.name + "</option>";
        });
        $(".selectList .province").html(temp_html);
        // district();
    };

});
