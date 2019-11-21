/* 
 * Modal 支持 Enter 关闭
 * TODO: 待优化
 * FIXME: 不需要支持 Enter 不使用
 * @Author: Ye YuChen 
 * @Date: 2019-03-28 11:10:44 
 * @Last Modified by: Ye YuChen
 * @Last Modified time: 2019-03-28 16:41:39
 */
import React from 'react';
import { Modal } from 'antd';

class ModalWithEnter extends Modal {
  componentDidUpdate() {
    const btn = document.querySelector('.ant-modal-close');
    if (btn && btn.type !== 'button') {
      btn.type = 'button';
    }
  }
  render () {
    return (
      <Modal {...this.props} forceRender={true}>{ this.props.children }</Modal>
    )
  }
}

export default ModalWithEnter;