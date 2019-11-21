/**
 * @Author: chengyafang 
 * @Date: 2019-10-15 15:15:04 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-14 16:29:51
 * @file 数据审核 - 错误分类统计
 */
import React from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Select, DatePicker, Button, Icon, Checkbox, Spin, Modal } from 'antd';
import AdvancedSearch from '@/components/AdvancedSearch';
import { testBatchSelect, attributesSelect, verificationRuleSelect } from '@/constant';
import FetchTable from '@/components/FetchTable';
// import SettingButton from '@/components/SettingButton';
import uuid from 'uuid';

const { Option } = Select;
const { RangePicker } = DatePicker;

class ErrorSortStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvancedSearch: false,
      columns: null,
      loading: false,
      isCheck: true,
      query: {}
    }
  }
  onChangePage = e => {
    console.log(`checked = ${e.target.checked}`);
    this.setState({ isCheck: e.target.checked });
  }
  // 导出
  handleExport = () => {
    Modal.confirm({
      content: '是否导出？',
      onOk: () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false });
        });
      },
      onCancel: () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false });
        });
      }
    });
  }
  render() {
    const { showAdvancedSearch } = this.state;
    let columns = [
      { title: '病案专属', dataIndex: 'bazs', width: 224 },
      { title: '验证规则', dataIndex: 'yzgz', width: 268 },
      { title: '错误数量', dataIndex: 'cwsl', width: 168 },
      { title: '正确', dataIndex: 'zq', width: 112 },
      { title: '待审查', dataIndex: 'dsc', width: 112 },
      { title: '已更改', dataIndex: 'ygg', width: 112 },
      { title: '待删除', dataIndex: 'dDelete', width: 112 },
      { title: '未处理数量', dataIndex: 'wclsl', width: 168 },
      {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        align: 'center',
        width: 120,
        unMovable: true,
        render: (text, record) => <a onClick={() => this.props.history.push('/qualityInspection/testResult')}>查看结果</a>
      }
    ];
    const dataSource = [
      {
        'id': uuid(),
        'bazs': '门诊医生',
        'yzgz': '不能为空',
        'cwsl': '13380',
        'zq': 0,
        'dsc': 0,
        'ygg': 0,
        'dDelete': 0,
        'wclsl': '13380'
      },
      {
        'id': uuid(),
        'bazs': '病案整理者',
        'yzgz': '不能为空',
        'cwsl': '13380',
        'zq': 0,
        'dsc': 0,
        'ygg': 0,
        'dDelete': 0,
        'wclsl': '13380'
      },
      {
        'id': uuid(),
        'bazs': '手术患者类型',
        'yzgz': '如有手术及操作编码 1，不能为空',
        'cwsl': '5565',
        'zq': 0,
        'dsc': 0,
        'ygg': 0,
        'dDelete': 0,
        'wclsl': '5565'
      }
    ];
    return (
      <Authority>
        <PageHeaderWrapper title={'错误分类统计'}>
          <Row>
            <Button onClick={this.handleExport}><Icon type="export" />导出</Button>
            <Button style={{ margin: '0px 8px' }} onClick={this.handleExport}><Icon type="export" />导出明细(XLSX)</Button>
            <Checkbox onChange={this.onChangePage} checked={this.state.isCheck}>分页导出</Checkbox>
            <Button onClick={this.handleExport}><Icon type="export" />导出明细(CSV)</Button>
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
                label: '出院日期',
                key: 'name8',
                render: () => (
                  <RangePicker />
                )
              },
              {
                label: '属性',
                key: 'name9',
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
                label: '信息分类',
                key: 'name2',
                options: { initialValue: '' },
                render: () => (
                  <Select>
                    <Option value={''}>全部</Option>
                    <Option value={'1'}>住院信息</Option>
                    <Option value={'2'}>诊疗信息</Option>
                    <Option value={'3'}>患者信息</Option>
                    <Option value={'4'}>费用信息</Option>
                  </Select>
                )
              },
              {
                label: '规则分类',
                key: 'name3',
                options: { initialValue: '' },
                render: () => (
                  <Select>
                    <Option value={''}>全部</Option>
                    <Option value={'1'}>完整规则</Option>
                    <Option value={'2'}>规范规则</Option>
                    <Option value={'3'}>逻辑规则</Option>
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
              query={this.state.query}
              ref='table'
              hasIndex={true}
              resizable={true}
              columns={columns}
              rowKey='id'
              dataSource={dataSource}
              scroll={{ x: '110%' }}
              style={{ marginTop: 16 }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                }
              }}
            />
          </Spin>
        </PageHeaderWrapper>
      </Authority>
    )
  }
}
export default ErrorSortStatistics;