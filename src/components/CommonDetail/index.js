/*
 * @Author: wwb 
 * @Date: 2018-12-18 09:37:36 
 * @Last Modified by: yuwei
 * @Last Modified time: 2019-07-03 15:46:39
 */

import React from 'react';
import classNames from 'classnames';
import './index.less';
/**
 * 
 * @param { title } 标题
 * @param { extra } 标题额外内容,这里判断 extra 类型暂未实现,支持 string 或 jsx, 勿传 object
 * @param { onClick } 额外内容点击事件
 * @param { headerClassName } 头部title class
 * @param { children }  需要渲染的子元素
 * @param { childClassName } 子元素 class
 *   
 */
export const Section = (props) => {
  const { 
    title,
    extra, 
    onClick, 
    headerClassName, 
    children, 
    childClassName, 
    className,
    extraStyle,
    style,
    id
  } = props;
  return (
    <div id={id} className={classNames('section',className)} style={style}>
      <div className= { classNames('section-title', headerClassName ? headerClassName: '') } >
        <b className='section-main-title primary-border-color'>
          { 
            title ? title: '' 
          }
        </b> 
        {
          extra && typeof extra === 'string' ?
          (<span className='section-title-extra'>
            <label onClick={ onClick } style={{ color: '#1885FC',fontSize:14 }}>{extra}</label>
          </span> )
          :
          extra && typeof extra !== 'string' ?
          <div style={extraStyle}>
            {extra}
          </div>
          :
          null
        }
      </div>
      <div className={ classNames('section-content', childClassName ? childClassName: '') }>
        { children ? children: '' }
      </div>
    </div>
  )
}