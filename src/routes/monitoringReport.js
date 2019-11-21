/**
 * @Author: chengyafang 
 * @Date: 2019-11-06 15:56:08 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-12 14:43:29
 * @file 监测报告 routes
 */
export const MonitoringReport = [
  {
    name: '质量分析',
    key: 'qualityAnalysis',
    path: '/monitoringReport/qualityAnalysis',
    component: () => import('@/pages/MonitoringReport/QualityAnalysis'),
    models: []
  },
  {
    name: '常见重点疾病分类',
    key: 'keyDisease',
    path: '/monitoringReport/keyDisease',
    component: () => import('@/pages/MonitoringReport/KeyDisease'),
    models: []
  },
]