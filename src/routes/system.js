/*
 * @Author: chengyafang 
 * @Date: 2019-11-25 09:41:13 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-26 16:31:07
 * @File 系统管理
 */

export const System = [
  {
    name: '用户管理',
    key: 'userMgt',
    path: '/system/userMgt',
    component: () => import('@/pages/System/UserMgt'),
    models: []
  },
  {
    name: '区域管理',
    key: 'areaMgt',
    path: '/system/areaMgt',
    component: () => import('@/pages/System/AreaMgt'),
    models: []
  },
  {
    name: '机构管理',
    key: 'orgMgt',
    path: '/system/orgMgt',
    component: () => import('@/pages/System/OrgMgt'),
    models: []
  },
  {
    name: '部门管理',
    key: 'deptMgt',
    path: '/system/deptMgt',
    component: () => import('@/pages/System/DeptMgt'),
    models: []
  }
];
