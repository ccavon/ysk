/**
 * @Author: chengyafang 
 * @Date: 2019-10-31 16:21:42 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-11 10:13:10
 * @file 编码记录
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Input, Button, Icon, Modal, Form, Col, Upload, message, Select, Tooltip } from 'antd';
import FetchTable from '@/components/FetchTable';
import Code from '@/assets/code.json';
import uuid from "uuid";

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 6 },
    lg: { span: 6 },
    xl: { span: 6 },
    xxl: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 18 },
    lg: { span: 16 },
    xl: { span: 16 },
    xxl: { span: 18 }
  }
};

@Form.create()
class CodeRecord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false
    }
  }
  handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false
          });
        }, 500);
      }
    });
  };
  render() {
    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator, resetFields } = this.props.form;
    const columns = [
      { title: '编码类别', dataIndex: 'codeType', width: 168 },
      { title: '原诊断编码', dataIndex: 'oldCode', width: 224 },
      { title: '原诊断名称', dataIndex: 'oldName', width: 224, render: (text, record, index) => text && <Tooltip placement="topLeft" title={text}><div className="ellipsis">{text}</div></Tooltip> },
      { title: '映射诊断编码', dataIndex: 'newCode', width: 224 },
      { title: '映射诊断名称', dataIndex: 'newName', width: 224, render: (text, record, index) => text && <Tooltip placement="topLeft" title={text}><div className="ellipsis">{text}</div></Tooltip> },
      { title: '错误信息', dataIndex: 'errorInfo', width: 224 },
      {
        title: '操作',
        dataIndex: 'action',
        width: 80,
        fixed: 'right',
        align: 'center',
        render: (text, record, index) => {
          return <a>删除</a>;
        }
      },
    ];
    const fileUploadProps = {
      // action: '',
      listType: 'picture',
      accept: '.rar, .zip, .doc, .docx, .pdf, .xls, .xlsx',
      beforeUpload: file => {
        if (file.size / 1024 > 1024 * 50) {
          message.error('附件不能超过50M');
          return false;
        }
        return true;
      }
    };
    return (
      <Authority>
        <PageHeaderWrapper title={'编码记录'}>
          <Row>
            <Button type='primary' onClick={() => this.setState({ visible: true })}><Icon type="import" />上传</Button>
            <Input.Search className='layout_search-right' placeholder='模糊查询' />
          </Row>
          <FetchTable
            ref='table'
            hasIndex={true}
            resizable={true}
            columns={columns}
            rowKey={(record) => `${uuid()}${record.newCode}`}
            dataSource={Code}
            scroll={{ x: '110%' }}
            style={{ marginTop: 16 }}
          />
          <Modal
            title={'上传文件'}
            visible={visible}
            centered={true}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={() => { this.setState({ visible: false }); resetFields(); }}
            confirmLoading={confirmLoading}
            onOk={this.handleOk}
          >
            <Form>
              <Row>
                <Col>
                  <FormItem label={'编码类型'} {...formItemLayout}>
                    {
                      getFieldDecorator('codeType', {
                        rules: [{ required: true, message: '请输入编码类型' }],
                      })(
                        <Select placeholder={'请选择'}>
                          <Option value={'1'}>诊断</Option>
                          <Option value={'2'}>手术</Option>
                        </Select>
                      )
                    }
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label={'选择文件'} {...formItemLayout}>
                    {
                      getFieldDecorator('uploadFile', {
                        rules: [{ required: true, message: '请上传选择文件' }]
                      })(
                        <Upload {...fileUploadProps}>
                          <Button>
                            <Icon type='upload' />上传文件
                          </Button>
                        </Upload>
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
export default CodeRecord;
