/*
 * @Author: chengyafang 
 * @Date: 2019-11-11 15:44:57 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-15 16:39:35
 * 反应各医院在每个月的错误率有无下降的趋势
 */
import React from 'react';
import { Row, Select } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";

const { Option } = Select;

function getYears() {
  let years = new Date().getFullYear();
  let ret = [];
  for (let i = 0; i < 10; i++) {
    ret.push(years - i);
  }
  return ret;
}
const yearsList = getYears();

class HospitalControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        countDate: new Date().getFullYear()
      }
    }
  }
  render() {
    const data = [
      {
        months: '201901',
        hospital: '武汉市汉口医院',
        errorRate: 20
      },
      {
        months: '201901',
        hospital: '武汉中心医院',
        errorRate: 15
      },
      {
        months: '201901',
        hospital: '武汉市儿童医院',
        errorRate: 30
      },
      {
        months: '201901',
        hospital: '武汉市同济医院',
        errorRate: 9
      },
      {
        months: '201901',
        hospital: '武汉市协和医院',
        errorRate: 9
      },
      {
        months: '201901',
        hospital: '武汉大学中南医院',
        errorRate: 10
      },
      {
        months: '201902',
        hospital: '武汉市汉口医院',
        errorRate: 23
      },
      {
        months: '201902',
        hospital: '武汉中心医院',
        errorRate: 12
      },
      {
        months: '201902',
        hospital: '武汉市儿童医院',
        errorRate: 25
      },
      {
        months: '201902',
        hospital: '武汉市同济医院',
        errorRate: 14
      },
      {
        months: '201902',
        hospital: '武汉市协和医院',
        errorRate: 11
      },
      {
        months: '201902',
        hospital: '武汉大学中南医院',
        errorRate: 13
      },
      {
        months: '201903',
        hospital: '武汉市汉口医院',
        errorRate: 19
      },
      {
        months: '201903',
        hospital: '武汉中心医院',
        errorRate: 14
      },
      {
        months: '201903',
        hospital: '武汉市儿童医院',
        errorRate: 29
      },
      {
        months: '201903',
        hospital: '武汉市同济医院',
        errorRate: 8
      },
      {
        months: '201903',
        hospital: '武汉市协和医院',
        errorRate: 8
      },
      {
        months: '201903',
        hospital: '武汉大学中南医院',
        errorRate: 9
      },
      {
        months: '201904',
        hospital: '武汉市汉口医院',
        errorRate: 24
      },
      {
        months: '201904',
        hospital: '武汉中心医院',
        errorRate: 13
      },
      {
        months: '201904',
        hospital: '武汉市儿童医院',
        errorRate: 32
      },
      {
        months: '201904',
        hospital: '武汉市同济医院',
        errorRate: 14
      },
      {
        months: '201904',
        hospital: '武汉市协和医院',
        errorRate: 3
      },
      {
        months: '201904',
        hospital: '武汉大学中南医院',
        errorRate: 16
      },
      {
        months: '201905',
        hospital: '武汉市汉口医院',
        errorRate: 19
      },
      {
        months: '201905',
        hospital: '武汉中心医院',
        errorRate: 9
      },
      {
        months: '201905',
        hospital: '武汉市儿童医院',
        errorRate: 25
      },
      {
        months: '201905',
        hospital: '武汉市同济医院',
        errorRate: 8
      },
      {
        months: '201905',
        hospital: '武汉市协和医院',
        errorRate: 8
      },
      {
        months: '201905',
        hospital: '武汉大学中南医院',
        errorRate: 20
      },
      {
        months: '201907',
        hospital: '武汉市汉口医院',
        errorRate: 23
      },
      {
        months: '201907',
        hospital: '武汉中心医院',
        errorRate: 12
      },
      {
        months: '201907',
        hospital: '武汉市儿童医院',
        errorRate: 21
      },
      {
        months: '201907',
        hospital: '武汉市同济医院',
        errorRate: 14
      },
      {
        months: '201907',
        hospital: '武汉市协和医院',
        errorRate: 12
      },
      {
        months: '201907',
        hospital: '武汉大学中南医院',
        errorRate: 24
      },
      {
        months: '201909',
        hospital: '武汉市汉口医院',
        errorRate: 21
      },
      {
        months: '201909',
        hospital: '武汉中心医院',
        errorRate: 15
      },
      {
        months: '201909',
        hospital: '武汉市儿童医院',
        errorRate: 23
      },
      {
        months: '201909',
        hospital: '武汉市同济医院',
        errorRate: 12
      },
      {
        months: '201909',
        hospital: '武汉市协和医院',
        errorRate: 13
      },
      {
        months: '201909',
        hospital: '武汉大学中南医院',
        errorRate: 21
      },
      {
        months: '201911',
        hospital: '武汉市汉口医院',
        errorRate: 10
      },
      {
        months: '201911',
        hospital: '武汉中心医院',
        errorRate: 13
      },
      {
        months: '201911',
        hospital: '武汉市儿童医院',
        errorRate: 14
      },
      {
        months: '201911',
        hospital: '武汉市同济医院',
        errorRate: 5
      },
      {
        months: '201911',
        hospital: '武汉市协和医院',
        errorRate: 4
      },
      {
        months: '201911',
        hospital: '武汉大学中南医院',
        errorRate: 16
      },
      {
        months: '201912',
        hospital: '武汉市汉口医院',
        errorRate: 9
      },
      {
        months: '201912',
        hospital: '武汉中心医院',
        errorRate: 12
      },
      {
        months: '201912',
        hospital: '武汉市儿童医院',
        errorRate: 13
      },
      {
        months: '201912',
        hospital: '武汉市同济医院',
        errorRate: 6
      },
      {
        months: '201912',
        hospital: '武汉市协和医院',
        errorRate: 5
      },
      {
        months: '201912',
        hospital: '武汉大学中南医院',
        errorRate: 15
      }
    ];
    const cols = {
      months: {
        range: [0, 1]
      },
      errorRate: {
        alias: "错误率(%)",
        formatter: val => {
          return val + "%";
        }
      }
    };
    return (
      <div style={{ position: 'relative' }}>
        <Row style={{ padding: '24px 0 0 30px' }}>
          <h4>医院错误率趋势图</h4>
          <Select style={{ width: 200 }} value={this.state.query.countDate}>
            {
              yearsList.map((item, index) => {
                return <Option value={item} key={index}>{item}</Option>
              })
            }
          </Select>
        </Row>
        <Chart height={350} data={data} scale={cols} forceFit>
          <Legend />
          <Axis name="months" />
          <Axis name="errorRate" title />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="months*errorRate"
            size={2}
            color={"hospital"}
          />
          <Geom
            type="point"
            position="months*errorRate"
            size={4}
            shape={"circle"}
            color={"hospital"}
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
export default HospitalControl;