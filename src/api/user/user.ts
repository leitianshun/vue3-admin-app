import { API } from '@/types/user'
import type { loginForm, loginResponseData, logoutResponseData, userInfo } from '@/types/user'

export function login(data: loginForm): Promise< loginResponseData> {
  return request({
    url: API.login,
    method: 'POST',
    data,
  })
}

export function getUserInfo(): Promise<userInfo> {
  return request({
    url: API.getUserInfo,
    method: 'get',
  })
}

export function logout(): Promise<logoutResponseData> {
  return request({ // 定义返回的参数类型, return request<any,any>({})
    url: API.logout,
    method: 'post',
  })
}
