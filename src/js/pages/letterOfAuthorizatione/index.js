$(function(){
	var d = new Date()

	$("#time i").eq(0).text(d.getFullYear());
	$("#time time").eq(1).text(d.getMonth()+1);
	$("#time time").eq(2).text(d.getDate());

	httpRequest({
		url: AjaxUrl.get_loan_user_auth_information_ajax,
		success: function (response) {
			$("#bankTel").text(response.data.mobile);
			$("#name").text(response.data.username);
			$("#id").text(response.data.identity);
		}
	});

});
