const settingData = {
  "协和": {
    title: '武汉市协和医院',
    ip: '192.168.0.1',
    port: 8081
  },
  "同济": {
    title: '武汉市同济医院',
    ip: '192.168.0.2',
    port: 8082
  },
  "口腔": {
    title: '武汉市口腔医院',
    ip: '192.168.0.3',
    port: 8083
  },
  "精细化": {
    port: 85
  },
  default: {
    title: '开发环境医院'
  }
};
module.exports = buildConfig = key => key ? Object.assign({}, settingData.default, settingData[key]) : settingData.default