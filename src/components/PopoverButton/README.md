## PopoverButton组件说明 
- [基本参数](#1)
  - [data](#2)
  - [placement](#3)

<h2 id="1">基本参数</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|context|按钮显示文字或图标|string/node|`<Icon type="ellipsis" />`|
|data|所需显示按钮的内容数据,[具体如下](#2)|array|[]|
|placement|弹出层方向|string|'right'|

```
  <PopoverButton
    context={'文字'}
    placement={'left'}
    data={
      [
        { //弹出层 后调用事件
          content:'删除',
          type:'Popconfirm',
          title:'Are you sure delete this task?',
          okText:'ok',
          cancelText:'cancel',
          onOk:()=>{
            console.log('onOk')
          },
          onCancel:()=>{
            console.log('onCancel')
          }
        },
        {
          content:'编辑',
          type:'normal',
          onClick:()=>{
            this.setState({visible:true,record})
          }
        },
        {
          content:(<Icon type="printer" />),
          onClick:()=>{
            window.open('http://www.baidu.com')
          }
        }
      ]
    } 
  />
```
<h2 id="2">data</h2>

描述：配置PopoverButton组件内容。
```
    data={
      [
        { //弹出层 后调用事件
          content:'删除',
          type:'Popconfirm',
          title:'Are you sure delete this task?',
          okText:'ok',
          cancelText:'cancel',
          onOk:()=>{
            console.log('onOk')
          },
          onCancel:()=>{
            console.log('onCancel')
          }
        },
        {
          content:'编辑',
          type:'normal',
          onClick:()=>{
            this.setState({visible:true,record})
          }
        },
        {
          content:(<Icon type="printer" />),
          onClick:()=>{
            window.open('http://www.baidu.com')
          }
        }
      ]
    } 
```
|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|type| 当前按钮类型 |'Popconfirm'/'normal'| normal |
|content| 按钮需要显示的文字 |string/node| - |
|title| 弹出层的标题, `仅在type='Popconfirm'生效` |string| `您确定执行此操作？`|
|okText| 确认按钮文字, `仅在type='Popconfirm'生效` |string| `确定`|
|cancelText| 取消按钮文字, `仅在type='Popconfirm'生效` |string| `取消`|
|onOk| 弹出层的确定函数, `仅在type='Popconfirm'生效` |function| (){}) |
|onCancel| 弹出层的取消函数, `仅在type='Popconfirm'生效` |function| (){}) |
|onClick| 普通类型按钮的点击事件`仅在type='normal'生效` |function| (){}) |

<h2 id="3">placement</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|topLeft| 上左 | string | - |
|top| 上中 | string | - |
|topRight| 上右 | string | - |
|leftTop| 左上 | string | - |
|left| 左中 | string | - |
|leftBottom| 左下 | string | - |
|rightTop| 右上 | string | - |
|right| 右中 | string | - |
|rightBottom| 右下 | string | - |
|bottomLeft| 下左 | string | - |
|bottom| 下中 | string | - |
|bottomRight| 下右 | string | - |