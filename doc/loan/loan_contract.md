<h1>资金服务电子合同<h1>
-------


----------

## 印章上传 ##
ajax url:/file/upload_seal_pic_ajax
请求 POST
```
{
    "file_name":"test.jpg", //...... binary data 
}
```  
响应
```
{
    "code":200, 
    "msg":"success",
    "data": {
        "url":"http://www.fruit.com/img/treqreqw.png", // 用于上传后前端复显
        "path":"kiyuoudkjl-5465467nbvm" // 阿里云path，随同其他数据提交后台
    }
}
```


----------
## 跳转获取额度页 ##
url:/loan/auth/quota/apply
请求 POST
响应
ftl: /loan_certificate

----------
## 开通安心签账户 并上传印章 ##
ajax url:/loan/auth/contract/account_open_ajax
请求 POST
```
{
    "sealPath":"kiyuoudkjl-5465467nbvm"// 阿里云path
}
```
响应
```
{
    "code":200, 
    "msg":"success",
    "data":null
}
```


----------
## 跳转到签订借款合同页 ##
url:/loan/auth/quota/apply
请求 POST
响应
ftl: /loan_signcontract
```
{
    "contractId":1,//合同Id
    "contractPath":"www.baidu.com" //合同地址
}
```


----------
## 签署合同发送短信验证码 ##
ajax url:/loan/auth/contract/captcha_send_ajax
**请求** POST

**响应**
```
{
    "code":200, 
    "msg":"success",
    "data":null
}
```


----------
## 客户签署借款合同 ##
ajax url:/loan/auth/contract/online_sign_ajax
**请求** POST
```
{
    "contractId":1,//合同Id
    "captchaCode":"234345"短信验证码
}
```
**响应** 
```
{
    "code":200, 
    "msg":"success",
    "data":null
}
```
错误码
```
112001	用户未完成银行授信
60030501	短信验证码不正确
```

