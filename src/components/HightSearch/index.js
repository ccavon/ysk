/* 高级搜索 */
import React , { PureComponent } from 'react'
import { Form, Input , Select , Button , Popover , Row , Col , Icon } from 'antd';
import { configSelect } from './configSelect';
import { formatMessage } from '@/utils';
import './index.less'
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class HightSearch extends PureComponent{

  state = {
    visible: false,
    initFormItemLength:1
  }
  static defaultProps = {
    type:'primary',
    context:formatMessage('component.HightSearch.context'),
    okText:formatMessage('component.HightSearch.okText'),
    cancelText:formatMessage('component.HightSearch.cancelText'),
    extra:null,
    colSpan:8,
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    }
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  onSerach = () => {
    const { onOk } = this.props;
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){ 
        let list = values.defaultSearch.map((item)=>{
          return {[item.label]:item.searchVal}
        })
        let backData = list.reduce((curr,item)=>{
          curr = Object.assign(curr,item)
          return curr
        })
        onOk(backData)
        this.hide()
      }
    })
  }

  onCancel = () => {
    const { onCancel } = this.props;
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){ 
        onCancel(values)
        this.hide()
      }
    })
  }

  //action to add defaultSearch FormItem
  addDefault = () => {
    let { initFormItemLength } = this.state;
    this.setState({
      initFormItemLength:++initFormItemLength
    })
  }

  deleteDefault = (i) => {
    let { getFieldValue , setFieldsValue } = this.props.form;
    let s = getFieldValue('defaultSearch');
    s = s.filter((item,k)=>i!==k);
    setFieldsValue({defaultSearch:s});

    let { initFormItemLength } = this.state;
    this.setState({
      initFormItemLength:--initFormItemLength
    })
  }

  getTemp = ()=>{
    const { initFormItemLength } = this.state;
    const { colSpan , labelCol,wrapperCol } = this.props;
    const formItemLayout = {labelCol,wrapperCol};
    const { getFieldDecorator } = this.props.form;
    let keys = [...Array(initFormItemLength).keys()];
    let doms = keys.map((key,index)=>{
      return  (
        <Col span={colSpan-1} offset={1} pull={1} key={key}>
          <FormItem label={
                getFieldDecorator(`defaultSearch[${key}].label`,{
                  initialValue:configSelect[0].value
                })(
                  <Select>
                    {
                      configSelect.map((item,index)=>(
                        <Option value={item.value} key={index}>{item.title}</Option>
                      ))
                    }
                  </Select>
                )
            }
            {...formItemLayout}>
            {
              getFieldDecorator(`defaultSearch[${key}].searchVal`,{
              })(
                  <Input placeholder={formatMessage('component.HightSearch.placeholder')} />
              )
            }

             {/* action buttons */} 
            {
              key===keys.length-1  ? 
              (
                <Icon type="plus-circle" className='fixedIcon add' onClick={this.addDefault}/>
              ):null
            }
            {
              keys.length>1 ? 
              (
                <Icon type="minus-circle"className='fixedIcon' onClick={()=>this.deleteDefault(index)}/>
              ):null
            }
          </FormItem>
          
        </Col>
      )
    })
    return doms
  }

  render(){
    const { context , type , extra , okText , cancelText } = this.props;
    return(
      <Popover
        placement="bottomRight"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        content={(
          <Form  style={{width: 750}}>
            <Row>
              {this.getTemp()}
            </Row>
            {/* parentNode */}
            {extra}
            <Row className='text-right'>
              <Button type='primary' className='button-gap' onClick={this.onSerach}>{okText}</Button>
              <Button onClick={this.onCancel}>{cancelText}</Button>
            </Row>
          </Form>
        )} 
        trigger="click">
          {
            typeof context === "object"?
            context:
            <Button type={type} >{context}</Button>
          }
        </Popover>
                
    )
  }
}

export default HightSearch