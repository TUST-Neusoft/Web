import request from '@/utils/request'

export function getMyOrders() {
  return request({
    url: '/orders/getMyOrders',
    method: 'get'
  })
}
