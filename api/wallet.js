import request from '@/utils/request'

export function getMyWallet() {
  return request({
    url: '/wallet/getMyWallet',
    method: 'get'
  })
}
