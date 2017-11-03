## 会员认证——页面预埋信息
/member/enterprise/auth/show

页面初始信息：
```
href : "${mobile}"
href : "${identity}"
href : "${email}"
href : "${qq}"
href : "${type_id}"
href : "${type_name}"
href : "${enterprise_name}"
href : "${credential}"
href : "${phone_num}"
href : "${identity_front}"
href : "${identity_back}"
href : "${licence}"
href : "${attachment_one}"
href : "${attachment_two}"
href : "${name}"
href : "${country_id}"
href : "${country_name}"
href : "${province_id}"
href : "${province_name}"
href : "${city_id}"
href : "${city_name}"
href : "${district_id}"
href : "${district_name}"
href : "${address}"
href : "${status}"
href : "${reject_note}"
```

```
    // 以下type
    __DATA = {
          "callback_url": "//www.fruit.com/member/enterprise/auth/show",
          "types": [
            {
              "value": "个人",
              "id": 1,
              "selected": 0
            },
            {
              "value": "企业",
              "id": 2,
              "selected": 0
            }
          ]
    }    
```



## 会员认证——提交认证（个人认证）

ajax url:/member/enterprise/auth/personal_auth_ajax

请求

```
    POST
    {
        name:"姓名",
        identity:"42028119990101",//身份证号
        countryId:1,
        provinceId:1,
        cityId:1,
        districtId:1,
        address:"中国温州江南皮革厂",
        phoneNum:"15888888888",//联系电话，可能为座机
        identityFront:"",//身份证正面地址
        identityBack:"",//身份证反面地址
        attachmentOne:"ayayyayya11111",//附件1地址
        attachmentTwo:"wwewwwwwww"//附件2地址
    }
```

结果

```
    {
        code:200,
        msg:"success",
        data:
    }
```

## 会员认证——检查企业名称是否已存在(企业认证)
注意：前台企业名称失去焦点，调用此接口检查
ajax url:/member/enterprise/auth/is_enter_name_available_ajax

请求

```
    POST
    {
        enterpriseName:"企业名称"
    }
```

结果

```
    {
        code:200,
        msg:"success",
        data:
    }
```

## 会员认证——提交认证（企业认证）

ajax url:/member/enterprise/auth/enterprise_auth_ajax

请求

```
    POST
    {
        enterpriseName:"企业名称",//企业名称
        credential:"42028119990101",//证件号
        countryId:1,
        provinceId:1,
        cityId:1,
        districtId:1,
        address:"中国温州江南皮革厂",
        phoneNum:"15888888888",//联系电话，可能为座机
        legalPerson:"法人姓名",//法人姓名
        identity:"42028119990101",//法人身份证号
        identityFront:"",//法人身份证正面地址
        identityBack:"",//法人身份证反面地址
        licence:"ayayyayya11111"//营业执照 或 社会信用代码证
    }
```

结果

```
    {
        code:200,
        msg:"success",
        data:
    }
```

## 会员认证——查询会员认证信息(个人与企业通用)

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


## 会员认证——查询认证结果

ajax url:/member/enterprise/auth/enterprise_auth_status_ajax

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
            enterpriseVerifyStatus:4,//企业认证状态，1.已认证  2.未认证  3.认证审核中  4.认证未通过
            rejectNote:"审核被驳回的原因"//审核被驳回的原因
        }
    }
```

