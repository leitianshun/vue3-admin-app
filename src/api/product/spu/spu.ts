enum API {
  getSpuList_URL = '/admin/product/',
}

export const getSpuList = (page: number, limit: number, category3Id: number | string) => request.get<any, any>(`${API.getSpuList_URL}${page}/${limit}?category3Id=${category3Id}`)
