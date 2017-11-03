/**
 * 我的订单 - 创建表结构
 * 用于查询到订单的表之后，循环创建表结构
 */

var thisIncreaseNum = 1;//自增长数字，用于页面create table 元素id

var zhuid = document.getElementById('orderList'); //整体展示订单表的主id

var LIST_1_HEAD_CLASS_NAME = "list_1_head";//表头className

var LIST_1_BODY_CLASS_NAME = "list_1_body";//表body className

var ELEMENT_DIV="div";//div元素


/**
 * 通过主divId和查询到orderList来生成需要展示的订单列表
 * 循环一个一个创建div（在div中生成table）
 * @param zhuId
 * @param orderList
 */
function createOrderDivs(zhuId, orderList) {
    var orderListLength = orderList.length;
    for (var i = 0; i < orderListLength; i++) {
        var order = orderList[i];
        createDiv(zhuId, order);
    }
}


/**
 * 在主divId中
 * @param zhuId
 * @param order
 */
function createDiv(zhuId, order) {
    var bigDiv = document.createElement(ELEMENT_DIV);
    bigDiv.className = 'list_1';
    bigDiv.id = ELEMENT_DIV + thisIncreaseNum;
    var head = document.createElement(ELEMENT_DIV);

    head.className = LIST_1_HEAD_CLASS_NAME;
    var tag =
        '<span class="orderDate">' + order.date + '</span>' +
        '<div class="order-hao ">' +
        '<span>订单号：</span>' +
        '<span class="orderNo">'+order.orderNo+'</span>' +
        '</div>' +
        '<div class="order-hao">' +
        '<span>供应商：</span>' +
        decodeURIComponent(order.supplierName) +
        '</div>' ;
    head.innerHTML = tag;
    document.getElementById(zhuId).appendChild(bigDiv);
    bigDiv.appendChild(head);

    var body = document.createElement(ELEMENT_DIV);
    body.className = LIST_1_BODY_CLASS_NAME;
    body.id = 'createTable' + thisIncreaseNum;

    createOrderListTable(body, order);
    bigDiv.appendChild(body);

    thisIncreaseNum++;
}


/**
 * 一个订单生成一个table，放到订单div里
 * @param parentDiv
 * @param order
 */
function createOrderListTable(parentDiv, order) {
    var tableNode = document.createElement("table");
    var orderLength = order.length;
    var containerDetails = order.containerDetails;

    var rowNum = containerDetails.length;
    var height = getFinalHeightByRowspan(rowNum);
    tableNode.style.height=height+"px";

    var controllerCreated = false;
    /*根据货柜list来循环生成行*/
    for (var x = 0; x < rowNum; x++) {
        var containerDetail = containerDetails[x];
        var trNode = tableNode.insertRow();

        //第一列
        var tdNode0 = trNode.insertCell(0);
        tdNode0.innerHTML = "" + containerDetail.containerId;
        tdNode0.setAttribute('transactionNo',containerDetail.transactionNo);

        //第二列
        var tdNode1 = trNode.insertCell(1);
        tdNode1.innerHTML = "" + containerDetail.productName;

        //第三列
        var tdNode2 = trNode.insertCell(2);
        //if(containerDetail.containerStatus>=6){
        //    tdNode2.innerHTML = '<div class="prdStatus">' +
        //        '<span>'+containerDetail.containerStatusDesc+'</span>' +
        //        '<a href="javascript:;" class="logistics_2" style="color:#00aa5c" id="logistics'+thisIncreaseNum+'">查看物流</a>' +
        //        '</div>';
        //}else{
        //    tdNode2.innerHTML = '<div class="prdStatus">' +
        //        '<span>'+containerDetail.containerStatusDesc+'</span>' +
        //        '</div>';
        //}
        tdNode2.innerHTML = '<div class="prdStatus">' +
            '<span>'+containerDetail.containerStatusDesc+'</span>' +
            '</div>';

        //第四列
        var tdNode3 = trNode.insertCell(3);
        if(containerDetail.appliyLoan==null){
            tdNode3.innerHTML = "";
        }else{
            tdNode3.innerHTML = '<div style="color:#666">' + containerDetail.appliyLoan + '</div>';
        }


        //第五列
        var tdNode4 = trNode.insertCell(4);
        if(containerDetail.loanStatusDesc==null){
            tdNode4.innerHTML = ""
        }else{
            tdNode4.innerHTML = ""+containerDetail.loanStatusDesc;
        }


        if (!controllerCreated) {
            //第六列
            var tdNode5 = trNode.insertCell(5);
            tdNode5.rowspan = rowNum;
            if(order.orderStatus==1){
                tdNode5.innerHTML = '<div class="order-details fl" style="width:120px;border-left:1px solid #ddd;height:'+height+'px;">' +
                    '<div>'+order.orderStatusDesc+'</div>' +
                    '<div class="stagingOrder" id="orderDetails'+thisIncreaseNum+'">订单详情</div></div>';
            }else{
                tdNode5.innerHTML = '<div class="order-details fl" style="width:120px;border-left:1px solid #ddd;height:'+height+'px;">' +
                    '<div>'+order.orderStatusDesc+'</div>' +
                    '<div class="orderDetails" id="orderDetails'+thisIncreaseNum+'">订单详情</div></div>';
            }



            //第七列
            var tdNode6 = trNode.insertCell(6);
            tdNode6.rowspan = rowNum;
            if(order.orderStatus==1){
                tdNode6.innerHTML = '<div class="order-ctrl fl" style="width:152px;border-left:1px solid #ddd;height:'+height+'px;">' +
                    '<a class="audit" href="javascript:;">提交审核</a>' +
                    '<a class="cancelOrder" href="javascript:;">取消订单</a>';
            }else if(order.orderStatus==2){
                tdNode6.innerHTML = '<div class="order-ctrl fl" style="width:152px;border-left:1px solid #ddd;height:'+height+'px;">' +
                    '<a href="javascript:;"  style="display: none"></a>' +
                    '<a class="cancelOrder" href="javascript:;">取消订单</a>';
            }else if (order.orderStatus==3){
                tdNode6.innerHTML = '<div class="order-ctrl fl" style="width:152px;border-left:1px solid #ddd;height:'+height+'px;">' +
                    '<a class="Confirm" href="javascript:;">确认提交</a>' +
                    '<a class="cancelOrder" href="javascript:;">取消订单</a>';
            }else if (order.orderStatus==4 ){
                tdNode6.innerHTML = '<div class="order-ctrl fl" style="width:152px;border-left:1px solid #ddd;height:'+height+'px;">' +
                    '<a href="javascript:;" style="display: none"></a>' +
                    '<a class="cancelOrder" href="javascript:;">取消订单</a>';
            }else if(order.orderStatus==11){
                tdNode6.innerHTML = '<div class="order-ctrl fl" style="width:152px;border-left:1px solid #ddd;height:'+height+'px;">' +
                    '<a href="javascript:;"  style="display: none">确认收货</a>' +
                    '<a href="javascript:;"></a>';
            }else{
                tdNode6.innerHTML = '<div class="order-ctrl fl" style="width:152px;border-left:1px solid #ddd;height:'+height+'px;">' +
                    '<a href="javascript:;"  style="display: none">确认收货</a>' +
                    '<a href="javascript:;"></a>';
            }

            controllerCreated = true;
        }


    }
    parentDiv.appendChild(tableNode);//添加到那个位置

}


/**
 * 根据
 * @param rowspan
 * @returns {number}
 */
function getFinalHeightByRowspan(rowspan){
    var height = 40;
    if(rowspan==1){
        height = 40*2;
    }else{
        height = 40*rowspan;
    }
    return height;
}
