/*
* 2017-8-16 by yaangdezong
* 贷款计算器
*/

function Calculator() {
    var calculatorHtml = "<div class=\"mask\">" +
        "    <div class=\"calculator\" id=\"calculator\">" +
        "        <div class=\"calculator-head\">" +
        "            <span class=\"fl\">贷款计算器</span>" +
        "            <i class=\"iconfont icon-chacha cancel fr\" id=\"cancel\"></i>" +
        "        </div>" +
        "        <div class=\"calculator-body\">" +
        "            <label>" +
        "                <span>借多少</span>" +
        "                <input type=\"text\" maxlength=\"10\" id=\"money_loan\"/>" +
        "                <span>元</span>" +
        "                <span id=\"empty\">请输入正整数</span>" +
        "            </label>" +
        "            <label>" +
        "                <span>借多久</span>" +
        "                <input type=\"text\" maxlength=\"10\" id=\"money-day\"/>" +
        "                <span>天</span>" +
        "                 <span id=\"wrong-day\">钱数不能为空</span>" +
        "            </label>" +
        "            <label>" +
        "                <span>怎么还</span>" +
        "                <select name=\"\" id=\"\">" +
        "                    <option value=\"\">" +
        "                        到期还本付息" +
        "                    </option>" +
        "                </select>" +
        "            </label>" +
        "            <p class=\"error red\">请填写正确格式</p>" +
        "            <p>月利率&nbsp;<span id=\"monthRet\"></span> &nbsp;&nbsp; 服务费<i class=\"text\">0.5%</i> &nbsp;&nbsp0.1%</p>" +
        "            <div class=\"btn-ca\">" +
        "                <button id=\"btn_1\">计算</button>" +
        "                <button id=\"btn_2\">重置</button>" +
        "            </div>" +
        "			<div class=\"loan-details\">" +
        "				<h4>还款详情</h4>" +
        "             	<p id=\"principal\"></p>" +
        "                <p id=\"interest\"></p>" +
        "                <p id=\"coverCharge\"></p>" +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";

    // 初始化方法
    init();

    this.open = open;

    // 初始化
    function init() {
        // 页面加载完后
        $(function() {
            // 添加html
            $("body").append(calculatorHtml);
            //关闭计算器
            $("#cancel").click(close);
            //输入金额校验
            $("#money_loan").on("input", inputMoney);
            //输入天数校验
            $("#money-day").on("input", inputDays);
            //计算
            $("#btn_1").click(calculate);
            //清空计算器
            $("#btn_2").click(clearCalculator);
        });
    }

    /**
     * 打开计算器
     */
    function open() {
        				$.ajax({
        					url: '/loan/info/get_loan_info_interest_rate_ajax',
        					type: 'post',
        					success: function(data) {
        						var monthInterestRate = data.data.monthInterestRate;
        						monthInterestRate = monthInterestRate * 100;
        						$('#monthRet').html(monthInterestRate + '%');
        					}
        				});

        $(".mask").css("display", "block");
        $(".calculator").css("display", "block");
    };

    // 关闭计算器
    function close() {
        clearCalculator();
        $(this).parents(".calculator-head").parents("#calculator").css("display", "none");
        $(".mask").css("display", "none");
    };

    //输入金额校验
    function inputMoney() {
        var oVal = $(this).val();
        var Reg = /^(0\.\d{1,2}|[1-9]\d*(\.\d{1,2})?)$/;
        if(Reg.test(oVal)) {
            $("#empty").css("display", "none");
            $(".calculator-body .error").hide();
        } else {
            $("#empty").text("请输入正整数").css({
                "color": "red",
                "display": "block"
            });
        };
    };

    //输入天数校验
    function inputDays() {
        var oVal = $(this).val();
        var Reg = /^[0-9]{0,}$/;
        if(Reg.test(oVal)) {
            $("#wrong-day").css("display", "none");
            $(".calculator-body .error").hide();
        } else {
            $("#wrong-day").text("请输入数字").css({
                "color": "red",
                "display": "block"
            });
        }
    };

    //计算
    function calculate() {
        if($("#money_loan").val() == "") {
            $("#empty").text("请输入数字").css({
                "color": "red",
                "display": "block"
            });
        } else if($("#money-day").val() == "") {
            $("#wrong-day").text("请输入数字").css({
                "color": "red",
                "display": "block"
            });
        } else if($("#empty").css("display") == "block" || $("#wrong-day").css("display") == "block") {
            $(".calculator-body .error").show();
        } else {
            var time = $("#money-day").val();
            var ret = (parseInt($("#money-day").val())) / 30;
            var money_1 = $("#money_loan").val();
            console.log(ret);
            interests = ret * (parseInt($('#monthRet').html()) / 100) * (parseInt($("#money_loan").val()));
            service = (parseInt($("#money_loan").val())) * 0.001;
            $("#principal").text("到期还本金：" + money_1 + "元");
            $("#interest").text("借满" + time + "天总利息：" + interests.toFixed(2) + "元");
            $("#coverCharge").text("借款服务费：" + service + "元");
            $(".loan-details").show();

        };
    };

    //重置计算器
    function clearCalculator() {
        $("#money_loan").val("");
        $("#money-day").val("");
        $("#empty").hide();
        $("#wrong-day").hide();
        $(".loan-details").hide();
    };
};

var Calculator = new Calculator();