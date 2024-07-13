import request from '@/utils/request'

export function getAll() {
  return request({
    url: '/goods/getAll',
    method: 'get'
  })
}

export function getDetail(goodsNo) {
  return request({
    url: '/goods/getDetail',
    method: 'get',
    params: { goodsNo }
  })
}
