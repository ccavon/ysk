/**
 * @Author: chengyafang
 * @Date: 2019-10-17 10:13:47
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-06 14:13:47
 * @file 数据审核 - 检查结果 - 查看 - 入院信息
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, DatePicker, InputNumber } from 'antd';
import { formItemLayoutTwoThree } from '../../BasicSettings/HospitalizationCaseHome/commonLayout';

const FormItem = Form.Item;

@Form.create()
class AdmissionInfo extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form style={{ paddingBottom: 56 }} className={'disabled equiepDisabled'}>
          <Row>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'入院途径'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('rytj', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'转科科别'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('zkkb', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'入院时间'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('ryTime', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'出院时间'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('cyTime', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'入院科别'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('rykb', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'出院科别'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('cykb', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'入院病房'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('rybf', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'出院病房'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('cybf', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'实际住院天数'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('sjzyts', {

                  })(
                    <InputNumber min={0} max={999999999999} className={'full-width'} />
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
export default AdmissionInfo;
