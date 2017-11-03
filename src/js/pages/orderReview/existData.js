var addIdNum;
var addIdNum2;
$(function () {
    var clo_tab;
    var restrictSum;
    var orderNo = window.location.search;
    orderNo = orderNo.split('?')[1];
    clo_tab = ($('#pro_list div:nth-of-type(1)').clone())[0].outerHTML;
    $('#pro_list').remove();
    //如果数据存在  就先加载缓存的数据
    $('#login_description').html('进口下单')
    $('.container-add-3').css('display', 'none')

    var data = __DATA.orderDetail;
    var dataType = data.orderType;
    //判断选择的type
    if (data.orderType == 1) {
        $('#agency').attr('checked', 'checked');
        $('#direct').attr('disabled', 'disabled');
        var tag = '<option supplierId=1  selected disabled>浙江创意生物科技股份有限公司</option>';
        $('.supplier-2 select').html(tag);
        $('.container-add-3').css('display', 'none');
    } else {
        $('#direct').attr('checked', 'checked');
        $('#agency').attr('disabled', 'disabled');
        $('.selsct option').html(decodeURIComponent(data.supplier.supplierName))
        $('.selsct option').attr('supplierId', data.supplier.id)
    }

    //添加数据
    var list = data.orderContainers;
    var i = 1;
    var productName, rank, size, type_pro;
    $.each(list, function (k, v) {

        $('#orderList').append(clo_tab);
        $('.pro-list-1')[k].id = 'list' + i
        $('.pro-list-1').eq(k).find('.add-h-1').attr('id', 'tr' + i)
        var tabInfo = list[k];
        //添加表头

        var tag1 =
            '<h3>货柜批次号：' + v.batchNumber + '</h3>' +
            '<h3 class="container-name" productid="' + v.productId + '">货柜名称：' + v.productName + '</h3>' +
            '<h3 class="container-norms">货柜规格：0-' + v.maxQuantity + '箱</h3>' +
            '<div class="x">' +
            '<i class="iconfont icon-chacha cancel cancel-1 fr"></i>' +
            '</div>';
        productName = v.productName;
        restrictSum = v.maxQuantity;
        $('#list' + i).children('.pro-list-head').html(tag1);
        $('#list' + i).find('.hide_inform').children('input')[0].value = v.totalQuantity;
        $('#list' + i).find('.hideSum').val(v.totalQuantity)
        $('#list' + i).find('.sum').find('input').val(v.totalPrice)
        $('#list' + i).find('.hide_inform').attr('totalAmount', v.totalAmount)

        if (__DATA.orderDetail.orderType == 2){
            $('.price input').removeAttr('disabled')
        }


        var parameter = v.orderContainerDetails;
        //这里
        two(productName, i, parameter);

        $('.main').on('click', '#orderList #tr' + i, function () {
            var a = ($(this).siblings('table').find('tr:nth-of-type(2)').clone())[0].innerHTML;
            var first_n = $(this).siblings('table').find('.first-td')[0].value;
            var tr = document.createElement('tr');
            tr.innerHTML = a;
            $(this).siblings('table').append(tr);
            $(this).siblings('table').find('.first-td:last').val(first_n);
            $(this).siblings('table').find('tr:last-of-type').find('.amount input').val('0')
        })
        i++;
        addIdNum = i
    })


    //添加货柜
    var addList = '<button class="ad" id="ad_1">新增一个货柜</button>';
    $('#orderList').append(addList);
    $('.main').on('#ad_1')
    //$('#ad_1').css('display','block');

    $('#next_1').css('display', 'block')
    //添加

    //获取总数量
    $('.main').on('change', '.amount input', function () {
        //var amo =$(this).val();
        //$(this).parents('.amount').siblings('.price-all').children('input').val(amo*100)

        var amount = $(this).val();
        var price = $(this).parents('.amount').siblings('.price').children('input').val();
        var amountPrice = parseFloat(amount) * parseFloat(price);
        var price = $(this).parents('.amount').siblings('.price-all').children('input').val(amountPrice);


        // $(this).parents('.price-all').parents('tr').parents('table').siblings('.sum').children('input')
        // var priceTotal =$(this).parents('.price-all').parents('tr').parents('table').find('.price-all');


        var amount_tos = $(this).parents('.amount').parents('tr').parents('table').find('.price-all');

        var amountTotal = 0;
        for (var i = 0; i < amount_tos.length; i++) {
            amountTotal += parseFloat(amount_tos[i].children[0].value)
        }
        //$(this).parents('.amount').parents('tr').parents('table').siblings('.hide_inform').children('input').eq(0).val(amountTotal);
        $(this).parents('.amount').parents('tr').parents('table').siblings('.sum').children('input').val(amountTotal);
    });

    $('.mask').on('click', '#save_4', function () {
        $('.mask').css('display', 'none')
    })
    $('.main').on('click', '#ad_1', function () {
        var i = addIdNum;
        //console.log($('.pro-list-1').length);
        if ($('.pro-list-1').length == 1) {
            var listId = $('.pro-list-1').attr('id');
            listId = listId.replace(/[^0-9]/ig, "");
            i = parseInt(listId) + 1;
            console.log(i);
        } else {
            i = $('.pro-list-1').length + 1
        }
        var sums_1 = $('#list' + (i - 1)).children('.pro-list-body').find('.amount').children('input');
        var sum = 0;
        var num;
        for (var w = 0; w < sums_1.length; w++) {
            num = Number(sums_1[w].value);
            sum += num;
        }
        if (sum > restrictSum) {
            Prompt.alertMsg({msg: "超出货柜规格"});
            return
        }

        if (sum <= 0 && $('.pro-list-1').length > 0) {
            $('#next_2').css('display', 'none');
            Prompt.alertMsg({msg: "请填写商品数量"});
            return;
        }
        $('#list' + (i - 1)).find('.hide_inform').attr('totalAmount', sum)

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
                            //点击添加货柜
                        }
                    })

                });

                $('#save_2').unbind("click"); //移除click
                $('#save_2').click(function () {
                    $('.mask').css('display', 'none');
                    $('#ad_1').before(clo_tab);
                    if (__DATA.orderDetail.orderType == 2){
                        $('.price input').removeAttr('disabled')
                    }
                    $('#orderList').find('.pro-list-1:last').attr('id', 'list' + i);

                    $.each(list, function (k, v) {
                        if (v.name == $('#inform2 #type_pro option:selected').html()) {
                            var addHead =
                                '<h3>货柜批次号：   </h3>' +
                                '<h3 class="container-name" productid="' + v.id + '">货柜名称：' + v.name + '</h3>' +
                                '<h3 class="container-norms">货柜规格：0-' + v.capacitySize + v.unit + '</h3>' +
                                '<div class="x">' +
                                '<i class="iconfont icon-chacha cancel cancel-1 fr"></i>' +
                                '</div>';
                            $('#list' + i).find('.pro-list-head').html(addHead)
                            var first_input = $('#list' + i).find('.first-td');
                            $('#list' + i).find('.add-h').attr('id', 'tr' + i);
                            restrictSum = v.capacitySize;

                            //添加后台传参

                            $('#list' + i).find('.two-th').html(v.productDetails[0].name);
                            $('#list' + i).find('.two-th').attr('engName', v.productDetails[0].engName);
                            $('#list' + i).find('.three-th').attr('engName', v.productDetails[2].engName);
                            $('#list' + i).find('.three-th').attr('engName', v.productDetails[2].engName);
                            $('#list' + i).find('.four-th').attr('engName', v.productDetails[1].engName);
                            $('#list' + i).find('.four-th').attr('engName', v.productDetails[1].engName);

                            for (var s = 0; s < first_input.length; s++) {
                                first_input[s].setAttribute('productId', v.id)
                                first_input[s].value = v.name;
                                first_input[s].disabled = true;
                            }
                            ;
                            var allGoods = list;
                            for (var k in allGoods) {
                                if (allGoods[k].name == v.name) {
                                    var details = allGoods[k].productDetails;
                                    //等级
                                    for (var q = 0; q < details.length; q++) {
                                        if (details[q].name == $('#list' + i).find('.two-th').html()) {
                                            var values = details[q].values;
                                            $.each(values, function (k, v) {
                                                rank += '<option>' + v.value + '</option>';
                                            })
                                            $('#list' + i).find('.in-2 select').html(rank);
                                            rank = '';
                                        }
                                    }
                                    //大小
                                    for (var q = 0; q < details.length; q++) {
                                        if (details[q].name == $('#list' + i).find('.three-th').html()) {
                                            var values = details[q].values;
                                            $.each(values, function (k, v) {
                                                size += '<option>' + v.value + '</option>';
                                            })
                                            $('#list' + i).find('.in-3 select').html(size);
                                            size = '';
                                        }
                                    }
                                    //品种
                                    for (var q = 0; q < details.length; q++) {
                                        if (details[q].name == $('#list' + i).find('.four-th').html()) {
                                            var values = details[q].values;
                                            $.each(values, function (k, v) {
                                                type_pro += '<option>' + v.value + '</option>';
                                            })
                                            $('#list' + i).find('.in-4 select').html(type_pro);
                                            type_pro = '';
                                        }
                                    }
                                }
                            }
                            ;

                            //给新增货柜的数量设置为0
                            var amountLists = $('#list' + i).find('.amount');
                            $.each(amountLists, function (k, v) {
                                v.children[0].value = 0
                            })

                            $('.main').on('click', '#orderList #tr' + i, function () {
                                var a = ($(this).siblings('table').find('tr:nth-of-type(2)').clone())[0].innerHTML;
                                var first_n = $(this).siblings('table').find('.first-td')[0].value;
                                var tr = document.createElement('tr');
                                tr.innerHTML = a;
                                $(this).siblings('table').append(tr);
                                $(this).siblings('table').find('.first-td:last').val(first_n);
                                $(this).siblings('table').find('tr:last-of-type').find('.amount input').val('0')
                            })
                            i++;
                            addIdNum++;
                            addIdNum2 = i;
                            console.log(addIdNum2);
                        }
                    })

                })
            }
        })


    })

    $('.main').on('click', '.cancel', function () {
        $(this).parents('.x').parents('.pro-list-head').parents('.pro-list-1').remove()
    })
    $('.main').on('click', '.cancel', function () {
        $(this).parents('.inform-head').parents('#inform2').css('display', 'none');
        $('.mask').css('display', 'none');
    })
    $('#next_1').click(function () {
        //计算总量
        var i
        if ($('.pro-list-1').length == 1) {
            var listId = $('.pro-list-1').attr('id');
            listId = listId.replace(/[^0-9]/ig, "");
            i = parseInt(listId) + 1;
            console.log(i);
        } else {
            i = $('.pro-list-1').length + 1
        }
        var sums_1 = $('#list' + (i - 1)).children('.pro-list-body').find('.amount').children('input');
        var sum = 0;
        var num;
        for (var w = 0; w < sums_1.length; w++) {
            num = Number(sums_1[w].value);
            sum += num;
        }

        if (sum > restrictSum) {
            Prompt.alertMsg({msg: "超出货柜规格"});
            return
        }
        if (sum <= 0 && $('.pro-list-1').length > 0) {

            $('#next_2').css('display', 'none');
            Prompt.alertMsg({msg: "请填写商品数量"});
            return;
        }
        if ($('.pro-list-1').length == 0) {
            Prompt.alertMsg({msg: "至少拥有一个货柜"});
            return
        }

        $('#list' + (i - 1)).find('.hide_inform').attr('totalAmount', sum)

        var sumLi = $('#orderList').find('.container-norms');
        //var totalAmount = 0;
        //var num;
        //for (var l = 0; l < sumLi.length; l++) {
        //    var num_1 = sumLi[l].innerHTML.match(/\d+/g);
        //    num = parseInt(num_1[0])
        //    totalAmount += num
        //}
        ;

        var totalAmount = 0;//总数量
        var totalAmountList = $('.hide_inform');
        $.each(totalAmountList, function (k, v) {
            totalAmount += parseInt(v.getAttribute('totalAmount'))
        })

        //获取总价格
        var priceAll = 0;
        var amountList = $('.sum');
        $.each(amountList, function (k, v) {
            priceAll += parseInt(v.children[1].value)
        })
        var num;
        //console.log(dataType);
        var orderId = window.location.search.split('=')[1];
        var data = giveTheFinalValues($('#orderList .pro-list-1'), dataType, totalAmount, priceAll, orderId);
        data = JSON.stringify(data);
        httpRequest({
            url: AjaxUrl.order_create_order_ajax,
            params: data,
            success: function (response) {
                orderId = response.data;
                window.location.href = '/order/logistics?orderId=' + orderId + '&type=' + dataType;
            },
            error: function (response) {

            }
        })
    })

    $('.mask').on('click', '.cancel', function () {
        $(this).parents('#inform2').css('display', 'none')
        $('.mask').css('display', 'none')
    })
    //
    function two(productName, i, parameter) {
        var rank, size, type;
        httpRequest({
            url: AjaxUrl.order_find_all_goods,
            success: function (response) {

                var allGoods = response.data;

                for (var k in allGoods) {
                    if (allGoods[k].name == productName) {
                        $('#list' + i).find('.two-th').html(allGoods[k].productDetails[0].name);
                        $('#list' + i).find('.two-th').attr('engName', allGoods[k].productDetails[0].engName);
                        $('#list' + i).find('.three-th').html(allGoods[k].productDetails[2].name);
                        $('#list' + i).find('.three-th').attr('engName', allGoods[k].productDetails[2].engName);
                        $('#list' + i).find('.four-th').html(allGoods[k].productDetails[1].name);
                        $('#list' + i).find('.four-th').attr('engName', allGoods[k].productDetails[1].engName);


                        //添加具体的选项
                        //$('#list' + i)[0].getElementsByClassName('.first-td').value =productName;
                        var inputList = $('#list' + i).find('.first-td');
                        for (var j = 0; j < inputList.length; j++) {
                            inputList[j].value = productName;
                            inputList[j].setAttribute('productId', allGoods[k].id)
                        }
                        var details = allGoods[k].productDetails;
                        //等级
                        for (var q = 0; q < details.length; q++) {
                            if (details[q].name == $('#list' + i).find('.two-th').html()) {
                                var values = details[q].values;
                                $.each(values, function (k, v) {
                                    rank += '<option>' + v.value + '</option>';
                                })
                                $('#list' + i).find('.in-2 select').html(rank);
                                rank = '';
                            }
                        }
                        //大小
                        for (var q = 0; q < details.length; q++) {
                            if (details[q].name == $('#list' + i).find('.three-th').html()) {
                                var values = details[q].values;
                                $.each(values, function (k, v) {
                                    size += '<option>' + v.value + '</option>';
                                })
                                $('#list' + i).find('.in-3 select').html(size);
                                size = '';
                            }
                        }
                        //品种
                        for (var q = 0; q < details.length; q++) {
                            if (details[q].name == $('#list' + i).find('.four-th').html()) {
                                var values = details[q].values;
                                $.each(values, function (k, v) {
                                    type_pro += '<option>' + v.value + '</option>';
                                })
                                $('#list' + i).find('.in-4 select').html(type_pro);
                                type_pro = '';
                            }
                        }

                        //根据回传数据，默认选择项目
                        var first_name = $('#list' + i).find('.first-td');
                        $.each(first_name, function (k, v) {
                            v.disabled = true
                        })
                        //默认属性选择

                        // $('#list' + i).find('.sum input').val(v.totalPrice);

                        var totalPrices = $('#list' + i).find('.price');
                        var totalAmount = $('#list' + i).find('.amount');
                        var sumPrices = $('#list' + i).find('.price-all');
                        var in_3 = $('#list' + i).find('.in-3');
                        var in_2 = $('#list' + i).find('.in-2');
                        var in_4 = $('#list' + i).find('.in-4');
                        // i++;
                        for (var a = 0; a < parameter.length; a++) {
                            totalPrices[a].children[0].value = parameter[a].price;
                            totalAmount[a].children[0].value = parameter[a].quantity;
                            sumPrices[a].children[0].value = parameter[a].totalPrice;

                            var productDetail = parameter[a].productDetail;

                            var sizeSelect = in_3[a].children[0].children;
                            var rankSelect = in_2[a].children[0].children;
                            var typeSelect = in_4[a].children[0].children;

                            //大小
                            for (var b = 0; b < sizeSelect.length; b++) {
                                for (var k in productDetail) {
                                    if (productDetail[k] == sizeSelect[b].innerHTML) {
                                        sizeSelect[b].selected = true;
                                    }
                                }
                            }

                            //等级
                            for (var b = 0; b < rankSelect.length; b++) {
                                for (var k in productDetail) {
                                    if (productDetail[k] == rankSelect[b].innerHTML) {
                                        rankSelect[b].selected = true;
                                    }
                                }
                            }

                            //品种
                            for (var b = 0; b < typeSelect.length; b++) {
                                for (var k in productDetail) {
                                    if (productDetail[k] == typeSelect[b].innerHTML) {
                                        typeSelect[b].selected = true;
                                    }
                                }
                            }

                        }

                    }

                }
            }
        })
    }
})
