/*
 * @Author: chengyafang 
 * @Date: 2019-11-11 17:02:39 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-19 14:56:49
 * 医保支付方式
 */
import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from "bizcharts";
import DataSet from "@antv/data-set";

class MedicarePayment extends React.Component {
  render() {
    const data = [
      {
        item: "其他",
        count: 79
      },
      {
        item: "按项目",
        count: 4
      },
      {
        item: "单病种",
        count: 5
      },
      {
        item: "按病种分值",
        count: 1
      },
      {
        item: "按床日",
        count: 4
      },
      {
        item: "按人头",
        count: 5
      },
      {
        item: "疾病诊断相关分组",
        count: 2
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
        <h4 style={{ padding: '24px 0 0 30px' }}>医保支付方式</h4>
        <Chart height={300} data={dv} scale={cols} padding={[50, 100, 80, 50]} forceFit>
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          <Legend
            position="right"
            offsetX={-20}
            offsetY={100}
          />
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
                return item.point.item + "：" + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    )
  }
}
export default MedicarePayment;