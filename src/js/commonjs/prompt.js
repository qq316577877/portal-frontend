/**
 * 弹出框
 * Created by qinmenghuan on 2017/7/19.
 */

function Prompt() {
    // 提示对象
    var msgObject={};

    var promptHtml=  ""+
        "<div id='promptPop' class=\"promptMask\">"+
        "    <div class=\"promptInform\">"+
        "        <div class=\"inform-head\">"+
        "            <span class=\"fl\">提示信息</span>"+
        "            <i id='alertCancel' class=\"iconfont icon-chacha cancel fr\"></i>"+
        "        </div>"+
        "        <div class=\"prompt-inform-body\">"+
        "            <p class=\"text-color\"></p>"+
        "            <button class=\"nextStep \">确定</button>"+
        "        </div>"+
        "    </div>"+
        "</div>";

    // 初始化方法
    init();
    
    this.alertMsg=alertMsg;

    // 初始化
    function init() {
        // 页面加载完后
        $(function () {
            // 添加html
            $("body").append(promptHtml);
            // 关闭事件
            $(".nextStep").click(closeAlert);
            $("#alertCancel").click(closeAlert);
        });
    }
    
    /**
     * 弹出信息
     * @param msgObj.msg   提示信息
     * @param msgObj.closeTime 关闭时间
     * @param btnClick 关闭的回调事件
     * @param type     成功;success color:#00AA5C; 失败:error color:red 传其他数字无效
     */
    function alertMsg(msgObj) {
        msgObject = msgObj || {};
        // 更新提示信息
        $("#promptPop .prompt-inform-body p").html(msgObject.msg||"");
        // 关闭样式
        $("#promptPop").css("display","block");
        // 对齐
        if(msgObject.textAlgin){
            if(msgObject.textAlgin=="left"){
                $("#promptPop .prompt-inform-body p").attr("class","text-color text-inform-left");
            }
        }
        // 自动关闭
        if(msgObject.closeTime){
            setTimeout(function () {
                closeAlert();
            },msgObject.closeTime*1000);
        }
        //颜色
        if(msgObject.type){
            if(msgObject.type==="success"){
                $(".text-color").css("color","#00aa5c");
            }else if(msgObject.type==="error"){
                $(".text-color").css("color","red");
            }
        }
    }

    // 关闭弹出框
    function closeAlert() {
        $("#promptPop").css("display","none");
        // 回调事件
        if($.isFunction(msgObject.btnClick)){
            msgObject.btnClick();
        }
    }
}

// 测试
Prompt.prototype.test = function(element) {
    console.log("test");
}

var Prompt=new Prompt();