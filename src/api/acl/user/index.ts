import type { delResType, userListResType } from './type'

enum API {
  getUserList = '/admin/acl/user/', // 获取管理用户分页列表
  addUser = '/admin/acl/user/save', // 新增管理用户
  delUser = '/admin/acl/user/remove/', // 删除管理用户
  batchDel = '/admin/acl/user/batchRemove', // 批量删除
}

export const getUserList = (page: number, limit: number) => request.get<any, userListResType>(`${API.getUserList}${page}/${limit}`) // 获取用户列表
export const addUser = (data: any) => request.post(API.addUser, data) // 添加用户
export const delUser = (id: number) => request.delete<any, delResType>(API.delUser + id) // 删除用户
