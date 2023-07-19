export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface addOrUpdateResType extends responseData { // 添加或更新用户返回类型
  data: null
}

export interface rolesObj { // 每个角色的对象类型
  createTime?: string
  id?: number
  remark?: null
  roleName?: string
  updateTime?: string
}

export interface roleListResType extends responseData { // 角色列表返回类型
  data: {
    current: number
    hitCount: boolean
    optimizeCountSql: boolean
    pages: number
    records: rolesObj[]
    searchCount: boolean
    size: number
    total: number
  }
}

export interface publicType extends responseData { // 删除修改新增返回公共类型类型
  data: null | string
}

export interface permisstionObj { // 权限菜单返回数据
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children: permisstionObj[]
}

export interface permissionResType extends responseData {
  data: permisstionObj[]
}

export interface doAssignPermissionParams { // 根据角色分配菜单权限
  permissionIdList: Array<number>
  roleId: number | string
}
