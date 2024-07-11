import request from '@/utils/request'

export function getMyWallet() {
  return request({
    url: '/wallet/getMyWallet',
    method: 'get'
  })
}

export function chargeMoney(amount) {
  return request({
    url: '/wallet/chargeMoney',
    method: 'post',
    params: { amount }
  })
}

export function transferMoney(data) {
  return request({
    url: '/wallet/transferMoney',
    method: 'post',
    data
  })
}
