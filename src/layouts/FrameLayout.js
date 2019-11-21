import React, { PureComponent } from 'react';
import { Layout, Spin, Icon, message, Menu } from 'antd';
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
import logo from '@/assets/logo.min.jpg';
import logoMini from '@/assets/logo.min.jpg';
import { formatMessage } from '@/utils';
import { query } from './_utils';
// import { userLocal } from '@/api/_local';

const { Content } = Layout;
const { SubMenu } = Menu;

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

class FrameLayout extends PureComponent {
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
    spinTips: formatMessage('app.tips.spin.setting.reading'),
  }


  componentDidMount() {
    // const { dispatch } = this.props;
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
    // 刷新获取当前用户信息
    if (!this.props.user.currentUser.userId) {
      console.log('刷新获取用户')
      this.genUserInfo();
      // if (!userLocal.includes(':85')) {
      //   this.changeTheme();
      // }
    }
  }

  genUserInfo = () => {
    const { dispatch } = this.props;
    console.log('刷新获取用户后获取的信息', this.props)
    dispatch({
      type: 'user/currentInfo',
      payload: { save: true },
    })
      .then((data) => {
        if (data.status !== 200) {
          this.props.history.push({
            pathname: '/login',
            search: 'url=www.ganwumei.com'
          });
          dispatch({
            type: 'user/clearUser'
          });
          return message.error(data.msg);
        }
        const { menuList, platformSystemId } = data.result;
        const { sysMenus } = menuList;
        // 存储菜单
        dispatch({
          type: 'global/saveMenu',
          payload: sysMenus || []
        });
        //存储当前选中的子系统ID
        dispatch({
          type: 'global/saveMenuKey',
          payload: platformSystemId
        });
      });
  }
  changeTheme = async () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'setting/changeTheme',
      payload: { isChangeTheme: true }
    });
    let themes = await dispatch({
      type: 'setting/selectThemSet'
    })
    if (themes && themes.status === 200 && themes.result) {
      dispatch({
        type: 'setting/changeSetting',
        payload: { ...themes.result, showMessage: false }
      });
    } else {
      dispatch({
        type: 'setting/changeTheme',
        payload: { isChangeTheme: false }
      });
    }
  }

  getMenuData() {
    const routes = this.props.getRouteData('FrameLayout');
    return memoizeOneFormatter(routes);
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

  onClickMenuItem = item => {
    if (item.key === '/userCenter/setting') {
      this.props.history.push(window.sessionStorage.getItem('historyPath'));
    } else if (item.key === this.props.location.pathname) {
      return;
    } else {
      this.props.history.push(item.key);
    };
  }

  onTitleClick = item => {
    this.props.history.push(item.key);
  }

  render() {
    const { getRouteData, setting, collapsed, user: { currentUser }, location: { pathname }, menuData } = this.props;
    const { isMobile, spinning, spinTips } = this.state;
    const isTop = setting.layout === 'topmenu';
    const { navTheme } = setting;
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            {...this.props}
            logo={!collapsed ? logo : logoMini}
            menuData={menuData}
            onCollapse={this.handleMenuCollapse}
            isMobile={isMobile}
          >
            <div className='menu-inline'>
              <Menu
                selectedKeys={[pathname]}
                mode="inline"
                onClick={this.onClickMenuItem}
                theme={navTheme}
                openKeys={['/userCenter/setting']}
                style={{ padding: '16px 0', width: '100%', overflowX: 'hidden' }}
              >
                <Menu.Item key="/userCenter/setting"><Icon type="double-left" /><span>返回目录</span></Menu.Item>
                <SubMenu
                  key="/userCenter/setting/basicInfo"
                  onTitleClick={this.onTitleClick}
                  title={
                    <span>
                      <Icon type='user' />
                      <span>账号资料</span>
                    </span>
                  }
                />
                <SubMenu
                  key="/userCenter/setting/pwdMgt"
                  onTitleClick={this.onTitleClick}
                  title={
                    <span>
                      <Icon type='setting' />
                      <span>密码管理</span>
                    </span>
                  }
                />
              </Menu>
            </div>
          </SiderMenu>
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            {...this.props}
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
          />
          <Content style={this.getContentStyle()}>
            <Switch>
              <Redirect from="/" to="/login" exact={true} />
              {
                getRouteData('FrameLayout').map(item =>
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
          {
            currentUser && currentUser.orgId
              ? <Spin tip={spinTips} spinning={spinning}>
                <ContainerQuery query={query}>
                  {params => (
                    <Context.Provider value={this.getContext()}>
                      <div className={classNames(params)}>{layout}</div>
                    </Context.Provider>
                  )}
                </ContainerQuery>
              </Spin>
              : <div className='loading-wrapper'><Icon type="sync" spin /> loading... </div>
          }
        </DocumentTitle>
      </React.Fragment>
    )
  }
}

export default connect(({ global, setting, user }) => ({
  collapsed: global.collapsed,
  menuData: global.menuData,
  currentMenuKey: user.currentUser.platformSystemId,
  user,
  setting,
}))(FrameLayout);