import { getAttrList, getCategory1, getCategory2, getCategory3 } from '@/api/product/attr/attr'
import type { attrObj, categoryType } from '@/api/product/attr/type'

interface stateType {
  category1Id: number | string
  category2Id: number | string
  category3Id: number | string
  c1Data: categoryType[]
  c2Data: categoryType[]
  c3Data: categoryType[]
  attrListData: attrObj[]
}

export const useCategoryStore = defineStore({
  id: 'categoryId',
  state: (): stateType => ({
    category1Id: '',
    category2Id: '',
    category3Id: '',
    c1Data: [],
    c2Data: [],
    c3Data: [],
    attrListData: [],
  }),
  getters: {},
  actions: {
    async getC1() {
      const res = await getCategory1()
      if (res.code === 200)
        this.c1Data = res.data
    },
    async getC2() {
      const res = await getCategory2(this.category1Id as number)
      if (res.code === 200)
        this.c2Data = res.data
    },
    async getC3() {
      const res = await getCategory3(this.category2Id as number)
      if (res.code === 200)
        this.c3Data = res.data
    },
    async getAttrListData() {
      const res = await getAttrList(this.category1Id as number, this.category2Id as number, this.category3Id as number)
      if (res.code === 200)
        this.attrListData = res.data
    },
  },
})
