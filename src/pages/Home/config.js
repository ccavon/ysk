import React from 'react';
import RuleClassify from './Charts/ruleClassify'; // 规则分类描述错误比率
import AttributeInfoClassify from './Charts/attributeInfoClassify'; // 属性信息分类错误比率
import MedicarePayment from './Charts/medicarePayment'; // 医保支付方式
import FundPayment from './Charts/fundPayment'; // 基金支付类型
import HospitalControl from './Charts/hospitalControl'; // 医院错误率趋势图
import DataReview from './Charts/dataReview'; // 数据审核主要指标
// import FundPersonalPay from './Charts/fundPersonalPay'; // 各医院基金和个人支付比率

// 数据初始化
export const BaseConfig = [
  { "w": 4, "h": 4, "x": 0, "y": 0, "i": "0", "minW": 3, "maxW": 5, "minH": 3, "maxH": 5, "moved": false, "static": true, "defaultShow": true, "type": "RuleClassify" },
  { "w": 8, "h": 4, "x": 0, "y": 4, "i": "7", "minW": 8, "maxW": 12, "maxH": 8, "moved": false, "static": true, "type": "dataReview" },
  { "w": 8, "h": 4, "x": 4, "y": 0, "i": "8", "minW": 8, "maxW": 12, "maxH": 8, "moved": false, "static": true, "type": "hospitalControl" },
  { "w": 4, "h": 4, "x": 8, "y": 4, "i": "99", "maxW": 5, "maxH": 5, "moved": false, "static": true, "type": "attributeInfoClassify" }
];

// 弹框可供选择的数据
export const CheckboxTag = [
  { text: '规则分类描述错误比率', value: 'RuleClassify' },
  { text: '属性信息分类错误比率', value: 'attributeInfoClassify' },
  { text: '医保支付方式', value: 'medicarePayment' },
  { text: '基金支付类型', value: 'fundPayment' },
  { text: '医院错误率趋势图', value: 'hospitalControl' },
  { text: '数据审核主要指标', value: 'dataReview' },
  // { text: '各医院基金和个人支付比率', value: 'fundPersonalPay' }
];

// 但对应的布局配置：<Chart />
export const LayoutConfig = {
  "RuleClassify": {
    components: <RuleClassify />,
    w: 3,
    h: 3,
    maxW: 5,
    maxH: 5
  },
  "attributeInfoClassify": {
    components: <AttributeInfoClassify />,
    w: 3,
    h: 3,
    maxW: 5,
    maxH: 5
  },
  "medicarePayment": {
    components: <MedicarePayment />,
    w: 3,
    h: 3,
    maxW: 5,
    maxH: 5
  },
  "fundPayment": {
    components: <FundPayment />,
    w: 3,
    h: 3,
    maxW: 5,
    maxH: 5
  },
  "hospitalControl": {
    components: <HospitalControl />,
    w: 8,
    h: 4,
    minW: 8,
    maxW: 12,
    maxH: 8
  },
  "dataReview": {
    components: <DataReview />,
    w: 8,
    h: 4,
    minW: 8,
    maxW: 12,
    maxH: 8
  },
  // "fundPersonalPay": {
  //   components: <FundPersonalPay />,
  //   w: 8,
  //   h: 4,
  //   minW: 8,
  //   maxW: 12,
  //   maxH: 8
  // }
};




