## 组件说明 
- 通用参考[官方文档](https://ant.design/components/table-cn)
- [扩展参数](#1)
  - [paginations](#2)
  - [Columns](#3)
  - [拓展方法](#4)

<h2 id="1">扩展参数</h2>

|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|hasIndex|是否显示序号|boolean|true|
|isFull|是否填充数据|boolean|true|
|isDetail|是否为详情页(非详情页设置动态高度。详情页随波逐流)|boolean|false|
|resizable|是否可以伸缩table表头|boolean|false|
|columns|前置搜索内容/搜索条件|object|[]|
|rowKey|表格行 key 的取值，可以是字符串或一个函数|string/Function(record):string|'key'|
|url|默认table的请求路径 | string| 必传 |
|footer|配置footer | string/node | |
|query|前置搜索内容/搜索条件|object|{}|
|onChange|分页事件/tableHead过滤事件|function(pagination, filters, sorter){}||
|rowSelection|表格行是否可选|object|null|
|paginations|条件返回查询时需要添加的参数|object|null|

```
  <FetchTable 
    isDetail={false}
    hasIndex={false}
    resizable={true}
    columns={columns}
    footer={() => 'Footer'}
    wrappedComponentRef={(table) => this.fetchTable = table}
    rowKey='assetsRecordGuid'
    rowSelection={{
        selectedRowKeys:[],
        onChange:(selectedRowKeys, selectedRows)=>{
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    }}
    onChange={this.onChange}
    size="small"
    title={() => 'Header'}
    rowClassName={ (record) => record._disable ? 'isFillData' : ''}
    expandedRowRender={record => {
      if(!record._disable){      /*由于添加了填充数据功能 。 此处判断必做 。 */
        return (
        <p style={{ margin: 0 }}>123213</p>)
      }
    }}
    scroll={{x:'100%'}}
    query={{}}
    url={url}
  >
  </FetchTable>
```

<h2 id="2">paginations</h2>

描述：配置paginations。
```
{
  current:1,
  position:'bottom',
  showSizeChanger:true,
  showQuickJumper:true,
  pageSizeOptions:['10','30','50'],
  size:'default',
  defaultCurrent:0,
  pageSize:10,
  total:0,
  showTotal:(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
}
```
|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|defaultCurrent| 默认的当前页数	 | number | 1 |
|current| 当前页数	 | number | 1 |
|showSizeChanger| 是否可以改变 pageSize	 | bool | true |
|showQuickJumper| 是否可以快速跳转至某页	 | bool | true |
|defaultCurrent| 默认的当前页数	 | number | 1 |
|pageSize| 每页条数	| number | 1 |
|pageSizeOptions| 指定每页可以显示多少条		| string[] | ['10','30','50'] |

<h2 id="3">Columns</h2>

描述：配置Columns。
```
{
  title: '操作',
  dataIndex: 'RN',
  width: 50,
  unMovable:true,
  render: (text, record) =>{
    if(!record._disable){
      return (
        <span>操作按钮</span>
     )
    }
  } 
},
```
|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|unMovable| 是否不允许在自定义表头中操作 | boolean | false |


<h2 id="4">拓展方法</h2>

- 调用`this.refs.table.fetch（）`的方法触发当前FetchTable请求，参数包括postData.
- 调用`this.refs.table.setDataSource（）`的方法设置当前FetchTable,参数为当前需要设置的内容，数据类型`array[]`。
- 调用`this.refs.table.getDataSource（）`的方法获取当前FetchTable的数据内容，返回数组格式。


