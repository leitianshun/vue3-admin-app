<script setup lang='ts'>
import type { recordsDataObj, saleAttrType, spuImageObj } from '@/api/product/spu/type'
import type { attrObj } from '@/api/product/attr/type'

const emits = defineEmits(['changeScene'])
const skuParams = ref({})
const formRef = ref()
const selectVal = ref('')
const spuImgData = ref<spuImageObj[]>([])
const hasSaleAttr = ref<saleAttrType[]>([])
const attrListArr = ref<attrObj[]>([])
const categoryStore = useCategoryStore()
function cancel() {
  emits('changeScene', { flag: 0 })
}

async function addSkuInit(row: recordsDataObj) {
  console.log(row)
  const imgData = await getSpuImage(row.id!) // spu对应商品图片   as 是类型断言    !是非空断言 意思是不会为空，undefined
  const SaleAttr = await getSpuSaleAttrList(row.id as number) // 类型断言 row.id as number 因为id是可选属性，可能为undefined,所以需要断言为number，此处还可以写为 row.id!, '!'是非空断言，意思就是row.id不为空,undefined
  const attrList = await getAttrList(categoryStore.category1Id as number, categoryStore.category2Id as number, categoryStore.category3Id as number)
  spuImgData.value = imgData.data // spu照片
  hasSaleAttr.value = SaleAttr.data // 已有的销售属性
  attrListArr.value = attrList.data // 平台属性
}
defineExpose({ addSkuInit })
</script>

<template>
  <div>
    <el-form ref="formRef" label-width="120px">
      <el-form-item label="sku名称">
        <el-input v-model="skuParams" placeholder="SKU名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuParams" type="number" placeholder="价格(元)" />
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input v-model="skuParams" placeholder="重量(克)" type="number" />
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input v-model="skuParams" placeholder="sku描述" type="textarea" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="auto" :inline="true">
          <el-form-item v-for="item in attrListArr" :key="item.id" :label="item.attrName" class="mt-5">
            <!-- size="small" -->
            <el-select v-model="selectVal" value-key="" placeholder="" clearable filterable>
              <el-option
                v-for="item2 in item.attrValueList"
                :key="item2.id"
                :label="item2.valueName"
                :value="item2.id!"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="auto" :inline="true">
          <el-form-item v-for="item in hasSaleAttr" :key="item.id" :label="item.saleAttrName">
            <el-select v-model="selectVal" value-key="" placeholder="" clearable filterable>
              <el-option
                v-for="item2 in item.spuSaleAttrValueList"
                :key="item2.id"
                :label="item2.saleAttrValueName"
                :value="item2.id!"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table :data="spuImgData" border stripe>
          <el-table-column type="selection" width="100" align="center" />
          <!-- <el-table-column label="序号" type="index" width="100" /> -->
          <el-table-column label="图片" prop="imgUrl" align="center">
            <template #default="{ row, $index }">
              <img :src="row.imgUrl" class="w-20 h-20">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="{ row, $index }">
              <el-button type="success" size="default" @click="">
                设为默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          保存
        </el-button>
        <el-button @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang='scss'>
</style>
