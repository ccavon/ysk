/**
 * @Author: chengyafang 
 * @Date: 2019-10-15 15:17:55 
 * @Last Modified by: chengyafang
 * @Last Modified time: 2019-11-14 16:27:22
 * @file 数据审核 - 日常错误量统计
 */
import React from 'react';
import Authority from '@/components/Authority';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, DatePicker, Select, Button, Icon, Table, Modal } from 'antd';
import { attributesSelect } from '@/constant';
import moment from 'moment';
import uuid from 'uuid';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from "bizcharts";
import DataSet from "@antv/data-set";
import AdvancedSearch from '@/components/AdvancedSearch';

const { RangePicker } = DatePicker;
const { Option } = Select;

class DailyErrorStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePie: false,
      visibleBar: false,
      loading: false
    }
  }
  // 搜索
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }
  // 导出列表
  exportList = () => {
    this.setState({ loading: true });
    Modal.confirm({
      content: "确认导出列表？",
      onOk: () => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      }
    });
  }
  // 导出明细
  exportDetails = () => {
    this.setState({ loading: true });
    Modal.confirm({
      content: "确认导出明细？",
      onOk: () => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      }
    });
  }
  render() {
    const { visiblePie, visibleBar, loading } = this.state;
    const columns = [
      {
        title: '分组',
        children: [
          {
            title: '分组对象',
            dataIndex: 'name1',
            width: '25%'
          }
        ]
      },
      { title: '总数量', dataIndex: 'totalNum', width: '25%' },
      { title: '错误数量', dataIndex: 'errorNum', width: '25%' },
      { title: '错误率(%)', dataIndex: 'errorRate', width: '25%' }
    ];
    const dataSource = [
      { 'id': uuid(), 'name1': '04.08整形外科专业', 'totalNum': '37', 'errorNum': '37', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '27疼痛科', 'totalNum': '124', 'errorNum': '124', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '13.01皮肤病专业', 'totalNum': '142', 'errorNum': '142', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '02全科医疗科', 'totalNum': '167', 'errorNum': '167', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '04.09其他', 'totalNum': '194', 'errorNum': '194', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '03.08免疫学专业', 'totalNum': '276', 'errorNum': '276', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '21康复医学科', 'totalNum': '311', 'errorNum': '311', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '04.05胸外科专业', 'totalNum': '370', 'errorNum': '370', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '04.04泌尿外科专业', 'totalNum': '774', 'errorNum': '774', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '04.02神经外科专业', 'totalNum': '844', 'errorNum': '844', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '07.01新生儿专业', 'totalNum': '868', 'errorNum': '868', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '08小儿外科', 'totalNum': '919', 'errorNum': '919', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '10眼科', 'totalNum': '1096', 'errorNum': '1096', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '11耳鼻咽喉科', 'totalNum': '1144', 'errorNum': '1144', 'errorRate': '100' },
      { 'id': uuid(), 'name1': '05.01妇科专业', 'totalNum': '2211', 'errorNum': '2211', 'errorRate': '100' }
    ];
    const { DataView } = DataSet;
    const dataPie = [
      { item: "03 内科", count: 100 },
      { item: "04 外科", count: 100 },
      { item: "05 妇产科", count: 22 },
      { item: "07 儿科", count: 89 },
      { item: "08 小儿外科", count: 100 },
      { item: "10 眼科", count: 100 },
      { item: "11 耳鼻咽喉科", count: 81 },
      { item: "12 口腔科", count: 100 },
      { item: "13 皮肤科", count: 100 },
      { item: "16 传染科", count: 95 },
      { item: "17 结核科", count: 100 },
      { item: "19 肿瘤科", count: 92 },
      { item: "20 急诊医学科", count: 100 },
      { item: "21 康复医学科", count: 100 },
      { item: "22 运动医学科", count: 100 },
      { item: "27 疼痛科", count: 100 },
      { item: "28 重症医学科", count: 89 },
      { item: "50 中医科", count: 48 },
      { item: "52 中西医结合科", count: 100 }
    ];
    const dvPie = new DataView();
    dvPie.source(dataPie).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const colsPie = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    const dataBar = [
      { genre: "03 内科", sold: 100 },
      { genre: "04 外科", sold: 100 },
      { genre: "05 妇产科", sold: 22 },
      { genre: "07 儿科", sold: 89 },
      { genre: "08 小儿外科", sold: 100 },
      { genre: "10 眼科", sold: 100 },
      { genre: "11 耳鼻咽喉科", sold: 81 },
      { genre: "12 口腔科", sold: 100 },
      { genre: "13 皮肤科", sold: 100 },
      { genre: "16 传染科", sold: 95 },
      { genre: "17 结核科", sold: 100 },
      { genre: "19 肿瘤科", sold: 92 },
      { genre: "20 急诊医学科", sold: 100 },
      { genre: "21 康复医学科", sold: 100 },
      { genre: "22 运动医学科", sold: 100 },
      { genre: "27 疼痛科", sold: 100 },
      { genre: "28 重症医学科", sold: 89 },
      { genre: "50 中医科", sold: 48 },
      { genre: "52 中西医结合科", sold: 100 }
    ];
    const colsBar = {
      sold: { alias: '错误数量(%)' },
      genre: { alias: '分组对象' }
    };
    const getTitle = {
      textStyle: {
        fontSize: '14',
        textAlign: 'center',
        fill: 'black',
        fontWeight: 'bold',
        textBaseline: 'top'
      }
    }
    return (
      <Authority>
        <PageHeaderWrapper title={'日常错误量统计'}>
          <Row>
            <Button type={'primary'} onClick={() => this.setState({ visiblePie: true })}><Icon type="pie-chart" />饼形图</Button>
            <Button type={'primary'} style={{ margin: '0 8px' }} onClick={() => this.setState({ visibleBar: true })}><Icon type="bar-chart" />柱状图</Button>
            <Button onClick={this.exportList}><Icon type="export" />导出列表</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.exportDetails}><Icon type="export" />导出明细</Button>
          </Row>
          <AdvancedSearch
            visible={true}
            defaultFormOption={[
              {
                label: '出院日期',
                key: 'name1',
                options: { initialValue: [moment().subtract(1, 'months'), moment(new Date())] },
                render: () => (
                  <RangePicker />
                )
              },
              {
                label: '属性',
                key: 'name2',
                options: { initialValue: attributesSelect[0].value },
                render: () => (
                  <Select
                    showSearch
                    filterOption={(inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
                  >
                    {
                      attributesSelect.map((item, index) => {
                        return <Option value={item.value} key={index}>{item.text}</Option>
                      })
                    }
                  </Select>
                )
              }
            ]}
            onSearch={query => console.log(query)}
            onReset={data => console.log(data)}
          />
          <Table
            loading={loading}
            bordered
            size={'small'}
            style={{ marginTop: 16 }}
            columns={columns}
            pagination={false}
            rowKey={'id'}
            dataSource={dataSource}
            className={'table-header-bg'}
          />
          {/* 饼图 */}
          <Modal
            title={'图表展示'}
            visible={visiblePie}
            centered={true}
            maskClosable={false}
            width={1000}
            footer={null}
            onCancel={() => this.setState({ visiblePie: false })}
          >
            <Chart height={450} data={dvPie} scale={colsPie} forceFit padding={[20, 30, 20, 20]}>
              <Coord type="theta" radius={0.75} />
              <Axis name="count" />
              <Legend position="right" offsetY={0} offsetX={-150} />
              <Tooltip
                showTitle={false}
                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
              />
              <Geom
                type="intervalStack"
                position="count"
                color="item"
                tooltip={["item*count", (item, count) => {
                  return {
                    name: item,
                    value: `${count}%`
                  };
                }]}
                style={{
                  lineWidth: 1,
                  stroke: "#fff"
                }}

              >
                <Label
                  content="percent"
                  formatter={(value, item) => {
                    return `${item.point.item}${item.point.count}%`;
                  }}
                />
              </Geom>
            </Chart>
          </Modal>
          {/* 柱形图 */}
          <Modal
            visible={visibleBar}
            title={'图表展示'}
            maskClosable={false}
            centered={true}
            width={1200}
            footer={null}
            onCancel={() => this.setState({ visibleBar: false })}
          >
            <Chart height={450} data={dataBar} scale={colsBar} forceFit padding={'auto'} >
              <Axis name="genre" title={getTitle} />
              <Axis name="sold" title={getTitle} />
              {/* <Legend position="top" title={null} /> */}
              <Tooltip crosshairs={{ type: "y" }} />
              <Geom
                type="interval"
                position="genre*sold"
                color="genre"
                tooltip={["genre*sold", (genre, sold) => {
                  return {
                    name: genre,
                    value: `${sold}%`
                  };
                }]}
              />
            </Chart>
          </Modal>
        </PageHeaderWrapper>
      </Authority>
    )
  }
}
export default DailyErrorStatistics;
