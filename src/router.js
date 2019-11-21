import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LoginPage from '@/pages/Login';
// import RegisterPage from '@/pages/Register';
import SubSystemPage from '@/pages/SubSystem';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import { getNavData } from '@/config/router.config';
import { getPlainNode } from '@/utils';
import themes from '@/config/themes.config';
/* eslint-disable */

dynamic.setDefaultLoadingComponent(() => (
  <div className='loding-wapper'>
    <Spin size="large" />
  </div>
))

function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}



const routeConfig = ({ history, app }) => {
  let navData = getNavData(app);
  const BasicLayout = getLayout(navData, 'BasicLayout').component;
  const BlankLayout = getLayout(navData, 'BlankLayout').component;
  const passProps = {
    app,
    navData,
    setting: themes,
    getRouteData: (path) => {
      return getRouteData(navData, path);
    },
  };
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/handle/registerApply/register" component={RegisterPage}/> */}
          {/* <Route path="/register" component={RegisterPage} /> */}
          <Route path="/subSystem" component={SubSystemPage} />
          <Route path="/handle" render={props => <BlankLayout {...props} {...passProps} />} />
          <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
        </Switch>
      </Router>
    </LocaleProvider>
  )
}

export default routeConfig;