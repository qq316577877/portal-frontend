# 创建物流服务
order/create_logistics
请求参数
```
{
    "orderNo": "111706035433",
    "type": 1,
    "tradeType": 1,
    "preClearance": 1,
    "clearance": 1,
    "clearanceCompanyId": 1,
    "insurance": 1,
    "innerExpressId": 1,
    " outerExpressId": 1,
    "contractUrl": "url",
    "voucherUrl": "url",
    "payType": 1,
    "needLoan": 0,
    "deliveryId":1
}
```
返回结果
```
{
  "data": true,
  "code": 200,
  "msg": "success"
}

code列表
404:非法请求
405:请求参数验证不通过
500:内部错误
111009：收货地址不存在
```


# 查看物流详情
/order/logistics_detail_ajax
请求参数
```
{
    "id":"11170606708901"  //货柜编号
}
```
```
{
  "data": {
    "containerNo": null,
    "logisticsDetails": [
      {
        "type": 1,
        "id": 1,
        "status": 1,
        "addTime": 1496760766000,
        "detailInfo": "已到上海",
        "containerNo": "11170606708901",
        "transportNumber": "1",
        "logisticsId": 6,
        "updateTime": 1496757120000
      },
      {
        "type": 1,
        "id": 2,
        "status": 1,
        "addTime": 1496757102000,
        "detailInfo": "已出关",
        "containerNo": "11170606708901",
        "transportNumber": "1",
        "logisticsId": 6,
        "updateTime": 1496757106000
      }
    ],
    "innerExpress": {
      "name": "上海物流公司",
      "type": 1,
      "id": 1,
      "status": 0,
      "addTime": 1496757241000,
      "locationType": 1,
      "credential": "",
      "credentialUrl": "",
      "updateTime": 1496757245000,
      "contact": "",
      "enName": "shanghai"
    },
    "outerExpress": {
      "name": "上海物流公司",
      "type": 1,
      "id": 1,
      "status": 0,
      "addTime": 1496757241000,
      "locationType": 1,
      "credential": "",
      "credentialUrl": "",
      "updateTime": 1496757245000,
      "contact": "",
      "enName": "shanghai"
    },
    "orderNo": null
  },
  "msg": "success",
  "code": 200
}
```