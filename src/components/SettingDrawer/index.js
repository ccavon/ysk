import React, { PureComponent } from 'react';
import { Select, message, Drawer, List, Switch, Divider, Icon, Button, Tooltip } from 'antd';
import { formatMessage } from '@/utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'dva';
import omit from 'omit.js';
import ThemeColor from './ThemeColor';
import BlockChecbox from './BlockChecbox';

const { Option } = Select;

const Body = ({ children, title, style }) => (
  <div
    style={{
      ...style,
      marginBottom: 24,
    }}
  >
    <h3 className={'title'}>{title}</h3>
    {children}
  </div>
);

@connect(({ setting, user }) => ({ setting, user }))
class SettingDrawer extends PureComponent {

  static defaultProps = {
    couldSave: false
  }

  state = {
    collapse: false,
  };

  getLayoutSetting = () => {
    const {
      setting: { contentWidth, fixedHeader, fixedDetailHeader , layout, autoHideHeader, fixSiderbar, defaultPageSize, pagesizeOptions },
    } = this.props;
    const options = pagesizeOptions.split(',');
    return [
      {
        title: formatMessage('app.setting.content-width'),
        action: (
          <Select
            value={contentWidth}
            size="small"
            onSelect={value => this.changeSetting('contentWidth', value)}
            style={{ width: 80 }}
          >
            {layout === 'sidemenu' ? null : (
              <Option value="Fixed">
                {formatMessage('app.setting.content-width.fixed')}
              </Option>
            )}
            <Option value="Fluid">
              {formatMessage('app.setting.content-width.fluid')}
            </Option>
          </Select>
        ),
      },
      {
        title: formatMessage('app.setting.table-pagesize'),
        action: (
          <Select
            value={defaultPageSize}
            size="small"
            onSelect={value => this.changeSetting('defaultPageSize', value)}
            style={{ width: 80 }}
          >
            {
              options.map((item,index) => <Option key={index} value={`${item}`}>{item}</Option>)
            }
          </Select>
        ),
      },
      {
        title: formatMessage('app.setting.fixedheader'),
        action: (
          <Switch
            size="small"
            checked={!!fixedHeader}
            onChange={checked => this.changeSetting('fixedHeader', checked)}
          />
        ),
      },
      {
        title: formatMessage('app.setting.fixedDetailHeader'),
        action: (
          <Switch
            size="small"
            checked={!!fixedDetailHeader} // fixedDetailHeader
            onChange={checked => this.changeSetting('fixedDetailHeader', checked)}
          />
        ),
      },
      {
        title: formatMessage('app.setting.hideheader'),
        disabled: !fixedHeader,
        disabledReason: formatMessage('app.setting.hideheader.hint'),
        action: (
          <Switch
            size="small"
            checked={!!autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
          />
        ),
      },
      {
        title: formatMessage('app.setting.fixedsidebar'),
        disabled: layout === 'topmenu',
        disabledReason: formatMessage('app.setting.fixedsidebar.hint'),
        action: (
          <Switch
            size="small"
            checked={!!fixSiderbar}
            onChange={checked => this.changeSetting('fixSiderbar', checked)}
          />
        ),
      },
    ];
  };

  changeSetting = (key, value) => {
    const { setting } = this.props;
    const nextState = { ...setting };
    nextState[key] = value;
    if (key === 'layout') {
      nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
    } else if (key === 'fixedHeader' && !value) {
      nextState.autoHideHeader = false;
    }else if (key === 'fixedDetailHeader' && !value) {
      nextState.fixedDetailHeader = false;
    }
    this.setState(nextState, () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'setting/changeSetting',
        payload: {...this.state,showMessage:true},
      });
    });
  };

  /**
   * @method saveSetting
   * @description 存储当前setting数据，发送请求
   */
  saveSetting = async () => {
    const { setting, dispatch, user: { currentUser: { orgId } } } = this.props;
    this.togglerContent();
    let theme = await dispatch({
      type:'setting/insertThemSet',
      payload:{ ...setting, orgId }
    })
    if (theme.result && theme.status===200 ) {
      message.success('主题配置保存成功！')
      dispatch({
        type:'setting/changeSetting',
        payload: { ...theme.result }
      })
    } else {
      message.warn(theme.msg)
    }
  }

  togglerContent = () => {
    const { collapse } = this.state;
    this.setState({ collapse: !collapse });
  };

  renderLayoutSettingItem = item => {
    const action = React.cloneElement(item.action, {
      disabled: item.disabled,
    });
    return (
      <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
        <List.Item actions={[action]}>
          <span style={{ opacity: item.disabled ? '0.5' : '' }}>{item.title}</span>
        </List.Item>
      </Tooltip>
    );
  };

  render() {
    const { setting } = this.props;//user: { currentUser }
    const { navTheme, primaryColor, layout, colorWeak } = setting;
    const { collapse } = this.state;
    return (
      <Drawer
        visible={collapse}
        width={300}
        onClose={this.togglerContent}
        placement="right"
        handler={
          <div className={'handle'}>
            <Icon
              type={collapse ? 'close' : 'setting'}
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          </div>
        }
        onHandleClick={this.togglerContent}
        style={{
          zIndex: 999,
        }}
      >
        <div className={'content'}>
          <Body title={formatMessage('app.setting.pagestyle')}>
            <BlockChecbox
              list={[
                {
                  key: 'dark',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                  title: formatMessage('app.setting.pagestyle.dark'),
                },
                {
                  key: 'light',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                  title: formatMessage('app.setting.pagestyle.light'),
                },
              ]}
              value={navTheme}
              onChange={value => this.changeSetting('navTheme', value)}
            />
          </Body>

          <ThemeColor
            title={formatMessage('app.setting.themecolor')}
            value={primaryColor}
            onChange={color => this.changeSetting('primaryColor', color)}
          />

          <Divider />

          <Body title={formatMessage('app.setting.navigationmode')}>
            <BlockChecbox
              list={[
                {
                  key: 'sidemenu',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                  title: formatMessage('app.setting.sidemenu'),
                },
                {
                  key: 'topmenu',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                  title: formatMessage('app.setting.topmenu'),
                },
              ]}
              value={layout}
              onChange={value => this.changeSetting('layout', value)}
            />
          </Body>

          <List
            split={false}
            dataSource={this.getLayoutSetting()}
            renderItem={this.renderLayoutSettingItem}
          />

          <Divider />



          <Body title={formatMessage('app.setting.othersettings')}>
            <List.Item
              actions={[
                <Switch
                  size="small"
                  checked={!!colorWeak}
                  onChange={checked => this.changeSetting('colorWeak', checked)}
                />,
              ]}
            >
              <span>{formatMessage( 'app.setting.weakmode')}</span>
            </List.Item>
          </Body>
          <Divider />
          {
            // currentUser.vip > 4 
            true ?               
            <Button block icon="copy" onClick={this.saveSetting}>
              {formatMessage('app.setting.save')}
            </Button> :
            <CopyToClipboard
              text={JSON.stringify(omit(setting, ['colorWeak']), null, 2)}
              onCopy={() => message.success(formatMessage('app.setting.copyinfo' ))}
            >
              <Button block icon="copy">
                {formatMessage('app.setting.copy')}
              </Button>
            </CopyToClipboard>
          }
        </div>
      </Drawer>
    );
  }
}

export default SettingDrawer;
