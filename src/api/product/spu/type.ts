export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface spuImageListType {
  id: number
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
  id: number
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
  tmId: number
  spuPosterList?: null | spuPosterList[]

}

export type recordsDataArr = recordsDataObj[]

export interface spuResponseDataType extends responseData {
  data: DataObj
}

export interface deleteSpuResponseType extends responseData {
  data: null | string
}

export interface trademarkObj {
  id: number
  tmName: string
  logoUrl: string
}

export interface TrademarkType extends responseData {
  data: trademarkObj[]
}
