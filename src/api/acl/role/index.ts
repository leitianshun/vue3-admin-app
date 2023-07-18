import type { publicType, roleListResType } from './type'

enum API {
  getRoleList = '/admin/acl/role/',
  delRole = '/admin/acl/role/remove/',
}

export const getAllRoleList = (page: number, limit: number, roleName?: string) => request.get<any, roleListResType>(`${API.getRoleList}${page}/${limit}?username=${roleName}`) // 获取全部角色列表
export const delRole = (id: number) => request.delete<any, publicType>(`${API.delRole}${id}`) // 删除角色
