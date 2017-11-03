# 注册与登陆


## 注册——页面初始信息

/member/register

创意科技用户服务协议：
```
href : "${user_agreement_url}"

```




## 注册——检测手机号

ajax url:/member/check_mobile_ajax

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
    
    
## 注册——用户注册(基本信息)

ajax url:/member/register_account_ajax

请求

```
    POST
    {
        mobile:"13612345678",
        password:"***",
        mobileCaptcha:"123456",
        qq:"4315431431",
        email:"4315431431@qq.com"
    }
```

结果

```
    {
        code:200,
        msg:"success",
        data:{url:"//www.fruit.com/member/register_enterprise"}
    }
``` 


## 登录——页面初始信息

url:/member/login

 忘记密码：
```
href : "${forget_pwd_url}"

```

免费注册：
```
href : "${register_url}"

```
    
## 登陆——用户登陆

ajax url:/member/login_ajax

请求

```
    POST
    {
        mobile:"13612345678", // 用户账户，用户注册时的手机号
        password:"***",
        auto_login:0 //下次是否自动登录,0否，1是
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


    