/**
 * @Author: chengyafang 
 * @Date: 2019-10-22 16:28:05 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-04 11:24:42
 * @file 实时数据采集 - 医保结算清单
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Input, Modal, Tabs, Col } from 'antd';
import FetchTable from '@/components/FetchTable';
import Details from './details';
import medicalInsuranceData from '@/assets/medicalInsurance.json';
import errorData from '@/assets/errorData.json';

const { TabPane } = Tabs;

class JSList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      recordData: {}
    }
  }
  render() {
    const { visible } = this.state;
    const columns = [
      {
        title: '病案号',
        dataIndex: 'bah',
        width: 168,
        render: (text, record, index) => {
          return (
            <a onClick={() => this.setState({ visible: true, recordData: record })}>{text}</a>
          )
        }
      },
      { title: '姓名', dataIndex: 'xm', width: 168 },
      { title: '性别', dataIndex: 'xb', width: 112, render: (text, record, index) => text && text === '2' ? '女' : text === '1' ? '男' : '' },
      { title: '出生日期', dataIndex: 'CSRQ', width: 112 },
      { title: '年龄', dataIndex: 'NL', width: 112, render: (text, record, index) => text ? parseInt(text) : '' },
      { title: '国籍', dataIndex: 'GJ', width: 112, render: (text, render, index) => text ? '中国' : '' },
      { title: '民族', dataIndex: 'MZ', width: 112, render: (text, record, index) => text && text === '01' ? '汉族' : text === '15' ? '土家族' : '' },
      { title: '患者证件号码', dataIndex: 'hzzjhm', width: 224 }
    ];
    for (let index = 0; index < errorData.length; index++) {
      medicalInsuranceData[index].tipMsg = errorData[index].tipMsg;
    }
    return (
      <Authority>
        <PageHeaderWrapper title={'医保结算清单'}>
          <Row>
            <Input.Search className='layout_search-right' placeholder='模糊查询' />
          </Row>
          <FetchTable
            ref='table'
            hasIndex={true}
            resizable={true}
            columns={columns}
            rowKey={(record) => `${record.bah}${record.hzzjhm}`}
            dataSource={medicalInsuranceData}
            scroll={{ x: '100%' }}
            style={{ marginTop: 16 }}
          />
          <Modal
            title={'结算清单'}
            visible={visible}
            width={1400}
            centered={true}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => this.setState({ visible: false })}
            className={'qingdan-warp'}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="医保结算清单" key="1">
                <Details data={this.state.recordData} />
              </TabPane>
              <TabPane tab={'错误信息'} key={'2'}>
                <Row>
                  <Col span={6} style={{ textAlign: 'right' }}>疑似问题：</Col>
                  <Col span={12}>
                  <Input.TextArea rows={'19'} value={this.state.recordData.tipMsg} />
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Modal>
        </PageHeaderWrapper>
      </Authority>
    )
  }
}
export default JSList;