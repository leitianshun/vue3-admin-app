import { API } from '@/types/user'
import type { loginForm } from '@/types/user'

export function login(data: loginForm) {
  return request({
    url: API.login,
    method: 'POST',
    data,
  })
}
