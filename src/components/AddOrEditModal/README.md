## AddOrEditModal组件说明 
- [基础参数说明](#1)
  - [defaultFormOption](#11)

<h2 id="1">基础参数说明</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|title|弹窗标题|string|''|
|visible|是否显示|boolean|false|
|defaultFormOption|默认填写/选择内容|boolean|false|
|onOk|点击弹窗确定按钮-返回form表单收集的数据|function(query,fn){}| 必传 |
|onCancel|取消事件|function| - |
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
描述：弹出框内表单的属性配置。

```
defaultFormOption={
  [
    {
      label:"分类名称",
      key:"staticId",
      options:{
        rules: [],
        initialValue: sysCurItme?sysCurItme.staticId:null,
      },
      render:()=>(
        <Select placeholder={'请选择系统类别'} disabled={true}>
          {
            sysCurItme&&<Option value={sysCurItme.staticId}>{sysCurItme.name}</Option>
          }
        </Select>
      )
    },
    {
      label:"字典名称",
      key:"name",
      options:{
        rules: [{ required: true,message: '请输入字典名称' }],
        initialValue: sysAddOrEdit === 'edit'?dictsortCurData.name:null,
      },
      render:()=>(
        <Input />
      )
    },
    {
      label:"状态",
      key:"fstate",
      disappear: sysAddOrEdit !== 'edit',
      options:{
        rules: [{ required: true, message: '请选择状态' }],
        initialValue: sysAddOrEdit === 'edit'?dictsortCurData.fstate:null,
      },
      render:()=>(
        <Select placeholder={`请输入状态`}>
          <Option value={0}>停用</Option>
          <Option value={1}>启用</Option>
        </Select>
      )
    },
    {
      label:"字典编码",
      key:"code",
      options:{
        rules: [],
        initialValue: sysAddOrEdit === 'edit'?dictsortCurData.code:null,
      },
      render:()=>(
        <Input/>
      )
    },
    {
      label:"排序号",
      key:"fsort",
      options:{
        rules: [{
          required: true,
          message: '请输入数字', 
          whitespace: true,
          type:'number',
          transform(value) {
            if(value){
              return Number(value);
            }
          },
        }],
        initialValue: sysAddOrEdit === 'edit'?dictsortCurData.fsort:null,
      },
      render:()=>(
        <Input/>
      )
    },
    {
      label:"备注",
      key:"remark",
      options:{
        rules: [],
        initialValue: sysAddOrEdit === 'edit'?dictsortCurData.remark:null,
      },
      render:()=>(
        <Input/>
      )
    }
  ]
}
```
disappear
|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|label| label 标签的文本  |string/ReactNode| - |
|options| 注册组件的配置项  |object| [参考配置内容](https://ant.design/components/form-cn/#components-form-demo-validate-other) |
|key| 注册formItem的key值 - 传入数组将会呈现一个区间 |string/array['filed1','filed2']| - |
|render| 当前注册组件要渲染的Node |ReactNode| - |
|disappear| 当前节点是否隐藏 |boolean|true|