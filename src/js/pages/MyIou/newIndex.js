/**
 * Created by yl on 2017/8/9.
 */
//我的贷款JS
$(function() {
	// 贷款状态：
	var louStatus = -1;

	//获取状态列表
	getStatus(); //这个是获取type切换状态,跟分页无关
	getList(1, -1, ""); //这个是获取页面打开默认数据的函数(ps:全部:-1,已还款:1,代还款:2)参数1当前页,参数2type.参数3搜索框的内容

	//这一块是点击每一笔数据的时候查看出现弹窗显示具体数据,和分页无关可不用管
	//查看详情
	$(".tabBox").on("click", ".examine", function() {
		if($(".mask").hasClass("animated")) {
			$(".mask").removeClass("animated bounceOut");
			$(".mask").css("display", "none");
			$(".inform").css("display", "block")
		};
		$(".mask").css("display", "block");
		$(".mask").addClass("animated pulse");
		$(".inform").css("display", "block");
		var id = $(this).data("id");
		viewDetails(id);
	});

	$(".cancel").click(function() {
		$(".mask").addClass("animated bounceOut");
	});

	//查看详情end
	//这一段是点击每一笔数据的时候查看出现弹窗显示具体数据,和分页无关可不用管

	/*
	 * 查询具体的贷款信息
	 * */
	function viewDetails(id, s) {
		httpRequest({
			url: AjaxUrl.loan_get_loan_info_details_ajax,

			params: {
				id: id
			},
			success: function(response) {

				var $obj = response.data;
				$(".inform-body-top").html("<div class='top-l fl'>" +
					"							<div>" +
					"								<p class='Ious'>借据号:</p><i class='font2'>" + $obj.dbtNo + "</i><a href='" + $obj.contractUrl + "' target='view_window'  class='getLimit'>借款凭证</a> </div>" +
					"							<div>" +
					"								<p class='Ious'>借据金额:</p><i class='font2'>" + $obj.offerLoan.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + "</i></div>" +
					"							<div>" +
					"								<p class='Ious'>还款方式:</p><i class='font2'>" + $obj.payMethod + "</i></div>" +
					"							<div>" +
					"								<p class='Ious'>借据状态:</p><i class='font4'>" + $obj.statusDesc + "</i></div>" +
					"						</div>" +
					"						<div class='top-r fl'>" +
					"							<div>" +
					"								<p class='Ious'>借据到期日:</p><time class='font2'>" + moment($obj.expiresTime).format("YYYY-MM-DD") + "</time></div>" +
					"							<div>" +
					"								<p class='Ious'>起息日:</p><time class='font2'>" + moment($obj.offerTime).format("YYYY-MM-DD") + "</time></div>" +

					"							<div>" +
					"								<p class='Ious'>执行利率:</p><i class='font2'>" + $obj.performanceRate + "</i></div>" +
					"						</div>");

				$(".inform-body-middle").empty();
				if($obj.status == 1) {
					$(".inform-body-middle").html("<h1>还款明细</h1>" +
						"						<div class='mid-l fl'>" +
						"							<div>" +
						"								<p class='Ious font5'>还款本金:</p><i class='font6'>" + $obj.offerLoan.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + "</i></div>" +
						"							<div>" +

						"								<p class='Ious font5 mb0'>还款日期:</p><time class='font6'>" + moment($obj.repaymentTime).format("YYYY-MM-DD") + "</time></div>" +

						"						</div>" +
						"						<div class='mid-r fl'>" +
						"							<div>" +
						"								<p class='Ious font5'>还款利息:</p><i class='font6'>" + $obj.repaymentInterest.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + "</i></div>" +
						"						</div>");
				};
				$(".inform-body-foot").html("<div class='ft-l fl'>" +
					"							<div>" +
					"								<p class='Ious font5'>订单号:</p><i class='font6'>" + $obj.orderNo + "</i></div>" +
					"							<div>" +
					"								<p class='Ious font5'>货柜批次:</p><i class='font6'>" + $obj.containerNo + "</i></div>" +
					"							<div>" +
					"								<p class='Ious font5'>发货时间:</p><time class='font6'>" + moment($obj.deliveryTime).format("YYYY-MM-DD HH:mm:ss") + "</time></div>" +
					"						</div>" +
					"						<div class='ft-r fl'>" +
					"							<div>" +
					"								<p class='Ious font5'>订单状态:</p><i class='font6'>" + $obj.orderStatusDesc + "</i></div>" +
					"							<div>" +
					"								<p class='Ious font5'>货柜状态:</p><i class='font6'>" + $obj.containerStatusDesc + "</i></div>" +
					"							<div>" +

					"								<p class='Ious font5'>预计到货时间:</p><time class='font6'>" + moment($obj.preReceiveTime).format("YYYY-MM-DD") + "</time></div>" +

					"						</div>");

			}
		});
	};

	//切换type
	$(".top-list").on("click", "li", function() {
		var status = $(this).data("type");
		// 保存状态
		louStatus = status;
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		changeType()
	});

	//点击查询按钮
	$('.search-btn').click(function() {
		var oVal = $('.search').val();
		getList(1, -1, oVal);
		$(".top-list li").eq(0).addClass("active");
		$(".top-list li").eq(0).siblings().removeClass("active");
	});

	/*
	 * 获取type状态
	 * */
	function getStatus() {
		httpRequest({
			url: AjaxUrl.loan_get_loan_info_status_service_list_ajax,
			success: function(response) {
				var obj = response.data.statusList;
				$(".top-list").empty();
				for(var i = 0; i < obj.length; i++) {
					$(".top-list").append("<li data-type=" + obj[i].id + ">" + obj[i].value + "</li>");
				};
				$(".top-list li").eq(0).addClass("active");
			}
		});
	};

	/*
	 * 获取列表信息
	 * */
	function getList(pageIndex, status, keyword) {
		Loading.open();
		httpRequest({
			url: AjaxUrl.loan_get_loan_info_list_service_ajax,
			params: {
				pageIndex: pageIndex, //当前页码页码
				pageSize: 10, //每页展示数
				status: status, //已放款
				keyword: keyword //搜索框内容
			},
			success: function(response) {
				if(response.data.totalRecords < 1) {
					$(".null-show").css("display", "block");
					$(".have-show").css("display", "none");
				} else if(response.data.totalRecords >= 1) {
					$(".null-show").css("display", "none");
					$(".have-show").css("display", "block");
					var listObj = response.data.list;
					var obj = response.data.total;
					var TPages = response.data.totalPages;
					var pagesNo = response.data.pageNo;

					// 刷新分页
					refreshPage(TPages, pagesNo);

					$(".tabBox").empty();
					for(var i = 0; i < listObj.length; i++) {
						if(!listObj[i]) continue;
						$(".tabBox").append("<li>" +
							"<ul class='tdList list clearfix'>" +
							"<li class='font1'>" + (i + 1) + "</li>" +
							"<li class='font2'>" + listObj[i].orderNo + "</li>" +
							"<li class='font1'>" + listObj[i].containerNo + "</li>" +
							"<li class='font1'>" + listObj[i].containerStatusDesc + "</li>" +
							"<li class='font1'>" + listObj[i].appliyLoan.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + "</li>" +
							"<li class='font2'>" + listObj[i].statusDesc + "</li>" +
							"<li class='font1'><time>" + moment(listObj[i].expiresTime).format("YYYY-MM-DD") + "</time></li>" +
							"<li><a href='###' class='font3 examine' data-id ='" + listObj[i].id + "'>查看</a></li>" +
							"</ul>" +
							"</li>")
					};
				};
			},
			complete: function(response) {
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
			backFn: function(p) {
				getList(p, louStatus);
			}
		});
	};

	/*
	 * 切换type
	 * */
	function changeType() {
		httpRequest({
			url: AjaxUrl.loan_get_loan_info_list_service_ajax,
			params: {
				pageIndex: 1, //页码
				pageSize: 10, //每页展示数
				status: status, //已放款
				keyword: "" //搜索框内容
			},
			success: function(response) {
				var TPages = response.data.totalPages;
				var pagesNo = response.data.pageNo;
				refreshPage(TPages, pagesNo);
				getList(pagesNo, louStatus);
			}
		});
	}

});