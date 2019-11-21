/*
 * 多行文本截断
 * @Author: Ye YuChen 
 * @Date: 2019-09-19 11:24:13 
 * @Last Modified by: Ye YuChen
 * @Last Modified time: 2019-09-19 14:52:29
 */
import React from 'react';
import { Tooltip } from 'antd';
import './index.less';
const WordBreak = ({ text, lineClamp=1, children }) => {
  return (
    <Tooltip title={text}>
      <span  
        className='word--break'
        style={{
          WebkitLineClamp: lineClamp,
          WebkitBoxOrient: `vertical`
        }}
      >
        { children }
      </span>
    </Tooltip>
  )  
}

export default WordBreak;