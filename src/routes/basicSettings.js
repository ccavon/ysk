/**
 * @Author: chengyafang 
 * @Date: 2019-10-15 15:25:28 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-01 09:52:30
 * @file 基础设置 - 路由
 */
export const BasicSettings = [
  {
    name: '住院病案首页',
    key: 'hospitalizationCaseHome',
    path: '/basicSettings/hospitalizationCaseHome',
    component: () => import('@/pages/BasicSettings/HospitalizationCaseHome'),
    models: []
  },
  {
    name: '医疗机构',
    key: 'medicalInstitutions',
    path: '/basicSettings/medicalInstitutions',
    component: () => import('@/pages/BasicSettings/MedicalInstitutions'),
    models: []
  },
  {
    name: '检测批次',
    key: 'testBatch',
    path: '/basicSettings/testBatch',
    component: () => import('@/pages/BasicSettings/TestBatch'),
    models: []
  },
  {
    name: '检查设置',
    key: 'checkSettings',
    path: '/basicSettings/checkSettings',
    component: () => import('@/pages/BasicSettings/CheckSettings'),
    models: []
  },
  {
    name: '验证规则',
    key: 'verificationRule',
    path: '/basicSettings/verificationRule',
    component: () => import('@/pages/BasicSettings/VerificationRule'),
    models: []
  }
]