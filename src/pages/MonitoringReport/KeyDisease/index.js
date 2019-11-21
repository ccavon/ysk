/*
 * @Author: chengyafang 
 * @Date: 2019-11-12 14:36:25 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-15 09:42:44
 * @file 检测报告 - 常见重点疾病分类
 */
import React, { Component } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Select, Button, Icon, Dropdown, Menu, Divider, Modal, Form, Col, Input, InputNumber, Drawer, Tooltip, message } from 'antd';
import FilterButtonGroup from '@/components/FilterButtonGroup';
import AdvancedSearch from '@/components/AdvancedSearch';
import { Department, forgType } from '@/constant';
import FetchTable from '@/components/FetchTable';
import { formItemLayout } from '@/utils/commonLayout'
import dataSource from './data.json';
import { orgData } from './outerData';
import ImportFile from '@/components/ImportFile';

const { Option } = Select;
const FormItem = Form.Item;

@Form.create()
class KeyDisease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvancedSearch: false,
      titleName: '',
      visibleAdd: false,
      isEdit: false,
      recordData: {},
      visibleCustom: false,
      orgTitleName: '',
      visibleOrg: false,
      orgRecordData: {},
      importVisible: false
    }
  }
  getSeleteName = (list, val) => {
    let arr = list.filter(item => item.value === val);
    if (arr && !arr.length) {
      return '';
    }
    return arr && arr[0].text;
  }
  // 新增
  add = () => {
    this.setState({ visibleAdd: true, titleName: '新增', isEdit: false, recordData: {} });
  }
  // 编辑
  edit = record => {
    this.setState({ titleName: '编辑', visibleAdd: true, isEdit: true, recordData: record });
  }
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { showAdvancedSearch, titleName, visibleAdd, recordData, visibleCustom, visibleOrg, orgTitleName, importVisible } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="1">主要诊断</Menu.Item>
        <Menu.Item key="2">次要诊断</Menu.Item>
        <Menu.Item key="3">所有诊断</Menu.Item>
      </Menu>
    );
    const columns = [
      {
        title: '病种名称',
        dataIndex: 'diseasesName',
        width: 224,
        render: (text, record, index) => text && <Tooltip placement="topLeft" title={text}><div className="ellipsis">{text}</div></Tooltip>
      },
      {
        title: '编码范围',
        dataIndex: 'codeRange',
        width: 268,
        render: (text, record, index) => text && <Tooltip placement="topLeft" title={text}><div className="ellipsis">{text}</div></Tooltip>
      },
      {
        title: '医院等级',
        dataIndex: 'orgGrade',
        width: 168,
        render: (text, record) => {
          if (text === '1') {
            return '一级';
          } else if (text === '2') {
            return '二级';
          } else if (text === '3') {
            return '三级';
          } else if (text === '4') {
            return '未评';
          }
        }
      },
      {
        title: '医院类型',
        dataIndex: 'forgType',
        width: 168,
        render: (text, record) => text && this.getSeleteName(forgType, text)
      },
      {
        title: '相关科室',
        dataIndex: 'dept',
        width: 168,
        render: (text, record) => text && this.getSeleteName(Department, text)
      },
      { title: '排序号', dataIndex: 'pxh', width: 112 },
      { title: '自定义个数', dataIndex: 'num', width: 112 },
      {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        width: 160,
        align: 'center',
        render: (text, record, index) => {
          return (
            <span>
              <a onClick={() => this.edit(record)}>编辑</a>
              <Divider type="vertical" />
              <a onClick={() => this.setState({ visibleCustom: true, orgRecordData: record })}>自定义设置</a>
            </span>
          )
        }
      }
    ];
    const orgColumns = [
      { title: '医院名称', dataIndex: 'orgName' },
      { title: '编码范围', dataIndex: 'code' },
      {
        title: '操作',
        dataIndex: 'action',
        width: 120,
        align: 'center',
        render: (text, record, index) => {
          return (
            <span>
              <a>编辑</a>
              <Divider type="vertical" />
              <a>删除</a>
            </span>
          )
        }
      }
    ];
    return (
      <Authority>
        <PageHeaderWrapper title={'常见手术/疾病分类'}>
          <Row>
            <Button type={'primary'} onClick={() => this.add()}><Icon type="plus" />新增</Button>
            <Button type={'primary'} className='button-gap'>统计</Button>
            <Button className='button-gap'>设置相关科室</Button>
            <Button className='button-gap'>删除</Button>
            <Button style={{ margin: '0 8px' }} onClick={() => this.setState({ importVisible: true })}>导入</Button>
            <Dropdown.Button overlay={menu}>导出</Dropdown.Button>
            <div className={'pull-right'}>
              <FilterButtonGroup
                label='手术/疾病分类'
                defaultValue={'1'}
                options={[
                  { text: "常见重点疾病分类", value: '1' },
                  { text: "常见重点手术分类", value: '2' },
                  { text: "常见恶心肿瘤分类", value: '3' },
                  { text: "恶心肿瘤重点手术分类", value: '4' }
                ]}
              />
              <a style={{ marginLeft: 8 }}
                onClick={() => {
                  this.setState({ showAdvancedSearch: !this.state.showAdvancedSearch });
                }}
              >
                {showAdvancedSearch ? '收起' : '展开'}
              </a>
            </div>
          </Row>
          <AdvancedSearch
            visible={showAdvancedSearch}
            defaultFormOption={[
              {
                label: '医院等级',
                key: 'orgGrade',
                render: () => (
                  <Select placeholder={'请选择'}>
                    <Option value={'1'}>一级</Option>
                    <Option value={'2'}>二级</Option>
                    <Option value={'3'}>三级</Option>
                    <Option value={'4'}>未评</Option>
                  </Select>
                )
              },
              {
                label: '医院类型',
                key: 'forgType',
                render: () => (
                  <Select
                    placeholder={'请选择'}
                    showSearch
                    allowClear
                    filterOption={(inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
                  >
                    {
                      forgType.map((item, index) => {
                        return <Option value={item.value} key={index}>{item.text}</Option>
                      })
                    }
                  </Select>
                )
              },
              {
                label: '医院科室',
                key: 'orgDept',
                render: () => (
                  <Select
                    placeholder={'请选择'}
                    showSearch
                    allowClear
                    filterOption={(inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
                  >
                    {
                      Department.map((item, index) => {
                        return <Option value={item.value} key={index}>{item.text}</Option>
                      })
                    }
                  </Select>
                )
              }
            ]}
          />
          <FetchTable
            ref='table'
            hasIndex={true}
            resizable={true}
            columns={columns}
            rowKey={record => `${record.code}${record.pxh}`}
            dataSource={dataSource}
            scroll={{ x: '110%' }}
            style={{ marginTop: 16 }}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              }
            }}
          />
          <Modal
            className='validataModal'
            title={titleName}
            visible={visibleAdd}
            centered={true}
            destroyOnClose={true}
            maskClosable={false}
            width={800}
            onCancel={() => { this.setState({ visibleAdd: false }); resetFields(); }}
          >
            <Form>
              <Row>
                <Col>
                  <FormItem label={'医院等级'} {...formItemLayout}>
                    {
                      getFieldDecorator('orgGrade', {
                        initialValue: recordData.orgGrade
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>一级</Option>
                          <Option value={'2'}>二级</Option>
                          <Option value={'3'}>三级</Option>
                          <Option value={'4'}>未评</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'医院类型'} {...formItemLayout}>
                    {
                      getFieldDecorator('forgType', {
                        initialValue: recordData.forgType
                      })(
                        <Select placeholder={'请选择'}>
                          {
                            forgType.map((item, index) => {
                              return <Option value={item.value} key={index}>{item.text}</Option>
                            })
                          }
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'名称'} {...formItemLayout}>
                    {
                      getFieldDecorator('orgName', {
                        initialValue: recordData.diseasesName
                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'疾病范围'} {...formItemLayout}>
                    {
                      getFieldDecorator('diseaseRange', {

                      })(
                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'编码范围'} {...formItemLayout}>
                    {
                      getFieldDecorator('codeRange', {
                        initialValue: recordData.codeRange
                      })(

                        <Input placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'排序号'} {...formItemLayout}>
                    {
                      getFieldDecorator('pxh', {
                        initialValue: recordData.pxh
                      })(
                        <InputNumber min={0} style={{ width: '100%' }} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'疾病条件语句'} {...formItemLayout}>
                    {
                      getFieldDecorator('diseaseCon', {

                      })(
                        <Input.TextArea rows={2} placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'规则语句'} {...formItemLayout}>
                    {
                      getFieldDecorator('rule', {
                        initialValue: recordData.rule
                      })(
                        <Input.TextArea rows={4} placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'其他规则备注'} {...formItemLayout}>
                    {
                      getFieldDecorator('ruleRemark', {

                      })(
                        <Input.TextArea rows={2} placeholder={'请输入'} />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Modal>
          <Drawer
            title="自定义设置"
            width={720}
            onClose={() => this.setState({ visibleCustom: false })}
            visible={visibleCustom}
            destroyOnClose={true}
            maskClosable={false}
          >
            <Row>
              <Button
                type={'primary'}
                onClick={() => this.setState({ visibleOrg: true, orgTitleName: '新增' })}
              >
                <Icon type="plus" />新增
              </Button>
              <div className={'pull-right'}>
                医疗机构：
                <Select placeholder={'请选择'} style={{ width: 220 }}>
                  {
                    orgData.map((item, index) => {
                      return <Option value={item.orgCode} key={index}>{item.fdesc}</Option>
                    })
                  }
                </Select>
              </div>
              <FetchTable
                ref='tableDrawer'
                hasIndex={true}
                resizable={true}
                columns={orgColumns}
                rowKey={'id'}
                // dataSource={dataSource}
                scroll={{ x: '100%' }}
                style={{ marginTop: 16 }}
                rowSelection={{
                  onChange: (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                  }
                }}
              />
            </Row>
          </Drawer>
          <Modal
            className='validataModal'
            title={orgTitleName}
            visible={visibleOrg}
            centered={true}
            destroyOnClose={true}
            maskClosable={false}
            onCancel={() => this.setState({ visibleOrg: false })}
          >
            <OrgModalFormCom orgRecordData={this.state.orgRecordData} />
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
                  message.warn(msg);
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
export default KeyDisease;

class OrgModalForm extends Component {
  render() {
    const { form: { getFieldDecorator }, orgRecordData } = this.props;
    return (
      <Form>
        <Row>
          <Col>
            <FormItem label={'医疗机构'} {...formItemLayout}>
              {
                getFieldDecorator('orgId', {
                  rules: [{ required: true, message: '请选择医疗机构' }]
                })(
                  <Select placeholder={'请选择'}>
                    {
                      orgData.map((item, index) => {
                        return <Option value={item.orgCode} key={index}>{item.fdesc}</Option>
                      })
                    }
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label={'编码范围'} {...formItemLayout}>
              {
                getFieldDecorator('codeRange', {
                  rules: [{ required: true, message: '请输入编码范围' }],
                  initialValue: orgRecordData.codeRange
                })(
                  <Input placeholder={'请输入'} />
                )
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label={'语句规则'} {...formItemLayout}>
              {
                getFieldDecorator('rule', {
                  rules: [{ required: true, message: '请输入语句规则' }],
                  initialValue: orgRecordData.rule
                })(
                  <Input.TextArea rows={6} placeholder={'请输入'} />
                )
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}
const OrgModalFormCom = Form.create()(OrgModalForm);