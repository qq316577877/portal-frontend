window.onload = function() {
    var mb = myBrowser();
    if(mb!="Chrome"&&mb!="360"){
        $("body").prepend("<div class='browser_version' style='text-align: center'>" +
            "建议使用谷歌、360浏览器，其他浏览器可能存在兼容性问题,导致部分功能无法正常使用" +
            "<a href='http://se.360.cn/' target='_blank'>360浏览器下载</a>"+
            "<i class='iconfont icon-chacha cancel fr'></i></div>");
        $(".browser_version .iconfont").click(function () {
            $(".browser_version").remove();
        });
    }
};

function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    };
    //判断是否IE浏览器
    var is360 = false;
    var isIE = false;
    if (window.navigator.appName.indexOf("Microsoft") != -1){
        isIE= true;
    }
    if(isIE&&(window.navigator.userProfile+'')=='null'){
        is360 = true;
    }
    if(is360){
        return "360";
    }
}

function testie(args,title) {
    if(document.getElementById("IEWraning")){
        return;
    }

    if(!title){
        title="您正在使用低版本浏览器，为了获得更良好的体验，建议您升级浏览器，为您推荐："
    }
    var html = '<h3 class="IEW_info">'+title+'</h3><div class="IEW_links">';
    if (args != null && args.chrome) {
        html += '<a href="https://www.google.com/intl/zh-CN/chrome/" target="_blank">谷歌浏览器</a>';
    }
    if (args != null && args.firefox) {
        html += '<a href="http://download.firefox.com.cn/releases/stub/official/zh-CN/Firefox-latest.exe" target="_blank">火狐浏览器</a>';
    }
    if (args != null && args.maxthon) {
        html += '<a href="http://www.maxthon.cn/" target="_blank">遨游浏览器</a>';
    }
    if (args != null && args.ie11) {
        html += '<a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target="_blank">Internet Explorer 11</a>';
    }
    html += '</div><a href="javascript:;" id="IEWClose">×</a>';

    var IEWraning = document.createElement("div");

        IEWraning.setAttribute("id", "IEWraning");

        document.getElementsByTagName("body")[0].appendChild(IEWraning);

    var domIEWraning = document.getElementById("IEWraning");

        IEWraning.innerHTML = html;

    var domIEWClose = document.getElementById("IEWClose");

        domIEWClose.onclick = function() {
            domIEWraning.style.display = "none";
            return false;
        };
}
