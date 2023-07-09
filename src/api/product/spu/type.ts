export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface spuImageListType {
  id?: number
  imgName: string
  imgUrl: string
  spuId: number
}

export interface spuPosterList {
  id: number
  imgName: string
  imgUrl: string
  spuId: number
}
export interface spuSaleAttrListType {
  baseSaleAttrId: number
  id?: number
  saleAttrName: string
  spuId: number
  spuSaleAttrValueList: []

}

export interface DataObj {
  current: number
  hitCount: boolean
  optimizeCountSql: boolean
  records: recordsDataArr
  pages: number
  searchCount: boolean
  size: number
  total: number
}

export interface recordsDataObj {
  category3Id: number | string
  description: string
  id?: number
  spuImageList: null | spuImageListType[]
  spuName: string
  spuSaleAttrList: null | spuSaleAttrListType[]
  tmId: number | string
  spuPosterList?: null | spuPosterList[]
}

export type recordsDataArr = recordsDataObj[]

export interface spuResponseDataType extends responseData {
  data: DataObj
}

export interface deleteSpuResponseType extends responseData { // 删除spu的响应类型
  data: null | string
}

export interface trademarkObj {
  id: number
  tmName: string
  logoUrl: string
}

export interface TrademarkType extends responseData { // 品牌数据的类型
  data: trademarkObj[]
}

export interface spuImageObj { // 商品图片的类型
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}
export interface SpuImageType extends responseData { // 已有的spu照片墙数据类型
  data: spuImageObj[]
}

export interface SaleAttrValueListType { // 已有销售属性值对象类型
  id?: number | string
  spuId?: number
  saleAttrValueName: string
  baseSaleAttrId: number
  saleAttrName?: string
}

export type SaleAttrValueArr = SaleAttrValueListType[] // 已有销售属性值数组类型

export interface saleAttrType { // 销售属性响应类型
  id?: number | string
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SaleAttrValueArr
}

export interface saleAttrResponseType extends responseData {
  data: saleAttrType[]
}

export interface baseSaleAttrObj {
  'id': number
  'name': string
}

export type baseAttrArr = baseSaleAttrObj[]

export interface baseAttrListType extends responseData { // 销售属性类型 [颜色，版本，尺码]
  data: baseAttrArr
}

export interface addOrUpdateSpuResponseType extends responseData { // 添加spu或者修改，返回类型
  data: null
}
