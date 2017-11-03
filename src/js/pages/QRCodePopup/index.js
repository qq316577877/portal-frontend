$(function(){
$('.cancel').click(function () {
        $('.mask').addClass('animated bounceOut');

    })

$('#order_create').click(addPop);

 function addPop() {
        if ($('.mask').hasClass('animated')) {
            $('.mask').removeClass('animated bounceOut');
            $('.mask').css('display', 'none');
            $('.inform').css('display', 'block')
        }
        $('.mask').css('display', 'block');
        $('.mask').addClass('animated pulse');
        $('.inform').css('display', 'block')
   };
 })