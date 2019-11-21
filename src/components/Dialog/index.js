import React from 'react';
import {createPortal} from 'react-dom';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.node = document.createElement('div');
    this.node.classList = props.className;
    document.body.appendChild(this.node);
  }
  render() {
    const {visible} = this.props;
    return createPortal(visible ? this.props.children : null, this.node);
  }
};

export default Dialog;