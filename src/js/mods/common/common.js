/**
 * 共同方法
 * Created by qinmenghuan on 2017/6/22.
 */

function Common(options) {
    options = options || {};
    var defaultOpts = {

    }
    this.config = merge(options, defaultOpts);
    this.consolete=consoletest;

    function merge(master, slave) {
        if (!slave) return master;
        Object.keys(master).forEach(function(value, key) {
            slave[value] = master[value];
        });
        return slave;
    }

    function consoletest() {
        console.log("test112");
    }
}

// 测试
Common.prototype.test = function(element) {
    console.log("test");
}

var Common = new Common();