/**
 * @Author: chengyafang
 * @Date: 2019-10-17 10:13:47
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-06 14:13:39
 * @file 数据审核 - 检查结果 - 查看 - 主次要诊断
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, DatePicker } from 'antd';
import { formItemLayoutTwoThree } from '../../BasicSettings/HospitalizationCaseHome/commonLayout';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@Form.create()
class MainSecondaryDiagnosis extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form style={{ paddingBottom: 56 }} className={'disabled equiepDisabled'}>
          <Row>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'门(急)诊诊断描述'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name1', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'门(急)诊诊断编码'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name2', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'入院时情况'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name3', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'入院诊断编码'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name4', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'入院诊断描述'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name5', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'入院后确诊日期'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name6', {

                  })(
                    <RangePicker />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'主要诊断疾病编码'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name7', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'主要诊断疾病描述'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name8', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'主要诊断入院病情'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name9', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'主要诊断出院情况'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name10', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病编码1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name11', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病描述1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name12', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断入院病情1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name14', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断出院情况1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name15', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病编码2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name16', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病描述2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name17', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断入院病情2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name18', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断出院情况2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name19', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病编码3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name20', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病描述3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name21', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断入院病情3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name22', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断出院情况3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name23', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病编码4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name24', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病描述4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name25', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断入院病情4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name26', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断出院情况4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name27', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病编码5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name28', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病描述5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name29', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断入院病情5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name30', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断出院情况5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name31', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病编码6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name32', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病描述6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name33', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断入院病情6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name34', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断出院情况6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name35', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病编码7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name36', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病描述7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name37', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断入院病情7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name38', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断出院情况7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name39', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病编码8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name40', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病描述8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name41', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断入院病情8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name42', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断出院情况8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name43', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病编码9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name44', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病描述9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name45', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断入院病情9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name46', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断出院情况9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name47', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病编码10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name48', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断疾病描述10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name49', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断入院病情10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name50', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'其他诊断出院情况10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name51', {

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
export default MainSecondaryDiagnosis;
