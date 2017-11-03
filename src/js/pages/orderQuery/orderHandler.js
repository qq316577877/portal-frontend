/**
 * 我的订单
 * 物流详情相关
 */
$(function () {

    var that;//提供给取消订单使用

    //点击查看详情跳转
    $('#orderList').delegate('.orderDetails', 'click', function () {
        var orderNo =  $(this).parents('.list_1')[0].children[0].children[1].children[1].innerHTML
        self.location = '/order/detail?id=' + orderNo;
    })

    //暂存订单页跳转
    $('#orderList').delegate('.stagingOrder', 'click', function () {
        var orderNo = $(this).parents('.list_1')[0].children[0].children[1].children[1].innerHTML
        self.location = '/order/detail?id=' + orderNo;
    })

    //暂存订单页提交审核跳转
    $('#orderList').delegate('.audit', 'click', function () {
        var orderNo = $(this).parents('.order-ctrl').parents('.list_1_body').siblings('.list_1_head').find('.orderNo').html();
        self.location = '/order/detail?id=' + orderNo;
    })

    //取消订单
    $('#orderList').delegate('.cancelOrder', 'click', function () {
        that = $(this);
        var orderNo = $(this).parents('.order-ctrl').parents('.list_1_body').siblings('.list_1_head').find('.orderNo').html();
        $('.mask').css('display', 'block');
        $('#logistics').css('display', 'none');
    });


    //取消订单中-取消按钮
    $('.mask').on('click','#btn-2',function () {
        $('.mask').css('display', 'none');
    });

    //取消订单
    $('.mask').on('click','#btn-1',function () {
        var orderNo =$(that).parents('.order-ctrl').parents('.list_1_body').siblings('.list_1_head').find('.orderNo').html();
        $('.mask').css('display', 'none');

        cancleOrderAjax(orderNo,that);
    })

    //确认订单
    $('.main').on('click', '.Confirm', function () {
        var orderNo = $(this).parents('.order-ctrl').parents('.list_1_body').siblings('.list_1_head').find('.orderNo').html()
        self.location = '/order/detail?id=' + orderNo;
    })


    /**
     * 取消订单ajax
     */
    function cancleOrderAjax(orderNo,that){
        httpRequest({
            url:AjaxUrl.order_order_cancle_ajax,
            params:{
                orderId: orderNo
            },
            success: function (response) {
                $(that).parents('.order-ctrl').parents('.list_1_body').parents('.list_1').remove();
                history.go(0);
            }
        })
    }



})
