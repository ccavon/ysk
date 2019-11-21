/**
 * @Author: chengyafang 
 * @Date: 2019-10-27 23:32:47 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-13 16:12:10
 * @file 实时数据采集 - 医保结算清单 - 详情
 */

import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, Radio, DatePicker, Card, Table, Icon } from 'antd';
import {
  colSpan6, formItemLayout2, formItemLayout, colSpan5, colSpan4, colSpan, formLabelLayoutHeadre, formLabelLayout, formItemLayoutTwo, colSpan7,
  formItemLayoutSix, formItemLayoutSingle, formItemLayout4, colSpan10, formAverageLayout, colSpan12, formItemSpecialLayout, colSpan16, formMainWrappeLayout
} from '../../BasicSettings/HospitalizationCaseHome/commonLayout';
import './style.less';
import uuid from 'uuid';
import moment from 'moment';
import { Department, getMZFS } from '@/constant';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leaveType: null,
      slowDataSource: [],
      count: 6
    }
  }
  componentWillMount = () => {
    let slowDataSource = [];
    for (let i = 0; i < 15; i++) {
      if (i < 6) {
        slowDataSource.push({
          id: `${i + 1}`
        });
      }
    };
    // slowDataSource.push({
    //   mzzdmc: this.props.data.mzzdmc,
    //   mzzddm: this.props.data.mzzddm,
    //   mzssjczbm: this.props.data.mzssjczbm,
    //   mzssjczmc: this.props.data.mzssjczmc
    // });
    this.setState({ slowDataSource });
  }
  handleAdd = () => {
    const { count, slowDataSource } = this.state;
    const newData = {
      id: 6 + count
    };
    this.setState({ slowDataSource: [...slowDataSource, newData], count: count + 1 });
  };
  onCellChange = (value = '', record, index, dataIndex, dataSource) => {
    console.log(value, record, index, dataIndex, 'oncellChange')
    const { slowDataSource } = this.state;
    let newDataSource = [], dataSourceStr = '';
    newDataSource = [...slowDataSource];
    dataSourceStr = 'indexDataSource';
    newDataSource[index][dataIndex] = value;
    this.setState({ [dataSourceStr]: [...newDataSource] });
  }
  getJobValue = code => {
    if (code === '11') {
      return '国家公务员';
    } else if (code === '13') {
      return '专业技术人员';
    } else if (code === '17') {
      return '职员';
    } else if (code === '21') {
      return '企业管理人员';
    } else if (code === '24') {
      return '工人';
    } else if (code === '27') {
      return '农民';
    } else if (code === '31') {
      return '学生';
    } else if (code === '37') {
      return '现役军人';
    } else if (code === '51') {
      return '自由职业者';
    } else if (code === '54') {
      return '个体经营者';
    } else if (code === '70') {
      return '无业人员';
    } else if (code === '80') {
      return '退（离）休人员';
    } else if (code === '90') {
      return '其他';
    }
  }
  getRelationshipValue = code => {
    if (code === '0') {
      return '本人或户主';
    } else if (code === '1') {
      return '配偶';
    } else if (code === '2') {
      return '子';
    } else if (code === '3') {
      return '女';
    } else if (code === '4') {
      return '孙子、孙女或外孙子、外孙女';
    } else if (code === '5') {
      return '父母';
    } else if (code === '6') {
      return '祖父母或外祖父母';
    } else if (code === '7') {
      return '兄、弟、姐、妹';
    } else if (code === '8') {
      return '其他';
    }
  }
  getSelectName = (list, val) => {
    let ret = list.filter(item => item.value === val);
    if (ret && !ret.length) {
      return '';
    }
    return ret && ret[0].text;
  }
  getRYBQ = (code) => {
    if (code === '1') {
      return '有';
    } else if (code === '2') {
      return '临床未确定';
    } else if (code === '3') {
      return '情况不明';
    } else if (code === '4') {
      return '无';
    }
  }
  getMZFS = (list, val) => {
    let ret = list.filter(item => item.value === val);
    if (ret && !ret.length) {
      return '';
    }
    return ret && ret[0].text;
  }
  render() {
    const { data } = this.props;
    const { slowDataSource, leaveType } = this.state;
    const slowColumns = [
      { title: '诊断名称', dataIndex: 'mzzdmc' },
      { title: '诊断代码', dataIndex: 'mzzddm' },
      { title: '手术及操作名称', dataIndex: 'mzssjczmc' },
      { title: '手术及操作代码', dataIndex: 'mzssjczbm' }
    ];
    slowColumns.forEach((item, index) => {
      item.className = 'editTableCell';
      item.render = (text, record, index) => {
        return (
          <EditableCell
            value={text ? text : ''}
            record={record}
            onEditChange={(text, record, editable) => this.onCellChange(text, record, index, `${item.dataIndex}`)}
          />
        )
      }
    });
    const zyzlInfoColumns = [
      { title: '出院西医诊断', dataIndex: 'cyxyzd' },
      { title: '疾病代码', dataIndex: 'jbdm' },
      { title: '入院病情', dataIndex: 'rybq' },
      { title: '出院中医诊断', dataIndex: 'cyzyzd' },
      { title: '疾病代码', dataIndex: 'jbCode' },
      { title: '入院病情', dataIndex: 'inbq' }
    ];
    const zyzlInfoDataSource = [
      {
        id: uuid(),
        cyxyzd: `主要诊断：${data.ZYZD}`,
        jbdm: <Input value={data.JBDM} />,
        rybq: <Input value={this.getRYBQ(data.RYBQ)} />,
        cyzyzd: `主病：${data.ZZ1}`,
        jbCode: <Input value={data.ZZ_JBBM1} />,
        inbq: <Input value={data.ZZ_RYBQ1} />
      },
      {
        id: uuid(),
        cyxyzd: `其他诊断：${data.QTZD1}`,
        jbdm: <Input value={data.JBDM1} />,
        rybq: <Input value={this.getRYBQ(data.RYBQ1)} />,
        cyzyzd: `主证：${data.ZZ2}`,
        jbCode: <Input value={data.ZZ_JBBM2} />,
        inbq: <Input value={data.ZZ_RYBQ2} />
      },
      {
        id: uuid(),
        cyxyzd: <Input value={data.QTZD8} />,
        jbdm: <Input value={data.JBDM8} />,
        rybq: <Input value={this.getRYBQ(data.RYBQ8)} />,
        cyzyzd: <Input value={data.ZZ3} />,
        jbCode: <Input value={data.ZZ_JBBM3} />,
        inbq: <Input value={data.ZZ_RYBQ3} />
      },
      {
        id: uuid(),
        cyxyzd: <Input value={data.QTZD9} />,
        jbdm: <Input value={data.JBDM9} />,
        rybq: <Input value={this.getRYBQ(data.RYBQ9)} />,
        cyzyzd: <Input value={data.ZZ4} />,
        jbCode: <Input value={data.ZZ_JBBM4} />,
        inbq: <Input value={data.ZZ_RYBQ4} />
      },
      {
        id: uuid(),
        cyxyzd: <Input value={data.QTZD2} />,
        jbdm: <Input value={data.JBDM2} />,
        rybq: <Input value={this.getRYBQ(data.RYBQ2)} />,
        cyzyzd: <Input />,
        jbCode: <Input />,
        inbq: <Input />
      },
      {
        id: uuid(),
        cyxyzd: <Input value={data.QTZD10} />,
        jbdm: <Input value={data.JBDM10} />,
        rybq: <Input value={this.getRYBQ(data.RYBQ10)} />,
        cyzyzd: <Input />,
        jbCode: <Input />,
        inbq: <Input />
      },
      {
        id: uuid(),
        cyxyzd: <Input value={data.QTZD3} />,
        jbdm: <Input value={data.JBDM3} />,
        rybq: <Input value={data.RYBQ3} />,
        cyzyzd: <Input />,
        jbCode: <Input />,
        inbq: <Input />
      },
      {
        id: uuid(),
        cyxyzd: <Input value={data.QTZD4} />,
        jbdm: <Input value={data.JBDM4} />,
        rybq: <Input value={this.getRYBQ(data.RYBQ4)} />,
        cyzyzd: <Input />,
        jbCode: <Input />,
        inbq: <Input />
      },
      {
        id: uuid(),
        cyxyzd: <Input value={data.QTZD5} />,
        jbdm: <Input value={data.JBDM5} />,
        rybq: <Input value={this.getRYBQ(data.RYBQ5)} />,
        cyzyzd: <Input />,
        jbCode: <Input />,
        inbq: <Input />
      },
      {
        id: uuid(),
        cyxyzd: <Input value={data.QTZD6} />,
        jbdm: <Input value={data.JBDM6} />,
        rybq: <Input value={this.getRYBQ(data.RYBQ6)} />,
        cyzyzd: <Input />,
        jbCode: <Input />,
        inbq: <Input />
      },
      {
        id: uuid(),
        cyxyzd: <Input value={data.QTZD7} />,
        jbdm: <Input value={data.JBDM7} />,
        rybq: <Input value={this.getRYBQ(data.RYBQ7)} />,
        cyzyzd: <Input />,
        jbCode: <Input />,
        inbq: <Input />
      }
    ];
    const operColumns = [
      { title: '手术及操作名称', dataIndex: 'operName' },
      { title: '手术及操作代码', dataIndex: 'operCode' },
      { title: '手术及操作日期', dataIndex: 'operDate' },
      { title: '麻醉方式*', dataIndex: 'mzfs' },
      { title: '术者医师姓名', dataIndex: 'szName' },
      { title: '术者医师代码', dataIndex: 'szCode' },
      { title: '麻醉医师姓名', dataIndex: 'mzName' },
      { title: '麻醉医师代码', dataIndex: 'mzCode' }
    ];
    const operDataSource = [
      {
        id: uuid(),
        operName: `主要：${data.SSJCZMC1}`,
        operCode: <Input value={data.SSJCZBM1} />,
        operDate: <Input value={data.SSJCZRQ1} />,
        mzfs: <Input value={this.getMZFS(getMZFS, data.MZFS1)} />,
        szName: <Input value={data.SZ1} />,
        szCode: <Input value={data.SZDM1} />,
        mzName: <Input value={data.MZYS1} />,
        mzCode: <Input value={data.MZYSDM1} />
      },
      {
        id: uuid(),
        operName: `其他：${data.SSJCZMC2}`,
        operCode: <Input value={data.SSJCZBM2} />,
        operDate: <Input value={data.SSJCZRQ2} />,
        mzfs: <Input value={this.getMZFS(getMZFS, data.MZFS2)} />,
        szName: <Input value={data.SZ2} />,
        szCode: <Input value={data.SZDM2} />,
        mzName: <Input value={data.MZYS2} />,
        mzCode: <Input value={data.MZYSDM2} />
      },
      {
        id: uuid(),
        operName: <Input value={data.SSJCZMC3} />,
        operCode: <Input value={data.SSJCZBM3} />,
        operDate: <Input value={data.SSJCZRQ3} />,
        mzfs: <Input value={this.getMZFS(getMZFS, data.MZFS3)} />,
        szName: <Input value={data.SZ3} />,
        szCode: <Input value={data.SZDM3} />,
        mzName: <Input value={data.MZYS3} />,
        mzCode: <Input value={data.MZYSDM3} />
      },
      {
        id: uuid(),
        operName: <Input value={data.SSJCZMC4} />,
        operCode: <Input value={data.SSJCZBM4} />,
        operDate: <Input value={data.SSJCZRQ4} />,
        mzfs: <Input value={this.getMZFS(getMZFS, data.MZFS4)} />,
        szName: <Input value={data.SZ4} />,
        szCode: <Input value={data.SZDM4} />,
        mzName: <Input value={data.MZYS4} />,
        mzCode: <Input value={data.MZYSDM4} />
      },
      {
        id: uuid(),
        operName: <Input />,
        operCode: <Input />,
        operDate: <Input />,
        mzfs: <Input />,
        szName: <Input />,
        szCode: <Input />,
        mzName: <Input />,
        mzCode: <Input />
      },
      {
        id: uuid(),
        operName: <Input />,
        operCode: <Input />,
        operDate: <Input />,
        mzfs: <Input />,
        szName: <Input />,
        szCode: <Input />,
        mzName: <Input />,
        mzCode: <Input />
      },
      {
        id: uuid(),
        operName: <Input />,
        operCode: <Input />,
        operDate: <Input />,
        mzfs: <Input />,
        szName: <Input />,
        szCode: <Input />,
        mzName: <Input />,
        mzCode: <Input />
      },
      {
        id: uuid(),
        operName: <Input />,
        operCode: <Input />,
        operDate: <Input />,
        mzfs: <Input />,
        szName: <Input />,
        szCode: <Input />,
        mzName: <Input />,
        mzCode: <Input />
      },
      {
        id: uuid(),
        operName: <Input />,
        operCode: <Input />,
        operDate: <Input />,
        mzfs: <Input />,
        szName: <Input />,
        szCode: <Input />,
        mzName: <Input />,
        mzCode: <Input />
      },
      {
        id: uuid(),
        operName: <Input />,
        operCode: <Input />,
        operDate: <Input />,
        mzfs: <Input />,
        szName: <Input />,
        szCode: <Input />,
        mzName: <Input />,
        mzCode: <Input />
      },
    ];
    const ICUColumns = [
      { title: '重症监护病房类型(CCU、NICU、EICU、SICU、PICU、RICU、其他)', dataIndex: 'icuType' },
      { title: '进重症监护室时间(_年_月_日_时_分)', dataIndex: 'icuTimeIn' },
      { title: '出重症监护室时间(_年_月_日_时_分)', dataIndex: 'icuTimeOut' },
      { title: '合计(小时)', dataIndex: 'icuTotal' }
    ];
    const ICUDataSource = [
      {
        id: uuid(),
        icuType: <Input />,
        icuTimeIn: <Input />,
        icuTimeOut: <Input />,
        icuTotal: <Input />
      },
      {
        id: uuid(),
        icuType: <Input />,
        icuTimeIn: <Input />,
        icuTimeOut: <Input />,
        icuTotal: <Input />
      },
      {
        id: uuid(),
        icuType: <Input />,
        icuTimeIn: <Input />,
        icuTimeOut: <Input />,
        icuTotal: <Input />
      }
    ];
    return (
      <div className={'ybjsqd-container page-content-two'}>
        <div className={'header'}>
          <div style={{ paddingBottom: 16 }}>
            <h1 className='pageTitle' style={{ fontSize: '2em' }}>医保结算清单</h1>
          </div>
          <Row className='hasBorder'>
            <Col {...colSpan}>
              <FormItem label={'定点医疗机构名称'} {...formLabelLayoutHeadre}>
                <Input placeholder={'请输入'} value={data && data.ddyljgmc ? data.ddyljgmc : ''} />
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem label={'定点医疗机构代码'} {...formLabelLayoutHeadre}>
                <Input placeholder={'请输入'} value={data && data.ddyljgdm ? data.ddyljgdm : ''} />
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem label={'医保结算等级'} {...formLabelLayoutHeadre}>
                <Input placeholder={'请输入'} value={data && data.ybjsdj ? data.ybjsdj : ''} />
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem label={'医保编号'} {...formLabelLayoutHeadre}>
                <Input placeholder={'请输入'} value={data && data.ybbm ? data.ybbm : ''} />
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem label={'病案号'} {...formLabelLayoutHeadre}>
                <Input placeholder={'请输入'} value={data && data.bah ? data.bah : ''} />
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem label={'申报时间'} {...formLabelLayoutHeadre}>
                <DatePicker value={data && data.sbsj ? moment(data.sbsj, 'YYYY-MM-DD') : null} />
              </FormItem>
            </Col>
          </Row>
          <Form labelAlign={'left'} className='form'>
            <Card style={{ margin: '-24px -24px -16px' }}>
              <div className={'ant-card-body-header'}>
                <h2>一、基本信息</h2>
              </div>
              <div className={'ant-card-body-content'} style={{ marginBottom: 6 }}>
                <Row>
                  <Col {...colSpan5}>
                    <FormItem label={`姓名`} {...formItemLayout}>
                      <Input placeholder={'请输入'} value={data && data.xm ? data.xm : ''} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan4}>
                    <FormItem label={`性别`} {...formItemLayout}>
                      <RadioGroup value={data && data.xb ? data.xb : ''}>
                        <Radio value='1'>男</Radio>
                        <Radio value='2'>女</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  <Col {...colSpan6}>
                    <FormItem label={`出生日期`} {...formItemLayout2}>
                      <DatePicker format={'YYYY-MM-DD'} defaultValue={data && data.CSRQ ? moment.unix(data.CSRQ) : null} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan4}>
                    <FormItem label={`年龄`} {...formItemLayout}>
                      <Input placeholder='请输入' addonAfter={'岁'} value={data && parseInt(data.NL)} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan5}>
                    <FormItem label={`国籍`} {...formItemLayout}>
                      <Input placeholder={'请输入'} value={data && data.GJ === 'CHN' ? '中国' : ''} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan}>
                    <FormItem label={`(年龄不足1周岁的) 年龄`} {...formLabelLayout}>
                      <Input addonAfter='天' value={data && data.BZYZSNL} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan4}>
                    <FormItem label={`民族`} {...formItemLayoutTwo}>
                      <Input placeholder={'请输入'} value={data && data.MZ === '01' ? '汉族' : data.MZ === '15' ? '土家族' : ''} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan6}>
                    <FormItem label={`患者证件类别`} {...formItemLayoutTwo}>
                      <Input placeholder={'请输入'} value={data && data.hzzjlb} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan6}>
                    <FormItem label={`患者证件号码`} {...formItemLayoutSix}>
                      <Input placeholder={'请输入'} value={data && data.hzzjhm} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan5}>
                    <FormItem label={`职业`} {...formItemLayout}>
                      <Input placeholder={'请输入'} value={data && data.ZY ? this.getJobValue(data.ZY) : ''} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan6}>
                    <FormItem label={`现住址`} {...formItemLayout}>
                      <React.Fragment>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }} className={'city-style'}>
                          <Input addonAfter='省' value={data && data.XZZ_SG} />
                          <Input addonAfter='市' value={data && data.XZZ_SI} />
                          <Input addonAfter='县' value={data && data.XZZ_QX} className={'city-style-county'} />
                        </div>
                      </React.Fragment>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan6}>
                    <FormItem label={`工作单位名称`} {...formItemLayoutTwo}>
                      <Input placeholder={'请输入'} value={data && data.gzdwmc} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan6}>
                    <FormItem label={`工作单位地址`} {...formItemLayoutSix}>
                      <Input placeholder={'请输入'} value={data && data.GZDWJDZ} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan6}>
                    <FormItem label={`单位电话`} {...formItemLayout2}>
                      <Input placeholder={'请输入'} value={data && data.DWDH} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan5}>
                    <FormItem label={`邮编`} {...formItemLayout}>
                      <Input placeholder={'请输入'} value={data && data.YB3} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan6}>
                    <FormItem label={`联系人姓名`} {...formItemLayout4}>
                      <Input placeholder={'请输入'} value={data && data.LXRXM} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan4}>
                    <FormItem label={`关系`} {...formItemLayout}>
                      <Input placeholder={'请输入'} value={data && data.GX ? this.getRelationshipValue(data.GX) : ''} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`地址`} {...formItemLayoutSingle}>
                      <React.Fragment>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                          <Input addonAfter='省' value={'湖北省'} />
                          <Input addonAfter='市' value={data && data.DZ_QX} />
                          <Input addonAfter='县' />
                        </div>
                      </React.Fragment>
                    </FormItem>
                  </Col>
                  <Col {...colSpan5}>
                    <FormItem label={`电话`} {...formItemLayout}>
                      <Input placeholder='请输入' value={data && data.DH2} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan}>
                    <FormItem label={`医保类型`} {...formItemLayout2}>
                      <Input placeholder='请输入' value={data && data.yblx} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`特殊人员类型`} {...formItemLayout2}>
                      <Input placeholder='请输入' value={data && data.tsrylx} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`参保地`} {...formItemLayout2}>
                      <Input placeholder='请输入' value={data && data.cbd} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan}>
                    <FormItem label={`新生儿入院类型`} {...formItemLayout2}>
                      <Input placeholder='请输入' value={data && data.xserylx} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`新生儿出生体重`} {...formItemLayout2}>
                      <Input placeholder='请输入' addonAfter={'克'} value={data && data.XSECSTZ} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`新生儿入院体重`} {...formItemLayout2}>
                      <Input placeholder='请输入' addonAfter={'克'} value={data && data.XSERYTZ} />
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Card>
          </Form>
          <Form className='form' style={{ marginTop: -8 }}>
            <Card style={{ margin: '-24px -24px -16px' }}>
              <div className={'ant-card-body-header'}>
                <h2>二、门诊慢特病诊疗信息</h2>
              </div>
              <div className={'ant-card-body-content'} style={{ padding: 0 }}>
                <Table
                  bordered
                  pagination={false}
                  scroll={{ x: '100%' }}
                  rowKey={'id'}
                  title={() => (
                    <React.Fragment>
                      <Row>
                        <Col {...colSpan}>
                          <FormItem label={`诊断科别`} {...formItemLayoutTwo}>
                            <Input placeholder={'请输入'} value={data && data.mzzdkb} />
                          </FormItem>
                        </Col>
                        <Col {...colSpan}>
                          <FormItem label={`就诊日期`} {...formItemLayoutTwo}>
                            <DatePicker style={{ width: '100%' }} />
                          </FormItem>
                        </Col>
                        <Col {...colSpan} style={{ marginTop: 10 }}>
                          <a onClick={this.handleAdd}><Icon type="plus" /></a>
                        </Col>
                      </Row>
                    </React.Fragment>
                  )}
                  columns={slowColumns}
                  dataSource={slowDataSource}
                  size={'middle'}
                />
              </div>
            </Card>
          </Form>
          <Form className='form' style={{ marginTop: -8 }}>
            <Card style={{ margin: '-24px -24px -16px' }}>
              <div className={'ant-card-body-header'}>
                <h2>三、住院诊疗信息</h2>
              </div>
              <div className={'ant-card-body-content'}>
                <Row>
                  <Col style={{ textAlign: 'left' }}>
                    <FormItem label={`住院医疗类型`} {...formMainWrappeLayout}>
                      <RadioGroup value={data && data.zyyllx}>
                        <Radio value='1'>住院</Radio>
                        <Radio value='2'>日间手术</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: 'left' }}>
                    <FormItem label={`入院途径`} {...formMainWrappeLayout}>
                      <RadioGroup value={data && data.RYTJ}>
                        <Radio value='1'>急诊</Radio>
                        <Radio value='2'>门诊</Radio>
                        <Radio value='3'>其他医院机构转入</Radio>
                        <Radio value='9'>其他</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: 'left' }}>
                    <FormItem label={`治疗类别`} {...formMainWrappeLayout}>
                      <RadioGroup value={data && data.zllb}>
                        <Radio value='1'>西医</Radio>
                        <Radio value='2'>中医（2.1 中医 2.2 民族医）</Radio>
                        <Radio value='3'>中西医</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan}>
                    <FormItem label={`入院时间`} {...formItemLayout}>
                      <DatePicker style={{ width: '100%' }} defaultValue={moment(data.RYSJ, 'YYYYMMDD')} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`入院科别`} {...formItemLayout}>
                      <Input placeholder='请输入' value={this.getSelectName(Department, data.RYKB)} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`转科科别`} {...formItemLayout}>
                      <Input placeholder='请输入' value={this.getSelectName(Department, data.ZKKB)} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan}>
                    <FormItem label={`出院时间`} {...formItemLayout}>
                      <DatePicker style={{ width: '100%' }} defaultValue={moment(data.CYSJ, 'YYYYMMDD')} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`出院科别`} {...formItemLayout}>
                      <Input placeholder='请输入' value={this.getSelectName(Department, data.ZKKB)} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`实际住院`} {...formItemLayout}>
                      <Input placeholder='请输入' addonAfter={'天'} defaultValue={data && data.SJZYTS} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan}>
                    <FormItem label={'门（急）诊诊断（西医诊断）'} {...formAverageLayout}>
                      <Input placeholder={'请输入'} value={data && data.MZZD_XYZD} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={'疾病代码 '} {...formItemLayout}>
                      <Input placeholder={'请输入'} value={data && data.XY_JBBM} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan}>
                    <FormItem label={'门（急）诊诊断（中医诊断）'} {...formAverageLayout}>
                      <Input placeholder={'请输入'} value={data && data.MZZD_ZYZD} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={'疾病代码 '} {...formItemLayout}>
                      <Input placeholder={'请输入'} value={data && data.ZY_JBDM} />
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <Table
                className={'extreTableStyle'}
                size={'small'}
                bordered
                pagination={false}
                columns={zyzlInfoColumns}
                rowKey={'id'}
                dataSource={zyzlInfoDataSource}
                scroll={{ x: '100%' }}
                footer={() => {
                  return (
                    <Row>
                      <Col {...colSpan7}>
                        <FormItem label={'诊断代码计数'} {...formItemLayout2}>
                          <Input placeholder={'请输入'} value={data && data.zdjsdm} />
                        </FormItem>
                      </Col>
                    </Row>
                  )
                }}
              />
              <Table
                className={'extreTableStyle'}
                size={'small'}
                bordered
                pagination={false}
                columns={operColumns}
                rowKey={'id'}
                dataSource={operDataSource}
                scroll={{ x: '100%' }}
                footer={() => {
                  return (
                    <Row>
                      <Col {...colSpan10}>
                        <FormItem label={'手术及操作代码计数'} {...formItemLayout2}>
                          <Input placeholder={'请输入'} value={data.ssjczdmjs} />
                        </FormItem>
                      </Col>
                    </Row>
                  )
                }}
              />
              <div className={'ant-card-body-content'}>
                <Row>
                  <Col {...colSpan12}>
                    <FormItem label={'呼吸机使用时间'} {...formItemSpecialLayout}>
                      <React.Fragment>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                          <Input addonAfter='天' value={data.HXJSYSJ_T} />
                          <Input addonAfter='小时' value={data.HXJSYSJ_XS} />
                          <Input addonAfter='分钟' value={data.HXJSYSJ_F} />
                        </div>
                      </React.Fragment>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan10}>
                    <FormItem label={`颅脑损伤患者昏迷时间`} {...formItemLayout4} labelAlign={'left'}>
                      <React.Fragment>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Input addonBefore={'入院前'} />
                          <Input addonAfter='天' value={data.RYQ_T} />
                          <Input addonAfter='小时' value={data.RYQ_XS} />
                          <Input addonAfter='分钟' value={data.RYQ_F} />
                        </div>
                      </React.Fragment>
                    </FormItem>
                  </Col>
                  <Col {...colSpan6}>
                    <FormItem label={``} {...formItemLayout4} labelAlign={'left'}>
                      <React.Fragment>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Input addonBefore={'入院后'} />
                          <Input addonAfter='天' value={data.RYH_T} />
                          <Input addonAfter='小时' value={data.RYH_XS} />
                          <Input addonAfter='分钟' value={data.RYH_F} />
                        </div>
                      </React.Fragment>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <Table
                className={'extreTableStyle'}
                size={'small'}
                bordered
                pagination={false}
                columns={ICUColumns}
                rowKey={'id'}
                dataSource={ICUDataSource}
                scroll={{ x: '100%' }}
              />
              <div className={'ant-card-body-content'}>
                <Row>
                  <Col {...colSpan}>
                    <FormItem label={'输血品种'} {...formItemLayout}>
                      <Input placeholder={'请输入'} value={data.SXPZ} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={'输血量'} {...formItemLayout}>
                      <Input placeholder={'请输入'} value={data.SXL} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={'输血计量单位'} {...formItemLayout2}>
                      <Input placeholder={'请输入'} value={data.SXJLDW} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan6}>
                    <FormItem label={'特级护理天数*'} {...formItemLayout4}>
                      <Input placeholder={'请输入'} value={parseInt(data.TJHLTS)} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan6}>
                    <FormItem label={'一级护理天数*'} {...formItemLayout4}>
                      <Input placeholder={'请输入'} value={parseInt(data.YJHLTS)} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan6}>
                    <FormItem label={'二级护理天数*'} {...formItemLayout4}>
                      <Input placeholder={'请输入'} value={parseInt(data.EJHLTS)} />
                    </FormItem>
                  </Col>
                  <Col {...colSpan6}>
                    <FormItem label={'三级护理天数*'} {...formItemLayout4}>
                      <Input placeholder={'请输入'} value={parseInt(data.SJHLTS)} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan16}>
                    <FormItem label={<span className={''}>{`离院方式`}</span>} {...formItemLayout} labelAlign={'left'}>
                      <RadioGroup onChange={e => this.setState({ leaveType: e.target.value })} className='alignLeftRadio' value={data.LYFS}>

                        <Radio value='2'>
                          医嘱转院，拟接收医疗机构名称
                            <Input placeholder='请输入' disabled={leaveType !== '2'} style={{ width: 100, marginLeft: 12, display: 'inline-block' }} value={data.YZZY_YLJG} />
                          拟接收机构代码<Input value={data.YZZY_YLJGDM} disabled={leaveType !== '2'} style={{ width: 100, marginLeft: 12, display: 'inline-block' }} />
                        </Radio>
                        <Radio value='3' style={{ display: 'block' }}>
                          医嘱转社区服务机构/乡镇卫生院
                            {/* <Input placeholder='请输入' disabled={leaveType !== '3'} style={{ width: 200, marginLeft: 12, display: 'inline-block' }} /> */}
                        </Radio>
                        <Radio value='1'>医嘱离院</Radio>
                        <Radio value='4'>非医嘱离院</Radio>
                        <Radio value='5'>死亡</Radio>
                        <Radio value='9'>其他</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: 'left' }}>
                    <FormItem label={<span className={''}>{`是否有出院31天内再住院计划`}</span>}
                      labelAlign={'left'}
                      {...formItemSpecialLayout}
                    >
                      <RadioGroup value={data.SFZZYJH}>
                        <Radio value='1'>无</Radio>
                        <Radio value='2' style={{ marginLeft: 50 }}>
                          有，目的：{<Input placeholder='请输入' style={{ marginLeft: 12, display: 'inline-block' }} value={data.MD} />}
                        </Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Card>
          </Form>
          <table className={'idInfoTable'}>
            <tbody>
              <tr>
                <th colSpan="3" className={'one-th'}>主诊医师姓名：<Input style={{ width: '30%' }} value={data.ZZYSMC} /></th>
                <th colSpan="3" className={'one-th'}>主诊医师代码：<Input style={{ width: '30%' }} value={data.ZZYSDM} /></th>
              </tr>
              <tr>
                <th colSpan="6" style={{ background: '#bdd6ee', borderBottom: '1px solid #1b1b1b' }}>
                  <h2 style={{ marginBottom: 0 }}>四、医疗收费信息 </h2>
                </th>
              </tr>
              <tr>
                <th colSpan="1" className={'one-th'} style={{ width: '25%' }}>业务流水号：<Input style={{ width: '30%' }} value={data.YWLSH} /></th>
                <th colSpan="5" className={'one-th'}>
                  <span style={{ float: 'left' }}>结算期间：</span>
                  <span className={'one-th-span'}>
                    <Input addonAfter='年' />
                    <Input addonAfter='月' />
                    <Input addonAfter='日' />
                  </span>
                  <span style={{ float: 'left' }}>——</span>
                  <span className={'one-th-span'}>
                    <Input addonAfter='年' />
                    <Input addonAfter='月' />
                    <Input addonAfter='日' />
                  </span>
                </th>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>项目名称</td>
                <td>金额</td>
                <td>甲类</td>
                <td>乙类</td>
                <td>自费</td>
                <td>其他</td>
              </tr>
              <tr>
                <td>床位费</td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>诊察费</td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>检查费</td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>化验费</td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>治疗费</td>
                <td><Input value={data.ZLF} /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>手术费</td>
                <td><Input value={data.SSF} /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>护理费</td>
                <td><Input value={data.HLF} /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>卫生材料费</td>
                <td><Input value={data.WSCLF} /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>西药费</td>
                <td><Input value={data.XYF} /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>中药饮片费</td>
                <td><Input value={data.ZYYPF} /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>中成药费</td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>一般诊疗费</td>
                <td><Input value={data.YBZLF} /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>挂号费</td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>其他费</td>
                <td><Input value={data.QTF} /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>金额合计</td>
                <td><Input value={data.ZFY} /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td width="10%" rowSpan="10">基金支付</td>
                <td>基金支付类型</td>
                <td>金额</td>
                <td rowSpan="10">个人支付</td>
                <td rowSpan={'2'}>个人自付</td>
                <td rowSpan={'2'}><Input /></td>
              </tr>
              <tr>
                <td>医保统筹基金支付</td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>其他支付</td>
                <td><Input /></td>
                <td rowSpan={'2'}>个人自费</td>
                <td rowSpan={'2'}><Input value={data.GRZFLX} /></td>
              </tr>
              <tr>
                <td>大病保险</td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>医疗救助</td>
                <td><Input /></td>
                <td rowSpan={'3'}>个人账户支付</td>
                <td rowSpan={'3'}><Input /></td>
              </tr>
              <tr>
                <td>公务员医疗补助</td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>大额补充</td>
                <td><Input /></td>
              </tr>
              <tr>
                <td>企业补充</td>
                <td><Input /></td>
                <td rowSpan={'3'}>个人现金支付</td>
                <td rowSpan={'3'}><Input value={data.GRZFLXJE} /></td>
              </tr>
              <tr>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <td><Input /></td>
                <td><Input /></td>
              </tr>
              <tr>
                <th colSpan={'6'} style={{ textAlign: 'left' }}>
                  医疗支付方式：
                    <RadioGroup value={data.YBZFFS}>
                    <Radio value='1'>按项目</Radio>
                    <Radio value='2'>单病种</Radio>
                    <Radio value='3'>按病种分值</Radio>
                    <Radio value='4'>疾病诊断相关分组（DRG）</Radio>
                    <Radio value='5'>按床日</Radio>
                    <Radio value='6'>按人头</Radio>
                    <Radio value='7'>其他</Radio>
                  </RadioGroup>
                </th>
              </tr>
            </tbody>
          </table>
          <Row className='hasBorder'>
            <Col {...colSpan}>
              <FormItem label={'医疗机构填报部门'} {...formLabelLayoutHeadre}>
                <Input placeholder={'请输入'} value={data.YLJGTBBM} />
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem label={'医疗机构填报人'} {...formLabelLayoutHeadre}>
                <Input placeholder={'请输入'} value={data.YLJGTBR} />
              </FormItem>
            </Col>
          </Row>
          <div style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: 24 }}>（注：“*”代表选填数据指标）</div>
        </div>
      </div>
    )
  }
}
export default Details;

class EditableCell extends PureComponent {
  state = {
    value: this.props.value,
    record: this.props.record,
    index: this.props.index,
    editable: false,
    max: this.props.max,
  }
  handleChange = (e) => {
    const value = e.target.value ? e.target.value : '';
    this.setState({ value });
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== this.state.value && !this.state.editable) {
      this.setState({ value: nextProps.value, record: nextProps.record, index: nextProps.index });
    }
  }
  check = () => {
    this.setState({ editable: false });
    let { value, record } = this.state;
    console.log(value, record, 'dddddd')
    this.props.onEditChange(value, record);
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { max, value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                max={max}
                autoFocus
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}