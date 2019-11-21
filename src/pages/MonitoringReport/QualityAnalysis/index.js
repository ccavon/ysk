/**
 * @Author: chengyafang 
 * @Date: 2019-11-06 15:52:20 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-14 16:10:02
 * @file 监测报告 - 质量分析
 */
import React from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TwoLayout from '@/components/TwoLayout';
import { Select, Tree, Tabs, Form, Row, Col, DatePicker, Button, Table, Checkbox, message, Modal } from 'antd';
import { Department, elementTypeSelect } from '@/constant';
import treeData from "@/assets/treeData.json";
import { responceCol, formItemLayout } from '@/utils/commonLayout';
import uuid from "uuid";
import moment from 'moment';
import Charts from "./charts";

const { Option } = Select;
const { TreeNode } = Tree;
const { TabPane } = Tabs;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const responceAloneCol = { xs: 24, sm: 12, md: 12, lg: 12, xl: 4, xxl: 4 };

const dataList = {
  columns: [
    { title: '年份', dataIndex: 'fyear' },
    { title: '出院患者人次', dataIndex: 'lv', render: (text, record, index) => <a>{text}</a> },
    { title: '手术患者出院人次', dataIndex: 'opLv', render: (text, record, index) => <a>{text}</a> },
    { title: '新生儿患者出院人次', dataIndex: 'nb', render: (text, record, index) => <a>{text}</a> }
  ],
  result: [
    { fyear: '2019', lv: 24048, opLv: 5862, nb: 687, id: uuid() },
    { fyear: '2018', lv: 46960, opLv: 11486, nb: 1433, id: uuid() },
    { fyear: '2017', lv: 46350, opLv: 11776, nb: 1537, id: uuid() },
    { fyear: '2016', lv: 43330, opLv: 11290, nb: 1271, id: uuid() }
  ],
  data: [
    {
      years: "2016",
      patient: "出院患者人次",
      number: 43330
    },
    {
      years: "2016",
      patient: "手术患者出院人次",
      number: 11290
    },
    {
      years: "2016",
      patient: "新生儿患者出院人次",
      number: 1271
    },
    {
      years: "2017",
      patient: "出院患者人次",
      number: 46350
    },
    {
      years: "2017",
      patient: "手术患者出院人次",
      number: 11776
    },
    {
      years: "2017",
      patient: "新生儿患者出院人次",
      number: 1537
    },
    {
      years: "2018",
      patient: "出院患者人次",
      number: 46960
    },
    {
      years: "2018",
      patient: "手术患者出院人次",
      number: 11486
    },
    {
      years: "2018",
      patient: "新生儿患者出院人次",
      number: 1433
    },
    {
      years: "2019",
      patient: "出院患者人次",
      number: 24048
    },
    {
      years: "2019",
      patient: "手术患者出院人次",
      number: 5862
    },
    {
      years: "2019",
      patient: "新生儿患者出院人次",
      number: 687
    }
  ]
};

@Form.create()
class QualityAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultActiveKey: '1',
      columns: [],
      dataSource: [],
      dataChart: [],
      checkedValue: false,
      elementType: elementTypeSelect[1].value,
      treeSelectedKeys: [],
      selectedKeysInfo: {},
      visible: false
    }
  }
  defaultActiveKey = key => {
    this.setState({ defaultActiveKey: key });
  }
  // 按科室汇总
  checkboxChange = e => {
    this.setState({ checkedValue: e.target.checked });
    if (e.target.checked) {
      this.setState({ elementType: 'p26y' });
    } else {
      this.setState({ elementType: 'y' });
    }
  }
  // 文档类型变化
  handleSelete = (value, option) => {
    this.setState({ elementType: value });
  }

  // treeData onSelect
  treeSelect = (selectedKeys, e) => {
    console.log(selectedKeys, e);
    this.setState({
      treeSelectedKeys: selectedKeys,
      selectedKeysInfo: e
    });
    if (selectedKeys.toString() === "1.2.1.1") {
      console.log(dataList);
      this.setState({ columns: dataList.columns, dataSource: dataList.result, dataChart: dataList.data });
    } else {
      this.setState({ columns: [], dataSource: [], dataChart: [] });
    }

  }
  // 生成报表
  generateReports = () => {
    let { selectedKeysInfo, treeSelectedKeys } = this.state;
    if (!treeSelectedKeys.length) return message.warn('请选择末级数据！');
    if (selectedKeysInfo.node.props.children) {
      message.warn('请选择末级数据！');
    } else {
      // ...上接口
    }
  }
  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { defaultActiveKey, columns, dataSource, dataChart, elementType, checkedValue, treeSelectedKeys, visible } = this.state;
    const loop = data => data.map(item => {
      if (item.children) {
        return (
          <TreeNode key={item.fcode} title={item.fdesc}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.fcode} title={item.fdesc} />;
    });
    return (
      <Authority>
        <PageHeaderWrapper title={'质量分析'} twoLayout={'twoLayoutClassNane'}>
          <TwoLayout
            LeftContent={
              <div className={'col-sty'}>
                <Select
                  placeholder={'请选择医疗机构'}
                  style={{ width: '90%', margin: '16px 0 8px' }}
                  defaultValue={'1'}
                >
                  <Option value={'1'}>胜利油田中心医院</Option>
                  <Option value={'2'}>邢台市第三医院</Option>
                </Select>
                <Select
                  placeholder={'请选择医院科室'}
                  style={{ width: '90%', margin: '8px 4px 0' }}
                  showSearch
                  allowClear
                  filterOption={(inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
                >
                  {
                    Department.map((item, index) => {
                      return <Option value={item.value} key={index}>{item.text}</Option>
                    })
                  }
                </Select>
                <div className={'treeData-redundance-hidden'}>
                  <Tree
                    autoExpandParent={false}
                    onSelect={this.treeSelect}
                    selectedKeys={treeSelectedKeys}
                  >
                    {loop(treeData)}
                  </Tree>
                </div>
              </div>
            }
            RightContent={
              <div className={'zIndexLayout-current'}>
                <Form>
                  <Row>
                    <Col {...responceCol}>
                      <FormItem label={'文档类型'} {...formItemLayout}>
                        {
                          getFieldDecorator('elementType', {
                            initialValue: elementType
                          })(
                            <Select placeholder={'请选择'} onSelect={this.handleSelete}>
                              {
                                elementTypeSelect.map((item, index) => {
                                  return <Option value={item.value} key={index}>{item.text}</Option>
                                })
                              }
                            </Select>
                          )
                        }
                      </FormItem>
                    </Col>
                    <Col {...responceAloneCol} style={{ textAlign: 'center' }}>
                      <FormItem label={''}>
                        <Checkbox onChange={this.checkboxChange} checked={checkedValue}>按科室汇总</Checkbox>
                      </FormItem>
                    </Col>
                    <Col {...responceCol}>
                      <FormItem label={'文档时间'} {...formItemLayout}>
                        {
                          getFieldDecorator('elementTime', {
                            initialValue: [moment().subtract(6, 'months'), moment(new Date())]
                          })(
                            <RangePicker />
                          )
                        }
                      </FormItem>
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                      <Button type={'primary'} htmlType={'submit'}>搜索</Button>
                      <Button style={{ marginLeft: 8 }}>重置</Button>
                    </Col>
                  </Row>
                </Form>
                <Row>
                  <Button type={'primary'} onClick={this.generateReports}>生成报表</Button>
                  <Button type={'primary'} style={{ marginLeft: 8 }} onClick={() => {
                    if (!this.state.treeSelectedKeys.length) return message.warn('请选择末级数据！');
                    if (this.state.selectedKeysInfo.node.props.children) {
                      return message.warn('请选择末级数据！');
                    } else {
                      this.setState({ visible: true });
                    }
                  }}>数据元计算与生成文档</Button>
                </Row>
                <Tabs defaultActiveKey={defaultActiveKey} onChange={this.defaultActiveKey}>
                  <TabPane tab="数据列表" key="1">
                    <Table
                      bordered
                      size={'small'}
                      className={'table-header-bg'}
                      pagination={false}
                      rowKey={'id'}
                      columns={columns}
                      dataSource={dataSource}
                    />
                  </TabPane>
                  <TabPane tab="图表" key="2">
                    {dataChart && <Charts data={dataChart} />}
                  </TabPane>
                </Tabs>
              </div>
            }
          />
          <Modal
            visible={visible}
            title={'数据元计算与生成文档'}
            centered={true}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => this.setState({ visible: false })}
            footer={null}
          >
            文档时间：<RangePicker defaultValue={[moment().subtract(6, 'months'), moment(new Date())]} />
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Button type={'primary'}>数据元计算</Button>
              <Button type={'primary'} style={{ marginLeft: 8 }}>生成文档</Button>
            </div>
          </Modal>
        </PageHeaderWrapper>
      </Authority>
    )
  }
}
export default QualityAnalysis;
