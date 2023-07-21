export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface menuObj { // 每个菜单的数据
  id: number
  createTime?: string
  updateTime?: string
  pid: number
  name: string
  code: null
  toCode?: null
  type?: number
  status?: null
  level: number
  children?: menuObj[]
}
export interface allMenu extends responseData { // 所有菜单列表响应类型
  data: menuObj[]
}

export interface publicType extends responseData { // 公共响应类型
  data: string
}

export interface addOrUpdateMenuParam { // 添加或更新菜单参数类型
  id?: number
  level?: number
  name?: string
  code?: string
  pid?: number
}
