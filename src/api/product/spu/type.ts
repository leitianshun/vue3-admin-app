export interface responseData {
  code: number
  message: string
  ok: boolean
}

// export interface spuImageListType {
//   id?: number
//   imgName: string
//   imgUrl: string
//   spuId?: number
// }

export interface spuPosterList {
  id: number
  imgName: string
  imgUrl: string
  spuId: number
}

export interface DataObj { // 已有spu接口返回的数据类型
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
  id?: number
  category3Id: number | string
  description: string
  spuImageList: null | spuImageObj[]
  spuName: string
  spuSaleAttrList: null | saleAttrType[]
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
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SaleAttrValueArr
  flag?: boolean
  saleAttrValueName?: string
  saleIdAndValId?: string
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

export interface attr {
  attrId: number | string // 平台属性id
  valueId: number | string // 属性值
}

export interface saleAttr {
  saleAttrId: number | string // 销售属性id
  saleAttrValueId: number | string // 属性值
}

export interface addSkuParamType { // 添加sku参数类型
  category3Id: number | string // 三级分类id
  spuId: number | string // 已有spu id
  tmId: number | string // 品牌id
  skuName: string // sku名称
  price: number | string // sku价格
  weight: string | string // 重量
  skuDesc: string // 描述
  skuDefaultImg: string // sku默认图片
  skuAttrValueList?: attr[] // 平台属性的收集
  skuSaleAttrValueList?: saleAttr[] // 销售属性
}

export interface addSkuType extends responseData { // 添加sku，返回类型
  data: null
}

export interface skuInfoObjType {
  category3Id: number
  price: number
  skuDefaultImg: string
  skuDesc: string
  skuName: string
  spuId: number
  tmId: number
  weight: number
  isSale?: number
}

export interface skuInfoResType extends responseData {
  data: skuInfoObjType[]
}

export interface skuListResType extends responseData {
  data: {
    current: number
    records: skuInfoObjType[]
    searchCount: boolean
    size: number
    total: number
  }
}

export interface delSkuType extends responseData { // 删除sku，返回类型
  data: null | string
}
