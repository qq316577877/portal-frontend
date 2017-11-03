# 我的资金服务

## 我的资金服务列表
ajax url:/loan/info/list



## 查询资金服务的年利率和月利率
ajax  url: /loan/info/get_loan_info_interest_rate_ajax
请求
```
{
}
```
结果
```
{
  "data": {
    "yearInterestRate": 0.1,//年利率
    "monthInterestRate": 0.0084//月利率
  },
  "code": 200,
  "msg": "success"
}
```


## 我的资金服务-查询我的资金服务列表--服务记录列表所需状态list
ajax url:/loan/info/get_loan_info_status_service_list_ajax

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
            statusList:[{
                            "id":6,//状态
                            "value":"待还款",//状态说明
                        },
                        {
                            "id":1,//状态
                            "value":"已还款",//状态说明
                        }
                    ]
        }
    }
```

## 我的资金服务-订单页创建资金服务
ajax url:/loan/info/create_loan_info_ajax

请求
```
    POST
    {
    mobile:"18301334989",//手机号
    mobileCaptcha:"111111",//验证码
    loanInfos:[{
                            "orderNo":"11111",//订单号
                            "transactionNo":"uuuuuuuuuuuuuuu",//货柜编号
                            "productId":1,//商品Id
                            "availableLoan":300000.00,//可贷款金额
                            "appliyLoan":300000.00,//申请贷款金额
                            "ServiceFee":"812583972110001"//服务费
                        },
                        {
                           "orderNo":"11111",//订单号
                            "transactionNo":"uuuuuuuuuuuuuuu",//货柜编号
                            "productId":1,//商品Id
                            "availableLoan":300000.00,//可贷款金额
                            "appliyLoan":300000.00,//申请贷款金额
                            "ServiceFee":"812583972110001"//服务费
                        }
                    ]
    }
```
结果
```
    {
        code:200,
        msg:"success",
        data:{
        }
    }
```


## 我的资金服务-通过货柜号list查询资金服务list
ajax url:/loan/info/loadLoanInfosByTransactionNoList

请求
```
    POST
    {
        transactionNoList:['uuuuuuuuuuuuuuu','uuuuuuuuuuuuuuu']
    }
```
结果
```
    {
        code:200,
        msg:"success",
        data:{
            loanInfos:[{
                            "id":1,//表id,信息唯一标识
                            "userId":3,//用户ID
                            "name":"李四",//申请贷款人姓名
                            "orderNo":"11111",//订单号
                            "transactionNo":"uuuuuuuuuuuuuuu",//货柜流水号
                            "containerNo":"uuuuuuuuuuuuuuu",//货柜编号
                            "containerStatus":1,//货柜状态
                            "containerStatusDesc":"已发货",
                            "productId":1,//商品Id
                            "serviceFee": "400.00",
                            "prodictName": "濑尿虾",
                            "availableLoan":300000.00,//可贷款金额
                            "appliyLoan":300000.00,//申请贷款金额
                            "confirmLoan":300000.00,//平台审核贷款金额
                            "offerLoan":300000.00,//实际放款金额
                            "dbtNo":"11111",//借据号
                            "dbtExpDt":"0001-01-01 00:00:00",//借据到期日
                            "offerTime":"0001-01-01 00:00:00",//放款时间--起息日
                            "expiresTime":"0001-01-01 00:00:00",//到期强制还款时间
                            "repaymentAmount":300030.00,//还款金额--实还总额
                            "repaymentTime":"0001-01-01 00:00:00",//还款时间
                            "status":1,//0.已删除，1.已还款，2.待审核，3.待放款，4.审核不通过，5.已放款，6.待还款，7.还款失败，200.保证金还款成功，300.保证金还款失败
                            "statusDesc":"已还款",
                            "bankCard":"812583972110001"//银行卡号
                            "addTime":"0001-01-01 00:00:00",//创建时间
                            "updateTime":"0001-01-01 00:00:00",//更新时间
                        },
                        {
                            "id":2,//表id,信息唯一标识
                            "userId":3,//用户ID
                            "name":"李四",//申请贷款人姓名
                            "orderNo":"11111",//订单号
                            "transactionNo":"uuuuuuuuuuuuuuu",//货柜流水号
                            "containerNo":"uuuuuuuuuuuuuuu",//货柜编号
                             "containerStatus":1,//货柜状态
                            "containerStatusDesc":"已发货",
                            "productId":1,//商品Id
                            "serviceFee": "400.00",
                             "prodictName": "濑尿虾",
                            "availableLoan":300000.00,//可贷款金额
                            "appliyLoan":300000.00,//申请贷款金额
                            "confirmLoan":300000.00,//平台审核贷款金额
                            "offerLoan":300000.00,//实际放款金额
                            "dbtNo":"11111",//借据号
                            "dbtExpDt":"0001-01-01 00:00:00",//借据到期日
                            "offerTime":"0001-01-01 00:00:00",//放款时间
                            "expiresTime":"0001-01-01 00:00:00",//到期强制还款时间
                            "repaymentAmount":300030.00,//还款金额--实还总额
                            "repaymentTime":"0001-01-01 00:00:00",//还款时间
                            "status":1,//0.已删除，1.已还款，2.待审核，3.待放款，4.审核不通过，5.已放款，6.待还款，7.还款失败，200.保证金还款成功，300.保证金还款失败
                            "statusDesc":"已还款",
                            "bankCard":"812583972110001"//银行卡号
                            "addTime":"0001-01-01 00:00:00",//创建时间
                            "updateTime":"0001-01-01 00:00:00",//更新时间
                        }
                    ]
        }
    }
```

## 我的资金服务-查询我的资金服务列表---服务记录列表
ajax url:/loan/info/get_loan_info_list_service_ajax

请求
```
    POST
    {
        pageIndex:1,//页码
        pageSize:10,//每页展示数
        status:1,//已放款
        keyword:"cy20170508001"//搜索框内容
    }
```
结果
```
    {
        code:200,
        msg:"success",
        data:{
            pageSize:10
            total:15,//总记录数
            loanInfos:[{
                            "id":1,//表id,信息唯一标识
                            "userId":3,//用户ID
                            "orderNo":"11111",//订单号
                            "transactionNo":"uuuuuuuuuuuuuuu",//货柜流水号
                            "containerNo":"uuuuuuuuuuuuuuu",//货柜编号
                            "containerStatus":1,//货柜状态
                            "containerStatusDesc":"已发货",
                            "productId":1,//商品Id
                            "availableLoan":300000.00,//可贷款金额
                            "appliyLoan":300000.00,//申请贷款金额
                            "confirmLoan":300000.00,//平台审核贷款金额
                            "offerLoan":300000.00,//实际放款金额
                            "dbtNo":"11111",//借据号
                            "dbtExpDt":"0001-01-01 00:00:00",//借据到期日
                            "offerTime":"0001-01-01 00:00:00",//放款时间--起息日
                            "expiresTime":"0001-01-01 00:00:00",//到期强制还款时间
                            "repaymentAmount":300030.00,//还款金额--实还总额
                            "repaymentTime":"0001-01-01 00:00:00",//还款时间
                            "status":1,//0.已删除，1.已还款，2.待审核，3.待放款，4.审核不通过，5.已放款，6.待还款，7.还款失败，200.保证金还款成功，300.保证金还款失败
                            "statusDesc":"已还款",
                            "bankCard":"812583972110001"//银行卡号
                            "addTime":"0001-01-01 00:00:00",//创建时间
                            "updateTime":"0001-01-01 00:00:00",//更新时间
                        },
                        {
                            "id":2,//表id,信息唯一标识
                            "userId":3,//用户ID
                            "orderNo":"11111",//订单号
                            "transactionNo":"uuuuuuuuuuuuuuu",//货柜流水号
                            "containerNo":"uuuuuuuuuuuuuuu",//货柜编号
                             "containerStatus":1,//货柜状态
                            "containerStatusDesc":"已发货",
                            "productId":1,//商品Id
                            "availableLoan":300000.00,//可贷款金额
                            "appliyLoan":300000.00,//申请贷款金额
                            "confirmLoan":300000.00,//平台审核贷款金额
                            "offerLoan":300000.00,//实际放款金额
                            "dbtNo":"11111",//借据号
                            "dbtExpDt":"0001-01-01 00:00:00",//借据到期日
                            "offerTime":"0001-01-01 00:00:00",//放款时间
                            "expiresTime":"0001-01-01 00:00:00",//到期强制还款时间
                            "repaymentAmount":300030.00,//还款金额--实还总额
                            "repaymentTime":"0001-01-01 00:00:00",//还款时间
                            "status":1,//0.已删除，1.已还款，2.待审核，3.待放款，4.审核不通过，5.已放款，6.待还款，7.还款失败，200.保证金还款成功，300.保证金还款失败
                            "statusDesc":"已还款",
                            "bankCard":"812583972110001"//银行卡号
                            "addTime":"0001-01-01 00:00:00",//创建时间
                            "updateTime":"0001-01-01 00:00:00",//更新时间
                        }
                    ]
        }
    }
```


## 我的资金服务-查询我的资金服务列表--申请列表所需状态list
ajax url:/loan/info/get_loan_info_status_apply_list_ajax

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
            statusList:[{
                            "id":6,//状态
                            "value":"待还款",//状态说明
                        },
                        {
                            "id":1,//状态
                            "value":"已还款",//状态说明
                        }
                    ]
        }
    }
```



## 我的资金服务-查询我的资金服务列表---申请列表
ajax url:/loan/info/get_loan_info_list_apply_ajax

请求
```
    POST
    {
        pageIndex:1,//页码
        pageSize:10,//每页展示数
        status:1,//已放款
        keyword:"cy20170508001"//搜索框内容
    }
```
结果
```
    {
        code:200,
        msg:"success",
        data:{
            pageSize:10
            total:15,//总记录数
            loanInfos:[{
                            "id":1,//表id,信息唯一标识
                            "userId":3,//用户ID
                            "orderNo":"11111",//订单号
                            "transactionNo":"uuuuuuuuuuuuuuu",//货柜流水号
                            "containerNo":"uuuuuuuuuuuuuuu",//货柜编号
                             "containerStatus":1,//货柜状态
                            "containerStatusDesc":"已发货",
                            "productId":1,//商品Id
                            "availableLoan":300000.00,//可贷款金额
                            "appliyLoan":300000.00,//申请贷款金额
                            "confirmLoan":300000.00,//平台审核贷款金额
                            "offerLoan":300000.00,//实际放款金额
                            "dbtNo":"11111",//借据号
                            "dbtExpDt":"0001-01-01 00:00:00",//借据到期日
                            "offerTime":"0001-01-01 00:00:00",//放款时间--起息日
                            "expiresTime":"0001-01-01 00:00:00",//到期强制还款时间
                            "repaymentAmount":300030.00,//还款金额--实还总额
                            "repaymentTime":"0001-01-01 00:00:00",//还款时间
                            "status":1,//0.已删除，1.已还款，2.待审核，3.待放款，4.审核不通过，5.已放款，6.待还款，7.还款失败，200.保证金还款成功，300.保证金还款失败
                            "statusDesc":"已还款",
                            "serviceFee":"10.00"//服务费
                            "bankCard":"812583972110001"//银行卡号
                            "addTime":"0001-01-01 00:00:00",//创建时间
                            "updateTime":"0001-01-01 00:00:00",//更新时间
                        },
                        {
                            "id":2,//表id,信息唯一标识
                            "userId":3,//用户ID
                            "orderNo":"11111",//订单号
                            "transactionNo":"uuuuuuuuuuuuuuu",//货柜流水号
                            "containerNo":"uuuuuuuuuuuuuuu",//货柜编号
                             "containerStatus":1,//货柜状态
                            "containerStatusDesc":"已发货",
                            "productId":1,//商品Id
                            "availableLoan":300000.00,//可贷款金额
                            "appliyLoan":300000.00,//申请贷款金额
                            "confirmLoan":300000.00,//平台审核贷款金额
                            "offerLoan":300000.00,//实际放款金额
                            "dbtNo":"11111",//借据号
                            "dbtExpDt":"0001-01-01 00:00:00",//借据到期日
                            "offerTime":"0001-01-01 00:00:00",//放款时间
                            "expiresTime":"0001-01-01 00:00:00",//到期强制还款时间
                            "repaymentAmount":300030.00,//还款金额--实还总额
                            "repaymentTime":"0001-01-01 00:00:00",//还款时间
                            "status":1,//0.已删除，1.已还款，2.待审核，3.待放款，4.审核不通过，5.已放款，6.待还款，7.还款失败，200.保证金还款成功，300.保证金还款失败
                            "statusDesc":"已还款",
                            "serviceFee":"10.00"//服务费
                            "bankCard":"812583972110001"//银行卡号
                            "addTime":"0001-01-01 00:00:00",//创建时间
                            "updateTime":"0001-01-01 00:00:00",//更新时间
                        }
                    ]
        }
    }
```


## 我的资金服务-查询我的资金服务--详情
ajax url:/loan/info/get_loan_info_details_ajax

请求
```
    POST
    {
        id:1//表id
    }
```
结果
```
    {
        code:200,
        msg:"success",
        data:{

            "id":1,//表id,信息唯一标识
            "userId":3,//用户ID
            "orderNo":"11111",//订单号
            "orderStatus":1,//订单状态
            "orderDesc":"已发货",
            "transactionNo":"uuuuuuuuuuuuuuu",//货柜流水号
            "containerNo":"uuuuuuuuuuuuuuu",//货柜编号
             "containerStatus":1,//货柜状态
            "containerStatusDesc":"已发货",
            "deliveryTime":"0001-01-01 00:00:00",//发货时间
            "preReceiveTime":"0001-01-01 00:00:00",//预计到货时间
            "productId":1,//商品Id
            "availableLoan":300000.00,//可贷款金额
            "appliyLoan":300000.00,//申请贷款金额
            "confirmLoan":300000.00,//平台审核贷款金额
            "offerLoan":300000.00,//实际放款金额
            "dbtNo":"11111",//借据号
            "dbtExpDt":"0001-01-01 00:00:00",//借据到期日
            "offerTime":"0001-01-01 00:00:00",//放款时间--起息日
            "payMethod":"到期还款付息",//还款方式
            "performanceRate":"10%",//执行利率
            "expiresTime":"0001-01-01 00:00:00",//到期强制还款时间
            "repaymentAmount":300030.00,//还款金额--实还总额
            "repaymentInterest":"30.00",//还款利息（实还总额-实际放款金额）
            "repaymentTime":"0001-01-01 00:00:00",//还款时间
            "status":1,//0.已删除，1.已还款，2.待审核，3.待放款，4.审核不通过，5.已放款，6.待还款，7.还款失败，200.保证金还款成功，300.保证金还款失败
            "statusDesc":"已还款",
            "bankCard":"812583972110001"//银行卡号
            "addTime":"0001-01-01 00:00:00",//创建时间
            "updateTime":"0001-01-01 00:00:00",//更新时间

        }
    }
```

## 订单详情中资金服务查询接口,通过货柜流水号查询
ajax  url: /loan/info/loadLoanInfosByTransactionNo
请求
```
{
    "transactionNo":"23432423"
}
```
结果
```
{
  "data": {
    "loanInfo": {
      "id": 2,
      "status": 5,
      "transactionStatus": 0,
      "addTime": -62135798400000,
      "userId": 0,
      "name":"李四",//贷款申请人姓名
      "offerLoan": "6546.00",
      "offerTime": -62135798400000,
      "expiresTime": -62135798400000,
      "availableLoan": "654321.00",
      "serviceFee": "400.00",
      "prodictName": "濑尿虾",
      "repaymentAmount": "50000.00",
      "repaymentTime": -62135798400000,
      "transactionNo": "465465",
      "confirmLoan": "4654.00",
      "appliyLoan": "258.00",
      "updateTime": 1497740691000,
      "orderStatus": 0,
      "statusDesc": "已放款",
      "orderNo": "123",
      "dbtExpDt": -62135798400000,
      "dbtNo": "4654",
      "productId": 0,
      "transactionStatusDesc": null,
      "orderStatusDesc": null
    }
  },
  "code": 200,
  "msg": "success"
}
```
