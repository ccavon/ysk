/*
 * @Author: chengyafang 
 * @Date: 2019-11-20 11:46:20 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-21 09:31:58
 */
import React, { PureComponent } from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import { Button } from 'antd';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Page1 extends PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100
  };
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newCounter: 0
    }
  }
  componentDidMount = () => {
    this.baseConfig();
  }

  baseConfig = () => {
    let items = [0, 1, 2, 3, 4].map((currentValue, index, arr) => {
      return {
        i: currentValue.toString(),
        x: currentValue * 2,
        y: 0,
        w: 2,
        h: 2,
        add: currentValue === (arr.length - 1).toString()
      }
    });
    console.log('arrVal', items);
    this.setState({ items });
  }

  createElement = el => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? '+' : el.i;
    return (
      <div key={i} data-grid={el} style={{ background: 'pink' }}>
        {
          el.add ? (
            <span className={'add text'} onClick={this.onAddItem} title={'You can add an item by clicking here, too.'}>
              Add +
            </span>
          ) : (
              <span className={'text'}>变形金刚变：{i}</span>
            )
        }
        <span
          className={'remove'}
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          X
        </span>
      </div>
    )
  }

  onAddItem = () => {
    console.log('adding', 'n' + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: 'n' + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity,
        w: 2,
        h: 2
      }),
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange = (breakpoint, cols) => {
    this.setState({ breakpoint, cols });
  }

  onLayoutChange = layout => {
    // this.props.onLayoutChange(layout);
    this.setState({ layout });
  }
  onRemoveItem = (i) => {
    console.log('onRemoveItem', i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }
  render() {
    return (
      <Authority>
        <PageHeaderWrapper title={'测试页面1'}>
          <Button type={'primary'} onClick={this.onAddItem}>Add Item</Button>
          <ResponsiveReactGridLayout
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            {...this.props}
          >
            {_.map(this.state.items, el => this.createElement(el))}
          </ResponsiveReactGridLayout>
        </PageHeaderWrapper>
      </Authority>
    )
  }
}
export default Page1;