var orderNo = window.location.search;
orderNo = orderNo.split('=')[1]

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
        var totalPrice = zhuDiv[e].getElementsByClassName('sum')[0].getElementsByTagName('input')[0].value;
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
function giveTheFinalValues(zhuDiv, type, totalAmount, productAmount, orderId) {
    var orderContainers = giveAllHuoguiValues(zhuDiv);
    var supplierId = $('.selsct option:selected').attr('supplierid');
    var jsonData = {
        supplierId: supplierId,
        type: type,
        totalAmount: totalAmount,
        productAmount: productAmount,
        orderContainers: orderContainers,
        orderId: orderId
    };
    return jsonData
}
