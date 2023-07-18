import type { addOrUpdateResType, delResType, doAssignRoleParams, recordsType, responseData, roleListResType, userListResType } from './type'

enum API {
  getUserList = '/admin/acl/user/', // 获取管理用户分页列表
  addUser = '/admin/acl/user/save', // 新增管理用户
  updateUser = '/admin/acl/user/update', // 更新
  delUser = '/admin/acl/user/remove/', // 删除管理用户
  batchDel = '/admin/acl/user/batchRemove', // 批量删除
  getRoleList = '/admin/acl/role/', // 获取角色列表
  doAssignRole = '/admin/acl/user/doAssignRole', // 根据用户分配角色
}

export const getUserList = (page: number, limit: number) => request.get<any, userListResType>(`${API.getUserList}${page}/${limit}`) // 获取用户列表
export function addOrUpdateUser(data: recordsType) { // 添加和更新用户
  if (data.id)
    return request.post<any, addOrUpdateResType>(API.updateUser, data)
  else
    return request.post<any, addOrUpdateResType>(API.addUser, data)
}
export const delUser = (id: number) => request.delete<any, delResType>(API.delUser + id) // 删除用户
export const batchDel = (idList: Array<string>) => request.delete<any, delResType>(API.batchDel, { data: idList }) // 批量删除，传递数组字符串['445','45']

// 写法2
// export function batchDel2(idList: Array<string>) {
//   return request<any, delResType>({
//     url: API.batchDel,
//     method: 'delete',
//     data: idList, // 不可写为 data:{idList} ,如果这样写传递的参数格式就是{idList:['4545']}不会请求成功,这里传给后端只需要传递数组，所以参数格式为['444']才会成功，直接用data带上参数
//   })
// }
// 写法3
// export function batchDel3(idList: Array<string>): Promise< delResType> {
//   return request({
//     url: API.batchDel,
//     method: 'delete',
//     data: idList, // 正常写法为 data:{idList},但是这里比较特殊，所以只需写为data:idList,用data带上参数，参数是一个字符串数组['444'],没有明确的参数字段，只传数组字符串
//   })
// }

export const getRoleList = (page: number, limit: number) => request.get<any, roleListResType>(`${API.getRoleList}${page}/${limit}`) // 获取角色列表
export const doAssignRole = (data: doAssignRoleParams) => request.post<any, responseData>(API.doAssignRole, data) // 根据用户分配角色
