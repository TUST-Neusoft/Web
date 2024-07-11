import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

export function forget(data) {
  return request({
    url: '/auth/forget',
    method: 'post',
    data
  })
}

export function getUser() {
  return request({
    url: '/user/getUser',
    method: 'get'
  })
}

export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data: data
  })
}

export function updatePassword(userPassword) {
  return request({
    url: '/user/updatePassword',
    method: 'get',
    params: { userPassword }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
