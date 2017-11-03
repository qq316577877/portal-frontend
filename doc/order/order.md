# 创建订单
/order/create_order
请求参数：
```
{
    "supplierId": "234",
    "type": 1,
    "totalAmount": 9,
    "productAmount": 0,
    "orderContainers": [
        {
            "orderContainerDetails": [
                {
                    "productId": "1",
                    "productName": "越南火龙果",
                    "quantity": "2",
                    "price": 0,
                    "productDetail": {
                        "level": "一级",
                        "type": "红心",
                        "size": "大"
                    }
                },
                {
                    "productId": "1",
                    "productName": "越南火龙果",
                    "quantity": "3",
                    "price": 0,
                    "productDetail": {
                        "level": "一级",
                        "type": "红心",
                        "size": "大"
                    }
                },
                {
                    "productId": "1",
                    "productName": "越南火龙果",
                    "quantity": "4",
                    "price": 0,
                    "productDetail": {
                        "level": "一级",
                        "type": "红心",
                        "size": "大"
                    }
                }
            ],
            "productName": "越南火龙果",
            "productId": "1",
            "totalQuantity": "9",
            "totalPrice": "0"
        }
    ]
}
```
返回结果

```
{
  "data": "111706098319",
  "code": 200,
  "msg": "success"
}

code列表

403:缺少必要参数
500:内部错误
400：非法请求
111001,111002,111003：产品已下架
111004，111005:参数错误
111003：ID为2的产品不存在"
111006：供应商不存在
111007：该用户没有权限修改此订单
111008：该订单已提交审核，不能重复提交

```


# 订单列表
order/center/find_order_byPage_ajax
请求参数
```
{
   "userId":1,
   "beginTime":"2017-05-17",
   "endTime":"2017-05-27",
   "pageNo":1,
   "pageSize":4,
   "status":0
}
```
返回结果
```
{
  "data": {
    "pageSize": 4,
    "pageNo": 1,
    "topPageNo": 1,
    "list": [
      {
        "date": "2017-06-03",
        "orderDetailUrl": "http://www.fruit.com/order/detail?id=11170603543301",
        "orderStatus": 1,
        "containerDetails": [
          {
            "containerStatus": 1,
            "containerId": "11170603543301",
            "loanStatus": null,
            "containerStatusDesc": "暂存",
            "loanStatusDesc": null,
            "loanNo": null,
            "productName": "越南火龙果"
          }
        ],
        "orderStatusDesc": "已暂存",
        "orderNo": "111706035433",
        "supplierName": "创意公司"
      },
      {
        "date": "2017-05-25",
        "orderDetailUrl": "http://www.fruit.com/order/detail?id=111705259917",
        "containerDetails": [
          {
            "containerStatus": 1,
            "containerId": "11170525991701",
            "loanNo": null,
            "loanStatus": null,
            "productName": null
          }
        ],
        "orderStatus": 1,
        "orderNo": "111705259917",
        "supplierName": "创意公司"
      },
      {
        "date": "2017-05-25",
        "orderDetailUrl": "http://www.fruit.com/order/detail?id=111705259917",
        "containerDetails": [
          {
            "containerStatus": 1,
            "containerId": "11170525127801",
            "loanNo": null,
            "loanStatus": null,
            "productName": null
          }
        ],
        "orderStatus": 12,
        "orderNo": "111705251278",
        "supplierName": "创意公司"
      },
      {
        "date": "2017-05-25",
        "orderDetailUrl": "http://www.fruit.com/order/detail?id=111705259917",
        "containerDetails": [
          {
            "containerStatus": 1,
            "containerId": "11170525758001",
            "loanNo": null,
            "loanStatus": null,
            "productName": null
          }
        ],
        "orderStatus": 1,
        "orderNo": "111705257580",
        "supplierName": "创意公司"
      }
    ],
    "totalPages": 2,
    "previousPageNo": 1,
    "nextPageNo": 2,
    "bottomPageNo": 2,
    "totalRecords": 7
  },
  "code": 200,
  "msg": "success"
}
```

# 查看订单详情
/order/detail
请求参数
```
{
    "id":"111706067089"  //订单号
}
```
返回结果
```
{
  "data": {
    "type": 1,
    "id": 6,
    "innerExpress": {
      "name": "上海物流公司",
      "id": 1,
      "enName": "shanghai"
    },
    "outerExpress": {
      "name": "上海物流公司",
      "id": 1,
      "enName": "shanghai"
    },
    "placeOrderTime": "2017-06-09",
    "clearanceCompany": {
      "name": "上海物流公司",
      "id": 1,
      "enName": "shanghai"
    },
    "orderStatusDesc": "已暂存",
    "deliveryAddress": {
      "address": "平阳县万全镇江畔村（村委会办公楼边",
      "id": 1,
      "status": 1,
      "lastEditor": "",
      "shippingTime": -62135798400000,
      "zipCode": "000000",
      "cellPhone": "1",
      "cityName": "北京市",
      "receiver": "邱老板",
      "phoneNum": "1",
      "districtName": "东城区",
      "deliveryId": 0,
      "provinceName": "北京市",
      "countryName": "中国"
    },
    "status": 1,
    "totalAmount": "480300.00",
    "contractUrl": "url",
    "productAmount": "480300.00",
    "finalAmount": "480300.00",
    "voucherUrl": "url",
    "logisticsType":1,//物流方式,1.海运, 2.陆运
    "preClearance": //1,报关服务,0.不勾选, 1.勾选
    "insurance": 1,//保险服务,0.不勾选, 1.勾选
    "tradeType": 1,//贸易方式——海运可选, 1.FOB, 2.CIF
    "clearance": 1,//清关服务,0.不勾选, 1.勾选
    "needLoan": 0,//1为需要贷款0为不需要
    "orderNo": "111706098319",
    "payType": 0,
    "agencyAmount": "0.00",
    "premiumAmount": "0.00",
    "orderContainers": [
      {
        "id": 11,
        "status": 1,
        "productAmount": "300300.00",
        "totalQuantity": "1200.00",
        "productId": 1,
        "agencyAmount": "0.00",
        "premiumAmount": "0.00",
        "totalPrice": "300300.00",
        "orderContainerDetails": [
          {
            "id": 21,
            "status": 0,
            "containerNo": "11170609831901",
            "productId": 1,
            "price": "300.00",
            "quantity": "600.00",
            "productDetail": {
              "大小": "大",
              "等级": "一级"
            },
            "totalPrice": "180000.00",
            "productName": "越南香蕉"
          },
          {
            "id": 22,
            "status": 0,
            "containerNo": "11170609831901",
            "productId": 1,
            "price": "200.50",
            "quantity": "600.00",
            "productDetail": {
              "大小": "小",
              "等级": "二级"
            },
            "totalPrice": "120300.00",
            "productName": "越南香蕉"
          }
        ],
        "productName": "越南香蕉",
        "batchNumber": "11170609831901"
      },
      {
        "id": 12,
        "status": 1,
        "productAmount": "180000.00",
        "totalQuantity": "1200.00",
        "productId": 3,
        "agencyAmount": "0.00",
        "premiumAmount": "0.00",
        "totalPrice": "180000.00",
        "orderContainerDetails": [
          {
            "id": 23,
            "status": 0,
            "containerNo": "11170609831902",
            "productId": 3,
            "price": "200.00",
            "quantity": "600.00",
            "productDetail": {
              "大小": "大",
              "等级": "一级"
            },
            "totalPrice": "120000.00",
            "productName": "越南大米"
          },
          {
            "id": 24,
            "status": 0,
            "containerNo": "11170609831902",
            "productId": 3,
            "price": "100.00",
            "quantity": "600.00",
            "productDetail": {
              "大小": "小",
              "等级": "二级"
            },
            "totalPrice": "60000.00",
            "productName": "越南大米"
          }
        ],
        "productName": "越南大米",
        "batchNumber": "11170609831902"
      }
    ],
    "logisticsId": 6,
    "supplier": {
      "address": "浙江省",
      "id": 1,
      "supplierContact": "1邱老板",
      "zipCode": "000000",
      "cellPhone": "13349976876",
      "cityName": "北京市",
      "phoneNum": "1872686382",
      "supplierName": "创意公司",
      "districtName": "东城区",
      "provinceName": "北京市",
      "countryName": "中国"
    }
  },
  "code": 200,
  "msg": "success"
}
```
```
订单状态列表
1.已暂存
2.审核中
3.审核通过，待提交
4.已提交
5.合同已签订
6.已付款
9.已发货
10.已通关，待结算
11.已结算，待收货
12.已收货
101.用户取消订单
102.平台取消订单
110.订单关闭

货柜状态列表
(1, "暂存"),
(2, "待审核"),
(3, "审核通过"),
(4, "已提交"),
(5, "待发货"),
(9, "已发货"),
(10, "待还款"),
(11, "待收货"),
(12, "已签收"),
(12, "平台处理"),
(101, "已取消");
```