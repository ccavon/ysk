import React , { PureComponent }from 'react';
import { Row , Col , Tabs , Icon } from "antd";
import { PicViewListCol } from '@/utils/commonLayout';
import './style.less';
const TabPane = Tabs.TabPane;
export default class PicViewList extends  PureComponent{

  static defaultProps = {
    data:[],
    title:'',
    showTitle:true,
    showToolBar:true,
    rowKey:'url',
    className:'',
    style:{},
    girdOption:PicViewListCol
  }

  constructor(props){
    super(props);
    this.state = {
      currentShow:null,
      activeKey:0
    }
  }

  componentDidMount () {
    let currentShow = this.props.data[0];
    this.setState({currentShow})
  }

  //设置当前展示的图片
  onChange = (activeKey) => {
    const { data } = this.props; 
    if(activeKey < 0 || activeKey > data.length-1 ){return}
    this.setState({currentShow: data[activeKey] , activeKey })
  }

  render(){
    const { data , rowKey , title , showTitle , showToolBar ,
      className , styles , girdOption } = this.props;
    const { currentShow , activeKey } = this.state;
    let current = currentShow || (data && data[0]) ;
    const { leftCol , rightCol , rightOffset } = girdOption ;
    const responceLeftCol = typeof leftCol === 'number' ? {span:leftCol}: leftCol ;
    const responceRightCol = typeof rightCol === 'number' ? {span:rightCol}: rightCol ;
      
    return (
      <div className={`${className}  picViewList-warp`} style={styles}>
        {
          showTitle && 
          <Row className='header-bar'>
            { typeof title ==="function" ? title(current) : title }
          </Row>
        }
        <Row className='fullheight picViewList'>
          <Col {...responceLeftCol} className={ data && data.length<4 ? 'cutline pd16':'cutline'}>
            {//缩略图列表
              data && data.length ?
                <Tabs tabPosition='left' onChange={ this.onChange }>
                  {
                    data.map(( item , index ) => {
                      return (
                        <TabPane tab={(
                          <img src={item[rowKey]} alt="" className='pictab'/>
                        )} key={index}></TabPane>
                      )
                    })
                  }
                </Tabs>
              :`暂无数据内容`
            }
          </Col>
          <Col {...responceRightCol} offset={rightOffset} className='cutline-right'>
            {//预览大图
              data.length ?
              <img src={ current && current[rowKey] } alt={current[rowKey]}/>
              :
              <img src={ require('@/assets/placeholder.jpg')}  alt="暂无数据"/>
            }

            { //分页器
              showToolBar &&
              <Row className='toolbar'>
                <Icon type="caret-left" onClick={()=>this.onChange(Number(activeKey)-1)}/>
                {data.length ? Number(activeKey)+1 : `0` }/{data.length}
                <Icon type="caret-right" onClick={()=>this.onChange(Number(activeKey)+1)}/>
              </Row>      
            }
          </Col>
        </Row>
      </div>
    )
  }
}
