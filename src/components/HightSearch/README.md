## HightSearch组件说明 
- [基础参数](#1)
  - [相关内容 - HightSearchTag](#2)

<h2 id="1">基础参数</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|type|渲染出的按钮的风格|string| `primary`/`defalut` |
|context|渲染的按钮|string/node| `高级搜索` |
|colSpan|以24栅格计算，每个条件z占位|object| `8` |
|labelCol|渲染的默认搜索条件的label样式|object| `{xs:{span: 24},sm: { span: 8 }}` |
|wrapperCol|渲染的按钮|object| `{xs: { span: 24 },sm: { span: 16 }}` |
|okText|渲染的按钮文字|string/node| `搜索` |
|cancelText|渲染的按钮|string/node| `取消` |
|onOk|确认事件|function| 必传 |
|onCancel|取消事件|function| 必传 |
|extra|自定义搜索内容|node| null |


```
  <HightSearch
    type='defalut'
    context='文字'
    labelCol={
      xs: { span: 24 },
      sm: { span: 12 },
    }
    wrapperCol={
      xs: { span: 24 },
      sm: { span: 12 },
    }
    extra={
      (
        <Row>
          <Col span={8}>
            <FormItem label='extra相关搜索' {...formItemLayout}>
              {
                  getFieldDecorator('name1')(
                    <Input placeholder='请输入'></Input>
                  )
              }
            </FormItem>
          </Col>
        </Row>
      )
    }
    okText='确认按钮文字'
    cancelText='取消按钮文字'
    onOk={(data)=>{
      console.log('onOk',data)
      this.props.form.validateFieldsAndScroll((err,values)=>{
        if(!err){ 
            console.log('extra',values)
            this.setState({hightSearchData:Object.assign(data,values)})
        }
      })
    }}
    onCancel={()=>{
      console.log('cancel')
    }}/>
```

<h2 id='2'>HightSearchTag- 显示搜索条件的区域</h2>

```
 <HightSearchTag 
  data={hightSearchData}
  style={{padding:'6px 0 0 ',display:'inline-block'}}
  className='class'
  onDelete={(data)=>{
      console.log('onDelete callBack',data)
      this.refs.table.fetch(data);
  }} 
  ></HightSearchTag>
```

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|data|当前默认搜索条件与extra的搜索条件合集|object| `{}` |
|style|样式|object| `{}` |
|className|样式名称|string| -  |
|onDelete|tag的删除回调实践|`function(data){}`| 包含返回值`data` |