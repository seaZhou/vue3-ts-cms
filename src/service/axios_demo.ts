import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
// import { ElLoading } from 'element-plus'
// import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
axios
  .get('http://123.207.32.32:8000/home/multidata')
  .then((res: AxiosResponse) => {
    console.log(res.data)
  })

axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'jason',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('http://httpbin.org/post', {
    data: {
      name: 'jason',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })
// axios的拦截器
// fn1:请求发送成功会执行的函数
// fn2:请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作： 1.给请求添加token 2.isLoading 动画
    // 请求成功的拦截
    return config
  },
  (error) => {
    // 请求失败的拦截
    return error
  }
)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (error) => {
    console.log('响应失败的拦截')
    return error
  }
)
