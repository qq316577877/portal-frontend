$(function () {
    imgSrc();
    tab(0);
    //添加class
    $('.index-nav a').eq(0).addClass('on');

    $('.btnBox .skip').click(function () {
        location.href = '###';
    });

    //轮播控制器
    $('#myCarousel').carousel({
        interval: 3500,
        pause: 'hover'
    });
    //手动轮播控制器
    $('#myroundabout').roundabout({
        autoplay: true,
        autoplayDuration: 4000,
        autoplayPauseOnHover: true,
        shape: 'figure8',
        minOpacity: 1
    });
    //服务内容滑块控制
    $('.service-content li').hover(function () {
        $(this).stop().animate({
            paddingTop: 0
        }, 300);
        $(this).find('.but').css('display', 'block');
        $(this).find('.soludiv').addClass('gree');
    }, function () {
        $(this).stop().animate({
            paddingTop: 45
        }, 300)
        $(this).find('.but').css('display', 'none');
        $(this).find('.soludiv').removeClass('gree');
    });

    //	新闻公告切换
    $('.btnBox .tab').click(function () {
        $(this).addClass('on1').siblings().removeClass('on1');
        var $index = $(this).index();
        $('.press-l img').eq($index).css('display', 'block');
        $('.press-l img').eq($index).siblings().css('display', 'none');
        $('.press-r .list').empty();
        tab($index);
    });

    /*
    * tab切换方法
    * */
    function tab($index) {
        var $obj = $index == 0 ? __DATA.notice : __DATA.news;
        $('.press-box img').attr('src', $obj[0].imgUrl).attr('title', $obj[0].title);
        var olist1 = $('<li><a href = "' + $obj[0].link + '"class = "head" >' + $obj[0].title + '</a>' +
            '<p>' + $obj[0].subtitle + '</p>' +
            '<time >' + $obj[0].time + '</time></li>')
        $('.press-r .list').append(olist1);
        for (var i = 1; i < $obj.length; i++) {
            var olist2 = $('<li>' +
                '<a href="' + $obj[i].link + '">' + $obj[i].title + '</a>' +
                '</li>')
            $('.press-r .list').append(olist2);
        }
    }

    /*
    * 轮播图片
    * */
    function imgSrc() {
        var oImgSrc = __DATA.slider;
//				$(".carousel-inner").empty();
//				$(".carousel-inner").append("<div class='item'>"+
//						"<a href=''><img src='"+oImgSrc[0].imgUrl+"' title='"+oImgSrc[0].title+"' alt='第"+1+"张'></a>"+
//					"</div>");
        for (var i = 0; i < oImgSrc.length; i++) {
//					$(".carousel-inner").append("<div class='item'>"+
//						"<a href=''><img src='"+oImgSrc[i].imgUrl+"' title='"+oImgSrc[i].title+"' alt='第"+(i+1)+"张'></a>"+
//					"</div>");

            $('.item img').eq(i).attr('src', oImgSrc[i].imgUrl).attr('title', oImgSrc[i].title);
        }
    }



})