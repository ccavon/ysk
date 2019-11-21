/**
 * @Author: chengyafang 
 * @Date: 2019-10-15 15:31:31 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-11 10:26:34
 * @file 基础设置 - 检查设置
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Input, Button, Icon, Divider, Modal, Form, Col, Select, Checkbox, message, Spin } from 'antd';
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
class CheckSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      titleName: '',
      recordData: null,
      importVisible: false,
      hasAnalysis: false, // 无解析结果
      levelVisible: false
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
    const { visible, titleName, recordData, importVisible, levelVisible } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '字段ID',
        dataIndex: 'fieldId',
        width: 112,
      },
      { title: '字段名称', dataIndex: 'fieldName', width: 268 },
      { title: '查询码', dataIndex: 'queryCode', width: 168 },
      { title: '检测逻辑', dataIndex: 'jclj', width: 286 },
      { title: '检测备注', dataIndex: 'remark', width: 224 },
      { title: '关联模块', dataIndex: 'glModule', width: 224 },
      { title: '是否校验', dataIndex: 'isCheck', width: 112 },
      { title: '属性类别', dataIndex: 'type', width: 112 },
      { title: '序号', dataIndex: 'index', width: 112 },
      { title: '是否附页属性', dataIndex: 'isType', width: 112 },
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
        fieldId: 'gdrq',
        fieldName: '归档日期',
        queryCode: 'gdrq',
        jclj: '',
        remark: '',
        glModule: '',
        isCheck: '否',
        type: '',
        index: '831',
        isType: '否'
      },
      {
        id: uuid(),
        fieldId: 'M1',
        fieldName: '药物过敏',
        queryCode: 'ywgm',
        jclj: '非空必填，校验值域范围=RC037 过敏药物',
        remark: '值域范围参考RC037',
        glModule: 'com.mrqs.domain.Rc037',
        isCheck: '否',
        type: '首页',
        index: '408',
        isType: '否'
      },
      {
        id: uuid(),
        fieldId: 'M3',
        fieldName: '入院后多少天(颅脑损伤患者昏迷时间)',
        queryCode: 'ryhdst(lnsshzhmsj)',
        jclj: '无需校验',
        remark: '单位（天）',
        glModule: '',
        isCheck: '否',
        type: '首页',
        index: '410',
        isType: '否'
      },
      {
        id: uuid(),
        fieldId: 'M4',
        fieldName: '籍贯省份',
        queryCode: 'jgsf',
        jclj: '无需校验',
        remark: '',
        glModule: 'com.mrqs.domain.Rc036',
        isCheck: '是',
        type: '首页',
        index: '411',
        isType: '否'
      },
      {
        id: uuid(),
        fieldId: 'M6',
        fieldName: '病案源状态',
        queryCode: 'bayzt',
        jclj: '',
        remark: '',
        glModule: '',
        isCheck: '是',
        type: '2',
        index: '413',
        isType: '否'
      }
    ];
    return (
      <Authority>
        <PageHeaderWrapper title={'检查设置'}>
          <Row>
            <Button type='primary' onClick={this.add}><Icon type="plus" />新增</Button>
            <Button style={{ margin: '0 8px' }} onClick={() => this.setState({ importVisible: true })}><Icon type="import" />导入</Button>
            <Button onClick={this.handleExport}><Icon type="export" />导出</Button>
            <Button style={{ margin: '0 8px' }} onClick={this.clearAllData}>清除全部数据</Button>
            <Button onClick={() => this.setState({ levelVisible: true })}>设置检测类别</Button>
            <Input.Search className='layout_search-right' placeholder='模糊查询' />
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
                  <FormItem label={'字段ID'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('zdid', {
                        initialValue: recordData && 'gdrq'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'字段名称'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('zdmc', {
                        initialValue: recordData && '归档日期'
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
                  <FormItem label={'检测逻辑'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('jclj', {
                        initialValue: ''
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'检测备注'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('jcbz', {
                        initialValue: ''
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'关联模块'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('glmk', {
                        initialValue: ''
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'是否校验'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('isjy', {
                        initialValue: ['2']
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
                  <FormItem label={'属性类别'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('sxlb', {
                        initialValue: '1'
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>首页</Option>
                          <Option value={'2'}>附页</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'序号'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('xh', {
                        initialValue: '001'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'是否附页属性'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('issysx', {
                        initialValue: ['2']
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
                  <FormItem label={'是否电子病历验证属性'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('isyzsx', {
                        initialValue: ['2']
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
                  <FormItem label={'质量分类'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('zlfl', {
                        initialValue: '1'
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>患者基本信息</Option>
                          <Option value={'2'}>住院过程信息</Option>
                          <Option value={'3'}>诊疗信息</Option>
                          <Option value={'4'}>费用信息</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'评分级别'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('pfjb', {
                        initialValue: '1'
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>A类</Option>
                          <Option value={'2'}>B类</Option>
                          <Option value={'3'}>C类</Option>
                          <Option value={'4'}>D类</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'信息分类'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('xxfl', {
                        initialValue: '住院信息'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'分值'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('fz', {
                        initialValue: '5'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'是否必填'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('isbt', {
                        initialValue: ['2']
                      })(
                        <Checkbox.Group>
                          <Checkbox value={'1'}>是</Checkbox>
                          <Checkbox value={'2'}>否</Checkbox>
                        </Checkbox.Group>
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
          <Modal
            visible={levelVisible}
            title={'设置检测类别'}
            centered={true}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => this.setState({ levelVisible: false })}
            onOk={() => this.setState({ loading: false, levelVisible: false })}
          >
            设置检查类别：
            <Select placeholder={'请选择'} style={{ width: '70%' }}>
              <Option value={'1'}>首页</Option>
              <Option value={'2'}>附页</Option>
            </Select>
          </Modal>
        </PageHeaderWrapper>
      </Authority>
    )
  }
}
export default CheckSettings;