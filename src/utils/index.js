import CN from '@/locale/zh_CN';
import { userLocal } from '@/api/_local';
import querystring from 'querystring';

/**
 * @desc 获取标准信息
 * @param {*} key 传入键
 * @returns message [string];
 */
export function formatMessage(key) {
  const _locale = localStorage.getItem('_locale');
  switch (_locale) {
    case 'zh_EN':
      return;
    default:
      return CN[key];
  }
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function fetchData(api, body, callback, type = 'application/x-www-form-urlencoded', method = 'post') {
  const query = typeof body === 'object' ? JSON.stringify(body) : body;
  fetch(api, {
    method: method,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': type
    },
    body: query
  })
    .then(res => {
      switch (res.status) {
        default:
          return res.json();
      }
    })
    .then(data => {
      callback(data)
    })
    .catch(e => {
      console.log(e)
    });
}

export const City = (cb) => {
  if (localStorage.getItem(City)) {
    cb(JSON.parse(localStorage.getItem(City)));
  } else {
    fetch(`${userLocal}/js/City.json`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
      .then((res) => res.json())
      .then((json) => {
        cb(json)
        localStorage.setItem(City, JSON.stringify(json));
      })
      .catch((err) => cb(err))
  }
}

/**
 * @param {function} 请求函数
 */
export const createEffects = (servicesFun) => function* ({ payload, callback }, { put, call }) {
  if (typeof servicesFun !== 'function') {
    return console.error(new Error(`servicesFun: ${servicesFun} is not function`));
  }
  const response = yield call(servicesFun, payload);
  if (callback && typeof callback === 'function') {
    callback(response);
  };
  return response;
}

/**
  @param {string} ?id=123 此格式字符串
 */
export const resolveSearch = (search) => {
  if (typeof search !== 'string') {
    return {};
  }
  if (!search.split('?')[1] || !search) {
    return {};
  }
  return querystring.parse(search.split('?')[1]);
}


/**
  @param {len} 随机数长度,默认4位
 */

export const randChar = (len = 4) => {
  let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', result = '';
  characters = characters.split('');
  for (let i = 0; i < len; i++) {
    result += characters[Math.floor(Math.random() * characters.length)]
  }
  return result;
}

