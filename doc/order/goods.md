# 查询所有商品信息
/order/find_all_goods

无请求参数

返回结果

```
{
    "data": {
        "1": {
            "name": "越南火龙果",
            "id": 1,
            "status": 1,
            "unit": "箱",
            "enName": "Dragon Fruit",
            "capacitySize": 1400,
            "productDetails": [
                {
                    "name": "等级",
                    "values": [
                        {
                            "value": "一级",
                            "id": 3,
                            "level": 1,
                            "status": 1,
                            "addTime": 1495592781000,
                            "updateTime": 1495592783000,
                            "productPropertyId": 1
                        },
                        {
                            "value": "二级",
                            "id": 4,
                            "level": 2,
                            "status": 1,
                            "addTime": 1495592784000,
                            "updateTime": 1495592786000,
                            "productPropertyId": 1
                        },
                        {
                            "value": "三级",
                            "id": 5,
                            "level": 3,
                            "status": 1,
                            "addTime": 1495592788000,
                            "updateTime": 1495592790000,
                            "productPropertyId": 1
                        }
                    ]
                },
                {
                    "name": "品种",
                    "values": [
                        {
                            "value": "红心",
                            "id": 1,
                            "level": 1,
                            "status": 1,
                            "addTime": 1495592688000,
                            "updateTime": 1495592691000,
                            "productPropertyId": 2
                        },
                        {
                            "value": "白心",
                            "id": 2,
                            "level": 2,
                            "status": 1,
                            "addTime": 1495592707000,
                            "updateTime": 1495592709000,
                            "productPropertyId": 2
                        }
                    ]
                },
                {
                    "name": "大小",
                    "values": [
                        {
                            "value": "大",
                            "id": 6,
                            "level": 1,
                            "status": 1,
                            "addTime": 1495592837000,
                            "updateTime": 1495592839000,
                            "productPropertyId": 3
                        },
                        {
                            "value": "中",
                            "id": 7,
                            "level": 2,
                            "status": 1,
                            "addTime": 1495592841000,
                            "updateTime": 1495592843000,
                            "productPropertyId": 3
                        },
                        {
                            "value": "小",
                            "id": 8,
                            "level": 3,
                            "status": 1,
                            "addTime": 1495592845000,
                            "updateTime": 1495592847000,
                            "productPropertyId": 3
                        }
                    ]
                }
            ]
        },
        "2": {
            "name": "越南香蕉",
            "id": 2,
            "status": 1,
            "unit": "箱",
            "enName": "Banana",
            "capacitySize": 1200,
            "productDetails": [
                {
                    "name": "等级",
                    "values": [
                        {
                            "value": "一级",
                            "id": 9,
                            "level": 1,
                            "status": 1,
                            "addTime": 1495592915000,
                            "updateTime": 1495592923000,
                            "productPropertyId": 4
                        },
                        {
                            "value": "二级",
                            "id": 10,
                            "level": 2,
                            "status": 1,
                            "addTime": 1495592917000,
                            "updateTime": 1495592926000,
                            "productPropertyId": 4
                        },
                        {
                            "value": "三级",
                            "id": 11,
                            "level": 3,
                            "status": 1,
                            "addTime": 1495592919000,
                            "updateTime": 1495592928000,
                            "productPropertyId": 4
                        }
                    ]
                },
                {
                    "name": "品种",
                    "values": [
                        {
                            "value": "红心",
                            "id": 12,
                            "level": 1,
                            "status": 1,
                            "addTime": 1495592921000,
                            "updateTime": 1495592930000,
                            "productPropertyId": 5
                        },
                        {
                            "value": "白心",
                            "id": 13,
                            "level": 2,
                            "status": 1,
                            "addTime": 1495592934000,
                            "updateTime": 1495592938000,
                            "productPropertyId": 5
                        }
                    ]
                },
                {
                    "name": "大小",
                    "values": [
                        {
                            "value": "大",
                            "id": 14,
                            "level": 1,
                            "status": 1,
                            "addTime": 1495592936000,
                            "updateTime": 1495592947000,
                            "productPropertyId": 6
                        },
                        {
                            "value": "中",
                            "id": 15,
                            "level": 2,
                            "status": 1,
                            "addTime": 1495592949000,
                            "updateTime": 1495593067000,
                            "productPropertyId": 6
                        },
                        {
                            "value": "小",
                            "id": 16,
                            "level": 3,
                            "status": 1,
                            "addTime": 1495593063000,
                            "updateTime": 1495593065000,
                            "productPropertyId": 6
                        }
                    ]
                }
            ]
        }
    },
    "code": 200,
    "msg": "success"
}
```

# 根据商品ID查询商品信息

/order/find_good_byId_ajax  
```
{
    "id": 1
}
```

返回结果
```
{
  "data": {
    "name": "越南火龙果",
    "id": 1,
    "status": 1,
    "unit": "箱",
    "enName": "Dragon Fruit",
    "capacitySize": 1400,
    "productDetails": [
      {
        "name": "等级",
        "values": [
          {
            "value": "一级",
            "id": 3,
            "level": 1,
            "status": 1,
            "addTime": 1495592781000,
            "updateTime": 1495592783000,
            "productPropertyId": 1
          },
          {
            "value": "二级",
            "id": 4,
            "level": 2,
            "status": 1,
            "addTime": 1495592784000,
            "updateTime": 1495592786000,
            "productPropertyId": 1
          },
          {
            "value": "三级",
            "id": 5,
            "level": 3,
            "status": 1,
            "addTime": 1495592788000,
            "updateTime": 1495592790000,
            "productPropertyId": 1
          }
        ]
      },
      {
        "name": "品种",
        "values": [
          {
            "value": "红心",
            "id": 1,
            "level": 1,
            "status": 1,
            "addTime": 1495592688000,
            "updateTime": 1495592691000,
            "productPropertyId": 2
          },
          {
            "value": "白心",
            "id": 2,
            "level": 2,
            "status": 1,
            "addTime": 1495592707000,
            "updateTime": 1495592709000,
            "productPropertyId": 2
          }
        ]
      },
      {
        "name": "大小",
        "values": [
          {
            "value": "大",
            "id": 6,
            "level": 1,
            "status": 1,
            "addTime": 1495592837000,
            "updateTime": 1495592839000,
            "productPropertyId": 3
          },
          {
            "value": "中",
            "id": 7,
            "level": 2,
            "status": 1,
            "addTime": 1495592841000,
            "updateTime": 1495592843000,
            "productPropertyId": 3
          },
          {
            "value": "小",
            "id": 8,
            "level": 3,
            "status": 1,
            "addTime": 1495592845000,
            "updateTime": 1495592847000,
            "productPropertyId": 3
          }
        ]
      }
    ]
  },
  "code": 200,
  "msg": "success"
}
```

