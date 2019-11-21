/*
 * @Author: wwb 
 * @Date: 2019-03-27 10:41:47 
 * @Last Modified by: yuwei
 * @Last Modified time: 2019-05-09 15:16:06
 */
/* 
@File 步骤条式进度条
*/
import React, { PureComponent } from 'react';
import { Steps } from 'antd';
import * as PropTypes from 'prop-types';
import './style.less';
const Step = Steps.Step;
const WAIT = 'wait';
const FINISH = 'finish';
const PROCESS = 'process';
class StepProgress extends PureComponent{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    current: PropTypes.number,
    currStep:PropTypes.number,
    progressDot: PropTypes.bool,
    size: PropTypes.oneOf(['small','default']),
  }

  static defaultProps = {
    className: '',
    options: [],
    progressDot: false,
    current: null,
    currStep: null,
    size: 'small',
    labelPlacement: 'vertical'
  }
  showStatus = (index,value) => {
    const { current,currStep } = this.props;
    let str = '';
    let currStatus = current || currStep;
    if(index === 0){
      str = (!currStatus || currStatus === value[0]) ? WAIT : currStatus >= value[1] ? FINISH: PROCESS;
    }else{
      str = currStatus === value[0] ? PROCESS: currStatus >= value[1] ? FINISH: WAIT;
    }
    return str;
  }

  render(){
    const { options, current,currStep,  ...restProps } = this.props;
    return (
      <Steps 
        current={ current || currStep }
        {...restProps}
      >
        {
          options.map((item,index) => <Step key={index} title={item.title} status={this.showStatus(index,item.value)} />)
        }
      </Steps>
    )
  }
}
export default StepProgress;
