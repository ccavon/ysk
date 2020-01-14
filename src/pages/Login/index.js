/*
 * @Author: wwb 
 * @Date: 2018-12-14 14:46:27 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2020-01-08 17:19:42
 */
import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { connect } from 'dva';
import { settingConfig } from '@/config/setting.config';
import { userLocal } from '@/api/_local';
import { formatMessage } from '@/utils';
// import { users } from '@/api/user';
// import md5 from 'md5';
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
      loading: false,
      type: 'account',
      loginSessionId: '', //登录会话ID
    }
  }

  componentWillMount = () => {
    localStorage.removeItem('JSESSIONID');
  }

  componentDidMount() {
    document.title = '华信卫健';
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
        let jsonData = {
          userName: loginName,
          password: pwd
        };
        const { dispatch, history } = this.props;
        dispatch({
          type: 'user/userLogin',
          payload: { ...jsonData },
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
    });
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       let { loginName, pwd, remember } = values;
  //       const { dispatch, history } = this.props;
  //       console.log('Cookies:', Cookies.get('pwd'));
  //       // if (pwd !== Cookies.get('pwd')) {
  //       //   pwd = md5(pwd);
  //       // }
  //       this.setState({ loading: true });
  //       let postData = { loginName, pwd };
  //       fetch(users.LOGIN, {
  //         method: 'post',
  //         mode: 'cors',
  //         credentials: 'include',
  //         headers: {
  //           'JSESSIONID': this.state.loginSessionId,
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(postData)
  //       }).then(response => {
  //         if (!this.isYsk) {
  //           this.setState({ loginSessionId: response.headers.get('JSESSIONID') });
  //         }
  //         return response.json();
  //       }).then(async result => {
  //         console.log(result, '11111');
  //         if (result.code === 200) {
  //           localStorage.setItem('JSESSIONID', result.data.sessionId);
  //           sessionStorage.setItem('login', true);
  //           message.success(result.msg || '登录成功');
  //           if (remember) {
  //             Cookies.set('loginName', loginName, { expires: 7 });
  //             Cookies.set('pwd', pwd, { expires: 7 });
  //           } else {
  //             Cookies.remove('loginName');
  //             Cookies.remove('pwd');
  //           }
  //           let { sysRoles, sysDepts, ...userInfo } = result.data;
  //           // 1. 存储用户信息
  //           dispatch({
  //             type: 'user/saveCurrentUser',
  //             payload: {
  //               sysRoles,
  //               sysDepts,
  //               userInfo
  //             }
  //           });
  //           // 2. 如果当前子系统没有菜单数据 则进入到页面
  //           history.push({
  //             pathname: result.data.sessionId ? '/subSystem' : '/exception/500' // 如果后面有动态菜单条件改成菜单有关的
  //           });
  //         }
  //       }).catch(err => {
  //         this.setState({ loading: false });
  //         message.error('登录失败');
  //       });
  //     }
  //   });
  // }

  render() {
    const NODE_ENV = settingConfig().type === 'dev';
    const { getFieldDecorator } = this.props.form;
    let logoStyle = {}; // 用来存放从后台获取logo图路劲 比如：logoStyle.backgroundImage = `url(${logoUrl})`;
    return (
      <div className={'container'}>
        <div className={'side-content'} style={{ width: '62%' }}></div>
        <div className={'main-content'} style={{ width: '38%' }}>
          <div className={'top_logo'} style={{ paddingTop: NODE_ENV ? 120 : 165 }}>
            {
              NODE_ENV && <div className='logo' style={logoStyle}></div>
            }
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...wrapperLayout}>
              {
                getFieldDecorator(`loginName`, {
                  initialValue: 'admin',
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder='用户名' />
                )
              }
            </FormItem>
            <FormItem {...wrapperLayout}>
              {
                getFieldDecorator(`pwd`, {
                  initialValue: 'admin',
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input type="password" prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder='密码' />
                )
              }
            </FormItem>
            <FormItem {...wrapperLayout}>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: Boolean(Cookies.get('loginName')),
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
