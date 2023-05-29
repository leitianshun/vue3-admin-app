import { API } from '@/types/user'
import type { loginForm, loginResponseData, userInfo } from '@/types/user'

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

export function logout() {
  return request({
    url: API.logout,
    method: 'post',
  })
}
