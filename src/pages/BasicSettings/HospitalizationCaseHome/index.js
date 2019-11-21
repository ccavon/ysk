/**
 * @Author: chengyafang 
 * @Date: 2019-10-21 16:18:45 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-06 15:45:31
 * @file 基础设置 - 住院病案首页
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import { Row, Col, Form, Input, Tabs, Table, Radio, DatePicker, Tag, Icon, Card } from 'antd';
import {
  formAverageLayout, colSpan16, formItemLayoutSingle, colSpan6, formItemLayout2, formItemLayout4, colSpan12, formItemLayout, TagList,
  colSpan18, formItemSpecialLayout, colSpan, formWrapperLayout, colSpan4, colSpan10, formMainLabelLayout, formLabelLayout_10,
  formMainWrappeLayout, formLabelLayout, genders, babyBirthInfo, checkOutStatus, babyBirtyType, babyInjured
} from './commonLayout';
import TabPaneA from './tabPaneA';
import './style.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const RadioGroup = Radio.Group;

const babyData = ['gender', 'ApgarScore', 'babyHeight', 'babyWeight', 'birthStatus', 'birthTime', 'checkOutStatus', 'childbirthType', 'childInjured'];
const babyDataSource = [];
for (let i = 0; i < 5; i++) {
  let obj = {
    id: i + 1
  };
  babyData.map(item => obj[item] = '');
  babyDataSource.push(obj);
}

@Form.create()
class HospitalizationCaseHome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultActiveKey: '1',
      indexDataSource: [],
      operDataSource: [],
      icuDataSource: [],
      babyDataSource: [],
      // leaveType: null,
      isRespectReOperation: null // 是否预期再手术
    }
  }
  componentWillMount = () => {
    let indexDataSource = [], operDataSource = [], icuDataSource = [], babyDataSource = [];
    for (let i = 0; i < 15; i++) {
      if (i < 3) {
        icuDataSource.push({
          id: `${i + 1}`
        })
      }
      if (i < 5) {
        babyDataSource.push({
          id: `${i + 1}`
        })
      }
      if (i < 10) {
        operDataSource.push({
          id: `${i + 1}`
        })
      }
      indexDataSource.push({
        id: `${i + 1}`
      });
    };
    this.setState({ indexDataSource, icuDataSource, babyDataSource, operDataSource });
  }
  onCellChange = (value = '', record, index, dataIndex, dataSource) => {
    console.log(value, record, index, dataIndex, 'oncellChange')
    const { defaultActiveKey, indexDataSource, operDataSource, icuDataSource, babyDataSource } = this.state;
    let newDataSource = [], dataSourceStr = '';
    if (dataSource) {
      newDataSource = [...icuDataSource];
      dataSourceStr = 'icuDataSource';
    } else {
      newDataSource = defaultActiveKey === '1' ? [...indexDataSource] : defaultActiveKey === '2' ? [...operDataSource] : [...babyDataSource];
      dataSourceStr = defaultActiveKey === '1' ? 'indexDataSource' : defaultActiveKey === '2' ? 'operDataSource' : 'babyDataSource';
    }
    newDataSource[index][dataIndex] = value;
    this.setState({ [dataSourceStr]: [...newDataSource] });
  }
  // 诊断信息：表格标题
  getTitleHtml = () => {
    return (
      <React.Fragment >
        <Row>
          <Col {...colSpan16}>
            <FormItem label={`门(急)诊诊断`} {...formItemLayoutSingle}>
              {/* {
              getFieldDecorator(`result`)( */}
              <Input placeholder={'请输入'} style={{ width: '100%' }} />
              {/* )
            } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={`疾病编码`} {...formItemLayout2}>
              {/* {
              getFieldDecorator(`outpatientIllnessCode`)( */}
              <Input placeholder='请输入' />
              {/* )
            } */}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...colSpan16}>
            <FormItem label={`入院诊断`} {...formItemLayoutSingle}>
              {/* {
              getFieldDecorator(`checkIdResult`)( */}
              <Input placeholder={'请输入'} style={{ width: '100%' }} />
              {/* )
            } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={`疾病编码`} {...formItemLayout2}>
              {/* {
              getFieldDecorator(`checkInCode`)( */}
              <Input placeholder='请输入' />
              {/* )
            } */}
            </FormItem>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
  // 诊断信息：表格尾部
  getFooterHtml = () => {
    return (
      <React.Fragment>
        <Row>
          <Col {...colSpan6}>
            <FormItem label={<span className={'footerFormLable'}>{`病理诊断名称1`}</span>} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`resultName1`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={'编码1'} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`resultCode1`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={`病理号1`} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`deseaseNo1`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={'分化程度1'} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`differentiation1`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...colSpan6}>
            <FormItem label={<span className={'footerFormLable'}>{`病理诊断名称2`}</span>} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`resultName2`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={'编码2'} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`resultCode2`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={`病理号2`} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`deseaseNo2`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={'分化程度2'} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`differentiation2`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...colSpan6}>
            <FormItem label={<span className={'footerFormLable'}>{`病理诊断名称3`}</span>} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`resultName3`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={'编码3'} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`resultCode3`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={`病理号3`} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`deseaseNo3`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan6}>
            <FormItem label={'分化程度3'} {...formItemLayout4}>
              {/* {
                getFieldDecorator(`differentiation3`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...colSpan12}>
            <FormItem label={<span className={'footerFormLable'}>{`损伤、中毒的外部原因1`}</span>} {...formItemLayout2}>
              {/* {
                getFieldDecorator(`outReason1`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan12}>
            <FormItem label={'外部原因编码1'} {...formItemLayout2}>
              {/* {
                getFieldDecorator(`outReasonCode1`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...colSpan12}>
            <FormItem label={<span className={'footerFormLable'}>{`损伤、中毒的外部原因2`}</span>} {...formItemLayout2}>
              {/* {
                getFieldDecorator(`outReason2`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan12}>
            <FormItem label={'外部原因编码2'} {...formItemLayout2}>
              {/* {
                getFieldDecorator(`outReasonCode2`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...colSpan12}>
            <FormItem label={<span className={'footerFormLable'}>{`损伤、中毒的外部原因3`}</span>} {...formItemLayout2}>
              {/* {
                getFieldDecorator(`outReason3`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan12}>
            <FormItem label={'外部原因编码3'} {...formItemLayout2}>
              {/* {
                getFieldDecorator(`outReasonCode3`)( */}
              <Input placeholder='请输入' />
              {/* )
              } */}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...colSpan12}>
            <FormItem label={<span className={'footerFormLable'}>{`入院时情况`}</span>} {...formItemLayout} labelAlign={'left'}>
              {/* {
                getFieldDecorator(`checkInStatus`)( */}
              <RadioGroup>
                <Radio value='1'>危</Radio>
                <Radio value='2'>急</Radio>
                <Radio value='3'>一般</Radio>
              </RadioGroup>
              {/* )
              } */}
            </FormItem>
          </Col>
          <Col {...colSpan12}>
            <FormItem label={`入院确诊日期`} {...formItemLayout}>
              {/* {
                getFieldDecorator(`checkInDiagnosisDate`)( */}
              <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} />
              {/* )
              } */}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label={<span className={'footerFormLable'}>{`诊断符合情况`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
              <React.Fragment>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Input addonBefore='门诊与出院 : ' placeholder={'请输入'} />
                  <Input addonBefore='入院与出院 : ' placeholder={'请输入'} />
                  <Input addonBefore='术前与术后 : ' placeholder={'请输入'} />
                  <Input addonBefore='临床与病理 : ' placeholder={'请输入'} />
                  <Input addonBefore='放射与病理 : ' placeholder={'请输入'} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  {
                    TagList.map(item => <Tag key={item.value} color={item.color}><span style={{ fontSize: 14, padding: 6 }}>{`${item.value}. ${item.text}`}</span></Tag>)
                  }
                </div>
              </React.Fragment>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label={<span className={'footerFormLable'}>{`最高诊断依据`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
              {/* {
                getFieldDecorator(`topEstDiagnose`)( */}
              <RadioGroup className='alignLeftRadio'>
                <Radio value='1'>临床</Radio>
                <Radio value='2'>X线、CT、超声波、内窥镜等</Radio>
                <Radio value='3'>手术</Radio>
                <Radio value='4'>生化、免疫</Radio>
                <Radio value='5'>细胞学、血片</Radio>
                <Radio value='6'>病理，不区分原发、继发</Radio>
                <Radio value='8'>尸检(有病理)</Radio>
                <Radio value='9'>不详</Radio>
              </RadioGroup>
              {/* )
              } */}
            </FormItem>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
  // 手术信息：表格尾部
  operFooter = () => {
    return (
      <React.Fragment>
        <Row>
          <Col {...colSpan18} style={{ textAlign: 'left' }}>
            <FormItem label={<span className={'footerFormLable'}>{`主要手术患者类型`}</span>} {...formItemSpecialLayout} labelAlign='left'>
              <RadioGroup>
                <Radio value='0'>非手术患者</Radio>
                <Radio value='1'>急诊手术</Radio>
                <Radio value='2'>择期手术</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label={<span className={'footerFormLable'}>{`危重与抢救情况`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
              <React.Fragment>
                <Row>
                  <Col {...colSpan12}>
                    <FormItem label={`住院期间是否出现危重`} labelAlign={'left'} {...formItemLayout2}>
                      <RadioGroup>
                        <Radio value='1'>是</Radio>
                        <Radio value='2'>否</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`抢救情况`} labelAlign={'left'} {...formItemLayout2}>
                      <React.Fragment>
                        <div style={{ display: 'flex' }}>
                          <Input addonBefore={'抢救'} addonAfter='次' />
                          <Input addonBefore={'成功'} addonAfter='次' />
                        </div>
                      </React.Fragment>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col {...colSpan12}>
                    <FormItem label={`住院期间会诊情况`} labelAlign={'left'} {...formItemLayout4}>
                      <RadioGroup>
                        <Radio value='1'>无会诊</Radio>
                        <Radio value='2'>院内会诊</Radio>
                        <Radio value='3'>院外会诊</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  <Col {...colSpan}>
                    <FormItem label={`是否疑难病例`} labelAlign={'left'} {...formItemLayout2}>
                      <RadioGroup>
                        <Radio value='1'>是</Radio>
                        <Radio value='2'>否</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
              </React.Fragment>
            </FormItem>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
  // 附页：表格尾部
  icuFooter = () => {
    return (
      <React.Fragment>
        <Row>
          <Col span={24}>
            <FormItem label={<span className={'footerFormLable'}>{`单病种质量管理与费用控制病种`}</span>} {...formItemLayout} labelAlign={'left'}>
              <Row>
                <Col {...colSpan6}>
                  <FormItem label={''} colon={true} {...formWrapperLayout} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`singleDeseaseControl`)( */}
                    <RadioGroup>
                      <Radio value='1'>是</Radio>
                      <Radio value='2'>否</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan6}>
                  <FormItem label={'纳入质控'} {...formItemLayout4} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`singleDeseaseControl`)( */}
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
                <Col>
                  <FormItem label={`未纳入原因`} {...formItemSpecialLayout} labelAlign='left'>
                    {/* {
                      getFieldDecorator(`singleDeseaseReason`)( */}
                    <RadioGroup className='alignLeftRadio'>
                      <Radio value='1'>转科</Radio>
                      <Radio value='2'>并发症</Radio>
                      <Radio value='3'>未愈</Radio>
                      <Radio value='4'>死亡</Radio>
                      <Radio value='5'>次要手术</Radio>
                      <Radio value='6'>次要疾病</Radio>
                      <Radio value='7'>其他</Radio>
                    </RadioGroup>
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
            <FormItem label={<span className={'footerFormLable'}>{`医院感染总次数`}</span>} {...formItemLayout} labelAlign={'left'}>
              <Row>
                <Col {...colSpan4}>
                  <FormItem {...formWrapperLayout} label={''} colon={true}>
                    {/* {
                      getFieldDecorator(`infectionTotal`)( */}
                    <Input placeholder='请输入' addonAfter={'次'} />
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan10}>
                  <FormItem label={<span className={'footerFormLable'}>{`使用中心静脉导管`}</span>} {...formAverageLayout} labelAlign='left'>
                    {/* {
                      getFieldDecorator(`veinCenterPipe`)( */}
                    <Input placeholder='请输入' addonAfter={'天'} />
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan10}>
                  <FormItem label={'是否发生相关血液感染'} {...formMainLabelLayout} labelAlign='left'>
                    {/* {
                      getFieldDecorator(`bloodInfection`)( */}
                    <RadioGroup>
                      <Radio value='1'>是</Radio>
                      <Radio value='2'>否</Radio>
                    </RadioGroup>
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
            <FormItem label={<span className={'footerFormLable'}>{`患者安全`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
              <Row>
                <Col {...colSpan12}>
                  <FormItem label={`手术过程中发生异物遗留`} labelAlign={'left'} {...formLabelLayout_10}>
                    {/* {
                      getFieldDecorator(`isLostInOperation`)( */}
                    <RadioGroup>
                      <Radio value='1'>无</Radio>
                      <Radio value='2'>有</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan12}>
                  <FormItem label={`是否发生压疮`} labelAlign={'left'} {...formLabelLayout_10}>
                    {/* {
                      getFieldDecorator(`pressUlcer`)( */}
                    <RadioGroup>
                      <Radio value='1'>无</Radio>
                      <Radio value='2'>有</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan12}>
                  <FormItem label={`压疮发生时间`} labelAlign={'left'} {...formItemLayout}>
                    {/* {
                      getFieldDecorator(`pressUlcerTime`)( */}
                    <RadioGroup>
                      <Radio value='1'>入院前</Radio>
                      <Radio value='2'>有住院期间</Radio>
                      <Radio value='3'>无</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan12}>
                  <FormItem label={`压疮分期`} labelAlign={'left'} {...formItemLayout}>
                    {/* {
                      getFieldDecorator(`pressUlcerLevel`)( */}
                    <RadioGroup>
                      <Radio value='1'>1期</Radio>
                      <Radio value='2'>2期</Radio>
                      <Radio value='3'>3期</Radio>
                      <Radio value='4'>4期</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan12}>
                  <FormItem label={`医院内跌倒/坠床`} labelAlign={'left'} {...formLabelLayout_10}>
                    {/* {
                      getFieldDecorator(`fall`)( */}
                    <RadioGroup>
                      <Radio value='1'>无</Radio>
                      <Radio value='2'>有</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan12}>
                  <FormItem label={`跌倒/坠床严重程度`} labelAlign={'left'} {...formItemLayout2}>
                    {/* {
                      getFieldDecorator(`fallLevel`)( */}
                    <RadioGroup>
                      <Radio value='0'>未造成伤害</Radio>
                      <Radio value='1'>1级</Radio>
                      <Radio value='2'>2级</Radio>
                      <Radio value='3'>3级</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan18}>
                  <FormItem label={`跌倒/坠床的原因`} labelAlign={'left'} {...formItemLayoutSingle}>
                    {/* {
                      getFieldDecorator(`fallReason`)( */}
                    <RadioGroup>
                      <Radio value='1'>健康原因</Radio>
                      <Radio value='2'>治疗、药物、麻醉原因</Radio>
                      <Radio value='3'>环境因素级</Radio>
                      <Radio value='4'>其他原因</Radio>
                      <Radio value='5'>未发生</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan12}>
                  <FormItem label={`发生医源性气胸的患者`} labelAlign={'left'} {...formLabelLayout_10}>
                    {/* {
                      getFieldDecorator(`pneumothorax`)( */}
                    <RadioGroup>
                      <Radio value='1'>无</Radio>
                      <Radio value='2'>有</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan12}>
                  <FormItem label={`发生医源性意外穿刺伤或撕裂伤`} labelAlign={'left'} {...formLabelLayout_10}>
                    {/* {
                      getFieldDecorator(`accidentPuncture`)( */}
                    <RadioGroup>
                      <Radio value='1'>无</Radio>
                      <Radio value='2'>有</Radio>
                    </RadioGroup>
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
            <FormItem label={<span className={'footerFormLable'}>{`护理级别`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
              <Row>
                <Col {...colSpan6}>
                  <FormItem label={`特级护理`} {...formItemLayout4} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`superCare`)( */}
                    <Input placeholder='请输入' addonAfter='天' />
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan6}>
                  <FormItem label={`一级护理`} {...formItemLayout4} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`primaryCare`)( */}
                    <Input placeholder='请输入' addonAfter='天' />
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan6}>
                  <FormItem label={`二级护理`} {...formItemLayout4} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`secondaryNuring`)( */}
                    <Input placeholder='请输入' addonAfter='天' />
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan6}>
                  <FormItem label={`三级护理`} {...formItemLayout4} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`tertiaryCare`)( */}
                    <Input placeholder='请输入' addonAfter='天' />
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
            <FormItem label={<span className={'footerFormLable'}>{`日常生活能力评定量表得分`}</span>} {...formItemLayout} labelAlign={'left'}>
              <Row>
                <Col {...colSpan6}>
                  <FormItem label={`入院`} {...formItemLayout4} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`checkInDailyScore`)( */}
                    <Input placeholder='请输入' addonAfter='分' />
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan6}>
                  <FormItem label={`出院`} {...formItemLayout4} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`checkOutDailyScore`)( */}
                    <Input placeholder='请输入' addonAfter='分' />
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
            <FormItem label={<span className={'footerFormLable'}>{`住院期间是否使用身体约束`}</span>} {...formItemLayout} labelAlign={'left'}>
              <Row>
                <Col {...colSpan6}>
                  <FormItem {...formWrapperLayout} label='' colon={true}>
                    {/* {
                      getFieldDecorator(`bodyBind`)( */}
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
                <Col {...colSpan}>
                  <FormItem label={`约束总时间`} {...formItemLayout4} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`bindTotalTime`)( */}
                    <Input placeholder='请输入' addonAfter='小时' />
                    {/* )
                    } */}
                  </FormItem>
                </Col>
                <Col {...colSpan12}>
                  <FormItem label={`约束数量`} {...formItemLayout4} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`bindTotalTime`)( */}
                    <RadioGroup>
                      <Radio value='1'>一处</Radio>
                      <Radio value='2'>二处</Radio>
                      <Radio value='3'>三处</Radio>
                      <Radio value='4'>其他</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col {...colSpan18}>
                  <FormItem label={`约束工具`} {...formItemLayoutSingle} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`bindTool`)( */}
                    <RadioGroup className='alignLeftRadio'>
                      <Radio value='1'>软管式</Radio>
                      <Radio value='2'>硬式管</Radio>
                      <Radio value='3'>背心</Radio>
                      <Radio value='4'>老人椅</Radio>
                      <Radio value='5'>约束带</Radio>
                      <Radio value='6'>其他</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label={`约束原因`} {...formMainWrappeLayout} labelAlign={'left'}>
                    {/* {
                      getFieldDecorator(`bindReason`)( */}
                    <RadioGroup>
                      <Radio value='1'>认知障碍</Radio>
                      <Radio value='2'>可能跌倒</Radio>
                      <Radio value='3'>行为紊乱</Radio>
                      <Radio value='4'>治疗需要</Radio>
                      <Radio value='5'>躁动</Radio>
                      <Radio value='6'>医疗限制</Radio>
                      <Radio value='7'>其他</Radio>
                    </RadioGroup>
                    {/* )
                    } */}
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
  // 产妇婴儿情况：表格尾部
  babyFooter = () => {
    return (
      <React.Fragment>
        <Row>
          <Col {...colSpan12}>
            <FormItem label={'性别'} labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
              <RadioGroup>
                {
                  genders.map((item, index) => {
                    return <Radio value={item.value} key={index}>{item.text}</Radio>
                  })
                }
              </RadioGroup>
            </FormItem>
          </Col>
          <Col {...colSpan12}>
            <FormItem label={'产出情况'} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              <RadioGroup>
                {
                  babyBirthInfo.map((item, index) => {
                    return <Radio value={item.value} key={index}>{item.text}</Radio>
                  })
                }
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...colSpan12}>
            <FormItem label={'出院情况'} {...formItemLayoutSingle}>
              <RadioGroup>
                {
                  checkOutStatus.map((item, index) => {
                    return <Radio value={item.value} key={index}>{item.text}</Radio>
                  })
                }
              </RadioGroup>
            </FormItem>
          </Col>
          <Col {...colSpan12}>
            <FormItem label={'新生儿产伤'} labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
              <RadioGroup>
                {
                  babyInjured.map((item, index) => {
                    return <Radio value={item.value} key={index}>{item.text}</Radio>
                  })
                }
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col {...colSpan12}>
            <FormItem label={'分娩方式'} {...formItemLayoutSingle}>
              <RadioGroup>
                {
                  babyBirtyType.map((item, index) => {
                    return <Radio value={item.value} key={index}>{item.text}</Radio>
                  })
                }
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { defaultActiveKey, indexDataSource, operDataSource, icuDataSource, isRespectReOperation, babyDataSource } = this.state;
    const indexColumns = [
      { title: '出院诊断名称', dataIndex: 'checkOutResultName' },
      { title: '疾病编码', dataIndex: 'diseaseCode' },
      { title: '入院病情', dataIndex: 'checkInStatus' },
      { title: '出院病情', dataIndex: 'checkOutStatus' },
    ];
    indexColumns.forEach((item, index) => {
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
    const operColumns = [
      { title: '手术及操作编码', dataIndex: 'operCode', width: 150 },
      { title: '手术及操作日期', dataIndex: 'operDate', width: 120 },
      { title: '持续时间', dataIndex: 'continueTime', width: 100 },
      { title: '手术级别', dataIndex: 'operLevel', width: 100 },
      { title: '手术部位', dataIndex: 'operLocation', width: 100 },
      { title: '手术及操作名称', dataIndex: 'operName', width: 200 },
      {
        title: '手术及操作医师',
        children: [
          {
            title: '术者',
            dataIndex: 'operator',
            width: 100,
          },
          {
            title: 'I助',
            dataIndex: 'I_operator',
            width: 100,
          },
          {
            title: 'II助',
            dataIndex: 'II_operator',
            width: 100,
          },
        ]
      },
      { title: '切口愈合等级', dataIndex: 'operHealLevel', width: 100 },
      { title: '麻醉方式', dataIndex: 'mzff', width: 100 },
      { title: '麻醉分级', dataIndex: 'mzLevel', width: 100 },
      { title: '麻醉医师', dataIndex: 'mzDoctor', width: 100 }
    ];
    operColumns.forEach((item, index) => {
      if (item.children) {
        item.children.forEach((_subItem, _subInex) => {
          _subItem.className = 'editTableCell'
          _subItem.render = (text, record, index) => {
            return (
              <EditableCell
                value={text ? text : ''}
                record={record}
                onEditChange={(text, record, editable) => this.onCellChange(text, record, index, `${_subItem.dataIndex}`)}
              />
            )
          }
        })
      } else {
        item.className = 'editTableCell'
        item.render = (text, record, index) => {
          return (
            <EditableCell
              value={text ? text : ''}
              record={record}
              onEditChange={(text, record, editable) => this.onCellChange(text, record, index, `${item.dataIndex}`)}
            />
          )
        }
      }
    });
    const ICUcolumns = [
      { title: '重症监护室名称', dataIndex: 'icuName' },
      { title: '患者进监护室患者APACHEⅡ评分', dataIndex: 'icuRate' },
      { title: '进重症监护室时间（年月日时分）', dataIndex: 'icuInTime' },
      { title: '出重症监护室时间（年月日时分）', dataIndex: 'icuOutTime' }
    ];
    ICUcolumns.forEach((item, index) => {
      item.className = 'editTableCell'
      item.render = (text, record, index) => {
        return (
          <EditableCell
            value={text ? text : ''}
            record={record}
            onEditChange={(text, record, editable) => this.onCellChange(text, record, index, `${item.dataIndex}`, 'icuDataSource')}
          />
        )
      }
    })
    const babyColumns = [
      { title: '性别', dataIndex: 'gender', width: 90 },
      { title: 'Apgar评分', dataIndex: 'ApgarScore' },
      { title: '身长CM', dataIndex: 'babyHeight' },
      { title: '体重G', dataIndex: 'babyWeight' },
      { title: '产出情况', dataIndex: 'birthStatus' },
      { title: '出生时间', dataIndex: 'birthTime' },
      { title: '出院情况', dataIndex: 'checkOutStatus' },
      { title: '分娩方式', dataIndex: 'childbirthType' },
      { title: '新生儿产伤', dataIndex: 'childInjured' },
    ];
    babyColumns.forEach((item, index) => {
      item.className = 'editTableCell'
      item.render = (text, record, index) => {
        return (
          <EditableCell
            value={text ? text : ''}
            record={record}
            onEditChange={(text, record, editable) => this.onCellChange(text, record, index, `${item.dataIndex}`)}
          />
        )
      }
    })
    return (
      <Authority>
        <div className={'zybaHome-container'}>
          <div className={'header'}>
            <div style={{ paddingBottom: 16 }}>
              <h1 className='pageTitle' style={{ fontSize: '2em' }}>住院病案首页</h1>
            </div>
            <Row className='hasBorder'>
              <Col {...colSpan6}>
                <FormItem label={<span className='orgInfo'>组织机构代码</span>} {...formAverageLayout}>
                  <Input placeholder={'请输入'} />
                </FormItem>
              </Col>
              <Col xs={{ span: 6 }} sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 2 }} xl={{ span: 2 }} xxl={{ span: 2 }}></Col>
              <Col xs={{ span: 18 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 10 }} xl={{ span: 10 }} xxl={{ span: 9 }}>
                <FormItem label={''} colon={true} {...formItemLayoutSingle} labelAlign='right'>
                  <Input className='subTitle' addonBefore={'（武汉市'} addonAfter={'医院）'} style={{ width: 380 }} />
                </FormItem>
              </Col>
              <Col xs={{ span: 18 }} sm={{ span: 18 }} md={{ span: 16 }} lg={{ span: 6 }} xl={{ span: 6 }} xxl={{ span: 6 }}>
                <div style={{ overflow: 'hidden', textAlign: 'center' }}>
                  <img alt='我是一个二维码' src={require('@/assets/201700006.png')} style={{ width: 120, marginRight: 48 }} />
                  <img alt='我是一个条形二维码' src={require('@/assets/barcode.svg')} style={{ transform: `scale(1.5)` }} />
                </div>
              </Col>
            </Row>
            <Row className='hasBorder'>
              <Col {...colSpan6}>
                <FormItem label={<span className='orgInfo'>医疗付费方式</span>} {...formAverageLayout}>
                  <Input placeholder={'请输入'} />
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className='orgInfo'>健康卡号</span>} {...formAverageLayout}>
                  <Input placeholder={'请输入'} />
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className='orgInfo'>第</span>} {...formAverageLayout}>
                  <Input placeholder='请输入' addonAfter='次住院' value={'1'} />
                </FormItem>
              </Col>
              <Col {...colSpan6}>
                <FormItem label={<span className='orgInfo'>病案号</span>} {...formAverageLayout}>
                  <Input placeholder={'请输入'} value={'201700006'} />
                </FormItem>
              </Col>
            </Row>
            <Tabs defaultActiveKey={defaultActiveKey} onChange={defaultActiveKey => this.setState({ defaultActiveKey })} className='tab'>
              <TabPane tab={<span className='tabTitle'>基本信息</span>} key={'1'}>
                <TabPaneA />
              </TabPane>
              <TabPane tab={<span className='tabTitle'>诊断信息</span>} key={'2'}>
                <Table
                  title={this.getTitleHtml}
                  bordered
                  rowKey={'id'}
                  columns={indexColumns}
                  dataSource={indexDataSource}
                  pagination={false}
                  scroll={{ x: '100%' }}
                  footer={this.getFooterHtml}
                  size={'middle'}
                  className={'table-header-bg'}
                />
              </TabPane>
              <TabPane tab={<span className='tabTitle'>手术信息</span>} key={'3'}>
                <Table
                  bordered
                  columns={operColumns}
                  pagination={false}
                  dataSource={operDataSource}
                  rowKey={'id'}
                  scroll={{ x: '150%' }}
                  footer={this.operFooter}
                  size={'middle'}
                  className={'table-header-bg'}
                />
              </TabPane>
              <TabPane tab={<span className='tabTitle'>附页</span>} key={'4'}>
                <Card>
                  <Row>
                    <Col {...colSpan}>
                      <FormItem label={<span className={'footerFormLable'}>{`是否随诊`}</span>} {...formItemLayout} labelAlign={'left'}>
                        {/* {
                        getFieldDecorator(`isFollowRescue`)( */}
                        <RadioGroup>
                          <Radio value='1'>是</Radio>
                          <Radio value='2'>否</Radio>
                        </RadioGroup>
                        {/* )
                      } */}
                      </FormItem>
                    </Col>
                    <Col {...colSpan}>
                      <FormItem label={`随诊期限`} {...formItemLayout} labelAlign={'left'}>
                        <React.Fragment>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Input addonAfter='年' />
                            <Input addonAfter='月' />
                            <Input addonAfter='周' />
                          </div>
                        </React.Fragment>
                      </FormItem>
                    </Col>
                    <Col {...colSpan}>
                      <FormItem label={<span className={'footerFormLable'}>{`示教病例`}</span>} {...formItemLayout}>
                        {/* {
                        getFieldDecorator(`isExample`)( */}
                        <RadioGroup>
                          <Radio value='1'>是</Radio>
                          <Radio value='2'>否</Radio>
                        </RadioGroup>
                        {/* )
                      } */}
                      </FormItem>
                    </Col>
                    <Col span={24}>
                      <FormItem label={<span className={'footerFormLable'}>{`手术患者术后并发症`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                        {/* {
                        getFieldDecorator(`afterOperation`)( */}
                        <RadioGroup className='alignLeftRadio'>
                          <Radio value='1'>肺栓塞</Radio>
                          <Radio value='2'>深静脉血栓</Radio>
                          <Radio value='3'>伤口感染</Radio>
                          <Radio value='4'>伤口裂开</Radio>
                          <Radio value='5'>呼吸衰竭</Radio>
                          <Radio value='6'>出血或血肿</Radio>
                          <Radio value='7'>败血症</Radio>
                          <Radio value='8'>生理/代谢紊乱</Radio>
                          <Radio value='9'>髋关节骨折</Radio>
                          <Radio value='10'>肺部感染</Radio>
                          <Radio value='11'>术后猝死</Radio>
                          <Radio value='12'>其他</Radio>
                          <Radio value='13'>无</Radio>
                        </RadioGroup>
                        {/* )
                      } */}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <FormItem label={<span className={'footerFormLable'}>{`手术风险（NISS）`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                        <React.Fragment>
                          <Row>
                            <Col {...colSpan12}>
                              <FormItem label={'分级'} {...formItemLayoutSingle}>
                                <RadioGroup>
                                  <Radio value='1'>0级</Radio>
                                  <Radio value='2'>1级</Radio>
                                  <Radio value='3'>2级</Radio>
                                  <Radio value='4'>3级</Radio>
                                </RadioGroup>
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col {...colSpan10}>
                              <FormItem label={`麻醉中发生未预期的意识障碍`} labelAlign={'left'} {...formMainLabelLayout}>
                                {/* {
                                getFieldDecorator(`mzTrouble1`)( */}
                                <RadioGroup>
                                  <Radio value='1'>是</Radio>
                                  <Radio value='2'>否</Radio>
                                </RadioGroup>
                                {/* )
                              } */}
                              </FormItem>
                            </Col>
                            <Col {...colSpan12}>
                              <FormItem label={`麻醉中因反流误吸引发呼吸系统并发症`} labelAlign={'left'} {...formMainLabelLayout}>
                                {/* {
                                getFieldDecorator(`mzTrouble2`)( */}
                                <RadioGroup>
                                  <Radio value='1'>是</Radio>
                                  <Radio value='2'>否</Radio>
                                </RadioGroup>
                                {/* )
                              } */}
                              </FormItem>
                            </Col>
                            <Col {...colSpan10}>
                              <FormItem label={`发生麻醉意外死亡`} labelAlign={'left'} {...formMainLabelLayout}>
                                {/* {
                                getFieldDecorator(`mzToDeath`)( */}
                                <RadioGroup>
                                  <Radio value='1'>是</Radio>
                                  <Radio value='2'>否</Radio>
                                </RadioGroup>
                                {/* )
                              } */}
                              </FormItem>
                            </Col>
                            <Col {...colSpan12}>
                              <FormItem label={`麻醉中出现氧饱和度降低导致低氧血症`} labelAlign={'left'} {...formMainLabelLayout}>
                                {/* {
                                getFieldDecorator(`mzToLowerOxgen`)( */}
                                <RadioGroup>
                                  <Radio value='1'>是</Radio>
                                  <Radio value='2'>否</Radio>
                                </RadioGroup>
                                {/* )
                              } */}
                              </FormItem>
                            </Col>
                            <Col {...colSpan10}>
                              <FormItem label={`发生其他非预期的相关事件`} labelAlign={'left'} {...formMainLabelLayout}>
                                {/* {
                                getFieldDecorator(`otherThingsByMz`)( */}
                                <RadioGroup>
                                  <Radio value='1'>是</Radio>
                                  <Radio value='2'>否</Radio>
                                </RadioGroup>
                                {/* )
                              } */}
                              </FormItem>
                            </Col>
                          </Row>
                        </React.Fragment>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <FormItem label={<span className={'footerFormLable'}>{`患者重返情况`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                        <React.Fragment>
                          <Row>
                            <Col {...colSpan18}>
                              <FormItem label={'距上一次住本院的时间'} labelAlign={'left'} {...formItemLayout}>
                                {/* {
                                getFieldDecorator(`lastCheckInTime`)( */}
                                <RadioGroup>
                                  <Radio value='0'>第一次住本院</Radio>
                                  <Radio value='1'>当天</Radio>
                                  <Radio value='2'>2-15天</Radio>
                                  <Radio value='3'>16-31天</Radio>
                                  <Radio value='4'>＞31天</Radio>
                                </RadioGroup>
                                {/* )
                              } */}
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col {...colSpan12}>
                              <FormItem label={`上一次住本院与本次住院是否因同一疾病(主要诊断)`} labelAlign={'left'} {...formLabelLayout}>
                                {/* {
                                getFieldDecorator(`isLastCheckInSameReason`)( */}
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
                            <Col {...colSpan12}>
                              <FormItem label={`重返手术室再手术`} labelAlign={'left'} {...formItemLayout2}>
                                {/* {
                                getFieldDecorator(`isBackReOperation`)( */}
                                <RadioGroup>
                                  <Radio value='1'>是</Radio>
                                  <Radio value='2'>否</Radio>
                                </RadioGroup>
                                {/* )
                              } */}
                              </FormItem>
                            </Col>
                            <Col {...colSpan12}>
                              <FormItem label={`再手术死亡`} labelAlign={'left'} {...formItemLayout2}>
                                {/* {
                                getFieldDecorator(`reOperationDeath`)( */}
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
                            <Col {...colSpan18}>
                              <FormItem label={`是否预期再手术`} labelAlign={'left'} {...formItemLayout}>
                                {/* {
                                getFieldDecorator(`isRespectReOperation`)( */}
                                <RadioGroup onChange={e => this.setState({ isRespectReOperation: e.target.value })}>
                                  <Radio value='1'>是</Radio>
                                  <Radio value='2'>
                                    否,
                                      <span style={{ marginLeft: 48 }}>再手术名称：</span>
                                    <Input placeholder='请输入' disabled={isRespectReOperation !== '1'} style={{ display: 'inline-block' }} />
                                  </Radio>
                                </RadioGroup>
                                {/* )
                              } */}
                              </FormItem>
                            </Col>
                          </Row>
                          <Row>
                            <Col {...colSpan12}>
                              <FormItem label={`是否进行PCI`} {...formItemLayout2} labelAlign={'left'}>
                                {/* {
                                getFieldDecorator(`isRunPCI`)( */}
                                <RadioGroup>
                                  <Radio value='1'>是</Radio>
                                  <Radio value='2'>否</Radio>
                                </RadioGroup>
                                {/* )
                              } */}
                              </FormItem>
                            </Col>
                            <Col {...colSpan12}>
                              <FormItem label={`进行PCI后是否同一天进行CABG手术`} labelAlign={'left'} {...formMainLabelLayout}>
                                {/* {
                                getFieldDecorator(`afterRunPCIRunCABG`)( */}
                                <RadioGroup>
                                  <Radio value='1'>是</Radio>
                                  <Radio value='2'>否</Radio>
                                </RadioGroup>
                                {/* )
                              } */}
                              </FormItem>
                            </Col>
                          </Row>
                        </React.Fragment>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <FormItem label={<span className={'footerFormLable'}>{`监护室情况`}</span>} {...formItemLayoutSingle} labelAlign={'left'}>
                        <Row>
                          <Col {...colSpan12}>
                            <FormItem label={`呼吸机使用时间`} {...formItemSpecialLayout} labelAlign={'left'}>
                              {/* {
                              getFieldDecorator(`respiratorRunTime`)( */}
                              <Input placeholder='请输入' addonAfter='小时' />
                              {/* )
                            } */}
                            </FormItem>
                          </Col>
                          <Col {...colSpan12}>
                            <FormItem label={`使用呼吸机抬高床头部大于30度的日数(每天2次)`} {...formMainLabelLayout} labelAlign={'left'}>
                              {/* {
                              getFieldDecorator(`respiratorRunDay`)( */}
                              <Input placeholder='请输入' addonAfter='日' />
                              {/* )
                            } */}
                            </FormItem>
                          </Col>
                          <Col {...colSpan12}>
                            <FormItem label={`呼吸机相关肺部感染`} {...formItemLayout2} labelAlign={'left'}>
                              {/* {
                              getFieldDecorator(`respiratorInfection `)( */}
                              <RadioGroup>
                                <Radio value='1'>是</Radio>
                                <Radio value='2'>否</Radio>
                              </RadioGroup>
                              {/* )
                            } */}
                            </FormItem>
                          </Col>
                          <Col {...colSpan12}>
                            <FormItem label={`是否发生人工气道脱出`} {...formMainLabelLayout} labelAlign={'left'}>
                              {/* {
                              getFieldDecorator(`isAirWayBreak`)( */}
                              <RadioGroup>
                                <Radio value='1'>是</Radio>
                                <Radio value='2'>否</Radio>
                              </RadioGroup>
                              {/* )
                            } */}
                            </FormItem>
                          </Col>
                          <Col {...colSpan18}>
                            <FormItem label={`是否非预期的重返监护室`} {...formItemLayout4} labelAlign={'left'}>
                              {/* {
                              getFieldDecorator(`isReturnICU`)( */}
                              <RadioGroup>
                                <Radio value='1'>是</Radio>
                                <Radio value='2'>否（注：指同一住院过程中转出监护室后的重返）</Radio>
                              </RadioGroup>
                              {/* )
                            } */}
                            </FormItem>
                          </Col>
                          <Col {...colSpan16}>
                            <FormItem label={`重返间隔时间`} {...formItemLayout4} labelAlign={'left'}>
                              {/* {
                              getFieldDecorator(`returnICUTime`)( */}
                              <RadioGroup>
                                <Radio value='0'>非重返</Radio>
                                <Radio value='1'>24h内</Radio>
                                <Radio value='2'>24-48h</Radio>
                                <Radio value='3'>>48h</Radio>
                              </RadioGroup>
                              {/* )
                            } */}
                            </FormItem>
                          </Col>
                          <Col {...colSpan}>
                            <FormItem label={`ICU中是否死亡`} {...formAverageLayout} labelAlign={'left'}>
                              {/* {
                              getFieldDecorator(`isDeathInICU`)( */}
                              <RadioGroup>
                                <Radio value='1'>是</Radio>
                                <Radio value='2'>否</Radio>
                              </RadioGroup>
                              {/* )
                            } */}
                            </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                    </Col>
                  </Row>
                  <Table
                    bordered
                    style={{ margin: -24 }}
                    columns={ICUcolumns}
                    pagination={false}
                    rowKey={'id'}
                    dataSource={icuDataSource}
                    scroll={{ x: '100%' }}
                    footer={this.icuFooter}
                    size={'middle'}
                    className={'table-header-bg'}
                  />
                </Card>
              </TabPane>
              <TabPane tab={<span className='tabTitle'>产妇婴儿情况</span>} key={'5'}>
                <Table
                  title={() => {
                    return (
                      <Row>
                        <Col {...colSpan12}>
                          <FormItem label={``} colon={true} wrapperCol={{ span: 24 }}>
                            <Row>
                              <Col {...colSpan6}>
                                <FormItem label={`胎次`} {...formAverageLayout}>
                                  {
                                    getFieldDecorator(`parity`)(
                                      <Input placeholder='请输入' />
                                    )
                                  }
                                </FormItem>
                              </Col>
                              <Col {...colSpan6}>
                                <FormItem label={`产次`} {...formAverageLayout}>
                                  {
                                    getFieldDecorator(`birthNum`)(
                                      <Input placeholder='请输入' />
                                    )
                                  }
                                </FormItem>
                              </Col>
                              <Col {...colSpan10}>
                                <FormItem label={`胎别`} {...formItemLayout}>
                                  {
                                    getFieldDecorator(`babyInfo`)(
                                      <RadioGroup>
                                        <Radio value='1'>单</Radio>
                                        <Radio value='2'>双</Radio>
                                        <Radio value='3'>多</Radio>
                                      </RadioGroup>
                                    )
                                  }
                                </FormItem>
                              </Col>
                            </Row>
                          </FormItem>
                        </Col>
                        <Col {...colSpan}>
                          <FormItem label={`产妇会阴破裂度`} {...formItemLayout4} labelAlign='left'>
                            {
                              getFieldDecorator(`maternalInjured`)(
                                <RadioGroup>
                                  <Radio value='1'>I</Radio>
                                  <Radio value='2'>II</Radio>
                                  <Radio value='3'>III</Radio>
                                  <Radio value='9'>其他</Radio>
                                </RadioGroup>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col {...colSpan4}>
                          <FormItem label={`接生者`} {...formAverageLayout} labelAlign='left'>
                            {
                              getFieldDecorator(`midwiveser`)(
                                <Input placeholder='请输入' />
                              )
                            }
                          </FormItem>
                        </Col>
                      </Row>
                    )
                  }}
                  bordered
                  columns={babyColumns}
                  dataSource={babyDataSource}
                  pagination={false}
                  rowKey='id'
                  scroll={{ x: '100%' }}
                  footer={this.babyFooter}
                  size={'middle'}
                  className={'table-header-bg'}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Authority>
    )
  }
}
export default HospitalizationCaseHome;

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