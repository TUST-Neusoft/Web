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

export function addOrders() {
  return request({
    url: '/orders/addOrders',
    method: 'post',
  })
}

export function payOrders() {
  return request({
    url: '/orders/payOrders',
    method: 'post',
  })
}