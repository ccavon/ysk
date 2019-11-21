/*
 * @Author: chengyafang 
 * @Date: 2019-11-11 17:03:01 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-19 16:07:31
 * 基金支付类型
 */
import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from "bizcharts";
import DataSet from "@antv/data-set";

class FundPayment extends React.Component {
  render() {
    const data = [
      {
        item: "大病保险",
        count: 4
      },
      {
        item: "医疗救助",
        count: 5
      },
      {
        item: "公务员医疗补助",
        count: 4
      },
      {
        item: "大额补充",
        count: 1
      },
      {
        item: "企业补充",
        count: 2
      },
      {
        item: "医保统筹基金支付",
        count: 20
      },
      {
        item: "其他支付",
        count: 64
      }
    ];
    const dv = new DataSet.View().source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <div>
        <h4 style={{ padding: '24px 0 0 30px' }}>基金支付类型</h4>
        <Chart height={350} data={dv} scale={cols} forceFit padding={[0, 150, 0, 150]}>
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          <Legend position="right" />
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
      </div>
    )
  }
}
export default FundPayment;