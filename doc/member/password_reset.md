# 找回密码与重置密码



## 找回密码——检测手机号是否注册

ajax url:/member/is_mobile_registered_ajax

请求

```
    POST
    {
        mobile:"13612345678"
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

## 找回密码——检测手机验证码
(找回密码页面-【下一步】使用)
ajax url:/member/password/check_mobile_captcha_ajax

请求

```
    POST
    {
        mobile: "13612345678",
        mobileCaptcha: "456789"
    }
```

结果

```
    {
        code:200,
        msg:"success",
        data:{
            certificate:"11111111" // 用户凭证，请在修改密码时带回,
            reset_url: "http://www.fruit.com/member/password/reset?certificate=this_is_the_certificate" // 重置密码页
        }
    }
```
    
    
## 重置密码——重置用户密码

ajax url:/member/password/reset_password_ajax

请求

```
    POST
    {
        certificate："11111111",//验证码验证成功返回修改密码凭证
        password:"***"
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


    