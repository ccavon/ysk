export default {
  '/global/menu': [
    // {
    //   path: '/app', name: '主页', icon: 'home', children: [
    //     { path: '/app/myapp', name: '我的' },
    //   ]
    // },
    // {
    //   path: '/setting', name: '设置', icon: 'setting', children: [
    //     { path: '/setting/basicInfo', name: '基本资料' },
    //     { path: '/setting/pwdMgt', name: '密码管理' },
    //   ]
    // },
    {
      path: '/system', name: '系统管理', icon: 'setting', children: [
        {
          path: '/system/userMgt', name: '用户管理'
        },
        {
          path: '/system/areaMgt', name: '区域管理'
        },
        {
          path: '/system/orgMgt', name: '机构管理'
        },
        {
          path: '/system/deptMgt', name: '部门管理'
        },
        {
          path: '/system/roleMgt', name: '角色管理'
        }
      ]
    },
    {
      path: '/monitoringReport', name: '监测报告', icon: 'file-done', children: [
        {
          path: '/monitoringReport/qualityAnalysis', name: '质量分析'
        },
        {
          path: '/monitoringReport/keyDisease', name: '常见重点疾病分类'
        }
      ]
    },
    {
      path: '/settlementYB', name: '实时数据采集', icon: 'account-book', children: [
        {
          path: '/settlementYB/jsList', name: '医保结算清单'
        },
        {
          path: '/settlementYB/codeRecord', name: '编码记录'
        },
        {
          path: '/settlementYB/reportFile', name: '上报文件'
        }
      ]
    },
    {
      path: '/qualityInspection', name: '数据审核', icon: 'issues-close', children: [
        {
          path: '/qualityInspection/testResult', name: '检查结果'
        },
        {
          path: '/qualityInspection/errorSortStatistics', name: '错误分类统计'
        },
        {
          path: '/qualityInspection/dailyErrorStatistics', name: '日常错误量统计'
        }
      ]
    },
    {
      path: '/basicSettings', name: '基础设置', icon: 'disconnect', children: [
        {
          path: '/basicSettings/hospitalizationCaseHome', name: '住院病案首页'
        },
        {
          path: '/basicSettings/medicalInstitutions', name: '医疗机构'
        },
        {
          path: '/basicSettings/testBatch', name: '检测批次'
        },
        {
          path: '/basicSettings/checkSettings', name: '检查设置'
        },
        {
          path: '/basicSettings/verificationRule', name: '验证规则'
        }
      ]
    }
  ],
  '/global/menuData': [
    {
      path: '/setting', name: '设置', icon: 'setting', children: [
        { path: '/setting/basicInfo', name: '基本资料' },
        { path: '/setting/pwdMgt', name: '密码管理' },
      ]
    },
  ]
}