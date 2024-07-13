import request from '@/utils/request'

export function getMyOrders() {
  return request({
    url: '/orders/getMyOrders',
    method: 'get'
  })
}

export function getOrders() {
  return request({
    url: '/orders/getOrders',
    method: 'get'
  })
}

