## FilterButtonGroup组件说明 
- [基础参数说明](#1)
  - [options](#11)

<h2 id="1">基础参数说明</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|defaultValue|默认值|string| - |
|style|样式|object| {} |
|className|样式名称|string| '' |
|label|默认名称|string/node| '' |
|options|配置项|array | [] |
|onSelect|切换options时触发| function(key,item){} |-|

```
    <FilterButtonGroup
      label='订单状态'
      defaultValue={""}
      onSelect={(key,item)=>{
        console.log('selected',key)
        console.log(item.props.children)
      }}
      options={[
        {text:"全部",value:""},
        {text:"备货中",value:"1"},
        {text:"已备货",value:"2"},
        {text:"未发货",value:"3"},
      ]}
    />
```

<h2 id="11">options</h2>
描述：默认options属性配置。
```
  options={[
    {text:"yuwei",value:"1"},
    {text:"yuwei2",value:"2"},
  ]}
```
|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|text| 下拉框文字  |string| - |
|value| key值 |string| - |