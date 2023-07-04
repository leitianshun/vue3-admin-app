import type { responseData, spuResponseDataType } from './type'

enum API {
  getSpuList_URL = '/admin/product/',
  delSpu_URL = '/admin/product/deleteSpu/',
}

export const getSpuList = (page: number, limit: number, category3Id: number | string) => request.get<any, spuResponseDataType>(`${API.getSpuList_URL}${page}/${limit}?category3Id=${category3Id}`)

export const deleteSpu = (id: number) => request.delete<any, responseData>(API.delSpu_URL + id)
