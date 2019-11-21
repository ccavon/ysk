## AdvancedSearch组件说明 
- [基础参数说明](#1)
  - [defaultFormOption](#11)
  - [扩展搜索功能](#2)
     - [扩展搜索功能-extraOption](#22)
  - [单独使用弹窗-MoreSearchOption](#3)

<h2 id="1">基础参数说明</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|visible|是否显示|boolean|false|
|placeholder|默认defaultFormOption不存在时的显示|string/ReactNode|`暂无可搜索条件`|
|colSpan|每个搜索条件的栅格数-支持响应格式|number/object| `{ xs: 24, sm: 12, md: 12, lg: 12 , xl: 8 , xxl: 8 }`|
|labelCol|渲染的默认搜索条件的label样式|object| `{xs:{span: 24},sm: { span: 8 }}` |
|wrapperCol|渲染的按钮|object| `{xs: { span: 24 },sm: { span: 16 }}` |
|defaultFormOption|默认搜索内容|boolean|false|
|onSearch|搜索事件-返回form表单收集的数据|function(query){}| 必传 |
|onReset|重置事件|function| - |
|hasExtra| [开启拓展功能](#2)|boolean| false |
|defaultValues|表单回显时所需要的值|object {}||
|style| 样式 |object {}||
|className|外层名称  default-advancedSearch , '' |string| '' |

```
        <AdvancedSearch
            visible={showAdvancedSearch}
            colSpan={8}
            labelCol: {{
              xs: { span: 24 },
              sm: { span: 6 },
            }}
            wrapperCol: {{
              xs: { span: 24 },
              sm: { span: 12 },
            }}
            defaultValues={{}}
            defaultFormOption={
              [
                {
                  label:"型号型号型号",key:"fmodel",
                  options:{
                    initialValue:"",
                    rules:[{required:true,message:"必填"}]
                  },
                  render:()=>(
                    <Input placeholder='请输入型号'/>
                  )
                },
                {label:"状态",key:"fstate",
                options:{
                    initialValue:"",
                    rules:[{required:true,message:"必填"}]
                },
                render:()=>(
                  <Select style={{width: '100%'}}>
                    <Option value='1'>停用</Option>
                  </Select>
                )},
                {
                  label:"时间",key:"date",
                  render:()=>(
                    <DatePicker style={{width: '100%'}}></DatePicker>
                  )
                },
              ]
            }
            hasExtra={false}
            onSearch={(query)=>{
              console.log("onSearch parent callback",query)
            }}
            onReset={(data)=>{
              console.log("onReset parent callback",data)
            }}
          >
      </AdvancedSearch>
```

<h2 id="11">defaultFormOption</h2>
描述：搜索框及字段的属性配置。

```
defaultFormOption={
  [
    {
      label:"型号型号型号",key:"fmodel",
      options:{
          initialValue:"",
          rules:[{required:true,message:"必填"}]
      },
      render:()=>(
        <Input placeholder='请输入型号'/>
      )
    },
    {label:"状态",key:"fstate",render:()=>(
      <Select style={{width: '100%'}}>
        <Option value='1'>停用</Option>
      </Select>
    )},
    {
      label:"时间",key:"date",
      render:()=>(
        <DatePicker style={{width: '100%'}}></DatePicker>
      )
    },
    {
      label:"时间段",key:['startDate','endDate'],
      render:()=>(
        <Input type='number'></Input>
      ),
      otherRender: () => (
        <Input type='number'></Input>
      )
    }
  ]
}
```
|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|label| label 标签的文本  |string/ReactNode| - |
|options| 注册组件的配置项  |object| [参考配置内容](https://ant.design/components/form-cn/#components-form-demo-validate-other) |
|key| 注册formItem的key值 - 传入数组将会呈现一个区间 |string/array['filed1','filed2']| - |
|render| 当前注册组件要渲染的Node |ReactNode| - |

<h2 id="2">扩展搜索功能</h2>

描述：将添加一个更多按钮，支持动态选择搜索字段。
```
  hasExtra={true}
  extraContainer='Drawer'//Drawer Modal
  extraOption={{
    title:"更多搜索条件",
    okText:'ok',
    cancelText:'cancel',
    width:980
  }}
  defaultSelect={["fmodel]}
  onSelectChange={
    (extraModalSelectKey)=> console.log(extraModalSelectKey)
  }
  extraFormOption={
    [
      {
        label:"搜索1",key:"fmodel",
        render:()=>(
          <Input placeholder='请输入型号'/>
        )
      }
    ]
  }
```
|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|hasExtra| 开启扩展搜索功能 |boolean| false |
|defaultSelect| 默认选中内容 |array| [] |
|onSelectChange| 选中内容后点击OK将返回选中的KEY ，用于条件返回情景 |function| function(key){}|
|extraContainer| 展现形式,'Modal'/'Drawer'|string| 'Modal'|
|extraOption| [弹窗相关配置](#22) |object| - |
|extraFormOption| 搜索字段以及输入框渲染（[同defaultFormOption](#11)） |array[object]| [] |

<h2 id="22">扩展搜索功能-extraOption</h2>

```
  extraOption={{
    title:"更多搜索条件",
    okText:'ok',
    cancelText:'cancel',
    width:980
  }}
```


|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|title| 弹窗title | string/node | `更多搜索条件` |
|okText|渲染的按钮文字|string/node| `搜索` |
|cancelText|渲染的按钮|string/node| `取消` |
|width| 渲染的弹窗/抽屉的宽度 |number | `560` |


<h2 id="3">单独使用弹窗-MoreSearchOption</h2>

描述：单独使用弹窗。
```
<MoreSearchOption
  visible={showModal}
  options={extraOption}
  display={extraContainer}
  formOption={extraFormOption}
  onCancel={()=>{this.setState({showModal:false})}}
  onOk={(extraFormItem)=>{
    this.setState({extraFormItem,showModal:false})
  }}
/>
```
|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|visible|是否显示|boolean|false|
|options|[弹窗相关配置](#22) |object| - |
|display| 展现形式,'Modal'/'Drawer'|string| 'Modal'|
|formOption| 搜索字段以及输入框渲染（[同defaultFormOption](#11)） |array[object]| [] |
|onCancel|弹窗取消实践|function(){}| 必传 |
|onOk| 确认事件- 返回被选中数据的formOption格式 |function(formOption){}| 必传 |