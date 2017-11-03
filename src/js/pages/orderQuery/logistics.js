/**
 * 我的订单
 * 物流详情相关
 */
$(function () {
    var showBigFlag =true;//点击鼠标获取大图flag  为true时展示大图，为false时隐藏大图

    //物流详情--点击事件
    $('.main-r').delegate('.logistics_2', 'click', function () {
        $('.mask').css('display', 'block');
        $('#logistics').css('display', 'block');
        if (document.getElementById('inform-body').children.length >= 2) {
            document.getElementById('inform-body').children[0].outerHTML = '';
            var head = '<div class="down-head">' +
                '<span>物流详情</span>' +
                '</div>';
            $('.inform-down').html(head);
        }
        var id = $(this).parents('tr')[0].children[0].innerHTML;
        getLogisticsDetailsAjax(id);//获取物流详情
    })


    //关闭  物流详情
    $('.mask').on('click', '#logistics .cancel', function () {
        $('.mask').css('display', 'none');
    })
    //关闭  单个图片查看
    $('.mask').on('click', '#logistics #canBtn', function () {
        $('#logistics').css('display', 'none');
    })


    //鼠标点击获取大图
    $('.mask').on('click', '.img2', function () {
        var src = $(this).find('img').attr('src');
        showOrHideBigImage(src);
    })


    //鼠标点击大图图片本身事件
    $('#maskImg').on('click',function (event) {
        var event = event || window.event;
        stopPropagation(event);
    })


    //阻止冒泡
    function stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }


    /**
     * ajax获取物流详情
     */
    function getLogisticsDetailsAjax(id){
        httpRequest({
            url:AjaxUrl.order_logistics_detail_ajax,
            params:{
                id: id
            },
            success: function (response) {
                handlerSuccessOfLogisticsDetailsAjax(response);
            }
        })
    }


    /**
     * 获取物流信息详情ajx
     * 处理正确返回
     */
    function handlerSuccessOfLogisticsDetailsAjax(data){
        var data = data.data;
        var tag1 = '<div class="inform-top">' +
            '<div class="inform-top1">' +
            '订单号：<span>' + data.orderNo + '</span>' +
            '</div>' +
            '<div class="inform-top1">货柜批次号：' +
            '<span>' + data.containerNo + '</span>' +
            '</div>' +
            '<div class="inform-top1">' +
            '国际物流公司：<span class="company">' + data.outerExpress.name + '</span>' +
            '</div>' +
            '<div class="inform-top1">' +
            '国内物流公司：<span class="company">' + data.innerExpress.name + '</span>' +
            '</div>' +
            '</div>';
        $('#inform-body .inform-down').before(tag1);
        var details = data.logisticsDetails;
        $.each(details, function (k, v) {
            var addTime = v.addTime;
            addTime = moment(addTime).format('YYYY-MM-DD, HH:mm:ss');
            if (v.filePaths[0].path=='' && v.filePaths[1].path=='' ) {
                var tag2 = '<div class="logistics-details">' +
                    '<span class="date">' + addTime + '</span>' +
                    '<span>' +
                    v.detailInfo +
                    '</span>' +
                    '</div>'
                $('.inform-down').append(tag2)
            } else if ( v.filePaths[0].path!='' && v.filePaths[1].path =='') {
                var tag2 = '<div class="logistics-details">' +
                    '<span class="date">' + addTime + '</span>' +
                    '<span>' +
                    v.detailInfo +
                    '</span>' +
                    '<div class="img2">' +
                    '<img src="' + (v.filePaths)[0].url + '" alt=""/>' +
                    '</div>' +
                    '</div>'
                $('.inform-down').append(tag2)
            }else if (v.filePaths[1].path !='' && v.filePaths[0].path =='') {
                var tag2 = '<div class="logistics-details">' +
                    '<span class="date">' + addTime + '</span>' +
                    '<span>' +
                    v.detailInfo +
                    '</span>' +
                    '<div class="img2">' +
                    '<img src="' + (v.filePaths)[0].url + '" alt=""/>' +
                    '</div>' +
                    '</div>'
                $('.inform-down').append(tag2)
            } else if(v.filePaths[0].path !='' && v.filePaths[1].path !=''){
                console.log(222);
                var tag2 = '<div class="logistics-details">' +
                    '<span class="date">' + addTime + '</span>' +
                    '<span>' +
                    v.detailInfo +
                    '</span>' +
                    '<div class="img2">' +
                    '<img src="' + (v.filePaths)[0].url + '" alt=""/>' +
                    '<img src="' + (v.filePaths)[1].url + '" alt=""/>' +
                    '</div>' +
                    '</div>'
                $('.inform-down').append(tag2);
            }

        })
    }


    /**
     * 显示大图 或 移除大图
     */
    function showOrHideBigImage(src){
        $('#mask').remove();//结构移除
      //显示大图
            var tag = ' <div id="mask">' +
                '<div id="maskImg">' +
                '<img src="" alt="">' +
                '</div>' +
                '</div>';
            $('.mask').append(tag);
            $('.mask').css('display', 'block');
            $('#mask').css('display', 'block');
            $('#logistics').css('display', 'none');
            $('#maskImg').find('img').attr('src', src);
            $('#inform-1').css('display', 'none');
            showBigFlag = false;

    }

    $('.mask').on('click', '#maskImg',function (){
        $('#mask').css('display','none');
        $('#logistics').css('display', 'block');
    })



})



