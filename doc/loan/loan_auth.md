# 我的资金服务




## 查询会员认证信息(个人与企业通用)

ajax url:/member/enterprise/auth/get_user_auth_information_ajax

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
            enterpriseName:"企业名称",//企业名称
            email:"111@qq.com",//邮箱
            qq:"2222222"//qq,
            enterpriseVerifyStatus:"1",//认证状态 1.已认证  2.未认证  3.认证审核中  4.认证未通过
            enterpriseVerifyStatusDesc:"已认证",
            type:2,//企业类型 1.个人  2.企业
            typeDesc:"企业",
            credential:"42028119990101",//证件号
            countryId:1,
            provinceId:1,
            cityId:1,
            districtId:1,
            countryName:"中国",
            provinceName:"浙江省",
            cityName:"温州市",
            districtName:"XX区",
            address:"中国温州江南皮革厂",
            phoneNum:"15888888888",//联系电话，可能为座机
            name:"法人姓名",//法人姓名
            identity:"42028119990101",//法人身份证号
            identityFront:"",//法人身份证正面地址
            identityFrontUrl:"",//法人身份证正面地址
            identityBack:"",//法人身份证反面地址
            identityBackUrl:"",//法人身份证反面地址
            licence:"ayayyayya11111",//营业执照 或 社会信用代码证
            licenceUrl:"ayayyayya11111",//营业执照 或 社会信用代码证
            attachmentOne:"ayayyayya11111",//附件1地址
            attachmentOneUrl:"ayayyayya11111",//附件1地址
            attachmentTwo:"wwewwwwwww",//附件2地址
            attachmentTwoUrl:"wwewwwwwww",//附件2地址
            memberIdentification:1//新老客户标识：1.老客户 2新客户

        }
    }
```

## 我的资金服务-查询用户的实名认证信息
没有经过实名认证，data为{}

ajax url:/loan/auth/get_loan_user_auth_information_ajax

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
            userId:13,//用户ID
            username:"张三",//贷款人姓名
            identity:"420281198805102411",//身份证号
            mobile:"18301334988"//贷款人银行预留手机号码,
            bankId:1,//开卡银行
            bankName:"工商银行",//银行类型名称
            bankCard:"6220202011121886",//银行卡号
            status:1,//状态，0.已删除，1.已通过，2.未通过
            statusDesc:"已通过",
            rejectNote:"认证不通过的原因",//认证不通过的原因
            addTime:"0001-01-01 00:00:00",//记录时间
            updateTime:"0001-01-01 00:00:00"//更新时间
        }
    }
```



## 我的资金服务-实名认证

ajax url:/loan/auth/add_loan_user_auth_information_ajax

请求
```
    POST
    {
        username:"张三",//贷款人姓名
        identity:"420281198805102411",//身份证号
        mobile:"18301334988"//贷款人银行预留手机号码,
        captcha"111111";//短信验证码
        bankId:1,//开卡银行
        bankCard:"6220202011121886",//银行卡号
    }
```
结果
```
    {
        code:200,
        msg:"success",
        data:{
            url:"xxx"//成功跳转地址
            info:{userId:13,//用户ID
                username:"张三",//贷款人姓名
                identity:"420281198805102411",//身份证号
                mobile:"18301334988"//贷款人银行预留手机号码,
                bankId:1,//开卡银行
                bankName:"工商银行",//银行类型名称
                bankCard:"6220202011121886",//银行卡号
                status:1,//状态，0.已删除，1.已通过，2.未通过
                statusDesc:"已通过",
                rejectNote:"认证不通过的原因",//认证不通过的原因
                addTime:"0001-01-01 00:00:00",//记录时间
                updateTime:"0001-01-01 00:00:00"//更新时间
            }
        }
    }
```



## 我的资金服务-查询用户的信贷信息
包括用户的授信状态、授信额度和余额

ajax url:/loan/auth/get_loan_user_credit_information_ajax

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
            userId:13,//用户ID
            username:"张三",//贷款人姓名
            mobile:"18301334988"//贷款人银行预留手机号码,
            creditLine:1000000.00,//授信额度，合同总额
            balance:900000.00,//可贷余额--合同余额
            type:1,//类型，1.个人授信，2.企业授信
            typeDesc:"个人授信",
            status:1,//状态,0.已删除，1.已授信，2.申请中，3.被驳回，4.已冻结，5.已授信（未激活）
            statusDesc:"已授信",
            ctrNo:"xxxxxxx",//合同号
            crCstNo:"xxxxx",//信贷客户代号
            rejectNote:"审核被驳回的原因",//审核被驳回的原因
            description:"描述描述描述",//描述
            expireTime:"0001-01-01 00:00:00"//授信过期时间，合同到期日
            addTime:"0001-01-01 00:00:00"//记录时间
            updateTime:"0001-01-01 00:00:00"//更新时间
        }
    }
```


## 我的资金服务-申请贷款--婚姻状况list
ajax url:/loan/auth/get_loan_credit_maritalStatus_list_ajax

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
                            "id":1,//状态
                            "value":"未婚",//状态说明
                        },
                        {
                            "id":2,//状态
                            "value":"已婚",//状态说明
                        },
                        {
                            "id":3,//状态
                            "value":"离异",//状态说明
                        }
                    ]
        }
    }
```



## 我的资金服务-申请贷款--个人

ajax url:/loan/auth/add_loan_user_credit_personal_ajax

请求
```
    POST
    {
            username:"张三",//申请人姓名
            identity:"420281198805102411",//身份证号
            mobile:"18301334988",//贷款人银行预留手机号码
            maritalStatus:2,//婚姻状态，1.未婚，2.已婚，3.离异
            partnerName:"小花",//配偶姓名
            partnerIdentity:"420281198805102421",//配偶身份证号
            countryId:1,
            provinceId:1,
            cityId:1,
            districtId:1,
            address:"中国温州江南皮革厂",
    }
```
结果
```
    {
        code:200,
        msg:"success",
        data:{
            url:"xxxx",//成功跳转页面
            info{
                userId:13,//用户ID
                type:1,//类型，1.个人授信，2.企业授信
                typeDesc:"个人授信",
                username:"张三",//申请人姓名
                identity:"420281198805102411",//身份证号
                mobile:"18301334988",//贷款人银行预留手机号码
                maritalStatus:2,//婚姻状态，1.未婚，2.已婚，3.离异
                PartnerName:"小花",//配偶姓名
                PartnerIdentity:"420281198805102421",//配偶身份证号
                countryId:1,
                provinceId:1,
                cityId:1,
                districtId:1,
                countryName:"中国",
                provinceName:"浙江省",
                cityName:"温州市",
                districtName:"XX区",
                address:"中国温州江南皮革厂",
                status:1,//状态,0.已删除，1.已通过，2.未通过
                statusDesc:"已通过",
                rejectNote:"审核被驳回的原因",//审核被驳回的原因
                addTime:"0001-01-01 00:00:00"//记录时间
                updateTime:"0001-01-01 00:00:00"//更新时间
            }
        }
    }
```


## 我的资金服务-申请贷款--企业

ajax url:/loan/auth/add_loan_user_credit_enterprise_ajax

请求
```
    POST
    {
            type:2,//类型，1.个人授信，2.企业授信
            enterpriseName:"张三公司",//企业名称
            credential:"111111"//证件号,
            username:"张三",//申请人姓名
            identity:"420281198805102411",//身份证号
            mobile:"18301334988",//贷款人银行预留手机号码
            maritalStatus:2,//婚姻状态，1.未婚，2.已婚，3.离异
            partnerName:"小花",//配偶姓名
            partnerIdentity:"420281198805102421",//配偶身份证号
            countryId:1,
            provinceId:1,
            cityId:1,
            districtId:1,
            address:"中国温州江南皮革厂",
    }
```
结果
```
    {
        code:200,
        msg:"success",
        data:{
            url:"xxxx",//成功跳转页面
            info:{
                userId:13,//用户ID
                type:1,//类型，1.个人授信，2.企业授信
                typeDesc:"个人授信",
                enterpriseName:"张三公司",//企业名称
                credential:"111111"//证件号,
                username:"张三",//申请人姓名
                identity:"420281198805102411",//身份证号
                mobile:"18301334988",//贷款人银行预留手机号码
                maritalStatus:2,//婚姻状态，1.未婚，2.已婚，3.离异
                PartnerName:"小花",//配偶姓名
                PartnerIdentity:"420281198805102421",//配偶身份证号
                countryId:1,
                provinceId:1,
                cityId:1,
                districtId:1,
                countryName:"中国",
                provinceName:"浙江省",
                cityName:"温州市",
                districtName:"XX区",
                address:"中国温州江南皮革厂",
                status:1,//状态,0.已删除，1.已通过，2.未通过
                statusDesc:"已通过",
                rejectNote:"审核被驳回的原因",//审核被驳回的原因
                addTime:"0001-01-01 00:00:00"//记录时间
                updateTime:"0001-01-01 00:00:00"//更新时间
            }
            
        }
    }
```


## 我的资金服务-查询用户的申请贷款信息
ajax url:/loan/auth/get_loan_user_apply_credit_information_ajax

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
            userId:13,//用户ID
            type:1,//类型，1.个人授信，2.企业授信
            typeDesc:"个人授信",
            enterpriseName:"张三公司",//企业名称
            credential:"111111"//证件号,
            username:"张三",//申请人姓名
            identity:"420281198805102411",//身份证号
            mobile:"18301334988",//贷款人银行预留手机号码
            maritalStatus:2,//婚姻状态，1.未婚，2.已婚，3.离异
            PartnerName:"小花",//配偶姓名
            PartnerIdentity:"420281198805102421",//配偶身份证号
            countryId:1,
            provinceId:1,
            cityId:1,
            districtId:1,
            countryName:"中国",
            provinceName:"浙江省",
            cityName:"温州市",
            districtName:"XX区",
            address:"中国温州江南皮革厂",
            status:1,//状态,0.已删除，1.已通过，2.未通过
            statusDesc:"已通过",
            rejectNote:"审核被驳回的原因",//审核被驳回的原因
            addTime:"0001-01-01 00:00:00"//记录时间
            updateTime:"0001-01-01 00:00:00"//更新时间
        }
    }
```