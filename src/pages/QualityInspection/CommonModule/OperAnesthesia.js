/**
 * @Author: chengyafang
 * @Date: 2019-10-17 10:13:47
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-06 14:13:22
 * @file 数据审核 - 检查结果 - 查看 - 手术麻醉
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input } from 'antd';
import { formItemLayoutTwoThree } from '../../BasicSettings/HospitalizationCaseHome/commonLayout';

const FormItem = Form.Item;

@Form.create()
class OperAnesthesia extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form style={{ paddingBottom: 56 }} className={'disabled equiepDisabled'}>
          <Row>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作编码1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name1', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作日期1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name2', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术级别1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name3', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作名称1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name4', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术操作部位1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name5', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术持续时间1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name6', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'术者1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name7', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'I助1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name8', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'II助1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name9', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'切合愈合等级1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name10', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉方式1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name11', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉分级1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name12', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉医师1'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name13', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作编码2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name14', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作日期2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name15', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术级别2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name16', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作名称2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name17', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术操作部位2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name18', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术持续时间2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name19', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'术者2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name20', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'I助2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name21', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'II助2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name22', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'切合愈合等级2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name23', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉方式2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name24', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉分级2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name25', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉医师2'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name26', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作编码3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name27', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作日期3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name28', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术级别3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name29', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作名称3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name30', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术操作部位3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name31', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术持续时间3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name32', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'术者3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name33', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'I助3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name34', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'II助3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name35', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'切合愈合等级3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name36', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉方式3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name37', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉分级3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('name39', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉医师3'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('40', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作编码4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('41', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作日期4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('42', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术级别4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('43', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作名称4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('44', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术操作部位4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('45', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术持续时间4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('46', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'术者4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('47', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'I助4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('48', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'II助4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('49', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'切合愈合等级4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('50', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉方式4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('51', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉分级4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('52', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉医师4'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('53', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作编码5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('54', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作日期5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('55', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术级别5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('56', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作名称5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('57', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术操作部位5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('58', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术持续时间5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('59', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'术者5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('60', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'I助5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('61', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'II助5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('62', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'切合愈合等级5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('63', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉方式5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('64', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉分级5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('65', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉医师5'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('66', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作编码6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('67', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作日期6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('68', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术级别6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('69', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作名称6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('70', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术操作部位6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('71', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术持续时间6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('72', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'术者6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('73', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'I助6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('74', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'II助6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('75', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'切合愈合等级6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('76', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉方式6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('77', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉分级6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('78', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉医师6'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('79', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作编码7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('80', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作日期7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('81', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术级别7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('82', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作名称7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('83', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术操作部位7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('84', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术持续时间7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('85', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'术者7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('86', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'I助7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('87', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'II助7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('88', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'切合愈合等级7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('89', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉方式7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('90', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉分级7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('91', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉医师7'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('92', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作编码8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('93', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作日期8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('94', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术级别8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('95', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作名称8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('96', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术操作部位8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('97', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术持续时间8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('98', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'术者8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('99', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'I助8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('100', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'II助8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('101', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'切合愈合等级8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('102', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉方式8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('103', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉分级8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('104', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉医师8'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('105', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作编码9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('106', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作日期9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('107', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术级别9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('108', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作名称9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('109', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术操作部位9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('110', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术持续时间9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('111', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'术者9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('112', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'I助9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('113', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'II助9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('114', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'切合愈合等级9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('115', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉方式9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('116', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉分级9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('117', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉医师9'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('118', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作编码10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('119', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作日期10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('120', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术级别10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('121', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术及操作名称10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('122', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术操作部位10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('123', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'手术持续时间10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('124', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'术者10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('125', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'I助10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('126', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'II助10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('127', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'切合愈合等级10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('128', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉方式10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('129', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉分级10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('130', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree.colSpan}>
              <FormItem label={'麻醉医师10'} {...formItemLayoutTwoThree}>
                {
                  getFieldDecorator('131', {

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
export default OperAnesthesia;
