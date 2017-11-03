/**
 * 进口下单第二步
 * Created by 杨隆
 */

$(function () {

    var deliveryId; // 当前收货人id
    //加载页面预埋的收货人信息
    var number = window.location.search;
    number = number.split('=');
    var orderNo = parseInt(number[1]);
    var type = parseInt(number[2]);

    // 页面初始化
    init();
    // 收获地址切换事件
    $('#select').change(function () {
        var data = __DATA.receiveAddress;
        refreshAddress(data);
    });
    // 上一步
    $('.main').on('click', '#last_step', function () {
        self.location = '/order/detail?id=' + __DATA.orderId;
    });

    // 页面初始化
    function init() {
        $('#login_description').html('进口下单');
        // 申请贷款
        $('input[name="need-loan"]')[1].checked = true;
        $('.loan-table').css('display', 'none');
        // 申请金额说明
        $('.attention').css('display', 'none');
        // 改变页面文字
        $('#add_1').html('使用新地址');
        $('#inform_1').children('.inform-head').find('span').html('新增收货地址')

        // 清除页面贷款结构
        var loanNeedList = $('.loan-table').find('.tab-tr');
        $.each(loanNeedList, function (k, v) {
            $(v).html('')
        });

        // 绑定地址下拉框
        var data = __DATA.receiveAddress;
        if (data) {
            // 绑定地址下拉框
            $('#select').html('');
            $.each(data, function (k, v) {
                var tag = '<option deliveryId="' + v.id + '">' + v.receiver + '</option>';
                $('#select').append(tag);
            });
            refreshAddress(data);
        }

        //每次点击收货人后重新获取数据
        $('#select').on('change', function () {
            changeAddress()
        })

        // 单选框默认值  如果是代采
        if (type == 1) {
            //物流清关
            var innerExpress = __DATA.innerExpress;
            var outerExpress = __DATA.outerExpress;
            var clearanceCompany = __DATA.clearanceCompany;
            var idDIvs = '<div id="idDIvs" clearanceCompany="' + clearanceCompany.id + '" outerExpress="' + outerExpress.id + '" innerExpress="' + innerExpress.id + '"></div>'
            $('.main').append(idDIvs);
            $('input[name="logistics"]')[0].checked;
            $('.logistics_1').css('display', 'none');
            $('.logistics_1').eq(0).css('display', 'block');
            // 通关服务
            $('.customsClearance_2').css('display', 'none');
            // $('.customsClearance').css('display','none');
            // 贸易方式
            $('.trade').css('display', 'none');
            // 隐藏合同
            $('.contract').css('display', 'none');
        } else {
            $('input[name="logistics"]')[0].checked;
            //预埋物流公司
            $('.international-logistic')[0].innerHTML = __DATA.outerExpress.name;
            $('.international-logistic')[0].setAttribute('id', __DATA.outerExpress.id)
            $('.international-logistic')[1].innerHTML = __DATA.innerExpress.name;
            $('.international-logistic')[1].setAttribute('id', __DATA.innerExpress.id)
            //清关公司
            $('.customsClearance_2').children('span')[1].innerHTML = __DATA.clearanceCompany.name;
            $('.customsClearance_2').children('span')[1].setAttribute('id', __DATA.clearanceCompany.id)
        }

        // 校验贷款
        checkLoan();

        /*
         * 上传图
         * */
        var uc1 =new UploadCommon({
            uploadUrl:"/file/upload_private_ajax",
            elementId:"imgPicker",
            success:function (file,res) {
                $("#showImg").attr("src", res.data.url).attr('dataPath', res.data.path);
                $("#imgPicker").parent().next().css("display","none");
            },
            error:function (file) {
                $("#imgPicker").parent().next().css("display","block").text("上传失败");
            }
        });
        var uc2 =new UploadCommon({
            uploadUrl:"/file/upload_private_ajax",
            elementId:"imgPicker2",
            success:function (file,res) {
                $("#showImg2").attr("src", res.data.url).attr('dataPath', res.data.path);
                $("#imgPicker2").parent().next().css("display","none");
            },
            error:function (file) {
                $("#imgPicker2").parent().next().css("display","block").text("上传失败");
            }
        });

    }




    // 判断申请贷款的权限
    function checkLoan() {

        httpRequest({
            url: AjaxUrl.get_loan_user_auth_information_ajax,
            success: function (response) {
                // 未认证
                if (!response.data || response.data.status != 1) {
                    $('.loan-apply').attr('href', '/loan/auth/authentication');
                }
                // 实名
                else if (response.data.status == 1) {

                    httpRequest({
                        url: AjaxUrl.get_loan_user_credit_information_ajax,
                        success: function (response) {
                            // 判断个人是否有贷款
                            if (response.data) {
                                // 已授信
                                if (response.data.status == 1) {
                                    $('.loan-limit').html("可用贷款额度：" + response.data.balance);
                                    $('.loan-apply').css("display", "none");
                                }// 申请中
                                else if (response.data.status == 2) {
                                    $('.loan-apply').css("pointer-events", "none");
                                    $('.loan-apply').html("贷款申请中");
                                    $(".loan-apply").css({
                                        "background": "#999",
                                        "color": "#666"
                                    });
                                } else {
                                    $('.loan-apply').css("pointer-events", "none");
                                    $('.loan-apply').html("贷款申请未通过");
                                    $(".loan-apply").css({
                                        "background": "#999",
                                        "color": "#666"
                                    });
                                }
                            }
                        }
                    });

                }
            }
        });
    }

    // 更新选中收获地址信息
    function refreshAddress(data) {
        if (data != null) {
            $.each(data, function (k, v) {
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
    }

    /*
     * 每次点击收货地址后重新获取
     *
     * */
    function changeAddress() {
        httpRequest({
            url: AjaxUrl.member_get_user_receive_address_ajax,
            success: function (response) {
                var list = response.data.receiveAddress;
                refreshAddress(list)
            }
        })

    }

    //需要资金服务
    $('input[name="need-loan"]').on('change', function () {
        if ($('input[name="need-loan"]')[0].checked) {
            httpRequest({
                url: AjaxUrl.loan_get_loan_user_credit_information_ajax,
                success: function (response) {
                    if (response.data == null) {
                        Prompt.alertMsg({msg: "尊敬的用户您好，由于您还未获得贷款额度，暂不能使用资金服务，请先通过右方按钮【申请贷款】获取贷款额度！"});
                        //alertMsg('尊敬的用户您好，由于您还未获得贷款额度，暂不能使用资金服务，请先通过右方按钮【申请贷款】获取贷款额度！');
                        $('input[name="need-loan"]').eq(0).removeAttr('checked')
                        $('input[name="need-loan"]')[1].checked = true;
                    } else {
                        if (response.data.status == 2) {
                            Prompt.alertMsg({msg: "尊敬的用户您好，由于您的贷款申请正在审批中，暂不能使用资金服务，请耐心等待！"});
                            //alertMsg('尊敬的用户您好，由于您的贷款申请正在审批中，暂不能使用资金服务，请耐心等待！');
                            $('input[name="need-loan"]').eq(0).removeAttr('checked')
                            $('input[name="need-loan"]')[1].checked = true;
                        } else if (response.data.status == 1) {
                            $('.loan-table').css('display', 'block');
                            $('.attention').css('display', 'block');
                            $('.loan-table').find('.tab-tr').remove();
                            httpRequest({
                                url: AjaxUrl.order_container_detail_ajax,
                                params: {
                                    orderId: orderNo
                                },
                                success: function (response) {
                                    var data = response.data;
                                    $.each(data, function (k, v) {
                                        var tag = '<tr class="tab-tr">' +
                                            '<td transactionNo="' + v.transactionNo + '">' + v.containerId + '</td>' +
                                            '<td  productId="' + v.productId + '">' + v.productName + '</td>' +
                                            '<td class="loanQuota"> <span>' + v.loanQuota + ' </span> &nbsp;元</td>' +
                                            '<td>' +
                                            '<input  type="text" class="loanMoney fl">' +
                                            '<span class="fl">元</span>' +
                                            '</td>' +
                                            '<td class="sumMOney">' +
                                            '<input disabled type="text" class="fl ">' +
                                            '<span class="fl">元</span>' +
                                            '</td>' +
                                            '</tr>';
                                        $('.loan-table tbody').append(tag);
                                        loanMoney_1()
                                    })
                                }
                            })

                        } else {
                            Prompt.alertMsg({msg: "尊敬的用户您好，由于您还未获得贷款额度，暂不能使用资金服务，请先通过右方按钮【申请贷款】获取贷款额度！"});
                            //alertMsg('尊敬的用户您好，由于您还未获得贷款额度，暂不能使用资金服务，请先通过右方按钮【申请贷款】获取贷款额度！');
                            $('input[name="need-loan"]').eq(0).removeAttr('checked')
                            $('input[name="need-loan"]')[1].checked = true;
                        }
                    }
                }
            })
        } else {
            $('.loan-table').css('display', 'none');
            $('.loan-table .tab-tr').remove()
            $('.attention').css('display', 'none')
        }
    })


    // 弹出框
    function alertMsg(msg) {
        $('.mask').css('display', 'block');
        $('.inform').css('display', 'none');
        $('#inform4').css('display', 'block');
        $('input[name="need-loan"]').eq(0).removeAttr('checked')
        $('#inform4 .alertInfo').html(msg);
        $('input[name="need-loan"]')[1].checked = true;
    }

    //封装创建贷款服务
    $('.main').on('blur', '.loanMoney', function () {
        var loanQuotaMoney = $(this).parents('td').siblings('.loanQuota').find('span').html();
        console.log(loanQuotaMoney);
        console.log($(this).val());
        if (parseFloat($(this).val()) >parseFloat(loanQuotaMoney) ) {
            console.log(loanQuotaMoney);
            console.log($(this).val());
            Prompt.alertMsg({msg: '该申请金额超过可贷款金额，可联系平台服务热线400-826-5128申请调整可贷款金额！'});
            $(this).val('0');
            $(this).parents('td').siblings('.sumMOney').find('input').val('')
            return
        }

    })

    var testMoney = /^(0|\-?[1-9]\d*0{3})$/;
    $('.main').on('keyup', '.loanMoney', function () {
        if (testMoney.test(this.value)) {
            var loan = this.value;
            $(this).parents('td').siblings('.sumMOney').children('input').val(loan * 0.001)
        }
    })

    //选中陆运后隐藏贸易方式
    $('input[name="logistics"]').on('change', function () {
        if ($('input[name="logistics"]')[0].checked) {
            $('.trade').css('display', 'block')
        } else if ($('input[name="logistics"]')[1].checked) {
            $('.trade').css('display', 'none');
            $('input[name="logistics"]').eq(0).removeAttr('checked')
        }
        // 如果是带采
        if (type == 1) {
            $('.trade').css('display', 'none');
        }
    })


    $('#calculate').click(function () {
        Calculator.open();
        $('.mask').eq(0).css('display','none');
    })


    //提交审核
    $('#next_step').click(function () {

        //判断必须贷款
        var applyQuotaMoenry = $('.loanMoney');
        for(var i=0;i<applyQuotaMoenry.length;i++){
            if (applyQuotaMoenry[i].value == '' || applyQuotaMoenry[i].value<=100) {
                Prompt.alertMsg({msg: "贷款金额不能为空或少于100"});
                return;
            }
        }



        // var orderId;
        var logisticsType //物流方式
        //var logistics = document.getElementsByClassName('logistics_2');
        if ($('.logistics_2').eq(0).find('input')[0].checked) {
            logisticsType = 1
        } else {
            logisticsType = 2
        }

        var tradeType //贸易方式
        var trade1 = $('.trade .trade_1');
        if (trade1[0].children[0].checked) {
            tradeType = 1
        } else if (trade1[1].children[0].checked) {
            tradeType = 2
        }

        //报关 清关 保险 默认勾选
        var payType;//支付方式
        var payTy = $('.settlement .trade_1');
        if (payTy[0].children[0].checked) {
            payType = 1
        } else if (payTy[1].children[0].checked) {
            payType = 2
        } else {
            payType = 3
        }

        // 资金服务
        var needLoan;
        var nLoan = $('.need-loan label');
        if (nLoan[0].children[0].checked) {
            needLoan = 1;
            var loadInfo = [];
            var tr = $('.loan-table').find('.tab-tr');
            for (var i = 0; i < tr.length; i++) {
                var tab_tr = tr[i];
                var containerId = tab_tr.children[0].innerHTML;
                var productName = tab_tr.children[1].innerHTML;
                var transactionno = tab_tr.children[0].getAttribute('transactionno');
                var productId = tab_tr.children[1].getAttribute('productId');
                var loanQuota = parseInt(tab_tr.children[2].children[0].innerHTML);
                var applyQuota = parseInt(tab_tr.children[3].children[0].value);

                console.log(applyQuota);
                var details = {
                    containerId: containerId,
                    productName: productName,
                    productId: productId,
                    loanQuota: loanQuota,
                    applyQuota: applyQuota,
                    transactionNo: transactionno
                }
                loadInfo.push(details)
            }
        } else {
            needLoan = 0
        }
        var deliveryId = $('#select option:selected').attr('deliveryid');




        var contractUrl = $('#showImg').attr('dataPath');
        if (contractUrl == undefined && type == 2) {
            Prompt.alertMsg({msg: "请上传采购合同"});
            //alertMsg('请上传采购合同');
            return
        }
        var voucherUrl = $('#showImg2').attr('dataPath');

        if (type == 1) {
            var innerExpressId = $('#idDIvs').attr('innerExpress');
            var outerExpressId = $('#idDIvs').attr('outerExpress');
            var clearanceCompanyId = $('#idDIvs').attr('clearanceCompany');
        } else {
            var innerExpressId = parseInt($('.international-logistic')[1].getAttribute('id'));
            var outerExpressId = parseInt($('.international-logistic')[0].getAttribute('id'));
            var clearance = $('.customsClearance_2').children('span')[1].innerHTML;
            var clearanceCompanyId = parseInt($('.customsClearance_2').children('span')[1].getAttribute('id'));
        }

        Loading.open();

        var data = {
            orderNo: orderNo, //第一步返回id
            logisticsType: logisticsType,
            type: type,
            tradeType: tradeType,
            preClearance: 1,
            clearanceCompanyId: clearanceCompanyId, //后台获取
            clearance: 1,
            insurance: 1,
            innerExpressId: innerExpressId,//后台获取
            outerExpressId: outerExpressId,//后台获取
            contractUrl: contractUrl,
            voucherUrl: voucherUrl,
            payType: payType,
            loadInfo: loadInfo,
            needLoan: needLoan,
            deliveryId: deliveryId,
        }
        data = JSON.stringify(data);

        httpRequest({
            url: AjaxUrl.order_create_logistics,
            params: data,
            success: function (response) {
                Loading.close();
                window.location.href = '/order/submitted';
            },
            error: function (response) {
                Loading.close();
                Prompt.alertMsg({msg: response.msg});
            }
        })

        //type: params.type||"POST",
        //    data: params.params,
        //    url: requestUrl,
        //    dataType: "json",
        //    timeout: 60000,

        //$.ajax({
        //    url: AjaxUrl.order_create_logistics,
        //    type:'post',
        //    dataType: "json",
        //    contentType: "application/json;charset=utf-8",
        //    data: data,
        //    success: function (response) {
        //        //window.location.href = '/order/submitted';
        //    },
        //    error: function (response) {
        //        Prompt.alertMsg({msg: response.msg});
        //    }
        //})
    })

    //关闭弹窗
    $('.mask').on('click', '#save_4', function () {
        $('.mask').css('display', 'none');
        $('#inform4').css('display', 'none');
    })
    $('.mask').on('click', '.cancel', function () {
        $('.mask').css('display', 'none');
        $('#inform4').css('display', 'none');
    })

    function loanMoney_1() {
        var list = $('.loanMoney');
        console.log(list);
        for (var i = 0; i < list.length; i++) {
            list[i].onkeyup = function () {
                if (this.value.length == 1) {
                    this.value = this.value.replace(/[^0-9]/g, '')
                } else {
                    this.value = this.value.replace(/\D/g, '')
                }
            }
        }
    }
})


