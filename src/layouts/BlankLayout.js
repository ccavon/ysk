import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Layout, Spin, Icon, message } from 'antd';
import { Route, Switch, Redirect } from 'dva/router';
import { Exception } from 'ant-design-pro';
import DocumentTitle from 'react-document-title';
import classNames from 'classnames';
import { formatMessage } from '@/utils';
import { query } from './_utils';
import { ContainerQuery } from 'react-container-query';
import memoizeOne from 'memoize-one';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import { userLocal } from '@/api/_local';
import { Breadcrumb } from 'antd';
const { Content } = Layout;


class BlankLayout extends PureComponent {
  constructor(props) {
    super(props)
    this.getPageTitle = memoizeOne(this.getPageTitle);
  }
  state = {
    title: '',//与业务相关的详情title
    spinning: false,
    isChangeTheme: true,
    spinTips: formatMessage('app.tips.spin.setting.reading')
  }
  // componentDidMount = () => {
  //   const { user: { currentUser: { userId } } } = this.props;
  //   if (!userId) {
  //     this.getUserInfo();
  //     if (!userLocal.includes(':85')) {
  //       this.changeTheme();
  //     }
  //   }
  // }

  getUserInfo = async () => {
    const { dispatch } = this.props;
    console.log('刷新获取用户后获取的信息', this.props)
    const data = await dispatch({
      type: 'user/currentInfo',
      payload: { save: true },
    });
    if (!data) {
      this.props.history.push({
        pathname: '/login',
        search: 'url=www.ganwumei.com'
      });
      dispatch({
        type: 'user/clearUser'
      });
      message.error('登录超时');
    }
    if (data && data.status !== 200) {
      this.props.history.push({
        pathname: '/login',
        search: 'url=www.ganwumei.com'
      });
      dispatch({
        type: 'user/clearUser'
      });
      message.error(data.msg);
    }
  }

  changeTheme = async () => {
    const { dispatch } = this.props;
    let themes = await dispatch({
      type: 'setting/selectThemSet'
    })
    if (themes && themes.status === 200 && themes.result) {
      await dispatch({
        type: 'setting/changeSetting',
        payload: { ...themes.result, showMessage: false }
      })
    } else {
      await dispatch({
        type: 'setting/changeTheme',
        payload: { isChangeTheme: false }
      })
    }
  }

  getPageTitle = pathname => {
    const currentItem = this.getCurrentItem(pathname);
    const name = (currentItem && currentItem.name) || '';
    return `华信卫健 - ${name}` || '华信卫健';
  }
  goBack = () => {
    this.props.history.go(-1);
  }
  toPage = (path) => {
    if (path) {
      this.props.history.push(path)
    } else {
      this.props.history.go(-1);
    }
  }

  getBreadcrumb = () => {

    let localPathArr = this.props.location.pathname.split('/');
    let { search } = this.props.location;
    //如果为详情页面
    if (localPathArr.indexOf('handle') !== -1) {
      var TopLink = '/' + localPathArr.slice(2, 4).join('/');
      var middleLink = localPathArr.slice(0, 5).join('/');
      var current = localPathArr.join('/') + search
    }
    if (TopLink === '/registerApply/register' && middleLink === '/handle/registerApply/register') {
      TopLink = '/home';
    }
    let historyArr = [TopLink, middleLink, current];
    if (localPathArr.length < 6) {
      historyArr = [TopLink, middleLink + search];
    }
    let ret = historyArr.map((item, index) => {
      let name = this.getCurrentItem(item) ? this.getCurrentItem(item).name : '首页';
      let Doms = null;
      switch (index) {
        case historyArr.length - 1:
          Doms = (
            <span >{name}</span>
          )
          break;
        default:
          Doms = (
            <span className='page-back'
              onClick={() => this.toPage(item)}>
              {name}
            </span>
          )
          break;
      }
      return (
        <Breadcrumb.Item key={index}>
          {Doms}
        </Breadcrumb.Item>
      )
    })
    return ret
  }

  getCurrentItem = (otherPath) => {
    const localPathArr = otherPath && otherPath.split('/');
    const localPathArrLength = localPathArr.length;
    const isHandle = localPathArr.indexOf('handle') !== -1;
    const hasSearch = localPathArr[localPathArrLength - 1].indexOf('?') !== -1;
    // 获取主列表页面路由
    const RouterKey = isHandle ? 'BlankLayout' : 'BasicLayout';
    const Routers = this.props.getRouteData(RouterKey);
    //匹配当前路径路由相关参数
    const current = Routers.filter((item) => {
      let path = item.path;
      let pathArr = path.split('/');
      // 长度不符合的内容直接掠过
      if (localPathArrLength !== pathArr.length) { return false }
      // 详情页面 当前path有id ，则替换localPathArr最后一个:id的参数 而且 最后一个数据不带search参数
      if (path.indexOf('/:id') !== -1 && isHandle && !hasSearch) {
        localPathArr[localPathArrLength - 1] = ':id';
      }
      //详情页带有search传参
      if (hasSearch) {
        localPathArr[localPathArrLength - 1] = localPathArr[localPathArrLength - 1].split('?')[0];
      }
      //三级页面的时候存在:params参数 - localPathArr替换为与path一致的:params的值
      if (localPathArrLength > 5 && pathArr[4] === ':params') {
        localPathArr[4] = ':params'
      }
      return (item.path === otherPath) || localPathArr.join('/') === path
    })[0];
    return current
  }

  render() {
    // const { getRouteData, location, user: { currentUser }, setting: { isChangeTheme, contentWidth, fixedDetailHeader } } = this.props;
    const { getRouteData, location, setting: { contentWidth, fixedDetailHeader } } = this.props;
    const Routers = getRouteData('BlankLayout');
    const CurrentItem = this.getCurrentItem(this.props.location.pathname);
    const { spinning, spinTips, title } = this.state;
    const layout = (
      //style={{ padding: '0 32px'}}
      <Content className={`detailLayout ${fixedDetailHeader ? 'fixedDetailHeader' : 'unFixedDetailHeader'}`}>
        <PageHeaderWrapper detailClassName={`detail-header-wrapper`}>
          <div className='pageHeadercontent'>
            <Breadcrumb className={`page-breadCrumb`}>
              {this.getBreadcrumb()}
            </Breadcrumb>
            <div className='pageTitle'>{title || CurrentItem.title}</div>
            <div className='pageHeadercontent-close' onClick={() => this.toPage(CurrentItem.parent)}> <Icon type="close" /> </div>
          </div>
        </PageHeaderWrapper>
        <div className={classNames(
          contentWidth === 'Fluid' ? 'ysynet-content-content' : 'ysynet-content-fixedContent'
        )}>
          <Switch>
            <Redirect from="/" to="/login" exact={true} />
            {
              Routers.map(item =>
                (
                  <Route
                    exact={item.exact}
                    key={item.path}
                    path={item.path}
                    render={props => <item.component {...props} setTitle={(title) => this.setState({ title })} />
                    }
                  />
                )
              )
            }
            <Route component={() => <Exception type="404" />} />
          </Switch>
        </div>

      </Content>
    )
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(location.pathname)}>
          {/* {
            currentUser && currentUser.id && !isChangeTheme
              ?
              <Spin tip={spinTips} spinning={spinning}>
                <ContainerQuery query={query}>
                  {params => (
                    <div className={classNames(params)}>{layout}</div>
                  )}
                </ContainerQuery>
              </Spin>
              : <div className='loading-wrapper'><Icon type="sync" spin /> loading... </div>
          } */}
          <Spin tip={spinTips} spinning={spinning}>
            <ContainerQuery query={query}>
              {params => (
                <div className={classNames(params)}>{layout}</div>
              )}
            </ContainerQuery>
          </Spin>
        </DocumentTitle>
      </React.Fragment>
    )
  }
}
export default connect(({ setting, user }) => ({
  user,
  setting,
}))(BlankLayout);