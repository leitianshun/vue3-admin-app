export enum API {
  login = '/admin/acl/index/login',
  getUserInfo = '/admin/acl/index/info',
  logout = '/admin/acl/index/logout',
}

export interface loginForm {
  username: string
  password: string
}

export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface loginResponseData extends responseData {
  data: string
}

export interface userInfo extends responseData {
  data: {
    avatar: string
    buttons: Array<string>
    name: string
    roles: Array<string>
    routes: Array<string>
  }
}
