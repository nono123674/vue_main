### 获取“全部项目”项目列表

#### 请求

* 方法：GET
* URL：/api/allProjects
* 请求参数
  * id：当前登录用户的id

#### 响应

```json
{
    "data": [
        {
          "id": 123,
          "name": "项目标题",
          "description": "项目描述",
          "admin": "管理员姓名", #不需要管理员id，因为只需要显示管理员的名字
          "startTime": "2024-04-16T12:00:00.000Z",
          "endTime": "2024-04-20T12:00:00.000Z",
        },
        {
          "id": 1234,
          "name": "项目标题",
          "description": "项目描述",
          "admin": "管理员姓名", #不需要管理员id，因为只需要显示管理员的名字
          "startTime": "2024-04-16T12:00:00.000Z",
          "endTime": "2024-04-20T12:00:00.000Z",
        }
  ]
}
```

### 获取“我管理的”项目列表

#### 请求

* 方法：GET
* URL：/api/managedProjects
* 请求参数
  * id：当前登录用户的id

#### 响应

```json
{
    "data": [
        {
          "id": 123,
          "name": "项目标题",
          "description": "项目描述",
          "admin": "管理员姓名", #不需要管理员id，因为只需要显示管理员的名字
          "startTime": "2024-04-16T12:00:00.000Z",
          "endTime": "2024-04-20T12:00:00.000Z",
        },
        {
          "id": 1234,
          "name": "项目标题",
          "description": "项目描述",
          "admin": "管理员姓名", #不需要管理员id，因为只需要显示管理员的名字
          "startTime": "2024-04-16T12:00:00.000Z",
          "endTime": "2024-04-20T12:00:00.000Z",
        }
  ]
}
```

### 获取“我参与的”项目列表

#### 请求

* 方法：GET
* URL：/api/joinedProjects
* 请求参数
  * id：当前登录用户的id

#### 响应

```json
{
    "data": [
        {
          "id": 123,
          "name": "项目标题",
          "description": "项目描述",
          "admin": "管理员姓名", #不需要管理员id，因为只需要显示管理员的名字
          "startTime": "2024-04-16T12:00:00.000Z",
          "endTime": "2024-04-20T12:00:00.000Z",
        },
        {
          "id": 1234,
          "name": "项目标题",
          "description": "项目描述",
          "admin": "管理员姓名", #不需要管理员id，因为只需要显示管理员的名字
          "startTime": "2024-04-16T12:00:00.000Z",
          "endTime": "2024-04-20T12:00:00.000Z",
        }
  ]
}
```

### 创建项目

#### 请求

* 方法：POST
* URL：/api/createProject
* 请求参数

  示例

  ```json
  {
    "name": "项目1",
    "description": "项目1描述",
    "startTime": "datetime",
    "endTime": "datetime",
    "adminId": 114514, #项目管理员的id，是一个int
    "member": [
        {
            "id": 12344 #用户的id,
            "username": “项目要” #用户名
        },
        {
            "id": 12345 #用户的id,
            "username": “高风险” #用户名
        },
        {
            "id": 12346 #用户的id,
            "username": “在上海” #用户名
        }
    ]
  }
  ```

#### 响应

```json
{
  易佳已经实现了Fuck you和{
    	status, message
	}
}
```

### 获取所有用户列表

#### 请求

* 方法：GET
* URL：/api/getMembers
* 请求参数

  没有任何参数，直接把所有注册用户的列表返回给我（这样虽然很奇怪，但是由于我们没有实现成员的分组，只能这样做）

#### 响应

```json
{
    "data": [
        {
          "id": 114514,
          "username": “圆角”
        }，
        {
          "id": 11514,
          "username": “圆”
        }，
		{
          "id": 11454,
          "username": “角”
        }
  ]
}
```

### 修改项目

#### 请求

* 方法：POST
* URL：/api/editProject
* 请求参数

  ```json
  {
    "id": 666, #要修改项目的id
    "name": "项目1",
    "description": "项目1描述",
    "startTime": "datetime",
    "endTime": "datetime",
    "adminId": 114514, #项目管理员的id，是一个int
    "member": [
        {
            "id": 12344 #用户的id,
            "username": “项目要” #用户名
        },
        {
            "id": 12345 #用户的id,
            "username": “高风险” #用户名
        },
        {
            "id": 12346 #用户的id,
            "username": “在上海” #用户名
        }
    ]
  }
  ```

#### 响应

```json
和创建项目的响应一样
```

### 获取项目信息

#### 请求

* 方法：GET
* URL：/api/project
* 请求参数
  * id：要获取详情的项目id

#### 响应

```json
{
    "data": {
        "name": "项目标题",
        "description": "项目描述",
        "admin": "管理员姓名", #不需要管理员id，因为只需要显示管理员的名字
        "startDate": "2024-04-16T12:00:00.000Z",
        "endDate": "2024-04-20T12:00:00.000Z",
        "member": [
          {
            'id': 2,
            'username': 'bbb'
          },
          {
            'id': 4,
            'username': 'ddd'
          },
          {
            'id': 5,
            'username': 'eee'
          }
        ]
    }
}
```
