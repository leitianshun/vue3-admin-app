import type { delSkuType, onSaleAndCancelSale, skuDetailResType, skuListResType } from './type'

enum API {
  getSkuList = '/admin/product/list/', // 分页查看sku列表
  delSku_URL = '/admin/product/deleteSku/', // 删除sku
  getSkuDetail_URL = '/admin/product/getSkuInfo/', // 查看sku详情
  onSale_URL = '/admin/product/onSale/', // 产品上架
  cancelSale_URL = '/admin/product/cancelSale/', // 产品下架
}

export const getSkuList = (page: number, limit: number) => request.get<any, skuListResType>(`${API.getSkuList}${page}/${limit}`)
export const delSku = (skuId: number) => request.delete<any, delSkuType>(API.delSku_URL + skuId)
export const getSkuDetail = (skuId: number) => request.get<any, skuDetailResType>(API.getSkuDetail_URL + skuId)
export const onSale = (skuId: number) => request.get<any, onSaleAndCancelSale>(API.onSale_URL + skuId) // 产品上架
export const cancelSale = (skuId: number) => request.get<any, onSaleAndCancelSale>(API.cancelSale_URL + skuId) // 产品下架
