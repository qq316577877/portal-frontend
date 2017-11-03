/**
 * @param {varType} options Description
 * @return {void} description
 */
function Check(options) {
  options = options || {};
  var defaultOpts = {

  }
  this.config = merge(options, defaultOpts);

  function merge(master, slave) {
    if (!slave) return master;
    Object.keys(master).forEach(function(value, key) {
      slave[value] = master[value];
    });
    return slave;
  }
}

Check.prototype.num = function(element, canZero) {
  //zero = zero || false;
  var ipValue = element.val().trim();
  if (!/^[1-9]*[1-9][0-9]*$/.test(ipValue)) {
    if (ipValue === '0') {
      if (!canZero) {
        element.val('1');
      }
      return true;
    }
    if (ipValue == '') {
      //element.val('1');
      return false;
    }
    ipValue = ipValue.replace(/[\D\.]/g, '');
    //ipValue = ipValue.replace('.', '');
    element.val(ipValue);
    return false;
  }
  return true;
}

Check.prototype.floatNum = function(element) {
  var ipValue = element.val().trim();
  if (!$.isNumeric(ipValue)) {
    if (ipValue == '') {
      element.val('1');
      return false;
    }
    ipValue = ipValue.replace(/[\D]/g, '');

    //ipValue =ipValue.replace(/[^.0-9]/g, '');
    element.val(ipValue);
    return false;
  }
  return true;
}


Check.prototype.listenEmpty = function(callback) {
  $(document).delegate('.amout-input', 'blur', function(e) {
    var $el = $(e.target);
    if ($el.val() == '') {
      $el.val($el.attr('prev'));
    }
    $el.attr('prev', $el.val());
    callback && callback(e);
  });
}


//var check = new Check();
