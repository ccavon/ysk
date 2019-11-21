/**
 * @Author: chengyafang
 * @Date: 2019-10-17 10:13:47
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-10-30 09:30:23
 * @file 数据审核 - 检查结果 - 查看 - 出错信息
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input } from 'antd';
import { formItemLayoutTwo, formItemLayout } from '@/utils/commonLayout';

const FormItem = Form.Item;

@Form.create()
class ErrorInfo extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form style={{ paddingBottom: 56 }}>
          <Row >
            <Col {...formItemLayoutTwo.colSpan} offset={5}>
              <FormItem label={'病案号'} {...formItemLayout}>
                {
                  getFieldDecorator('binganhao', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwo.colSpan} offset={5}>
              <FormItem label={'姓名'} {...formItemLayout}>
                {
                  getFieldDecorator('name', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwo.colSpan} offset={5}>
              <FormItem label={'状态'} {...formItemLayout}>
                {
                  getFieldDecorator('fstate', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwo.colSpan} offset={5}>
              <FormItem label={'疑似问题'} {...formItemLayout}>
                {
                  getFieldDecorator('whatBug', {

                  })(
                    <Input.TextArea rows={6} />
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
export default ErrorInfo;
