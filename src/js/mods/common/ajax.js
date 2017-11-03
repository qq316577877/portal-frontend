function kuAjax(url, data, callback, type) {
  $.ajax({
    url: url,
    type: type || 'GET',
    data: data,
    success: function(res) {
      //未登陆
      if (res.code == 100) {
        location.href = res.data.url + '?redir=' + encodeURIComponent(location.href);
        /*new Popup(res.msg,function(){
        	location.href = res.data.url;
        });*/
        return;

      }
      if (res.code == 102) {
        new Confirm(res.msg, function() {
          location.href = res.data.url;
        });
        return;
      }
      //返回异常
      else if (res.code == 200 && res.data.successful != 1 && res.data.message) {
        //$.toast(res.data.message);
        new Confirm(res.data.message,function(){}).show(); 
        return;
      }
      //正常返回
      else if (res.code == 200) {
        callback && callback(res);
        return;
      } else {
        $.toast(res.msg);
        return;
      }
    }
  });
}
