import Mock from 'mockjs';

export default {
  '/user/list': Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
  }),
  '/user/query': {
    username: 'vania',
    // name: '拖鞋酱',
    name: 'admin管理员',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    notifyCount: 88,
    vip: 8,
    cuurentSystem: '同济医院器材科',
    subSystem: [],
    id: 1
  }
}