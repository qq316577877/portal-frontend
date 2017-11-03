$(function(){
	// search
	// get参数的分隔符
	var PARAM_SEPARATOR = "&";
	// 赋值 分隔符
	var VALUE_SEPARATOR = "=";
	// hash 标识符
	var HASH_SEPARATOR = "#";
	// search 标识符
	var SEARCH_SEPARATOR = "?";
	// url正则匹配
	var URL_MATCH = /(^(?:(?:http|https)\:\/\/)?[^\/^\?^#]+)([^\?^#]+)?(\?[^#]+)?(#.+)?/;
	// 混合对象
	function _mix(first, second, m) {
		for (key in second) {
			if (!m) { //不像 for in operator, hasownproperty 不追踪prototype chain
				if (first[key]) {
					continue;
				}
				first[key] = second[key];
			} else {
				first[key] = second[key];
			}
		}
		return first;
	}
	// 判断是否为对象，多值传参需要
	function _isObject(obj) {
		return Object.prototype.toString.call(obj).indexOf("object Object") !== -1 ? true : false;
	}
	// 解析字符串为对象，解析search
	function _parse(search) {
		if (!search)
			return {};
		var params = search.split(PARAM_SEPARATOR);
		var paramObj = {};
		var length = params.length;
		while (--length + 1) {
			var keyValue = params[length].split(VALUE_SEPARATOR);
			if (keyValue[0]) {
				paramObj[keyValue[0]] = keyValue[1];
			}
		}
		return paramObj;
	};
	// 重构obj为字符串
	function _build(obj) {
		if (!_isObject(obj))
			return "";
		var result = [];
		for (k in obj) {
			result.push(k + VALUE_SEPARATOR + obj[k]);
		}
		return result.join(PARAM_SEPARATOR)
	}
	// to deal with url 而不是局限与location.href
	function Url(url) {
		var self = this;
		// 原始的保存的url
		self.originUrl = self.url = (url + "") || "";
		// // 赋值回调 
		// ["hashValue","originValue","searchValue","pathValue"].forEach(function(item){
		//     Object.defineProperty(self,item,{
		//         set:function(value){
		//             self["_"+item] = value;
		//             self._build();
		//         },
		//         get:function(value){
		//             return self["_"+item];
		//         }
		//     })
		// })
		// 分析url，获得相应的值
		self._parse();
		return this;
	}
	// 设search值
	Url.prototype.search = function(k, value) {
			var self = this;
			var _searchObj = self._searchObj;
			if (k == undefined) {
				// 获得字符串
				return self['searchValue'];
			} else if (_isObject(k)) {
				// 对象赋值
				_mix(_searchObj, k, true);
				self.searchValue = SEARCH_SEPARATOR + _build(_searchObj);
				self._build();
			} else if (k === true) {
				// 获得属性全对象
				return self._searchObj;
			} else if (k && value == undefined) {
				// 获得属性值
				return _searchObj[k] || "";
			} else {
				// 单个设置
				_searchObj[k] = value;
				self.searchValue = SEARCH_SEPARATOR + _build(_searchObj);
				self._build();
			}
			return this;
		}
		// 常规赋值
		// hash origin path
	Url.prototype.hash = function(value) {
		return !value ? this['hashValue'] : ((this.hashValue = HASH_SEPARATOR + value), self._build(), this);
	}
	Url.prototype.origin = function(value) {
		return !value ? this['originValue'] : ((this.originValue = value), self._build(), this);
	}
	Url.prototype.path = function(value) {
			return !value ? this['pathValue'] : ((this.pathValue = value), self._build(), this);
		}
		// 内部解析,针对search
	Url.prototype._parse = function() {
			var self = this;
			var url = self.url;
			// 获得匹配值
			var url_match = url.match(URL_MATCH);
			url_match && _mix(self, {
				originValue: url_match[1] || "",
				pathValue: url_match[2] || "",
				searchValue: url_match[3] || "",
				hashValue: url_match[4] || ""
			}, true);
			self._searchObj = url_match ? _parse((url_match[3] || "").replace(SEARCH_SEPARATOR, "")) : {};
		}
		//重新build url 
	Url.prototype._build = function() {
		return this.url = this.origin() + this.path() + this.search() + this.hash();
	}
	Url.prototype.value = function() {
		return this.url;
	}
	window.Url = Url;
});