import React from 'react';
import { Row } from 'antd';
import Description from './Description';
import './index.less'

const DescriptionList = ({
  className,
  title,
  columns = 3,
  layout = 'horizontal',
  children,
  size,
  ...restProps
}) => {
  return (
    <div className={`descriptionList ${layout} ${className?className:''}`} {...restProps}>
      {title ? <h3 className={`line-title primary-border-color`}>{title}</h3> : null}
      <Row>
        {React.Children.map(children, child =>
          child ? React.cloneElement(child, { columns }) : child
        )}
      </Row>
    </div>
  );
};
DescriptionList.Description = Description;
export default DescriptionList;
