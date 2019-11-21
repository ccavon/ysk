/**
 * @Author: chengyafang 
 * @Date: 2019-10-24 11:02:36 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-14 10:48:51
 * @file 基础设置 - 上报文件
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Button, Icon, Input, Spin, Modal, message } from 'antd';
import FetchTable from '@/components/FetchTable';
import ImportFile from '@/components/ImportFile';

class ReportFile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      importVisible: false,
      loading: false,
      dataSource: [],
      hasAnalysis: false, // 无解析结果
    }
  }
  render() {
    const { importVisible } = this.state;
    const columns = [
      { title: '单据号', dataIndex: 'djNo', width: 168 },
      { title: '状态', dataIndex: 'fstate', width: 112 },
      { title: '上报时间', dataIndex: 'reportTime', width: 168 },
      { title: '上报机构', dataIndex: 'reportOrg', width: 168 },
      { title: '患者姓名', dataIndex: 'patientName', width: 168 },
      { title: '事件发生时间', dataIndex: 'eventTime', width: 168 },
      { title: '事件后果', dataIndex: 'eventResult', width: 224 },
      { title: '事件状态', dataIndex: 'eventFstate', width: 112 },
      { title: '上报人员', dataIndex: 'reportName', width: 168 },
      { title: '上报类型', dataIndex: 'reportType', width: 112 }
    ];
    return (
      <Authority>
        <PageHeaderWrapper title={'上报文件'}>
          <Row>
            {/* <Button type='primary'><Icon type="plus" />新增</Button> */}
            <Button type={'primary'} style={{ marginRight: 8 }} onClick={() => this.setState({ importVisible: true })}><Icon type="import" />上报</Button>
            <Button><Icon type="export" />导出</Button>
            <Input.Search className='layout_search-right' placeholder='模糊查询' />
          </Row>
          <Spin spinning={this.state.loading}>
            <FetchTable
              ref='table'
              hasIndex={true}
              resizable={true}
              columns={columns}
              rowKey='id'
              dataSource={this.state.dataSource}
              scroll={{ x: '100%' }}
              style={{ marginTop: 16 }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                }
              }}
            />
          </Spin>
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
export default ReportFile;