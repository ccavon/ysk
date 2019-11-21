const path = require('path');
const webpack = require('webpack');
const vendor = ['react', 'react-dom', 'dva', 'lodash'];
const { npm_config_argv } = process.env;
const isDevelopment = npm_config_argv.includes('start'); //是否生产环境
const filename = isDevelopment ? 'development' : 'production';
if (isDevelopment) {
  vendor.push('antd');
}
module.exports = {
  entry: {
    vendor: vendor
  },
  output: {
    path: path.join(__dirname, 'public/lib'),
    filename: `react.${filename}.min.js,react-dom.${filename}.min.[name].dll.js`,
    library: '[name]_library'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '.', 'src'),
    }
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'public', `[name]-manifest.${filename}.json`),
      name: '[name]_library'
    })
  ]
};