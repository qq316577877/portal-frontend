function Window(content, option) {
    $('#J_common_window').remove();
    var self = this;
    var default_option = {
        leftBtn: '确认',
        rightBtn: '取消',
        leftCb: function() {},
        rightCb: function() {}
    };

    var option = $.extend(false, default_option,option);
    this.popupHTML = TPL.common.popup.tpl({
        notice: content,
        leftBtn:option.leftBtn,
        rightBtn:option.rightBtn
    });
    $('body').append(this.popupHTML);
    this.$popupEL = $('#J_common_window');
    this.show();
    this.$popupEL.delegate('#J_common_window_submit', 'click', function(e) {
        option.leftCb && option.leftCb();
        $.modal.close();
        $('#J_common_window').remove();
    });
    this.$popupEL.delegate('.J_common_window_cancel', 'click', function(e) {
        option.rightCb && option.rightCb();
        $.modal.close();
        $('#J_common_window').remove();
    });
    this.$popupEL.delegate('.close-modal', 'click', function(e) {
        $.modal.close();
        $('#J_common_window').remove();
    });
}

Window.prototype.show = function() {
    this.$popupEL.modal({
        clickClose: false
    }).show();
}

Window.prototype.remove = function() {
    this.$popupEL.remove();
}

