## FetchSelect组件说明 
- [基础参数说明](#1)

<h2 id="1">基础参数说明</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|url|远程搜索路径|string| 必填|
|queryKey [详情参照](#2)|默认搜索条件|object \|\| string| {} \|\| '' |
|className|样式名称|string| '' |
|placeholder|提示语|string|`请输入搜索`|
|method|请求方式|`string: POST || GET`|POST|
|type|请求格式|`string: json || formData`|formData|
|query|初始搜索条件，一般做回显会需要该字段|string|||
|valueAndLabel[详情参照](#3)|Option渲染key值与Value值| {}|必传|
|onSelectCB|选择下拉框之后回调|function||
|[更多参数参照文档](#https://ant.design/components/select-cn/#header)

```
    <FetchSelect
      url={'http://47.99.177.201:8902/ysy/orgInfoController/searchParentOrgInfoList'}
      queryKey="orgName"
      valueAndLabel={{
        value: 'orgId',
        label: 'orgName'
      }}
      placeholder='请选择某个字段搜索'
      allowClear={true}
    />
```

<h2 id="2">queryKey</h2>
描述：必传参数, 如果该接口请求参数只有一个,那么queryKey是string,queryKey就是发到后台的模糊搜索参数名,如果需要多个参数,那么queryKey是一个对象，对象必须的属性有valueKey,这时valueKey就是发到后台的模糊搜索参数名,下面两种写法等同;

```
  queryKey={{
    valueKey: 'orgId'
  }}

  queryKey='orgId'
```

<h2 id="3">valueAndLabel</h2>
描述: 以下代码是渲染Option的写法

```
<Select>
  {
    data.map(item => (
      <Option 
        key={item[valueAndLabel.value]}
        value={item[valueAndLabel.value]}
      >
        {item[valueAndLabel.lable]}
      </Option>
    ))
  }
</Select>
```

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|label| 下拉框文字  |string| - |
|value| key值 |string| - |