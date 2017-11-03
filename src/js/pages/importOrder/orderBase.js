/**
 * 操作货柜列表，下一步事件
 * Created by 杨隆
 */

$(function () {


    var containerDivId = 1;  // 整个div的id
    var productRowId = 1;  // 新增一行的id
    var containerCloseId = 1;  // 货柜的关闭按钮的id
    var thisTrid = 'tr' + productRowId;//添加行id
    var rank,   // 等级下拉选项
        size,   // 大小下拉选项
        variety;    // 品种下拉选项
    var first_n;    // 商品名称
    var clone_tab;      // 克隆的table表单
    var thisDivid = 'div' + containerDivId;//div的id
    var closeId = 'clo' + containerCloseId;//关闭按钮的id
    var restrictSum;//定义一个货柜的总数
    var productList = [];     // 水果产品下拉框

    // 初始化
    init();
    //  定义事件
    $('#type_product').change(productChange);
    // 绑定新增货柜事件
    $('#container-add').click(addContainer);

    //再次增加货柜事件


    // 创建订单
    $('#next_1').click(creatOrder);
    // 数量绑定事件
    $('.main').on('input propertychange', '.amount input', function () {
        calculateTotalAmount($(this), "amount");
    });
    // 价格绑定事件
    $('.main').on('input propertychange', '.price input', function () {
        calculateTotalAmount($(this), "price");
    });
    // 选择水果类型事件
    $('.inform-1 .save-1').unbind("click"); //移除click
    $('.inform-1 .save-1').click(saveFruit);
    // 关闭等待框
    $('.cancel').click(function () {
        $('.mask').css('display', 'none');
    });

    // 页面初始化
    function init() {
        // 初始化
        $('#login_description').html('进口下单')
        // 删除
        $("#container-add-2").remove();
        $('.num-fruit')[0].disabled = true;
        // 禁用货柜合计
        $(".pro-list-1 .price-all input").attr("disabled", true);
    }

    // 新增按钮
    function addContainer() {

        // 校验订单类型
        if (!$('#agency')[0].checked && !$('#direct')[0].checked) {
            $('.ad').css('display', 'block');
            Prompt.alertMsg({msg: "请选择订单类型"});
            $('#next_2').css('display', 'none');
            return;
        }
        // 如果选通关物流，没选择供应商
        if ($('#direct')[0].checked && $(".supplier-2 select option:selected").html() == "请选择供应商") {

            Prompt.alertMsg({msg: "请先选择供应商"});
            $('.ad').css('display', 'block');
            return;
        }
        $('.ad').css('display', 'block');
        $('.mask').css('display', 'block')
        $('.inform').css('display', 'none')
        $('.inform-1').css('display', 'block');
        $('#next_2').css('display', 'none');

        // 更新水果列表数据
        getFruitList();
    };

    // 获取商品列表数据
    function getFruitList() {
        //d动态获取水果名称，添加到选项

        httpRequest({
            url: AjaxUrl.order_find_all_goods,
            success: function (response) {
                productList = response.data;
                // 绑定下拉框
                var productOption = "";
                var flag = true;
                $.each(productList, function (index, item) {
                    productOption += '<option value=' + item.id + '>' + item.name + '</option>';
                    // 绑定默认值
                    if (flag) {
                        $('.num-fruit').val(item.capacitySize + item.unit);
                        flag = false;
                    }
                });
                // 绑定下拉框
                $('#type_product').html(productOption);
            }
        });
    }

    // 选择水果保存事件
    function saveFruit() {
        $('.order-next').css('display', 'block');
        $('#next_2').css('display', 'none');
        //添加表头

        var productDetails = null;
        var currentPro = null;
        $.each(productList, function (k, item) {
            if (item.id == $('.type_product option:selected').val()) {
                currentPro = productList[k];
                productDetails = productList[k].productDetails;
            }
        });

        $('.selectPro').remove()
        var directChecked = $('#direct')[0].checked;
        if (directChecked) {
            $(".pro-list-1 .price input").attr("disabled", false);
        }

        $('#direct')[0].disabled = true;
        $('#agency')[0].disabled = true;

        $('.mask').css('display', 'none');
        $('.container-add').css('display', 'none');
        $('#pro_list').css('display', 'block');
        //添加表格
        //var thisDivid = 'div' + i;
        $('#pro_list .pro-list-1').attr('id', thisDivid)
        $('.pro-list-b').css('display', 'none');
        //给关闭按钮添加ID
        $('#' + thisDivid).find('i')[0].id = closeId;
        $('.container-name').html('货柜名称：' + currentPro.name);
        $('#pro_list').children('#' + thisDivid).find('.container-name').attr('productId', currentPro.id)
        first_n = currentPro.name;
        $('.container-norms').html('货柜规格：0-' + currentPro.capacitySize + currentPro.unit);
        restrictSum = currentPro.capacitySize;


        //设置添加行数限制
        var limitRows = 1;
        $.each(productDetails, function (k, v) {
            limitRows = limitRows * v.values.length
        });
        $('.container-name').attr('limitRows', limitRows);

        $('.two-th').html(productDetails[0].name);
        $('.two-th').attr('engName', productDetails[0].engName);
        $('.three-th').html(productDetails[2].name);
        $('.three-th').attr('engName', productDetails[2].engName);
        $('.four-th').html(productDetails[1].name);
        $('.four-th').attr('engName', productDetails[1].engName);
        //添加具体选项
        $('.first-td').val(currentPro.name);
        $.each(productDetails[0].values, function (k, v) {
            rank += '<option>' + v.value + '</option>';
            $('.in-2 select').html(rank)
        })
        $.each(productDetails[2].values, function (k, v) {
            size += '<option>' + v.value + '</option>';
            $('.in-3 select').html(size)
        })
        $.each(productDetails[1].values, function (k, v) {
            variety += '<option>' + v.value + '</option>';
            $('.in-4 select').html(variety)
        })
        clone_tab = ($('#pro_list div:nth-of-type(1)').clone())[0].innerHTML;
        var sums = $('#' + thisDivid).children('.pro-list-body').find('.amount').children('input');
        $('#' + thisDivid).children('.pro-list-body').children('.add-h').attr('id', thisTrid);

        // 判断
        var directChecked = $('#direct')[0].checked;
        if (directChecked) {
            $(".pro-list-1 .price input").attr("disabled", false);
        }

        // 设置货柜的默认值
        $("#div1 .amount input").val(0);
        var limitNum = 3;
        $('.main').on('click', '#pro_list #tr' + productRowId, function () {
            var maxRowSums = $(this).parents('.pro-list-body').siblings('.pro-list-head').find('.container-name').attr('limitrows');
            if (limitNum > parseInt(maxRowSums)) {
                Prompt.alertMsg({msg: '添加行数过多'});
                return;
            }
            var a = ($(this).siblings('table').find('tr:nth-of-type(2)').clone())[0].innerHTML;
            var first_n = $(this).siblings('table').find('.first-td')[0].value;
            var tr = document.createElement('tr');
            tr.innerHTML = a;
            $(this).siblings('table').append(tr);
            $(this).siblings('table').find('tr:last-of-type').find('.amount input').val('0')
            $(this).siblings('table').find('.first-td:last').val(first_n);
            limitNum++
        })

        //匹配价格数字
        var numberInput = $('.price');
        $.each(numberInput, function (k, v) {
            v.children[0].setAttribute('type', 'number')
        });


        // 校验订单列表数字
        matching();

        //删除表格
        $('.main').on('click', '#pro_list #clo' + productRowId, function () {
            $(this).parents('.x').parents('.pro-list-head').parents('.pro-list-1').remove();
        });

        containerDivId++;
        productRowId++;
        containerCloseId++;
    }

    // 产品下拉框
    function productChange() {
        var list = productList;
        $.each(productList, function (k, v) {
            if (v.id == $('#type_product').val()) {
                $('.num-fruit')[0].value = list[k].capacitySize + list[k].unit;
            }
        })
    }

    // 关闭货柜按钮
    $('.main').on('click', '.cancel-1', function () {
        // 控制index
        containerDivId = containerDivId - 1;
    })

    // 关闭商品总箱数超出货柜规格
    $('#save_3').unbind("click"); //移除click
    $('#save_3').click(function () {
        closePop($(this).parents('#inform3'))
    });

    $('#save_4').unbind("click"); //移除click
    $('#save_4').click(function () {
        closePop($(this).parents('#inform4'));
    });

    // 关闭弹出框
    function closePop(thisDom) {
        $('.mask').css('display', 'none');
        thisDom.css('display', 'none');
    }

    //添加
    $('#ad_1').click(function () {
        var sums_1 = $('#div' + (containerDivId - 1)).children('.pro-list-body').find('.amount').children('input');
        var sum = 0;
        var num;
        for (var w = 0; w < sums_1.length; w++) {
            num = Number(sums_1[w].value);
            sum += num;
        }

        // 如果货柜总量超出规格
        if (sum > restrictSum) {
            $('.ad').css('display', 'block');

            Prompt.alertMsg({msg: "商品总箱数超出货柜规格"});
            $('#next_2').css('display', 'none');
            return;
        }

        if (sum <= 0 && $('.pro-list-1').length > 0) {
            $('.ad').css('display', 'block');
            $('#next_2').css('display', 'none');
            Prompt.alertMsg({msg: "请填写商品数量"});
            return;
        }

        $('#div' + (containerDivId - 1)).find('.hide_inform').attr('totalAmount', sum)
        // 如果没有货柜 则不需要计算

        if ($('#div1').length !== 0) {
            var totalPrice = $('#div' + (containerDivId - 1))[0].getElementsByClassName('sum');
            var prices = $('#div' + (containerDivId - 1))[0].getElementsByClassName('price-all');
            var to_sum = 0
            for (var r = 0; r < prices.length; r++) {
                to_sum += parseInt(prices[r].children[0].value)
            }
            totalPrice[0].children[1].value = to_sum;
        }

        //多次点击后重复添加
        if (document.getElementById('type_pro').childElementCount !== 1) {
            $('#type_pro').html('');
            $('#type_pro option').text('请选择');
        }

        $('.ad').css('display', 'block');
        $('.mask').css('display', 'block')
        $('.inform').css('display', 'none');
        $('.inform-1').css('display', 'none');
        $('#inform2').css('display', 'block');
        $('.order-next').css('display', 'block');
        $('#next_2').css('display', 'none');

        // 清空水果箱
        $('#num-fruit').val("");

        //d动态获取水果名称，添加到选项
        httpRequest({
            url: AjaxUrl.order_find_all_goods,
            success: function (response) {
                var list = response.data;

                $('#type_pro').html('');
                $.each(list, function (k, v) {
                    var tag = '<option>' + v.name + '</option>';
                    $('#type_pro').append(tag)
                });
                $('#type_pro option:first-of-type').attr('selected', 'true');
                $.each(list, function (k, v) {
                    if (v.name == $('#inform2 #type_pro option:selected').html()) {
                        $('#num-fruit')[0].value = list[k].capacitySize + list[k].unit;
                        $('#num-fruit')[0].disabled = true;
                    }
                })
                $('#type_pro').change(function () {
                    $.each(list, function (k, v) {
                        if (v.name == $('#inform2 #type_pro option:selected').html()) {
                            $('#num-fruit')[0].value = list[k].capacitySize + list[k].unit;
                            $('#num-fruit')[0].disabled = true;
                            //点击添加货柜
                            var selected_pro = $('#inform2 #type_pro option:selected').html();
                            $('#save_2').unbind("click"); //移除click
                        }
                        else if ($('.type_product option:selected').html() == '请选择') {
                            $('.num-fruit').val('')
                        }
                    })
                })

            }
        })
        document.getElementById('save_2').onclick = function () {
            if ($('#num-fruit').val() == '') {
                $('#num-fruit').val('');
                var tag = '<div style="color: #ff4848" class="selectPro">请选择产品</div>';
                $('#save_2').before(tag)
                return
            }
            httpRequest({
                url: AjaxUrl.order_find_all_goods,
                success: function (response) {
                    var list = response.data;
                    $.each(list, function (k, v) {
                        if (v.name == $('#inform2 #type_pro option:selected').html()) {

                            $('.selectPro').remove()
                            $('#direct')[0].disabled = true;
                            $('.mask').css('display', 'none');
                            $('.container-add').css('display', 'none');
                            $('#pro_list').css('display', 'block');

                            var thatId = 'div' + containerDivId;
                            var a = document.createElement('div');
                            a.className = 'pro-list-1';
                            a.id = thatId;
                            a.innerHTML = clone_tab;
                            $('#ad_1').before(a);


                            $('#pro_list_2').css('display', 'none');
                            $('#' + a.id)[0].getElementsByClassName('container-name')[0].innerHTML = '货柜名称：' + list[k].name;
                            $('#pro_list').children('#' + a.id).find('.container-name').attr('productId', v.id);
                            $('#' + a.id)[0].getElementsByClassName('container-norms')[0].innerHTML = '货柜规格：0-' + list[k].capacitySize + list[k].unit
                            //添加表头
                            var productDetails = list[k].productDetails;
                            $('#' + a.id)[0].getElementsByClassName('two-th')[0].innerHTML = productDetails[0].name;
                            $('#' + a.id)[0].getElementsByClassName('two-th')[0].setAttribute('engName', productDetails[0].engName);
                            $('#' + a.id)[0].getElementsByClassName('three-th')[0].innerHTML = productDetails[2].name;
                            $('#' + a.id)[0].getElementsByClassName('three-th')[0].setAttribute('engName', productDetails[2].engName)
                            $('#' + a.id)[0].getElementsByClassName('four-th')[0].innerHTML = productDetails[1].name;
                            $('#' + a.id)[0].getElementsByClassName('four-th')[0].setAttribute('engName', productDetails[1].engName)
                            //添加具体选项
                            var first_input = $('#' + a.id)[0].getElementsByClassName('first-td');
                            for (var j = 0; j < first_input.length; j++) {
                                first_input[j].value = list[k].name
                            }

                            //匹配价格数字
                            var numberInput = $('.price');
                            $.each(numberInput, function (k, v) {
                                v.children[0].setAttribute('type', 'number')
                            })

                            matching()

                            $('#' + a.id).children('.pro-list-body').children('.add-h').attr('id', thisTrid);
                            //$('.main').on('click', '#pro_list #tr' + productRowId, function () {
                            //    //获取最多添加行数信息
                            //    var maxRowSums =$(this).parents('.pro-list-body').siblings('.pro-list-head').find('.container-name').attr('limitrows');
                            //    console.log(maxRowSums);
                            //    var a = ($(this).siblings('table').find('tr:nth-of-type(2)').clone())[0].innerHTML;
                            //    var first_n = $(this).siblings('table').find('.first-td')[0].value;
                            //    var tr = document.createElement('tr');
                            //    $(this).siblings('table').find('tr:last-of-type').find('.amount input').val('0')
                            //    tr.innerHTML = a;
                            //    $(this).siblings('table').append(tr);
                            //    $(this).siblings('table').find('.first-td:last').val(first_n);
                            //});
                            var limitNum = 3;
                            $('.main').on('click', '#pro_list #tr' + productRowId, function () {

                                var maxRowSums = $(this).parents('.pro-list-body').siblings('.pro-list-head').find('.container-name').attr('limitrows');
                                if (limitNum > parseInt(maxRowSums)) {
                                    Prompt.alertMsg({msg: '添加行数过多'});
                                    return;
                                }
                                var a = ($(this).siblings('table').find('tr:nth-of-type(2)').clone())[0].innerHTML;
                                var first_n = $(this).siblings('table').find('.first-td')[0].value;
                                var tr = document.createElement('tr');
                                tr.innerHTML = a;
                                $(this).siblings('table').append(tr);
                                $(this).siblings('table').find('tr:last-of-type').find('.amount input').val('0')
                                $(this).siblings('table').find('.first-td:last').val(first_n);
                                limitNum++
                            })

                            // 设置货柜的默认值
                            $("#" + thatId + " .amount input").val(0);

                            //关闭按钮加id
                            $('#' + a.id).find('i')[0].id = 'clo' + containerCloseId;

                            containerDivId++;
                            productRowId++;
                            containerCloseId++;
                        }
                    })
                }
            })
        }

        $('.mask').on('change', '#type_product', function () {
            if ($('.type_product option:selected').html() == '请选择') {
                $('.num-fruit').val('')
            }
        })
        $('.mask').on('change', '#type_pro', function () {
            if ($('#type_pro option:selected').html() == '请选择') {
                $('#num-fruit').val('')
            }
        })

        //删除表格
        $('.main').on('click', '#pro_list #clo' + containerCloseId, function () {
            if ((containerCloseId - 1) == 1) {
                thisDivid = 'div1';
                $(this).parents('.x').parents('.pro-list-head').parents('.pro-list-1').css('display', 'none')
            } else {
                $(this).parents('.x').parents('.pro-list-head').parents('.pro-list-1').remove();
            }
        })
    })

    // 计算总价
    function calculateTotalAmount(currentDom, type) {
        var price = 0;
        var amount = 0;
        // 如果是价格
        if (type == "price") {
            price = currentDom.val();
            amount = currentDom.parents('.price').siblings('.amount').children('input').val();
        } else {
            amount = currentDom.val();
            price = currentDom.parents('.amount').siblings('.price').children('input').val();
        }
        if (amount == '' && price !== '') {
            amount = 0
        } else if (amount !== '' && price == '') {
            price = 0
        }

        // 合计
        var amountPrice = parseFloat(amount) * parseFloat(price);
        var price = currentDom.parents('td').siblings('.price-all').children('input').val(amountPrice);
        // 总计
        var amount_tos = currentDom.parents('td').parents('tr').parents('table').find('.price-all');
        var amountTotal = 0;
        for (var i = 0; i < amount_tos.length; i++) {
            amountTotal += parseFloat(amount_tos[i].children[0].value)
        }
        currentDom.parents('td').parents('tr').parents('table').siblings('.sum').children('input').val(amountTotal);
    }

    //定义匹配数量价格匹配正整数
    function matching() {
        var priceInput = $('.price');
        var amountInput = $('.amount');

        $('.price input').blur(function () {
            this.value = this.value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, '$1').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        });

        for (var i = 0; i < priceInput.length; i++) {

            amountInput[i].children[0].onkeyup = function () {
                if (this.value.length == 1) {
                    this.value = this.value.replace(/[^1-9]/g, '')
                } else {
                    this.value = this.value.replace(/\D/g, '')
                }
            }

            amountInput[i].onafterpaste = function () {
                if (this.value.length == 1) {
                    this.value = this.value.replace(/[^1-9]/g, '')
                } else {
                    this.value = this.value.replace(/\D/g, '')
                }
            }
        }
    }

    //创建订单
    function creatOrder() {
        if($('.pro-list-1').length==0){
            Prompt.alertMsg({msg:"至少拥有一个货柜"});
            return
        }
        // 校验货柜总数
        var sums_1 = $('#div' + (containerDivId - 1)).children('.pro-list-body').find('.amount').children('input');
        var sum = 0;
        var num;
        for (var w = 0; w < sums_1.length; w++) {
            num = Number(sums_1[w].value)
            sum += num
        }
        // 校验货柜总数超出规格
        if (sum > restrictSum) {
            $('.ad').css('display', 'block');
            Prompt.alertMsg({msg: "商品总箱数超出货柜规格"});
            return;
        }
        // 如果总数小于0
        if (sum <= 0) {
            $('.ad').css('display', 'block');
            $('#next_2').css('display', 'none');
            Prompt.alertMsg({msg: "请填写商品数量"});
            return;
        }
        Loading.open()

        $('#div' + (containerDivId - 1)).find('.hide_inform').attr('totalamount', sum)

        var orders = document.getElementById('pro_list')
        var tot = orders.getElementsByClassName('hide_inform');
        var totalAmount = 0;//总数量
        var totalAmountList = $('.hide_inform');
        $.each(totalAmountList, function (k, v) {
            totalAmount += parseInt(v.getAttribute('totalamount'))
        })

        //获取总价格
        var priceAll = 0;
        var amountList = $('.sum');
        $.each(amountList, function (k, v) {
            priceAll += parseInt(v.children[1].value)
        })

        // 订单类型
        var type;
        if ($('input[name="type"]')[0].checked) {
            type = 1
        } else {
            type = 2
        }

        // 接口传输数据
        var data = giveTheFinalValues($('#pro_list .pro-list-1'), type, totalAmount, priceAll);
        data = JSON.stringify(data);
        httpRequest({
            url: AjaxUrl.order_create_order_ajax,
            params: data,
            success: function (response) {
                Loading.close()
                var orderId = response.data;
                window.location.href = '/order/logistics?orderId=' + orderId + '&type=' + type;
            },
            error: function (response) {
                if (response.code == 111008) {
                    Loading.close();
                    Prompt.alertMsg({msg: "该订单已提交审核，不能重复提交"});
                } else if (response.code == 111001 || response.code == 111002 || response.code == 111003) {
                    Loading.close();
                    Prompt.alertMsg({msg: response.msg});

                }
            }
        })
    }

})
