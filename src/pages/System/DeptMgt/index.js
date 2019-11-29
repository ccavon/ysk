/*
 * @Author: chengyafang 
 * @Date: 2019-11-26 16:26:41 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-27 16:27:04
 * @File 设置管理 - 部门管理
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TwoLayout from '@/components/TwoLayout';
import { Input, Icon, Tree, Button } from 'antd';
import FetchTable from '@/components/FetchTable';

const { TreeNode } = Tree;

const treeData = [
  {
    name: '超级总公司',
    value: 'A',
    parentId: '1',
    children: [
      { name: '研发部', value: 'A-1', parentId: '1-1' },
      { name: '实施部', value: 'A-2', parentId: '1-2' },
      { name: '财务部', value: 'A-3', parentId: '1-3' },
      { name: '销售部', value: 'A-4', parentId: '1-4' },
      { name: '产品部', value: 'A-5', parentId: '1-5' }
    ]
  },
  {
    name: '总公司',
    value: 'B',
    parentId: '2'
  }
];

class DeptMgt extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      dataSource: []
    }
  }
  treeSelect = (selectedKeys, info) => {
    console.log(selectedKeys, info);
    this.setState({ selectedKeys });
    let dataSource = [];
    if (selectedKeys.toString() === 'A-1') {
      dataSource = [{ title: '研发部', dataIndex: 'deptName' }];
      this.setState({ dataSource });
    }
  }
  render() {
    const { selectedKeys } = this.state;
    const loop = data => data.map(item => {
      if (item.children) {
        return (
          <TreeNode key={item.value} title={item.name} id={item.parentId}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.value} title={item.name} id={item.parentId} />;
    });
    const columns = [
      { title: '部门名称', dataIndex: 'deptName', render: (text, record, index) => <a>{text}</a> },
      { title: '状态', dataIndex: 'fstate' },
      { title: '编码', dataIndex: 'code' },
      { title: '类型', dataIndex: 'type' },
      { title: '地址', dataIndex: 'address' },
      {
        title: '操作',
        dataIndex: 'action',
        width: 80,
        align: 'center',
        render: (text, record, index) => {
          return (
            <span>
              <a>删除</a>
            </span>
          )
        }
      }
    ];
    return (
      <Authority>
        <PageHeaderWrapper title={'部门管理'} twoLayout={'twoLayoutClassNane'}>
          <TwoLayout
            LeftContent={
              <div className={'col-sty'}>
                <Input.Search
                  placeholder={'模糊搜索'}
                  style={{ width: '80%', margin: '16px 0 0' }}
                />
                <Icon type="plus" style={{ color: '#1890ff', fontSize: 20, marginLeft: 10 }} />
                <div className={'treeData-redundance-hidden'}>
                  <Tree
                    autoExpandParent={false}
                    onSelect={this.treeSelect}
                    selectedKeys={selectedKeys}
                  >
                    {loop(treeData)}
                  </Tree>
                </div>
              </div>
            }
            RightContent={
              <div className={'zIndexLayout-current'}>
                <Button type={'primary'}><Icon type="plus" />新增</Button>
                <FetchTable
                  ref='table'
                  hasIndex={false}
                  resizable={true}
                  columns={columns}
                  rowKey={`id`}
                  // dataSource={this.state.dataSource}
                  scroll={{ x: '100%' }}
                  style={{ marginTop: 16 }}
                />
              </div>
            }
          />
        </PageHeaderWrapper>
      </Authority>
    )
  }
}
export default DeptMgt;