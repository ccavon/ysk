import React from 'react';
import { Drawer, PageHeader } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import './index.less';


/**
 * 
      <DrawerWrapper 
        visible={visible}
        onClose={onClose}
        title={(<h3>单号：234231029431</h3>)}
        extra={[
          <Button key="1" type="primary"> Primary </Button>,
          <Button key="2">Operation</Button>,
        ]}
        extraComponent={
          (<Row>
            <Col span={8}>创建人:曲丽丽</Col>
            <Col span={8}>创建时间：2017-01-10</Col>
            <Col span={8}>创建人:曲丽丽</Col>
            <Col span={8}>创建时间：2017-01-10</Col>
          </Row>)
        }
        extraContent={
          <Row>
            <Col span={12}>
              <Statistic title="状态" value="待派单" />
            </Col>
            <Col span={12}>
              <Statistic title="紧急度"   value="紧急" />
            </Col>
          </Row>
        }
        >
        详情页内部结构
      </DrawerWrapper>
 */

export const DrawerWrapper = ({ 
  visible, 
  width, 
  title, 
  style, 
  drawerClassName,
  onClose, 
  children,
  extra, 
  extraContent,
  extraComponent, ...props }) => (
  <Drawer 
    visible={visible} 
    destroyOnClose={true}
    className={classnames('drawerWrapper',drawerClassName)}
    onClose={(e)=>onClose(e)}
    bodyStyle={{padding: '0'}}
    width={width || 980} {...props}>
    <PageHeader
      title={ _.isString(title) ? <h5>{title}</h5> : title }
      extra={extra}
      style={{background:"#F0F4FA",...style}}
      {...props}
    >
      <div className="wrap" style={extraComponent|| extraContent ? { paddingTop:12 }:null}>
        <div className="content">{ _.isFunction(extraComponent) ? extraComponent(): extraComponent }</div>
        <div className="extraContent">
          {
            _.isFunction(extraContent) ? extraContent(): extraContent
          }
        </div>
      </div>
    </PageHeader>
    <div className="drawerContent">
      {children}
    </div>
  </Drawer>
)