/**
 * 单选框控件
 * Created by qinmenghuan on 2017-08-08.
 */

function FruitRadio(formid,options) {
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

        // 绑定数据
        var htmlStr="";
        // 如果有默认值
        if(options.selectData&&options.selectData.length>0){
            $.each(options.selectData, function (index, val) {
                if(val.checked){
                    htmlStr+='<input checked="checked" type="radio" name="'+options.class+'" value="' + val[keyVal.value] + '"/>' + val[keyVal.name] ;
                }else{
                    htmlStr+='<input type="radio" name="'+options.class+'" value="' + val[keyVal.value] + '"/>' + val[keyVal.name] ;
                }
            });
        }
        formSelect.html(htmlStr);
    }

    // 取值
    function getVal() {
        return var radioVal= $("input[name='"+options.class+"']:checked").val();
    }

    // 赋值
    function setVal(value) {
        $("input[name='fruit'][value='"+value+"']").attr("checked",true);
    }
}

// 例子
// var countrySelect=new RadioSelect("fruitRadio",{
//     class:"fruit",
//     name:"fruit",
//     selectData:[{name:"aa",id:"1"},{name:"cc",id:"2"},{name:"bb",id:"3",checked:true}],
//     keyVal:{name:"name",value:"id"},
//     change:function () {
//         // console.log("change:",$(this).val());
//         var radioVal= $("input[name='fruit']:checked").val();
//         console.log("radioVal:",radioVal);
//     }
// });
//
// $("input[name='fruit'][value='2']").attr("checked",true);
