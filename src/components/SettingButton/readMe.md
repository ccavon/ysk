## 组件说明 
- [扩展参数](#1)
  - [navConfig](#2)

<h2 id="1">扩展参数</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|style|样式|object|-|
|cell|配置子组件按钮|array| 必填|
|hasIndex|Table弹窗设置是否显示序号|bool| true|
|isDropDown|当前设置按钮显示模式,是否为下拉框显示|bool| true|

```
  <SettingButton 
    style={{float: 'right'}}  
    cell={[
      {//设置table表头排序
        type:'sorterTable',
        // content:"设置Table",
        columns:columns,
        // icon:(<Icon type="setting" />),
        callback:(columns)=>{
          console.log(columns)
          this.setState({columns})
        }
      },
      {//输出类型 打印/导出
        type:'output',//print output
        url:url,
        params:{name:"yuwei"},
        content:(<span style={{color:'red'}}>"打印asd"</span>),
        icon:(<Icon type="user" />),
        before:()=>{
          console.log('before') 
          return {'name':'yuwei','age':20} 
        },
        callback:()=>{
          console.log('callback')
        }
      }
    ]}
  >
    点击设置自定义排序
  </SettingButton>
```
<h2 id="2">cell</h2>

描述：自定义按钮种的相关配置。
```
  cell={[
    {//设置table表头排序
      type:'sorterTable',
      // content:"设置Table",
      columns:columns,
      // icon:(<Icon type="setting" />),
      callback:(columns)=>{
        console.log(columns)
        this.setState({columns})
      }
    },
    {//输出类型 打印/导出
      type:'output',//print output
      url:url,
      params:{name:"yuwei"},
      content:(<span style={{color:'red'}}>"打印asd"</span>),
      icon:(<Icon type="user" />),
      before:()=>{
        console.log('before') 
        return {'name':'yuwei','age':20} 
      },
      callback:()=>{
        console.log('callback')
      }
    }
  ]}
```
|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|type| 'output','sorterTable' | string | 必填 |
|content| 按钮渲染文字或结构 |string/node| 非必填 |
|icon| 按钮渲染 |node|非必填 |
|url| 打印/导出接口路径 |string| 仅在type='output' 生效|
|params| 打印/导出接口需要参数 |object| 仅在type='output' 生效|
|callback| 执行完成后的回调函数 |function| 非必填 |
