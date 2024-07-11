import request from '@/utils/request'

export function getAllnotice() {
    return request({
      url: '/notice/getAllNotice',
      method: 'get'
    })
  }