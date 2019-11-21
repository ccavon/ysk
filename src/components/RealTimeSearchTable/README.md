## RealTimeSearchTable组件说明 
- [扩展参数](#1)
  - [columns](#2)通用参考[官方文档](https://ant.design/components/table-cn/#Column)
  - 
<h2 id="1">扩展参数</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|hasIndex|是否显示序号|boolean|true|
|resizable|是否可以伸缩table表头|boolean|false|
|query|前置搜索内容/搜索条件|object|{}|
|rowKey|表格行 key 的取值，可以是字符串或一个函数|string/Function(record):string|'key'|
|url|默认table的请求路径 | string| 必传 |
|placeholder|输入搜索框placeholder(关键字)|string|''|
|loading|确定按钮loading状态(onSubmit中处理loding)|boolean|false|
|showTotal|是否展示footer 合计信息|boolean/object{ productTotal: true, totalNum: true, totalMoney: true },展示合计价格时,必定要传价格dataIndex|false|
|onSubmit|确定按钮处理函数|func||
|onCancle|取消按钮处理函数|func||

```
  <Row>
    <Col><Button type='primary' icon={addDropDown ? 'minus': 'plus'} onClick={this.addProduct}>{addDropDown ? '收起': '添加产品'}</Button></Col>
  </Row>
    {
      addDropDown
      &&
      <RealTimeSearchTable
        hasIndex={true}
        resizable={true}
        query={query}
        rowKey={'guid'}
        url={'https://www.easy-mock.com/mock/5be2a2fa6addde272291bae6/getProductList'}
        columns={columns}
        placeholder={'生厂商'}
        loading={dirtyClick}
        showTotal={true}
        // showTotal={{ productTotal: true, totalNum: true, totalMoney: true }}
        onCancle = {() => this.setState({ addDropDown: false })}
        onSubmit={(selected,selectedRows,dataSource) => this.onSubmit(selected,'selected',selectedRows,'selectedRows',dataSource,'dataSource')}
      />
    }
```

<h2 id="2">columns</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|editable|是否可编辑|boolean|false|
|inputType|编辑类型(目前仅针对数量 number 类型有效)|string|number|
|isPrice|columns dataIndex 是否针对价格(计算合计金额时必传)|boolean|true|

```
const columns = [{
  title: '产品名称',
  dataIndex: 'materialName',
  width: 200
},{
  title: '通用名称',
  dataIndex: 'geName',
  width: 200,
  editable: true,
  inputType: 'string',
},{
  title: '可用数量',
  dataIndex: 'usualQuanlity',
  width: 100,
  inputType: 'number',
  editable: true
},{
  title: '采购价',
  width: 120,
  dataIndex: 'price',
  render: (text,record) => text ? text.toFixed(2): '0.00',
  isPrice: true
},{
  title: '型号',
  dataIndex: 'fmodel',
  width: 180
},{
  title: '规格',
  dataIndex: 'spec',
  width: 200
},{
  title: '生产厂家',
  dataIndex: 'producer',
  width: 200
},{
  title: '地址',
  dataIndex: 'address',
  width: 180
}]
```