// service 统一的出口
import HPRequest from './request/request'
import { API_BASE_URL, TIME_OUT } from './request/config'
import LocalCache from '@/utils/cache'
const hpRequest = new HPRequest({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  interceptorHooks: {
    requestInterceptor: (config) => {
      const token = LocalCache.getCache('token')
      if (token) {
        if (config && config?.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (error) => {
      return error
    }
  }
})
export default hpRequest
