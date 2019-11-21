/*
 * 跳转二次确认组件
 * @Author: Ye YuChen 
 * @Date: 2019-06-11 18:40:06 
 * @Last Modified by: wwb
 * @Last Modified time: 2019-06-18 14:58:13
 */

import React, { PureComponent } from 'react'
import { Modal, Button } from 'antd';
import { Prompt, withRouter } from 'dva/router';
import { connect } from 'dva';

class PromptModal extends PureComponent {
  state = {
    modalVisible: false,
    url: ''
  }
   // 处理自定义离开弹窗
  handlePrompt = location => {
    const { allowRedirect } = this.props;
    if (!this.props.allowRedirect) {
      this.setState({
        url: location.pathname,
        modalVisible: true
      })
    }
    return allowRedirect;
  }
  // 点击取消关闭弹窗
  _handleOK = () =>{
    const { dispatch, history } = this.props;
    dispatch({
      type: 'global/changeAllowRedirect',
      payload: { allowRedirect: true },
    })
    this.setState({ modalVisible: false }, () => {
      history.push({
        pathname: this.state.url
      })
    })
  }
  // 点击确认
   _handleCancel= () => {
    this.setState({ modalVisible: false })
  }
  render () {
    const { content, cancelText, leaveText } = this.props
    return(
      <React.Fragment>
        <Prompt message={this.handlePrompt}/>
          <Modal 
            title="温馨提示"
            visible={this.state.modalVisible}
            closable={false}
            maskClosable={false}
            centered
            onCancel={this.closeModalSave}
            footer={null}
          >
            <p>{`${content}`}</p>
            <div style={{textAlign:'right'}}>
              <Button  onClick={this._handleCancel}>{`${cancelText}`}</Button>
              <Button type='primary' style={{marginLeft:'20px'}} onClick={this._handleOK} >{`${leaveText}`}</Button>
            </div>
          </Modal>  
      </React.Fragment>
    )
  }
}

export default withRouter(connect(({ global }) => ({
  allowRedirect: global.allowRedirect,
  content: global.content,
  cancelText: global.cancelText,
  leaveText: global.leaveText
}))(PromptModal));