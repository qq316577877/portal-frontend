//加法   
function Count() {
    this.d = 2;
}

Count.prototype.add = function(arg1, arg2) {
  arg1 = arg1.toString(), arg2 = arg2.toString();
  var arg1Arr = arg1.split("."),
    arg2Arr = arg2.split("."),
    d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
    d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
  var maxLen = Math.max(d1.length, d2.length);
  var m = Math.pow(10, maxLen);
  var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
  var d = this.d;
  return typeof d === "number" ? (result).toFixed(d) : result;
}

//减法   
Count.prototype.sub = function(arg1, arg2) {
  return Calc.Add(arg1, -Number(arg2), this.d);
}

//乘法   
Count.prototype.mul = function(arg1, arg2) {
  var r1 = arg1.toString(),
    r2 = arg2.toString(),
    m, resultVal, d = this.d;
  m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
  resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
  return typeof d !== "number" ? resultVal : resultVal.toFixed(parseInt(d));
}

//除法   
Count.prototype.div = function(arg1, arg2) {
  var r1 = arg1.toString(),
    r2 = arg2.toString(),
    m, resultVal, d = this.d;
  m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
  resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
  return typeof d !== "number" ? resultVal : resultVal.toFixed(parseInt(d));
}
