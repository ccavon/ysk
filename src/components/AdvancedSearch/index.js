/*
 * @Author: yuwei  - 高级搜索组件
 * @Date: 2018-12-07 14:45:50 
 * @Last Modified by: yuwei
 * @Last Modified time: 2019-07-22 09:54:41
 */
import React , { PureComponent } from 'react'
import { Form, Input , Button , Row , Col } from 'antd';
import * as PropTypes from 'prop-types';
import MoreSearchOption from './MoreSearchOption';
import { formatMessage } from '@/utils';
import { validDate } from '@/utils/valid';
import moment from 'moment';
import classNames from 'classnames';
import { isFunction, isObject } from 'lodash';
import './style.less';
// import _ from 'lodash'
const FormItem = Form.Item;
@Form.create()
class AdvancedSearch extends PureComponent{

  constructor(props){
    super(props);
    this.state={
      showModal:false,//显示扩展表单
      //初始化默认勾选的扩展项
      extraFormItem:this.initDefaultExtraFormItem(),//扩展渲染的option
      prevDefaultValue:{},//记录上一次的默认值
    }
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    colSpan: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    labelCol: PropTypes.object,
    wrapperCol: PropTypes.object,
    defaultFormOption: PropTypes.array,
    onSearch: PropTypes.func,
    onReset: PropTypes.func,
    hasExtra: PropTypes.bool,
    defaultSelect:PropTypes.array,//默认选中内容
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.element
    ]),
    defaultValues: PropTypes.object,
  };

  static defaultProps = {
    visible:false,
    placeholder:formatMessage('component.AdvancedSearch.placeholder'),
    colSpan:{ xs: 24, sm: 12, md: 12, lg: 12 , xl: 8 , xxl: 8 },//默认一行3列
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
      md: { span: 6 },
      lg: { span: 6 },
      xl: { span: 5 },
      xxl: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
      md: { span: 18 },
      lg: { span: 18 },
      xl: { span: 18 },
      xxl: { span: 18 },
    },
    hasExtra:false,//是否有更多扩展搜索属性
    defaultFormOption:[],
    onSearch:(query)=>{console.log("onSearch",query)},
    onReset:(data)=>{console.log("onReset",data)},
    onSelectChange:(selectKey) => {console.log("onSelectChange",selectKey)},
  };

  componentDidMount = () => {
    this.setFieldValue();
  }

  // componentWillReceiveProps = (nextProps) => {
  //   let { defaultValues } = nextProps;
  //   let { prevDefaultValue } = this.state;
  //   if ( !_.isEqualWith(defaultValues,prevDefaultValue) ){
  //     this.setFieldValue();
  //   }
  // } 

  /**
   * 表单回显操作
   */
  setFieldValue = () => {
    let { defaultValues, 
      form: { getFieldsValue, setFieldsValue } } = this.props;
    if( !isObject(defaultValues) ) return;
    this.setState({
      prevDefaultValue:defaultValues
    })
    let values = Object.keys( getFieldsValue() );
    let value = {};
    values.map(keyItem => {
      let formValue = defaultValues[keyItem];
      if (validDate(formValue)) {
        defaultValues[keyItem] = moment(formValue, 'YYYY-DD-MM');
      }
      if (formValue !== undefined) {
        value[keyItem] = formValue;
      }
      return keyItem;
    });
    setFieldsValue(value);
  }

  /**
   * @description 初始化默认勾选的扩展项（弹窗内默认勾选）
   * @method initDefaultExtraFormItem
   * @returns {Array} 返回数组对象[{}]
   */
  initDefaultExtraFormItem = () => {
    const { extraFormOption , defaultSelect , hasExtra } = this.props;
    if(hasExtra && defaultSelect && defaultSelect.length ) {
      return extraFormOption.filter((item) => defaultSelect.indexOf(item.key) !== -1 )
    } 
    return []
  }
  /**
   * @description 搜索按钮点击事件
   * @param {Object} 事件对象
   */  
  onSearch = (e) => {
    e.preventDefault();
    const { onSearch, form } = this.props;
    form.validateFieldsAndScroll((err,values)=>{
      isFunction(onSearch) && onSearch(values)
    })
  }
  
  /**
   * @description 重置按钮点击事件
   */
  onReset = () => {
    const { 
      form: { resetFields, getFieldsValue },
      onReset
    } = this.props;
    resetFields();
    let value = getFieldsValue();
    isFunction(onReset) && onReset(value);
  }

  /**
   * @description 将传入的options的Object对象注册为表单元素
   * @param {Object} 遍历options中的元素
   * @param {Number} 遍历options中的索引
   */
  getFieldDecoratorDom = (item,index) => {
    const {  colSpan ,  labelCol , wrapperCol, 
            form: { getFieldDecorator } 
    } = this.props;
    let reactNode = <Input/>;
    let otherReactNode = <Input/>;
    const formItemLayout = { labelCol , wrapperCol };
    const responceCol = !isNaN(colSpan) ? {span:colSpan}: colSpan ;
    if( item.render && isFunction(item.render) ) {
      reactNode = item.render();
    };
    if(item.otherRender && isFunction(item.render) ) {
      otherReactNode = item.otherRender();
    };
    return Array.isArray(item.key)?
          (
            <Col {...responceCol}  key={index}>
              <FormItem  {...formItemLayout} label={item.label}>
                <Col span={11}>
                  <FormItem>
                    {
                      getFieldDecorator(`${item.key[0]}`,{...item.options})(
                        reactNode
                      )
                    }
                    </FormItem>
                </Col>
                <Col span={2}>
                  <span className='between-line'>- </span>
                </Col>
                <Col span={11}>
                  <FormItem>
                    {
                      getFieldDecorator(`${item.key[1]}`,{...item.options})(
                        otherReactNode
                      )
                    }
                  </FormItem>
                  </Col>
              </FormItem>
            </Col>
          ):
          (
            <Col {...responceCol}   key={index}>
              <FormItem  {...formItemLayout} label={item.label}>
                {
                  getFieldDecorator(`${item.key}`,{...item.options})(
                    reactNode
                  )
                }
              </FormItem>
            </Col>
          )
  }

  render(){
    let { visible , 
      placeholder , 
      className,
      colSpan , 
      defaultFormOption , 
      hasExtra , 
      extraContainer , 
      extraOption , 
      extraFormOption , 
      defaultSelect , 
      onSelectChange , 
      style,children
    } = this.props;
    const { showModal , extraFormItem } = this.state;
    const responceCol = !isNaN(colSpan) ? {span:colSpan}: colSpan ;
    className = classNames('advancedSearch', className);
    return(
      <div className={className}>
          {
            // visible?
            defaultFormOption.length || extraFormOption.length ?
            <Row gutter={16} style={{display: visible ? 'block' : 'none', ...style}} className='clearfix hr'>
              {/* default FormItem render */}
              <Form onSubmit={this.onSearch}>
                {
                  defaultFormOption.map( (item,index) => {
                    return this.getFieldDecoratorDom(item,index)
                  })
                }
                {/* active extraFormItem render */}
                {
                  extraFormItem.map((item,index)=>{
                    return this.getFieldDecoratorDom(item,index)
                  })
                }
                {
                  children ?
                  <Col className="pull-left">{children}</Col>
                  :null
                }
                <Col {...responceCol} className='button-float'>
                
                  <Button type='primary' htmlType="submit" className='button-right-gap'>
                    {formatMessage('component.AdvancedSearch.searchText')}
                  </Button>
                  <Button onClick={this.onReset} className='button-right-gap'>
                    {formatMessage('component.AdvancedSearch.resetText')}
                  </Button>
                  {
                    hasExtra && 
                    <Button onClick={()=>this.setState({showModal:true})} style={{marginRight:8}}>
                      {formatMessage('component.AdvancedSearch.moreText')}
                    </Button>
                  }
                </Col>
              </Form>
            </Row>
            :<div className='clearfix hr' style={{paddingLeft:16}}>{placeholder}</div>
          }

          <MoreSearchOption
            visible={showModal}
            options={extraOption}
            display={extraContainer}
            formOption={extraFormOption}
            defaultSelect={defaultSelect}
            onCancel={()=>{this.setState({showModal:false})}}
            onOk={(extraFormItem,extraKey)=>{
              this.setState({extraFormItem,showModal:false})
              isFunction(onSelectChange) && onSelectChange (extraKey);
            }}
          >
          </MoreSearchOption>
          
      </div>
    )
  }
}
export default  AdvancedSearch
