interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface categoryType {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}

export interface categoryData extends responseData {
  data: categoryType[]
}

export interface attrValueListObj {
  attrId: number
  id: number
  valueName: string
}

export interface attrObj {
  attrName: string
  attrValueList: attrValueListObj[]
  categoryId: number
  categoryLevel: number
  id: number
}

export interface attrListData extends responseData {
  data: attrObj[]
}
