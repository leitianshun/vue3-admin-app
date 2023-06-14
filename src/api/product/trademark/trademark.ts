import type { trademarkResponseData, tradmerk } from './type'

enum API {
  trademark_URL = '/admin/product/baseTrademark/', // 已有品牌接口
  addTradmark_URL = '/admin/product/baseTrademark/save', // 添加品牌
  updateTradmark_URL = '/admin/product/baseTrademark/update', // 更新
  delTradmark_URL = '/admin/product/baseTrademark/remove/', // 删除
}

export const getTrademark = (page: number, limit: number): Promise<trademarkResponseData> => request.get(`${API.trademark_URL}${page}/${limit}`)

export function addTradmark(data: tradmerk) {
  if (data.id) {
    return request({
      url: API.updateTradmark_URL,
      method: 'post',
      data,
    })
  }
  else {
    return request({
      url: API.addTradmark_URL,
      method: 'post',
      data,
    })
  }
}

export function delTradmark(id: number) {
  return request({
    url: API.delTradmark_URL + id,
    method: 'delete',
  })
}
