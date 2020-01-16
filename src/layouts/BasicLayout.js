import React, { PureComponent } from 'react';
import { Layout, Spin } from 'antd';
import { Exception } from 'ant-design-pro';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import { ContainerQuery } from 'react-container-query';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import pathToRegexp from 'path-to-regexp';
import memoizeOne from 'memoize-one';
import classNames from 'classnames';
import Header from './Header';
import Footer from './Footer';
import Context from './MenuContext';
import SiderMenu from '@/components/SiderMenu';
import SettingDrawer from '@/components/SettingDrawer';
import logoMini from '@/assets/logo.min.png';
import { formatMessage } from '@/utils';
import { query } from './_utils';

const { Content } = Layout;

function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.key}`;
      } else {
        locale = `menu.${item.key}`;
      }

      const result = {
        ...item,
        // name: formatMessage(locale),
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}
const memoizeOneFormatter = memoizeOne(formatter, isEqual);

class BasicLayout extends PureComponent {
  constructor(props) {
    super(props)
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  state = {
    isMobile: false,
    spinning: false,
    spinTips: formatMessage('app.tips.spin.setting.reading')
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps)
  //   nextProps.dispatch({
  //     type: 'global/checkAuthority'
  //   })
  //   return null;
  // }

  componentDidMount() {
    const { dispatch } = this.props;
    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false,
      });
    });
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
    dispatch({
      type: 'user/fetchCurrent'
    })
    dispatch({
      type: 'global/fetchMenu'
    })
    // setTimeout(()=> {
    //   this.setState({ spinTips: formatMessage('app.tips.spin.setting.loading') })
    //   dispatch({
    //     type: 'setting/changeSetting',
    //     payload: {
    //       primaryColor: '#2F54EB'
    //     },
    //     callback: () => this.setState({ spinning: false })
    //   });
    // }, 100);
  }

  getMenuData() {
    const routes = this.props.getRouteData('BasicLayout');
    return memoizeOneFormatter(routes);
  }

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    const { isMobile } = this.state;
    const { collapsed } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.renderRef);
    unenquireScreen(this.enquireHandler);
  }
  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }
  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };
  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };
  getPageTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);
    if (!currRouterData) {
      return '华信卫健';
    }
    const message = formatMessage(currRouterData.locale);
    return `${message} - 华信卫健`;
  };
  getLayoutStyle = () => {
    const { isMobile } = this.state;
    const { setting: { fixSiderbar, layout }, collapsed } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '200px',
      };
    }
    return null;
  };
  getContentStyle = () => {
    const { setting: { fixedHeader } } = this.props;
    return {
      marginTop: '0px',// 24px
      paddingLeft: '0px',//24px
      paddingRight: '0px',//24px
      paddingTop: fixedHeader ? 56 : 24, // 64 : 0
      background: '#fff' //'rgb(242, 243, 248)'//#fff
    };
  };
  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap,
    };
  }
  renderSettingDrawer() {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    // const { rendering } = this.state;
    // if ( rendering ) {
    //   return null;
    // }
    return <SettingDrawer />;
  }
  render() {
    const {
      getRouteData,
      menuData,
      // collapsed,
      setting, user: { currentUser },
      location: { pathname }
    } = this.props;
    const { isMobile, spinning, spinTips } = this.state;
    const isTop = setting.layout === 'topmenu';
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            // logo={setting.fixSiderbar ? logo : logoMini}
            // logo={!collapsed ? logo : logoMini}
            logo={logoMini}
            theme={setting.navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            // logo={logo}
            logo={logoMini}
            isMobile={isMobile}
            {...this.props}
          />
          <Content style={this.getContentStyle()}>
            <Switch>
              <Redirect from="/" to="/login" exact={true} />
              {
                getRouteData('BasicLayout').map(item =>
                  (
                    <Route
                      exact={item.exact}
                      key={item.path}
                      path={item.path}
                      component={item.component}
                    />
                  )
                )
              }
              <Route component={() => <Exception type="404" />} />
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <Spin tip={spinTips} spinning={spinning}>
            <ContainerQuery query={query}>
              {params => (
                <Context.Provider value={this.getContext()}>
                  <div className={classNames(params)}>{layout}</div>
                </Context.Provider>
              )}
            </ContainerQuery>
          </Spin>
        </DocumentTitle>
        {
          currentUser.vip && currentUser.vip > 3 ? this.renderSettingDrawer() : null
        }
      </React.Fragment>
    )
  }
}

export default connect(({ global, setting, user }) => ({
  collapsed: global.collapsed,
  menuData: global.menuData,
  user,
  setting,
}))(BasicLayout);