import React from 'react'
import AvatarEditor from 'react-avatar-editor';
import * as PropTypes from 'prop-types';
import {Icon, Slider, Button} from 'antd';

class PictrueEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      rotate: 0,
      scale: 1,
      border: 0,
      color: [0, 0, 0, 0.5], 
    };
  }
  static defaultProps = {
    zoomratio: 0.2, //缩放倍速
    whellControl: false,  //是否滚轮缩放
    clipHeight: 600,
    clipWidth: 600
  }
  static propTypes = {
    clipHeight: PropTypes.number,
    clipWidth: PropTypes.number,
    whellControl: PropTypes.bool,
    zoomratio: PropTypes.number,
    onUpLoad: PropTypes.func.isRequired,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    uploadLoading: PropTypes.bool,
  }
  componentDidMount() {
    if(document) {//获得图片宽高并计算canvas宽高
      const width = this.imgWrap.offsetWidth;
      const {clipHeight, clipWidth} = this.props;
      const wBorder = (width - clipWidth) / 2;
      const height = this.imgWrap.offsetHeight;
      const hBorder = (height - clipHeight) / 2;
      this.setState({
        width: clipWidth, 
        height: clipHeight,
        border: [wBorder, hBorder]
      });
      const canvasWrap = document.querySelector('.canvasWrap');
      if(canvasWrap && this.props.whellControl) {
        const canvas = canvasWrap.querySelector('canvas');
        canvas.addEventListener('mousewheel', this.scrollRotate, false);
      }
    };
  }
  componentWillUnmount() {
    if(document) {
      const canvasWrap = document.querySelector('.canvasWrap');
      if(canvasWrap && this.props.whellControl) {
        const canvas = canvasWrap.querySelector('canvas');
        canvas.removeEventListener('mousewheel', this.scrollRotate, false);
      }
    };
  }
  //左旋转
  leftHandRotation = () => {
    let {rotate, width, height} = this.state;
    rotate -= 90;
    let temporaryWidth = width;
    width = height;
    height = temporaryWidth;
    this.setState({ 
      rotate,
      height,
      width
    });
  }
  //右旋转
  rightHandRotation = () => {
    let {rotate, width, height} = this.state;
    rotate += 90;
    let temporaryWidth = width;
    width = height;
    height = temporaryWidth;
    this.setState({ 
      rotate,
      height,
      width
    });
  }
  //放大
  onZoomIn = () => {
    let {scale} = this.state;
    const { zoomratio } = this.props;
    scale += zoomratio;
    scale = Math.min(scale, 3);
    this.setState({ scale });
  }
  //缩小
  onZoomOut = () => {
    let {scale} = this.state;
    let { zoomratio } = this.props;
    scale -= zoomratio;
    scale = Math.max(scale, 0.5);
    this.setState({ 
      scale 
    });
  }
  //滚轮事件缩放
  scrollRotate = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(e.wheelDelta > 0) {
      this.onZoomIn();
    };
    if(e.wheelDelta < 0) {
      this.onZoomOut();
    };
  }
  changeSlider = (value) => {
    this.setState({
      scale: value/100
    });
  }
  getCanvasToSrc = () => {
    if (this.editor) {
      //得到裁剪区域的canvas
      const canvas = this.editor.getImage();
      //转换blob文件类型
      console.log(this.props.image);
      const {image} = this.props;
      canvas.toBlob((blobObj) => {
        this.props.onUpLoad({
          flie: blobObj,
          name: image.name,
          uid: image.uid
        });
      });
    }
  }
  render () {
    const {
      width,
      height,
      rotate,
      scale,
      border,
      color
    } = this.state;
    const {
      image,
      uploadLoading
    } = this.props;
    return (
      <div className="shade">
        <div className={'canvas-wrap'}>
          <i title="关闭">
            <Icon className="close-icon" onClick={this.props.onCloseShade} type="close" />
          </i>
          <div ref={(node) => this.imgWrap = node} className={'img-wrap'}>
            <AvatarEditor
              ref={(editor) => this.editor = editor}
              color={color}
              image={image}
              onPositionChange={this.onPositionChange}
              border={border}
              width={width}
              height={height}
              scale={scale}
              rotate={rotate}
            />
          </div>
          <div className="canvas-controller">
            <div className="controller-wrap">
              <i title="旋转">
                <Icon onClick={this.rightHandRotation} type="redo" className="rotate-button" />
              </i>
              <div className="sliderWrap">
                <Icon type="picture" style={{fontSize: '16px'}} />
                <Slider 
                  onChange={this.changeSlider} 
                  tipFormatter={null} 
                  style={{width: '80%', margin: '0 16px'}}
                  defaultValue={100} 
                  min={50} 
                  max={300}
                />
                <Icon type="picture" style={{fontSize: '20px'}} />
              </div>
              <Button loading={uploadLoading} onClick={this.getCanvasToSrc} type="primary">上传</Button>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}



export default PictrueEditor;