import React, { PureComponent } from 'react';
import { Form, Card, Row, Col, Input, Radio, DatePicker, Select, Cascader } from 'antd';
import {
  colSpan, formItemLayout, colSpan4, formItemLayoutSingle, colSpan5, colSpan6, formItemLayout2,
  formLabelLayout_10, colSpan10, colSpan12, colSpan16, formMainWrappeLayout, formAverageLayout,
  formItemLayout4, formItemSpecialLayout, formLabelLayout, formMainLabelLayout
} from './commonLayout';
import { City } from "@/utils";
import './style.less';
import { Department } from '@/constant';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;

@Form.create()
class TabPaneA extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leaveType: null,
      citys: []
    }
  }
  componentDidMount = () => {
    City(data => {
      this.setState({ citys: data });
    })
  }
  render() {
    const { leaveType, citys } = this.state;
    return (
      <React.Fragment>
        {/* labelalign: 驼峰命名格式浏览器控制台会报错 */}
        <Form labelalign={'left'} className='form'>
          <Card style={{ margin: '-24px -24px -16px' }}>
            {/* <Row>
              <Col {...colSpan}>
                <FormItem label={`健康卡号`} {...formItemLayout}>
                  <Input placeholder='请输入' />
                </FormItem>
              </Col>
              <Col {...colSpan4}>
                <FormItem label={'第'} colon={true} {...formItemLayoutSingle}>
                  <Input placeholder='请输入' addonAfter='次住院' />
                </FormItem>
              </Col>
              <Col {...colSpan4}></Col>
              <Col {...colSpan}>
                <FormItem label={`病案号`} {...formItemLayoutSingle}>
                  <Input placeholder='请输入' />
                </FormItem>
              </Col>
            </Row> */}
            <Row>
              <Col {...colSpan5}>
                <FormItem label={`姓名`} {...formItemLayout}>
                  <Input placeholder={'请输入'} />
                </FormItem>
              </Col>
              <Col {...colSpan4}>
                <FormItem label={`性别`} {...formItemLayout}>
                  <RadioGroup>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={`出生日期`} {...formItemLayout2}>
                  <DatePicker format={'YYYY-MM-DD'} />
                </FormItem>
              </Col>
              <Col {...colSpan4}>
                <FormItem label={`年龄`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`age`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan5}>
                <FormItem label={`国籍`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`nationality`)( */}
                  <Input placeholder={'请输入'} value={'湖北'} />
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan}>
                <FormItem label={`(年龄不足1周岁的) 年龄`} {...formLabelLayout}>
                  {/* {
                          getFieldDecorator(`age_month`)( */}
                  <Input addonAfter='月' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`新生儿出生体重`} {...formLabelLayout_10}>
                  {/* {
                          getFieldDecorator(`birth_weight`)( */}
                  <Input placeholder={'请输入'} addonAfter={'克'} />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`新生儿入院体重`} {...formLabelLayout_10}>
                  {/* {
                          getFieldDecorator(`in_weight`)( */}
                  <Input placeholder={'请输入'} addonAfter={'克'} />
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan6}>
                <FormItem label={`身份证号`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`idCard`)( */}
                  <Input placeholder={'请输入'} />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={`职业`} {...formItemLayout}>
                  <Select placeholder={'请选择'} allowClear>
                    <Option value={'11'}>国家公务员</Option>
                    <Option value={'13'}>专业技术人员</Option>
                    <Option value={'17'}>职员</Option>
                    <Option value={'21'}>企业管理人员</Option>
                    <Option value={'24'}>工人</Option>
                    <Option value={'27'}>农民</Option>
                    <Option value={'31'}>学生</Option>
                    <Option value={'37'}>现役军人</Option>
                    <Option value={'51'}>自由职业者</Option>
                    <Option value={'54'}>个体经营者</Option>
                    <Option value={'70'}>无业人员</Option>
                    <Option value={'80'}>退（离）休人员</Option>
                    <Option value={'90'}>其他</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col {...colSpan10}>
                <FormItem label={'婚姻'} {...formItemLayoutSingle}>
                  {/* {
                          getFieldDecorator(`marriageStatus`)( */}
                  <RadioGroup>
                    <Radio value={`1`}>未婚</Radio>
                    <Radio value={`2`}>已婚</Radio>
                    <Radio value={`3`}>丧偶</Radio>
                    <Radio value={`4`}>离婚</Radio>
                    <Radio value={`9`}>其他</Radio>
                  </RadioGroup>
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan10}>
                <FormItem label={`出生地`} {...formItemLayout}>
                  <Cascader
                    options={citys}
                    placeholder={'请选择'}
                    showSearch={(inputValue, path) => path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)}
                  />
                </FormItem>
              </Col>
              <Col {...colSpan10}>
                <FormItem label={`籍贯`} {...formItemLayout}>
                  <Cascader
                    options={citys}
                    placeholder={'请选择'}
                    showSearch={(inputValue, path) => path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)}
                  />
                </FormItem>
              </Col>
              <Col {...colSpan4}>
                <FormItem label={`名族`} {...formItemLayout}>
                  <Input placeholder='请输入' value={'汉族'} />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan12}>
                <FormItem label={`现住址`} {...formItemLayoutSingle}>
                  <React.Fragment>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                      {/* <Input addonAfter='省' />
                      <Input addonAfter='市' />
                      <Input addonAfter='县' /> */}
                      <Cascader
                        options={citys}
                        placeholder={'请选择'}
                        showSearch={(inputValue, path) => path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)}
                      />
                      <Input addonAfter='街道' />
                      <Input addonAfter='号' />
                    </div>
                  </React.Fragment>
                </FormItem>
              </Col>
              <Col {...colSpan4}>
                <FormItem label={'电话'} {...formItemLayout}>
                  <Input placeholder='请输入' />
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`邮编`} {...formItemLayout}>
                  <Input placeholder='请输入' />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan16}>
                <FormItem label={`户口地址`} {...formItemLayoutSingle}>
                  <React.Fragment>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                      {/* <Input addonAfter='省' />
                      <Input addonAfter='市' />
                      <Input addonAfter='县' /> */}
                      <Cascader
                        options={citys}
                        placeholder={'请选择'}
                        showSearch={(inputValue, path) => path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)}
                      />
                      <Input addonAfter='街道' />
                      <Input addonAfter='号' />
                    </div>
                  </React.Fragment>
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`邮编`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`nationMailCode`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan}>
                <FormItem label={`工作单位及地址`} {...formItemLayout2}>
                  {/* {
                          getFieldDecorator(`componeyAddress`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`电话`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`componeyPhone`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`邮编`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`componeyMailCode`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan6}>
                <FormItem label={`联系人姓名`} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`contactUserName`)( */}
                  <Input placeholder={'请输入'} />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan4}>
                <FormItem label={`关系`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`relationship`)( */}
                  <Input placeholder={'请输入'} />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`地址`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`address`)( */}
                  <Input placeholder={'请输入'} />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={`电话`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`contactPhone`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan10}>
                <FormItem label={`入院途径`} {...formItemLayoutSingle}>
                  {/* {
                          getFieldDecorator(`checkInTypes`)( */}
                  <RadioGroup>
                    <Radio value='1'>急诊</Radio>
                    <Radio value='2'>门诊</Radio>
                    <Radio value='3'>其他医疗机构转入</Radio>
                    <Radio value='9'>其他</Radio>
                  </RadioGroup>
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`门诊导师`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`doctorName`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan}>
                <FormItem label={`入院时间`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`checkInTime`)( */}
                  <DatePicker showTime format={'YYYY-MM-DD HH:mm'} style={{ width: '100%' }} />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}></Col>
              <Col {...colSpan}>
                <FormItem label={`出院时间`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`checkOutTime`)( */}
                  <DatePicker showTime format={'YYYY-MM-DD HH:mm'} style={{ width: '100%' }} />
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan}>
                <FormItem label={`入院科别`} {...formItemLayout}>
                  <Select placeholder={'请选择'} allowClear>
                    {
                      Department.map((item, index) => {
                        return <Option value={item.value} key={index}>{item.text}</Option>
                      })
                    }
                  </Select>
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`入院病房`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`checkInDeptName`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`转科科别`} {...formItemLayout}>
                  <Select placeholder={'请选择'} allowClear>
                    {
                      Department.map((item, index) => {
                        return <Option value={item.value} key={index}>{item.text}</Option>
                      })
                    }
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan}>
                <FormItem label={`出院科别`} {...formItemLayout}>
                  <Select placeholder={'请选择'} allowClear>
                    {
                      Department.map((item, index) => {
                        return <Option value={item.value} key={index}>{item.text}</Option>
                      })
                    }
                  </Select>
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`出院病房`} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`checkOutDeptName`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={`实际住院天数`} {...formItemLayout2}>
                  {/* {
                          getFieldDecorator(`checkInDays`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row type={'flex'} justify={'space-between'}>
              <Col {...colSpan10}>
                <FormItem label={<span className={'footerFormLable'}>{`血型`}</span>} {...formMainWrappeLayout}>
                  {/* {
                          getFieldDecorator(`bleed`)( */}
                  <RadioGroup>
                    <Radio value='1'>A</Radio>
                    <Radio value='2'>B</Radio>
                    <Radio value='3'>O</Radio>
                    <Radio value='4'>AB</Radio>
                    <Radio value='5'>不详</Radio>
                    <Radio value='6'>未查</Radio>
                  </RadioGroup>
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={<span className={'footerFormLable'}>{`Rh`}</span>} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`Rh`)( */}
                  <RadioGroup>
                    <Radio value='1'>阴</Radio>
                    <Radio value='2'>阳</Radio>
                    <Radio value='3'>不详</Radio>
                    <Radio value='4'>未查</Radio>
                  </RadioGroup>
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row type={'flex'} justify={'space-between'}>
              <Col {...colSpan}>
                <FormItem label={<span className={'footerFormLable'}>{`药物过敏`}</span>} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`drugAllergy`)( */}
                  <RadioGroup>
                    <Radio value='1'>无</Radio>
                    <Radio value='2'>有，过敏药</Radio>
                  </RadioGroup>
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan}>
                <FormItem label={<span className={'footerFormLable'}>{`死亡患者尸检`}</span>} {...formAverageLayout}>
                  {/* {
                          getFieldDecorator(`corpseCheck`)( */}
                  <RadioGroup>
                    <Radio value='1'>是</Radio>
                    <Radio value='2'>否</Radio>
                  </RadioGroup>
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`科主任`}</span>} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`mainDeptOwner`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`主任（副主任）医师`}</span>} {...formMainLabelLayout}>
                  {/* {
                          getFieldDecorator(`deptOwner`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`主任医师`}</span>} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`deptOwnerDoctor`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`住院医师`}</span>} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`checkInDoctor`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`责任护士`}</span>} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`nurse`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`进修医师`}</span>} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`furtherEduDoctor`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`实习医师`}</span>} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`internshipDoctor`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`编码员`}</span>} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`coder`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`病案质量`}</span>} {...formItemLayout}>
                  {/* {
                          getFieldDecorator(`medicalRecordQuility`)( */}
                  <RadioGroup>
                    <Radio value='1'>甲</Radio>
                    <Radio value='2'>乙</Radio>
                    <Radio value='3'>丙</Radio>
                  </RadioGroup>
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`质控医师`}</span>} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`quilityDoctor`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`质控护士`}</span>} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`quilityNurse`)( */}
                  <Input placeholder='请输入' />
                  {/* )
                        } */}
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className={'footerFormLable'}>{`质控日期`}</span>} {...formItemLayout4}>
                  {/* {
                          getFieldDecorator(`quilityDate`)( */}
                  <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} />
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...colSpan16}>
                <FormItem label={<span className={'footerFormLable'}>{`离院方式`}</span>} {...formItemLayout} labelAlign={'left'}>
                  <RadioGroup onChange={e => this.setState({ leaveType: e.target.value })} className='alignLeftRadio'>
                    <Radio value='1'>医嘱离院</Radio>
                    <Radio value='2'>
                      医嘱转院，拟接收医疗机构名称
                            <Input placeholder='请输入' disabled={leaveType !== '2'} style={{ width: 200, marginLeft: 12, display: 'inline-block' }} />
                    </Radio>
                    <Radio value='3' style={{ display: 'block' }}>
                      医嘱转社区服务机构/乡镇卫生院，拟接收医疗机构名称
                            <Input placeholder='请输入' disabled={leaveType !== '3'} style={{ width: 200, marginLeft: 12, display: 'inline-block' }} />
                    </Radio>
                    <Radio value='4'>非医嘱离院</Radio>
                    <Radio value='5'>死亡</Radio>
                    <Radio value='9'>其他</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col style={{ textAlign: 'left' }}>
                <FormItem label={<span className={'footerFormLable'}>{`是否有出院31天内再住院计划`}</span>}
                  labelAlign={'left'}
                  {...formItemSpecialLayout}
                >
                  {/* {
                          getFieldDecorator(`reCheckIn`)( */}
                  <RadioGroup>
                    <Radio value='1'>无</Radio>
                    <Radio value='2' style={{ marginLeft: 50 }}>
                      有，目的：
                                {
                        <Input placeholder='请输入' style={{ marginLeft: 12, display: 'inline-block' }} />
                      }
                    </Radio>
                  </RadioGroup>
                  {/* )
                        } */}
                </FormItem>
              </Col>
            </Row>
            {/* 住院费用 */}
            <Row>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`住院费用（元）`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan}>
                      <FormItem label={<span className={'footerFormLable'}>{`总费用`}</span>} {...formItemLayout} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`totalFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan}>
                      <FormItem label={'（自付金额'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`payBySelfFee`)( */}
                        <Input placeholder='请输入' addonAfter='）' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`1.综合医疗服务类`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan12}>
                      <FormItem label={'（1）一般医疗服务费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`primaryServiceFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（2）一般治疗操作费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`primaryTreatFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（3）护理费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`nursingFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（4）其他费用'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`nursingFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`2.诊断类`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan12}>
                      <FormItem label={'（5）病理诊断费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`illnessDiagnosisFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（6）实验室诊断费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`laboratoryDiagnosisFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（7）影像学诊断费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`imageIngDiagnosisFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（8）临床诊断项目费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`clinicalDiagnosisFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`3.治疗类`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan12}>
                      <FormItem label={'（9）非手术治疗项目费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`notOperationFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（临床物理治疗费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`clinicalPhysicsFee`)( */}
                        <Input placeholder='请输入' addonAfter='）' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan10}>
                      <FormItem label={'（10）手术治疗费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`operTreatmentFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col span={6}>
                      <FormItem label={'（麻醉费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`anaesthesiaFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col span={6}>
                      <FormItem label={'手术费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`operFee`)( */}
                        <Input placeholder='请输入' addonAfter='）' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`4.康复类`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan12}>
                      <FormItem label={'（11）康复费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`recoveryFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`5.中医类`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan12}>
                      <FormItem label={'（12）中医治疗费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`chineseMedicialFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`6.西药类`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan12}>
                      <FormItem label={'（13）西药费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`medicineFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（抗菌药物费）'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`antibioticsFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`7.中药类`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan12}>
                      <FormItem label={'（14）中成药费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`chinensPatentMedicine`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（15）中草药费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`traditionalChineseFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`8.血液和血液制品类`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan12}>
                      <FormItem label={'（16）血费'} {...formMainLabelLayout} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`bloodFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（17）白蛋白类制品费'} {...formMainLabelLayout} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`albuminFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan}>
                      <FormItem label={'（18）球蛋白类制品费'} {...formMainLabelLayout} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`globulinFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan}>
                      <FormItem label={'（19）凝血因子类制品费'} {...formMainLabelLayout} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`coagulationFactorFee `)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan}>
                      <FormItem label={'（20）细胞因子类制品费'} {...formMainLabelLayout} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`cellFactorFee `)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`9.耗材类`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan12}>
                      <FormItem label={'（21）检查用一次性医用材料费'} {...formMainLabelLayout} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`oneTimeMaterialCheckFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（22）治疗用一次性医用材料费'} {...formMainLabelLayout} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`oneTimeMaterialTreatmentFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan12}>
                      <FormItem label={'（23）手术用一次性医用材料费'} {...formMainLabelLayout} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`oneTimeMaterialOperFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={<span className={'footerFormLable'}>{`10.其他类`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                  <Row>
                    <Col {...colSpan}>
                      <FormItem label={'(24）其他费'} {...formItemLayout4} labelAlign={'left'}>
                        {/* {
                                getFieldDecorator(`otherFee`)( */}
                        <Input placeholder='请输入' />
                        {/* )
                              } */}
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
      </React.Fragment>
    )
  }
}
export default TabPaneA;