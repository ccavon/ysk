import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import RightContent from '@/components/GlobalHeader/RightContent';
import BaseMenu from '@/components/SiderMenu/BaseMenu';
import './index.less';

export default class TopNavHeader extends PureComponent {
  state = {
    maxWidth: undefined,
  };

  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40,
    };
  }

  render() {
    const { theme, contentWidth, logo } = this.props;
    const { maxWidth } = this.state;
    return (
      <div className={`ysynet-top-head ${theme === 'light' ? 'light' : ''}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`ysynet-tophead-main ${contentWidth === 'Fixed' ? 'wide' : ''}`}
        >
          <div className={'left'}>
            <div className={'ysynet-topnav-logo'} key="logo" id="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
                <h1>CHS-DRG</h1>
              </Link>
            </div>
            <div
              style={{
                maxWidth,
              }}
            >
              <BaseMenu {...this.props} style={{ border: 'none', height: 56 }} />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}
