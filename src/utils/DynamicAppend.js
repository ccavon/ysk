/**
 * @param {string} type "link" | "script"
 * @param {string} src 引入静态资源链接
 * @param {string  callback  加载完成后的callback
 */
export const DynamicAppend = (arr, callback) => {
  return new Promise ((resolve,reject)=> {
    if ( !arr ) { reject(false) }
    for (let i = 0; i < arr.length; i++) {
      let { type, src } = arr[i];
      let NewDom = document.createElement(type);
      if (type === "link") {
        if (!isUniqByLink(src)) {
          NewDom.setAttribute('rel', 'stylesheet');
          NewDom.setAttribute('href', src);
          document.head.appendChild(NewDom);
          
        }
        if (i === (arr.length - 1)) {
          resolve(true)
        }
      } else if (type === "script") {
        if (!isUniqByScript(src)) {
          NewDom.src = src;
          NewDom.async = true;
          NewDom.type = 'text/javascript';
          if (i === (arr.length - 1)) {
            NewDom.onload = NewDom.onreadystatechange = function () {
              if (NewDom.ready) {
                reject(false)
              }
              if (!NewDom.readyState //这是FF的判断语句，因为ff下没有readyState这个值，IE的readyState肯定有值
                || NewDom.readyState === "loaded" || NewDom.readyState === 'complete' // 这是IE的判断语句
              ) {
                NewDom.ready = true;
                resolve(true)
              }
            };
          }
          document.body.appendChild(NewDom);
        }else {
          if (i === (arr.length - 1)) {
            resolve(true)
          }
        }
      }
    }
  })
}

function isUniqByLink (src) {
  let selectName = `link[href="${src}"]`
  var uniqdom = document.body.querySelector(selectName) || document.head.querySelector(selectName) ;
  return uniqdom
}
function isUniqByScript (src) {
  let selectName = `script[src="${src}"]`

  var uniqdom = document.body.querySelector(selectName) || document.head.querySelector(selectName);
  return uniqdom
}