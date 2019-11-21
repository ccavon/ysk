/**
 * @Author: chengyafang
 * @Date: 2019-10-17 10:13:47
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-06 14:14:09
 * @file 数据审核 - 检查结果 - 查看 - 其他及费用
 */
import React, { PureComponent } from 'react';
import { Form, Row, Col, InputNumber, Input, DatePicker, Radio } from 'antd';
import { formItemLayoutTwoThree2 } from '../../BasicSettings/HospitalizationCaseHome/commonLayout';

const FormItem = Form.Item;

@Form.create()
class OtherExpenses extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Form style={{ paddingBottom: 56 }} className={'disabled equiepDisabled'}>
          <Row>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'特级护理天数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name1', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'一级护理天数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name2', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'二级护理天数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name3', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'三级护理天数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name4', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'重症监护室名称1'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name5', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'进入时间1'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name6', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'退出时间1'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name7', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'重症监护室名称2'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name8', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'进入时间2'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name9', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'退出时间2'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name10', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'重症监护室名称3'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name11', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'进入时间3'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name12', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'退出时间3'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name13', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'重症监护室名称4'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name14', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'进入时间4'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name15', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'退出时间4'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name16', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'重症监护室名称5'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name17', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'进入时间5'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name18', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'退出时间5'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name19', {

                  })(
                    <DatePicker className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'手术/治疗/检查/诊断为本院第一例'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name20', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'手术患者类型'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name21', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'随诊'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name22', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'随诊周数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name23', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'随诊月数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name24', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'随诊年数'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name25', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'示教病例'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name26', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'输血反应'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name27', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'红细胞'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name28', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'血小板'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name29', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'血浆'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name30', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'全血'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name31', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'字体回收'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name32', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'其他'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name33', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'新生儿出生体重2'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name34', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} step={0.01} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'新生儿出生体重3'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name35', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} step={0.01} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'新生儿出生体重4'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name36', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} step={0.01} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'新生儿出生体重5'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name37', {

                  })(
                    <InputNumber min={0} max={9999999999} className={'full-width'} step={0.01} />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'离院方式'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name38', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'医嘱转院拟接收医院机构名称'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name39', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'医嘱转社区卫生/乡镇卫生院名称'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name40', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'是否有出院31天内再住院计划'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name41', {

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
              <FormItem label={'出院31天内再住院目的'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name42', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'入院前多少天(颅脑损伤患者昏迷)'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name43', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'入院前多少小时(颅脑损伤患者昏迷)'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name44', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'入院前多少分钟(颅脑损伤患者昏迷)'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name45', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'入院后多少天(颅脑损伤患者昏迷)'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name46', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'入院后多少小时(颅脑损伤患者昏迷)'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name47', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'入院后多少分钟(颅脑损伤患者昏迷)'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name48', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'呼吸机使用时间'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name49', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'住院总费用'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name50', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'住院总费用其中自付金额'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name51', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'一般医疗服务费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name52', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'一般治疗操作费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name53', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'护理费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name54', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'综合医疗服务类其他费用'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name55', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'病理诊断费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name57', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'实验室诊断费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name58', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'影像学诊断费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name59', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'临床诊断项目费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name60', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'非手术治疗项目费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('name61', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'临床物理治疗费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('62', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'手术治疗费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('63', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'麻醉费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('64', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'手术费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('65', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'康复费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('66', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'中医治疗费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('67', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'西药费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('68', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'抗菌药物费用'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('69', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'中成药费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('70', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'中草药费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('71', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'血费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('72', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'蛋白质类制品费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('73', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'球蛋白类制品费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('74', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'凝血因子类制品费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('75', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'细胞因子类制品费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('76', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'检查用一次性医用材料费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('77', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'治疗用一次性医用材料费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('78', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'手术用一次性医用材料费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('79', {

                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col {...formItemLayoutTwoThree2.colSpan}>
              <FormItem label={'其他费'} {...formItemLayoutTwoThree2}>
                {
                  getFieldDecorator('80', {

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
export default OtherExpenses;
