import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 3000,
  validateStatus: status => status >= 200 && status < 300,
//   headers: {
//     'Content-Type': 'application/x-www-formencoded',
//   },
})

request.interceptors.request.use((config) => {
  const token = useUserStore().token
  if (token)
    config.headers.Authorization = token
  return config
}, (error) => {
  ElMessage({ type: 'error', message: error })
  return Promise.reject(error)
})

request.interceptors.response.use((res: any) => {
  if (res.status === 200)
    return res
}, (err) => {
  let message = ''
  const status = err.response.status
  switch (status) {
    case 401:
      message = 'token过期，请重新登录'
      break
    case 403 :
      message = '无权访问'
      break
    case 404:
      message = '请求地址错误'
      break
    case 500:
      message = '服务器错误'
      break
    default:
      message = '网络错误'
      break
  }
  ElMessage({ type: 'error', message })
  return Promise.reject(err)
})

export { request }
