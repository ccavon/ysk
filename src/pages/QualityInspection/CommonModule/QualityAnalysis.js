/**
 * @Author: chengyafang
 * @Date: 2019-10-17 10:13:47
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-06 14:13:53
 * @file 数据审核 - 检查结果 - 查看 - 质量与分析
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, InputNumber, DatePicker, Radio } from 'antd';
import { formItemLayoutTwoThree } from '../../BasicSettings/HospitalizationCaseHome/commonLayout';

const FormItem = Form.Item;
const { MonthPicker } = DatePicker;

@Form.create()
class QualityAnalysis extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form style={{ paddingBottom: 56 }} className={'disabled equiepDisabled'}>
          <Row>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'批次'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('pici', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术次数'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('operNum', {

                  })(
                    <InputNumber min={0} max={99999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'年月'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('years', {

                  })(
                    <MonthPicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'重返手术室手术次数'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('backOperNum', {

                  })(
                    <InputNumber min={0} max={999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'DRGS编码'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('DRGSCODE', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术1是否治疗性手术'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('oper1', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否出院患者'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('chuyuanhuanzhe', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术2是否治疗性手术'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('oper2', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否手术出院患者'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('operchuyuanhuanzhe', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术3是否治疗性手术'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('oper3', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'疾病名称'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('jibingName', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术4是否治疗性手术'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('oper4', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术种类'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('operType', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术5是否治疗性手术'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('oper5', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'恶性肿瘤重点手术种类'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('exzlzdshzl', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术6是否治疗性手术'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('oper6', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'肿瘤类型'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('zhongliulei', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术7是否治疗性手术'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('oper7', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否死亡'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shifousiwang', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术8是否治疗性手术'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('oper8', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否新生儿'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shifoushengshenger', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术9是否治疗性手术'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('oper9', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否为手术期'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shifoushengshenger', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术10是否治疗性手术'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('oper10', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否择手术期'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shifouzeshenger', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否发生压疮'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shifoufashengyachuan', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否非急诊患者'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shifeifeijizhenhuanzhe', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否发生手术并发症'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shifoufashengshoushubingfazheng', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'2-31天内再住院记录'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('zaizhuyuanjil', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否发生肺部感染'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shifoufashengfeibuganran', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'当天内再住院记录'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('dangtianneizaizhuyuanjil', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'2-15天内再住院记录'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('215zaizhuyuanjil', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'重点手术次数'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('zhongdianshcishu', {

                  })(
                    <InputNumber min={0} max={9999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否发生肺栓塞'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shifoufashengfeishuansai', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'重点手术重返手术次数'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('zhongdianshoushuchongfancishu', {

                  })(
                    <InputNumber min={0} max={99999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否发生阴道分娩产伤'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('chanshang', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否ICU入院患者'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('ICUruyuan', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'新生儿是否死亡标记'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('xinshengersiwangbj', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否ICU出院患者'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('ICUchuyuan', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'48小时重返ICU记录'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('48chongfan', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否麻醉24小时死亡'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('mazui24siwang', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'是否有麻醉'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shifouyoumazui', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'风险等级'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('dengxiaodengji', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'质量评分'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('zhiliangpingfen', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    )
  }
}
export default QualityAnalysis;
