/**
 * 下拉框控件
 * Created by qinmenghuan on 2017-08-08.
 */

function FruitSelect(formid,options) {
    // 全局变量
    var options = options || {};
    var formSelect=$("#"+formid);
    var keyVal=options.keyVal;
    this.getVal=getVal;
    this.setVal=setVal;
    // 判断change事件
    if($.isFunction(options.change)){
        formSelect.change(options.change);
    }
    
    // 初始化
    init();

    // 初始化
    function init() {
        // 设置class
        if(options.class){
            formSelect.attr("class",options.class);
        }
        
        // 设置name
        if(options.name){
            formSelect.attr("name",options.class);
        }
        
        // 绑定数据
        var htmlStr="";
        // 如果有默认值
        if(options.defaultValObj){
            htmlStr+='<option value="' + options.defaultValObj.value + '">' + options.defaultValObj.name + '</option>';
        }
        if(options.selectData&&options.selectData.length>0){
            $.each(options.selectData, function (index, val) {
                htmlStr+='<option value="' + val[keyVal.value] + '">' + val[keyVal.name] + '</option>';
            });
        }
        formSelect.html(htmlStr);

        // 设置默认值
        if(options.defaultVal){
            formSelect.val(options.defaultVal);
        }
    }

    // 取值
    function getVal() {
        return formSelect.val();
    }

    // 赋值
    function setVal(value) {
        formSelect.val(value);
    }
}
