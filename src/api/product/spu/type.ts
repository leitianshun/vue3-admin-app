export interface responseData {
  code: number
  message: string
  ok: boolean
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
  category3Id: number
  createTime: string
  description: string
  id: number
  spuImageList: null
  spuName: string
  spuPosterList: null
  spuSaleAttrList: null
  tmId: number
}

export type recordsDataArr = recordsDataObj[]

export interface spuResponseDataType extends responseData {
  data: DataObj
}
