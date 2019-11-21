##组件说明
-通用参考[Upload组件官方文档](https://ant.design/components/upload-cn/#header)
[AvatarEditor组件官网文档](https://react.ctolib.com/react-avatar-editor.html)

<h2 id="1">扩展参数</h2>

|参数|描述|传输数据类型|默认值|
|---|:--:|---:|---:|
|limitSize|限制图片上传的大小(单位kb)|number||
|requestName|上传后台文件名key值|string|必传|
|onUploadSuccess|裁剪完成后上传成功触发该函数|fun(resultList)后台返回的路径数组|
|onUploadFail|裁剪完成后上传失败触发该函数|fun(errorMsg)|
|uploadNum|上传数量|number||
|onCloseClick|点击关闭按钮时触发|func||
|onUploadClick|点击上传按钮时触发|func||
|uploadButton|上传按钮|string`|`ReactNode|`<Button><Icon type="upload" />上传</Button>`|
|clipImgProps|裁剪组件props|{}|[参数说明](#6) [更多参数](https://react.ctolib.com/react-avatar-editor.html)|
|uploadProps|上传组件props|{}|[参数说明](#7) [更多参数](https://ant.design/components/upload-cn/#header)|


<h2 id="6">clipImgProps</h2>

|参数|描述|传输数据类型|默认值|
|---|:--:|---:|---:|
|clipHeight|裁剪区域高度|number|600|
|clipWidth|裁剪区域宽度|number|600|
|whellControl|是否滚轮缩放|bool|false|
|zoomratio|滚轮缩放速率|number|0.2|

<h2 id="7">uploadProps</h2>

|参数|描述|传输数据类型|默认值|
|---|:--:|---:|---:|
|action|图片上传地址|string|必传|
|accept|限制图片上传格式|string|'image/*' [参考](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)|

``` 
<UploadPic
  onUploadSuccess={this.onUploadSuccess}
  onUploadFail={this.onUploadFail}
  uploadNum={1}
  limitSize={20000}
  requestName='file'
  clipImgProps={{
    clipHeight: 600,
    clipWidth: 600,
    whellControl: false,
    zoomratio: 0.1
  }}
  uploadProps={{
    action: "http://192.168.31.24:8082/meqm/StaticDataController/uploadFile",
    accept: ".jpg"
  }}
  onCloseClick={this.onCloseClick}
  onUploadClick={this.onUploadClick}
/>
```