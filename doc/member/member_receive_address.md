# 会员信息--收件地址

/member/supplier/list
页面预埋信息：
```
    
    __DATA = {
    // 以下是预埋的收件地址信息
         "receiveAddress": [
            {
              "address": "平阳县万全镇江畔村（村委会办公楼边",
              "id": 3,
              "countryId":1,
              "countryName":"中国",
              "provinceId": 110000,
              "districtId": 110101,
              "provinceName": "北京市",
              "receiver": "邱老板",
              "phoneNum": "86-0755-928385",
              "cityName": "北京市",
              "cityId": 110100,
              "selected": 1,
              "cellPhone": "86-13912345678",
              "zipCode": "000000",
              "districtName": "东城区"
            },
            {
              "address": "平阳县万全镇江畔村（村委会办公楼边",
              "id": 2,
              "countryId":1,
              "countryName":"中国",
              "provinceId": 110000,
              "districtId": 110101,
              "provinceName": "北京市",
              "receiver": "邱老板",
              "phoneNum": "86-0755-928385",
              "cityName": "北京市",
              "cityId": 110100,
              "selected": 0,
              "cellPhone": "86-13912345678",
              "zipCode": "000000",
              "districtName": "东城区"
            }
        ]
        
        //以下是预埋的号码前缀
        "codeList":[{
                        "name":"越南",
						"areaCode"："084",
                        "id":1
                    },
                    {
                        "name":"中国",
						"areaCode"："086",
                        "id":2
                    }
        ]
    }    
```


## 会员信息——查询会员收件地址信息

ajax url:/member/delivery_address/get_user_receive_address_ajax

请求

```
    POST
    {
    }
```

结果

```
    {
        code:200,
        msg:"success",
        data:{
            receiveAddress:[{
							"id":11111111,//收件地址标识
                            "receiver":"邱老板",//收件人
                            "countryId":1,
                            "countryName":"中国",
                            "provinceId":1,
                            "provinceName":"浙江省",
                            "cityId":1,
                            "cityName":"温州市",
                            "districtId":1,
                            "districtName":"平阳",
							"address":"平阳县万全镇江畔村（村委会办公楼边",//详细地址
							"zipCode":"000000",//邮编
							"cellPhone":"86-13912345678",//手机
							"phoneNum":"86-0755-928385",//座机
							"selected":1//是否默认地址：1.是 0.否
                        },
                        {
							"id":11111112,//收件地址标识
                            "receiver":"邱老板",//收件人
                            "countryId":1,
                            "countryName":"中国",
                            "provinceId":1,
                            "provinceName":"浙江省",
                            "cityId":1,
                            "cityName":"温州市",
                            "districtId":1,
                            "districtName":"平阳",
							"address":"平阳县万全镇江畔村（村委会办公楼边",//详细地址
							"zipCode":"000000",//邮编
							"cellPhone":"86-13912345678",//手机
							"phoneNum":"86-0755-928385",//座机
							"selected":0//是否默认地址：1.是 0.否
                        }
                    ]
            
        }
    }
```

## 会员信息——会员新增收件地址




ajax url:/member/delivery_address/add_user_receive_address_ajax

请求

```
    POST
    {
        receiver:"邱老板",//收件人
        countryId:1,
		provinceId:1,
		cityId:1,
		districtId:1,
		address:"平阳县万全镇江畔村（村委会办公楼边",//详细地址
		zipCode:"000000",//邮编
		cellPhone:"86-13912345678",//手机
		phoneNum:"86-0755-928385",//座机
		selected:1//是否默认地址：1.是 0.否
    }
```

结果

```
    {
        code:200,
        msg:"success",
        data:{}
    }
```

## 会员信息——会员修改收件地址信息
ajax url:/member/delivery_address/update_user_receive_address_ajax

请求

```
    POST
    {
		
		id:11111111,//收件地址标识
        receiver:"邱老板",//收件人
        countryId:1,
		provinceId:1,
		cityId:1,
		districtId:1,
		address:"平阳县万全镇江畔村（村委会办公楼边",//详细地址
		zipCode:"000000",//邮编
		cellPhone:"86-13912345678",//手机
		phoneNum:"86-0755-928385",//座机
		selected:1//是否默认地址：1.是 0.否
    }
```

结果

```
     {
        code:200,
        msg:"success",
        data:{}
    }
```

## 会员信息——设为默认地址
ajax url:/member/delivery_address/set_default_address_ajax

请求

```
    POST
    {
        id:11111111//收件地址标识
    }
```

结果

```
     {
        code:200,
        msg:"success",
        data:{}
    }
```
    
## 会员信息——会员删除收件地址
ajax url:/member/delivery_address/delete_user_receive_address_ajax

请求

```
    POST
    {
        id:11111111//收件地址标识
    }
```

结果

```
     {
        code:200,
        msg:"success",
        data:{}
    }
```
