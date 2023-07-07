<script setup lang='ts'>
import type { UploadProps, UploadUserFile } from 'element-plus'
import { getTrademarkList } from '@/api/product/spu/spu'
import type { baseAttrArr, recordsDataObj, saleAttrType, spuImageObj, trademarkObj } from '@/api/product/spu/type'

const emits = defineEmits(['cancel'])
const spuParams = ref<recordsDataObj>({ // 储存已有spu对象
  category3Id: '',
  spuName: '',
  description: '',
  spuImageList: [],
  spuSaleAttrList: [],
  tmId: '',
})

const AllTrademarkOptions = ref<trademarkObj[] >([])
const imgList = ref<spuImageObj[] | UploadUserFile[]>([])
const saleAttr = ref<saleAttrType[]>([])
const baseAttr = ref<baseAttrArr>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
function onSuccess() {}
function beforeUpload() {}
function cancel() {
  emits('cancel', 0)
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

async function getHasSpuData(row: recordsDataObj) { // 这里的row是父组件使用ref调用此方法传递过来的值
  spuParams.value = row
  console.log(row)
  const res = await getTrademarkList() // 所有品牌的数据
  AllTrademarkOptions.value = res.data
  // const tempTrademark = res.data.map((item) => {
  //   return { label: item.tmName, value: item.id }
  // })
  const res2 = await getSpuImage(row.id as number) // spu对应商品图片
  const res3 = await getSpuSaleAttrList(row.id as number) // 类型断言 row.id as number 因为id是可选属性，可能为undefined,所以需要断言
  const res4 = await getBaseSaleAttrList() // 全部的销售属性
  const tempImgList = res2.data.map((item) => {
    return { name: item.imgName, url: item.imgUrl }
  })
  imgList.value = tempImgList
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
        <el-input v-model="spuParams.spuName" placeholder="请输入spu名称" />
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="spuParams.tmId" placeholder="请选择品牌">
          <el-option
            v-for="item in AllTrademarkOptions"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spuParams.description" type="textarea" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="imgList"
          class="avatar-uploader"
          action="/api/admin/product/fileUpload" list-type="picture-card"
          :on-success="onSuccess"
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <div v-else class="text-center">
            <div>
              点击上传图片
            </div>
          </div> -->
        </el-upload>
        <el-dialog v-model="dialogVisible" align-center class="h-1/3">
          <img class="w-full h-full" :src="dialogImageUrl" alt="Preview Image">
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select>
          <el-option v-for="item in baseAttr" :key="item.id" :label="item.name" :value="item.id" />
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
