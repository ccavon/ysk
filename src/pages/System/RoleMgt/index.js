/*
 * @Author: chengyafang 
 * @Date: 2019-12-02 17:13:53 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-12-04 10:20:02
 * @file 角色管理
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Button, Input, Icon, Modal, Form, Col, Select, Drawer, Tabs, Tree } from 'antd';
import FetchTable from '@/components/FetchTable';
import PopoverButton from '@/components/PopoverButton';
import uuid from 'uuid';
import { formItemLayout } from '@/utils/commonLayout';
import { FooterToolbar } from 'ant-design-pro';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;
const { TreeNode } = Tree;

const treeData = [
  {
    title: '功能菜单',
    key: '1',
    children: [
      {
        title: '用户管理',
        key: '1-1',
        children: [
          { title: '查看', key: '1-1-1' },
          { title: '修改', key: '1-1-2' },
          { title: '增加', key: '1-1-3' },
          { title: '删除', key: '1-1-4' },
          { title: '导入', key: '1-1-5' },
          { title: '导出', key: '1-1-6' }
        ]
      },
      {
        title: '机构管理',
        key: '1-2',
        children: [
          { title: '查看', key: '1-2-1' },
          { title: '修改', key: '1-2-2' },
          { title: '增加', key: '1-2-3' },
          { title: '删除', key: '1-2-4' }
        ]
      },
      {
        title: '角色管理',
        key: '1-3',
        children: [
          { title: '查看', key: '1-3-1' },
          { title: '修改', key: '1-3-2' },
          { title: '新建', key: '1-3-3' },
          { title: '分配用户', key: '1-3-4' },
          { title: '角色权限', key: '1-3-5' },
        ]
      },
      {
        title: '区域管理',
        key: '1-4',
        children: [
          { title: '查看', key: '1-4-1' },
          { title: '修改', key: '1-4-2' },
          { title: '新建', key: '1-4-3' },
          { title: '删除', key: '1-4-4' }
        ]
      },
      {
        title: '部门管理',
        key: '1-5',
        children: [
          { title: '查看', key: '1-5-1' },
          { title: '修改', key: '1-5-2' },
          { title: '新建', key: '1-5-3' },
          { title: '删除', key: '1-5-4' }
        ]
      }
    ]
  }
];
const treeDataMenu = [
  {
    title: '数据菜单',
    key: '1',
    children: [
      {
        title: '系统管理',
        key: '1-1',
        children: [
          {
            title: '用户管理',
            key: '1-1-1'
          },
          {
            title: '机构管理',
            key: '1-1-2'
          },
          {
            title: '角色管理',
            key: '1-1-3'
          },
          {
            title: '区域管理',
            key: '1-1-4'
          },
          {
            title: '部门管理',
            key: '1-1-5'
          }
        ]
      },
      {
        title: '检测报告',
        key: '1-2',
        children: [
          {
            title: '区域管理',
            key: '1-2-1'
          },
          {
            title: '部门管理',
            key: '1-2-1'
          }
        ]
      },
      {
        title: '实时数据采集',
        key: '1-3',
        children: [
          {
            title: '医保结算清单',
            key: '1-3-1'
          },
          {
            title: '编码记录',
            key: '1-3-2'
          },
          {
            title: '上报文件',
            key: '1-3-3'
          }
        ]
      }
    ]
  }
];

@Form.create()
class RoleMgt extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addVisible: false,
      addModalTitle: '',
      dataRecord: {},
      authorityVisible: false,
      expandedKeys: ["1", "1-1"],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      userVisible: false,
      childrenDrawerTitle: '',
      childrenDrawerVisible: false,
      childrenDrawerRecord: {}
    }
  }
  // 新建
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({ addVisible: false });
      }
    });
  }

  onExpand = expandedKeys => {
    console.log('onExpand:', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({ expandedKeys, autoExpandParent: false });
  }

  onCheck = checkedKeys => {
    console.log('onCheck:', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect:', selectedKeys, info);
    this.setState({ selectedKeys });
  }

  renderTreeNodes = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.key} {...item} />;
  });

  childrenDrawerSubmit = e => {
    e.preventDefault();
    this.childrenDrawerForm.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        console.log('childrenDrawerSubmit:', values);
        this.setState({ childrenDrawerVisible: false });
      }
    });
  }

  render() {
    const {
      addVisible,
      addModalTitle,
      dataRecord,
      authorityVisible,
      autoExpandParent,
      expandedKeys,
      checkedKeys,
      selectedKeys,
      userVisible,
      childrenDrawerTitle,
      childrenDrawerVisible,
      childrenDrawerRecord
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'sysRoleName',
        render: (text, record, index) => (
          <a onClick={() => this.setState({ addVisible: true, addModalTitle: '查看编辑', dataRecord: record })}>{text}</a>
        )
      },
      { title: '英文名称', dataIndex: 'depart' },
      { title: '归属机构', dataIndex: 'gsjg' },
      { title: '状态', dataIndex: 'fstate' },
      {
        title: '操作',
        dataIndex: 'actions',
        width: 120,
        align: 'center',
        render: (text, record, index) => {
          return (
            <PopoverButton
              placement={'right'}
              data={[
                {
                  content: '角色权限',
                  type: 'normal',
                  onClick: () => {
                    console.log('角色权限按钮');
                    this.setState({ authorityVisible: true });
                  }
                },
                {
                  content: '分配用户',
                  type: 'normal',
                  onClick: () => {
                    console.log('分配用户按钮');
                    this.setState({ userVisible: true });
                  }
                },
                {
                  content: '删除',
                  type: 'Popconfirm',
                  onOk: () => {
                    console.log('删除按钮');
                  },
                  onCancel: () => console.log('onCancel')
                },
              ]}
            />
          )
        }
      },
    ];
    const dataSource = [
      {
        id: uuid(),
        sysRoleName: '部门管理员',
        depart: 'depart',
        gsjg: '开发部',
        fstate: '正常'
      }
    ];
    const columnsUser = [
      {
        title: '姓名',
        dataIndex: 'name',
        fixed: 'left',
        width: 112,
        render: (text, record, index) => {
          return (
            <a onClick={() => this.setState({ childrenDrawerTitle: '编辑查看', childrenDrawerVisible: true, childrenDrawerRecord: record })}>{text}</a>
          )
        }
      },
      { title: '登录名', dataIndex: 'loginName', width: 112 },
      { title: '归属公司', dataIndex: 'gsgs', width: 168 },
      { title: '归属部门', dataIndex: 'dept', width: 168 },
      { title: '电话', dataIndex: 'call', width: 112 },
      { title: '手机', dataIndex: 'phone', width: 112 },
      {
        title: '操作',
        dataIndex: 'actions',
        align: 'center',
        width: 80,
        fixed: 'right',
        render: (text, record, index) => {
          return (
            <a>删除</a>
          )
        }
      }
    ];
    const dataSourceUser = [
      {
        id: uuid(),
        loginName: 'cyf',
        name: '程雅芳',
        gsgs: '华信卫健',
        dept: '开发部',
        call: '',
        phone: '130********'
      },
      {
        id: uuid(),
        loginName: 'xhh',
        name: '熊慧慧',
        gsgs: '华信卫健',
        dept: '实施部',
        call: '',
        phone: '157********'
      },
      {
        id: uuid(),
        loginName: 'ljh',
        name: '罗敬慧',
        gsgs: '华信卫健',
        dept: '行政部',
        call: '',
        phone: '186********'
      }
    ];
    return (
      <Authority>
        <PageHeaderWrapper title={'角色管理'}>
          <Row>
            <Button type={'primary'} onClick={() => this.setState({ addModalTitle: '新建', addVisible: true, dataRecord: {} })}><Icon type="plus" />新建</Button>
            <div className={'pull-right'}>
              <Input.Search
                placeholder={'模糊搜索'}
              />
            </div>
          </Row>
          <FetchTable
            ref='table'
            hasIndex={true}
            resizable={true}
            columns={columns}
            rowKey={`id`}
            dataSource={dataSource}
            scroll={{ x: '100%' }}
            style={{ marginTop: 16 }}
          />
          {/* 新建 */}
          <Modal
            visible={addVisible}
            title={addModalTitle}
            centered={true}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => this.setState({ addVisible: false })}
            onOk={this.handleSubmit}
          >
            <Form>
              <Row>
                <Col>
                  <FormItem label={'角色名称'} {...formItemLayout}>
                    {
                      getFieldDecorator('sysRoleName', {
                        rules: [{ required: true, message: '请输入角色名称' }],
                        initialValue: dataRecord.sysRoleName
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'英文名称'} {...formItemLayout}>
                    {
                      getFieldDecorator('depart', {
                        initialValue: dataRecord.depart
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'归属机构'} {...formItemLayout}>
                    {
                      getFieldDecorator('gsjg', {
                        rules: [{ required: true, message: '请选择归属机构' }],
                        initialValue: dataRecord.gsjg
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>开发部</Option>
                          <Option value={'2'}>实施部</Option>
                          <Option value={'3'}>行政部</Option>
                        </Select>
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
                          <Option value={'1'}>正常</Option>
                          <Option value={'2'}>禁用</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Modal>
          {/* 角色权限 */}
          <Drawer
            title={'权限设置'}
            visible={authorityVisible}
            width={720}
            closable={true}
            destroyOnClose={true}
            maskClosable={false}
            onClose={() => this.setState({ authorityVisible: false })}
          >
            <Tabs type={'card'} onChange={(key) => console.log(key)}>
              <TabPane tab="功能权限" key="1">
                <div className={'treeData-redundance-hidden'}>
                  <Tree
                    checkable
                    onExpand={this.onExpand}
                    autoExpandParent={autoExpandParent}
                    expandedKeys={expandedKeys}
                    onCheck={this.onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={this.onSelect}
                    selectedKeys={selectedKeys}
                  >
                    {this.renderTreeNodes(treeData)}
                  </Tree>
                </div>
                {/* 底部 - 工具条 */}
                <FooterToolbar>
                  <Row>
                    <Col className='text-right'>
                      <Button type="primary" onClick={() => this.setState({ authorityVisible: false })}>确认</Button>
                      <Button onClick={() => this.setState({ authorityVisible: false })}>取消</Button>
                    </Col>
                  </Row>
                </FooterToolbar>
              </TabPane>
              <TabPane tab="数据权限" key="2">
                <div className={'treeData-redundance-hidden'}>
                  <Tree
                    checkable
                    onExpand={this.onExpand}
                    autoExpandParent={autoExpandParent}
                    expandedKeys={expandedKeys}
                    onCheck={this.onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={this.onSelect}
                    selectedKeys={selectedKeys}
                  >
                    {this.renderTreeNodes(treeDataMenu)}
                  </Tree>
                </div>
                {/* 底部 - 工具条 */}
                <FooterToolbar>
                  <Row>
                    <Col className='text-right'>
                      <Button type="primary" onClick={() => this.setState({ authorityVisible: false })}>确认</Button>
                      <Button onClick={() => this.setState({ authorityVisible: false })}>取消</Button>
                    </Col>
                  </Row>
                </FooterToolbar>
              </TabPane>
            </Tabs>
          </Drawer>
          {/* 分配用户 */}
          <Drawer
            visible={userVisible}
            width={720}
            closable={true}
            destroyOnClose={true}
            maskClosable={false}
            onClose={() => this.setState({ userVisible: false })}
          >
            <h3 style={{ marginBottom: 24 }}>用户列表，所属角色：<a>{'部门管理员'}</a></h3>
            <Button type={'primary'} onClick={() => this.setState({ childrenDrawerTitle: '添加人员', childrenDrawerVisible: true })}><Icon type="plus" />添加人员</Button>
            <FetchTable
              ref='tableDrawer'
              hasIndex={true}
              resizable={true}
              columns={columnsUser}
              rowKey={`id`}
              dataSource={dataSourceUser}
              scroll={{ x: '100%' }}
              style={{ marginTop: 16 }}
            />
            <Drawer
              title={childrenDrawerTitle}
              width={450}
              closable={true}
              destroyOnClose={true}
              maskClosable={false}
              onClose={() => this.setState({ childrenDrawerVisible: false })}
              visible={childrenDrawerVisible}
            >
              <ChildrenDrawerForm
                childrenDrawerRecord={childrenDrawerRecord}
                childrenDrawerSubmit={this.childrenDrawerSubmit}
                ref={form => this.childrenDrawerForm = form}

              />
            </Drawer>
          </Drawer>
        </PageHeaderWrapper>
      </Authority>
    )
  }
}
export default RoleMgt;

/**
 * @description 操作栏-->分配用户-->添加人员或编辑查看表单
 */
@Form.create()
class ChildrenDrawerForm extends PureComponent {
  render() {
    const { form: { getFieldDecorator, resetFields }, childrenDrawerRecord, childrenDrawerSubmit } = this.props;
    return (
      <Form onSubmit={childrenDrawerSubmit}>
        <Row>
          <Col>
            <FormItem label={'姓名'} {...formItemLayout}>
              {
                getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入姓名' }],
                  initialValue: childrenDrawerRecord.name
                })(
                  <Input placeholder={'请输入'} />
                )
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label={'登录名'} {...formItemLayout}>
              {
                getFieldDecorator('loginName', {
                  rules: [{ required: true, message: '请输入登录名' }],
                  initialValue: childrenDrawerRecord.loginName
                })(
                  <Input placeholder={'请输入'} />
                )
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label={'归属公司'} {...formItemLayout}>
              {
                getFieldDecorator('gsgs', {
                  rules: [{ required: true, message: '请输入归属公司' }],
                  initialValue: childrenDrawerRecord.gsgs
                })(
                  <Input placeholder={'请输入'} />
                )
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label={'归属部门'} {...formItemLayout}>
              {
                getFieldDecorator('dept', {
                  rules: [{ required: true, message: '请输入归属部门' }],
                  initialValue: childrenDrawerRecord.dept
                })(
                  <Select placeholder={'请选择'}>
                    <Option value={'1'}>{'开发部'}</Option>
                    <Option value={'2'}>{'实施部'}</Option>
                    <Option value={'3'}>{'行政部'}</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label={'电话'} {...formItemLayout}>
              {
                getFieldDecorator('call', {
                  initialValue: childrenDrawerRecord.call
                })(
                  <Input placeholder={'请输入'} />
                )
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label={'手机号'} {...formItemLayout}>
              {
                getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入手机号' }],
                  initialValue: childrenDrawerRecord.phone
                })(
                  <Input placeholder={'请输入'} />
                )
              }
            </FormItem>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Button type={'primary'} htmlType={'submit'}>确定</Button>
            <Button style={{ marginLeft: 8 }} htmlType={'reset'} onClick={() => resetFields()}>重置</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}