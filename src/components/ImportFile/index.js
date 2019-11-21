import React, { Component } from 'react';
import { Row , Icon, Upload, Button, Modal, message, Progress } from 'antd'
const Dragger = Upload.Dragger;
let Timer = null;
class ImportFile extends Component {

  static defaultProps = {
    showImport:true,
    className:null,
    styles:null,
    rules:{
      type:[".png",".jpg",".doc",'.xls',".docx",'.xlsx'],
      length:20,
      size:5,
    },
    name: 'file',
    multiple: false,
    showUploadList:false,
  }

  constructor(props) {
    super(props)
    this.state ={
      loading:false,
      percent:0,
    }
  }

  //上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
  beforeUpload = (file, fileList) => {
    const { rules: { type, length, size }} = this.props;
    //验证文件个数
    const limitLength = fileList.length <= ( length || 1);
    if (!limitLength) { 
      message.error('文件或图片个数超出限制！');
      return false
    }
    //验证上传文件类型
    let fileType = file.name.split(".")[1]; 
    const validType = type.includes(`.${fileType.toLowerCase()}`);
    if (!validType) {
      message.error(`仅支持${type.join('、')}文件类型`);
      return false
    }
    //验证上传文件大小
    const isLt2M = file.size / 1024 / 1024 < (size || 5);
    if (!isLt2M) {
      message.error(`文件或大小不能超过${size|| 5}M`);
      return false
    }
    if (validType && isLt2M && limitLength) {
      this.setState({ loading:true, percent:0})
      Timer = setInterval(()=>{
        let { percent } = this.state;
        let RandomPercent = percent + parseInt((Math.random()*10));
        this.setState({percent:RandomPercent<100?RandomPercent:99.9})
      },500)
    }
    return validType && isLt2M && limitLength ;
  }

  onChange = info => {
    const { file: {status, percent, response } } = info; 
    if (status === 'done') {
      setTimeout(()=>{
        if ( percent === 100 && Timer){
          clearInterval(Timer)
          this.setState({ percent:100},()=>{
            this.setState({loading:false})
            this.props.getResult(response);
          })
        }
      },2000)
    } else if (status === 'error') {
      setTimeout(()=>{
        this.props.getResult(response);
      },3000)
    }
  }
 
  render() {
    const jsessionId = localStorage.getItem('JSESSIONID');
    const { className , styles, showImport, rules: { type, legnth },
    ...props } = this.props;
    const { loading, percent } = this.state;
    const commonProps = {
      withCredentials:true,
      headers: {
        JSESSIONID: jsessionId,
      },
      beforeUpload:this.beforeUpload,
      onChange:this.onChange,
      ...props,
    }; 
    return (
      <div className={`${className}`} style={styles}>
          {
            showImport?
            <Row className="mb-16">
              <Upload  {...commonProps}>
                <Button type='primary'>导入</Button>
              </Upload>
            </Row>
            :null
          }
          <Dragger {...commonProps}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或拖拽上传文件</p>
            <p className="ant-upload-hint">
              仅支持单个上传,支持{type.join('、')}格式，最多可上传{legnth}个文件或图片。
            </p>
          </Dragger>
          
          <Modal
            closable={false}
            footer={null}
            visible={loading}>
            <p>上传中</p>
            <Progress
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={percent}
            />
            {/* <Button className="pull-right mt-16" onClick={()=>this.setState({loading:false})}>取消导入</Button> */}
          </Modal>
      </div>
    );
  }
}

export default ImportFile;
