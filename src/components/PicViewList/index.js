import React, { Component } from 'react';
import { Row , Icon } from 'antd'
// import Swiper from 'swiper/dist/js/swiper.js'
// import 'swiper/dist/css/swiper.min.css'
import './style.less'
let Swiper = window.Swiper;
class PicViewList extends Component {

  static defaultProps = {
    data:[],
    title:'',
    showTitle:true,
    showToolBar:true,
    rowKey:'url',
    className:'',
    style:{},
  }

  constructor(props) {
    super(props)
    this.galleryThumbs = null ;
    this.swiper = null ;
    this.state ={
      activeIndex:"0",
      defaultRender:false //区分初始化有数据源 以及 后期更新数据源 对swiper组件的初始化

    }
  }
  componentWillMount = () => {
    const { data } = this.props;
    if (data.length) {
      this.setState({ defaultRender: true})
    }
  }
  componentDidMount = () => {
    const { defaultRender } = this.state;
    if (defaultRender) { this.initSwiper() }
  }
  componentDidUpdate = ()=>{
    !this.galleryThumbs ? this.initSwiper() : this.galleryThumbs.update();
  }
  initSwiper = () => {
    const _react = this;
    this.galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      direction : 'vertical',
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    this.swiper = new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
      thumbs: {
        swiper: this.galleryThumbs
      },
      observer:true,
      observeParents:true,
      on:{
        slideChange: function () {
          _react.setState({
            activeIndex:this.activeIndex
          })
        },
      }
    });
    window.addEventListener("keydown", function(event){
      event.stopPropagation();//阻止冒泡事件
      switch (event.keyCode) {
        case 37 ://上一张
          _react.prevEl();
          break; 
        case 38 ://上一张
          _react.prevEl();
          break;
        case 39://下一张
          _react.nextEl();
          break;
        case 40://下一张
          _react.nextEl();
          break;
        default:
          break;
      }
    }, true);
  }

  prevEl = () => {
    this.swiper.slidePrev();
  }
  nextEl = () => {
    this.swiper.slideNext();
  }
  render() {
    const { activeIndex } = this.state;
    const { title , data , rowKey , className , styles , showTitle ,  showToolBar } = this.props;
    const current = data[activeIndex];
    return (
      <div className={`${className}  picViewList-warp`} style={styles}>

        {/* tilteBar */}
        {
          showTitle &&
          <Row className='header-bar'>
            { typeof title ==="function" ? title(current) : title }
          </Row>
        }

        {/* 缩略图片内容 */}
        <div className='gallery-thumbs-wrapper'>

          {/* 缩略图上一张按钮 */}
          {
            data.length <=4 ? null:
            <div className="swiper-prev swiper-button" onClick={this.prevEl}><Icon type="up" /> </div>
          }

          {/* 缩略图列表 */}
          <div className="swiper-container gallery-thumbs">
            {
              data.length ? 
              <React.Fragment>
                <div className="swiper-wrapper">
                  {
                    data.map((item, index)=> 
                      <div key={index} className={`swiper-slide primary-border-color primary-shadow`} >
                        {/* style={{ "background-image":`url(${item[rowKey]})` }}    */}
                        <img src={item[rowKey]} alt=""/>
                      </div>
                    )
                  }
                </div> 
              </React.Fragment>
              : `暂无数据内容`
            }
          </div>

          {/* 缩略图下一张按钮 */}
          {
            data.length <=4 ? null:
            <div className="swiper-next swiper-button" onClick={this.nextEl}><Icon type="down" /></div>
          }
        </div>

        {/* 预览图片内容 */}
        <div  className='gallery-top-wrapper'>
            <div className="swiper-container gallery-top">
              <div className="swiper-wrapper">
                {
                  data.length ? data.map((item,index)=> 
                    <div className="swiper-slide" key={index}>
                    {/* style={{ "background-image":`url(${item[rowKey]})` }} */}
                       <img src={item[rowKey]} alt=""/>
                    </div>
                  )
                  :
                  <div className='swiper-placehodler'>
                    <img src={ require('@/assets/placeholder.jpg')}  alt="暂无数据"/>
                  </div>
                }
              </div> 
              {/* 预览图片 toolbar */}
              {
                showToolBar && data.length ?
                <div className="swiper-wrapper-toolbar">
                <span className="swiper-prev swiper-toolbar-prev"><Icon type="caret-left" /></span>
                <span className="navigation-bar"> { data.length ? Number(activeIndex)+1 : `0`  } / {data.length}  </span>
                <span className="swiper-next swiper-toolbar-next"><Icon type="caret-right" /></span>
              </div>
                :null
              }
            </div>
          </div>
      </div>
    );
  }
}

export default PicViewList;
