import React, { PureComponent } from 'react';
import { Select, message, Table } from 'antd';
import PropTypes from 'prop-types';
import request from '@/utils/request';
import { Debounce, Bind } from 'lodash-decorators';
class SelectDropdownTable extends PureComponent {
  state = {
    open: false,
    searchValue: undefined,
    dataSource: [],
    fetching: false
  }

  static defaultProps = {
    onChange: (value) => value
  }

  initFetch = (query) => {
    this.setState({
      fetching: true
    });
    request(this.props.url, {
      method: this.props.method || 'POST',
      type: this.props.type || 'formData',
      body: query
    })
    .then(({result, msg, status})=>{
      this.setState({
        fetching: false
      });
      if (status !== 200) {
        return message.error(msg);
      };
      this.setState({
        dataSource: result.rows || result,
      });
    })
    .catch((err) => {
      message.error(`下拉表格请求失败: ${err}`);
    });
  }
  
  onChange = (value) => {
    const isFetch = value === '' || value === undefined;
    const { onChange } = this.props;
    onChange(value);
    this.setState({
      searchValue: value === '' ? undefined : value,
    }, () => {
      if (!isFetch) {
        this.fetch();
      }
    });
    if (isFetch) {
      this.setState({
        dataSource: []
      });
    }
  }

  @Bind()
  @Debounce(600)
  fetch() {
    let { query } = this.props;
    let { searchValue } = this.state;
    if(searchValue === '' || searchValue === undefined) return;
    
    if (typeof query === 'object') {
      query = {
        ...query, 
        [query.searchName]: searchValue
      };
      delete query.searchName;
    }
    if (typeof query === 'string') {
      query = {
        [query]: searchValue
      };
    }
    this.initFetch(query);
  }
  
  //重置
  reset = () => {
    this.setState({
      searchValue: undefined,
      dataSource: [],
    });
  }

  lockClose = e => {
    e.preventDefault(); 
    clearTimeout(this.lock);
    this.lock = setTimeout(() => {
      this.lock = null;
    }, 100);
  }

  onDropdownVisibleChange = (open) => {
    if (this.lock) return;
    this.setState({
      open
    });
  }
  render() {
    const { open, searchValue, dataSource, fetching } = this.state;
    let { placeholder, columns, rowKey, dropdownAlign, style } = this.props;
    return (
      <Select
        style={{
          width: '100%',
          ...style
        }}
        showSearch
        open={open}
        allowClear
        dropdownAlign={dropdownAlign}
        value={searchValue}
        onSearch={this.onChange}
        onChange={this.onChange}
        onDropdownVisibleChange={this.onDropdownVisibleChange}
        placeholder={placeholder}
        dropdownMatchSelectWidth={false}
        dropdownRender={menu => (
          <div 
            onMouseDown={this.lockClose} 
            onMouseUp={this.lockClose}
          >
            <Table
              bordered
              columns={columns}
              dataSource={dataSource}
              loading={fetching}
              rowKey={rowKey}
              scroll={{y: 200, x: 1000}}
              size="small"
              pagination={false}
            />
          </div>
        )}
      >
      </Select>
    )
  }
};
SelectDropdownTable.propTypes = {
  url: PropTypes.string.isRequired,
  searchName: PropTypes.string,
  rowKey: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.func.isRequired,
  ]),
  columns: PropTypes.array.isRequired,
  query: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
  ]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default SelectDropdownTable;