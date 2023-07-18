export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface recordsType { // 用户对象类型
  createTime?: string
  id?: number
  name?: string
  password?: number | string
  phone?: null
  roleName?: string
  updateTime?: string
  username?: string
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

export interface delResType extends responseData { // 删除用户返回类型
  data: null | string
}

export interface addOrUpdateResType extends responseData { // 添加或更新用户返回类型
  data: null
}

export interface roleObj { // 每个角色的对象类型
  createTime: string
  id: number
  remark: null
  roleName: string
  updateTime: string
}

export interface roleListResType extends responseData { // 角色列表返回类型
  data: {
    current: number
    hitCount: boolean
    optimizeCountSql: boolean
    pages: number
    records: roleObj[]
    searchCount: boolean
    size: number
    total: number
  }
}

export interface doAssignRoleParams { // 分配角色参数类型
  roleIdList: Array<number>
  userId: number | string
}
