import type { addOrUpdateMenuParam, allMenu, publicType } from './type'

enum API {
  getAllMenu = '/admin/acl/permission', // 获取所有菜单列表
  addMenu = '/admin/acl/permission/save', // 添加菜单
  updateMenu = '/admin/acl/permission/update', // 更新菜单
  delMenu = '/admin/acl/permission/remove/', // 删除菜单
}

export const getAllMenu = () => request.get<any, allMenu>(API.getAllMenu) // 获取所有菜单列表
export function addOrUpdateMenu(data: addOrUpdateMenuParam) {
  if (data.id)
    return request.post<any, publicType>(API.updateMenu, data)
  else
    return request.post<any, publicType>(API.addMenu, data)
}
export const delMenu = (id: number) => request.delete<any, publicType>(API.delMenu + id) // 删除菜单
