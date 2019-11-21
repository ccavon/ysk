# 框架React，数据管理、路由等使用Dva，UI框架antd，函数库使用 lodash 。

## 代码编辑器推荐使用[VSCode](https://code.visualstudio.com/)，文档使用[Markdown](https://www.appinn.com/markdown/)格式，Git管理工具推荐使用[Sourcetree](https://www.sourcetreeapp.com/)。

### 相关框架、UI组件版本及API地址

- react 16.6 [官方文档](https://reactjs.org/docs/getting-started.html)
- dva 2.4
[官方文档](https://dvajs.com/)
- webpack 4
[官方文档](https://webpack.github.io/)
- lodash[官方文档](https://www.lodashjs.com/)
- antd 3.10.2
[在线演示及文档](https://ant.design/index-cn)
- antd-design-pro 2.1
[在线演示及文档](https://pro.ant.design/index-cn)
- es6 [阮一峰](http://es6.ruanyifeng.com/)

### 使用命令

> 安装：yarn install / npm install
> 启动：yarn mock / yarn start

- [x] yarn mock 为本地 mock

- [x] yarn start 为proxy server

> yarn rewrite

- [x] 使用 yarn install 时，会使得之前修改依赖包的地方重置。使用其进行覆盖。

### tips: 提示修饰器错误, 进入/node_modules/babel-preset-react-app/creact.js中 plugins处 插入

``` javascript
[require("@babel/plugin-proposal-decorators").default, { legacy: true }]
```

#### 打包命令

命令 | 说明 | 是否必填

---|---|---
yarn build | 默认 | 是
yarn build source-map| js和css是否生成map文件 | 否
yarn build settingName| 根据配置文件build-config，生成所需打包的配置 | 否
yarn build source-map settingName | 兼备上述两个功能 | 否

---

##### 文件目录简介

> build (打包后生成目录)
> node_modules (依赖库)
> public (静态文件)
> src (核心目录)
>> api (api)
>> assets (待处理静态文件)
>> components （相关组件）
>> config (路由，主题，配置读取)
>> layouts （布局）  
>> locale （国际化配置） 
>> mock （Mock数据编写）
>> models （数据层）
>> pages （处理业务代码路由）
>> services （前后端交互接口服务）
>> utils （公用方法）
>> app.less(全局样式入口)，index.js(系统入口)，router.js(路由配置) 
> .gitignore  控制git提交范围
> build-config.js 打包时读取配置文件
> config-overrides.js 修改webpack服务文件
> jsconfig.js 修改编辑器 js 识别
---
FAQ

- [git地址:git@118.31.21.110/git/ysynet/cloud.git](git@118.31.21.110/git/ysynet/cloud.git)
- 修改打包 publicPath，在package.json中修改homepage
- dva test报错。猜测是由于babel7.0 和 dva 2.4不兼容导致。
- 待续