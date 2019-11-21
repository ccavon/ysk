import fetch from 'dva/fetch';
import { notification } from 'antd';
import { history } from 'dva/router';
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import hash from 'hash.js';
import querystring from 'querystring';
import { validRequest } from './valid';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  url,
  option,
) {
  const options = {
    // expirys: isAntdPro(),
    ...option,
  };
  const isMock = process.env.MOCK;
  // 请求mock 数据或正式数据切换
  // if (isMock && !validRequest(url)) {   正常数据
  if (!isMock && !validRequest(url)) {
    const mock = require('@/mock').default;
    return mock[url] ? mock[url] : { message: codeMessage['404'] }
  } else {
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  const jessionid = localStorage.getItem('JSESSIONID');
  const headers = {
    'JSESSIONID': jessionid,
    'Access-Control-Max-Age': 1728000,
    ...newOptions.headers
  }
  window.Cookies.set('JSESSIONID', jessionid);
  if(newOptions.type !== 'formData'){
    newOptions.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    };
    // newOptions.body = newOptions.body;
  } else {
    // newOptions.body is FormData
    newOptions.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      ...headers
    };
  }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ){
    newOptions.body = newOptions.type==="formData" ? querystring.stringify(newOptions.body) : JSON.stringify(newOptions.body);
  } 

  if(newOptions.method === 'GET' || newOptions.method === 'get'){
      url = newOptions.type ? `${url}?${querystring.stringify(newOptions.body)}` : '';
      delete newOptions.body;
  };
  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  NProgress.start();
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      NProgress.done();
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      NProgress.done();
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      // environment should not be used
      if (status === 403) {
        history.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        history.push('/exception/500');
        return;
      }
      if (status >= 404 && status < 422) {
        history.push('/exception/404');
      }
    });
  }
}
