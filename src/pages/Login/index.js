/*
 * @Author: wwb 
 * @Date: 2018-12-14 14:46:27 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-28 09:42:17
 */
import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox, message, Tooltip } from 'antd';
import { connect } from 'dva';
import { settingConfig } from '@/config/setting.config';
import { userLocal } from '@/api/_local';
import { formatMessage } from '@/utils';
import md5 from 'md5';
import { users } from '@/api/user';
import querystring from 'querystring';
import './style.less';

const FormItem = Form.Item;
const wrapperLayout = { wrapperCol: { span: 15, offset: 5 } };

const Cookies = window.Cookies;

@connect(({ user, setting, global }) => ({
  user,
  setting,
  global
}))
@Form.create()
class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.isYsk = userLocal.includes(':8081');
    this.state = {
      failCount: 0,
      loading: false,
      src: '',
      code: '',
      count: 0,
      type: 'account',
      loginSessionId: '', //登录会话ID
    }
  }

  componentWillMount = () => {
    localStorage.removeItem('JSESSIONID');
  }

  componentDidMount() {
    document.title = '华信卫健';
    if (this.isYsk) {
      this.codeChange();
    } else {
      return;
    }
    this.setAccount();
    const { state } = this.props.location;
    if (state && state.form) {
      formatMessage(message.warning(formatMessage('validation.login.noRole')));
    }
  }

  setAccount = () => {
    const loginName = Cookies.get('loginName'), pwd = Cookies.get('pwd'), { setFieldsValue } = this.props.form;
    if (loginName && pwd) {
      setFieldsValue({ loginName, pwd });
    }
  }

  componentWillUpdate() {
    window.history.pushState(null, null, document.URL);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { loginName, pwd } = values;
        // const { dispatch, history } = this.props;
        if (pwd !== Cookies.get('pwd')) {
          pwd = md5(pwd);
        }
        this.setState({ loading: true });
        let postData = { loginName, pwd }
        fetch(users.LOGIN, {
          method: 'post',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'JSESSIONID': this.state.loginSessionId,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: querystring.stringify(postData)
        }).then(response => {
          if (!this.isYsk) {
            this.setState({ loginSessionId: response.headers.get('JSESSIONID') });
          }
          return response.json();
        }).then(async data => {
          console.log(data, '11111');
        });



        // dispatch({
        //   type: 'user/userLogin',
        //   payload: postData,
        //   callback: (flag) => {
        //     if (flag) {
        //       message.success('登陆成功');
        //       history.push({ pathname: '/subSystem' });
        //     } else {
        //       message.error('账号密码错误')
        //     }
        //     this.setState({ loading: false });
        //   }
        // });
      }
    })
  }



  codeChange = () => {

  }

  render() {
    const NODE_ENV = settingConfig().type === 'dev';
    const { getFieldDecorator } = this.props.form;
    const { failCount } = this.state;
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
                getFieldDecorator(`loginName`, {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder='用户名' />
                )
              }
            </FormItem>
            <FormItem {...wrapperLayout}>
              {
                getFieldDecorator(`pwd`, {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input
                    type="password"
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,0.25)' }} />}
                    placeholder='密码'
                  />
                )
              }
            </FormItem>
            {
              ((!this.isJxh && failCount >= 5) || this.isJxh) &&
              <FormItem {...wrapperLayout}>
                {
                  getFieldDecorator('imageCode', {
                    validateTrigger: ['onBlur'],
                    rules: [{
                      validator: (rule, value, cb) => {
                        if (typeof value !== 'undefined' && value.length === 4) {
                          cb();
                        } else {
                          cb('验证码不正确');
                        }
                      }
                    }],
                  })(
                    <Input
                      style={{ width: '60%' }}
                      prefix={
                        <Icon type="mail" style={{ color: 'rgba(0,0,0,0.25)' }} />
                      }
                      placeholder="验证码"
                    />
                  )
                }
                <Tooltip title={'点我切换验证码'} placement={'top'}>
                  <img
                    alt='介里是验证码'
                    id='img'
                    style={{
                      float: 'right',
                      border: '1px solid'
                    }}
                    src={this.state.src}
                    onClick={this.codeChange}
                  />
                </Tooltip>
              </FormItem>
            }
            <FormItem {...wrapperLayout}>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: Boolean(Cookies.get('loginNo')),
                })(
                  <Checkbox>记住用户名和密码</Checkbox>
                )
              }
            </FormItem>
            <FormItem {...wrapperLayout}>
              {/* <Link to='/handle/register' style={{ float: 'right' }}>注册</Link> */}
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={this.state.loading}>
                登录
              </Button>
              {/* <Button type='danger' onClick={() => {
                sessionStorage.setItem('login', true);
                this.props.history.push('/home')
              }}>
                点击这个按钮模拟登录凑合一下
              </Button> */}
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}
export default LoginForm;
