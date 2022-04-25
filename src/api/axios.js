import axios from 'axios'
import router from '@/router'

const instance = axios.create({
  baseURL: ''
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  }, (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  ({ response }) => {
    const { status } = response
    if (status === 401) {
      router.push('/login')
    }
    return Promise.reject(response)
  }
)

export default instance
