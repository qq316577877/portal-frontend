

$(function () {
    var INIT_PAGE_NO = 1;//初始化pageNo
    var INIT_PAGE_SIZE = 5;//初始化pageSize
    var INIT_ORDER_STATUS = 0;//初始化订单状态
    var orderStatus=INIT_ORDER_STATUS;// 订单状态 默认0

    //页面初始化样式
    $('#login_description').html('我的订单');//login头部定义
    $('#orderList').html('');
    $('.query-head li:nth-of-type(1)').addClass('tabCurrent').end().removeClass('current');
    $('.query-head li:nth-of-type(1)').removeClass('current');
    //创建page控件

    //初始化列表数据
    getOrderList(null,null,null,null,orderStatus);

    //显示全部订单
    $('.main').on('click','#allList', function () {
        location.href='/order/center/list';
    });

    //创建订单
//  $('.main').on('click','#create', function () {
//      location.href='/order/create';
//  });
    //创建订单
    $('.main').on('click','#create', function () {
    	if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
            $('.inform').css('display', 'block')
        }
        $('.mask').css('display', 'block');
        $('.mask').addClass('animated pulse');
        $('#logistics').css('display', 'none');
        $('.inform').css('display', 'block');
    });
    //关闭
    $('.cancel').click(function () {
        $('.mask').addClass('animated bounceOut');

    })

    //下一页点击事件
    $('#btn-next').click(function () {

        $('.pageDiv .nextPage').click()
    });

    //上一页点击事件
    $('#btn-last').click(function () {

        $('.pageDiv .prevPage').click()
    });

    //查询--输入订单号查询
    $('#orderSea').click(function () {
        $('#orderList').empty();
        Loading.open();
        $('.pageDiv').css('display','none');
        $('.noData').css('display','none');
        setTimeout(function () {
            queryOrderListByOrderNo();
        },500)

    })

    //按照日期查询--查询今天
    $('#today').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected')
        var beginTime = moment().format('YYYY-MM-DD');//今天
        var endTime = moment().format('YYYY-MM-DD');//今天

        $('#orderList').empty();
        Loading.open();
        $('.pageDiv').css('display','none');
        $('.noData').css('display','none');
        setTimeout(function () {
            queryOrderListByTimes(beginTime,endTime);
        },500)
    })

    //按照日期查询--查询本周
    $('#toweek').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected')
        var begin = moment().startOf('week').isoWeekday(1);
        var beginTime=begin.add('d',7).format('YYYY-MM-DD');
        var endTime=begin.add('d',6).format('YYYY-MM-DD');
        $('#orderList').empty();
        $('.noData').css('display','none');
        Loading.open();
        $('.pageDiv').css('display','none');
        setTimeout(function () {
            queryOrderListByTimes(beginTime,endTime);
        },500)
    })

    //本月
    $('#tomonth').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected')
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        var beginTime = moment(firstDay).format('YYYY-MM-DD');
        var endTime = moment(lastDay).format('YYYY-MM-DD');
        $('#orderList').empty();
        Loading.open();
        $('.pageDiv').css('display','none');
        $('.noData').css('display','none');
        setTimeout(function () {
            queryOrderListByTimes(beginTime,endTime);
        },500)
    })

    //三个月前
    $('#threeMonth').click(function () {
        $(this).addClass('selected').siblings().removeClass('selected')
        var beginTime = moment().subtract(3, "months").format("YYYY-MM-DD");
        var endTime = moment().format('YYYY-MM-DD');//\
        $('#orderList').empty();
        Loading.open();
        $('.pageDiv').css('display','none');
        $('.noData').css('display','none');
        setTimeout(function () {
            queryOrderListByTimes(beginTime,endTime);
        },500)
    })

    //日期自定义查询
    $('#day_3').click(function () {
        var beginTime = $('#day_1').val();
        var endTime = $('#day_2').val();
        if(endTime!=""&&beginTime!=""){
            if (endTime >= beginTime) {
                searchByDate(beginTime,endTime);
            } else {
                var tag ='<div id="dateWrong">日期输入有误</div>';
                $("#dateWrong").remove();
                $('.filtrate-day .custom').append(tag);
            }
        }else{
            searchByDate(beginTime,endTime);
        }
    })

    // 日期查询
    function searchByDate(beginTime,endTime) {
        $('#dateWrong').remove();
        $('#orderList').empty();
        Loading.open();
        $('.pageDiv').css('display','none');
        $('.noData').css('display','none');
        setTimeout(function () {
            queryOrderListByTimes(beginTime,endTime);
        },500)
    }

    // tab状态切换
    $(".query-head").on("click","li",function () {
        var thisTab = $(this);
        queryOrderListByChangeTab(thisTab);
    });


    /**
     * 页面初始化列表
     * @param pageIndex
     * @param beginTime
     * @param filter2
     * @param pageSize
     */
    function getOrderList(pageNo,pageSize,beginTime,endTime,status) {

        if(!pageNo) {
            pageNo = INIT_PAGE_NO;
        }

        if(!pageSize) {
            pageSize = INIT_PAGE_SIZE;
        }

        if(!status){
            status = INIT_ORDER_STATUS;
        }

        var selectData = {
            beginTime: beginTime,
            endTime: endTime,
            pageNo: pageNo,
            pageSize: pageSize,
            status: status,
        };

        queryOrderListAjax(selectData,true);
    };

    /**
     * 获取当前日期
     * @returns {string}
     */
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

    /**
     *
     * @param selectData 查询
     * @param flushPageDiv 是否刷新page控件
     */
    function queryOrderListAjax(selectData,flushPageDiv){

        httpRequest({
            url:AjaxUrl.order_find_order_byPage_ajax,
            params:  JSON.stringify(selectData),
            success: function (response) {
                var listData = response.data;
                var listObj = null;
                var totalRecords = 0;
                var totalPages = 0;
                var pageNo = INIT_PAGE_NO;
                var pageSize = INIT_PAGE_SIZE;
                if(listData){
                    listObj = listData.list;
                    totalRecords = listData.totalRecords;
                    totalPages =listData.totalPages;
                    pageNo = listData.pageNo;
                    pageSize = listData.pageSize;

                    // 放开禁用
                    $("#btn-last").attr("disabled",false);
                    $("#btn-last").css("background-color","#fff");
                    $("#btn-next").attr("disabled",false);
                    $("#btn-next").css("background-color","#fff");

                    // 判断页面为1
                    if(pageNo==1){
                        // 禁用上一页
                        $("#btn-last").attr("disabled",true);
                        $("#btn-last").css("background-color","#f2f2f2");
                    }
                    // 判断最后一页
                    if(pageNo==totalPages){
                        // 禁用下一页
                        $("#btn-next").attr("disabled",true);
                        $("#btn-next").css("background-color","#f2f2f2");
                    }
                }

                $("#orderList").empty();
                if(listObj && listObj.length>0 && totalRecords>0){
                    //Loading.close();
                    createOrderDivs('orderList', listObj);
                    $('.noData').css('display','none');
                    $('#orderList').css('display','block');
                    $('.pageDiv').css('display','block');
                }else{
                    $('.pageDiv').css('display','none');
                    $('.noData').css('display','block');
                }


                if(flushPageDiv){
                    $(".pageDiv").createPage({
                        pageCount: totalPages ,
                        current: pageNo,
                        turndown: 'false',
                        backFn: function (currentPageNo) {

                            getOrderList(currentPageNo,pageSize,selectData.beginTime, selectData.endTime,orderStatus);
                        }
                    });
                }
            },
            complete:function(response){
                 Loading.close();
            }
        })
    }


    /**
     * 通过订单号查询订单列表
     */
    function queryOrderListByOrderNo(){
        var orderId = $('#orderSearch').val();
        if(orderId==''){
            getOrderList(null,null,null,null,orderStatus);
        }else{
            $('.noData').css('display', 'none');
            var selectData = {
                orderId: orderId,
                pageNo: INIT_PAGE_NO,
                pageSize: INIT_PAGE_SIZE,
                status: orderStatus
            };
            //var selectDataJsonStr = JSON.stringify(selectData);
            queryOrderListAjax(selectData,true);
        }
    }

    /**
     * 通过 时间 查询订单列表
     */
    function queryOrderListByTimes(beginTime,endTime){
        $('.noData').css('display', 'none');
        $('#orderList').html('');
        var selectData = {
            beginTime: beginTime,
            endTime: endTime,
            pageNo: INIT_PAGE_NO,
            pageSize: INIT_PAGE_SIZE,
            status: orderStatus
        };
        queryOrderListAjax(selectData,true);
    }


    /**
     * tab 切换 查询订单列表
     */
    function queryOrderListByChangeTab(thisTab){
        // 清除class
        $(".query-head li").removeClass();
        // 添加class
        thisTab.addClass("tabCurrent");

        var tabIndex=thisTab.index();
        switch (tabIndex){
            // 全部
            case 0:
                orderStatus=0;
                break;
            // 待提交
            case 1:
                orderStatus=3;
                break;
            // 待付款：
            case 2:
                orderStatus=5;
                break;
            // 待发货:
            case 3:
                orderStatus=6;
                break;
            // 待收货：
            case 4:
                orderStatus=9;
                break;
            // 完成：
            case 5:
                orderStatus=100;
                break;
        }

        // 刷新列表
        $('#orderList').empty();
        Loading.open();
        $('.pageDiv').css('display','none');
        $('.noData').css('display','none');
        setTimeout(function () {
            getOrderList(null,null,null,null,orderStatus);
        },500)
    }

})

