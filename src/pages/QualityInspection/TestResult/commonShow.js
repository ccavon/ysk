/**
 * @Author: chengyafang 
 * @Date: 2019-10-16 16:43:53 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-10-30 09:30:57
 * @file 数据审核 - 检查结果 - 查看
 */
import React, { PureComponent } from 'react';
import { Tabs, Row, Button } from 'antd';
import ErrorInfo from '../CommonModule/ErrorInfo'; // 出错信息
import BasicInfo from '../CommonModule/BasicInfo'; // 基本信息
import AdmissionInfo from '../CommonModule/AdmissionInfo'; // 入院信息
import MainSecondaryDiagnosis from '../CommonModule/MainSecondaryDiagnosis'; // 主次要诊断
// import DiagnosisInfo from '../CommonModule/DiagnosisInfo'; // 诊断11至40
// import GuardianInfo from '../CommonModule/GuardianInfo'; // 卫统4.2
import PathologyPhysician from '../CommonModule/PathologyPhysician'; // 病理及医师
import OperAnesthesia from '../CommonModule/OperAnesthesia'; // 手术麻醉
// import OperInfo from '../CommonModule/OperInfo'; // 手术11至40
import OtherExpenses from '../CommonModule/OtherExpenses'; // 其他及费用
import AttachedPageInfo from '../CommonModule/AttachedPageInfo'; // 附页相关内容
import QualityAnalysis from '../CommonModule/QualityAnalysis'; // 质量与分析
import { FooterToolbar } from 'ant-design-pro';

const { TabPane } = Tabs;

class CommonShow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultActiveKey: '1'
    }
  }

  callback = e => {
    this.setState({ defaultActiveKey: e });
  }

  render() {
    const { defaultActiveKey } = this.state;
    return (
      <div className={`page-content-two`}>
        <Tabs className='global-tabs diamond-tab' defaultActiveKey={defaultActiveKey} onChange={this.callback}>
          <TabPane tab={'出错信息'} key="1">
            <ErrorInfo />
          </TabPane>
          <TabPane tab={'基本信息'} key="2">
            <BasicInfo />
          </TabPane>
          <TabPane tab={'入院信息'} key="3">
            <AdmissionInfo />
          </TabPane>
          <TabPane tab={'主次要诊断'} key="4">
            <MainSecondaryDiagnosis />
          </TabPane>
          {/* <TabPane tab={'诊断11至40'} key="5">
            <DiagnosisInfo />
          </TabPane>
          <TabPane tab={'卫统4.2'} key="6">
            <GuardianInfo />
          </TabPane> */}
          <TabPane tab={'病理及医师'} key="7">
            <PathologyPhysician />
          </TabPane>
          <TabPane tab={'手术麻醉'} key="8">
            <OperAnesthesia />
          </TabPane>
          {/* <TabPane tab={'手术11至40'} key="9">
            <OperInfo />
          </TabPane> */}
          <TabPane tab={'其他及费用'} key="10">
            <OtherExpenses />
          </TabPane>
          <TabPane tab={'附页相关内容'} key="11">
            <AttachedPageInfo />
          </TabPane>
          <TabPane tab={'质量与分析'} key="12">
            <QualityAnalysis />
          </TabPane>
        </Tabs>
        <FooterToolbar>
          <Row style={{ textAlign: 'right' }}>
            <Button type="primary">检测数据是否修改完毕</Button>
            <Button className="ml-8">保存状态</Button>
          </Row>
        </FooterToolbar>
      </div>
    )
  }
}
export default CommonShow;