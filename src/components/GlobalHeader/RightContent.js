import React, { PureComponent } from 'react';
import { connect } from "dva";
import { NoticeIcon, HeaderSearch } from 'ant-design-pro';
import { Tooltip, Icon, Tag, Dropdown, Avatar, Spin, Menu, Modal, AutoComplete, message, Row } from 'antd';
import { formatMessage } from '@/utils';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import _ from 'lodash';

const CheckableTag = Tag.CheckableTag;
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const systemType = [
  { key: "1", name: "子系统名称1" },
  { key: "2", name: "子系统名称2" },
  { key: "3", name: "子系统名称3" },
]

@connect(({ global, user, menu }) => ({ menuData: global.menuData, user, menu }))
class RightContent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      searchValue: null,
      selectedTags: [],
      selectedTagInfo: [],
      dataSource: [],// real dataSource is  this.props.menuData - filter searchValue
    }
    this.onPressHeaderSearch = _.debounce(this.onPressHeaderSearch, 500)
    this.onHeaderSearch = _.debounce(this.onHeaderSearch, 500)
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

  onHeaderSearch = (searchValue) => {
    if (searchValue.trim() === "") {
      this.setState({ dataSource: [] })
    } else {
      this.setState({ searchValue })
      this.onPressHeaderSearch(searchValue)
    }
  }

  onPressHeaderSearch = (value) => {
    const { menuData } = this.props;
    let v = this.genData(menuData, value);
    this.setState({ dataSource: v })
  }

  // 生成最后全部数据
  genData = (d, value) => {
    let array = [];
    // console.log(d);
    d.map((item, index) => {
      const flag = item.children && Array.isArray(item.children);
      // 如果父级包含关键字
      if (item.name.indexOf(value) > -1) {
        // console.log(item)
        const children = flag ? this.genChildrenData(item.children, value) : [];
        array.push({ ...item, children });
      } else {
        if (flag) {
          array.push({ ...item, children: this.genData(item.children, value) });
        }
      }
      return null
    })
    return array;
  }

  // 生成子菜单数据
  genChildrenData = (d, key) => {
    let array = [];
    d.map(item => {
      if (item.name.indexOf(key) > -1) {
        array.push(item)
      } else {
        if (item.children && Array.isArray(item.children)) {
          this.genChildrenData(item.children, key)
        }
      }
      return null
    })
    return array;
  }

  transferColor = (name) => {
    const { searchValue } = this.state;
    let key = searchValue.trim();
    if (name.indexOf(key) !== -1 && name !== key) {
      let arr = name.split(key);
      let ret = arr.map(item => {
        if (item === "") {
          return (<em style={{ color: '#c71019' }}> {key}</em>)
        } else {
          return `${item}`
        }
      })
      return ret
    } else if (name === key) {
      return (<em style={{ color: '#c71019' }}> {name}</em>)
    } else {
      return name
    }
  }

  onSelect = (value, option) => {
    if (option.props.path) {
      this.props.history.push(option.props.path)
    }
  }

  changeSystem = () => {
    console.log('changeSystem')
    console.log(this.state.selectedTagInfo)
    console.log(this.state.selectedTags)
    //此处根据请求来获取对应的menuData 更改全局 global.menuData
    console.log(this.props.menuData)
    console.log('change menuDataSource')
    this.setState({ visible: false })
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchMenu',
      payload: { currentSys: "1" }
    })
    console.log(this.props)
  }

  /* 切换子系统 */
  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [tag.key] : selectedTags.filter(t => t !== tag.key);
    console.log('You are interested in: ', nextSelectedTags);
    console.log('You are selectedTagInfo: ', tag);
    this.setState({ selectedTags: nextSelectedTags, selectedTagInfo: tag });
  }

  render() {
    const {
      user: { currentUser },
      fetchingNotices,
      onNoticeVisibleChange,
      // onMenuClick,
      onNoticeClear,
      theme,
    } = this.props;
    let className = 'global-right';
    if (theme === 'dark') {
      className = `global-right dark`;
    }
    const noticeData = this.getNoticeData();
    const menu = (
      <Menu className={'menu'} selectedKeys={[]} onClick={this.onMenuClick}>
        {/* <Menu.Item key="userCenter">
          <Icon type="user" />
          { formatMessage('menu.account.center') }
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          { formatMessage('menu.account.settings') }
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          { formatMessage('menu.account.trigger') }
        </Menu.Item> 
        <Menu.Divider />*/}
        <Menu.Item key="logout">
          <Icon type="logout" />
          {formatMessage('menu.account.logout')}
        </Menu.Item>
      </Menu>
    );
    const { dataSource, visible, selectedTags } = this.state;
    const options = dataSource.map(group => (
      <OptGroup
        key={group.name}
        label={group.name}
      >
        {group.children.map(opt => (
          <Option key={opt.name} value={opt.name} path={opt.path}>
            {
              this.transferColor(opt.name)
            }
          </Option>
        ))}
      </OptGroup>
    ));
    return (
      <div className='global-header-container'>
        <div className={`global-header-switch ${theme === 'dark' ? 'light' : ''}`}> {/* onClick={() => this.setState({ visible: true })} */}
          CHS-DRG 的数据管理平台
          <Tag className='test'>试用版</Tag>
        </div>
        <div className={className}>
          <HeaderSearch
            wrappedComponentRef={(search) => this.HeaderSearch = search}
            className={`action search`}
            optionLabelProp="value"
            placeholder={formatMessage('component.globalHeader.search')}
            dataSource={options}
            onSelect={this.onSelect}
            onBlur={() => this.setState({ dataSource: [] })}
            onSearch={this.onHeaderSearch}
            onPressEnter={this.onPressHeaderSearch}
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
          {currentUser && currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`action account`}>
                <Avatar
                  size="small"
                  className={'avatar'}
                  src={currentUser.avatar}
                  alt="avatar"
                />
                <span className={`name ${theme === 'dark' ? 'light' : ''}`}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
              <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
            )}
        </div>

        <Modal
          visible={visible}
          title='子系统切换'
          onOk={this.changeSystem}
          onCancel={() => this.setState({ visible: false })}
        >
          <Row className={'changeSystemWarpper'}>
            {
              systemType.map((item, index) =>
                <CheckableTag
                  key={item.key}
                  info={item}
                  checked={selectedTags.indexOf(item.key) > -1}
                  onChange={checked => this.handleChange(item, checked)}
                >
                  {item.name}
                </CheckableTag>
              )
            }
          </Row>
        </Modal>
      </div>
    )
  }
}

export default RightContent;