/* yuwei - 自定义按钮事件 */
import React , { PureComponent } from 'react'
import { Menu , Dropdown ,  Icon} from 'antd'
import TableConfigModal from '../TableConfigModal';
import querystring from 'querystring';
import { formatMessage } from '@/utils';

class SettingButton extends PureComponent {

  constructor(props){
    super(props)
    this.state={
      title:props.title|| formatMessage('component.SettingButton.title') ,
      showTableConfig:false,//自定义表头相关操作
      tableConfigOption:null
    }
  }

  static defaultProps ={
    type:'primary',
    hasIndex:true,
    isDropDown:false
  }

  componentDidMount = () => {
    const { cell } = this.props;    
    if(cell.length && Array.isArray(cell[0].columns) && cell[0].columns.length && cell[0].callback && typeof(cell[0].callback === 'function')){
      cell[0].callback(cell[0].columns)
    }

  }

  _handleMenuClick = e => {
    switch(e.key){
      case 'output'://打印导出
        this._outputConfig(e);
        break;
      case 'sorterTable'://自定义表头
        this._showTableConfig(e);
        break;
      default:
        return
    }
  }
  //显示设置动态表头排序
  _showTableConfig = (e)=>{
    const { cell } = this.props;
    let _option = cell.filter(item=>item.type===e.key);
    _option.length && this.setState({showTableConfig:true,tableConfigOption:_option[0]})
  }
  //打印配置参数设置
  _outputConfig = (e)=>{
    const { cell } = this.props;
    let _option = cell.filter(item=>item.type===e.key);
    if(_option.length){
      const { url , params , before , callback } = _option[0];
      if(typeof before ==='function'){
        before()
      }
      window.open(`${url}?${querystring.stringify(params)}`);
      if(callback && typeof callback ==='function'){
        callback()
      }
    }
  }
 
  render(){
    const { title , showTableConfig , tableConfigOption } = this.state;
    const { style , className , cell , type , isDropDown , hasIndex } = this.props;
    return(
      <span>
        {
          isDropDown ?
        <Dropdown.Button 
          type={type}
          className={className} 
          style={style} 
          overlay={
            <Menu onClick={this._handleMenuClick}>
              {
                cell.map((item,index)=> (
                  <Menu.Item key={item.type}>
                    {item.icon && typeof item.icon ==='object' ?  (item.icon) :( <Icon type="setting" /> )}
                      {(typeof item.content ==='string' || !item.content)?
                      (item.content)//||formatMessage('component.SettingButton.config.content')
                      : 
                      (typeof item.content ==='object')?(item.content):null}
                  </Menu.Item>
                ))
              }
            </Menu>
          }>
          {title}
        </Dropdown.Button>
        :(
          <div className={className} style={style}>
            {
              cell.map((item,index)=> (
                <span key={item.type} onClick={()=>this._handleMenuClick({key:item.type})}>
                  {item.icon && typeof item.icon ==='object' ?  (item.icon) :( <Icon type="setting" /> )}
                  
                  {(typeof item.content ==='string' || !item.content)?
                  (item.content)//||formatMessage('component.SettingButton.config.content')
                  : 
                  (typeof item.content ==='object')?(item.content):null}

                </span>
              ))
            }
          </div>
        )}

        {
          showTableConfig &&
           <TableConfigModal  
            hasIndex={hasIndex}
            visible={showTableConfig} 
            _option={tableConfigOption} 
            callback={(showTableConfig)=>this.setState({showTableConfig})}
          ></TableConfigModal>
        }
      </span>

    )
  }
}
export default SettingButton 