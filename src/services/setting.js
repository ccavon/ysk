import request from '@/utils/request';

export async function save(data) {
  return request('/setting/save', {
    method: 'POST',
    data
  });
}