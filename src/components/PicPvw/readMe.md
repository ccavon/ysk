##组件说明
-通用参考[官方文档](https://react.ctolib.com/react-avatar-editor.html)

<h2 id="1">扩展参数</h2>

|参数|描述|传输数据类型|默认值|
|---|:--:|---:|---:|
|visible|预览模块显示隐藏|boolean|false|
|whellControl|是否滚动缩放图片|boolean|false|
|zoomratio|滚动缩放速率|Number|0.1|
|image|图片信息|string`|`[]|必传|
|activeImage|用户点击的当前图片的uid|any|当image为[]必传|
|onClose|关闭按钮点击事件|func|必传
```
  <PicPvw
    onClose={this.onClose}
    activeImage={'1'} /*值为image数组内的任意一个uid*/
    visible={visible}
    image={[
        {
          uid: '-1',
          name: '789.png',
          url: require('@/assets/789.png'),
        },
        {
          uid: '1',
          name: '123.png',
          url: require('@/assets/123.png'),
        },
        {
          uid: '2',
          name: '456.jpg',
          url: require('@/assets/456.jpg'),
        },
      ]}
  />
```