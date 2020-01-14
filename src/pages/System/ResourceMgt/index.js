/*
 * @Author: chengyafang 
 * @Date: 2019-12-05 14:43:11 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-12-09 09:07:36
 * @File 资源管理
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Button, Icon, Input, Modal, Form, Col, Select } from 'antd';
import FetchTable from '@/components/FetchTable';
import uuid from 'uuid';
import { formItemLayout } from '@/utils/commonLayout';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class ResourceMgt extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalTitle: '',
      visible: false,
      dataRecord: {},
      isEdit: false,
      expandedRowKeys: []
    }
  }
  handleOnOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({ visible: false });
      }
    });
  }
  render() {
    const { modalTitle, visible, dataRecord, expandedRowKeys } = this.state;
    console.log(expandedRowKeys);
    const { getFieldDecorator, resetFields, isEdit } = this.props.form;
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'menuName',
        width: 268
      },
      { title: '路劲', dataIndex: 'pathName', width: 268 },
      { title: '排序', dataIndex: 'fsort', width: 112 },
      { title: '状态', dataIndex: 'fstate', width: 112 },
      { title: '权限标识', dataIndex: 'flagAuthority', width: 168 },
      {
        title: '操作',
        dataIndex: 'actions',
        align: 'center',
        width: 80,
        render: (text, record, index) => {
          return (
            <a onClick={() => this.setState({ visible: true, modalTitle: '编辑菜单', dataRecord: record, isEdit: true })}>{'编辑'}</a>
          )
        }
      },
    ];
    const dataSource = [
      {
        id: uuid(),
        menuName: '系统管理',
        pathName: '/system',
        fsort: '1',
        fstate: '启用',
        flagAuthority: '正常',
        parentCode: '无',
        children: [
          {
            id: uuid(), pathName: '/system/userMgt', menuName: '用户管理', fsort: '11', fstate: '启用', flagAuthority: '正常', parentCode: '系统管理'
          },
          {
            id: uuid(), pathName: '/system/areaMgt', menuName: '区域管理', fsort: '12', fstate: '启用', flagAuthority: '正常', parentCode: '系统管理'
          },
          {
            id: uuid(), pathName: '/system/orgMgt', menuName: '机构管理', fsort: '13', fstate: '启用', flagAuthority: '正常', parentCode: '系统管理'
          },
          {
            id: uuid(), pathName: '/system/deptMgt', menuName: '部门管理', fsort: '14', fstate: '启用', flagAuthority: '正常', parentCode: '系统管理'
          },
          {
            id: uuid(), pathName: '/system/roleMgt', menuName: '角色管理', fsort: '15', fstate: '启用', flagAuthority: '正常', parentCode: '系统管理'
          },
          {
            id: uuid(), pathName: '/system/resourceMgt', menuName: '资源管理', fsort: '16', fstate: '启用', flagAuthority: '正常', parentCode: '系统管理'
          }
        ]
      },
      {
        id: uuid(),
        pathName: '/settlementYB',
        menuName: '实时数据采集',
        fsort: '2',
        fstate: '启用',
        flagAuthority: '正常',
        parentCode: '无',
        children: [
          {
            id: uuid(), pathName: '/settlementYB/jsList', menuName: '医保结算清单', fsort: '21', fstate: '启用', flagAuthority: '正常', parentCode: '实时数据采集'
          },
          {
            id: uuid(), pathName: '/settlementYB/codeRecord', menuName: '编码记录', fsort: '22', fstate: '启用', flagAuthority: '正常', parentCode: '实时数据采集'
          },
          {
            id: uuid(), pathName: '/settlementYB/reportFile', menuName: '上报文件', fsort: '23', fstate: '启用', flagAuthority: '正常', parentCode: '实时数据采集'
          }
        ]
      }
    ];
    return (
      <Authority>
        <PageHeaderWrapper title={'资源管理'}>
          <Row>
            <Button type={'primary'} onClick={() => this.setState({ visible: true, modalTitle: '新建菜单', dataRecord: {}, isEdit: false })}><Icon type="plus" />新建菜单</Button>
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
            title={modalTitle}
            visible={visible}
            className='validataModal'
            centered={true}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => { this.setState({ visible: false }); resetFields() }}
            onOk={this.handleOnOk}
          >
            <Form>
              <Row>
                <Col>
                  <FormItem label={'上级菜单'} {...formItemLayout}>
                    {
                      getFieldDecorator('parentCode', {
                        rules: [{ required: true, message: '请选择上级菜单' }],
                        initialValue: dataRecord.parentCode
                      })(
                        <Select placeholder={'请选择'} disabled={isEdit}>
                          <Option value={'1'}>无</Option>
                          <Option value={'2'}>系统管理</Option>
                          <Option value={'3'}>实时数据采集</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'菜单名称'} {...formItemLayout}>
                    {
                      getFieldDecorator('menuName', {
                        rules: [{ required: true, message: '请输入菜单名称' }],
                        initialValue: dataRecord.menuName
                      })(
                        <Input placeholder={'请输入'} disabled={isEdit} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'路劲'} {...formItemLayout}>
                    {
                      getFieldDecorator('pathName', {
                        rules: [{ required: true, message: '请输入路劲' }],
                        initialValue: dataRecord.pathName
                      })(
                        <Input placeholder={'请输入'} disabled={isEdit} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'排序'} {...formItemLayout}>
                    {
                      getFieldDecorator('fsort', {
                        rules: [{ required: true, message: '请输入排序' }],
                        initialValue: dataRecord.fsort
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'状态'} {...formItemLayout}>
                    {
                      getFieldDecorator('fstate', {
                        rules: [{ required: true, message: '请选择状态' }],
                        initialValue: dataRecord.fstate
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>启用</Option>
                          <Option value={'2'}>停用</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'权限标识'} {...formItemLayout}>
                    {
                      getFieldDecorator('flagAuthority', {
                        initialValue: dataRecord.flagAuthority
                      })(
                        <Input placeholder={'请输入'} />
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
export default ResourceMgt;
