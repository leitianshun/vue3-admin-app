export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface recordsType { // 用户对象类型
  createTime: string
  id?: number
  name: string
  password: number
  phone?: null
  roleName?: string
  updateTime?: string
  username: string
}

export interface userListResType extends responseData { // 用户列表返回类型
  data: {
    current: number
    hitCount: boolean
    pages: number
    records: recordsType[]
    searchCount: boolean
    size: number
    total: number
  }
}

export interface delResType extends responseData {
  data: null | string
}
