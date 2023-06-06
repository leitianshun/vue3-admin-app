enum API {
  trademark_URL = '/admin/product/baseTrademark/', // 已有品牌接口
}

export const getTrademark = (page: number, limit: number) => request.get(`${API.trademark_URL}${page}/${limit}`)
