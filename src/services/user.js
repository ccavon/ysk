import request from '@/utils/request';

export async function query() {
  return request('/home');
}

export async function queryCurrent() {
  return request('/user/query');
}

export async function register(){
  return true;
}
