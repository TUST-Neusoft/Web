import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import { removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'api', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const hasToken = getToken()
    if (hasToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['token'] = getToken()
      // config.headers['corpId_userId'] = getIdToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      if (res.code === -2) {
        Message({
          message: '登录信息已过期，请重新登录',
          type: 'error',
          duration: 5 * 1000
        })
        // router.push('/login?redirect=dashboard');
        removeToken()
        return Promise.reject(new Error('登录信息已过期，请重新登录'))
      }
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
