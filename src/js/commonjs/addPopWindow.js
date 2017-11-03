/**
 * Created by yl on 2017/8/4.
 */
function AddPop() {
    var tag =
        '<div id="calMask">' +
        '<div class="inform" id="inform_2">' +
        '        <div class="inform-head">' +
        '            <span class="fl">贷款计算器</span>' +
        '            <i class="iconfont icon-chacha cancel fr" id="cancel"></i>' +
        '        </div>' +
        '        <div class="inform-body">' +
        '            <label>' +
        '                <span>借多少</span>' +
        '                <input type="text" maxlength="10" id="money_loan"/>' +
        '                <span>元</span>' +
        '                <span id="empty">请输入正整数</span>' +
        '            </label>' +
        '            <label>' +
        '                <span>借多久</span>' +
        '                <input type="text" maxlength="10" id="money-day"/>' +
        '                <span>天</span>' +
        '                 <span id="wrong-day">钱数不能为空</span>' +
        '            </label>' +
        '            <label>' +
        '                <span>怎么还</span>' +
        '                <select name="" id="">' +
        '                    <option value="">' +
        '                        到期还本付息' +
        '                    </option>' +
        '                </select>' +
        '            </label>' +
        '            <p class="error red">请填写正确格式</p>' +
        '            <p>月利率&nbsp;<span id="monthRet">1%</span> &nbsp;&nbsp; 服务费<i class="text">0.5%</i> &nbsp;&nbsp0.1%</p>' +
        '            <div class="btn-ca">' +
        '                <button id="btn_1">计算</button>' +
        '                <button id="btn_2">重置</button>' +
        '            </div>' +
        '			<div class="loan-details">' +
        '				<h4>还款详情</h4>' +
        '             	<p id="principal"></p>' +
        '                <p id="interest"></p>' +
        '                <p id="coverCharge"></p>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'

    init();

    this.open = open;
    this.close = close;

    /*
     * 加载到页面
     * */
    function init() {
        $(function () {
            $('body').append(tag)
        })
    }

    /*
     * 打开
     * */
    function open() {
        $('#calMask').css('display', 'block');
    }

    /*
     * 关闭
     * */
    function close() {
        $('#calMask').css('display', 'none');
    }
}

var AddPop = new AddPop();
