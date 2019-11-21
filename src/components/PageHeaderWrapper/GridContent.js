import React, { PureComponent } from 'react';
import { connect } from 'dva';
import './index.less';

class GridContent extends PureComponent {
  render() {
    const { contentWidth, children } = this.props;
    let className = `header-wrapper-main`;
    if (contentWidth === 'Fixed') {
      className = `header-wrapper-main wide`;
    }
    return <div className={className}>{children}</div>;
  }
}

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))(GridContent);
