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
  attrId?: number
  id?: number
  valueName?: string
  flag?: boolean // 控制每一个属性值得编辑模式和查看模式的切换
}

export interface attrObj {
  attrName: string
  attrValueList: attrValueListObj[]
  categoryId: number | string
  categoryLevel: number
  id?: number | string
}

export interface attrListData extends responseData {
  data: attrObj[]
}

export interface addAttrResponseType extends responseData {
  data: null
}

export interface delAttrResponseType extends responseData {
  data: null
}
