
//封装收货地址
function createOrderDivs(zhuId, list) {
    var orderListLength = list.length;
    for (var i = 0; i < orderListLength; i++) {
        var order = list[i];

        createDiv(zhuId, order);
    }
    var tag3 ='查看更多商品信息  <span class="glyphicon glyphicon-menu-down f-top-r-down down"> </span>';
    var p =document.createElement('p');
    p.innerHTML=tag3;
    p.id='view_more';
    document.getElementById(zhuId).appendChild(p);
}

// 创建完整的一个表格结构
function createDiv(zhuId, list) {

    var bigDiv = document.createElement('div');
    bigDiv.className = 'pro-list-1';
    var head = document.createElement('div');

    head.className = 'pro-list-head';
    var tag2 =
        '<h3>货柜批次号：' + list.batchNumber + '</h3>' +
        '<h3 class="container-name">货柜名称：' + list.productName + '</h3>' +
        '<h3 class="container-norms">货柜规格：' + list.totalQuantity + '</h3>' ;
    head.innerHTML=tag2;
    bigDiv.appendChild(head);
    var body = document.createElement('div');
    body.className = 'pro-list-body clearfix';
    bigDiv.appendChild(body);
    var tag4 =    '<span>总计：</span>'+
        '<input type="text" value="'+list.totalPrice+'" disabled/>'+
        '<span>元</span>';

    var sum =document.createElement('div');
    sum.className='sum clearfix';
    sum.innerHTML=tag4;
    createTab1(body, list);
    body.appendChild(sum);
    document.getElementById(zhuId).appendChild(bigDiv)
}

/**
 * 一个订单生成一个table，放到订单div里
 * @param parentDiv
 * @param order
 */
//封装创建第一个表单
function createTab1(parentDiv, list) {

    var tableNode = document.createElement("table");
    var tag1 =
        '<th class="first-th">商品名称</th>' +
        '<th class="two-th">等级</th>' +
        '<th class="three-th">大小</th>' +
        '<th class="four-th">品种</th>' +
        '<th style="color: #666">成交价/箱</th>' +
        '<th style="margin-left: 20px">数量</th>' +
        '<th class="total">合计</th>' ;
    var tableHead =document.createElement('tr');
    tableHead.className='list-head';
    tableHead.innerHTML=tag1;
    tableNode.appendChild(tableHead);

    var containerDetails = list.orderContainerDetails;

    var rowNum = containerDetails.length;
    for (var x = 0; x < rowNum; x++) {
        var containerDetail = containerDetails[x];
        var trNode = tableNode.insertRow();

        //第一列
        var tdNode0 = trNode.insertCell(0);
        tdNode0.innerHTML = '<td class="in-1">'+
            '<input type="text" disabled class="first-td" value="' + containerDetail.productName + '"/>' +
            '</td>'
        tdNode0.className='in-1';
        //第二列
        var tdNode1 = trNode.insertCell(1);
        tdNode1.innerHTML = ' <td class="in-2">' +
            '<select>' +
            '<option>' + containerDetail.productDetail.等级 + '</option>' +
            '</select>' +
            '</td>';
        tdNode1.className='in-2';
        //第三列
        var tdNode2 = trNode.insertCell(2);
        tdNode2.innerHTML = ' <td class="in-2">' +
            '<select>' +
            '<option>' + containerDetail.productDetail.大小 + '</option>' +
            '</select>' +
            '</td>'
        tdNode2.className='in-2';

        //第四列
        var tdNode3 = trNode.insertCell(3);
        tdNode3.innerHTML = ' <td class="in-2">' +
            '<select>' +
            '<option>' + containerDetail.productDetail.品种 + '</option>' +
            '</select>' +
            '</td>'
        tdNode3.className='in-2';
        //第五列
        var tdNode4 = trNode.insertCell(4);
        tdNode4.innerHTML = '  <td class="price">' +
            '<input type="text" disabled placeholder="" value="' + containerDetail.price + '"/>' +
            '<span style="margin-left: 5px">元</span>' +
            '</td>'
        tdNode4.className='price';
        //第六列
        var tdNode5 = trNode.insertCell(5);
        tdNode5.innerHTML = '<td class="amount" >' +
            '<input value="' + containerDetail.quantity + '" type="text"/>' +
            '<span style="margin-left: 5px">箱</span>' +
            '</td>';
        tdNode5.className='amount';
        //第七列
        var tdNode6 = trNode.insertCell(6);
        tdNode6.innerHTML = '   <td class="price-all" >' +
            '<input type="text" disabled value="' + containerDetail.totalPrice + '"/>' +
            '<span style="margin-left: 5px">元</span>' +
            '</td>';
        tdNode6.className='price-all';
    }

    parentDiv.appendChild(tableNode);//添加到那个位置

}