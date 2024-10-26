// mock.js
import Mock from 'mockjs';

// 模拟 /api/allProject 接口，返回模拟项目数据
Mock.mock('/api/allProjects?id=114514', 'get', {
  'data|10': [{ // 生成包含 10 个项目的数组
    'id|+1': 1,
    'title': '@ctitle(5, 10)', // 生成随机的中文标题
    'description': '@cparagraph', // 生成随机的中文段落描述
    'admin': '@cname', // 生成随机的中文姓名作为管理员
    'startTime': '@datetime', // 生成随机的开始时间
    'endTime': '@datetime',// 生成随机的结束时间
    'icon': '/src/assets/images/logo.jpg'
  }]
});

Mock.mock('/api/joinedProjects?id=114514', 'get', {
  'data|10': [{ // 生成包含 10 个项目的数组
    'id|+1': 1,
    'title': '@ctitle(5, 10)', // 生成随机的中文标题
    'description': '@cparagraph', // 生成随机的中文段落描述
    'admin': '@cname', // 生成随机的中文姓名作为管理员
    'startTime': '@datetime', // 生成随机的开始时间
    'endTime': '@datetime', // 生成随机的结束时间
    'icon': '/src/assets/images/logo.jpg'
  }]
});

Mock.mock('/api/managedProjects?id=114514', 'get', {
  'data|10': [{ // 生成包含 10 个项目的数组
    'id|+1': 1,
    'title': '@ctitle(5, 10)', // 生成随机的中文标题
    'description': '@cparagraph', // 生成随机的中文段落描述
    'admin': '@cname', // 生成随机的中文姓名作为管理员
    'startTime': '@datetime', // 生成随机的开始时间
    'endTime': '@datetime',// 生成随机的结束时间
    'icon': '/src/assets/images/logo.jpg'
  }]
});
Mock.mock('/api/getMembers', 'get', {
  // 'usersList|10': [{ // 生成包含 10 个项目的数组
  //   'id|+1': 10,
  //   'username': '@cname'
  // }]
  'data' : [
    {
      'id': 1,
      'username': 'aaa'
    },
    {
      'id': 2,
      'username': 'bbb'
    },
    {
      'id': 3,
      'username': 'ccc'
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
});

Mock.mock('/api/project?id=1', 'get', {
  'data': {
    'name': '@ctitle(5, 10)',
    'admin': 114514,
    'description': '@cparagraph',
    'startDate': '@date',
    'endDate': '@date',
    'member': [
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
});
export default Mock;