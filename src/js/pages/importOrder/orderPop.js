//$(function () {
//
//    // 新增供应商
//    $('.add-supplier').click(addSupply);
//    // 保存供应商
//    $("#addSuppierBtn").click(function(){
//        saveSupplier()
//    });
//
//    $('.judge').css('display','none')
//    // 关闭弹出框
//    $('.cancel').click(function () {
//        $('.mask').addClass('animated bounceOut');
//        $('.mask').css('display', 'none');
//    })
//
//    // 添加校验事件
//    function addSupplyVerify(){
//        //邮政编码
//        $('#zipCode').blur(function () {
//            var oVal = $(this).val();
//            var $postalcode = /^[0-9]{6,10}$/g;
//            var str = '只能使用数字6-10位';
//            yesOrNo(oVal, $postalcode, $(this), str);
//        });
//
//        //详细地址
//        $('#address').blur(function () {
//            var oVal = $(this).val();
//            var $address = /[\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
//            var str = "只能输入汉字、字母、数字";
//            yesOrNo(oVal, $address, $(this), str);
//        });
//
//        //供应商名称
//        $('#supplierName').blur(function () {
//            var oVal = $(this).val();
//            // 校验为空
//            if (oVal!="") {
//                $(this).next('.judge').css('display', 'none');
//                $(this).css('border', '1px solid lawngreen');
//            } else {
//                $(this).next('.judge').css('display', 'block').text("请输入供应商");
//                $(this).css('border', '1px solid red');
//            }
//        });
//
//        //联系人姓名
//        $('#receiver').blur(function () {
//            var oVal = $(this).val();
//            if (oVal.length<2||oVal.length>12) {
//                $(this).next('.judge').css('display', 'block').text("请输入联系人名称");
//                $(this).css('border', '1px solid red');
//            } else {
//                $(this).next('.judge').css('display', 'none');
//                $(this).css('border', '1px solid lawngreen');
//            }
//        });
//
//        //手机号
//        $('#cellPhone').blur(function () {
//            var oVal = $(this).val();
//            var $area = /0?(13|14|15|17|18)[0-9]{9,10}$/;
//            var str = '只能输入数字8-13位';
//            if (oVal !== "") {
//                yesOrNo(oVal, $area, $(this), str);
//            } else {
//                $(this).next('.judge').css('display', 'none');
//                $(this).css('border', '1px solid #b9b9b9');
//            }
//        });
//
//        //座机号
//        $('#phoneNum').blur(function () {
//            var oVal = $(this).val();
//            var $cellPhone = /^[0-9]{8,10}$/;
//            var str = '只能输入数字8位,选座机请填区号';
//            if (oVal !== "") {
//                yesOrNo(oVal, $cellPhone, $(this), str);
//            } else {
//                $(this).next('.judge').css('display', 'none');
//                $(this).css('border', '1px solid #b9b9b9');
//            }
//        });
//    }
//
//    // 省市县三级联动绑定事件
//    function addressEvent() {
//        //三级联动
//        //获取国家
//        $.getJSON("js/json/12.json", function (data) {
//            for (var i = 0; i < data.length; i++) {
//                var $opt = $('<option brand=' + data[i].id + '>' + data[i].name + '</option>');
//                $('.country').append($opt);
//
//            }
//        });
//
//        //获取国家
//        $('.country').html('');
//        var tagCountry ='<option value="">请选择</option>';
//        $('.country').append(tagCountry);
//
//        httpRequest({
//            url: AjaxUrl.common_supported_countries_ajax,
//            success: function (response) {
//                var country =response.data
//                $.each(country, function(k, v) {
//                    var $opt = $('<option value=' + v.id + '>' + v.name + '</option>');
//                    $('.country').append($opt);
//                });
//            }
//        });
//
//        //当国家值改变
//        $("#country").on('input',function() {
//
//            var id = $(".country").find("option:selected").attr('value');
//            if(id==0){
//                $('.province').html('<option value="0">选择省</option>');
//                $('.city').html('<option value="0">选择市</option>');
//                $('.district').html('<option value="0">选择区</option>');
//            }
//            $('#country').siblings('.judge').css('display','none')
//            countryAjax(id);
//        });
//    }
//
//    // 国家联动事件
//    function countryAjax(id) {
//
//        httpRequest({
//            url: AjaxUrl.common_supported_cities_ajax,
//            params: {
//                countryId:id
//            },
//            success: function (response) {
//                $(".selectList").each(function() {
//                    var areaJson = response.data;
//
//                    var temp_html;
//                    var oProvince = $(this).find(".province");
//                    var oCity = $(this).find(".city");
//                    var oDistrict = $(this).find(".district");
//                    //初始化省
//                    var province = function() {
//                        $.each(areaJson, function(i, province) {
//                            temp_html += "<option value='" + province.id + "'>" + province.name + "</option>";
//                        });
//                        oProvince.html(temp_html);
//                        city();
//                    };
//                    //赋值市
//                    var city = function() {
//                        temp_html = "";
//                        var n = oProvince.get(0).selectedIndex;
//                        $.each(areaJson[n].cities, function(i, city) {
//                            temp_html += "<option value='" + city.id + "'>" + city.name + "</option>";
//                        });
//                        oCity.html(temp_html);
//                        district();
//                    };
//                    //赋值县
//                    var district = function() {
//                        temp_html = "";
//
//                        var m = oProvince.get(0).selectedIndex;
//                        var n = oCity.get(0).selectedIndex;
//                        if(typeof(areaJson[m].cities[n].areas) == "undefined") {
//                            oDistrict.css("display", "none");
//                        } else {
//                            oDistrict.css("display", "inline");
//                            $.each(areaJson[m].cities[n].areas, function(i, district) {
//                                temp_html += "<option value='" + district.id + "'>" + district.name + "</option>";
//                            });
//                            oDistrict.html(temp_html);
//                        };
//                    };
//                    //选择省改变市
//                    oProvince.change(function() {
//                        city();
//                    });
//                    //选择市改变县
//                    oCity.change(function() {
//                        district();
//                    });
//                    province();
//                });
//            }
//        });
//    }
//
//    //正则验证方法
//    function yesOrNo(val, reg, $this, str) {
//        if (reg.test(val)) {
//            $this.next('.judge').css('display', 'none');
//            $this.css('border', '1px solid lawngreen');
//        } else {
//            $this.next('.judge').css('display', 'block').text(str);
//            $this.css('border', '1px solid red');
//        }
//    };
//
//    // 添加供应商
//    function addSupply() {
//        // 弹框
//        $('.mask').css('display', 'block');
//        $('.inform').css('display', 'block');
//        $('.inform-3').css('display', 'none');
//        $('.inform-4').css('display', 'none');
//        $('.inform-1').css('display', 'none');
//        $('#inform2').css('display','none');
//        //　新增表单初始化
//        $('#country').html('<option>请选择</option>');
//        $('.province').html('<option>请选择</option>');
//        $('.city').html('<option>请选择</option>');
//        $('.district').html('<option>请选择</option>');
//        $('#country_phone').html('<option>请选择</option>');
//        $('#country_phone').html('<option>请选择</option>');
//        $('.country').html('<option>请选择</option>');
//        $('#address').val('');
//        $('#zipCode').val('');
//        $('#supplierName').val('');
//        $('#receiver').val('');
//        $('#cellPhone').val('');
//        $('#phoneNum').val('');
//        $('#area').val('');
//
//        // 添加校验
//        addSupplyVerify();
//
//        // 绑定省市县三级联动
//        addressEvent();
//    }
//
//    //点击保存按钮
//    function saveSupplier() {
//
//        var oNum = 0;//用于判断所有框格式是否合格
//        var id = $('.inform .hide-input').val();
//        var receiver = $('#receiver').val();
//        var countryId =$('#country').val();
//        var provinceId = $('.selectList>.province').find("option:selected").attr('value')
//        var cityId = $('.selectList>.city').find("option:selected").attr('value')
//        var districtId = $('.selectList>.district').find("option:selected").attr('value')
//        var address = $('#address').val();
//        var zipCode = $('#zipCode').val();
//        var cellPhone = $('#cellPhone').val();
//        var supplierName = $('#supplierName').val();
//        var Area = $('#area').val();
//        var phoneNum = $('#phoneNum').val();
//
//
//        if (provinceId == undefined || provinceId == 100000) {
//            $('.selectList').next('.judge').css('display', 'block').text('请选择国家和省/市/区');
//            oNum++
//        }
//        if (address == '' ) {
//            $("#address").next('.judge').css('display', 'block').html("带*选项不能为空");
//            oNum++
//        }
//        if(zipCode == ''){
//            $("#zipCode").next('.judge').css('display', 'block').html("带*选项不能为空");
//            oNum++
//        }
//        if( receiver == ''){
//            $("#supplierName").next('.judge').css('display', 'block').html("带*选项不能为空");
//            oNum++
//        }
//        if( supplierName == ''){
//            $("#receiver").next('.judge').css('display', 'block').html("带*选项不能为空");
//            oNum++
//        }
//        if (cellPhone == '' && phoneNum == '') {
//            $(".reminder").html("手机号或座机号必填一个");
//            oNum++
//        }
//        if(oNum==0){
//            //所有验证正确
//            //发送请求
//            httpRequest({
//                url: AjaxUrl.member_add_user_supplier_information_ajax,
//                params:   {
//                    supplierName: supplierName,
//                    countryId: countryId,
//                    provinceId: provinceId,
//                    cityId: cityId,
//                    districtId: districtId,
//                    address: address,
//                    zipCode: zipCode,
//                    supplierContact: receiver,
//                    cellPhone: cellPhone,
//                    phoneNum: phoneNum
//                },
//                success: function (response) {
//                    $('.mask').css('display', 'none');
//
//                    // 更新供应商
//                    refreshLogisticsSupplier();
//                },
//                error:function (response) {
//                    $(".reminder").html("添加失败");
//                }
//            });
//
//        }
//    };
//
//})
$(function () {
    var tel = /0?(13|14|15|17|18)[0-9]{9,10}$/;
    var areaNum = /^[0-9]{3,4}$/;
    var tesePhone = /^[0-9]{7,10}$/;
    // form 加上校验
    // 新增供应商
    $('.add-supplier').click(addSupply);
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
                if ($('#country_phone option:selected').html() == '请选择') {
                    $('#country_phone').siblings('.judge').html('请选择国家').css('display', 'block');
                    return
                } else if (!tel.test($('#cellPhone').val())) {
                    $('#country_phone').siblings('.judge').html('请输入有效的手机号码').css('display', 'block');
                    return
                }
            }
            ;

            if ($('#phoneNum').val() != '') {
                if ($('#country_phoneNum option:selected').html() == '请选择') {
                    $('#country_phoneNum').siblings('.judge').html('请选择国家').css('display', 'block');
                    return
                } else if (!areaNum.test($('#area').val())) {
                    $('#country_phoneNum').siblings('.judge').html('区号只能输入3-4位数字').css('display', 'block');
                    $('#area').focus()
                    return
                } else if (!tesePhone.test($('#phoneNum').val())) {
                    $('#country_phoneNum').siblings('.judge').html('只能输入数字7-10位').css('display', 'block');
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
            var cellPhone =  $('#cellPhone').val();
            var supplierName = ($('#supplierName').val());
            var Area = $('#area').val();
            var phoneNum =$('#country_phoneNum option:selected').attr('countryid')+'-'+ Area + '-' + $('#phoneNum').val();
            if (Area == '') {
                phoneNum = ''
            } else {
                phoneNum = $('#country_phoneNum option:selected').attr('countryid')+'-'+ Area + '-' + $('#phoneNum').val();
            }
            if(cellPhone==''){
                cellPhone=''
            }else{
                cellPhone = $('#country_phone option:selected').attr('countryid')+'-'+ $('#cellPhone').val();
            }
            //发送请求
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
                    supplierContact: receiver,
                    cellPhone: cellPhone,

                    phoneNum: phoneNum
                },
                success: function (response) {
                    $('.mask').css('display', 'none');

                    // 更新供应商
                    refreshLogisticsSupplier();
                },
                error: function (response) {
                    $(".reminder").html("添加失败");
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
                maxlength: 120,
            },
            zipCode: {
                required: true,
                isZipCode: true,

            },
            supplierName: {
                required: true,
                //isSupplierName: true,
                limitSumName:true,
                maxlength: 25,
            },
            receiver: {
                required: true,
                isReceiver: true,
                limitSumNa:true,
                maxlength: 25,
            },
        },
        messages: {
            country: '请选择国家和省/市/区',
            province: '请选择国家和省/市/区',
            city: '请选择国家和省/市/区',
            district: '请选择国家和省/市/区',
            address: {
                required: '带*选项不能为空',
                maxlength:'长度为2-120个字符'
            },
            zipCode: {
                required: '带*选项不能为空',
            },
            supplierName: {
                required: '带*选项不能为空',
                maxlength:'长度为2-25个字符'
            },
            receiver: {
                required: '带*选项不能为空',
                maxlength:'长度为2-25个字符'
            },

        }
    });

    function addSupply() {
        // 弹框
        $('.mask').css('display', 'block');
        $('.inform').css('display', 'block');
        $('.inform-3').css('display', 'none');
        $('.inform-4').css('display', 'none');
        $('.inform-1').css('display', 'none');
        $('#inform2').css('display', 'none');
        //　新增表单初始化
        $('#country').html('<option>请选择</option>');
        $('.province').html('<option>请选择</option>');
        $('.city').html('<option>请选择</option>');
        $('.district').html('<option>请选择</option>');
        $('#country_phone').html('<option>请选择</option>');
        $('#country_phone').html('<option>请选择</option>');
        $('.country').html('<option>请选择</option>');
        $('#address').val('');
        $('#zipCode').val('');
        $('#supplierName').val('');
        $('#receiver').val('');
        $('#cellPhone').val('');
        $('#phoneNum').val('');
        $('#area').val('');

        // 添加校验
        //addSupplyVerify();
        //
        //// 绑定省市县三级联动
        addressEvent();
    }

    // 省市县三级联动绑定事件
    function addressEvent() {
        //三级联动
        //获取国家
        $('.country').html('');
        var tagCountry = '<option value="">请选择</option>';
        $('.country').append(tagCountry);

        httpRequest({
            url: AjaxUrl.common_supported_countries_ajax,
            success: function (response) {
                var country = response.data
                $.each(country, function (k, v) {
                    var $opt = $('<option value=' + v.id + ' countryid ='+ v.areaCode+'>' + v.name + '</option>');
                    $('.country').append($opt);
                });
            }
        });

        //当国家值改变
        $("#country").on('change', function () {

            var id = $(".country").find("option:selected").attr('value');
            if (id == 0) {
                $('.province').html('<option value="0">选择省</option>');
                $('.city').html('<option value="0">选择市</option>');
                $('.district').html('<option value="0">选择区</option>');
            }
            $('#country').siblings('.judge').css('display', 'none')
            countryAjax(id);
        });
    }
    // 国家联动事件

    function countryAjax(id) {

        httpRequest({
            url: AjaxUrl.common_supported_cities_ajax,
            params: {
                countryId: id
            },
            success: function (response) {
                $(".selectList").each(function () {
                    var areaJson = response.data;

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
                });
            }
        });
    }
    $('#addSuppierBtn').click(function () {
        $("#addSuppier").submit();
    })
})