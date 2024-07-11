import request from '@/utils/request'

export function getMyComplaint() {
  return request({
    url: '/complaint/getMyComplaint',
    method: 'get'
  })
}

export function addComplaint(data) {
  return request({
    url: '/complaint/addComplaint',
    method: 'post',
    data
  })
}
