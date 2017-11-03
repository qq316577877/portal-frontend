/**
 * 选择订单类型，刷新供应商
 * Created by 杨隆
 */

$(function () {
    var supplierId;  //定义供应商id
    var logisticsSupplier = [];   // 物流供应商列表数据

    // 绑定订单切换事件
    $('input[type="radio"]').change(changeOrderType);
    // 绑定供应商选择事件
    $('.selsct').change(function () {

        httpRequest({
            url: AjaxUrl.member_get_user_supplier_information_ajax,
            success: function (response) {

                var logisticsSupplier =response.data.supplierList;
                supplierChange(logisticsSupplier);
            }
        });

        // $.ajax({
        //     url:AjaxUrl.member_get_user_supplier_information_ajax,
        //     type:'post',
        //     success: function (data) {
        //         var logisticsSupplier =data.data.supplierList;
        //         supplierChange(logisticsSupplier);
        //     }
        // })
    });
    // 页面初始化
    init();

    // 页面初始化
    function init() {
        $('#next_2').css('display', 'none');
        $('.container-add').css('display', 'block');
        $('#container-add-2').css('display', 'none');
    }

    // 切换订单类型
    function changeOrderType() {
        //选择海外代采
        if ($('#agency')[0].checked) {
            // 刷新代采供应商
            refreshRepresentSupplier();
        }
        // 选择物流通关
        else {
            // 校验物流通关的权限

            httpRequest({
                url: AjaxUrl.member_verify_enterprise_ajax,
                success: function (response) {

                     //清空海外直采的选项
                     // $('.selsct option').html('请选择供应商');
                     $('#next_1').css('display', 'none');
                     $('.supplier').css('display', 'block');
                     // $('.pro-list').css('display', 'none')
                     // $('.pro-list-b').css('display', 'none');
                     $('#container-add-2').css('display', 'block');
                     $('.add-supplier').css('display', 'inline-block');
                     supplierId = 2;
                     //查询供应商信息
                     refreshLogisticsSupplier();
                 },
                 error: function (response) {
                     Prompt.alertMsg({msg:"对不起，您不能选择该订单类型，请联系平台客服为您配置合作物流公司、清关公司"});
                     //$('#inform4 .alertInfo').text("对不起，您不能选择该订单类型，请联系平台客服为您配置合作物流公司、清关公司");
                     $('.ad').css('display', 'block');
                     $('#next_2').css('display', 'none');
                     // 选中代采
                     $('#agency')[0].checked = true;
                     // 刷新代采供应商
                     refreshRepresentSupplier();
                }
            });


        }
    }

    // 更新代采供应商下拉框
    function refreshRepresentSupplier() {

        httpRequest({
            url: AjaxUrl.member_supplier_query_agent_ajax,
            success: function (response) {
                var data = response.data;
                // 如果列表数量大于0
                if (data && data.length > 0) {
                    var tag = '<option value="' + data[0].id + '" supplierId="' + data[0].id + '" selected disabled>' + decodeURIComponent(data[0].supplierName) + '</option>';
                    $('.supplier-2 select').html(tag);
                    supplierId = data[0].id;
                }
            }
        });

        // 隐藏供应商信息，新增按钮
        $('.supplier ul').css('display', 'none');
        $('.add-supplier').css('display', 'none');
    }

    // 供应商切换
    function supplierChange(logisticsSupplier) {
        $.each(logisticsSupplier, function (k, v) {

            console.log(v.id);
            console.log($('.selsct option:selected').attr('id'));
            var suppierN =encodeURIComponent($('.selsct option:selected').html())
            if (v.id == $('.selsct option:selected').attr('supplierid')) {
                //拼接字符
                var tag = ' <li><span>供应商名称：</span>' + decodeURIComponent(v.supplierName) + '</li>' +
                    '<li><span>所在地区：</span>' + v.countryName + '</li>' +
                    '<li><span>详细地址：</span>' + decodeURIComponent(v.address) + '</li>' +
                    '<li><span>邮政编码：</span>' + v.zipCode + '</li>' +
                    '<li><span>联系人：</span>' + v.supplierContact + '</li>' +
                    '<li><span>手机号：</span>' + v.cellPhone + '</li>' +
                    '<li><span>电话号码：</span>' + v.phoneNum + '</li>';
                $('.supplier ul').html(tag);
                $('.supplier ul').css('display', 'block');
            }
        })
    }
})

//封装函数
/**
 * 刷新供应商列表
 * @param
 * @return
 */
function refreshLogisticsSupplier() {
    httpRequest({
        url: AjaxUrl.member_get_user_supplier_information_ajax,
        success: function (response) {
            var supplierList = response.data.supplierList;
            logisticsSupplier = supplierList;
            if (supplierList) {
                var supplierHtml = '';
                $.each(supplierList, function (k, v) {
                    supplierHtml += '<option supplierId="' + v.id + '">' + (v.supplierName) + '</option>';
                });
                $('.supplier-2 select').html(supplierHtml);
                var tag = ' <li><span>供应商名称：</span>' + (supplierList[0].supplierName) + '</li>' +
                    '<li><span>所在地区：</span>' + supplierList[0].countryName + '</li>' +
                    '<li><span>详细地址：</span>' + (supplierList[0].address) + '</li>' +
                    '<li><span>邮政编码：</span>' + supplierList[0].zipCode + '</li>' +
                    '<li><span>联系人：</span>' + supplierList[0].supplierContact + '</li>' +
                    '<li><span>手机号：</span>' + supplierList[0].cellPhone + '</li>' +
                    '<li><span>电话号码：</span>' + supplierList[0].phoneNum + '</li>';
                $('.supplier ul').html(tag);
                $('.supplier ul').css('display', 'block');
            } else {
                $('.selsct option').html('请选择供应商');
            }
        }
    })
}

//封装函数
/**
 * 通过tableId获取一个货柜的值
 * @param table
 * @return orderContainers
 */
function giveAHuoguiValues(table) {
    //获取tr
    var tab_trs = $(table)[0].getElementsByTagName('tr');
    var firstSelectedName = $(table).find('.two-th').attr('engname');
    var twoSelectedName = $(table).find('.three-th').attr('engname');
    var fourSelectedName = $(table).find('.four-th').attr('engname');
    var orderContainers = new Array();
    var productId = table.parentNode.previousElementSibling.children[1].getAttribute('productId')
    var tableTrLength = tab_trs.length;
    for (var i = 1; i < tableTrLength; i++) {

        var tab_tr = tab_trs[i];

        var productName = tab_tr.children[0].children[0].value;//商品名称
        var level = tab_tr.children[1].children[0].value;//等级
        var type = tab_tr.children[3].children[0].value;//品种
        var size = tab_tr.children[2].children[0].value;//大小

        var price = Number(tab_tr.children[4].children[0].value);//成交价
        if (price == '') {
            price = 0
        }
        var quantity = tab_tr.children[5].children[0].value;//数量
        var totalPrice = tab_tr.children[6].children[0].value;//合计A

        var keys = "sss";
        var productDetail = {};
        productDetail[firstSelectedName] = level;
        productDetail[fourSelectedName] = type;
        productDetail[twoSelectedName] = size;


        var orderContainer = {
            productId: productId,
            productName: productName,
            quantity: quantity,
            price: price,
            productDetail: productDetail
        };
        orderContainers.push(orderContainer);
    }
    ;
    return orderContainers;
}


/**
 * 获取所有货柜的信息
 * @param zhuDiv
 *
 *
 * @return orderContainers
 */
var oneTotal, totalAmount;
function giveAllHuoguiValues(zhuDiv) {
    var orderContainers = new Array();
    for (var e = 0; e < zhuDiv.length; e++) {
        //获取table
        var table = zhuDiv[e].getElementsByTagName('table')[0];
        var orderContainerDetails = giveAHuoguiValues(table);
        var productId = zhuDiv[e].children[0].children[1].getAttribute('productId');
        var totalAm = zhuDiv[e].children[1].children[0].getAttribute('totalamount');
        //var totalPrice = zhuDiv[e].getElementsByClassName('sum')[0].getElementsByTagName('input')[0].value;
        var totalPrice = $(zhuDiv[e]).find('.sum input').val();
        var orderContainer = {
            orderContainerDetails: orderContainerDetails,
            productName: orderContainerDetails[0].productName,
            productId: productId,
            totalQuantity: totalAm,
            totalPrice: totalPrice
        }
        orderContainers.push(orderContainer);
    }

    return orderContainers;
}

/**
 * 获取接口文件所需要的json信息
 */
function giveTheFinalValues(zhuDiv, type, totalAmount, productAmount) {
    var orderContainers = giveAllHuoguiValues(zhuDiv);
    var supplierId = $('.selsct option:selected').attr('supplierid');
    var jsonData = {
        supplierId: supplierId,
        type: type,
        totalAmount: totalAmount,
        productAmount: productAmount,
        orderContainers: orderContainers
    };
    return jsonData
}
