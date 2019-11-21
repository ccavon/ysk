import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import './index.less';
import RightContent from './RightContent';

export default class GlobalHeader extends PureComponent {
  render() {
    const { isMobile, logo } = this.props;
    return (
      <div className={'global-header'}>
        {isMobile && (
          <Link to="/" className={'global-logo'} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <RightContent {...this.props} />
      </div>
    );
  }
}
