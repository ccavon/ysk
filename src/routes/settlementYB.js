/**
 * @Author: chengyafang 
 * @Date: 2019-10-28 09:28:38 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-01 09:52:50
 * @file 实时数据采集
 */

export const SettlementYB = [
  {
    name: '医保结算清单',
    key: 'settlementYB',
    path: '/settlementYB/jsList',
    component: () => import('@/pages/SettlementYB/JSList'),
    models: []
  },
  {
    name: '医保结算清单 - 详情',
    key: 'jsDetails',
    title: '医保结算清单 - 详情',
    path: '/handle/settlementYB/jsList/details',
    parent: '/settlementYB/jsList',
    component: () => import('@/pages/SettlementYB/JSList/details'),
    models: []
  },
  {
    name: '编码记录',
    key: 'codeRecord',
    path: '/settlementYB/codeRecord',
    component: () => import('@/pages/SettlementYB/CodeRecord'),
    models: []
  },
  {
    name: '上报文件',
    key: 'reportFile',
    path: '/settlementYB/reportFile',
    component: () => import('@/pages/SettlementYB/ReportFile'),
    models: []
  }
]
