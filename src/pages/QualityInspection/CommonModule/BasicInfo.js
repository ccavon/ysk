/**
 * @Author: chengyafang
 * @Date: 2019-10-17 10:13:47
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-06 14:14:01
 * @file 数据审核 - 检查结果 - 查看 - 基本信息
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input, InputNumber, Radio, DatePicker } from 'antd';
import { formItemLayoutTwoThree } from '../../BasicSettings/HospitalizationCaseHome/commonLayout';

const FormItem = Form.Item;

@Form.create()
class BasicInfo extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form style={{ paddingBottom: 56 }} className={'disabled equiepDisabled'}>
          <Row>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'医疗机构'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('orgId', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'组织机构代码'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('orgCode', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'医疗保险手册(卡)号'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('years', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'医疗付费方式'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('yiliaofufeifangshi', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'健康卡号'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('jiankabgkahao', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'住院次数'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('zhuyuancishu', {

                  })(
                    <InputNumber min={0} max={99999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'性别'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('chuyuanhuanzhe', {

                  })(
                    <Radio.Group>
                      <Radio value={1}>男</Radio>
                      <Radio value={2}>女</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'出生日期'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('chushengDate', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'年龄'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('age', {

                  })(
                    <InputNumber min={0} max={9999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'国籍'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('guoji', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'(年龄不足10岁的)年龄'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('nianl', {

                  })(
                    <InputNumber min={0} max={10} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'新生儿出生体重'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('tizhong', {

                  })(
                    <InputNumber min={0} max={10} className={'full-width'} step={0.01} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'新生儿入院体重'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('ruyuantihzong', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'出生地省份'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('chushengdishengfen', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'出生地市'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('chushengdishi', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'出生地县'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('opechushnegdixian', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'籍贯市'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('jiguanshi', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'籍贯省份'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('jiguanshengfen', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'名族'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('minzu', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'省份证号'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('shenfenzhenghao', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'职业'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('job', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'婚姻'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('hunyin', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'现住址'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('xianzhudi', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'住宅电话'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('zhuzhaiphone', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'现住址邮编'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('xianAddressEmail', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'户口地址'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('hukouaddress', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'户口所在地邮政编码'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('youbian', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'工作单位及地址'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('danwei', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'单位电话'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('danweiphone', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'工作单位邮编'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('danweiyoubian', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'联系人姓名'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('lxlName', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'关系'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('gx', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'联系人地址'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('lxldz', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'联系人电话'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('lzldh', {

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
export default BasicInfo;
