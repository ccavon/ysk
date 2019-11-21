/*
 * @Author: chengyafang 
 * @Date: 2019-11-19 10:51:50 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-19 11:56:41
 * @file 属性信息分类错误比率
 */
import React, { Component } from 'react';
import { Chart, Coord, Axis, Legend, Tooltip, Geom, Label } from 'bizcharts';
import DataSet from '@antv/data-set';

class AttributeInfoClassify extends Component {
  render() {
    const data = [
      { item: '患者信息', count: 89 },
      { item: '诊疗信息', count: 5 },
      { item: '费用信息', count: 6 }
    ];
    const dv = new DataSet.View().source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: 'percent'
    });
    const scale = {
      percent: {
        formatter: val => `${val * 100}%`
      }
    }
    return (
      <>
        <h4 style={{ padding: '24px 0 0 30px' }}>属性信息分类错误比率</h4>
        <Chart height={300} data={dv} scale={scale} forceFit padding={[20, 50, 50, 50]}>
          <Coord type={"theta"} radius={0.75} innerRadius={0.8} />
          <Axis name="percent" />
          <Legend position="right" offsetX={-50} offsetY={20} />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </>
    )
  }
}
export default AttributeInfoClassify;