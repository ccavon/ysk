/**
 * @Author: chengyafang 
 * @Date: 2019-10-25 14:55:59 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-20 09:24:38
 * @File 子系统切换
 * @description 当登录成功时进入-->此时需要进行医疗机构选择
 */
import React, { PureComponent } from 'react';
import { connect } from "dva";
import { NoticeIcon, HeaderSearch } from 'ant-design-pro';
import { Tooltip, Icon, Tag, Dropdown, Avatar, Menu, message, Layout, Card, Row, Col } from 'antd';
import { formatMessage } from '@/utils';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import './style.less';

const { Header, Content, Footer } = Layout;

@connect(({ global, user, menu }) => ({ menuData: global.menuData, user, menu }))
class SubSystem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: null,
      selectedTagInfo: [],
      dataSource: []
    }
  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  onMenuClick = (e) => {
    console.log('onMenuClick', e)
    switch (e.key) {
      case "logout":
        message.success(formatMessage('menu.account.logoutInfo'))
        this.props.history.push('/')
        break;
      case "userCenter":
        console.log('userCenter')
        break;
      case "userinfo":
        console.log('userinfo')
        break;
      case "setting":
        console.log('setting')
        break;
      default:
        break;
    }
  }

  render() {
    const { user: { currentUser }, fetchingNotices, onNoticeVisibleChange, onNoticeClear, theme } = this.props;
    const colSpan = { xs: 12, sm: 8, md: 6, lg: 4, xl: 3, xxl: 3 };
    let className = 'global-right';
    if (theme === 'dark') {
      className = `global-right dark`;
    }
    const noticeData = this.getNoticeData();
    const menu = (
      <Menu className={'menu'} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          {formatMessage('menu.account.logout')}
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout>
        <Header>
          <div className={'global-header'}>
            <div className='global-header-container'>
              <div className={`global-header-switch ${theme === 'dark' ? 'light' : ''}`}>
                CHS-DRG 的数据管理平台
                <Tag className='test'>试用版</Tag>
              </div>
              <div className={className}>
                <HeaderSearch
                  className={`action search`}
                  optionLabelProp="value"
                  placeholder={formatMessage('component.globalHeader.search')}
                />
                <Tooltip title={formatMessage('component.globalHeader.help')}>
                  <a
                    target="_blank"
                    href="https://pro.ant.design/docs/getting-started"
                    rel="noopener noreferrer"
                    className={`action`}
                  >
                    <Icon
                      type="question-circle-o"
                      style={{ color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .65)' }}
                    />
                  </a>
                </Tooltip>
                <NoticeIcon
                  className={`action ${theme === 'dark' ? 'light' : ''}`}
                  count={currentUser.notifyCount}
                  onItemClick={(item, tabProps) => {
                    console.log(item, tabProps); // eslint-disable-line
                  }}
                  locale={{
                    emptyText: formatMessage('component.noticeIcon.empty'),
                    clear: formatMessage('component.noticeIcon.clear'),
                  }}
                  onClear={onNoticeClear}
                  onPopupVisibleChange={onNoticeVisibleChange}
                  loading={fetchingNotices}
                  popupAlign={{ offset: [20, -16] }}
                >
                  <NoticeIcon.Tab
                    list={noticeData.notification}
                    title={formatMessage('component.globalHeader.notification')}
                    name="notification"
                    emptyText={formatMessage('component.globalHeader.notification.empty')}
                    emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                  />
                  <NoticeIcon.Tab
                    list={noticeData.message}
                    title={formatMessage('component.globalHeader.message')}
                    name="message"
                    emptyText={formatMessage('component.globalHeader.message.empty')}
                    emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                  />
                  <NoticeIcon.Tab
                    list={noticeData.event}
                    title={formatMessage('component.globalHeader.event')}
                    name="event"
                    emptyText={formatMessage('component.globalHeader.event.empty')}
                    emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                  />
                </NoticeIcon>
                <Dropdown overlay={menu}>
                  <span className={`action account`}>
                    <Avatar
                      size="small"
                      className={'avatar'}
                      src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                      alt="avatar"
                    />
                    <span className={`name ${theme === 'dark' ? 'light' : ''}`}>{'admin管理员'}</span>
                  </span>
                </Dropdown>
              </div>
            </div>
          </div>
        </Header>
        <Content>
          <div style={{ padding: '16px 24px' }}>
            <div style={{ padding: '16px 24px', background: '#ffffff' }}>
              <Card bordered={false}>
                {/* <Row type="flex" justify="space-around" align="middle"> */}
                <Row type="flex" align="middle">
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg100'} onClick={() => this.props.history.push({ pathname: '/settlementYB/jsList' })}>
                      <div>
                        <p>100%</p>
                        <p>实时数据采集机构</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg100'} onClick={() => this.props.history.push({ pathname: '/home' })}>
                      <div>
                        <p>100%</p>
                        <p>武汉市协和医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg100'} onClick={() => this.props.history.push({ pathname: '/home' })}>
                      <div>
                        <p>100%</p>
                        <p>武汉市同济医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg100'} onClick={() => this.props.history.push({ pathname: '/home' })}>
                      <div>
                        <p>100%</p>
                        <p>武汉市口腔医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg100'}>
                      <div>
                        <p>100%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg100'}>
                      <div>
                        <p>100%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg60'}>
                      <div>
                        <p>60%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg60'}>
                      <div>
                        <p>60%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg60'}>
                      <div>
                        <p>60%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg60'}>
                      <div>
                        <p>60%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg60'}>
                      <div>
                        <p>60%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg60'}>
                      <div>
                        <p>60%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg60'}>
                      <div>
                        <p>60%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg60'}>
                      <div>
                        <p>60%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg60'}>
                      <div>
                        <p>60%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg20'}>
                      <div>
                        <p>20%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg20'}>
                      <div>
                        <p>20%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                  <Col {...colSpan}>
                    <div className={'matter-card matter-card-bg20'}>
                      <div>
                        <p>20%</p>
                        <p>XXXXX医院</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </Content>
        <Footer>
          <div className={'footer-style'}>
            {/* 版权所有：<a href={'http://www.isqua.com.cn/'} target={'_black'}>伊思科联合（北京）医疗管理咨询有限公司</a> */}
            版权所有：<a>北京华信卫健医学研究院有限公司</a>
          </div>
        </Footer>
      </Layout>
    )
  }
}
export default SubSystem;
