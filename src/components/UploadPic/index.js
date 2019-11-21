import React from 'react';
import { Button, Upload, Icon, message } from 'antd';
import PictrueEditor from './PictrueEditor';
import * as PropTypes from 'prop-types';
import PicPvw from '@/components/PicPvw';
import Dialog from '@/components/Dialog';
import request from '@/utils/request';
import './index.less';

class UploadPic extends React.Component {
  state = {
    fileList: [],
    uploadLoading: false,
    visible: false,
    image: '',
    canvasToSrc: '',
    picPvwVisible: false,
    picPvwImage: '',
    activeImage: ''
  }
  static propTypes = {
    uploadProps: PropTypes.shape({
      action: PropTypes.string.isRequired,
      accept: PropTypes.string,
    }),
    uploadButton: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    uploadNum: PropTypes.number,
    limitSize: PropTypes.number,
    onUploadSuccess: PropTypes.func,
    onUploadFail: PropTypes.func,
    onCloseClick: PropTypes.func,
    onUploadClick: PropTypes.func,
  }
  //点击上传 发送请求
  onUpLoad = (blobObj) => {
    let {fileList} = this.state;
    const {requestName, uploadProps} = this.props;

    this.props.onUploadClick();
    this.setState({
      uploadLoading: true
    });
    
    const formData = new FormData();
    formData.append(requestName, blobObj.flie);

    request(uploadProps.action, {
      body: formData,
      method: 'POST',
    })
    .then(({status, msg, result}) => {
      if(status) {
        const file = {
          uid: blobObj.uid,
          name: blobObj.name,
          status: 'done',
          url: `http://192.168.31.24:8082/meqm/ftp${result}`,
          result
        };
        fileList =  [...fileList, file];
        const urlList = fileList.map(item => item.result);

        this.props.onUploadSuccess(urlList, file);

        this.setState({
          fileList,
          visible: false,
          uploadLoading: false
        });
      }else {
        this.props.onUploadFail(msg);
        this.setState({
          uploadLoading: false
        });
      };
    })
    .catch(err => {
      this.props.onUploadFail(err);
      console.log('上传失败', err);
    });
  }
  //关闭
  onCloseShade = () => {
    this.props.onCloseClick();
    this.setState({
      visible: false
    });
  }
  //上传按钮渲染 
  uploadButtonRender = () => {
    const {uploadButton} = this.props.uploadProps;
    if(typeof uploadButton === 'string') {
      return (
        <Button>
          <Icon type="upload" />
          {uploadButton}
        </Button>
      );
    };
    if(typeof uploadButton === 'object') {
      return uploadButton;
    };
    return (
      <Button>
        <Icon type="upload" />
        上传
      </Button>
    );
  }
  render() {
    const { 
      fileList, 
      visible, 
      image,  
      picPvwVisible,
      picPvwImage,
      activeImage,
      uploadLoading
    } = this.state;
    let {
      uploadProps,
      clipImgProps,
      uploadNum,
      limitSize
    } = this.props;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        if(limitSize && file.size/1024 > limitSize) {
          message.error(`图片大小不要超过${limitSize}kb`)
          return false;
        };
        this.setState(state => ({
          visible: true,
          image: file
        }));
        return false;
      },
      onPreview: (file) => {
        console.log(file);
        console.log(fileList, 'fileList');
        this.setState({
          picPvwImage: fileList,
          activeImage: file.uid,
          picPvwVisible: true,
        });
      },
      fileList,
      listType: "picture",
      accept: 'image/*'
    };
    uploadProps = {...props, ...uploadProps};
    return (
      <div>
        <Upload {...uploadProps}>
          {
            (uploadNum && fileList.length < uploadNum) &&
            this.uploadButtonRender()
          }
        </Upload>
        <PicPvw
          visible={picPvwVisible}
          image={picPvwImage}
          activeImage={activeImage}
          onClose={()=>this.setState({picPvwVisible: false})}
        />
        <Dialog
          visible={visible}
          className="pictrue-editor"
        >
          <PictrueEditor
            {...clipImgProps}
            uploadLoading={uploadLoading}
            onCloseShade={this.onCloseShade}
            image={image}
            onUpLoad={this.onUpLoad}
          />
        </Dialog>
        
      </div>
    )
  }
}

export default UploadPic;