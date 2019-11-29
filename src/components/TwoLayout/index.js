import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

class TwoLayout extends PureComponent {
  render() {
    const { LeftContent, RightContent } = this.props;
    const colLeftLayout = { xs: 6, sm: 6, md: 5, lg: 6, xl: 5, xxl: 4 };
    const colRightLayout = { xs: 18, sm: 18, md: 19, lg: 18, xl: 19, xxl: 20 };
    return (
      <Row className={'warper-tree'}>
        <Col {...colLeftLayout}>
          {
            LeftContent
          }
        </Col>
        <Col {...colRightLayout} style={{ padding: '16px 24px 0px' }}>
          {
            RightContent
          }
        </Col>
      </Row>
      /**
       * @explain 在调用这个组建的页面实例：
       * <Authority>
          <PageHeaderWrapper title={'测试组建'} twoLayout={'twoLayoutClassNane'}>
            <TwoLayout
              LeftContent={
                <div className={'col-sty'}>
                  21313
                  <div className={'treeData-redundance-hidden'}>
                    这里是树形数据，如果可以加无限个数据就加上这个类名
                  </div>
                </div>
              }
              RightContent={
                <div className={'zIndexLayout-current'}>
                  12313131
                </div>
              }
            />
          </PageHeaderWrapper>
        </Authority>
       */
    )
  }
}
export default TwoLayout;