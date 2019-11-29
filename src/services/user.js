import request from '@/utils/request';
import { users } from '@/api/user';

export async function query() {
  return request('/home');
}

export async function queryCurrent() {
  return request('/user/query');
}

export async function register() {
  return true;
}

// 用户登陆
export async function userLogin(options) {
  return request(users.LOGIN, {
    method: 'POST',
    type: 'formData',
    body: options
  });
}
