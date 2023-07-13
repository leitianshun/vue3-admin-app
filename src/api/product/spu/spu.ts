import type { SpuImageType, TrademarkType, addOrUpdateSpuResponseType, addSkuParamType, addSkuType, baseAttrListType, deleteSpuResponseType, recordsDataObj, saleAttrResponseType, spuResponseDataType } from './type'

enum API {
  getSpuList_URL = '/admin/product/', // 获取已有的spu数据
  getSpuInfo_URL = '/admin/product/getSpuInfo/',
  delSpu_URL = '/admin/product/deleteSpu/', // 删除spu
  getTrademarkList_URL = '/admin/product/baseTrademark/getTrademarkList', // 获取全部的spu品牌数据
  getSpuImage_URL = '/admin/product/spuImageList/', // 获取一个已有的spu下的全部商品图片
  getSpuSaleAttrList_URL = '/admin/product/spuSaleAttrList/', // 获取已有spu销售属性
  getBaseSaleAttrList_URL = '/admin/product/baseSaleAttrList', // 获取全部的基础销售属性列表 [颜色，版本，尺码]
  addSpu_URL = '/admin/product/saveSpuInfo', // 添加spu
  updateSpu_URL = '/admin/product/updateSpuInfo', // 更新
  addSku_URL = '/admin/product/saveSkuInfo', // 添加SKU
}

export const getSpuList = (page: number, limit: number, category3Id: number | string) => request.get<any, spuResponseDataType>(`${API.getSpuList_URL}${page}/${limit}?category3Id=${category3Id}`)
export const getSpuInfo = (id: number) => request.get<any, any>(API.getSpuInfo_URL + id)
export const deleteSpu = (id: number) => request.delete<any, deleteSpuResponseType>(API.delSpu_URL + id)
export const getTrademarkList = () => request.get<any, TrademarkType>(API.getTrademarkList_URL) // 获取全部品牌
export const getSpuImage = (spuId: number) => request.get<any, SpuImageType>(API.getSpuImage_URL + spuId) // 获取spu商品图片
export const getSpuSaleAttrList = (spuId: number) => request.get<any, saleAttrResponseType>(API.getSpuSaleAttrList_URL + spuId) // 获取已有销售属性
export const getBaseSaleAttrList = () => request.get<any, baseAttrListType>(API.getBaseSaleAttrList_URL) // 获取全部销售属性
export function addSpuOrUpdateSpu(data: recordsDataObj) { // 添加或更新spu
  if (data.id)
    return request.post<any, addOrUpdateSpuResponseType>(API.updateSpu_URL, data)
  else
    return request.post<any, addOrUpdateSpuResponseType>(API.addSpu_URL, data)
}
export const addSku = (data: addSkuParamType) => request.post<any, addSkuType>(API.addSku_URL, data) // 添加sku
