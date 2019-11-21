import request from '@/utils/request';

export async function queryMenu(arg) {
  console.log(arg)
  if(arg){
    return request('/global/menuData');
  }else{
    return request('/global/menu');
  }
}
