export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface skuInfoObjType { // 每个sku的对象类型
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

export interface skuListResType extends responseData { // 获取sku列表响应类型
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

export interface skuSaleAttr {
  id: number
  saleAttrId: number
  saleAttrName: string
  saleAttrValueId: number
  saleAttrValueName: string
  skuId: number
  spuId: number
}

export interface skuAttr {
  attrId: number
  attrName: string
  createTime: string
  id: number
  skuId: number
  valueId: number
  valueName: string
}
export interface skuImgObj { // sku图片列表
  id: number
  imgName: string
  imgUrl: string
  isDefault: number | string
  skuId: number
  spuImgId: number
}

export interface skuDataResType { // sku详情响应类型
  category3Id: number | string // 三级分类id
  id: number | string
  isSale: number | string
  spuId: number | string // 已有spu id
  tmId: number | string // 品牌id
  skuName: string // sku名称
  price: number | string // sku价格
  weight: string | string // 重量
  skuDesc: string // 描述
  skuDefaultImg: string // sku默认图片
  skuAttrValueList: skuAttr[] // 平台属性
  skuImageList: skuImgObj[]
  skuSaleAttrValueList: skuSaleAttr[] // 销售属性
}
export type skuDataType = Partial<skuDataResType> // 将sku详情，返回的数据转为可选类型

export interface skuDetailResType extends responseData {
  data: skuDataResType
}

export interface onSaleAndCancelSale extends responseData { // 产品上下架返回响应类型
  data: null
}
