import React from 'react';
import PropTypes from 'prop-types';
import { Select, Spin, message } from 'antd';
import request from '@/utils/request';
import { Debounce, Bind } from 'lodash-decorators';

const { Option } = Select;

class FetchSelect extends React.Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    queryKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    method: PropTypes.oneOf(['POST', 'GET']),
    type: PropTypes.oneOf(['json', 'formData']),
    valueAndLabel: PropTypes.object.isRequired,
    onSelectCB: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetching: false,
    };
    // this.handleChange = debounce(this.handleChange, 800);
  }

  componentDidMount = () => {
    //表单回显首次请求
    //有bug 必须在切换菜单和切换到与本模块无关的路由的时候清除掉fetchSelectQuery
    const { query } = this.props;
    if (typeof query === 'undefined' || query === '') return;
    // const fetchSelectQuery = window.sessionStorage.getItem('fetchSelectQuery');
    // if (!fetchSelectQuery) return;
    // this.handleChange(fetchSelectQuery);
    this.handleChange(this.props.query);
  }

  @Bind()
  @Debounce(600)
  handleChange(value) {
    if (value === '') return;
    let queryKey = this.props.queryKey;
    this.setState({ data: [], fetching: true });
    let body;
    if (typeof value === 'object') {
      body = value;
    }
    if (queryKey && typeof value !== 'object') {
      if (typeof queryKey === 'string') {
        body = {
          [this.props.queryKey]: value
        };
      };
      if (typeof queryKey === 'object') {
        queryKey = {...queryKey};
        body = {
          ...queryKey,
          [queryKey.valueKey] : value
        };
        delete body.valueKey;
      };
    };
    request(this.props.url, {
      method: this.props.method || 'POST',
      type: this.props.type || 'formData',
      body
    })
    .then(({result, msg, status})=>{
      this.setState({
        fetching: false
      });
      if (status !== 200) {
        return message.error(msg);
      };
      this.setState({
        data: result.rows || result,
        fetching: false
      });
    })
    .catch((err) => {
      this.setState({
        fetching: false
      });
      message.error(`FetchSelect组件请求失败 : ${err}`);
    })
  }

  getValues = (value, option) => {
    let { data } = this.state;
    data = data.find(item => item.id === value);

    let { onSelectCB, onChange } = this.props;
    if (onSelectCB && typeof onSelectCB === 'function') {
      onSelectCB(value, data);
    };
    if (onChange && typeof onChange === 'function') {
      onChange(value, option);
    };
  }

  listRender = () => {
    let { data } = this.state;
    let { valueAndLabel } = this.props;
    if (valueAndLabel) {
      let {value, label} = valueAndLabel;
      if ( !data || (data && !data.length) ) { return null }
      return data && data.map((item, i) => {
        return <Option key={i} value={item[value]} record={item}>{item[label]}</Option>
      })
    };
  }

  render() {
    let { fetching } = this.state;
    const {
      defaultValue,
      allowClear,
      disabled,
      placeholder,
      ...otherProps
    } = this.props
    let props = {
      showSearch: true,
      defaultValue,
      onSearch: this.handleChange,
      onChange: this.getValues,
      defaultActiveFirstOption: false,
      allowClear,
      filterOption: false,
      disabled,
      placeholder,
      ...otherProps
    };
    if (fetching) {
      props.notFoundContent = (
        <div style={{padding: '0 5px'}}>
          <Spin size="small" />
        </div>
      );
    }
    if (this.props.value) {
      props.value = this.props.value;
    };
    return (
      <Select
        {...props}
      >
        {this.listRender()}
      </Select>
    );
  }
}

export default FetchSelect ; 