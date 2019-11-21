/*
 * @Author: xiangxue   新建或编辑弹窗
 * @Date: 2019-02-22 15:52:13 
 * @Last Modified by: yuwei
 * @Last Modified time: 2019-06-13 17:14:32
 */

import React, { PureComponent } from 'react'
import { Form, Input, Button, Modal, Row, Col } from 'antd';
import * as PropTypes from 'prop-types';
import { formItemLayout, formItemLayoutTwo, responceColTwo } from '@/utils/commonLayout';
import './style.less';

const { labelCol, wrapperCol } = formItemLayout;
const FormItem = Form.Item;
@Form.create()
class AddOrEditModal extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    footer: PropTypes.array,
    defaultFormOption: PropTypes.array,
  };

  static defaultProps = {
    title: '',
    visible: false,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    footer: [],
    defaultFormOption: [],
  };

  componentDidMount = () => {
  }

  onOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.setState({
        loading: true,
      })
      const { onOk } = this.props;
      onOk(values, (data) => { //组件中的callback
        if (data) { //传入的值为 data.result中的状态值 - 关闭当前组件的loading状态
          this.setState({ loading: false })
          this.props.form.resetFields();
        } else {
          this.setState({ loading: false })
        }
      })
    })
  }

  onCancel = () => {
    this.props.form.resetFields();
    let value = this.props.form.getFieldsValue();
    this.props.onCancel(value);
    this.setState({ loading: false })
  }

  getFieldDecoratorDom = (defaultFormOptionFilter,item, index, line) => {
    const { getFieldDecorator } = this.props.form;
  
    const isAddNum = index % 2 === 0;
    const enoughIndex = defaultFormOptionFilter && defaultFormOptionFilter.length > index + 1;
    let reactNode = <Input />;
    if (item.render && typeof item.render === 'function') {
      reactNode = item.render();
    };
    let reactNodeIndex = <Input />;
    if (defaultFormOptionFilter[index].render && typeof defaultFormOptionFilter[index].render === 'function') {
      reactNodeIndex = defaultFormOptionFilter[index].render();
    };
    let reactNodeIndex1 = <Input />;
    if (enoughIndex && defaultFormOptionFilter[index + 1].render && typeof defaultFormOptionFilter[index + 1].render === 'function') {
      reactNodeIndex1 = defaultFormOptionFilter[index + 1].render();
    };

    // if(line === 'single'){

    // }else if(line === 'double'){
    //   if(isAddNum){
    //     if (defaultFormOption[index].render && typeof defaultFormOption[index].render === 'function') {
    //       reactNode = defaultFormOption[index].render();
    //     };
    //   }else{
    //     if (defaultFormOption[index+1].render && typeof defaultFormOption[index+1].render === 'function') {
    //       reactNode = defaultFormOption[index+1].render();
    //     };
    //   }
    // }

    return (
      line === 'single'
        ? <FormItem
          key={item.key}
          label={item.label}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          {
            getFieldDecorator(`${item.key}`, { ...item.options })(
              reactNode
            )
          }
        </FormItem>
        : isAddNum &&
        <Row key={item.key}>
          <Col {...responceColTwo}>
            <FormItem label={defaultFormOptionFilter[index].label} {...formItemLayoutTwo}>
              {
                getFieldDecorator(`${defaultFormOptionFilter[index].key}`, { ...defaultFormOptionFilter[index].options })(
                  reactNodeIndex
                )
              }
            </FormItem>
          </Col>
          {
            enoughIndex &&
            <Col {...responceColTwo}>
              <FormItem label={defaultFormOptionFilter[index + 1].label} {...formItemLayoutTwo}>
                {
                  getFieldDecorator(`${defaultFormOptionFilter[index + 1].key}`, { ...defaultFormOptionFilter[index + 1].options })(
                    reactNodeIndex1
                  )
                }
              </FormItem>
            </Col>
          }
        </Row>
    )
  }

  render() {
    const { visible, defaultFormOption, title } = this.props;
    let defaultFormFilter = defaultFormOption.filter((item) => {
      return !item.disappear
    });
    const line = defaultFormFilter.length <= 6 ? 'single' : 'double'
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={this.onCancel}
        onOk={this.onOk}
        maskClosable={false}
        destroyOnClose={true}
        width={line === 'double' ? '800px' : '520px'}
        className={'validataModal'}
        bodyStyle={{ paddingBottom: 0 }}
        footer={null}
        centered
      >
        <Form onSubmit={this.onOk} className='addOrEditModal'>
          {
             defaultFormFilter.map((item, index) => {
              return defaultFormFilter ? this.getFieldDecoratorDom(defaultFormFilter,item, index, line) : ''
            })
          }
          <div className={'ant-modal-footer'} style={{ margin: line === 'double' ? '9px -24px 0':'22px -24px 0'}}>
            <Button htmlType="submit" type='primary' loading={this.state.loading}>确认</Button>
            <Button type='default' onClick={this.onCancel}>取消</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}
export default AddOrEditModal
