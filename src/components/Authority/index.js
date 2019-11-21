import React, { PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'dva';

@connect()
class Authority extends PureComponent {
  componentDidMount() {
    const { onAuthenticate, dispatch } = this.props;
    if (onAuthenticate && _.isFunction(onAuthenticate)) 
      onAuthenticate();
    else 
      dispatch({
        type: 'global/checkAuthority'
      })  
  }
  render() {
    return (
      <React.Fragment>
        { this.props.children }
      </React.Fragment>
    )
  }
}

export default Authority;