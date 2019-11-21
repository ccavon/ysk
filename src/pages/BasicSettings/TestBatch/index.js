/**
 * @Author: chengyafang 
 * @Date: 2019-10-15 15:30:16 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-13 12:03:03
 * @file 基础设置 - 检测批次
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Select, Button, Dropdown, Menu, Icon, Divider, Modal, Form, Col, Input, message, DatePicker, Spin } from 'antd';
import { orgIdSelect } from '@/constant';
import FetchTable from '@/components/FetchTable';
import uuid from 'uuid';
import { formItemLayoutTwo, responceColTwo } from '@/utils/commonLayout';

const FormItem = Form.Item;
const { Option } = Select;
const { MonthPicker } = DatePicker;

@Form.create()
class TestBatch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      titleName: '',
      recordData: null,
      isSelected: false
    }
  }
  // 新增
  add = () => {
    this.setState({ visible: true, titleName: '新增', recordData: null });
    this.props.form.resetFields();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    setTimeout(() => {
      message.success('操作成功！');
      this.setState({ loading: false, visible: false });
    }, 500);
  }
  // 删除
  delete = () => {
    Modal.confirm({
      content: '是否确认删除？',
      onOk: () => {
        this.setState({ loading: true });
        setTimeout(() => {
          message.success('操作成功！');
          this.setState({ loading: false });
        });
      }
    });
  }
  // 数据检查
  checkData = () => {
    Modal.confirm({
      title: '确认进行数据检查吗?',
      content: '如果没有任何行被选中，将对所有批次进行检查',
      onOk: () => {
        message.info('批次状态为:"已建立未导入",只有"已导入待检查"状态的批次才能进行数据检测!');
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      },
      onCancel: () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      }
    });
  }
  // 生成检测报告
  testReport = () => {
    Modal.confirm({
      content: '是否确认生成检测报告？',
      onOk: () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      },
      onCancel: () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      }
    });
  }
  // 清除手术
  clearData = () => {
    if (this.state.isSelected === true) {
      Modal.confirm({
        content: '确认清除所选批次的数据吗?',
        onOk: () => {
          message.success('清除结束！');
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ loading: false, isSelected: false });
          }, 500);
        },
        onCancel: () => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ loading: false, isSelected: false });
          }, 500);
        }
      });
    } else {
      message.error('没有任何行被选中，无法进行清除数据操作！');
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, titleName } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key={'1'}>省厅数据提取</Menu.Item>
        <Menu.Item key={'2'}>提取文件数据</Menu.Item>
        <Menu.Item key={'3'}>传输自卫统接口</Menu.Item>
        <Menu.Item key={'4'}>大数据拆分</Menu.Item>
        <Menu.Item key={'5'}>大数据平台数据提取</Menu.Item>
        <Menu.Item key={'6'}>下载压缩包</Menu.Item>
        <Menu.Item key={'7'}>导出</Menu.Item>
        <Menu.Item key={'8'}>数据汇总</Menu.Item>
      </Menu>
    );
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      { title: '开始月份', dataIndex: 'startMonths', width: 90 },
      { title: '结束月份', dataIndex: 'endMonths', width: 90 },
      { title: '总数据量', dataIndex: 'totalNum', width: 112 },
      { title: '错误数据量', dataIndex: 'errorNum', width: 112 },
      { title: '错误字段量', dataIndex: 'errorFidles', width: 112 },
      { title: '错误率', dataIndex: 'errorRate', width: 112 },
      { title: '状态', dataIndex: 'fstate', width: 112 },
      {
        title: '操作',
        dataIndex: 'action',
        // fixed: 'right',
        align: 'center',
        width: 120,
        unMovable: true,
        render: (text, record, index) => (
          <span>
            <a onClick={() => this.setState({ visible: true, titleName: '修改', recordData: record })}>修改</a>
            <React.Fragment>
              <Divider type="vertical" />
              <a onClick={this.delete}>删除</a>
            </React.Fragment>
          </span>
        )
      }
    ];
    const dataSource = [
      {
        id: uuid(),
        name: '日常检查',
        startMonths: '',
        endMonths: '',
        totalNum: '0',
        errorNum: '0',
        errorFidles: '0',
        errorRate: '0%',
        fstate: '已建立未导入'
      },
      {
        id: uuid(),
        name: '荆州市中心医院(2016-01至2016-12)',
        startMonths: '2016-01',
        endMonths: '2016-12',
        totalNum: '0',
        errorNum: '0',
        errorFidles: '0',
        errorRate: '0%',
        fstate: '已建立未导入'
      },
      {
        id: uuid(),
        name: '荆州市中心医院(2017-01至2017-12)',
        startMonths: '2017-01',
        endMonths: '2017-12',
        totalNum: '0',
        errorNum: '0',
        errorFidles: '0',
        errorRate: '0%',
        fstate: '已建立未导入'
      },
      {
        id: uuid(),
        name: '荆州市中心医院(2018-01至2018-12)',
        startMonths: '2018-01',
        endMonths: '2018-12',
        totalNum: '80513',
        errorNum: '80513',
        errorFidles: '84',
        errorRate: '24.38%',
        fstate: '检查结束'
      },
      {
        id: uuid(),
        name: '河北省遵化市人民医院(2017-01至2017-12)',
        startMonths: '2017-12',
        endMonths: '2017-12',
        totalNum: '57578',
        errorNum: '57578',
        errorFidles: '72',
        errorRate: '20.81%',
        fstate: '检查结束'
      },
      {
        id: uuid(),
        name: '石家庄市第五医院(2018-01至2018-12)',
        startMonths: '2018-01',
        endMonths: '2018-12',
        totalNum: '13380',
        errorNum: '13380',
        errorFidles: '11',
        errorRate: '31.8%',
        fstate: '检查结束'
      },
      {
        id: uuid(),
        name: '唐县人民医院(2018-01至2018-09)',
        startMonths: '2018-01',
        endMonths: '2018-09',
        totalNum: '24050',
        errorNum: '24050',
        errorFidles: '81',
        errorRate: '23.41',
        fstate: '检查结束'
      },
      {
        id: uuid(),
        name: '河北医科大学第三医院(2018-01至2018-03)',
        startMonths: '2018-01',
        endMonths: '2018-03',
        totalNum: '15199',
        errorNum: '15199',
        errorFidles: '82',
        errorRate: '23.70%',
        fstate: '检查结束'
      },
      {
        id: uuid(),
        name: '河北医科大学第三医院(2018-04至2018-06)',
        startMonths: '2018-04',
        endMonths: '2018-06',
        totalNum: '17188',
        errorNum: '17188',
        errorFidles: '81',
        errorRate: '23.41%',
        fstate: '检查结束'
      },
      {
        id: uuid(),
        name: '河北医科大学第三医院(2018-07至2018-09)',
        startMonths: '2018-07',
        endMonths: '2018-09',
        totalNum: '18372',
        errorNum: '18372',
        errorFidles: '104',
        errorRate: '30.06%',
        fstate: '检查结束'
      },
      {
        id: uuid(),
        name: '河北医科大学第三医院(2018-10至2018-12)',
        startMonths: '2018-10',
        endMonths: '2018-12',
        totalNum: '18377',
        errorNum: '18377',
        errorFidles: '92',
        errorRate: '25.69%',
        fstate: '检查结束'
      },
      {
        id: uuid(),
        name: '济宁医学附属医院(2019-04至2019-06)',
        startMonths: '2019-04',
        endMonths: '2019-06',
        totalNum: '45884',
        errorNum: '45884',
        errorFidles: '12',
        errorRate: '3.47%',
        fstate: '检查结束'
      },
      {
        id: uuid(),
        name: '秭归县人民医院-2019',
        startMonths: '2018-01',
        endMonths: '2018-12',
        totalNum: '25340',
        errorNum: '0',
        errorFidles: '0',
        errorRate: '0%',
        fstate: '已导入待检查'
      },
      {
        id: uuid(),
        name: '20191009-20191009',
        startMonths: '',
        endMonths: '',
        totalNum: '0',
        errorNum: '0',
        errorFidles: '0',
        errorRate: '0%',
        fstate: '已导入待检查'
      },
      {
        id: uuid(),
        name: '秭归县人民医院-2019',
        startMonths: '',
        endMonths: '',
        totalNum: '1836',
        errorNum: '0',
        errorFidles: '0',
        errorRate: '0%',
        fstate: '已导入待检查'
      },
      {
        id: uuid(),
        name: '荆州市中心医院(2019-09至2019-09)',
        startMonths: '2019-09',
        endMonths: '2019-09',
        totalNum: '0',
        errorNum: '0',
        errorFidles: '0',
        errorRate: '0%',
        fstate: ''
      }
    ];
    let recordData = this.state.recordData;
    return (
      <Authority>
        <PageHeaderWrapper title={'检测批次'}>
          <Row>
            <Button type={'primary'} onClick={this.add}><Icon type="plus" />新增</Button>
            <Button style={{ margin: '0 8px' }} onClick={this.checkData}>数据检查</Button>
            <Button onClick={this.testReport}>生成检测报告</Button>
            <Button style={{ margin: '0 8px' }} onClick={this.clearData}>清除数据</Button>
            <Button>数据图表</Button>
            <Button style={{ margin: '0 8px' }}>上报压缩包</Button>
            <Dropdown.Button overlay={menu} icon={<Icon type="down" />}>更多功能</Dropdown.Button >
            <div className={'pull-right'}>
              医疗机构：
              <Select
                showSearch
                style={{ width: 220 }}
                value={orgIdSelect[0].value}
                filterOption={(inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
              >
                {
                  orgIdSelect.map((item, index) => {
                    return <Option value={item.value} key={index}>{item.text}</Option>
                  })
                }
              </Select>
            </div>
          </Row>
          <Spin spinning={this.state.loading}>
            <FetchTable
              ref='table'
              hasIndex={true}
              resizable={true}
              columns={columns}
              rowKey='id'
              dataSource={dataSource}
              scroll={{ x: '100%' }}
              style={{ marginTop: 16 }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                  this.setState({ isSelected: true });
                }
              }}
            />
          </Spin>
          <Modal
            className='validataModal'
            visible={visible}
            title={titleName}
            maskClosable={false}
            centered={true}
            destroyOnClose={true}
            width={1000}
            onCancel={() => this.setState({ visible: false, recordData: null })}
            onOk={this.handleSubmit}
            confirmLoading={this.state.loading}
          >
            <Form>
              <Row>
                <Col {...responceColTwo}>
                  <FormItem label={'医疗机构'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('nameCode', {
                        initialValue: recordData && 'testData'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'年份'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('orgCode', {
                        initialValue: ''
                      })(
                        <DatePicker format={'YYYY'} style={{ width: '100%' }} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'开始月份'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('ksyf', {
                        initialValue: ''
                      })(
                        <MonthPicker style={{ width: '100%' }} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'结束月份'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('jsyf', {
                        initialValue: ''
                      })(
                        <MonthPicker style={{ width: '100%' }} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'批次名称'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('pcmc', {

                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'年度'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('nd', {
                        initialValue: recordData ? '1' : '2'
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>年度</Option>
                          <Option value={'2'}>日常</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'检测标准'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('jcbz', {
                        initialValue: '1'
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>病案首页质量检测</Option>
                          <Option value={'2'}>医疗质量与效率监测</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'总数据量'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('zsjl', {

                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'错误据量'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('cwjl', {

                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'检测开始时间'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('jckssj', {
                        initialValue: ''
                      })(
                        <DatePicker style={{ width: '100%' }} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'检测结束时间'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('jcjssj', {
                        initialValue: ''
                      })(
                        <DatePicker style={{ width: '100%' }} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'导入开始时间'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('drkssj', {
                        initialValue: ''
                      })(
                        <DatePicker style={{ width: '100%' }} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'导入结束时间'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('drjssj', {
                        initialValue: ''
                      })(
                        <DatePicker style={{ width: '100%' }} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'文档上传日期'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('wdscrq', {
                        initialValue: ''
                      })(
                        <DatePicker style={{ width: '100%' }} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'压缩文件路径'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('yswjlj', {
                        initialValue: ''
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'文件路径'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('wjlj', {
                        initialValue: ''
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'编码来源'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('bmly', {

                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'数据格式'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('sjgs', {

                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>

                <Col {...responceColTwo}>
                  <FormItem label={'检测日志'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('jcrz', {

                      })(
                        <Input.TextArea rows={4} />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Modal>
        </PageHeaderWrapper>
      </Authority >
    )
  }
}
export default TestBatch;
