/*
 * @Author: yuwei 
 * @Date: 2019-01-09 16:42:55 
 * @Last Modified by: xuhao
 * @Last Modified time: 2019-04-17 17:43:51
 */
import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { Icon, Button, Dropdown, Menu } from 'antd';
import { isEqual, isFunction } from 'lodash'

const ButtonGroup = Button.Group;

export default class FilterButtonGroup extends PureComponent {

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.element
    ]),
    options: PropTypes.array,
    onSelect: PropTypes.func,
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    value: PropTypes.string
  }

  static defaultProps = {
    label: "",
    options: [],
    onSelect: (e) => { console.log(e) },
    defaultValue: "",
    style: {},
    className: "",
  }

  state = {
    Text: '',
  }

  componentDidMount = () => {
    const { options, defaultValue } = this.props;
    let defautData = options.filter((item) => item.value === defaultValue || item.code === defaultValue);
    if (defautData.length) {
      this.setState({ Text: defautData[0].text || defautData[0].name })
    }
  }

  componentWillReceiveProps = (nextProps,prevProps) => {
    if ( !isEqual(nextProps,prevProps) ) {
      const { options, defaultValue } = nextProps;
      let defautData = options.filter((item) => item.value === defaultValue || item.code === defaultValue);
      if (defautData.length) {
        this.setState({ Text: defautData[0].text || defautData[0].name })
      }
    }
  }

  /**
   * @description 下拉选项被选中
   */
  handleMenuClick = ({ item, keyPath }) => {
    const { onSelect } = this.props;
    const children = item.props.children;
    const key = item.props.value;
    children && this.setState({ Text: children });
    isFunction(onSelect) && onSelect(key === 'item_0' ? '' : key, item)
  }

  /**
   * @description 根据传入value获取对应的Text
   * @returns {String} 返回查找到的文字
   */
  getPropsText = () => {
    const { value, options } = this.props;
    if ((value || value === '') && options.length) {
      let propsText = options.filter(item => ((item.value && item.value.toString()) === value) || ((item.code && item.code.toString()) === value))[0];
      if (propsText && !!propsText.text) {
        propsText = propsText.text;
      }
      if (propsText && !!propsText.name) {
        propsText = propsText.name;
      }
      return propsText
    }
    return ''
  }

  render() {
    const { label, options, className, style } = this.props;
    const { Text } = this.state;
    const propsText = this.getPropsText();
    const menu = (
      <Menu
        onClick={this.handleMenuClick}
        style={{
          overflowY: 'auto',
          maxHeight: '300px'
        }}
      >
        {
          options.map((item, index) => {
            return <Menu.Item value={item.code || item.value} key={index}>{item.text || item.name}</Menu.Item>
          })
        }
      </Menu>
    )
    return (
      <ButtonGroup className={className} style={style}>
        <Button> {label}</Button>
        <Dropdown overlay={menu}>
          <Button>
            {propsText || Text}<Icon type="down" />
          </Button>
        </Dropdown>
      </ButtonGroup>
    )
  }

}