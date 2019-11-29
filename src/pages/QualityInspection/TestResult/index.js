/**
 * @Author: chengyafang 
 * @Date: 2019-10-15 14:46:56 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-14 09:50:43
 * @file 数据审核 - 检查结果
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Select, Input, DatePicker, Button, Menu, Dropdown, Icon, Modal, Spin, message, TreeSelect, Col, Checkbox, Tooltip } from 'antd';
import AdvancedSearch from '@/components/AdvancedSearch';
import { testBatchSelect, statusSelect, attributesSelect, verificationRuleSelect, caseSourceStatusSelect } from '@/constant';
import FetchTable from '@/components/FetchTable';
// import SettingButton from '@/components/SettingButton';
import { Link } from 'dva/router';
import ErrorData from '@/assets/errorData.json';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;

class TestResult extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showAdvancedSearch: false,
      columns: null,
      loading: false,
      isSelected: false,
      visible: false,
      valueTreeSelect: null,
      isDisable: true,
      isChecked: true
    }
  }
  // 数据检查
  getDataCheck = () => {
    this.setState({ visible: true, isDisable: true, isChecked: true });
  }
  // 清除检查结果
  clearCheckResults = () => {
    if (this.state.isSelected === false) {
      Modal.confirm({
        content: '没有选中任何记录，是否清除所有检查结果？',
        onOk: () => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ loading: false, isSelected: false });
          }, 500);
        }
      });
    } else {
      Modal.confirm({
        content: '是否清除所选记录的检查结果？',
        onOk: () => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ loading: false, isSelected: false });
          }, 500);
        }
      });
    }
  }
  // 日常数据备份
  backupData = () => {
    message.success("备份成功!");
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }
  handleMenuClick = e => {
    // 导出：简要信息
    if (e.key === '1') {
      Modal.confirm({
        content: "确认导出简要信息？",
        onOk: () => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 500);
        }
      });
    }
    // 导出：详细信息
    else if (e.key === '2') {
      Modal.confirm({
        content: "确认导出详细信息？",
        onOk: () => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 500);
        }
      });
    }
    // 更多功能：数据保密处理
    else if (e.key === '3') {
      Modal.confirm({
        content: "确认导出详细信息？",
        onOk: () => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 500);
        }
      });
    }
    // 更多功能：病案删除
    else if (e.key === '4') {
      if (this.state.isSelected === false) {
        return message.warn('请至少选择一条数据进行操作！');
      } else {
        Modal.confirm({
          content: '是否确认病例删除？',
          onOk: () => {
            this.setState({ loading: true });
            setTimeout(() => {
              this.setState({ loading: false });
            }, 500);
          }
        })
      }
    }
    console.log('Click on menu item.click', e);
  }
  render() {
    const { showAdvancedSearch, visible } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key={'1'}>导出简要信息</Menu.Item>
        <Menu.Item key={'2'}>导出详细信息</Menu.Item>
      </Menu>
    );
    const moreFeaturesMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key={'3'}>数据保密处理</Menu.Item>
        <Menu.Item key={'4'}>病案删除</Menu.Item>
      </Menu>
    );
    let columns = [
      {
        title: '病案号',
        dataIndex: 'p3',
        fixed: 'left',
        width: 168,
        render: (text, record, index) => (
          <Link to={{ pathname: `/handle/qualityInspection/testResult/commonShow`, search: `id=${record.id}` }}>{text}</Link>
        )
      },
      { title: '姓名', dataIndex: 'p4', width: 112 },
      { title: '性别', dataIndex: 'p5', width: 112 },
      { title: '入院时间', dataIndex: 'p22', width: 168 },
      { title: '出院时间', dataIndex: 'p25', width: 168 },
      { title: '出院科别', dataIndex: 'p26', width: 112 },
      { title: '出院科别名称', dataIndex: 'p26_fdesc', width: 168 },
      { title: '编码员', dataIndex: 'p438', width: 112 },
      { title: '主治医师', dataIndex: 'p433', width: 112 },
      { title: '住院医师', dataIndex: 'p434', width: 112 },
      { title: '住院总费用', dataIndex: 'p782', width: 112 },
      {
        title: '疑似问题',
        dataIndex: 'tipMsg',
        width: 224,
        render: (text, record, index) => (
          text && <Tooltip placement="topLeft" title={text}><div className="ellipsis">{text}</div></Tooltip>
        )
      },
      {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        align: 'center',
        width: 120,
        unMovable: true,
        render: (text, record) => <a onClick={() => message.info('暂无数据！')}>查看评分</a>
      }
    ];
    const loop = data => data.map((item) => {
      return (
        <TreeNode value={item.value} key={item.value} title={item.text} />
      );
    });
    return (
      <Authority>
        <PageHeaderWrapper title={'检查结果'}>
          <Row>
            <Button type={'primary'} onClick={this.getDataCheck}>数据检查</Button>
            <Button type={'primary'} style={{ margin: '0px 8px' }} onClick={this.clearCheckResults}>清除检查结果</Button>
            {/* <Button type={'primary'} onClick={this.backupData}>日常数据备份</Button> */}
            <Button type={'primary'}>上报DBF文件</Button>
            {/* <Button type={'primary'}>检测数据单条</Button> */}
            <Dropdown.Button overlay={menu} icon={<Icon type="down" />} style={{ margin: '0px 8px' }}><Icon type="export" />导出</Dropdown.Button >
            <Dropdown.Button overlay={moreFeaturesMenu} icon={<Icon type="down" />}>更多功能</Dropdown.Button>
            <div className={'pull-right'}>
              检测批次：
              <Select
                showSearch
                style={{ width: 220 }}
                defaultValue={testBatchSelect[0].value}
                filterOption={(inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
              >
                {
                  testBatchSelect.map((item, index) => {
                    return <Option value={item.value} key={index}>{item.text}</Option>
                  })
                }
              </Select>
              <a style={{ marginLeft: 8 }}
                onClick={() => {
                  this.setState({ showAdvancedSearch: !this.state.showAdvancedSearch });
                }}
              >
                {showAdvancedSearch ? '收起' : '展开'}
              </a>
              {/* <SettingButton
                isDropDown={false}
                hasIndex={false}
                style={{ display: 'inline-block', float: 'right', marginLeft: 8, fontSize: 20, cursor: 'pointer' }}
                cell={[
                  {//设置table表头排序
                    type: 'sorterTable',
                    columns: columns,
                    callback: (columns) => {
                      this.setState({ columns });
                    }
                  }
                ]}
              /> */}
            </div>
          </Row>
          <AdvancedSearch
            visible={showAdvancedSearch}
            defaultFormOption={[
              {
                label: '状态',
                key: 'name2',
                options: { initialValue: '' },
                render: () => (
                  <Select >
                    <Option value={''}>全部</Option>
                    {
                      statusSelect.map((item, index) => {
                        return <Option value={item.value} key={index}>{item.text}</Option>
                      })
                    }
                  </Select>
                )
              },
              {
                label: '属性',
                key: 'name3',
                options: { initialValue: '' },
                render: () => (
                  <Select
                    showSearch
                    filterOption={(inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
                  >
                    <Option value={''}>全部</Option>
                    {
                      attributesSelect.map((item, index) => {
                        return <Option value={item.value} key={index}>{item.text}</Option>
                      })
                    }
                  </Select>
                )
              },
              {
                label: '验证规则',
                key: 'name4',
                options: { initialValue: '' },
                render: () => (
                  <Select
                    showSearch
                    filterOption={(inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
                  >
                    <Option value={''}>全部</Option>
                    {
                      verificationRuleSelect.map((item, index) => {
                        return <Option value={item.value} key={index}>{item.text}</Option>
                      })
                    }
                  </Select>
                )
              },
              {
                label: '病案号',
                key: 'name5',
                render: () => (
                  <Input placeholder={'请输入'} />
                )
              },
              {
                label: '编码元',
                key: 'name6',
                render: () => (
                  <Input placeholder={'请输入'} />
                )
              },
              {
                label: '科室管理员',
                key: 'name7',
                options: { initialValue: '' },
                render: () => (
                  <Select>
                    <Option value={''}>全部</Option>
                    <Option value={'1'}>{'医院管理人员'}</Option>
                  </Select>
                )
              },
              {
                label: '出院日期',
                key: 'name8',
                render: () => (
                  <RangePicker />
                )
              },
              {
                label: '病案源状态',
                key: 'name9',
                options: { initialValue: '' },
                render: () => (
                  <Select>
                    <Option value={''}>全部</Option>
                    {
                      caseSourceStatusSelect.map((item, index) => {
                        return <Option value={item.value} key={index}>{item.text}</Option>
                      })
                    }
                  </Select>
                )
              }
            ]}
            onSearch={query => {
              console.log(query);
              this.setState({ loading: true });
              setTimeout(() => {
                this.setState({ loading: false });
              }, 500);
            }}
            onReset={data => {
              console.log(data);
              this.setState({ loading: true });
              setTimeout(() => {
                this.setState({ loading: false });
              }, 500);
            }}
          />
          <Spin spinning={this.state.loading}>
            <FetchTable
              ref='table'
              hasIndex={true}
              resizable={true}
              columns={columns}
              rowKey={(record) => `${record.p3}`}
              dataSource={ErrorData}
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
            visible={visible}
            title={'数据检查'}
            centered={true}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => this.setState({ visible: false })}
            onOk={() => { message.success("检测成功!"); this.setState({ visible: false }) }}
          >
            <Row style={{ margin: '16px 0', paddingLeft: 60 }}>
              <Col>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      this.setState({ isDisable: true, valueTreeSelect: null });
                    } else {
                      this.setState({ isDisable: false });
                    }
                    this.setState({ isChecked: e.target.checked });
                  }}
                  checked={this.state.isChecked}
                >全部</Checkbox>
              </Col>
              <Col style={{ marginTop: 16 }}>
                验证规则：
                <TreeSelect
                  showSearch
                  style={{ width: 300 }}
                  value={this.state.valueTreeSelect}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={(value) => this.setState({ valueTreeSelect: value })}
                  disabled={this.state.isDisable}
                >
                  {loop(verificationRuleSelect)}
                </TreeSelect>
              </Col>
            </Row>
          </Modal>
        </PageHeaderWrapper>
      </Authority >
    )
  }
}
export default TestResult;