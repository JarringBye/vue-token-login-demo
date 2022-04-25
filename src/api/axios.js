import axios from 'axios'
import router from '@/router'

const instance = axios.create({
  baseURL: '',
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // 请求拦截器，如果本地有token就带上，写在请求头
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  }, (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response.status
    if (status === 401) {
      router.push('/login')
    }
    if (status === 403) {
      alert('账户密码错误，请重新输入！')
    }
    return Promise.reject(error)
  }
)

export default instance
