/*
 * @Author: yuwei - 高级搜索组件 - 弹窗选择
 * @Date: 2018-12-08 10:22:26 
 * @Last Modified by: yuwei
 * @Last Modified time: 2019-06-13 17:34:06
 */

import React , { PureComponent } from 'react'
import {  Button ,  Modal , Drawer, Checkbox} from 'antd';
import { formatMessage } from '@/utils';
import * as PropTypes from 'prop-types';
import { isFunction } from 'lodash'
import './style.less';
const CheckboxGroup = Checkbox.Group;
const Styles={
  'fixedButton':{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTop: '1px solid #e8e8e8',
    padding: '10px 16px',
    textAlign: 'right',
    left: 0,
    background: '#fff',
    borderRadius: '0 0 4px 4px',
  },
  'button-gap':{
    marginRight: 8,
  }
}
class MoreSearchOption extends PureComponent{

  constructor(props){
    super(props);
    this.state={
      checked:this.props.defaultSelect
    }
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    display: PropTypes.string, 
    options : PropTypes.object ,
    formOption : PropTypes.array,
    defaultSelect :PropTypes.array,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
  };

  static defaultProps ={
    visible:false,
    display:'Modal',//Drawer
    formOption:[],//渲染的label
    defaultSelect:[],//默认勾选的label
    options:{
      title:formatMessage('component.AdvancedSearch.moreSearchOption.title'),//"更多搜索条件",
      okText:formatMessage('component.AdvancedSearch.moreSearchOption.okText'),//'确认',
      cancelText:formatMessage('component.AdvancedSearch.moreSearchOption.cancelText'),//'取消',
      placement:"right",
      width:560
    },
    onCancel:()=>{},
    onOk:(data)=>{console.log('extraFormItem',data)}
  }

  /**
   * @description 转换扩展字段格式
   * @param {Array} 数组对象
   * @returns {Array}  `[ { label: **, value: ** },key:**,render:()=>()} ]`
   */
  formatFormOption = (formOption) => {
    if(!Array.isArray(formOption)){ return []}
    return formOption.map((item)=>{
      item.value=item.key;
      return item 
    })
  }

  /* checked */
  onChange = (checked) => {
    this.setState({checked})
  }

  /**
   * @description 弹窗确认事件 
   */
  _onOk = ()=> {
    const { checked } = this.state;
    const { formOption, onOk } = this.props;
    let retOption = formOption.filter((item) => checked.indexOf(item.key) !== -1);
    isFunction(onOk) && onOk(retOption,checked)
  }

  render(){
    const { visible, onCancel, display, 
      options : { title, okText, cancelText, placement, width }, 
      formOption, 
      defaultSelect } = this.props;
    const CheckboxGroupOptions = this.formatFormOption(formOption);
    return(
      <div>
        {/* 弹层渲染 */}
        {
          display==="Modal" &&
          (
            <Modal
              maskClosable={false}
              centered
              className='moreSearchOption'
              title={title}
              okText={okText}
              cancelText={cancelText}
              width={width}
              onOk={this._onOk}
              onCancel={()=> isFunction(onCancel) && onCancel()}
              visible={visible}
              >
                <div className='content-indent'>
                  <CheckboxGroup  
                    defaultValue={defaultSelect} 
                    options={CheckboxGroupOptions} 
                    onChange={this.onChange}/>
                </div>
            </Modal>
          )
        }
        {/* 抽屉渲染 */}
        {
          display==="Drawer" &&
          (
            <Drawer
              className='moreSearchOption'
              width={width}
              title={title}
              placement={placement}
              onClose={()=> isFunction(onCancel) &&onCancel()}
              visible={visible}
            >
              <CheckboxGroup 
              defaultValue={defaultSelect} 
              options={CheckboxGroupOptions} 
              onChange={this.onChange}/>

              <div style={Styles["fixedButton"]}>
                  <Button
                    style={Styles["button-gap"]}
                    onClick={()=>onCancel()}
                  >
                   {cancelText}
                  </Button>
                  <Button  onClick={this._onOk} type='primary'>  
                    {okText} 
                  </Button>
                </div>
            </Drawer>
          )
        }
        
      </div>
    )
  }
}
export default MoreSearchOption;