
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less-modules');
const webpack = require('webpack');
const path = require('path');
const buildConfig = require('./build-config');
const filename = process.env.NODE_ENV;
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
// 传入参数 source-map, 生产环境是否生产source-map
if (process.env.NODE_ENV === 'production' && 
    !process.argv.includes('source-map')) {
  process.env.GENERATE_SOURCEMAP = 'false';
}
module.exports = {
  webpack: (config, env) => {
    // antd 按需加载
    config = injectBabelPlugin(
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'], // change importing css to less
      config,
    );
    // antd-pro 按需加载
    config = injectBabelPlugin(
      ['import', { libraryName: "ant-design-pro", libraryDirectory: "lib", style: true, camel2DashComponentName: false}, "antd-pro"],
      config,
    );
    config.optimization = {
      splitChunks: {
          cacheGroups: {
            common: {  // 抽离自己写的公共代码
              chunks: "all",
              name: "common", // 打包后的文件名，任意命名
              minChunks: 5,//最小引用2次
              minSize: 0 // 只要超出0字节就生成一个新包
            },
            vendor: {   // 抽离第三方插件
              test: /node_modules/,   // 指定是node_modules下的第三方包
              chunks: 'initial',
              name: 'vendor',  // 打包后的文件名，任意命名
              // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
              priority: 10
            },
          }
      }
    };

    //打包抽取React, ReactDOM
    // config.externals = {
    //   'react': 'React',
    //   'react-dom': 'ReactDOM',
    // }

    // 使用别名
    config.resolve.alias = {
      '@': resolve('src')
    };

    config = rewireLess.withLoaderOptions({
      modifyVars: { "@form-item-margin-bottom": "15px" },
      javascriptEnabled: true,
    })(config, env);

    try {
      config.plugins.push(
        new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require(`./public/vendor-manifest.${filename}.json`)
        })
      );
      config.plugins.push(
        new HtmlWebpackIncludeAssetsPlugin({
          assets: [`lib/react.${filename}.min.js,react-dom.${filename}.min.vendor.dll.js`],
          append: false
        })
      );
    } catch (error) {
      console.log(error);
    }
    // 使用自定义 eslint 
    config.module.rules[1].use[0].options.useEslintrc = true;
    const { NODE_ENV, npm_config_argv } = process.env;
    // 传入参数 辨别是否使用MOCK数据
    if (NODE_ENV === 'development') {
      const isMock = JSON.parse(npm_config_argv).cooked.includes('mock') ? true : false;
      config.plugins[3].definitions['process.env'] = {
        ...config.plugins[3].definitions['process.env'],
        MOCK: isMock,
        CONFIG: JSON.stringify(buildConfig())
      }
      for (let i = 0; i < config.module.rules[2].oneOf.length; i++) {
        const e = config.module.rules[2].oneOf[i];
        if (e.test && (e.test.toString() === '/\\.css$/')) {
          e.use[1].options.sourceMap = true;
        };
      }
    }
    // 传入参数 判断打包配置文件
    if (NODE_ENV === 'production') {
      process.argv.map((item, index) => {
        if (index > 1 && item !== 'source-map') {
          config.plugins[4].definitions['process.env'] = {
            ...config.plugins[4].definitions['process.env'],
            CONFIG: JSON.stringify(buildConfig(item))
          }
        }
      })
    }
    return config;
  },

  jest: jestConfig => {
    jestConfig.moduleNameMapper['@'] = resolve('src');
    jestConfig.transform["^.+\\.js$"] = resolve('node_modules/babel-jest');
    return jestConfig;
  },
  devServer: (configFunction) => {
    const myProxy = {
      "/api": {
        "target": "http://localhost:7001",
        "changeOrigin": true
      }
    }
    return (proxy, host) => 
    {
      // Use the environment variable if it exists, else default to the package.json proxy value
      const config = configFunction(myProxy, host);
      return config;
    }
  }
}
