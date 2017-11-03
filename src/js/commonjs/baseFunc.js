/**
 * 共同方法
 * Created by qinmenghuan||yanglong on 2017/6/22.
 * 1
 */

function BaseFunc() {

    this.consolete=consoletest;
    function consoletest() {
    }
}

// 禁止特殊符号
BaseFunc.prototype.ValidateValue = function(textbox) {
    var IllegalString = "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
    var textboxvalue = textbox.value;
    var index = textboxvalue.length - 1;

    var s = textbox.value.charAt(index);

    if (IllegalString.indexOf(s) >= 0) {
        s = textboxvalue.substring(0, index);
        textbox.value = s;
    }
}

var BaseFunc = new BaseFunc();

// 页面加载完后
$(function () {
    $('input[type="text"]').keyup(function () {
        if(!$(this).hasClass("specialChar")){
            BaseFunc.ValidateValue(this);
        }
    });
    $('input[type="text"]').keydown(function () {
        if(!$(this).hasClass("specialChar")){
            BaseFunc.ValidateValue(this);
        }
    });
})