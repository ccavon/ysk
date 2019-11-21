/*
 * @Author: wangyuxuan 设置 - 密码管理 - 主页
 * @Date: 2019-01-21 11:10:00 
 * @Last Modified by: wangyuxuan
 * @Last Modified time: 2019-09-20 16:12:48
 */
import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Input, Form, Row, Col, Button, message } from 'antd';
import { FooterToolbar } from 'ant-design-pro';
import { formatMessage } from '@/utils';
import md5 from 'md5';
import { connect } from 'dva';
import themes from '@/config/themes.config';


const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
    md: { span: 4 },
    lg: { span: 4 },
    xl: { span: 2 },
    xxl: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 10 },
    sm: { span: 10 },
    md: { span: 10 },
    lg: { span: 10 },
    xl: { span: 6 },
    xxl: { span: 6 },
  }
};

@connect(({ user }) => ({
  user
}))
@Form.create()
class PwdMgt extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      width: '100%',
      confirmDirty: false,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  //// 判断新密码与再次输入的密码是否一致
  // 再次输入新密码获取焦点时修改state
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    })
  }
  //确认 "确认新密码"与"新密码"是否一致
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('pwd')) {
      callback('密码不一致');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['newPwd'], { force: true });
    }
    callback()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields }, dispatch } = this.props;
    validateFields((err, fileValues) => {
      if (!err) {
        let values = { userId: this.props.user.currentUser.userId, upatePwdFlag: true };
        let oldPwd = fileValues.oldPwd;
        let pwd = fileValues.pwd;
        let newPwd = fileValues.newPwd;
        oldPwd = md5(oldPwd);
        pwd = md5(pwd);
        newPwd = md5(newPwd);
        values.oldPwd = oldPwd;
        values.pwd = pwd;
        values.newPwd = newPwd;
        this.setState({ loading: true });
        dispatch({
          type: 'user/modifyUserInfo',
          payload: { ...values },
          callback: (data) => {
            if (data.status === 200) {
              message.success('密码修改成功!');
              //清空菜单
              dispatch({
                type: 'global/clearMenu'
              });
              dispatch({
                type: 'setting/changeSetting',
                payload: { ...themes }
              })
              dispatch({
                type: 'setting/changeTheme',
                payload: { isChangeTheme: false }
              })
              this.props.history.push({
                pathname: '/login',
                search: 'url=www.ganwumei.com'
              })
            } else {
              this.setState({ loading: false });
              message.error(data.msg);
            }
          }
        });
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, width } = this.state;
    return (
      <PageHeaderWrapper title={'密码管理'}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <FormItem
                label="旧密码"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('oldPwd', {
                  rules: [{ required: true, message: '请输入旧密码！' }]
                })(
                  <Input type="password" placeholder="请输入旧密码" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem
                label="新密码"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('pwd', {
                  rules: [{ required: true, message: '请输入新密码！' },
                  { min: 6, message: formatMessage('validation.password.strength.msg') },
                  { validator: this.checkConfirm, }
                  ]
                })(
                  <Input type="password" placeholder="请输入新密码" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem
                label="确认新密码"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('newPwd', {
                  rules: [{ required: true, message: '请再次输入新密码' },
                  { validator: this.checkPassword, }
                  ]
                })(
                  <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请输入新密码" />
                )}
              </FormItem>
            </Col>
          </Row>
          <FooterToolbar style={{ width }}>
            <Row>
              <Col style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 10 }} loading={loading}>保存</Button>
              </Col>
            </Row>
          </FooterToolbar>
          {/* <Affix offsetBottom={4} className="affix" style={{ marginTop: '30%' }}>
            <Row>
              <Col className="page-affix" style={{ float: 'right' }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 10 }} loading={loading}>保存</Button>
              </Col>
            </Row>
          </Affix> */}
        </Form>
      </PageHeaderWrapper>
    )
  }
}

export default PwdMgt;