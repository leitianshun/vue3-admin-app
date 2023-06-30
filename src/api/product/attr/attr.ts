import type { addAttrResponseType, attrListData, attrObj, categoryData } from './type'

enum API {
  getCategory1 = '/admin/product/getCategory1', // 获取一级分类接口地址
  getCategory2 = '/admin/product/getCategory2/', // 获取二级分类接口地址
  getCategory3 = '/admin/product/getCategory3/', // 获取三级分类接口地址
  getAttrList = '/admin/product/attrInfoList/', // 获取商品属性接口
  delAttr = '/admin/product/deleteAttr/', // 删除属性
  getAttrInfo = '/admin/product/getAttrValueList/', // 获取属性详情
  addAttr = '/admin/product/saveAttrInfo', // 添加属性,或者修改属性
}

export const getCategory1 = () => request.get<any, categoryData>(API.getCategory1)

export function getCategory2(category1Id: number) {
  return request<any, categoryData>({
    url: API.getCategory2 + category1Id,
    method: 'get',
  })
}

export function getCategory3(category2Id: number) {
  return request.get<any, categoryData>(API.getCategory3 + category2Id)
}

export const getAttrList = (c1Id: number, c2Id: number, c3Id: number) => request.get<any, attrListData>(`${API.getAttrList}${c1Id}/${c2Id}/${c3Id}`)

export const addAttr = (data: attrObj) => request.post<any, addAttrResponseType>(API.addAttr, data)
