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
