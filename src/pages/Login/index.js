/*
 * @Author: wwb 
 * @Date: 2018-12-14 14:46:27 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-07 09:28:19
 */
import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { connect } from 'dva';
import { settingConfig } from '@/config/setting.config';
import './style.less';

const FormItem = Form.Item;
const wrapperLayout = { wrapperCol: { span: 15, offset: 5 } };

@connect(({ user, setting, global }) => ({
  user,
  setting,
  global
}))
@Form.create()
class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      failCount: 0,
      loading: false,
      code: '',
    }
  }

  componentDidMount() {
    document.title = '华信卫健';
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        let { userName, password } = values;
        const { dispatch, history } = this.props;
        dispatch({
          type: 'user/userLogin',
          payload: { userName, password },
          callback: (flag) => {
            if (flag) {
              message.success('登陆成功');
              history.push({ pathname: '/subSystem' });
            } else {
              message.error('账号密码错误')
            }
            this.setState({ loading: false });
          }
        });
      }
    })
  }

  render() {
    const NODE_ENV = settingConfig().type === 'dev';
    const { getFieldDecorator } = this.props.form;
    let logoStyle = {},
      backgroundStyle = {
        width: '62%'
      };
    return (
      <div className={'container'}>
        <div className={'side-content'} style={backgroundStyle}></div>
        <div className={'main-content'} style={{ width: '38%' }}>
          <div className={'top_logo'} style={{ paddingTop: NODE_ENV ? 120 : 165 }}>
            {
              NODE_ENV
              &&
              <div className='logo' style={logoStyle}></div>
            }
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...wrapperLayout}>
              {
                getFieldDecorator(`userName`, {
                  rules: [{ required: true, message: '请输入用户名!' }],
                  initialValue: 'admin'
                })(
                  <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder='用户名' />
                )
              }
            </FormItem>
            <FormItem {...wrapperLayout}>
              {
                getFieldDecorator(`password`, {
                  rules: [{ required: true, message: '请输入密码!' }],
                  initialValue: 'admin'
                })(
                  <Input
                    type="password"
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,0.25)' }} />}
                    placeholder='密码'
                  />
                )
              }
            </FormItem>
            <FormItem {...wrapperLayout}>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>记住用户名和密码</Checkbox>
                )
              }
            </FormItem>
            <FormItem {...wrapperLayout}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={this.state.loading}>
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}
export default LoginForm;
