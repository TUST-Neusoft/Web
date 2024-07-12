import request from '@/utils/request'

export function getMyCharge() {
  return request({
    url: '/charge/getMyCharge',
    method: 'get'
  })
}