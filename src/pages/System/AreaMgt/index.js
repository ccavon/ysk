/*
 * @Author: chengyafang 
 * @Date: 2019-11-26 10:05:45 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-26 15:56:17
 * @File 设置管理 - 区域管理
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Button, Icon, Modal, Form, Col, Input, Select } from 'antd';
import FetchTable from '@/components/FetchTable';
import { responceColTwo, formItemLayoutTwo } from '@/utils/commonLayout';
import uuid from 'uuid';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class AreaMgt extends PureComponent {
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
        title: '区域名称',
        dataIndex: 'desc',
        render: (text, record, index) => {
          return (
            <a onClick={() => this.setState({ visible: true, modalTitle: '查看区域', recordData: record })}>{text}</a>
          )
        }
      },
      { title: '区域编码', dataIndex: 'fcode' },
      { title: '区域类型', dataIndex: 'ftype' },
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
      }
    ];
    const dataSource = [
      {
        id: uuid(),
        desc: '11',
        fcode: 'AXX',
        ftype: '内部',
        remark: '这是一条测试数据',
        children: [
          { id: uuid(), desc: '11-1', fcode: 'AXX-0', ftype: '内部', remark: '这是一条测试数据' }
        ]
      },
      {
        id: uuid(),
        desc: '22',
        fcode: 'BXX',
        ftype: '内部',
        remark: '这是一条测试数据',
        children: [
          { id: uuid(), desc: '22-1', fcode: 'BXX-0', ftype: '内部', remark: '这是一条测试数据' }
        ]
      },
      {
        id: uuid(),
        desc: '33',
        fcode: 'CXX',
        ftype: '内部',
        remark: '这是一条测试数据'
      },
      {
        id: uuid(),
        desc: '44',
        fcode: 'DXX',
        ftype: '内部',
        remark: '这是一条测试数据'
      },
      {
        id: uuid(),
        desc: '55',
        fcode: 'EXX',
        ftype: '内部',
        remark: '这是一条测试数据'
      }
    ];
    return (
      <Authority>
        <PageHeaderWrapper title={'区域管理'}>
          <Row>
            <Button type={'primary'} onClick={() => this.setState({ visible: true, modalTitle: '添加区域' })}><Icon type="plus" />添加区域</Button>
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
                  <FormItem label={'上级区域'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('supArea', {
                        rules: [{ required: true, message: '请选择上级区域' }],
                        // initialValue: ''
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>无</Option>
                          <Option value={'2'}>华信卫健</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'名称'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('desc', {
                        rules: [{ required: true, message: '请输入区域名称' }],
                        initialValue: recordData.desc
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'编码'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('fcode', {
                        rules: [{ required: true, message: '请输入区域编码' }],
                        initialValue: recordData.fcode
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'类型'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('ftpe', {
                        rules: [{ required: true, message: '请选择区域类型' }],
                        initialValue: recordData.ftype
                      })(
                        <Select>
                          <Option value={''}>全部</Option>
                        </Select>
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
                        <Input.TextArea placeholder={'请输入'} />
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
export default AreaMgt;