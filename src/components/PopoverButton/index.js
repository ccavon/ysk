import React , { PureComponent }from 'react'
import { Popover, Icon , Divider , Popconfirm } from 'antd'
import './style.less'
class PopoverButton extends PureComponent {

  state = {
    clicked: false
  };
  
  static defaultProps={
    visible:false,
    children:null,
    context: (<Icon type="ellipsis" />),
    placement:'right',
    data:[],
    okText:'确定',
    cancelText:'取消',
  }

  hide = (e) => {
    this.setState({
      clicked: false,
    });
  }


  handleClickChange = (visible) => {
    this.setState({
      clicked: visible,
    });
  }

  _filterNode = (item) => {
    const { okText , cancelText } = this.props;
    if(item){
      switch(item.type){
        case 'Popconfirm':
          return (
            <Popconfirm 
              title={item.title||'您确定执行此操作？'} 
              onCancel={()=>{item.onCancel();this.hide()}} 
              onConfirm={()=>{item.onOk();this.hide()}}
              okText={item.okText||okText}
              cancelText={item.cancelText||cancelText}
            >
              <span className='theme-color'>{item.content}</span>
            </Popconfirm>
          )
        case 'normal':
          return (
            <span  onClick={()=>{item.onClick();this.hide()}} className='theme-color'>
              {item.content}
            </span>
          )   
        default :
          return (
            <span  onClick={()=>{item.onClick();this.hide()}} className='theme-color'>
              {item.content}
            </span>
          ) 
      }
    }

  }

  render(){
    const { context , placement , data , className , visible } = this.props;
    return(
        <Popover
          className={className}
          placement={placement}
          content={
            data.map((item,index)=>{
             return ( 
              <span key={index}>
                {this._filterNode(item,index)}
                {
                  index!==(data.length-1)
                  && <Divider type="vertical" />
                }
              </span>
             )
            })
          }
          trigger="hover"
          visible={visible || this.state.clicked}
          onVisibleChange={this.handleClickChange}
        >
          {context}
        </Popover>
    )
  }
}

export default PopoverButton 