/*
 * @Author: wwb 
 * @Date: 2019-03-27 11:36:55 
 * @Last Modified by: wwb
 * @Last Modified time: 2019-03-27 11:45:49
 */
/* 
* @file 到货进度
*/
/**
 * 
 * @param { arriveAmount } 已到数量(分子)
 * @param { amount } 实际需求数量(分母)
 */

import React from 'react';
import './style.less';
export const ProgressBar = ({ arriveAmount = 0, amount = 0 }) => (
  <div className={'ysy_progress'}>
    <p className={'ysy_progress_inner'} style={{ width: `${(Number(arriveAmount) / Number(amount)) * 100}%` }}>
      <span className={'ysy_progress_text'}>{`${arriveAmount}/${amount}`}</span>
    </p>
  </div>
)
