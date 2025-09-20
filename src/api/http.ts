import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_API || ''

const instance = axios.create({ baseURL, timeout: 15000 })

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
  return config
})

instance.interceptors.response.use(
  res => res,
  err => {
    const status = err?.response?.status
    if (status === 401) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default instance
