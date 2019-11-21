import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Exception from '@/components/Exception';
import { Button, Modal, Checkbox, Row, Col } from 'antd';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { BaseConfig, LayoutConfig, CheckboxTag } from './config';
import _ from 'lodash';
import './style/index.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

@Exception
class HomePage extends PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100
  };
  constructor(props) {
    super(props);
    let checked = BaseConfig.map(item => item.type);
    let disabled = BaseConfig.filter(item => item.defaultShow).map(item => item.type);
    this.state = {
      items: BaseConfig,
      layout: BaseConfig,
      globalEdit: false, // 是否为编辑状态
      defaultChecked: disabled, // 默认不可删减的操作
      cacheChecked: checked, // 历史选择
      checked: checked, // 选中展示
      submitJson: null, // 暂时不知道是什么意思
      visible: false,
      newCounter: 0
    }
  }
  createElement = (el) => {
    const { globalEdit } = this.state;
    const { type, defaultShow, i } = el;
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    return (
      <div key={i} data-grid={el} style={{ background: '#f8f8f8' }}>
        <span className="text">
          {type && LayoutConfig[type].components}
        </span>
        {
          // 存在默认模块则不展示删除按钮
          !defaultShow && globalEdit && (
            <span
              className="remove"
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, i)}
            >
              X
            </span>
          )
        }
      </div>
    );
  }
  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }
  onLayoutChange = (layout) => {
    console.log('onLayoutChange', layout);
    const { items, globalEdit } = this.state;
    if (!globalEdit) return false;
    let newConfigJson = layout.map((item, index) => {
      let configItem = items.filter(subItem => subItem.i === item.i)[0];
      let { x, y, w, h, ...configItems } = configItem;
      return {
        ...item,
        ...configItems
      }
    });
    this.setState({ layout: newConfigJson, submitJson: newConfigJson });
    console.log('得到的新布局：', newConfigJson);
  }
  // 设置：改变编辑状态
  _changeEditStatus = () => {
    const { layout } = this.state;
    let edit = _.cloneDeep(layout);
    let editLayout = edit.map(item => {
      item.static = false;
      return item;
    });
    console.log('editLayout', editLayout);
    this.setState({ globalEdit: true, layout: editLayout, items: editLayout });
  }
  // 删除：删除布局中的item
  onRemoveItem = (i) => {
    const { items, checked, cacheChecked } = this.state;
    let removeItemsInfo = items.filter(item => item.i === i);
    let type = removeItemsInfo.length && removeItemsInfo[0].type;
    console.log(removeItemsInfo, type, 'sdsd')
    this.setState({
      items: _.reject(this.state.items, { i: i }),
      checked: checked.filter(item => item !== type),
      cacheChecked: cacheChecked.filter(item => item !== type)
    });
  }
  // 保存
  _saveGirdLayout = () => {
    const { layout } = this.state;
    let cloneLayout = _.cloneDeep(layout);
    console.log('cloneLayout', cloneLayout)
    let staticLayout = cloneLayout.map(item => {
      return {
        ...item,
        static: true,
        // defaultShow: false
      }
    });
    console.log('staticLayout', staticLayout);
    this.setState({ globalEdit: false, layout: staticLayout });
  }
  // 添加布局item 并且合并config中的参数配置
  onAddItem = newArr => {
    const { cols, items, newCounter } = this.state;
    let newItems = newArr.map((item, index) => {
      let { components, ...defaultConfig } = LayoutConfig[item];
      return {
        i: "n" + newCounter + index,
        x: ((items.length + index) * 2) % (cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        type: item,
        ...defaultConfig
      }
    });
    console.log(newItems);
    /*eslint no-console: 0*/
    this.setState({
      // Add a new item. It must have a unique key!
      items: items.concat(newItems),
      // Increment the counter to ensure key is always unique.
      newCounter: newCounter + newArr.length
    });
  }
  // 弹框选中模块进行添加
  _addWorkBenchItem = () => {
    const { checked, cacheChecked } = this.state;
    let newArr = _.difference(checked, cacheChecked);
    this.onAddItem(newArr);
    this.setState({ visible: false, cacheChecked: checked });
  }
  // 根据浏览器种类来正确显示
  _fullScreen = () => {
    let element = document.getElementById('board');
    let fullscreenEle = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    console.log('fullscreenEnabled', document.fullscreenEnabled); // true
    console.log('fullscreenElement', fullscreenEle); // null
    if (element.requestFullscreen) {
      element.requestFullscreen();
      console.log('fullscreenEnabled', document.fullscreenEnabled); // true
      setTimeout(() => {
        let fullscreenEle = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        console.log('fullscreenElement', fullscreenEle); // <div id="board">...</div>
      }, 300);
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
  render() {
    const { items, globalEdit, visible, checked, defaultChecked, cacheChecked } = this.state;
    return (
      <PageHeaderWrapper title={(<p style={{ margin: 0, fontSize: 18, lineHeight: '32px' }}>工作台
        <Button type={'primary'} className="pull-right ml-8" onClick={this._changeEditStatus}>设置</Button>
        <Button type={'primary'} className="pull-right ml-8" onClick={this._fullScreen}>全屏</Button>
        {
          globalEdit && (
            <>
              <Button type={'primary'} className="pull-right ml-8" onClick={() => this.setState({ visible: true })}>新增</Button>
              <Button type={'primary'} className="pull-right ml-8" onClick={this._saveGirdLayout}>保存</Button>
            </>
          )
        }
      </p>)}>
        <div id={'board'}>
          <ResponsiveGridLayout
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            {...this.props}
            layouts={{
              lg: this.state.layout,
              md: this.state.layout,
              sm: this.state.layout,
              xs: this.state.layout,
              xxs: this.state.layout
            }}
          >
            {_.map(items, el => this.createElement(el))}
          </ResponsiveGridLayout>
        </div>
        <Modal
          visible={visible}
          title={'自定义工作台'}
          centered
          maskClosable={false}
          destroyOnClose={true}
          width={600}
          onCancel={() => this.setState({ visible: false, checked: cacheChecked })}
          onOk={this._addWorkBenchItem}
        >
          <Checkbox.Group
            defaultValue={checked}
            style={{ width: '100%' }}
            onChange={(checkedValues) => this.setState({ checked: checkedValues })}
          >
            <Row>
              {
                CheckboxTag.map((item, index) => {
                  return (
                    <Col span={8} key={item.value}>
                      <Checkbox
                        value={item.value}
                        checked={checked.includes(item.value)}
                        disabled={defaultChecked.includes(item.value)}
                      >
                        {item.text}
                      </Checkbox>
                    </Col>
                  )
                })
              }
            </Row>
          </Checkbox.Group>
        </Modal>

      </PageHeaderWrapper>
    )
  }
}
export default HomePage;
