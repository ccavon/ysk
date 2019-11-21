/**
 * @Author: chengyafang
 * @Date: 2019-10-17 10:13:47
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-06 14:15:13
 * @file 数据审核 - 检查结果 - 查看 - 病理及医师
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, InputNumber, DatePicker } from 'antd';
import { formItemLayoutTwoThree2 } from '../../BasicSettings/HospitalizationCaseHome/commonLayout';

const FormItem = Form.Item;

@Form.create()
class PathologyPhysician extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form style={{ paddingBottom: 56 }} className={'disabled equiepDisabled'}>
          <Row>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'医院感染总次数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name1', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'损伤/中毒外部原因疾病编码1'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name2', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'损伤/中毒外部原因名称1'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name3', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'损伤/中毒外部原因疾病编码2'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name4', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'损伤/中毒外部原因名称2'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name5', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'损伤/中毒外部原因疾病编码3'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name6', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'损伤/中毒外部原因名称3'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name7', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病理诊断疾病名称1'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name8', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病理诊断疾病编码1'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name9', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病理诊断疾病名称2'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name13', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病理诊断疾病编码2'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name10', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病理诊断疾病名称3'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name14', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病理诊断疾病编码3'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name15', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病理号1'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name11', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'过敏源'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name16', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病理号2'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name12', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'药物过敏'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name17', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病理号3'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name15', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'过敏药物名称'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name19', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'死亡患者尸检'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name20', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'血型'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name21', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'RH'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('rh', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'HBS-Ag'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('HBSAG', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'HCV-Ab'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('HCVAB', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'HIV-Ab'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('HCIAB', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'门诊与出院诊断符合情况'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name22', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'入院与出院诊断符合情况'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name23', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'术前与术后诊断符合情况'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name24', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'临床与病理诊断符合情况'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name25', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'放射与病理诊断符合情况'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name26', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'抢救次数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name27', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'抢救成功次数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name28', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'最高诊断依据'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name29', {
                    rules: [{ required: true, message: '请填写最高诊断依据' }]
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'分化程度'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name30', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'科主任'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name31', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'主任(副主任)医师'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name32', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'主治医师'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name33', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'住院医师'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name34', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'责任护士'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name35', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'进修医师'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name36', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'研究生实习医师'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name37', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'实习医师'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name38', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'编码员'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name39', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病案质量'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name40', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'质控医师'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name41', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'质控护师'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name42', {
                    
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'质控日期'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name43', {
                    
                  })(
                    <DatePicker className={'full-width'} />
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
export default PathologyPhysician;
