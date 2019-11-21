// // 上传附件  公用函数 （仅适配设备FTP）
// import { ftpLinkUrl } from '@/api/_local';
// import { message } from 'antd';

// /**
//  * 
//  * @param {Array} arr 附件数组。包含新增数据以及回显数据
//  * @description 格式化提交数据
//  */
// export const formatSubmitUpload = (arr) => {
//   if (arr && arr.length) {
//     return arr.map((item)=>{
//       if (item.status === "done" ) {
//         let str  = item.url.replace(ftpLinkUrl,"");
//         return str
//       }
//       return ""
//     }).join(";")
//   }else {
//     return ""
//   }
// }

// /**
//  * 
//  * @param {string} urlString 
//  * @description 初始化图片回显
//  */
// export const formatInit = ( urlString ) => {
//   if (urlString) {
//     let arr = urlString.split(";");
//     arr.splice(arr.length-1,1);
//     return arr.map((item,index)=> {
//       return  {
//         uid: index+1,
//         name: `${index}.png`,
//         status: 'done',
//         url:`${ftpLinkUrl}${item}`,
//       }
//     })
//   }
//   return []
// }

// /**
//  * 
//  * @param {Object} file 
//  * @param {Array} fileList 
//  * @param {Object} config 
//  */
// export const beforeUploadFilter = (file, fileList, config) => {
//   //过滤文件大小
//   const isLt2M = file.size   < config.size * 1024 * 1024;
//   let type = false;
//   if (!isLt2M) {
//     message.error(`上传文件不能大于${config.size}MB!`);
//     return false
//   }
//   //过滤文件类型
//   for(let i =0;i<config.type.length;i++){
//     let strArr = file.name.split('.');
//     if(config.type[i] === `.${strArr[strArr.length-1]}` || config.type[i] === `.${strArr[strArr.length-1]}`.toLocaleLowerCase()){
//       type=true
//       return  
//     }else{
//       type=false
//     }
//   }
//   if (!type) {
//     message.error('您只能上传该附件支持的文件类型');
//   }
//   return type && isLt2M;
// }

// /**
//  * 
//  * @param {Object} fileListObj 
//  * @param {string} key 
//  * @description upload change事件
//  */
// export const handleChange = (fileListObj,key) => {
//   let { file, fileList } = fileListObj;  
//   if(file.status === 'done') {
//     file.response && !file.response.status && message.error('上传失败，请重新上传');
//     fileList.filter((file) => file.response && file.response.status === 200 );
//     fileList.map((file) => {   //修改预览地址
//       if (file.response) {
//         // file.url = file.response && file.response.result;
//         file.url = `${ftpLinkUrl}${file.response && file.response.result}`;
//       }
//       if(file.type==="application/pdf" || file.type==="application/zip" ){
//         file.thumbUrl = require('@/assets/fujian.jpg')
//       }
//       return file;
//     });
//     return fileList
//   }else{
//     return null
//   }
// }


// /**
//  * 
//  * @param {Object} config  验证配置
//  * @param {string,Array} { file, fileList } 
//  * @param {Array} prevFileList
//  */
// export const normFileUpload = (config, { file, fileList },prevFileList) => {
//   if ( !fileList.length ) { return fileList }
//   if (file.status === "removed" ) { return  fileList}
//   const isLt2M = file.size  < config.size * 1024 * 1024;
//   if (!isLt2M) {
//     return prevFileList
//   }
//   if ((file.status === "done" || file.status === 'error') && file.response ) {
//     if (file.response.status !== 200) {
//       message.error("上传失败！请重新上传！")
//       prevFileList.pop();
//       return prevFileList;
//     }
//   }
//    //过滤文件类型
//    let type = false;
//    let strArr = file.name.split('.');
//    for (let i = 0; i < config.type.length; i++) {
//      if (config.type[i] === `.${strArr[strArr.length - 1]}` || config.type[i] === `.${strArr[strArr.length - 1]}`.toLocaleLowerCase()) {
//        type = true
//      }
//    }
//    if (!type) {
//     message.error('您只能上传该附件支持的文件类型');
//      return prevFileList;
//    }
//    fileList = fileList.map((file) => {
//      if (file.response) {
//       //  file.url = file.response.result;
//        file.url = `${ftpLinkUrl}${file.response.result}`;
//      };
//      return file;
//    });
//    return fileList;
//  }

// // 拼接URL的地址，显示纯展示img路径
//  export const mergeFtpUrl = (url) => {
//   if (url) {
//     url = url.replace(";","")
//     return `${ftpLinkUrl}${url}`
//   }else { 
//     return ``
//   }
//  }