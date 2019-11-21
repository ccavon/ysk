/**
 * @Author: chengyafang
 * @Date: 2019-10-17 10:13:47
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-06 14:15:04
 * @file 数据审核 - 检查结果 - 查看 - 附页相关内容
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, DatePicker, Radio } from 'antd';
import { formItemLayoutTwoThree2 } from '../../BasicSettings/HospitalizationCaseHome/commonLayout';

const FormItem = Form.Item;

@Form.create()
class AttachedPageInfo extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form style={{ paddingBottom: 56 }} className={'disabled equiepDisabled'}>
          <Row>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'门诊医生'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('1', {
                    rules: [{ required: true, message: '请输入门诊医生' }]
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'死亡根本原因'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name2', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病人死亡是否妊娠'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name3', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'死亡时间'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name4', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'接受输血'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name5', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'输液反应'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name6', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'强求方法'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name7', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'住院期间是否出现危重'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name8', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'住院期间是否出现急症'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name9', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'住院期间是否出现疑难情况'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name10', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病案整理者'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name11', {
                    rules: [{ required: true, message: '请输入门诊医生' }]
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'传染病卡'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name12', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'肿瘤病例卡'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name13', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'是否经外院治疗'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name14', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'科研病例'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name15', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'距上一次住本院的时间'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name16', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'上一次住本院与本次住院是否因同一疾病(主要诊断)'} labelCol={{ span: 18 }} wrapperCol={{ span: 6 }}>
                {
                  getFieldDecorator('name17', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'住院期间身体约束方式'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name18', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'约束工具'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name19', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'约束原因'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name20', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'手术患者术后并发症'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name21', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'术后猝死'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name22', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'并发症名称'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name23', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'手术并发症死亡'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name24', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'围手术期死亡'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name25', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'重返手术室再手术死亡'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name26', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'重返手术室再手术'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name27', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'进行PCI后同一天进行CABG手术'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name28', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'进行PCI'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name29', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'是否非预期的重返ICU'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name30', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'是否发生人工气道脱出'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name31', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'ICU中死亡'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name32', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'使用呼吸机天数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name33', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'使用中心静脉导管天数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name34', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'清洁手术预防用抗菌药物天数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name35', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'留置导尿管天数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name36', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'重返间隔时间'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name37', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'是否发生相关肺部感染'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name38', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'是否发生相关血液感染'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('39', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'住院期间使用抗菌药物'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name39', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'是否发生相关泌尿系统感染'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name40', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'清洁手术预防抗菌药物'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name41', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'抗菌药物患者病源学检验送检'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name42', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'髋关节置换前0.5-2.0小时内给药'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name43', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'清洁手术前0.5-2.0小时内给药'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name44', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'子宫肌瘤切除前0.5-2.0小时内给药'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name45', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'膝关节置换前0.5-2.0小时内给药'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name46', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'发生压疮'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name47', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'发生手术过程中异物遗留'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name48', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'压疮分期'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name49', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'压疮发生时间'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name50', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'跌倒/坠床严重程度'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name51', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'医院内跌倒/坠床'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name52', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'发生医源性气胸'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name53', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'跌倒/坠床的原因'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name54', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'执行临床路径'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name55', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'发生医源性意外穿刺伤/撕裂伤'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name57', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'单病种质量管理/费用控制病种'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name58', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'临床路径管理'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name59', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'未纳入原因'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name60', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'纳入质控'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name61', {

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
export default AttachedPageInfo;
