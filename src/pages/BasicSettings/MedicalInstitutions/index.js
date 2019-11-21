/**
 * @Author: chengyafang 
 * @Date: 2019-10-15 15:27:14 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-06 14:47:00
 * @file 基础设置 - 医疗机构
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Input, Button, Icon, Divider, Spin, Modal, Form, Col, Select, message } from 'antd';
import FetchTable from '@/components/FetchTable';
import uuid from 'uuid';
import { formItemLayoutTwo, responceColTwo } from '@/utils/commonLayout';
import ImportFile from '@/components/ImportFile';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class MedicalInstitutions extends PureComponent {
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
    const { visible, titleName, importVisible } = this.state;
    const columns = [
      {
        title: '组织机构代码',
        dataIndex: 'orgCode',
        width: 168,
      },
      { title: '名称', dataIndex: 'orgName', width: 224 },
      { title: '查询码', dataIndex: 'queryCode', width: 168 },
      { title: '医院等级', dataIndex: 'grade', width: 112 },
      { title: '医院类型', dataIndex: 'type', width: 112 },
      { title: '类别代码', dataIndex: 'typeCode', width: 168 },
      { title: '默认对接方案', dataIndex: 'name5', width: 168 },
      { title: '备选对接方案', dataIndex: 'name6', width: 168 },
      { title: '地址', dataIndex: 'address', width: 224 },
      { title: '电子邮箱', dataIndex: 'Email', width: 168 },
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
        orgCode: 'jzszxyy',
        orgName: '荆州市中心医院',
        queryCode: 'jzszxyy',
        grade: '三级',
        type: '综合医院',
        typeCode: '',
        name5: '',
        name6: '',
        address: '',
        Email: ''
      },
      {
        id: uuid(),
        orgCode: 'hssdermyy',
        orgName: '衡水市第二人民医院',
        queryCode: 'hssdermyy',
        grade: '三级',
        type: '综合医院',
        typeCode: '',
        name5: '',
        name6: '',
        address: '',
        Email: ''
      },
      {
        id: uuid(),
        orgCode: 'tsnhyy',
        orgName: '唐山南湖医院',
        queryCode: 'tsnhyy',
        grade: '三级',
        type: '综合医院',
        typeCode: '',
        name5: '',
        name6: '',
        address: '',
        Email: ''
      },
      {
        id: uuid(),
        orgCode: 'jlxyy',
        orgName: '巨鹿县医院',
        queryCode: 'jlxyy',
        grade: '三级',
        type: '综合医院',
        typeCode: '',
        name5: '',
        name6: '',
        address: '',
        Email: ''
      },
      {
        id: uuid(),
        orgCode: 'hbszhsrmyy',
        orgName: '河北省遵化市人民医院',
        queryCode: 'hbszhsrmyy',
        grade: '三级',
        type: '综合医院',
        typeCode: '',
        name5: '',
        name6: '',
        address: '',
        Email: ''
      }
    ];
    let recordData = this.state.recordData;
    return (
      <Authority>
        <PageHeaderWrapper title={'医疗机构'}>
          <Row>
            <Button type='primary' onClick={this.add}><Icon type="plus" />新增</Button>
            <Button style={{ margin: '0 8px' }} onClick={() => this.setState({ importVisible: true })}><Icon type="import" />导入</Button>
            <Button onClick={this.handleExport}><Icon type="export" />导出</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.clearAllData}>清除全部数据</Button>
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
                  <FormItem label={'名称'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('name', {
                        initialValue: recordData && 'testData'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'组织机构代码'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('orgCode', {
                        initialValue: recordData && 'testCode'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'医院等级'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('yydj', {
                        initialValue: recordData ? '1' : ''
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={''}>全部</Option>
                          <Option value={'1'}>一级</Option>
                          <Option value={'2'}>二级</Option>
                          <Option value={'3'}>三级</Option>
                          <Option value={'4'}>未评</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'查询码'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('cxm', {
                        initialValue: recordData && 'testCode'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'类别代码'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('lbdm', {

                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'医院类型'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('yylx', {
                        initialValue: recordData ? '1' : ''
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={''}>全部</Option>
                          <Option value={'1'}>综合医院</Option>
                          <Option value={'2'}>中医医院</Option>
                          <Option value={'3'}>中西医结合医院</Option>
                          <Option value={'4'}>口腔医院</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'备选对接方案'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('bxdjfa', {

                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>广东</Option>
                          <Option value={'2'}>湖南</Option>
                          <Option value={'3'}>中联</Option>
                          <Option value={'4'}>卫宁</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'默认对接方案'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('mrdjfa', {

                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>广东</Option>
                          <Option value={'2'}>湖南</Option>
                          <Option value={'3'}>中联</Option>
                          <Option value={'4'}>卫宁</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'电子邮箱'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('Email', {
                        initialValue: recordData && '984701451@qq.com'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'地址'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('address', {
                        initialValue: recordData && '武汉市江汉区青年路59号B座'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'联系电话'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('lxdh', {
                        initialValue: recordData && '13026105969'
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'所属行政区域'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('ssxzqy', {

                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>武汉市</Option>
                          <Option value={'2'}>上海市</Option>
                          <Option value={'3'}>北京市</Option>
                          <Option value={'4'}>黄冈市</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'编码来源'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('bmly', {

                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>北京版5.0</Option>
                          <Option value={'2'}>北京版6.0</Option>
                          <Option value={'3'}>国标版</Option>
                          <Option value={'4'}>国家版</Option>
                          <Option value={'4'}>国家版临床版1.1</Option>
                          <Option value={'4'}>国家版临床版2.1</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'省份'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('sf', {

                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>武汉市江岸区</Option>
                          <Option value={'2'}>武汉市江汉区</Option>
                          <Option value={'3'}>武汉市洪山区</Option>
                          <Option value={'4'}>武汉市武昌区</Option>
                          <Option value={'4'}>武汉市汉阳区</Option>
                          <Option value={'4'}>武汉市青山区</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'分批统计模式'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('fptjms', {
                        initialValue: recordData ? '1' : ''
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={''}>全部</Option>
                          <Option value={'1'}>26号至25号</Option>
                          <Option value={'2'}>自然月</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'数据格式'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('sjgs', {

                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>接口标准2019</Option>
                          <Option value={'2'}>HQMS</Option>
                          <Option value={'3'}>卫统</Option>
                        </Select>
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
export default MedicalInstitutions;
