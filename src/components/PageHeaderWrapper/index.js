import React from 'react';
import { Link } from 'dva/router';
import { PageHeader } from 'ant-design-pro';
import { connect } from 'dva';
import GridContent from './GridContent';
import classNames from 'classnames';
import './PageHeader.less';
import MenuContext from '@/layouts/MenuContext';

const PageHeaderWrapper = ({ fixedHeader, hiddenBreadcrumb=true, children, contentWidth, childrenClassName, wrapperClassName, detailClassName, top , layout, twoLayout, ...restProps }) => {
  return (
    <div style={{ margin: `${fixedHeader ? 0 : 0}px 0 0` }} className={`${wrapperClassName || ''} ysynet-pageheader`}>
      {top}
      {
        (restProps.title || restProps.content) ? (
          <MenuContext.Consumer>
            {value => (
              <PageHeader
                hiddenBreadcrumb={hiddenBreadcrumb}
                className={childrenClassName}
                wide={contentWidth === 'Fixed'}
                home={'Home'}
                {...value}
                key="pageheader"
                {...restProps}
                linkElement={Link}
                itemRender={item => {
                  if (item.locale) {
                    return item.name;
                  }
                  return item.name;
                }}
              />
            )}
          </MenuContext.Consumer>
        ) : null
      }
      {children ? (
        <div className={classNames(contentWidth === 'Fluid' && layout !== 'topmenu' ? 'ysynet-pageheader-content':'ysynet-pageheader-fixedContent', detailClassName ? detailClassName: '', twoLayout ? twoLayout : '')}>
          <GridContent>{children}</GridContent>
        </div>
      ) : null}
    </div>
  );
}

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
  fixedHeader: setting.fixedHeader,
  layout: setting.layout
}))(PageHeaderWrapper);
