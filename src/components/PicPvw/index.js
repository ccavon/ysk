import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import * as PropTypes from 'prop-types';
import {Icon, Tooltip, Slider, Button} from 'antd';
import Dialog from '@/components/Dialog';
import './index.less';
class PicPvwChildren extends React.Component {
  constructor(props) {
    super(props);
    this.initImgInfo = {};//图片的初始属性
    this.state = {  
      width: 0, //宽
      height: 0,  //高
      rotate: 0,  //旋转度数
      scale: 0, //缩放倍数
      border: 0,  //边框大小
      image: '',  
      minValue: null,
      maxValue: null, 
      sliderValue: null,
      isCarousel: false,  //轮播图模式
      activeNum: null,  //当前显示图片的索引值
      position: {
        x: 0.5,
        y: 0.5,
      }
    };
  }
  componentDidMount() {
    if (document) {
      document.body.style.overflow = 'hidden';//隐藏滚动条
      const height = document.documentElement.clientHeight - 40;
      const width = document.documentElement.clientWidth;
      const { image, activeImage, keyboard, whellControl } = this.props;
      if (Array.isArray(image)) {
        let activeNum;
        image.forEach((item, i) => {
          if (item.uid === activeImage) {
            activeNum = i;
          };
        });
        // if (!activeNum && activeNum !== 0) {
        //   console.error('activeImage参数有误');
        // };
        this.setState({
          isCarousel: true,
          activeNum: activeNum ? activeNum : 0
        });
      };
      this.setState({
        image,
        height,
        width
      });
      const canvasWrap = document.querySelector('.img-wrap');
      if (canvasWrap && whellControl) {
        const canvas = canvasWrap.querySelector('canvas');
        canvas.addEventListener('mousewheel', this.scrollRotate, false);
      };
      if (keyboard) {
        document.addEventListener('keydown', this.onKeyDown, false);
      };
    };
  }
  componentWillUnmount() {
    if (document) {
      document.body.style.overflow = '';
      const canvasWrap = document.querySelector('.canvasWrap');
      if (canvasWrap && this.props.whellControl) {
        const canvas = canvasWrap.querySelector('canvas');
        canvas.removeEventListener('mousewheel', this.scrollRotate, false);
      }
    };
    if (this.props.keyboard) {
      document.removeEventListener('keydown', this.onKeyDown, false);
    };
  }

  onKeyDown = (e) => {
    if (e.key === 'Escape' && this.props.onClose && typeof this.props.onClose === 'function') {
      this.props.onClose();
    };
  }
  //旋转
  handRotation = (toggle) => {
    let {rotate, minValue} = this.state;
    rotate += 90 * toggle;
    this.setState({ 
      rotate,
      position: {
        x: 0.5,
        y: 0.5
      },
      width: this.state.height,
      height: this.state.width,
      sliderValue: minValue,
      scale: minValue / 1000
    });
  }
  //放大
  onZoomIn = () => {
    let {scale} = this.state;
    const maxScale = this.initImgInfo.scale * 3;
    const { zoomratio } = this.props;
    scale += zoomratio;
    scale = Math.min(scale, maxScale);
    this.setState({ 
      scale,
      sliderValue: scale * 1000
    });
  }
  //缩小
  onZoomOut = () => {
    let {scale} = this.state;
    let { zoomratio } = this.props;
    const minScale = this.initImgInfo.scale;
    scale -= zoomratio;
    scale = Math.max(scale, minScale);
    this.setState({ 
      scale,
      sliderValue: scale * 1000
    });
  }
  //还原
  onReset = () => {
    const { initImgInfo } = this;
    this.setState({...initImgInfo});
  }
  //滚轮事件缩放
  scrollRotate = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.wheelDelta > 0) {
      this.onZoomIn();
    };
    if (e.wheelDelta < 0) {
      this.onZoomOut();
    };
  }
  //滑动输入条
  changeSlider = (value) => {
    this.setState({
      scale: value / 1000,
      sliderValue: value,
      position: {
        x: 0.5,
        y: 0.5
      }
    });
  }
  //加载图片成功时触发
  onLoadSuccess = (imgInfo, e) => {
    const {width, height, rotate} = this.state;
    const isRotate = rotate % 180 === 0;
    
    let scale = ((isRotate ? height : width) - 100) / imgInfo.height;
    if (imgInfo.height < imgInfo.width) {
      scale = scale * (imgInfo.height / imgInfo.width);
    }
    let initImgWidth = imgInfo.width * scale,
        initImgHeight = imgInfo.height * scale,
        scaleX = width / initImgWidth,
        scaleY = height / initImgHeight,
        maxScale = scaleX;
    if (initImgWidth * scaleY >= width) {
      maxScale = scaleX * scale;
    }
    if (initImgHeight * scaleX >= height) {
      maxScale = scaleY * scale;
    }
    this.setState({
      imgInfo,
      scale,
      minValue: scale * 1000,
      maxValue: maxScale * 1000,
      sliderValue: scale * 1000,
    });
    
    this.initImgInfo = {
      scale,
      minValue: scale * 1000,
      maxValue: maxScale * 1000,
      sliderValue: scale * 1000,
      rotate: 0,
      width,
      height,
      position: {
        x: 0.5,
        y: 0.5
      }
    };
  }
  //左切换
  onLeftSwitch = () => {
    let {activeNum, image} = this.state;
    if (image.length === 1) return;
    activeNum -= 1;
    activeNum = activeNum < 0 ? image.length - 1 : activeNum;
    this.setState({
      activeNum,
      rotate: 0
    });
  }
  //右切换
  onRightSwitch = () => {
    let {activeNum, image} = this.state;
    if (image.length === 1) return;
    activeNum += 1;
    activeNum = activeNum === image.length ? 0 : activeNum;
    this.setState({
      activeNum,
      rotate: 0
    });
  }
  //移动图片时触发
  onPositionChange = ({x, y}) => {
    let { imgInfo, scale, width, height, rotate } = this.state;
    imgInfo = {...imgInfo};
    const isRotate = rotate % 180 === 0;
    if (!isRotate) {
      [imgInfo.width, imgInfo.height, width, height] = [imgInfo.height, imgInfo.width, height, width];
    }
    const imgWidth = imgInfo.width * scale;
    const imgHeight = imgInfo.height * scale;
    let maxX = (width / 2) / imgWidth;
    let minX = (width / 2 - imgWidth) / imgWidth * -1;
    let maxY = (height / 2) / imgHeight;
    let minY = (height / 2 - imgHeight) / imgHeight * -1;
    if (!isRotate) {
      [maxX, maxY, minX, minY] = [maxY, maxX, minY, minX];
    }
    x = x > maxX ? maxX : x;
    x = x < minX ? minX : x;
    y = y > maxY ? maxY : y;
    y = y < minY ? minY : y;
    this.setState({
      position: {
        x, y
      }
    });
  }
  render () {
    const {
      width,
      height,
      rotate,
      scale,
      border,
      minValue,
      maxValue,
      sliderValue,
      isCarousel,
      activeNum,
      image,
      position,
    } = this.state;
    const activeImage = isCarousel ? image[activeNum].url : image;
    return (
      <div className='shade' onKeyDown={this.onKeyDown}> 
        <div className={'canvas-wrap'}>
          {
            isCarousel && 
            [
              <Icon key="leftSwitch" onClick={this.onLeftSwitch} className="switch left-switch" type="arrow-left" />,
              <Icon key="rightSwitch" onClick={this.onRightSwitch} className="switch right-switch" type="arrow-right" />
            ]
          }
          <div className="img-info">
            <span className="img-info-text">
              <span style={{fontFamily: 'cursive'}}>
                {
                  isCarousel && image[activeNum].name 
                  ? image[activeNum].name 
                  : '未命名'
                }
              </span>
              <span>{isCarousel ? `${activeNum + 1} / ${image.length}` : ''}</span>
            </span>
            <Tooltip title="关闭" placement="bottomLeft">
              <Icon onClick={this.props.onClose} className="close-icon" type="close" />
            </Tooltip>
          </div>
          <div ref={(node) => this.imgWrap = node} className={'img-wrap'}>
            <AvatarEditor
              ref={(editor) => this.editor = editor}
              image={activeImage}
              onLoadSuccess={this.onLoadSuccess}
              onPositionChange={this.onPositionChange}
              border={border}
              width={width}
              height={height}
              scale={scale}
              rotate={rotate}
              position={position}
            />
          </div>
          <div className="canvas-controller">
            <div className="controller-wrap">
              <Tooltip placement="top" title="旋转">
                <Icon onClick={this.handRotation.bind(this, 1)} type="redo" className="rotate-button" />
              </Tooltip>
              <div className="slider-wrap">
                <Icon type="picture" style={{fontSize: '16px'}} />
                <Slider 
                  onChange={this.changeSlider} 
                  tipFormatter={null} 
                  value={sliderValue}
                  style={{width: '80%', margin: '0 16px'}}
                  min={!minValue ? undefined : minValue} 
                  max={!maxValue ? undefined : maxValue}
                />
                <Icon type="picture" style={{fontSize: '20px'}} />
              </div>
              <Button onClick={this.onReset} type="primary">还原</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



class PicPvw extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    zoomratio: PropTypes.number,
    whellControl: PropTypes.bool,
    image: PropTypes.any.isRequired,
    activeImage: PropTypes.any,
    onClose: PropTypes.func.isRequired,
    keyboard: PropTypes.bool
  }
  static defaultProps = {
    image: [], 
    zoomratio: 0.1, //缩放倍速
    whellControl: false,  //是否滚轮缩放
    visible: false,
    activeImage: 0,    //显示当前图片的uid
    keyboard: true, //是否支持键盘ESC关闭
  }
  render() {
    const {visible, ..._props} = this.props;
    return (
      <Dialog 
        visible={visible}
        className='preview-picture'
      >
        <PicPvwChildren {..._props}/>
      </Dialog>
    )
  }
}


export default PicPvw;