import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 3000,
  validateStatus: status => status >= 200 && status < 300,
  withCredentials: true,
  // header: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // },
})

request.interceptors.request.use((config) => {
  start()
  const token = useUserStore().token
  if (token)
    config.headers.token = token // 这里验证token的方式可能不是Authorization,可以自定义
  return config
}, (error) => {
  ElMessage({ type: 'error', message: error })
  return Promise.reject(error)
})

request.interceptors.response.use((res: any) => {
  close()
  if (res.status === 200)
    return res.data
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

// axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API
// axios.defaults.timeout = 30000
// axios.defaults.withCredentials = true
// // axios.defaults.headers.common['Ahthorization'] = 'token'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// axios.interceptors.request.use((config) => {
//   const token = useUserStore().token
//   if (token)
//     config.headers.Authorization = token
//   return config
// }, (error) => {
//   return Promise.reject(error)
// })

// axios.interceptors.response.use((res: any) => {
//   if (res.status === 200)
//     return res
// }, (error) => {
//   return Promise.reject(error)
// })
