//我的申请JS
$(function () {
    // 贷款状态：
    var louStatus = -1;
    //获取状态列表
    getStatus();
    getList();
    getLoanInfo();

    //切换type
    $(".top-list").on("click", "li", function () {
        var status = $(this).data("type");
        // 保存状态
        louStatus = status;
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        pageList()
    });
    //点击查询按钮
    $('.search-btn').click(function () {
        var oVal = $('.search').val();
        getList(1, -1, oVal);
        $(".top-list li").eq(0).addClass("active");
        $(".top-list li").eq(0).siblings().removeClass("active");
    });
    //点击计算器
    $("#calculate").click(function () {
        Calculator.open();
    });


    /*
    * 翻页
    * */
    function pageList (){
        httpRequest({
            url: AjaxUrl.loan_get_loan_info_list_service_ajax,
            params: {
                pageIndex: 1, //页码
                pageSize: 10, //每页展示数
                status: status, //已放款
                keyword: "" //搜索框内容
            },
            success: function (response) {
                var TPages = response.data.totalPages;
                var pagesNo = response.data.pageNo;
                refreshPage(TPages, pagesNo);
                getList(pagesNo, louStatus);
            }
        });
    }

    /*
    * 获取列表信息
    * */
    function getList(pageIndex, status, keyword) {
        Loading.open();
        httpRequest({
            url: AjaxUrl.loan_get_loan_info_list_apply_ajax,
            params: {
                pageIndex: pageIndex, //页码
                pageSize: 10, //每页展示数
                status: status, //已放款
                keyword: keyword //搜索框内容
            },
            success: function (response) {
                if (response.data.totalRecords < 1) {
                    $(".null-show").css('display', 'block');
                    $(".have-show").css('display', 'none');
                } else if (response.data.totalRecords >= 1) {
                    $(".null-show").css('display', 'none');
                    $(".have-show").css('display', 'block');
                    var listObj = response.data.list;
                    var obj = response.data.total;
                    var TPages = response.data.totalPages;
                    var pagesNo = response.data.pageNo;

                    // 刷新分页
                    refreshPage(TPages, pagesNo);

                    $(".tabBox").empty();
                    for (var i = 0; i < listObj.length; i++) {
                        if (!listObj[i] || !listObj[i].orderNo || !listObj[i].containerNo)continue;
                        var oLsit = $("<li>" +
                            "<ul class='tdList list clearfix'>" +
                            "<li class='font1'>" + (i + 1) + "</li>" +
                            "<li class='font2'>" + listObj[i].orderNo + "</li>" +
                            "<li class='font1'>" + listObj[i].containerNo + "</li>" +
                            "<li class='font1'>" + listObj[i].containerStatusDesc + "</li>" +
                            "<li class='font1'>" + moment(listObj[i].addTime).format('YYYY-MM-DD') + "</li>" +
                            "<li class='font1'>" + listObj[i].confirmLoan.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + "</li>" +
                            "<li class='font1'>" + listObj[i].serviceFee.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + "</li>" +
                            "<li class='font2 color'>" + listObj[i].statusDesc + "</li>" +
                            "</ul>" +
                            "</li>");
                        $(".tabBox").append(oLsit);
                        if (listObj[i].status == 1) {
                            oLsit.find(".color").css("color", "#00aa5c");
                        } else if (listObj[i].status == 4 || listObj[i].status == 7 || listObj[i].status == 300) {
                            oLsit.find(".color").css("color", "red");
                        }
                        ;
                    }
                    ;
                }
                ;
            },
            complete: function (response) {
                Loading.close();
            }
        });
    };


    /*
    * 刷新分页的方法
    * */
    function refreshPage(totalPages, currentPageNo) {
        $(".pageDiv").createPage({
            pageCount: totalPages, //TPages总页数
            current: currentPageNo, //当前页
            turndown: 'false', //是否显示跳转框，显示为true，不现实为false,一定记得加上引号...
            backFn: function (p) {
                getList(p, louStatus);
            }
        });
    }

    /*
    * 获取贷款信息列表
    * */
    function getStatus() {
        httpRequest({
            url: AjaxUrl.loan_get_loan_info_status_apply_list_ajax,
            success: function (response) {
                var obj = response.data.statusList;
                $('.top-list').empty();
                for (var i = 0; i < obj.length; i++) {
                    $('.top-list').append('<li data-type="' + obj[i].id + '">' + obj[i].value + '</li>');
                };
                $('.top-list li').eq(0).addClass('active');
            }
        });
    };

    /*
    * 獲取貸款
    * */
    function getLoanInfo (){
        //
        httpRequest({
            url: AjaxUrl.loan_get_loan_user_credit_information_ajax,
            success: function (response) {
                console.log(response);
                var $obj = response.data;
                $("#creditLine").empty();
                $("#creditLine").text(response.data.creditLine.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + "元");
                console.log("srtatus:",response.data.status);
                if(response.data.status==5){
                    $("#balance").text(0 + "元");
                    $(".examine").hide();
                }else if(response.data.status==1){
                    $("#balance").text(response.data.balance.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + "元");
                    $(".getLimit").hide();
                    $(".examine").attr("href",response.data.contractUrl);
                };

            }
        });

        // httpRequest({
        //     url: AjaxUrl.loan_get_loan_info_interest_rate_ajax,
        //     success: function (response) {
        //         var cost = response.data.yearInterestRate;
        //         cost = (10000 * cost / 360).toFixed(2);
        //         $("#cost").text(cost);
        //     }
        // });
    }
})

//$(function() {
//    // 贷款状态：
//    var louStatus = -1;
//    //获取状态列表
//    getStatus();
//    getList();
//    //獲取貸款
//    httpRequest({
//        url:AjaxUrl.loan_get_loan_user_credit_information_ajax,
//        success: function (response) {
//            var $obj=response.data;
//            $("#creditLine").empty();
//            $("#creditLine").text(response.data.creditLine+"元");
//            $("#balance").text(response.data.balance+"元");
//        }
//    });
//    httpRequest({
//        url:AjaxUrl.loan_get_loan_info_interest_rate_ajax,
//        success: function (response) {
//            var cost=response.data.yearInterestRate;
//            cost=(10000*cost/360).toFixed(2);
//            $("#cost").text(cost);
//        }
//    });
//    function getStatus() {
//        httpRequest({
//            url:AjaxUrl.loan_get_loan_info_status_apply_list_ajax,
//            success: function (response) {
//                var obj = response.data.statusList;
//                $('.top-list').empty();
//                for(var i = 0; i < obj.length; i++) {
//                    $('.top-list').append('<li data-type="' + obj[i].id + '">' + obj[i].value + '</li>');
//                }
//                $('.top-list li').eq(0).addClass('active');
//            }
//        });
//    };
//    //获取列表信息
//    function getList(pageIndex, status, keyword) {
//        Loading.open();
//        httpRequest({
//            url:AjaxUrl.loan_get_loan_info_list_apply_ajax,
//            params:{
//                pageIndex: pageIndex, //页码
//                pageSize: 10, //每页展示数
//                status: status, //已放款
//                keyword: keyword //搜索框内容
//            },
//            success: function (response) {
//                if(response.data.totalRecords < 1) {
//                    $(".null-show").css('display', 'block');
//                    $(".have-show").css('display', 'none');
//                } else if(response.data.totalRecords >= 1) {
//                    $(".null-show").css('display', 'none');
//                    $(".have-show").css('display', 'block');
//                    var listObj = response.data.list;
//                    var obj = response.data.total;
//                    var TPages = response.data.totalPages;
//                    var pagesNo = response.data.pageNo;
//                    // 刷新分页
//                    refreshPage(TPages, pagesNo);
//                    $(".tabBox").empty();
//                    for(var i = 0; i < listObj.length; i++) {
//                        if(!listObj[i] || !listObj[i].orderNo|| !listObj[i].containerNo)continue;
//                        var oLsit=$("<li>" +
//                            "<ul class='tdList list clearfix'>" +
//                            "<li class='font1'>" + (i + 1) + "</li>" +
//                            "<li class='font2'>" + listObj[i].orderNo + "</li>" +
//                            "<li class='font1'>" + listObj[i].containerNo + "</li>" +
//                            "<li class='font1'>" + listObj[i].containerStatusDesc + "</li>" +
//                            "<li class='font1'>" +moment(listObj[i].addTime).format('YYYY-MM-DD')+"</li>" +
//                            "<li class='font1'>" + listObj[i].confirmLoan + "</li>" +
//                            "<li class='font1'>" + listObj[i].serviceFee + "</li>" +
//                            "<li class='font2 color'>" + listObj[i].statusDesc + "</li>" +
//                            "</ul>" +
//                            "</li>");
//                        $(".tabBox").append(oLsit);
//                        if(listObj[i].status==1){
//                            oLsit.find(".color").css("color","#00aa5c");
//                        }else if(listObj[i].status==4 || listObj[i].status==7 || listObj[i].status==300){
//                            oLsit.find(".color").css("color","red");
//                        };
//                    };
//                };
//            },
//            complete:function(response){
//                Loading.close();
//            }
//        });
//    };
//    // 刷新分页的方法
//    function refreshPage(totalPages, currentPageNo) {
//        $(".pageDiv").createPage({
//            pageCount: totalPages, //TPages总页数
//            current: currentPageNo, //当前页
//            turndown: 'false', //是否显示跳转框，显示为true，不现实为false,一定记得加上引号...
//            backFn: function(p) {
//                getList(p, louStatus);
//            }
//        });
//    }
//    //切换type
//    $(".top-list").on("click", "li", function() {
//        var status = $(this).data("type");
//        // 保存状态
//        louStatus = status;
//        $(this).addClass("active");
//        $(this).siblings().removeClass("active");
//        httpRequest({
//            url:AjaxUrl.loan_get_loan_info_list_service_ajax,
//            params:{
//                pageIndex: 1, //页码
//                pageSize: 10, //每页展示数
//                status: status, //已放款
//                keyword: "" //搜索框内容
//            },
//            success: function (response) {
//                var TPages = response.data.totalPages;
//                var pagesNo = response.data.pageNo;
//                refreshPage(TPages, pagesNo);
//                getList(pagesNo, louStatus);
//            }
//        });
//    });
//    //点击查询按钮
//    $('.search-btn').click(function() {
//        var oVal = $('.search').val();
//        getList(1,-1, oVal);
//        $(".top-list li").eq(0).addClass("active");
//        $(".top-list li").eq(0).siblings().removeClass("active");
//    });
//})