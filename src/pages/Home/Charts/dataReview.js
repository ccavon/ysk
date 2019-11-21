/*
 * @Author: chengyafang 
 * @Date: 2019-11-11 17:03:30 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-15 15:45:30
 * 数据审核主要指标：完整性、合理性、规范性（统计量/错误率/得分比）
 */
import React from 'react';
import { Chart, Geom, Axis, Legend, Tooltip } from "bizcharts";
import DataSet from "@antv/data-set";

class DataReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const data = [
      {
        "name": "完整性",
        "countAmount": 18.9,
        "errorRate": 28.8,
        "scoreRatio": 39.3
      },
      {
        "name": "合理性",
        "countAmount": 99.7,
        "errorRate": 52.6,
        "scoreRatio": 35.5
      },
      {
        "name": "规范性",
        "countAmount": 37.4,
        "errorRate": 42.4,
        "scoreRatio": 56.6
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["countAmount", "errorRate", "scoreRatio"],
      // 展开字段集
      key: "type",
      // key字段
      value: "value" // value字段
    });
    const getName = {
      countAmount: "统计量",
      errorRate: "错误率(%)",
      scoreRatio: "得分比",
    };
    return (
      <div>
        <h4 style={{ padding: '24px 0 0 30px' }}>数据审核主要指标</h4>
        <Chart height={400} data={dv} forceFit>
          <Axis name="name" />
          <Axis name="value" />
          <Legend
            itemFormatter={val => {
              return getName[val]; // val 为每个图例项的文本值
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position="name*value"
            color={"type"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
            tooltip={['type*value', (type, value) => {
              return {
                name: getName[type],
                value: value
              }
            }]}
          />
        </Chart>
      </div>
    )
  }
}
export default DataReview;