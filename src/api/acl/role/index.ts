import type { permissionResType, publicType, roleListResType, rolesObj } from './type'

enum API {
  getRoleList = '/admin/acl/role/', // 获取角色列表
  delRole = '/admin/acl/role/remove/', // 删除角色
  batchDel = '/admin/acl/role/batchRemove', // 批量删除角色
  updateRole = '/admin/acl/role/update', // 更新角色
  addRole = '/admin/acl/role/save', // 新增角色
  getRoleInfo = '/admin/acl/role/get/', // 获取角色信息
  getMenuByRoleId = '/admin/acl/permission/toAssign/', // 根据角色获取权限菜单
  doAssignAcl = '/admin/acl/permission/doAssignAcl', // 给角色分配菜单权限
}

export const getAllRoleList = (page: number, limit: number, roleName?: string) => request.get<any, roleListResType>(`${API.getRoleList}${page}/${limit}?roleName=${roleName}`) // 获取全部角色列表
export const delRole = (id: number) => request.delete<any, publicType>(`${API.delRole}${id}`) // 删除角色
export const batchDelRole = (idList: Array<string>) => request.delete<any, publicType>(API.batchDel, { data: idList }) // 批量删除角色
export function addOrUpdateRole(data: rolesObj) { // 添加或修改角色
  if (data.id)
    return request.post<any, publicType>(API.updateRole, data)
  else
    return request.post<any, publicType>(API.addRole, data)
}
export const getRoleInfo = (id: number) => request.get<any, any>(`${API.getRoleInfo}${id}`) // 获取角色信息
export const getMenuByRoleId = (roleId: number) => request.get<any, permissionResType>(API.getMenuByRoleId + roleId) // 根据角色获取菜单
