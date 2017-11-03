# 会员信息--供应商信息

/member/delivery_address/list
页面预埋信息：
```
    
    __DATA = {
    // 以下是预埋的供应商信息
       "supplierList": [
            {
              "address": "越南同塔省沙沥市黎利路3坊3组284/3A号",
              "id": 4,
              "countryId": 1,
              "cityId": 110100,
              "cityName": "北京市",
              "phoneNum": "86-0755-928385",
              "zipCode": "000000",
              "cellPhone": "86-13912345678",
              "countryName": "中国",
              "provinceName": "北京市",
              "provinceId": 110000,
              "districtId": 110101,
              "supplierName": "越南正心火龙果工厂",
              "supplierContact": "胡志敏",
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

## 会员信息——查询会员供应商信息

ajax url:/member/supplier/get_user_supplier_information_ajax

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
            supplierList:[{
							"id":11111111,//供应商标识
                            "supplierName":"越南正心火龙果工厂",//供应商名称
							"countryId":1,
							"countryName":"中国",
                            "provinceId":1,
                            "provinceName":"浙江省",
                            "cityId":1,
                            "cityName":"温州市",
                            "districtId":1,
                            "districtName":"平阳",
							"address":"越南同塔省沙沥市黎利路3坊3组284/3A号",//详细地址
							"zipCode":"000000",//邮编
							"supplierContact":"胡志敏",//供应商联系人
							"cellPhone":"86-13912345678",//手机
							"phoneNum":"86-0755-928385"//座机
                        },
                        {
							"id":11111112,//供应商标识
                            "supplierName":"越南正心火龙果工厂",//供应商名称
							"countryId":1,
							"countryName":"中国",
                            "provinceId":1,
                            "provinceName":"浙江省",
                            "cityId":1,
                            "cityName":"温州市",
                            "districtId":1,
                            "districtName":"平阳",
							"address":"越南同塔省沙沥市黎利路3坊3组284/3A号",//详细地址
							"zipCode":"000000",//邮编
							"supplierContact":"胡志敏",//供应商联系人
							"cellPhone":"86-13912345678",//手机
							"phoneNum":"86-0755-928385"//座机
                        }
                    ]
            
        }
    }
```

## 会员信息——会员新增供应商




ajax url:/member/supplier/add_user_supplier_information_ajax

请求

```
    POST
    {
		supplierName:"越南正心火龙果工厂",//供应商名称
		countryId:1,
		provinceId:1,
        cityId:1,
        districtId:1,
		address:"越南同塔省沙沥市黎利路3坊3组284/3A号",//详细地址
		zipCode:"000000",//邮编
		supplierContact:"胡志敏",//供应商联系人
		cellPhone:"86-13912345678",//手机
		phoneNum:"86-0755-928385"//座机
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

## 会员信息——会员修改供应商信息

ajax url:/member/supplier/update_user_supplier_information_ajax

请求

```
    POST
    {
		id:"11111111",//供应商标识
        supplierName:"越南正心火龙果工厂",//供应商名称
		countryId:1,
		provinceId:1,
		cityId:1,
        districtId:1,
		address:"越南同塔省沙沥市黎利路3坊3组284/3A号",//详细地址
		zipCode:"000000",//邮编
		supplierContact:"胡志敏",//供应商联系人
		cellPhone:"86-13912345678",//手机
		phoneNum:"86-0755-928385"//座机
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
    
    
## 会员信息——会员删除供应商
ajax url:/member/supplier/delete_user_supplier_information_ajax

请求

```
    POST
    {
        id:11111111//供应商标识
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