# 文件上传(图片等资源)


## 私有文件上传

ajax url:/file/upload_private_ajax

请求

```
    POST
    {
        file_name:"test.jpg",
       //...... binary data 
    }
```

结果

```
    {
        code:200, 
        msg:"success",
        data: {
            url:"http://www.fruit.com/img/treqreqw.png", // 用于上传后前端复显
            path:"kiyuoudkjl-5465467nbvm" // 阿里云path，随同其他数据提交后台
        }
    }
``` 


## 公共文件上传

ajax url:/file/upload_public_ajax

请求

```
    POST
    {
        file_name:"test.jpg",
       //...... binary data 
    }
```

结果

```
    {
        code:200, 
        msg:"success",
        data: {
            url:"http://www.fruit.com/img/fdafda.png", // 用于上传后前端复显
            path:"reytergdfdh-5465467gfsgfs" // 阿里云path，随同其他数据提交后台
        }
    }
``` 