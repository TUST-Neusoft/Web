import request from '@/utils/request'

export function getWalletLogs() {
  return request({
    url: '/logs/getWalletLogs',
    method: 'get'
  })
}
