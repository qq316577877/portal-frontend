$(function(){
	//获取国家

	httpRequest({
		url: AjaxUrl.common_supported_countries_ajax,
		success: function (response) {
			$.each(response.data, function(k, v) {
				var $opt = $('<option value=' + v.id + ' data-tel="'+v.areaCode+'">' + v.name + '</option>');
				$('.country').append($opt);
			});
		}
	});

	//当国家值改变	
	$("#country").change(function() {
		var id = $("#country").find("option:selected").attr('value');
		if(id==0){
			$('.province').html('<option value="0">选择省</option>');
			$('.city').html('<option value="0">选择市</option>');
			$('.district').html('<option value="0">选择区</option>');
		}
		countryAjax(id);

	});

	function countryAjax(id) {

		httpRequest({
			url: AjaxUrl.common_supported_cities_ajax,
			params:  {
				countryId:id
			},
			success: function (response) {
				$(".selectList").each(function() {
					var areaJson = response.data;
					var temp_html;
					var oProvince = $(this).find(".province");
					var oCity = $(this).find(".city");
					var oDistrict = $(this).find(".district");
					//初始化省
					var province = function() {
						$.each(areaJson, function(i, province) {
							temp_html += "<option value='" + province.id + "'>" + province.name + "</option>";
						});
						oProvince.html(temp_html);
						city();
					};
					//赋值市
					var city = function() {
						temp_html = "";
						var n = oProvince.get(0).selectedIndex;
						$.each(areaJson[n].cities, function(i, city) {
							temp_html += "<option value='" + city.id + "'>" + city.name + "</option>";
						});
						oCity.html(temp_html);
						district();
					};
					//赋值县
					var district = function() {
						temp_html = "";

						var m = oProvince.get(0).selectedIndex;
						var n = oCity.get(0).selectedIndex;
						if(typeof(areaJson[m].cities[n].areas) == "undefined") {
							oDistrict.css("display", "none");
						} else {
							oDistrict.css("display", "inline");
							$.each(areaJson[m].cities[n].areas, function(i, district) {
								temp_html += "<option value='" + district.id + "'>" + district.name + "</option>";
							});
							oDistrict.html(temp_html);
						};
					};
					//选择省改变市
					oProvince.change(function() {
						city();
					});
					//选择市改变县
					oCity.change(function() {
						district();
					});
					province();
				});
			}
		});

	}
})
	