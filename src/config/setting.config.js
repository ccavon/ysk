const defaultData = {
  title: '开发环境医院',
  type: 'dev'
}
export const settingConfig = () => Object.assign({}, defaultData ,process.env.CONFIG) ;