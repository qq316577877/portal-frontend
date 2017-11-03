# 会员信息-银行卡
/member/bank/list

页面预埋信息：
```
    
    __DATA = {
    // 以下是预埋的银行卡信息
        "bankCards": [
            {
              "id": 3,
              "bankName": "九江银行温州平阳支行",
              "accountName": "浙江省创意科技农产品进口服务有限公司",
              "districtName": "东城区",
              "cityName": "北京市",
              "cityId": 110100,
              "bankCard": "812583972110003",
              "districtId": 110101,
              "provinceName": "北京市",
              "provinceId": 110000,
              "bankTypeId": 0
            },
            {
              "id": 2,
              "bankName": "九江银行武汉支行",
              "accountName": "浙江省XX公司",
              "districtName": "东城区",
              "cityName": "北京市",
              "cityId": 110100,
              "bankCard": "812583972110001",
              "districtId": 110101,
              "provinceName": "北京市",
              "provinceId": 110000,
              "bankTypeId": 1
            },
            {
              "id": 4,
              "bankName": "九江银行温州平阳支行",
              "accountName": "浙江省创意科技农产品进口服务有限公司",
              "districtName": "东城区",
              "cityName": "北京市",
              "cityId": 110100,
              "bankCard": "812583972110005",
              "districtId": 110101,
              "provinceName": "北京市",
              "provinceId": 110000,
              "bankTypeId": 1
            }
        ]
        
        //以下是预埋的银行列表信息
        "bankList":[{
                        "name":"九江银行",
                        "id":1
                    },
                    {
                        "name":"工商银行",
                        "id":2
                    }
                ]
    }    
```


## 会员信息——查询会员银行账号信息

ajax url:/member/bank/get_user_bank_information_ajax

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
            mobile:"13612345678",
            bankCards:[{
                            "id":1,//表id,信息唯一标识
                            "accountName":"浙江省创意科技农产品进口服务有限公司",//开户名称
                            "provinceId":1,
                            "provinceName":"浙江省",
                            "cityId":1,
                            "cityName":"温州市",
                            "districtId":1,
                            "districtName":"平阳",
                            "bankTypeId":1,
                            "bankName":"九江银行温州平阳支行",//开户支行
                            "bankCard":"812583972110001"//银行卡号
                        },
                        {
                            "id":2,//表id,信息唯一标识
                            "accountName":"浙江省创意科技农产品进口服务有限公司",//开户名称
                            "provinceId":1,
                            "provinceName":"浙江省",
                            "cityId":1,
                            "cityName":"温州市",
                            "districtId":1,
                            "districtName":"平阳",
                            "bankTypeId":1,
                            "bankName":"九江银行温州平阳支行",//开户支行
                            "bankCard":"812583972110001"//银行卡号
                        }
                    ]
            
        }
    }
```

## 会员信息——会员新增银行卡号




ajax url:/member/bank/add_user_bank_information_ajax

请求

```
    POST
    {
        accountName:"浙江省创意科技农产品进口服务有限公司",//开户名称
        provinceId:1,
        cityId:1,
        districtId:1,
        bankTypeId:1,
        bankName:"九江银行温州平阳支行",//开户支行
        bankCard:"812583972110001"//银行卡号
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

## 会员信息——验证银行卡号
会员新增、修改银行卡号信息时用
ajax url:/member/bank/check_user_bank_information_ajax

请求

```
    POST
    {
        bankCard:"812583972110001"//银行卡号
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

## 会员信息——设为默认银行卡
ajax url:/member/bank/set_default_bank_ajax

请求

```
    POST
    __DATA=
    {
        id:11111111//表id，银行卡标识
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

## 会员信息——会员修改银行卡号信息
ajax url:/member/bank/update_user_bank_information_ajax

请求

```
    POST
    {
        id:2,//表id,信息唯一标识
        accountName:"浙江省创意科技农产品进口服务有限公司",//开户名称
        provinceId:1,
        cityId:"1",
        districtId:1,
        bankTypeId:1,
        bankName:"九江银行温州平阳支行",//开户支行
        bankCard:"812583972110001"//银行卡号
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
    
    
## 会员信息——会员删除银行卡
ajax url:/member/bank/delete_user_bank_information_ajax

请求

```
    POST
    {
        id:2,//表id,信息唯一标识
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