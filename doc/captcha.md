# 验证码


## 获取图形验证码

ajax url:/captcha/pic_generate_ajax

请求

```
    POST
    {
        type:"1", // 1.注册; 2.修改密码; 3.修改手机
    }
```    

结果

```
    {
        code:200,
        msg:"success",
        data: {
            captcha:"http://www.fruit.com/img/test.png", // 图形验证码链接
            id:123 // 图形验证码唯一ID
        }
    }
```    

    
## 校验图形验证码

ajax url:/captcha/pic_verify_ajax

请求

```
    POST
    {
        id:123, // 图形验证码唯一ID
        captcha:"asdf"
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

    
## 发送短信验证码

ajax url:/captcha/send_sms_ajax

请求

``` 
    POST
    {
        mobile:"13612345678",
        captcha:"asdf", // 图形验证码
        id:123, // 图形验证码唯一ID
        type:1 // 1.注册; 2.修改密码; 3.修改手机,4.实名认证
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



## 发送短信验证码(无需图形验证码，用户登录态可用)

ajax url:/captcha/send_sms_direct_ajax

请求

``` 
    POST
    {
        mobile:"13612345678",
        type:3 // 1.注册; 2.修改密码; 3.修改手机,4.实名认证
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

## 发送短信验证码(无需图形验证码，用户登录态可用)
目前仅用于用户确认贷款申请

ajax url:/captcha/send_loan_sms_direct_ajax

请求

``` 
    POST
    {
        mobile:"13612345678",//银行预留手机号
        type:5 // 5确认贷款申请
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