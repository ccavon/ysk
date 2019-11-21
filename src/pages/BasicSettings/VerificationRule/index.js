/**
 * @Author: chengyafang 
 * @Date: 2019-10-15 15:32:43 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-11 10:27:00
 * @file 基础设置 - 验证规则
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Select, Button, Icon, Divider, Modal, Form, Input, message, Checkbox, Col, Spin } from 'antd';
import FetchTable from '@/components/FetchTable';
import uuid from 'uuid';
import { responceColTwo } from '@/utils/commonLayout';
import ImportFile from '@/components/ImportFile';

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayoutTwo = {
  colSpan: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },//默认一行2列
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
    md: { span: 10 },
    lg: { span: 10 },
    xl: { span: 9 },
    xxl: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    md: { span: 14 },
    lg: { span: 14 },
    xl: { span: 15 },
    xxl: { span: 16 }
  }
}

@Form.create()
class VerificationRule extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      titleName: '',
      recordData: null,
      importVisible: false,
      hasAnalysis: false, // 无解析结果
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
  // 导出
  handleExport = () => {
    this.setState({ loading: true });
    Modal.confirm({
      content: "确认导出？",
      onOk: () => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      },
      onCancel: () => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      }
    });
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
      },
      onCancel: () => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      }
    });
  }
  // 清除全部数据
  clearAllData = () => {
    Modal.confirm({
      content: '确认清除全部记录吗?',
      onOk: () => {
        this.setState({ loading: true });
        setTimeout(() => {
          message.success('操作成功！');
          this.setState({ loading: false });
        });
      },
      onCancel: () => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, titleName, importVisible, loading } = this.state;
    const columns = [
      {
        title: '规则提示',
        dataIndex: 'gzts',
        width: 224,
      },
      { title: '规则描述', dataIndex: 'gzms', width: 224 },
      { title: '类别描述', dataIndex: 'lbms', width: 224 },
      { title: '查询码', dataIndex: 'queryCode', width: 224 },
      { title: '验证逻辑', dataIndex: 'yzlj', width: 268 },
      { title: '是否可用', dataIndex: 'isky', width: 224 },
      { title: '是否电子病历验证规则', dataIndex: 'isziblyzgz', width: 168 },
      { title: '分类描述', dataIndex: 'flms', width: 112 },
      { title: '程序判断函数', dataIndex: 'isfun', width: 112 },
      { title: '程序与语句判断关联模式', dataIndex: 'isType', width: 178 },
      {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
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
        gzts: '身份证号码需要符合国家规定',
        gzms: '身份证号码不符合规范',
        lbms: '值域范围错误',
        cqm: 'sfzhmxyfhzhrmghggjbz',
        yzlj: '',
        isky: '是',
        isziblyzgz: '是',
        flms: '规范规则',
        isfun: 'idCardvalid',
        isType: 'and_prog_err'
      },
      {
        id: uuid(),
        gzts: '不能为空',
        gzms: '不能为空',
        lbms: '必填性验证',
        cqm: 'bnwk',
        yzlj: "({prop} is null or concat({prop},'')='')",
        isky: '是',
        isziblyzgz: '是',
        flms: '完整规则',
        isfun: '',
        isType: ''
      },
      {
        id: uuid(),
        gzts: '必须大于0',
        gzms: '必须大于0',
        lbms: '值域范围错误',
        cqm: 'bxdy0',
        yzlj: "!='' and {prop}<=0",
        isky: '是',
        isziblyzgz: '是',
        flms: '规范规则',
        isfun: '',
        isType: ''
      },
      {
        id: uuid(),
        gzts: '不能大于入院时间',
        gzms: '出生日期错误',
        lbms: '值域范围错误',
        cqm: 'bndyrysj',
        yzlj: "!='' and {prop}>p22",
        isky: '是',
        isziblyzgz: '是',
        flms: '逻辑规则',
        isfun: '',
        isType: ''
      },
      {
        id: uuid(),
        gzts: '不能小于出生日期',
        gzms: '不能小于出生日期',
        lbms: '值域范围错误',
        cqm: 'bnxycsrq',
        yzlj: "!='' and {prop}<p6",
        isky: '是',
        isziblyzgz: '是',
        flms: '逻辑规则',
        isfun: '',
        isType: ''
      },
      {
        id: uuid(),
        gzts: '位数应等于6位',
        gzms: '邮编位数错误',
        lbms: '值域范围错误',
        cqm: 'wsydy6w',
        yzlj: "",
        isky: '是',
        isziblyzgz: '是',
        flms: '规范规则',
        isfun: '',
        isType: ''
      }
    ];
    let recordData = this.state.recordData;
    return (
      <Authority>
        <PageHeaderWrapper title={'验证规则'}>
          <Row>
            <Row>
              <Button type='primary' onClick={this.add}><Icon type="plus" />新增</Button>
              <Button style={{ margin: '0 8px' }} onClick={() => this.setState({ importVisible: true })}><Icon type="import" />导入</Button>
              <Button onClick={this.handleExport}><Icon type="export" />导出</Button>
              <Button style={{ margin: '0 8px 0' }} onClick={this.clearAllData}>清除全部数据</Button>
              <Input.Search className='layout_search-right' placeholder='模糊查询' />
            </Row>
          </Row>
          <Spin spinning={loading}>
            <FetchTable
              ref='table'
              hasIndex={true}
              resizable={true}
              columns={columns}
              rowKey='id'
              dataSource={dataSource}
              scroll={{ x: '130%' }}
              style={{ marginTop: 16 }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
                  <FormItem label={'规则提示'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('gzts', {
                        initialValue: recordData && '必须大于0'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'规则描述'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('gzms', {
                        initialValue: recordData && '必须大于0'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'类别描述'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('lbms', {
                        initialValue: recordData && '值域范围错误'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'查询码'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('cqm', {
                        initialValue: recordData && 'bxdy0'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'是否可用'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('isky', {
                        initialValue: ['1']
                      })(
                        <Checkbox.Group>
                          <Checkbox value={'1'}>是</Checkbox>
                          <Checkbox value={'2'}>否</Checkbox>
                        </Checkbox.Group>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'是否电子病例验证规则'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('isyzgz', {
                        initialValue: ['1']
                      })(
                        <Checkbox.Group>
                          <Checkbox value={'1'}>是</Checkbox>
                          <Checkbox value={'2'}>否</Checkbox>
                        </Checkbox.Group>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'分类描述'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('flms', {
                        initialValue: '规范规则'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'程序判断函数'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('cxpdhs', {
                        initialValue: '1'
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>验证是否为数字类型字符</Option>
                          <Option value={'2'}>验证身份证最后一位是否符合国家的编码规则</Option>
                          <Option value={'3'}>验证身份证号码是否符合规定</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'程序与语句判断关联模式'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('glms', {
                        initialValue: '1'
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>并且程序满足</Option>
                          <Option value={'2'}>或者程序不满足</Option>
                          <Option value={'3'}>并且程序不满足</Option>
                          <Option value={'4'}>捉着程序满足</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'验证逻辑'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('yzlj', {
                        initialValue: recordData && "{prop} is not null and {prop}!='' and {prop}<=0"
                      })(
                        <Input.TextArea rows={4} placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Modal>
          <Modal
            visible={importVisible}
            title={'导入'}
            width={980}
            centered={true}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => this.setState({ importVisible: false, hasAnalysis: false })}
            footer={null}
          >
            <ImportFile
              rules={{ type: ['.xls', '.xlsx'] }}
              // action={archivesManage.importAssertRecordList}
              getResult={({ result, status, msg }) => {
                if (status === 200) {
                  console.log(JSON.stringify(result))
                  message.success('解析完成');
                  this.setState({ hasAnalysis: true });
                } else {
                  message.warn(msg || '暂无实际数据接口！');
                  setTimeout(() => {
                    this.setState({ importVisible: false, hasAnalysis: false });
                  }, 500);
                }
              }}
            />
          </Modal>
        </PageHeaderWrapper>
      </Authority>
    )
  }
}
export default VerificationRule;
