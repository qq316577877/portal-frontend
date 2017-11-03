$(function(){
	//添加class
	$('.index-nav a').eq(1).addClass('on');
	$('#show').click(function(){
		$(this).css({
			'background':'#ccc',
			'color':'#999'
		})
		$('.main-foot-c').show(500);
	});
});
