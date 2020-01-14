import dynamic from 'dva/dynamic';
import { System } from '../routes/system';

import { Setting } from '../routes/setting';
import { QualityInspection } from '../routes/qualityInspection';
import { BasicSettings } from '../routes/basicSettings';
import { SettlementYB } from '../routes/settlementYB';
import { MonitoringReport } from "../routes/monitoringReport";
import { ChartList } from "../routes/chartList";

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`@/models/${m}`)),
  component,
});

const genRouter = (routes, app, isBlank) => {
  let router = [];
  let currentRoutes = null;
  if (isBlank === "drawer") {
    currentRoutes = routes.filter(item => item.path.split('/')[1] === 'drawer')
  } else {
    currentRoutes = isBlank
      ? routes.filter(item => item.path.split('/')[1] === 'handle')
      : routes.filter(item => item.path.split('/')[1] !== 'handle');
  }
  currentRoutes.map(item => {
    // const componentPath = `../${item.component}`;
    return router.push(
      {
        ...item,
        component: dynamicWrapper(
          app,
          [...item.models],
          item.component
        )
      }
    );
  })
  // console.log(router);

  return router;
}

export const getNavData = app => [
  {
    component: dynamicWrapper(app, [], () => import('@/layouts/BasicLayout')),
    layout: 'BasicLayout',
    path: '/',
    name: '工作台',
    key: 'homepage',
    children: [
      // {
      //   name: "注册",
      //   key: 'register',
      //   path: '/register',
      //   component: dynamicWrapper(app, [], () => import('@/pages/Register'))
      // },
      {
        name: "我的",
        key: 'app',
        path: '/app/myapp',
        component: dynamicWrapper(app, [], () => import('@/pages/Home'))
      },
      {
        name: "首页",
        key: 'home',
        path: '/home',
        component: dynamicWrapper(app, [], () => import('@/pages/Home'))
      },
      // 挂载各个模块路由
      ...genRouter(System, app),
      ...genRouter(Setting, app),
      ...genRouter(QualityInspection, app),
      ...genRouter(BasicSettings, app),
      ...genRouter(SettlementYB, app),
      ...genRouter(MonitoringReport, app),
      ...genRouter(ChartList, app)
    ]
  },
  {
    component: dynamicWrapper(app, [], () => import('@/layouts/FrameLayout')),
    layout: 'FrameLayout',
    path: '/',
    name: '工作台',
    key: 'homepage',
    children: [
      {
        name: "我的",
        key: 'app',
        path: '/app/myapp',
        component: dynamicWrapper(app, [], () => import('@/pages/Home'))
      },
      {
        name: "首页",
        key: 'home',
        path: '/home',
        component: dynamicWrapper(app, [], () => import('@/pages/Home'))
      },
      //挂载各个模块路由
      // ...genRouter(Setting, app),
    ]
  },
  {
    component: dynamicWrapper(app, [], () => import('@/layouts/BlankLayout')),
    layout: 'BlankLayout',
    path: '/handle',
    name: '工作台',
    key: 'handle',
    children: [
      // {
      //   name: "注册",
      //   key: 'register',
      //   parent: '/home',
      //   title: '注册',
      //   path: '/handle/registerApply/register',
      //   component: dynamicWrapper(app, [], () => import('@/pages/Register'))
      // },
      {
        name: "神的",
        key: 'shende',
        path: '/handle/myapp',
        component: dynamicWrapper(app, [], () => import('@/pages/Home'))
      },
      {
        name: '详情',
        title: "新建普耗申请单",
        key: 'detail',
        path: '/handle/detail',
        component: dynamicWrapper(app, [], () => import('@/pages/CommonDetail'))
      },
      {
        name: '示范页面详情',
        title: "示范页面",
        key: 'details',
        path: '/handle/details',
        component: dynamicWrapper(app, [], () => import('@/pages/CommonDetail/response'))
      },
      // 如果有详情页挂载各个模块路由
      ...genRouter(QualityInspection, app, true),
      ...genRouter(BasicSettings, app, true),
      ...genRouter(SettlementYB, app, true),
      ...genRouter(MonitoringReport, app, true)
    ]
  },
  {
    component: dynamicWrapper(app, [], () => import('@/layouts/DrawerLayout')),
    layout: 'DrawerLayout',
    path: '/drawer',
    name: '工作台',
    key: 'drawer',
    children: [
      // ...genRouter(QualityControl, app, "drawer"),
    ]
  }
]