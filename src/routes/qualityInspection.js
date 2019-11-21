/**
 * @Author: chengyafang 
 * @Date: 2019-10-15 15:25:28 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-10-30 09:31:05
 * @file 数据审核 - 路由
 */
export const QualityInspection = [
  {
    name: '检查结果',
    key: 'testResult',
    path: '/qualityInspection/testResult',
    component: () => import('@/pages/QualityInspection/TestResult'),
    models: []
  },
  {
    name: '检查结果 - 查看',
    key: 'testResultShow',
    title: '检查结果 - 查看',
    path: '/handle/qualityInspection/testResult/commonShow',
    parent: '/qualityInspection/testResult',
    component: () => import('@/pages/QualityInspection/TestResult/commonShow'),
    models: []
  },
  {
    name: '错误分类统计',
    key: 'errorSortStatistics',
    path: '/qualityInspection/errorSortStatistics',
    component: () => import('@/pages/QualityInspection/ErrorSortStatistics'),
    models: []
  },
  {
    name: '日常错误量统计',
    key: 'dailyErrorStatistics',
    path: '/qualityInspection/dailyErrorStatistics',
    component: () => import('@/pages/QualityInspection/DailyErrorStatistics'),
    models: []
  }
]