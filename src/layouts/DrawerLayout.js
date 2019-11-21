import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Drawer } from 'antd';
import DocumentTitle from 'react-document-title';
import classNames from 'classnames';
import { formatMessage } from '@/utils';
import { query } from './_utils';
import { ContainerQuery } from 'react-container-query';

class DrawerLayout extends PureComponent {
  
  state = {
    title: '',//与业务相关的详情title
    spinning: false,
    isChangeTheme:true,
    spinTips: formatMessage('app.tips.spin.setting.reading')
  }
  
  getPathComponent = (pathname) => {
    const { getRouteData } = this.props;
    let current = getRouteData('DrawerLayout').filter(item=>{
      let routerList = item.path.split('/');
      let routerName = "/"+routerList.slice(1,routerList.length-1).join("/");
      return pathname.indexOf(routerName) !== -1
    })
    if (current && current[0]){
      let item = current[0]; 
      return <item.component {...this.props} />;
    }else{
      return <span>404</span>
    }
  }
  
  render() {
    const { history:{ location :{ pathname } } } = this.props;
    const layouts = this.getPathComponent(pathname);
    return (
      <React.Fragment>
        <DocumentTitle title="drawer">
            <ContainerQuery query={query}>
              {params => (
                <Drawer width={720} visible={true} className={classNames(params)}>{
                  layouts}</Drawer>
              )}
            </ContainerQuery>
        </DocumentTitle>
      </React.Fragment>
    )
  }
}
export default connect(({ setting, user }) => ({
  user,
  setting,
}))(DrawerLayout);