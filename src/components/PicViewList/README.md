## PicViewList组件说明 
- [基本参数](#1)
  - [girdOption](#2)

<h2 id="1">基本参数</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|data|图片展示所需数据|array[{}] |[]|
|title|当前展示数据的相关字段布局|func/string/node|''|
|rowKey|当前图片的显示路径|string|`url`|
|showTitle|显示Title布局|bool|`true`|
|showToolBar|显示ToolBar布局|string|`true`|
|className|样式名称|string| - |
|style|样式|object|`{}`|
|girdOption|左右响应布局样式 [详见](#2)|object|`{}`|
```
 <PicViewList 
  data={gData} 
  rowKey='imageAddress'
  title={(data)=>(
    <div>
      <b style={{marginRight:16}}>{data?data.certName:'————'}</b>
      <small style={{marginRight:16}}>证件号:{data?data.certNo:' - - '}</small>
      <small style={{marginRight:16}}>证件效期:{data?data.startDate:' - - '}~ {data?data.endDate:' - - '}</small>
      <Search placeholder='请输入' style={{float:'right',width: 200}} onSearch={this.onSearch}/>
    </div>
  )}
  />
```

<h2 id="2">girdOption</h2>
描述：改变左侧缩略图列表的宽度占比以及右侧图片预览宽度占比

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|leftCol|左侧缩略图列表的宽度占比|object|`{ xs: 8, sm: 8, md: 6, lg: 6 , xl: 5 , xxl: 4 }`|
|rightCol|右侧图片预览宽度占比|object |`{ xs: 8, sm: 8, md: 6, lg: 6 , xl: 5 , xxl: 4 }`|
|rightOffset|右侧图片预览区域offset| object/number |`2`|
