import type { TrademarkType, deleteSpuResponseType, spuResponseDataType } from './type'

enum API {
  getSpuList_URL = '/admin/product/',
  getSpuInfo_URL = '/admin/product/getSpuInfo/',
  delSpu_URL = '/admin/product/deleteSpu/',
  getTrademarkList_URL = '/admin/product/baseTrademark/getTrademarkList',
  getSpuImage_URL = '/admin/product/spuImageList/',
}

export const getSpuList = (page: number, limit: number, category3Id: number | string) => request.get<any, spuResponseDataType>(`${API.getSpuList_URL}${page}/${limit}?category3Id=${category3Id}`)
export const getSpuInfo = (id: number) => request.get<any, any>(API.getSpuInfo_URL + id)
export const deleteSpu = (id: number) => request.delete<any, deleteSpuResponseType>(API.delSpu_URL + id)
export const getTrademarkList = () => request.get<any, TrademarkType>(API.getTrademarkList_URL)
export const getSpuImage = (spuId: number) => request.get<any, any>(API.getSpuImage_URL + spuId)
