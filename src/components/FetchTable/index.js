import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import { Table, message } from 'antd'
import { Resizable } from 'react-resizable'
import querystring from 'querystring'
import { isEqual, isFunction, isBoolean, isObject } from 'lodash';
// import { connect } from 'dva';
import NProgress from 'nprogress';
import classNames from 'classnames';
import "nprogress/nprogress.css";
import './index.less';


const ResizeableTitle = ({ onResize, width, ...restProps }) => (
  width
    ? <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
    : <th {...restProps} />
);

let id = Math.floor((Math.random() * 10000));

// 定义常亮
// const PageSizeOptions = ['10','30','50','100'];
// const PageSize = window.screen.height >= 1000 ? 30 : 10;
const TwinkleTime = 3000; // 3000ms

// @connect(({global, setting})=>({global, setting}))
class FetchTable extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      DomHeight: '100vh',
      dataSource: [],
      columns: props.columns || [],
      onChange: this.handleTableChange || null,//此处后期需要整理
      scroll: props.scroll || { x: '100%' },
      components: {
        header: {
          cell: ResizeableTitle,
        },
      },//table伸缩表头
      pagination: {//分页设置相关
        current: 1,
        position: 'bottom',
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: props.pagesize,//props.setting.defaultPageSize || 
        pageSizeOptions: props.pagesizeOptions,
        size: 'default',
        defaultCurrent: 0,
        total: 0,
        showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
        // onShowSizeChange:this.pageSizeChange
      },
      loading: false,
      filters: null,
      sorter: null,
      defaultPageSize: props.pagesize,// props.setting.defaultPageSize ||
      isMAcOs: false,
      rowKey: '',
      propsRowKey: '',
      rowKeyName: ''
    };
    // console.log(props.setting.defaultPageSize)
    this.timeout = null;
    this.unmount = false;
  }

  static defaultProps = {
    size: 'small',//table的默认大小
    title: null,//默认标题
    footer: null,//默认footer
    style: {},//普通样式
    rowKey: '',//必选
    onRow: null,
    onHeaderRow: () => { },
    // data:null,// 默认数据 支持单行数据修改等内容，从而设定对应数值
    pagesize: 10,//默认一页显示10条数据
    pagesizeOptions: ['10', '30', '50', '100'],
    showHeader: true,
    rowClassName: '',//单行样式
    rowSelection: null,//选择框
    expandedRowRender: null,//延展
    resizable: false,//是否可以伸缩table表头
    hasIndex: true,//默认序号
    isDetail: false,//是否为详情页 - 非详情页设置动态高度。详情页随波逐流
    isFull: true,//是否自动填充数据
    type: 'formData', //请求格式
    method: 'post', //请求方式
    bordered: true,
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.rowKey.toString() !== prevState.propsRowKey.toString()) {
      let newRowKey = nextProps.rowKey,
        rowKeyName = '';
      if (isFunction(newRowKey)) {
        rowKeyName = (`rowKey_${Math.random()}`).replace(".", "");
        newRowKey = (record) => {
          if (record[rowKeyName]) {
            return record[rowKeyName];
          }
          return `${nextProps.rowKey(record)}`;
        };
      }
      return {
        rowKey: newRowKey,
        propsRowKey: nextProps.rowKey,
        rowKeyName
      };
    }
    return null;
  }

  componentDidMount() {
    if (!this.props.isDetail) {//区分列表页与详情页的table布局
      this.initTableHeight();
    };
    if (navigator.platform === "MacIntel") {
      console.log('MAC webkit')
      this.setState({ isMAcOs: true })
    };
    this.fetch();
    this.addIndex();
  }

  // componentWillReceiveProps(nextProps) {
  //   const { query, columns, hasIndex, resizable } = this.props;
  //   if(!isEqual(nextProps.query, query)) {
  //     this.fetch(nextProps.query);
  //   };
  //   if(!isEqual(columns, nextProps.columns) || hasIndex !== nextProps.hasIndex || resizable !== nextProps.resizable) {
  //     this.addIndex(nextProps.columns);
  //   };
  // }



  componentDidUpdate(prevProps, prevState) {
    const { query, columns, hasIndex, resizable, url } = this.props;
    const { pagination } = this.state;
    if (!isEqual(prevProps.query, query) || url !== prevProps.url) {
      this.setState({
        pagination: {
          ...pagination,
          current: 1
        }
      }, () => {
        this.fetch(query);
      });
    };
    if (
      !isEqual(columns, prevProps.columns)
      || pagination.current !== prevState.pagination.current
      || hasIndex !== prevProps.hasIndex
      || resizable !== prevProps.resizable
    ) {
      this.addIndex(columns);
    };
  }

  componentWillUnmount() {
    this.timeout = null;
    this.unmount = true;
  }

  //设置table定高
  initTableHeight = () => {
    const { footer } = this.props;
    const screenHeight = document.body.clientHeight;//当前屏幕高度
    let childDom = this.table;
    var offsetH = this.getTableTop(childDom);//table距离浏览器顶部的高度
    var headH = childDom.querySelector('.ant-table-thead') || childDom.querySelector('.ant-table-body');
    /* table  scroll y值 = 屏幕高度 - 底部bottom（80）- 当前table距离浏览器顶部高度*/
    let DomHeight = screenHeight - offsetH - 50 - 30 - headH.offsetHeight;
    if (footer) {
      DomHeight = DomHeight - 73;
    }
    DomHeight = DomHeight <= 38 ? 38 : DomHeight;//设置最小高度
    // console.log(screenHeight,offsetH,DomHeight);
    // document.querySelector('.ant-table').querySelector('.ant-table-body').style['max-height']=DomHeight+'px';
    if (!this.props.scroll) {
      this.setState({
        scroll: { y: DomHeight }
      })
    } else if (this.props.scroll && !this.props.scroll.y) {
      const scroll = Object.assign(this.props.scroll, { y: DomHeight });
      this.setState({ scroll })
    }
  }
  getTableTop = (htmlElem) => {
    let top = htmlElem.offsetTop;
    if (htmlElem.offsetParent && htmlElem.offsetParent !== document.body) {
      top += this.getTableTop(htmlElem.offsetParent);
    };
    return top;
  }
  //table伸缩表头
  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };
  //为colnum添加序列号
  addIndex = (columns = this.props.columns) => {
    const { hasIndex, resizable, query } = this.props;
    const tableFixedWrapper = '.ant-table-fixed';
    let ret = columns.slice();
    const isFix = ret.length > 0 && ret[0].fixed;
    const ind = columns.findIndex(element => element.dataIndex === 'indexNumber');
    const tableFixed = this.table.querySelector(tableFixedWrapper);
    const indexNumberFixed = this.table && tableFixed && this.table.offsetWidth < tableFixed.offsetWidth;
    if (ind !== -1) {
      ret.splice(ind, 1)
    };

    if (hasIndex) {
      const { current, pageSize } = this.state.pagination;
      const numRender = (text, record, index) => {
        if (query) {
          const pageNum = query.pageNum || current;
          const realPageSize = query.pageSize || pageSize;
          return (pageNum - 1) * realPageSize + index + 1;
        } else {
          return index + 1;
        }
      }
      ret.unshift({
        title: '序号',
        unMovable: true,
        fixed:
          isFix || indexNumberFixed
            ? 'left'
            : '',
        className: 'text-center',
        dataIndex: 'indexNumber',
        width: 62,
        render: numRender
      });
    };

    ret = ret.map((item, i) => {
      let newItem = {
        ...item,
        render: (text, record, index) => {
          //给填充的空数据增加内容撑起高度
          if (record._disable) {
            return <div className='recordDidableMinHeight'></div>
          };

          if (item.render && isFunction(item.render)) {
            return item.render(text, record, index);
          };

          return text;
        }
      };
      //伸缩表头配置
      if (resizable) {
        newItem.onHeaderCell = column => ({
          width: column.width,
          onResize: this.handleResize(i),
        });
      };
      if (
        this.table &&
        tableFixed &&
        this.table.offsetWidth >= tableFixed.offsetWidth &&
        item.dataIndex !== 'indexNumber' &&
        i !== ret.length - 1
      ) {

        newItem.width = '';
        newItem.fixed = false;
      }
      return newItem
    });
    this.setState({ columns: ret });
  }
  //填充空数据到与pageSize相同的长度
  fillFull = (data, newPageSize) => {
    if (!data || !data.length) {
      return [];
    }
    if (!this.props.isFull) {
      return data;
    }
    const { pagination, rowKey, rowKeyName } = this.state;
    const pageSize = newPageSize ? newPageSize : pagination.pageSize;
    const total = data.length;
    const pageNum = total % pageSize === 0 ? total / pageSize : parseInt(total / pageSize) + 1;
    if (total !== pageSize) {//当前数据与pageSize不相等的时候进行数据填充
      for (let i = 0; i < pageNum * pageSize; i++) {
        if (!data[i]) {
          if (typeof rowKey === 'function') {
            data[i] = {
              [rowKeyName]: `${id}`,
              _disable: true
            };
          };
          if (typeof rowKey === 'string') {
            data[i] = {
              [rowKey]: `${id}`,
              _disable: true
            };
          }
          id++;
        }
      }
    }
    return data
  }
  //table 更换
  handleTableChange = (paginations, filters, sorter) => {
    const { onChange, query } = this.props;
    let { pagination, defaultPageSize } = this.state;
    const { pageSize, current } = paginations;
    let newPaginations = {
      current: defaultPageSize === paginations.pageSize ? current : 1,
      pageSize
    }
    let postData = {
      ...query,
      pageSize: pageSize,
      pageNum: defaultPageSize === paginations.pageSize ? current : 1,
    }
    Object.assign(postData, { ...filters })
    if (sorter && sorter.order && sorter.field) {
      postData.sortField = sorter.field;
      postData.sortOrder = sorter.order;
    }
    if (onChange && typeof onChange === 'function') {
      onChange({ paginations, filters, sorter, postData })//run props onChange function
    } else {
      console.log('catch Table handleTableChange')
      this.fetch(postData);
    }
    this.setState({ pagination: Object.assign({}, { ...pagination }, { ...newPaginations }), defaultPageSize: paginations.pageSize })
  }

  //发出请求
  fetch = (params = { ...this.props.query }, url = this.props.url) => {
    let { pagination } = this.state;
    const { callback, fetchBefore, type, method } = this.props;
    const postData = Object.assign({
      pageSize: pagination.pageSize,
      pageNum: pagination.current || 1
    }, params);
    if (url) {
      NProgress.start();
      this.setState({
        loading: true
      });
      if (fetchBefore && typeof fetchBefore === 'function') {
        fetchBefore();
      };
      const ContentType = type === 'formData'
        ? 'application/x-www-form-urlencoded; charset=utf-8'
        : 'application/json; charset=utf-8';
      let options = {
        method: method,
        mode: 'cors',
        credentials: 'include',
        headers: {
          'JSESSIONID': localStorage.getItem('JSESSIONID'),
          'Content-Type': ContentType
        },
      };
      if (method === 'post' || method === 'POST') {
        options.body = type === 'formData' ? querystring.stringify(postData) : JSON.stringify(postData);
      }
      if (method === 'GET' || method === 'get') {
        url = url + '?' + querystring.stringify(postData);
      }
      fetch(`${url}`, options)
        .then(response => {
          NProgress.done();
          return response.json();
        })
        .then(data => {
          if (this.unmount) return;
          this.setState({
            loading: false
          });
          if (data.status !== 200) {
            NProgress.done();
            if (callback && typeof callback === "function") {
              callback();
            };
            return message.error(data.msg);
          }
          /* 处理正确数据  data.result.rows*/
          let { count } = data.result;// total ,fieldName ,
          let tableData = data.result.rows || data.result;
          if (postData.pageSize) {
            pagination.pageSize = postData.pageSize
          }
          if (postData.pageNum) {
            pagination.current = postData.pageNum
          }
          pagination.total = count || tableData.length;
          const newData = this.fillFull(tableData, pagination.pageSize) || (Array.isArray(data.result) ? this.fillFull(data.result, pagination.pageSize) : []);
          this.setState({
            dataSource: newData,
            pagination,
          });

          //翻页 - 滚动条置顶
          let scroll = this.table.querySelector('.ant-table-body');
          let _scroll = this.table.querySelector('.ant-table-header');
          scroll.scrollTo(0, 0);
          _scroll && _scroll.scrollTo(0, 0);
          if (callback && isFunction(callback)) {
            callback({ data, postData });
          };
        })
        .catch(e => {
          console.error(e);
          message.error('FetchTable请求失败: ', e);
          NProgress.done();
          this.setState({ loading: false });
          if (callback && isFunction(callback)) {
            callback({ data: {}, postData });
          };
        })
    } else {
      this.setState({ data: [], loading: false })
    }
  }

  setDataSource = (data) => {
    if (data) {
      this.setState({
        dataSource: this.fillFull(data)
      })
    }
  }

  getDataSource = () => {
    let dataSource = [...this.state.dataSource]
    return dataSource
  }

  //第一行高亮
  hightlight = (rowIndex, colFileds) => {
    if (!rowIndex) {
      let table = document.getElementById('table');
      table.className += ' hightlight'
      this.timeout = setTimeout(() => {
        table.className = table.className.replace('hightlight', '');
      }, TwinkleTime);
    }
  }

  getRowSelection = () => {
    const { rowSelection } = this.props;
    if (!rowSelection) return null;
    return {
      fixed: true,// 复选框左固定
      ...rowSelection,
      columnWidth: 50,//复选框宽度
      getCheckboxProps: record => (
        rowSelection.getCheckboxProps && isFunction(rowSelection.getCheckboxProps)
          ? {
            ...rowSelection.getCheckboxProps(record),
            disabled: (isBoolean(record._disable) && record._disable) || rowSelection.getCheckboxProps(record).disabled
          }
          : { disabled: isBoolean(record._disable) && record._disable }
      ),
    };
  }

  render() {
    const {
      dataSource,
      scroll,
      components,
      pagination,
      columns,
      loading,
      isMAcOs,
      rowKey
    } = this.state;
    const {
      style,
      size,
      title,
      footer,
      showHeader,
      rowClassName,
      rowSelection,
      onRow,
      onHeaderRow,
      expandedRowRender,
      pagination: paginations,
      loading: propsLoading,
      dataSource: propsDataSource,
      ...otherProps
    } = this.props;
    let mergePagination = pagination;
    if (paginations && isObject(paginations)) {
      mergePagination = Object.assign(pagination, paginations);
    };
    if (!paginations && isBoolean(paginations)) {
      mergePagination = paginations;
    };
    let _props = {
      ...otherProps,
      dataSource: propsDataSource ? this.fillFull(propsDataSource) : dataSource,
      columns,
      rowKey,
      rowClassName,
      onHeaderRow,
      onRow,
      showHeader,
      size,
      loading: isBoolean(propsLoading) ? propsLoading : loading,
      title,
      footer,
      scroll,
      style,
      components,
      onChange: this.handleTableChange,
      pagination: mergePagination
    };
    if (expandedRowRender) {
      _props.expandedRowRender = expandedRowRender;
    };
    if (isMAcOs) {//如果当前操作系统为 Mac OS X , 则添加相关class类名
      _props.className = classNames(_props.className, 'MacIntel', 'table-header-bg');
    };
    _props.className = classNames(_props.className, 'table-mini-size', 'table', 'table-header-bg');
    return (
      <React.Fragment>
        <Table
          ref={(node) => this.table = ReactDom.findDOMNode(node)}
          rowSelection={this.getRowSelection()}
          {..._props}
        >
          {this.props.children}
        </Table>
      </React.Fragment>
    )
  }
}
export default FetchTable