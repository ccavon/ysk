/*
 * @Author: wwb 
 * @Date: 2018-12-14 14:46:47 
 * @Last Modified by: wwb
 * @Last Modified time: 2019-01-21 19:03:49
 */
import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Form, Icon, Input, Button, Checkbox, Select, message, Row, Col, Tooltip, Cascader, DatePicker,Upload, Anchor, Affix } from 'antd';
import { connect } from 'dva';
import { _local } from '@/api/_local';
import { formatMessage, City } from '@/utils';
import './style.less';
const PICUPLAOD_URL = `${_local}/ftp/post`;
const { Link } = Anchor;
const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const uploadItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 8 }
  }
}
const style = {
  width: '80%'
}
const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">上传</div>
  </div>
);

const yyzzText = '营业执照';
const ylqxxkText = '医疗器械经营企业许可证';

@connect(({ user }) => ({
  user
}))
@Form.create()
class Register extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      disabled: true,
      citys: [],
      cOrporationOptions: [],
      gysYyzzfiles: [],
      jyxkfiles: [],
      loading: false
    }
  }
  componentDidMount(){
    // CommonData('CORPORATION_TYPE', (data) => {
    //   this.setState({cOrporationOptions:data})
    // });
    City((data) => {
      this.setState({ citys: data })
    })
  }
  handleClick(e,link){
    e.preventDefault();
    console.log(link,'link')
  }
  handleRegister = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        this.setState({ loading: true });
        const { dispatch, history } = this.props;
        dispatch({
          type: 'user/register',
          payload: { ...values },
          callback: (data) => {
            if(data){
              message.success('注册成功');
              history.push({ pathname: '/login' });
            }else{
              message.error('注册失败');
            }
          }
        })
        this.setState({ loading: false });
      }
    })
  }
  render(){
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    // const cOrporationData = this.state.cOrporationOptions
    const citysData = this.state.citys;
    const { loading, disabled } = this.state;
    return (
      <div style={{ padding: '0 32px'}}>
        <PageHeaderWrapper>
          <div className='pageHeadercontent'>
            <div className='pageTitle' style={{ fontSize: 24 }}>注册</div>
          </div>
        </PageHeaderWrapper>
        <div className='page-content'>
          <Row>
            <Form onSubmit={this.handleRegister}>
              <Col span={20} offset={2}>
                <Row justify={'center'}>
                  <Col span={3}>
                    <Anchor onClick={this.handleClick} bounds={10}>
                      <Link href='#userInfo' title='账号信息'/>
                      <Link href='#orgInfo' title='机构信息'/>
                      <Link href='#otherInfo' title='其他信息'/>
                    </Anchor>
                  </Col>
                  <Col span={21}>
                      <Row className='section'>
                        <div className='section-title'>
                          <span id='userInfo' className='section-main-title'>账号信息</span>
                        </div>
                        <Row className='section-content'>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label={`账号`} hasFeedback>
                              {
                                getFieldDecorator(`userNo`,{
                                  initialValue: '',
                                  rules: [{ required: true, message: formatMessage('validation.userNo.required'), whitespace: true }]
                                })(
                                  <Input placeholder={formatMessage('form.input.placeholder')} style={{...style}}/>
                                )
                              }
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label={`姓名`} hasFeedback>
                              {
                                getFieldDecorator(`userName`,{
                                  initialValue: '',
                                  rules: [
                                    { required: true, message: formatMessage('validation.userName.required'), whitespace: true },
                                    { pattern:/[A-Za-z0-9_\-\u4e00-\u9fa5]+$/, message: formatMessage('validation.input.types.wrong-format')},
                                    { max:20, message: formatMessage('validation.input.length-20')},
                                  ]
                                })(
                                  <Input placeholder={formatMessage('form.input.placeholder')} style={{...style}}/>
                                )
                              }
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label={`邮箱`} hasFeedback>
                              {
                                getFieldDecorator(`eMail`,{
                                  initialValue: '',
                                  rules: [
                                    { type: 'email', message: formatMessage('validation.email.wrong-format') },
                                    { required: true, message: formatMessage('validation.email.required') },
                                    { max:50, message: formatMessage('validation.length-50') }],
                                  
                                })(
                                  <Input placeholder={formatMessage('form.input.placeholder')} style={{...style}}/>
                                )
                              }
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label={`手机号`} hasFeedback>
                              {
                                getFieldDecorator(`mobilePhone`,{
                                  initialValue: '',
                                  rules: [
                                    { pattern: /^\d+$/,message: formatMessage('validation.phone.number.format')},
                                    { required: true, message: formatMessage('validation.phone-number.required') },
                                    { max: 11, message: formatMessage('validation.input.length-11') }]
                                })(
                                  <Input placeholder={formatMessage('form.input.placeholder')} style={{...style}}/>
                                )
                              }
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label={`QQ`}>
                              {
                                getFieldDecorator(`QQ`,{
                                  initialValue: '',
                                })(
                                  <Input placeholder={formatMessage('form.input.placeholder')} style={{...style}}/>
                                )
                              }
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label={`备注`}>
                              {
                                getFieldDecorator(`tfRemark`,{
                                  initialValue: '',
                                })(
                                  <Input placeholder={formatMessage('form.input.placeholder')} style={{...style}}/>
                                )
                              }
                            </FormItem>
                          </Col>
                        </Row>
                      </Row>
                      <Row className='section'>
                        <div className='section-title'>
                          <span id='orgInfo' className='section-main-title'>机构信息</span>
                        </div>
                        <div className='section-content'>
                          <Row>
                            <Col span={12}>
                              <FormItem {...formItemLayout} 
                                label={(
                                  <span>
                                    信用代码&nbsp;
                                    <Tooltip title="统一社会信用码">
                                      <Icon type="exclamation-circle" />
                                    </Tooltip>
                                  </span>
                                )} hasFeedback>
                                {
                                  getFieldDecorator(`orgName`,{
                                    initialValue: '',
                                    rules: [{ required: true, message: formatMessage('validation.orgName.required'), whitespace: true }]
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')}  style={{...style}}/>
                                  )
                                }
                                <Button type='primary' style={{ float: 'right' }}>校验</Button>
                              </FormItem>
                            </Col>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`机构简称`} hasFeedback>
                                {
                                  getFieldDecorator(`orgAlias`,{
                                    initialValue: '',
                                    rules: [
                                      { max:50, message: formatMessage('validation.input.length-50')},
                                    ]
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`机构名称`} hasFeedback>
                                {
                                  getFieldDecorator(`orgName`,{
                                    initialValue: '',
                                    rules: [{ required: true, message: formatMessage('validation.orgName.required'), whitespace: true }]
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`省市区`} hasFeedback>
                                {
                                  getFieldDecorator(`residence`,{
                                    initialValue: ['湖北', '武汉', '江汉区'],
                                    rules: [
                                      { type: 'array' },
                                      { required: true, message: formatMessage('validation.residence.required')}
                                    ],
                                  })(
                                    <Cascader options={citysData} disabled={disabled} style={{...style}} placeholder={formatMessage('form.select.placeholder')}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`联系人`}>
                                {
                                  getFieldDecorator(`lxr`,{
                                    initialValue: '',
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`联系电话`} hasFeedback>
                                {
                                  getFieldDecorator(`lxdh`,{
                                    initialValue: '',
                                    rules: [{required: true, message: formatMessage('validation.phone-number.required') },
                                    { min:8, message: formatMessage('validation.phone.min.length-8') },
                                    { pattern: /^\d+$/,message: formatMessage('validation.phone.number.format')},
                                    { max:11, message: formatMessage('validation.phone.max.length-11') }],
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`住所`}>
                                {
                                  getFieldDecorator(`tfAddress`,{
                                    initialValue: '',
                                    rules:[{max:50, message: formatMessage('validation.input.length-50') }]
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`企业类型`} hasFeedback>
                                {
                                  getFieldDecorator(`corporationType`,{
                                    rules: [
                                      { required: true, message: formatMessage('validation.corporationType.required') },
                                    ]
                                  })(
                                    <Select placeholder={formatMessage('form.select.placeholder')} disabled={disabled} style={{...style}}>
                                      <Option value='00'>类型一</Option>
                                      <Option value='01'>类型二</Option>
                                    </Select>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`开户银行`} hasFeedback>
                                {
                                  getFieldDecorator(`tfBank`,{
                                    initialValue: '',
                                    rules:[
                                      { required: true, message: formatMessage('validation.tfBank.required')},
                                      { max:50, message: formatMessage('validation.input.length-50')},
                                    ]
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`对公银行账号`}>
                                {
                                  getFieldDecorator(`bankAccount`,{
                                    initialValue: '',
                                    rules:[{max:50, message: formatMessage('validation.input.length-50') }]
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`注册资本`} hasFeedback>
                                {
                                  getFieldDecorator(`rmbAmount`,{
                                    initialValue: '',
                                    rules: [
                                      {pattern: /^\d+$/,message: formatMessage('validation.phone.number.format')},
                                      {required: true, message:  formatMessage('validation.rmbAmount.required') },
                                      {max:'16', message: formatMessage('validation.input.length-16') }
                                    ],
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`证件名称`}>
                                {
                                  getFieldDecorator(`yyzzCertName`,{
                                    initialValue: '营业执照',
                                    rules:[{max:50, message: formatMessage('validation.input.length-50') }]
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                            <Col span={12}>
                              <FormItem {...formItemLayout}
                                label={(
                                  <span>
                                    证件号码&nbsp;
                                    <Tooltip title={yyzzText}>
                                      <Icon type="exclamation-circle" />
                                    </Tooltip>
                                  </span>
                                )}
                                hasFeedback
                              >
                                {
                                  getFieldDecorator(`yyzzCertNo`,{
                                    rules:[
                                      { max:50, message: formatMessage('validation.input.length-50')},
                                      { required: true, message: formatMessage('validation.ylqxjyxkCertNo.required') },]
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <FormItem {...formItemLayout}
                                label={(
                                  <span>
                                    证件期限&nbsp;
                                    <Tooltip title={yyzzText}>
                                      <Icon type="exclamation-circle" />
                                    </Tooltip>
                                  </span>
                                )}
                                hasFeedback
                              >
                                {
                                  getFieldDecorator(`endDate`,{
                                    rules: [
                                      { required: true, message: formatMessage('validation.endDate.required') },
                                    ]
                                  })(
                                    <DatePicker disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <FormItem { ...uploadItemLayout }
                                label={(
                                  <span>
                                    证件附件&nbsp;
                                    <Tooltip title={yyzzText}>
                                      <Icon type="exclamation-circle" />
                                    </Tooltip>
                                  </span>
                                )}
                                hasFeedback
                                extra={formatMessage('form.upload.extra.text')}
                              >
                                {
                                  getFieldDecorator(`jyxkFile`,{
                                    initialValue: '',
                                    rules: [
                                      { required: true, message: formatMessage('validation.jyxkFile.required') },
                                    ]
                                  })(
                                    <Upload name="jyxkFile" listType="picture-card" 
                                        onChange={(info)=>{
                                            if (info.file.status === 'done') {
                                                let fileList = getFieldValue('jyxkFile').fileList;
                                                this.setState({ jyxkfiles:fileList });
                                                setFieldsValue({'jyxkFile':fileList});
                                              }
                                              else if(info.file.status === 'removed'){
                                                this.setState({jyxkfiles:[] });
                                              }
                                          }}
                                          disabled={disabled} 
                                        action={PICUPLAOD_URL}>
                                    {this.state.jyxkfiles.length >= 1 ? "" : uploadButton}
                                  </Upload>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <FormItem {...formItemLayout} label={`证件名称`}>
                                {
                                  getFieldDecorator(`certificateName`,{
                                    initialValue: '医疗器械经营企业许可证',
                                    rules:[{max:50, message: formatMessage('validation.input.length-50') }]
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                            <Col span={12}>
                              <FormItem {...formItemLayout}
                                label={(
                                  <span>
                                    证件号码&nbsp;
                                    <Tooltip title={ylqxxkText}>
                                      <Icon type="exclamation-circle" />
                                    </Tooltip>
                                  </span>
                                )}
                                hasFeedback
                              >
                                {
                                  getFieldDecorator(`ylqxjyxkCertNo`,{
                                    rules:[
                                      { max:50, message: formatMessage('validation.input.length-50')},
                                      { required: true, message: formatMessage('validation.ylqxjyxkCertNo.required') },]
                                  })(
                                    <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <FormItem {...formItemLayout}
                                label={(
                                  <span>
                                    证件期限&nbsp;
                                    <Tooltip title={ylqxxkText}>
                                      <Icon type="exclamation-circle" />
                                    </Tooltip>
                                  </span>
                                )}
                                hasFeedback
                              >
                                {
                                  getFieldDecorator(`ylqxxkz`,{
                                    initialValue: '',
                                    rules: [
                                      { required: true, message: formatMessage('validation.ylqxxkz.required') },
                                    ]
                                  })(
                                    <RangePicker showTime format="YYYY-MM-DD" disabled={disabled} style={{...style}}/>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <FormItem { ...uploadItemLayout }
                                label={(
                                  <span>
                                    证件附件&nbsp;
                                    <Tooltip title={ylqxxkText}>
                                      <Icon type="exclamation-circle" />
                                    </Tooltip>
                                  </span>
                                )}
                                hasFeedback
                                extra={formatMessage('form.upload.extra.text')}
                              >
                                {
                                  getFieldDecorator(`ylqxxk`,{
                                    initialValue: '',
                                    rules: [
                                      { required: true, message: formatMessage('validation.jyxkFile.required') },
                                    ]
                                  })(
                                    <Upload name="jyxkFile" listType="picture-card" 
                                        onChange={(info)=>{
                                            if (info.file.status === 'done') {
                                                let fileList = getFieldValue('jyxkFile').fileList;
                                                this.setState({ jyxkfiles:fileList });
                                                setFieldsValue({'jyxkFile':fileList});
                                              }
                                              else if(info.file.status === 'removed'){
                                                this.setState({jyxkfiles:[] });
                                              }
                                          }}
                                          disabled={disabled} 
                                        action={PICUPLAOD_URL}>
                                    {this.state.jyxkfiles.length >= 1 ? "" : uploadButton}
                                  </Upload>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                      <Row className='section'>
                        <div className='section-title'>
                          <span id='otherInfo' className='section-main-title'>其他</span>
                        </div>
                        <Row className='section-content'>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label={`证件名称`} hasFeedback>
                              {
                                getFieldDecorator(`yljg`,{
                                  initialValue: '销售人员授权书',
                                  rules: [{ required: true, message: formatMessage('validation.yljg.required') }]
                                })(
                                  <Input placeholder={formatMessage('form.input.placeholder')} disabled={disabled} style={{ ...style }}/>
                                )
                              }
                            </FormItem>
                          </Col>
                          <Col span={12}>
                            <FormItem {...formItemLayout} label={`证件号码`} hasFeedback>
                              {
                                getFieldDecorator(`saleCertNo`,{
                                  rules: [
                                    { required: true, message: formatMessage('validation.storageGuid.required'), whitespace: true },
                                  ]
                                })(
                                 <Input placeholder={formatMessage('form.input.placeholder')} style={{ ...style }}/>
                                )
                              }
                            </FormItem>
                          </Col>
                          <Row>
                            <Col span={24}>
                              <FormItem { ...uploadItemLayout }
                                label={'证件附件'}
                                hasFeedback
                                extra={formatMessage('form.upload.extra.text')}
                              >
                                {
                                  getFieldDecorator(`ylqxxk`,{
                                    initialValue: '',
                                    rules: [
                                      { required: true, message: formatMessage('validation.jyxkFile.required') },
                                    ]
                                  })(
                                    <Upload name="jyxkFile" listType="picture-card" 
                                        onChange={(info)=>{
                                            if (info.file.status === 'done') {
                                                let fileList = getFieldValue('jyxkFile').fileList;
                                                this.setState({ jyxkfiles:fileList });
                                                setFieldsValue({'jyxkFile':fileList});
                                              }
                                              else if(info.file.status === 'removed'){
                                                this.setState({jyxkfiles:[] });
                                              }
                                          }} 
                                        action={PICUPLAOD_URL}>
                                    {this.state.jyxkfiles.length >= 1 ? "" : uploadButton}
                                  </Upload>
                                  )
                                }
                              </FormItem>
                            </Col>
                          </Row>
                          <div>
                            <Col span={24}>
                              <FormItem {...uploadItemLayout} label={`用户协议`}>
                              {getFieldDecorator('agreementSupplier', {
                                valuePropName: 'checked',
                                rules: [
                                  { required: true, message: '请勾选!'},
                                  { validator: (rule, value, callback) => {
                                    if(!value){
                                      callback('请同意协议');
                                      return;
                                    }
                                    callback();
                                  }}
                                ]
                              })(
                                <Checkbox>我同意 <a href='http://www.baidu.com' target='_blank' rel="noopener noreferrer">协议</a></Checkbox>
                              )}
                              </FormItem>
                            </Col>
                          </div>
                        </Row>
                      </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={2}>
                  <Affix offsetTop={50}>
                    <Button type='primary' htmlType='submit' loading={loading}>提交注册</Button>
                  </Affix>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    )
  }
}
export default Register;