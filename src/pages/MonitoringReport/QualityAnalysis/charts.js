/*
 * @Author: chengyafang 
 * @Date: 2019-11-14 14:54:57 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-14 16:08:58
 * 根据树的最末级展示数据带出图表数据
 */
import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";

class Charts extends Component {
  render() {
    const cols = {
      years: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <h1 style={{ textAlign: 'center', fontSize: 26 }}>出院患者情况</h1>
        <Chart height={400} data={this.props.data} scale={cols} forceFit>
          <Legend />
          <Axis name="years" />
          <Axis name="number" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="years*number"
            size={2}
            color={"patient"}
          />
          <Geom
            type="point"
            position="years*number"
            size={4}
            shape={"circle"}
            color={"patient"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }
}
export default Charts;