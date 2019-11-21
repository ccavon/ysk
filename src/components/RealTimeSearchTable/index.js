/*
 * @Author: wwb 
 * @Date: 2019-01-31 15:19:08 
 * @Last Modified by: wwb
 * @Last Modified time: 2019-02-02 17:12:38
 */
/**
 * @file 及时搜索表格组件
 */
import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { Resizable } from 'react-resizable'
import { Row, Col, Input, Table, Button, InputNumber, message,Card } from 'antd';
import { Debounce, Bind } from 'lodash-decorators';
import querystring from 'querystring';
import { formatMessage } from '@/utils';
import './style.less';

// let IndexColumns = [{
//   title: '序号',
//   dataIndex: 'index',
//   width: 50,
//   render: (text,record,index) => `${index + 1}`
// }];
const infoStyle= {
  color: 'red',
  fontWeight: 'bold'
}

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

class RealTimeSearchTable extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      dataSource: [],
      selected: [],
      selectedRows: [],
      fetching: false,
      columns: props.columns||[],
      components:{ //table伸缩表头
        header: {
          cell: ResizeableTitle,
        },
      },
      scroll: props.scroll || { x: '100%', y: 360 }
    }
  }
  static propTypes = {
    url: PropTypes.string.isRequired,
    rowKey: PropTypes.string.isRequired,
    columns: PropTypes.array,
    scroll: PropTypes.object,
    onSubmit: PropTypes.func,
    onCancle: PropTypes.func,
    loading: PropTypes.bool,
    query:PropTypes.object
  }
  static defaultProps = {
    hasIndex: true,
    loading: false,
    placeholder: '',
    query: {},
    showTotal: false,
    resizable: false,
    onSubmit : (selectedKeys,selectedRows,dataSource) => console.log(selectedKeys,'selectedKeys',selectedRows,'selectedRows',dataSource),
    onCancle: () => {},
    handleTableChange: () => {}, // 表格编辑处理函数
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.columns!==this.state.columns){
      this.setState({columns:nextProps.columns})
    }
  }
  @Bind()
  @Debounce(600)
  fetchTable(val) {
    if(!val) return;
    this.setState({ val });
    this.fake(val, data => this.setState({ dataSource: data } )); 
  }
  // 请求dataSource
  fake = (value, callback) =>{
    const { url , query } = this.props ;
    if(!url) return message.error('请传入请求地址url参数')
    this.setState({ fetching: true });
     fetch(url + '?searchName=' + value + '&' + querystring.stringify(query), {
          method: 'get',
          mode:'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
      })
      .then(response => {
        return response.json();
      })
      .then(d => {
          setTimeout(() => {
            this.setState({ fetching: false,selectedRows: [],selected: [] });
            callback(d.result);   
          },500)
      })
      .catch(e => console.log("Oops, error", e))
  }

  handleChange = (e) =>{
    this.fetchTable(e.target.value);
  }
  // 合计
  genTotal = (dataSource,dataIndex,priceDataIndex) =>{
    let total = { };
    let num = 0,money = 0;
    dataSource.map(item => {
      num += Number(item[dataIndex] ? item[dataIndex]: 0);
      let price = item[priceDataIndex] ? item[priceDataIndex]: 0;
      money += num*price;
      return null
    });
    total = {
      num,
      money
    }
    return total
  }

  //table伸缩表头
  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      if(this.props.hasIndex) {
        index -= 1;
      };
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  //为colnum添加序列号
  addIndex = (columns) => {
    const { hasIndex } = this.props;
    let ret = columns.slice();
    let ind = columns.findIndex(ele => ele.dataIndex === 'indexNumber');
    if(ind!==-1){
      ret.splice(ind,1)
    }
    if(hasIndex){
      ret.unshift({
        title:'序号',
        unMovable:true,
        fixed:'left',
        className:'text-center',
        dataIndex:'indexNumber',
        width: 50,
        render:(text,record,index)=>`${index+1}`
      })
    }
    return ret
  }
 

  // 数量变化更新dataSource 
  onChange = (record,index,dataIndex,e) =>{
    let newDataSource = this.state.dataSource;
    if(!/^\d+$/.test(e)) return message.warning('输入格式不正确请重新输入')
    newDataSource[index][dataIndex] = e;
    this.setState({ dataSource: [...newDataSource] })
  }

  handerClick = (selected,selectedRows,dataSource) =>{
    if(typeof this.props.onSubmit === 'function'){
      this.props.onSubmit(selected,selectedRows,dataSource)
    }
  }
  render(){
    const { rowKey, columns, onCancle, loading, resizable, placeholder, showTotal } = this.props;
    const { scroll, fetching, components, dataSource, selected, selectedRows } = this.state;
    let dataIndex = undefined, priceDataIndex = undefined; // 数量，价格字段
    columns.map((item,index) => {
      if(item.editable){
        if(item.inputType === 'number'){
          dataIndex = item.dataIndex;
          item.render = (text,record,_index) =>  <InputNumber defaultValue={text ? text: 0} onChange={this.onChange.bind(this,record,_index,item.dataIndex)} /> 
        }
      }
      if(item.isPrice){
        priceDataIndex = item.dataIndex;
      }
      return null;
    });
    //伸缩表头配置
    const mergeColumns = resizable ?
    this.addIndex(this.state.columns).map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }))
    :this.addIndex(this.state.columns);

    let total = this.genTotal(selectedRows,dataIndex,priceDataIndex);
    let showWay = {};
    if( typeof showTotal === 'boolean' && showTotal){
      showWay = {
        productTotal: true,
        totalNum: true,
        totalMoney: true
      }
    }else if(typeof showTotal === 'object'){
      showWay = { ...showTotal }
    }
    return (
      <Card hoverable className='searchCard'>
        <Row>
          <Col span={24} style={{ textAlign: 'right',marginBottom: 8 }}>
            <Input 
              style={{ width: 360 }}
              autoFocus
              allowClear={true}
              onChange={this.handleChange}
              placeholder={`${formatMessage('form.input.placeholder')}${placeholder}`}
            />
          </Col>
        </Row>
          <Table 
            id='searchTable'
            bordered
            components={components}
            loading={fetching}
            onChange={(record,index,dataSource) => this.props.handleTableChange(record,index,dataSource)}
            columns={mergeColumns}
            dataSource={dataSource}
            size={'small'}
            rowSelection={{
              selectedRowKeys: this.state.selected,
              onChange: (selectedRowKeys, selectedRows) => 
              this.setState({selected: selectedRowKeys, selectedRows: selectedRows})
            }}
            pagination={false}
            rowKey={rowKey}
            scroll={scroll}
          />
          {
            dataSource.length > 0 ?
            <Row style={{ padding: 12,fontSize: '1.1rem' }} type="flex" justify="space-between">
              {
                showWay.productTotal
                &&
                <Col span={6}>已选产品： <em style={{ ...infoStyle }}>{`${this.state.selected.length}`}</em></Col>
              }
              {
                showWay.totalNum
                &&
                <Col span={6}>共计数量： <em style={{ ...infoStyle }}>{`${total.num}`}</em></Col>
              }
              {
                showWay.totalMoney
                &&
                <Col span={6}>共计金额：￥ <em style={{ ...infoStyle }}>{`${total.money}`}</em></Col>
              }
              <Col span={6} style={{ textAlign: 'right' }}>
                <Button type='primary' style={{ marginRight: 8 }} loading={loading} onClick={() => this.handerClick(selected,selectedRows,dataSource)}>确定</Button>
                <Button type='default' onClick={onCancle}>取消</Button>
              </Col>
            </Row>
            :
            null
          }
      </Card>
    )
  }
}
export default RealTimeSearchTable;