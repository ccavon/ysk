import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import { responceCol, responceColTwo, responceColSingle } from '@/utils/commonLayout'
import './index.less'
const Description = ({ term, columns, children, ...restProps }) => {
  let  responce = responceCol;
  if ( columns === 2 ) {
    responce = responceColTwo;
  }else if ( columns === 1 ) {
    responce = responceColSingle;
  }
  return (
  <Col {...responce}  {...restProps} className={'col'}>
    {term && <div className={'term'}>{term}</div>}
    {children !== null && children !== undefined && <div className={'detail'}>{children}</div>}
  </Col>
)};

Description.defaultProps = {
  term: '',
};

Description.propTypes = {
  term: PropTypes.node,
};

export default Description;
