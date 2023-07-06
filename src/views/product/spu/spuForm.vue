<script setup lang='ts'>
import { getTrademarkList } from '@/api/product/spu/spu'

import type { baseAttrArr, recordsDataObj, saleAttrType, spuImageObj } from '@/api/product/spu/type'

const emits = defineEmits(['cancel'])
const value = ref('')
interface optionType {
  label: string
  value: number
}
const options = ref<optionType[]>([])
const imgList = ref<spuImageObj[]>([])
const saleAttr = ref<saleAttrType[]>([])
const baseAttr = ref<baseAttrArr>([])
function onSuccess() {}
function beforeUpload() {}
function cancel() {
  emits('cancel', 0)
}
async function getHasSpuData(row: recordsDataObj) { // 这里的row是父组件使用ref调用方法传递过来的值
  const res = await getTrademarkList()
  const tempTrademark = res.data.map((item) => {
    return { label: item.tmName, value: item.id }
  })
  options.value = tempTrademark
  const res2 = await getSpuImage(row.id as number)
  const res3 = await getSpuSaleAttrList(row.id as number) // 类型断言 row.id as number 因为id是可选属性，可能为undefined,所以需要断言
  const res4 = await getBaseSaleAttrList()
  imgList.value = res2.data
  saleAttr.value = res3.data
  baseAttr.value = res4.data
  // console.log(res3, res4)
}

defineExpose({ getHasSpuData }) // 子组件导出方法，以供父组件使用
</script>

<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入spu名称" />
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="value" placeholder="请选择品牌">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload" list-type="picture-card"
          :on-success="onSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <div v-else class="text-center">
            <el-icon><Plus /></el-icon>
            <div>
              点击上传图片
            </div>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select>
          <el-option label="1" />
          <el-option label="2" />
          <el-option label="3" />
        </el-select>
        <el-button type="primary" icon="Plus" class="ml-3">
          添加销售属性
        </el-button>
        <el-table border class="mt-5">
          <el-table-column label="序号" width="100px" type="index" align="center" />
          <el-table-column label="属性名" width="130px" align="center" />
          <el-table-column label="属性值" align="center" />
          <el-table-column label="操作" width="130px" align="center">
            <template #default="{ row, $index }">
              <el-button type="danger" icon="Delete" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary">
          确定
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
