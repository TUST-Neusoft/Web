import request from '@/utils/request'

export function getMyComplaint() {
  return request({
    url: '/complaint/getMyComplaint',
    method: 'get'
  })
}

export function addComplaint() {
  return request({
    url: '/complaint/addComplaint',
    method: 'post',
  })
}
