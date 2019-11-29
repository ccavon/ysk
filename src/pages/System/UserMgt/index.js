/*
 * @Author: chengyafang 
 * @Date: 2019-11-25 09:31:07 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-26 09:51:40
 * @File 系统管理 - 用户管理
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TwoLayout from '@/components/TwoLayout';
import { Input, Tree, Row, Button, Icon, Divider, Modal, Form, Col, Select, TreeSelect } from 'antd';
import FetchTable from '@/components/FetchTable';
import uuid from 'uuid';
import { responceColTwo, formItemLayoutTwo } from '@/utils/commonLayout';

const { TreeNode } = Tree;
const FormItem = Form.Item;
const { Option } = Select;

const treeData = [
  {
    userId: '1',
    userName: '系统管理员',
    children: [
      { userId: '1.0', userName: '管理员1' },
      { userId: '1.1', userName: '管理员2' },
      { userId: '1.2', userName: '管理员3' },
    ]
  },
  { userId: '2', userName: '测试管理员' },
  { userId: '3', userName: '前端管理员' },
  { userId: '4', userName: '超级管理员' },
];
const getTreeSelect = [
  { name: '测试1', id: '1', children: [{ name: '二级测试1', id: '001' }] },
  { name: '测试2', id: '2', children: [{ name: '二级测试2', id: '002' }] },
  { name: '测试3', id: '3', children: [{ name: '二级测试3', id: '003' }] },
  { name: '测试4', id: '4', children: [{ name: '二级测试4', id: '004' }] },
  { name: '测试5', id: '5', children: [{ name: '二级测试5', id: '005' }] },
  { name: '测试6', id: '6', children: [{ name: '二级测试6', id: '006' }] },
  { name: '测试7', id: '7', children: [{ name: '二级测试7', id: '007' }] },
  { name: '测试8', id: '8' },
  { name: '测试9', id: '9' },
  { name: '测试10', id: '10' }
];

@Form.create()
class UserMgt extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: '',
      selectedKeys: [],
      dataSource: [],
      visible: false,
      modalTitle: '',
      recordData: {}
    }
  }
  // 左边树结构搜索
  onChange = e => {
    const { value } = e.target;
    const expandedKeys = treeData.map(item => {
      if (item.userName.indexOf(value) > -1) {
        return this.getParentKey(item.key, treeData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({ expandedKeys, searchValue: value });
  }
  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.userId === key)) {
          parentKey = node.userId;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  }
  onExpand = expandedKeys => {
    this.setState({ expandedKeys });
  };
  onSelect = (selectedKeys, info) => {
    console.log(selectedKeys, info);
    this.setState({ selectedKeys });
    let dataSource = [];
    if (selectedKeys.length) {
      dataSource = [
        { loginNo: 'admin1', loginName: '管理员1', realName: '程雅芳', areaId: '华信卫健', orgId: '', sysRoleId: '', sysDeptId: '研发部', id: uuid() },
        { loginNo: 'admin', loginName: '超级管理员', realName: '熊慧慧', areaId: '华信卫健', orgId: '', sysRoleId: '', sysDeptId: '实施部', id: uuid() }
      ];
      this.setState({ dataSource });
    } else {
      dataSource = [];
      this.setState({ dataSource });
    }
  }
  formatTreeSelect = data => {
    if (data && !data.length) {
      return [];
    }
    return data.map(item => {
      const { name, id } = item;
      item.title = name;
      item.value = id;
      item.key = id;
      if (item.children) {
        item.children = this.formatTreeSelect(item.children);
      }
      return item;
    });
  }
  deletes = (text, record, index) => {
    console.log(text, record, index);
    Modal.confirm({
      title: '是否确认删除？',
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel: () => { }
    });
  }
  render() {
    const { expandedKeys, searchValue, selectedKeys, visible, modalTitle, recordData } = this.state;
    const { getFieldDecorator } = this.props.form;
    const loop = data => data.map(item => {
      const index = item.userName.indexOf(searchValue);
      const beforeStr = item.userName.substr(0, index);
      const afterStr = item.userName.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
          <span>{item.userName}</span>
        );
      if (item.children) {
        return (
          <TreeNode key={item.userId} title={title}>{loop(item.children)}</TreeNode>
        )
      }
      return <TreeNode key={item.userId} title={title} />
    });
    const columns = [
      { title: '登录账号', dataIndex: 'loginNo', width: 168 },
      { title: '登录名称', dataIndex: 'loginName', width: 168 },
      { title: '真实姓名', dataIndex: 'realName', width: 168 },
      { title: '所属区域', dataIndex: 'areaId', width: 224 },
      { title: '管辖机构等级', dataIndex: 'orgId', width: 168 },
      { title: '角色', dataIndex: 'sysRoleId', width: 168 },
      { title: '科室', dataIndex: 'sysDeptId', width: 168 },
      {
        title: '操作',
        dataIndex: 'action',
        width: 120,
        fixed: 'right',
        align: 'center',
        render: (text, record, index) => {
          return (
            <span>
              <a onClick={() => this.setState({ recordData: record, modalTitle: '编辑', visible: true })}>编辑</a>
              <Divider type="vertical" />
              <a onClick={() => this.deletes(text, record, index)}>删除</a>
            </span>
          )
        }
      }
    ];
    return (
      <Authority>
        <PageHeaderWrapper title={'用户管理'} twoLayout={'twoLayoutClassNane'}>
          <TwoLayout
            LeftContent={
              <div className={'col-sty'}>
                <Input.Search
                  placeholder={'用户组名'}
                  style={{ width: '90%', margin: '16px 0 8px' }}
                  onChange={this.onChange}
                />
                <div className={'treeData-redundance-hidden'}>
                  <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    selectedKeys={selectedKeys}
                    onSelect={this.onSelect}
                  >
                    {loop(treeData)}
                  </Tree>
                </div>
              </div>
            }
            RightContent={
              <div>
                <Row>
                  <Button type={'primary'} onClick={() => this.setState({ visible: true, modalTitle: '新增' })}><Icon type="plus" />新增</Button>
                  <div className={'pull-right'}>
                    <Input.Search placeholder={'区域/机构/角色/部门'} />
                  </div>
                </Row>
                <FetchTable
                  ref='table'
                  hasIndex={true}
                  resizable={true}
                  columns={columns}
                  rowKey={`id`}
                  dataSource={this.state.dataSource}
                  scroll={{ x: '100%' }}
                  style={{ marginTop: 16 }}
                // rowSelection={{
                //   onChange: (selectedRowKeys, selectedRows) => {
                //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                //     this.setState({ isSelected: true });
                //   }
                // }}
                />
              </div>
            }
          />
          <Modal
            className='validataModal'
            visible={visible}
            title={modalTitle}
            width={1000}
            centered={true}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => this.setState({ visible: false })}
          >
            <Form>
              <Row>
                <Col {...responceColTwo}>
                  <FormItem label={'姓名'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('realName', {
                        rules: [{ required: true, message: '请输入姓名' }],
                        initialValue: recordData.realName
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'邮箱'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('emailAddr', {
                        initialValue: recordData.emailAddr
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'电话'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('telNum', {
                        initialValue: recordData.telNum
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'手机号'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('mobileNum', {
                        initialValue: recordData.mobileNum
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'登录名'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('loginName', {
                        rules: [{ required: true, message: '请输入登录名' }],
                        initialValue: recordData.loginName
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'是否允许登录'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('isLogin', {
                        initialValue: '1'
                      })(
                        <Select>
                          <Option value={'1'}>是</Option>
                          <Option value={'0'}>否</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'归属公司'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('areaId', {
                        rules: [{ required: true, message: '请选择归属公司' }],
                        initialValue: recordData.areaId || []
                      })(
                        <TreeSelect
                          treeData={this.formatTreeSelect(getTreeSelect)}
                          treeDefaultExpandAll
                          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                          placeholder={'请选择'}
                          multiple={true}
                          treeCheckable={true}
                        />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'归属部门'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('sysDeptId', {
                        rules: [{ required: true, message: '请选择归属部门' }],
                        initialValue: recordData.sysDeptId || []
                      })(
                        <TreeSelect
                          treeData={this.formatTreeSelect(getTreeSelect)}
                          treeDefaultExpandAll
                          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                          placeholder={'请选择'}
                          multiple={true}
                          treeCheckable={true}
                        />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'工号'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('jobNo', {
                        rules: [{ required: true, message: '请输入工号' }],
                        initialValue: recordData.loginName
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col {...responceColTwo}>
                  <FormItem label={'用户角色'} {...formItemLayoutTwo}>
                    {
                      getFieldDecorator('sysRoleId', {
                        rules: [{ required: true, message: '请选择用户角色' }],
                        initialValue: recordData.sysRoleId || []
                      })(
                        <TreeSelect
                          treeData={this.formatTreeSelect(getTreeSelect)}
                          treeDefaultExpandAll
                          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                          placeholder={'请选择'}
                          multiple={true}
                          treeCheckable={true}
                        />
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
                        <Input.TextArea placeholder={'请输入'} rows={3} />
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
export default UserMgt;
