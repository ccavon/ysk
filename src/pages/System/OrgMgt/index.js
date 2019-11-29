/*
 * @Author: chengyafang 
 * @Date: 2019-11-26 14:34:25 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-26 16:20:39
 * @File 系统管理 - 机构管理
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Button, Icon, Input, Modal, Form, Col, Select } from 'antd';
import FetchTable from '@/components/FetchTable';
import uuid from 'uuid';
import { responceColTwo, formItemLayoutTwo } from '@/utils/commonLayout';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class OrgMgt extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalTitle: '',
      visible: false,
      recordData: {}
    }
  }
  render() {
    const { modalTitle, visible, recordData } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '机构名称',
        dataIndex: 'orgName',
        render: (text, record, index) => {
          return (
            <a onClick={() => this.setState({ visible: true, modalTitle: '编辑机构', recordData: record })}>{text}</a>
          )
        }
      },
      { title: '归属区域', dataIndex: 'areaId' },
      { title: '机构编码', dataIndex: 'orgCode' },
      { title: '机构类型', dataIndex: 'orgType' },
      { title: '备注', dataIndex: 'remark' },
      {
        title: '操作',
        dataIndex: 'action',
        width: 80,
        align: 'center',
        render: (text, record, index) => {
          return (
            <a>删除</a>
          )
        }
      },
    ];
    const dataSource = [
      {
        id: uuid(),
        orgName: '机构1',
        areaId: '区域ABC',
        orgCode: 'AXX01',
        orgType: '内部',
        remark: '这是一条机构管理列表测试数据',
        children: [
          { id: uuid(), orgName: '二级机构1', areaId: '二级区域1', orgCode: 'AXX01-1', orgType: '内部', remark: '二级测试数据' }
        ]
      },
      {
        id: uuid(),
        orgName: '机构2',
        areaId: '区域DEF',
        orgCode: 'BXX02',
        orgType: '内部',
        remark: '这是一条机构管理列表测试数据',
        children: [
          { id: uuid(), orgName: '二级机构2', areaId: '二级区域2', orgCode: 'AXX01-2', orgType: '内部', remark: '二级测试数据' }
        ]
      },
      {
        id: uuid(),
        orgName: '机构3',
        areaId: '区域HIJ',
        orgCode: 'CXX03',
        orgType: '内部',
        remark: '这是一条机构管理列表测试数据'
      },
      {
        id: uuid(),
        orgName: '机构1',
        areaId: '区域KLM',
        orgCode: 'DXX04',
        orgType: '内部',
        remark: '这是一条机构管理列表测试数据'
      },
      {
        id: uuid(),
        orgName: '机构5',
        areaId: '区域NOP',
        orgCode: 'EXX05',
        orgType: '内部',
        remark: '这是一条机构管理列表测试数据'
      }
    ];
    return (
      <Authority>
        <PageHeaderWrapper title={'机构管理'}>
          <Row>
            <Button type={"primary"} onClick={() => this.setState({ modalTitle: '新建机构', visible: true })}><Icon type="plus" />新建机构</Button>
            <div className={'pull-right'}>
              <Input.Search placeholder={'模糊搜索'} />
            </div>
          </Row>
          <FetchTable
            ref='table'
            hasIndex={false}
            resizable={true}
            columns={columns}
            rowKey={`id`}
            dataSource={dataSource}
            scroll={{ x: '100%' }}
            style={{ marginTop: 16 }}
          />
          <Modal
            className='validataModal'
            title={modalTitle}
            visible={visible}
            width={800}
            centered={true}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => this.setState({ visible: false })}
          >
            <Form>
              <Row>
                <Col {...responceColTwo}>
                  <FormItem label={'上级机构'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('supOrg', {
                        rules: [{ required: true, message: '请选择上级机构' }],
                        initialValue: recordData.supOrg
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>无</Option>
                          <Option value={'2'}>总部二级</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'机构名称'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('orgName', {
                        rules: [{ required: true, message: '请输入机构名称' }],
                        initialValue: recordData.orgName
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'归属区域'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('areaId', {
                        rules: [{ required: true, message: '请选择归属区域' }],
                        initialValue: recordData.areaId
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>总部</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'机构编码'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('orgCode', {
                        rules: [{ required: true, message: '请输入机构编码' }],
                        initialValue: recordData.orgCode
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'机构类型'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('orgType', {
                        rules: [{ required: true, message: '请选择机构类型' }],
                        initialValue: recordData.orgType
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={''}>全部</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'级别序号'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('levelSortNo', {
                        initialValue: recordData.levelSortNo
                      })(
                        <Input type={'number'} placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'备注'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('remark', {
                        initialValue: recordData.remark
                      })(
                        <Input.TextArea placeholder={'请输入'} rows={1} />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Modal>
        </PageHeaderWrapper>
      </Authority>
    )
  }
}
export default OrgMgt;