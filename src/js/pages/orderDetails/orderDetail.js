$(function () {
    //点击取消按钮
    var timer;
    var num = 60;
    var ORDER_SYS_CONFIRMED = 3;//审核通过，待提交
    var orderDelivery =6;
    var orderDetail = __DATA.orderDetail;//预埋订单详情
    var orderConStatus=5;
    var orderNo = orderDetail.orderNo;//订单号

    //订单查询跳转
    $('#main-top ul li:nth-of-type(2) a').click(function () {
        location.href='/order/center/list'
    })
    //会员中心跳转
    $('#main-top ul li:nth-of-type(1) a').click(function () {
        location.href='/member/info'
    })

    initDetailPage(orderDetail);//初始化详情页面数据


    //判断按钮（cancel-btn）采用什么事件
    //if (__DATA.orderDetail.orderStatus !== ORDER_SYS_CONFIRMED) {
    //    /*非待提交的订单*/
    //    $('#cancel-btn').click(function () {
    //        cancleOrderClick(orderNo);
    //    });
    //}
    //else if(__DATA.orderDetail.orderStatus>orderDelivery){
    //    console.log(33333);
    //    $('#cancel-btn').css('display','none')
    //}
    //else{
    //    //点击确认提交
    //    /*待提交的订单*/
    //    $('.mask').on('click', '#confirm .btn-1 input:nth-of-type(1)', function () {
    //        submitOrder(orderNo);
    //    })
    //}
    if (__DATA.orderDetail.orderStatus == ORDER_SYS_CONFIRMED) {
        //点击确认提交
        /*待提交的订单*/
        $('.mask').on('click', '#confirm .btn-1 input:nth-of-type(1)', function () {
            if($('#capth').val()=='' || $('#capth').val().length!=6){
                $('#capthWrong').css('display','block').html('请输入6位验证码');
                return;
            }
            submitOrder(orderNo);
        })
    }
    else if(__DATA.orderDetail.orderStatus>orderDelivery){

        $('#cancel-btn').css('display','none')
    }
    else{
        /*非待提交的订单*/
        $('#cancel-btn').click(function () {
            cancleOrderClick(orderNo);
        });
    }

    //取消订单 弹窗-取消按钮
    $('#btn-2').click(function () {
        $('.mask').css('display', 'none')
    });

    //收货人更多信息--显示
    $('#more-1').mouseenter(function () {
        $('#select_list').css('display', 'block')
    });
    //收货人更多信息--隐藏
    $('#more-1').mouseleave(function () {
        $('#select_list').css('display', 'none')
    });

    //供应商--显示
    $('#more_2').mouseenter(function () {
        $('#select_list_2').css('display', 'block')
    });
    //供应商--隐藏
    $('#more_2').mouseleave(function () {
        $('#select_list_2').css('display', 'none')
    });


    //取消窗口
    $('.mask').on('click', '#confirm .btn-1 input:nth-of-type(2)', function () {
        $('#confirm').css('display','none');
        $('.mask').css('display','none');
    });






    /**
     * 初始化此详情页面
     */
    function initDetailPage(orderDetail){
        /*展示订单类型*/
        showMain1(orderDetail);
        /*展示供应商*/
        showSupplier(orderDetail);
        /*展示货柜信息*/
        showContainerList(orderDetail);
        /*展示收货人地址*/
        showDeliveryAddress(orderDetail);
        /*展示物流服务*/
        showTransport(orderDetail);
        /*资金服务*/
        showLoanInfos(orderDetail);
        /*展示贸易方式*/
        showTrade(orderDetail);
        /*清关公司*/
        showClearanceCompany(orderDetail);
        /*展示合同*/
        showContract(orderDetail);
        /*展示结算方式*/
        showPayType(orderDetail);
        /*展示费用清单*/
        showOrderContainers(orderDetail);
        /*展示最后的费用*/
        showProductAmount(orderDetail);
        /*展示取消按钮*/
        showCancenBtn(orderDetail);

    }


    /**
     * 展示订单类型
     * @param orderDetail
     */
    function showMain1(orderDetail){
        var main_1;
        if (orderDetail.orderType == 1) {
            main_1 = '海外代采';
            //合同凭证显示
            if(orderDetail.orderStatus>=5){
                $('#contract').css('display','block')
            }else{
                $('#contract').css('display','none')
            }
        } else {
            main_1 = '通关物流';
        }
        $('#main_1 .main_1').html(main_1);
    }

    /**
     * 展示取消订单按钮
     * @param orderDetail
     */
    function showCancenBtn(orderDetail){
        if(orderDetail.orderStatus>=5){
            $('#cancel-btn').css('display','none')
        }else{
            $('#cancel-btn').css('display','block')
        }
    }



    /**
     * 展示货柜信息
     * @param orderDetail
     */
    function showContainerList(orderDetail){
        //添加货柜信息
        var list = orderDetail.orderContainers;
        createOrderDivs('purchasing', list);


        //除第一个外隐藏
        var list_1 = $('#purchasing .pro-list-1');
        for (var i = 0; i < list_1.length; i++) {
            list_1[i].style.display = 'none';
        }
        list_1[0].style.display = 'block';

        for (var i = 0; i < list_1.length; i++) {
            list_1[i].style.display = 'none';
        }
        list_1[0].style.display = 'block';


        //点击查看更多按钮后 显示别的列表
        $('#view_more').click(function () {
            for (var i = 0; i < list_1.length; i++) {
                list_1[i].style.display = 'block';
            }
            $('#view_more').html('已加载全部订单');
            //收起订单
        })



        //表头信息
        var orderInfo = ' <div class="order-date fl">' +
            '<span>下单日期：</span>' +
            '<span class="order-detail1">' + orderDetail.placeOrderTime + '</span>' +
            '</div>' +
            '<div class="order-No">' +
            '<span>订单号：</span>' +
            '<span class="order-detail1">' + orderDetail.orderNo + '</span>' +
            '</div>';
        $('#main-top').append(orderInfo);
        $('#purchasing .amount input').attr('disabled', 'disabled')
        var orderStatus = ' <div class="order-detail">' +
            '<span>订单状态：</span>' +
            '<span class="order-detail1">' + orderDetail.orderStatusDesc + '</span>' +
            '</div>';
        $('#main-top').append(orderStatus);
    }


    /**
     * 展示收货人地址
     * @param orderDetail
     */
    function showDeliveryAddress(orderDetail){
        var adress = orderDetail.deliveryAddress.receiver;
        $('#deliveryAddress span').html(adress);
        var tagAdress = ' <ul id="select_list">' +
            '<li><span>收件人：</span>' + orderDetail.deliveryAddress.receiver + '</li>' +
            '<li><span>所在地区：</span>' +
            '<div class="country">' + orderDetail.deliveryAddress.countryName + '</div>' +
            '<div class="province">' + orderDetail.deliveryAddress.provinceName + '</div>' +
            '<div class="xian">' + orderDetail.deliveryAddress.districtName + '</div>' +
            '</li>' +
            '<li><span>详细地址：</span>' + orderDetail.deliveryAddress.address + '</li>' +
            '<li><span>邮政编码：</span>' + orderDetail.deliveryAddress.zipCode + '</li>' +
            '<li><span>手机：</span>' + orderDetail.deliveryAddress.cellPhone + '</li>' +
            '<li><span>固定电话：</span>' + orderDetail.deliveryAddress.phoneNum + '</li>' +
            '</ul>';
        $('.deliveryAddress').append(tagAdress);
    }


    /**
     * 展示物流服务
     * @param orderDetail
     */
    function showTransport(orderDetail){
        //采购方式
        var transport;
        if (orderDetail.logisticsType == 1) {
            transport = '海运';
        } else {
            transport = '陆运';
            $('.order-type').eq(5).css('display','none');
        }
        $('.transport-type span').html(transport);
        $('#innerLogi').html(orderDetail.innerExpress.name);
        $('#outLogi').html(orderDetail.outerExpress.name);
    }


    /**
     * 展示贸易方式
     * @param orderDetail
     */
    function showTrade(orderDetail){
        //贸易方式
        var trade;
        if (orderDetail.tradeType == 1) {
            trade = 'FOB (离岸价、成本)';
        } else {
            trade = 'CIF (到岸价，成本+运费+保险费)';
        }
        $('#trade').html(trade);
    }


    /**
     * 展示清关公司
     * @param orderDetail
     */
    function showClearanceCompany(orderDetail){
        var clearanceCompany = orderDetail.clearanceCompany.name;
        $('#clearanceCompany').html(clearanceCompany);
    }

    /**
     * 展示合同
     * @param orderDetail
     */
    function showContract(orderDetail){
        $('#contractUrl').attr('src', orderDetail.contractUrl);
        $('#voucherUrl').attr('src', orderDetail.voucherUrl);
    }


    /**
     * 结算方式
     * @param orderDetail
     */
    function showPayType(orderDetail){
        var payType;
        if (orderDetail.payType == 1) {
            payType = '预付全款';
        } else if (orderDetail.payType == 2) {
            payType = '预付货款';
        } else {
            payType = '预付定金';
        }
        $('#payType').html(payType);
    }


    /**
     * 展示供应商
     * @param orderDetail
     */
    function showSupplier(orderDetail){
        var supplier = orderDetail.supplier;
        if(supplier){
            var supplierName = supplier.supplierName;
            $('.order-supplier span').html(supplierName);
            var tagAdress = ' <ul id="select_list_2">' +
                '<li><span>供应商：</span>' + decodeURIComponent(supplierName) + '</li>' +
                '<li><span>所在地区：</span>' +
                '<div class="country">' + supplier.countryName + '</div>' +
                '<div class="province">' + supplier.provinceName + '</div>' +
                '<div class="xian">' + supplier.districtName + '</div>' +
                '</li>' +
                '<li><span>详细地址：</span>' + decodeURIComponent(supplier.address) + '</li>' +
                '<li><span>邮政编码：</span>' + supplier.zipCode + '</li>' +
                '<li><span>手机：</span>' + supplier.cellPhone + '</li>' +
                '<li><span>固定电话：</span>' + supplier.phoneNum + '</li>' +
                '</ul>';
            $('#suppier').append(tagAdress);
        }
    }


    /**
     * 展示费用清单
     * @param orderDetail
     */
    function showOrderContainers(orderDetail){
        var costList = orderDetail.orderContainers;
        $('#money_list table tr')[1].remove();
        $('#money_list table tr')[1].remove();
        $.each(costList, function (k, v) {
            var tag = '   <tr>' +
                '<td>' + v.batchNumber + '</td>' +
                '<td> '+v.productAmount+'元</td>' +
                '<td>' +
                '<input disabled value="' + v.agencyAmount + '" type="text"/>' +
                '<span>元</span>' +
                '</td>' +
                '<td>' +
                '<input disabled value="' + v.premiumAmount + '" type="text"/>' +
                '<span>元</span>' +
                '</td>' +
                '</tr>';
            $('#money_list table tbody').append(tag)
        })
    }

    /**
     * 展示资金服务
     * @param orderDetail
     */
    function showLoanInfos(orderDetail){
        //获取流水号
        if(orderDetail.needLoan==0){
            $('#money .clearance1 span').html('不需要');
            $('#money table').css('display','none')
        }else{
            var tab_tr =$('.tab-tr');
            $.each(tab_tr, function (k, v) {
                v.outerHTML=''
            })
            var transactionno =$('.container-name');
            var transactionnoList =[];

            $.each(transactionno, function (k, v) {
                var transaction =v.getAttribute('transactionno');
                transactionnoList.push(transaction)
            });

            var noData={
                transactionNoList:transactionnoList
            };
            var noDataStr = JSON.stringify(noData);
            httpRequest({
                url:AjaxUrl.order_loadLoanInfosByTransactionNoList,
                params:noDataStr,
                success: function (response) {
                    var list =response.data.loanInfos;
                    $.each(list, function (k, v) {
                        var tag ='<tr class="tab-tr">'+
                            '<td>'+v.containerNo+'</td>'+
                            '<td>'+v.prodictName+'</td>'+
                            '<td>'+v.name+'</td>'+
                            '<td>'+v.availableLoan+'元</td>'+
                            '<td>'+
                            ''+v.appliyLoan+''+
                            '<span>元</span>'+
                            '</td>'+
                            '<td>'+v.confirmLoan+'元</td>'+
                            '<td>'+
                            '<input type="text" value="'+v.serviceFee+'" disabled="">'+
                            '<span>元</span>'+
                            '</td>'+
                            '</tr>';
                        $('#money table tbody').append(tag)
                    })
                }
            });
        };
    };


    /**
     * 展示最后的费用
     * @param orderDetail
     */
    function showProductAmount(orderDetail){
        var productAmount =orderDetail.productAmount;
        $('#cost_1').html(productAmount+'元');
        var cost2 =parseInt(orderDetail.finalAmount)-parseInt(orderDetail.productAmount);
        $('#cost_2').html(cost2 +'元');
        $('#settlement_1').html(orderDetail.advance+'元');
        $('#settlement_2').html(orderDetail.restPay+'元');
        if (__DATA.orderDetail.orderStatus == ORDER_SYS_CONFIRMED) {
            $('#cancel-btn').html('确认提交');

            $('#cancel-btn').click(function () {
                if (__DATA.orderDetail.needLoan == 0) {
                    httpRequest({
                        url:AjaxUrl.order_confirm_submit_ajax,
                        params:{
                            orderId: orderDetail.orderNo,
                            needLoan: 0
                        },
                        success: function () {
                            location.href ='/order/center/list'
                        }
                    });
                } else {
                    clearInterval(timer);

                    $('#btnTel')[0].disabled=false;
                    $('#btnTel').val('获取验证码');
                    $('#btnTel').addClass('btnStyle');
                    $('#btnTel').css('background','#00aa5c');
                    $('#capthWrong').css('display','none');
                    $('#capth').val('');
                    num =60;
                    $('.mask').css('display', 'block');
                    $('#confirm').css('display', 'block');
                    $('#inform-1').css('display', 'none');
                    httpRequest({
                        url:AjaxUrl.loan_get_loan_user_auth_information_ajax,
                        success: function (response) {
                            $('#confirm .name').find('span').html(response.data.username);
                            var str = response.data.mobile;
                            $('#confirm .blankTel').attr('tel', str);
                            var str2 = str.substr(0, 3) + "****" + str.substr(7);

                            $('.blankTel span').html(str2);
                            $('#btnTel').unbind("click");
                            $('#btnTel').click(function () {
                                $('#btnTel')[0].disabled = true;
                                $('#btnTel').css('background', '#ccc');
                                $('.capth input').val('')
                                timer = setInterval(function () {
                                    //clearInterval(timer)
                                    num--;
                                    $('#btnTel').val(num + "秒后重发");
                                    if (num === 0) {
                                        clearInterval(timer); //一定清理
                                        $('#btnTel').val('获取验证码');
                                        $('#btnTel')[0].disabled = false;//不要再禁用了
                                        num = 60;
                                        $('#btnTel').css('background', '#00aa5c').end().css('color', '#fff');
                                    }
                                }, 1000)
                                httpRequest({
                                    url: AjaxUrl.loan_order_send_anxin_ajax,
                                    params:{
                                        orderId:orderNo
                                    },
                                    success: function (response) {

                                    }
                                });
                            })
                        }
                    })
                   
                }

            })
        }
    }


    /**
     * 取消订单点击事件
     * @param orderNo
     */
    function cancleOrderClick(orderNo){
        $('.mask').css('display', 'block');
        $('#confirm').css('display', 'none');
        $('#btn-1').click(function () {
            $('.mask').css('display', 'none');
            httpRequest({
                url:AjaxUrl.order_order_cancle_ajax,
                params:{
                    orderId: orderNo
                },
                success: function (response) {
                    location.href = '/order/center/list'
                }
            })
        })
    }


    /**
     * 提交订单
     * @param orderNo
     */
    function submitOrder(orderlNo){
        var tel = $('#confirm .blankTel').attr('tel');
        var orderId =orderlNo;
        var captcha =$('#confirm .capth input').val();
        httpRequest({
            url:AjaxUrl.order_confirm_submit_ajax,
            params:{
                orderId:orderId,
                needLoan:1,
                captchaCode:captcha,
                //mobile:tel
            },
            success: function (response) {
                $('#confirm').css('display','none');
                $('.mask').css('display','none');
                location.href ='/order/center/list'
            },
            error: function (response) {
                $('#capthWrong').css('display','block').html(response.msg)
            }
        })
    }
})