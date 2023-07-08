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

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isLimit = rawFile.size / 1024 / 1024 < 4
  const isImg = rawFile.type === 'image/jpg' || rawFile.type === 'image/png' || rawFile.type === 'image/jpeg'
  // return  rawFile.type === 'image/jpg' || rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' //这里可以简写
  if (!isLimit) {
    ElMessage.error('图片大小不能超过4m')
    return false
  }
  if (!isImg) {
    ElMessage.error('上传图片格式为: png,jpeg,jpg')
    return false
  }
  return true
}
function cancel() {
  emits('cancel', 0)
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url! // !是非空断言，意思就是uploadFile.url 一定有值
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
  const res2 = await getSpuImage(row.id!) // spu对应商品图片   as 是类型断言    !是非空断言 意思是不会为空，undefined
  const res3 = await getSpuSaleAttrList(row.id as number) // 类型断言 row.id as number 因为id是可选属性，可能为undefined,所以需要断言为number，此处还可以写为 row.id!, '!'是非空断言，意思就是row.id不为空,undefined
  const res4 = await getBaseSaleAttrList() // 全部的销售属性
  const tempImgList = res2.data.map((item) => {
    return { name: item.imgName, url: item.imgUrl }
  })
  imgList.value = tempImgList // spu对应商品图片
  saleAttr.value = res3.data // 已有的销售属性
  baseAttr.value = res4.data // 全部的销售属性
  // console.log(res3, res4)
}

// function deleteAttr(index: number) {  //删除销售属性对象
//   saleAttr.value.splice(index, 1)
// }

function delAttrVal(rowIndex: number, index: number) {
  saleAttr.value[rowIndex].spuSaleAttrValueList.splice(index, 1)
}

// 计算出当前spu还未拥有的销售属性,从全部属性中过滤出还未选择的销售属性
const unSelectSaleAttr = computed(() => {
  const unSelectArr = baseAttr.value.filter((item) => {
    return saleAttr.value.every((item2) => {
      return item.name !== item2.saleAttrName
    })
  })
  return unSelectArr
})

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
        <el-dialog v-model="dialogVisible" align-center class="text-center">
          <img class="w-1/2 h-full" :src="dialogImageUrl" alt="Preview Image">
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select :placeholder="unSelectSaleAttr.length > 0 ? `还有${unSelectSaleAttr.length}条未选择` : '无'">
          <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button type="primary" icon="Plus" class="ml-3">
          添加销售属性
        </el-button>
        <el-table border class="mt-5" :data="saleAttr">
          <el-table-column label="序号" width="100px" type="index" align="center" />
          <el-table-column label="属性名" width="130px" prop="saleAttrName" align="center" />
          <el-table-column label="属性值" align="center" prop="spuSaleAttrValueList">
            <template #default="{ row, $index }">
              <el-tag v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" closable type="success" class="mx-2" @close="delAttrVal($index, index)">
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-button icon="Plus" size="small" type="primary" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130px" align="center">
            <template #default="{ row, $index }">
              <el-button type="danger" icon="Delete" @click="saleAttr.splice($index, 1)" />
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
