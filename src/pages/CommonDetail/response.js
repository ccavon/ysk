import React, { PureComponent } from 'react';
import { Row, Col, Select, Table, Affix, Button } from 'antd';
import classNames from 'classnames';
import themes from '../../config/themes.config';
import { Section } from '@/components/CommonDetail';
import { Skeleton , TableSkeleton } from '@/components/Skeleton';
const { responceColTwo } = themes;

const editFstate = false;
const sectionLableValue = (label, data) =>{
  return (
    <Row>
      <Col xs={{span:8}} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 7 }} xxl={{ span: 4 }} className='section-item-label'>{label}：</Col>
      <Col xs={{span:14}} md={{ span: 16 }}  lg={{ span: 16 }} xl={{ span: 14 }}  xxl={{ span: 14 }} className={classNames('section-item-value',editFstate ? 'editCol': 'labelCol' )}>
        {
          editFstate ?
          <Select value={data} disabled={editFstate} style={{ width: '100%' }}>
          </Select>
          :
          data
        }
      </Col>
    </Row>
  )
};
let dataSource = [];
for(let i = 0; i<5; i++){
  dataSource.push({
    groupName: `产品管理组-cj${ i + 1}`,
    orgId: i,
    applyTypeName: i%2 === 0 ?'普耗申请单':'高值申请单',
    applyUserName: `TEST测试医院管理员${i}`,
    reciptNo: `PA00464181200005VA${i+1}`,
    groupType: i%2 === 0 ? '类别一': '类别二',
    modifyTime: '2018-12-13 09:55:00',
    createTime: '2018-06-11 10:27:52',
    tfRemark: `这是备注${ i+1 }`
  })
}
const columns = [{
  title: '组名称',
  dataIndex: 'groupName',
  width: 200,
},{
  title: '机构id',
  dataIndex: 'orgId',
  width: 200,
},{
  title: '组类别',
  dataIndex: 'groupType',
  width: 112,
},{
  title: "单据类型",
  dataIndex: 'applyTypeName',
  width: 112,
},{
  title: "单据号",
  dataIndex: "reciptNo",
  width: 200
},{
  title: "申请人",
  dataIndex: "applyUserName",
  width: 180
},{
  title: '修改时间',
  dataIndex: 'modifyTime',
  width: 180
},{
  title: '创建时间',
  dataIndex: 'createTime',
  width: 200,
},{
  title: '备注',
  dataIndex: 'tfRemark',
  width: 200,
}]

class Detail extends PureComponent{
  state={
    loading:true
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({loading:false})
    },1000)
  }
  goBack = (e) => {
    this.props.history.go(-1);
  }
  render(){
    const { loading } = this.state;
    const footer = () => {
      return (
        <Row className='detail-table-footer'>
          <Col span={6}>
            <span>总金额：</span>
            <span className='footer-table-sum'>258</span>
          </Col>
        </Row>
      )
    }

    return (
      <div className='page-content-two'>
        <Section title={'基本信息'}>
          <Row>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('组名称组名称', '产品管理组-cj')}
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('机构机构机构', 'ACD2SDF9SDFA889SSDFPPO') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('组类别','测试组') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('修改时间','2018-12-13 09:55:00') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('创建时间','2018-06-11 10:27:52') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('小组类别','组一') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('产品名称','植入式心内电极导线') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('通用名称','植入式心内电极导线') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('收货地址','备货地址 备货 13567899876', true) }
            </Col>
          </Row>
        </Section>
        <Section title={'其他信息'}>
          <Row>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('机构id', 'ACD2SDF9SDFA889SSDFPPO') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('修改时间','2018-12-13 09:55:00') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('创建时间','2018-06-11 10:27:52') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('产品名称','植入式心内电极导线') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('通用名称','植入式心内电极导线') }
            </Col>
            <Col {...responceColTwo}>
              { loading?<Skeleton/>:sectionLableValue('收货地址','备货地址 备货 13567899876') }
            </Col>
          </Row>
        </Section>
        <Section 
          title={'需求产品'}
          extra={'+ 添加产品'}
          // extra={<Button type='primary'>选择产品</Button>}
          onClick={this.onClick}
          childClassName={'sectionTable'}
        >
        {
          loading?
          <TableSkeleton/>
          :
          <Table
            bordered
            style={{ background: '#fff' }} 
            columns={columns}
            size={'small'}
            rowKey={'orgId'}
            pagination={false}
            scroll={{ x: '100%' }}
            dataSource={dataSource}
            footer={footer}
          />
        }
        </Section>
        <Affix offsetBottom={0} className='affix'>
          <Row>
            <Col className='page-affix-two'>
              <Button type='primary' style={{ marginRight: 8 }}>保存</Button>
              <Button type='primary' style={{ marginRight: 8 }}>提交</Button>
              <Button >取消 </Button>
            </Col>
          </Row>
        </Affix>
      </div>
    )
  }
}
export default Detail;
