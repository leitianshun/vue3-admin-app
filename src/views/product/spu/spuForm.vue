<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import { addSpuOrUpdateSpu, getTrademarkList } from '@/api/product/spu/spu'
import type {
  baseAttrArr,
  recordsDataObj,
  saleAttrType,
  trademarkObj,
} from '@/api/product/spu/type'

const emits = defineEmits(['changeScene'])
const spuParams = ref<recordsDataObj>({
  // 储存已有spu对象
  category3Id: '',
  spuName: '',
  description: '',
  spuImageList: [],
  spuSaleAttrList: [],
  tmId: '',
})
// const parent: any = inject('getData') // 使用inject注入父组件传递的方法
const AllTrademarkOptions = ref<trademarkObj[]>([])
const imgList = ref<any>([])
const saleAttr = ref<saleAttrType[]>([])
const baseAttr = ref<baseAttrArr>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const saleAttrAndValueName = ref<string>('')
const inpRefArr = ref<any>([])

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isLimit = rawFile.size / 1024 / 1024 < 1
  const isImg =
    rawFile.type === 'image/jpg' ||
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg'
  // return  rawFile.type === 'image/jpg' || rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' //这里可以简写
  if (!isLimit) {
    ElMessage.error('图片大小不能超过1m')
    return false
  }
  if (!isImg) {
    ElMessage.error('上传图片格式为: png,jpeg,jpg')
    return false
  }
  return true
}

// const onSuccess: UploadProps['onSuccess'] = (
//   response, uploadFile,
// ) => {
//   if (response.code === 200) {
//     spuParams.value.spuImageList?.push({ imgUrl: response.data, imgName: uploadFile.name })
//     console.log(response.data, uploadFile)
//   }
// }

function cancel() {
  // 取消，通知父组件切换场景,并且不重新获取数据
  emits('changeScene', { flag: 0 })
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url! // !是非空断言，意思就是uploadFile.url 一定有值
  dialogVisible.value = true
}

async function getHasSpuData(row: recordsDataObj) {
  // 这里的row是父组件使用ref调用此方法传递过来的值
  if (row.id) spuParams.value = row
  const allTrademark = await getTrademarkList() // 所有品牌的数据
  AllTrademarkOptions.value = allTrademark.data
  // const tempTrademark = res.data.map((item) => {
  //   return { label: item.tmName, value: item.id }
  // })
  const spuImgData = await getSpuImage(row.id!) // spu对应商品图片   as 是类型断言    !是非空断言 意思是不会为空，undefined
  const hasSaleAttr = await getSpuSaleAttrList(row.id as number) // 类型断言 row.id as number 因为id是可选属性，可能为undefined,所以需要断言为number，此处还可以写为 row.id!, '!'是非空断言，意思就是row.id不为空,undefined
  const allSaleAttr = await getBaseSaleAttrList() // 全部的销售属性
  const tempImgList = spuImgData.data.map((item) => {
    return { name: item.imgName, url: item.imgUrl }
  })
  imgList.value = tempImgList // spu对应商品图片
  saleAttr.value = hasSaleAttr.data // 已有的销售属性
  baseAttr.value = allSaleAttr.data // 全部的销售属性
}

// function deleteAttr(index: number) {  //删除销售属性对象 已在dom中写
//   saleAttr.value.splice(index, 1)
// }

// function delAttrVal(rowIndex: number, index: number) {  //删除属性值对应的对象 已在dom中写
//   saleAttr.value[rowIndex].spuSaleAttrValueList.splice(index, 1)
// }

// 计算出当前spu还未拥有的销售属性,从全部属性中和获取的已有属性中过滤出还未选择的销售属性
const unSelectSaleAttr = computed(() => {
  const unSelectArr = baseAttr.value.filter((item) => {
    return saleAttr.value.every((item2) => {
      return item.name !== item2.saleAttrName
    })
  })
  return unSelectArr
})

function addSaleAttr() {
  const [baseSaleAttrId, saleAttrName] = saleAttrAndValueName.value.split(':') // 解构出销售id以及销售属性名称
  saleAttr.value.push({
    // id: baseSaleAttrId,
    // spuId: 5,
    baseSaleAttrId: Number(baseSaleAttrId),
    saleAttrName,
    spuSaleAttrValueList: [],
  })
  saleAttrAndValueName.value = '' // 添加完成后置为空，防止在再次添加
}

function addSaleVal(row: saleAttrType) {
  // 输入框blur失去焦点时 添加销售属性值
  // saleAttr.value[index].spuSaleAttrValueList.push({
  const { baseSaleAttrId, saleAttrValueName, saleAttrName } = row
  if (saleAttrValueName?.trim() === '') {
    ElMessage.error('属性值不能为空')
    return
  } else {
    // const repeat = row.spuSaleAttrValueList.find((item) => { // 使用find查找是否有重复元素，如果有，就不添加 find返回布尔值
    //   return item.saleAttrValueName === saleAttrValueName
    // })
    const repeat = row.spuSaleAttrValueList.some((item) => {
      // 使用some查找是否有重复元素，有一项满足就返回true
      return item.saleAttrValueName === saleAttrValueName
    })

    if (repeat) {
      ElMessage.error('该属性值已经存在于销售属性列表中')
      return
    }
    row.spuSaleAttrValueList.push({
      baseSaleAttrId,
      saleAttrValueName: saleAttrValueName!,
      saleAttrName,
    }) // 对于可选属性，可能为undefined,所以需要用到断言  类型断言saleAttrValueName: saleAttrValueName as string ，saleAttrValueName: saleAttrValueName! 非空断言
  }
  row.flag = false
}

function toEdit(row: saleAttrType, index: number) {
  // 点击添加时，收集数据
  row.flag = true
  nextTick(() => {
    inpRefArr.value[index].focus()
  })
  row.saleAttrValueName = ''
}

async function submit() {
  // 保存按钮，提交
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    // 整理spu商品图片格式，调整为imgName,imgUrl格式
    return {
      imgName: item.name,
      imgUrl: item.response?.data || item.url, // 这里判断是否是新增的图片，如果有就用新增的图片，否则就用原本的图片
    }
  })
  spuParams.value.spuSaleAttrList = saleAttr.value
  if (spuParams.value.spuSaleAttrList.length === 0) {
    ElMessage.error('请添加销售属性')
    return
  }
  const res = await addSpuOrUpdateSpu(spuParams.value)
  if (res.code === 200) {
    ElMessage.success(spuParams.value.id ? '修改成功' : '添加成功')
    emits('changeScene', {
      flag: 0,
      params: spuParams.value.id ? 'update' : 'add',
    }) // 添加或者修改成功后触发事件告诉父组件，从新获取数据,并告诉组件是更新还是新增
    spuParams.value = {
      // 保存或者更新成功后清空数据
      category3Id: '',
      spuName: '',
      description: '',
      spuImageList: [],
      spuSaleAttrList: [],
      tmId: '',
    }
    // parent.getSpuData() // 调用父组件的方法,重新获取数据
  }
}
async function addSpuInit(category3Id: number) {
  // 添加销售属性时，初始化数据  ，category3Id是父组件传递过来的
  spuParams.value = {
    // 每次添加前清空数据
    id: 0,
    category3Id: '',
    spuName: '',
    description: '',
    spuImageList: [],
    spuSaleAttrList: [],
    tmId: '',
  }
  imgList.value = [] // 清空spu图片列表
  saleAttr.value = [] // 清空已有销售属性列表
  saleAttrAndValueName.value = '' // 清空已选择的销售属性
  spuParams.value.category3Id = category3Id // 接受父组件传递的3级分类id
  const res = await getTrademarkList() // 所有品牌的数据
  AllTrademarkOptions.value = res.data
  const allSaleAttr = await getBaseSaleAttrList() // 全部的销售属性
  baseAttr.value = allSaleAttr.data
}

defineExpose({ getHasSpuData, addSpuInit }) // 子组件导出方法，以供父组件使用,父组件通过ref.value.addSpuInit()来调用子组件方法
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
        <el-input
          v-model="spuParams.description"
          type="textarea"
          placeholder="请输入描述"
        />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="imgList"
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
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
          <img class="w-1/2 h-full" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          v-model="saleAttrAndValueName"
          :placeholder="
            unSelectSaleAttr.length > 0
              ? `还有${unSelectSaleAttr.length}条未选择`
              : '无'
          "
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :value="`${item.id}:${item.name}`"
            :label="item.name"
          />
        </el-select>
        <el-button
          type="primary"
          icon="Plus"
          class="ml-3"
          :disabled="!saleAttrAndValueName"
          @click="addSaleAttr"
        >
          添加销售属性
        </el-button>
        <el-table border class="mt-5" :data="saleAttr">
          <el-table-column
            label="序号"
            width="100px"
            type="index"
            align="center"
          />
          <el-table-column
            label="属性名"
            width="130px"
            prop="saleAttrName"
            align="center"
          />
          <el-table-column
            label="属性值"
            align="center"
            prop="spuSaleAttrValueList"
          >
            <template #default="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                type="success"
                class="mx-2"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.flag"
                :ref="(vc: any) => (inpRefArr[$index] = vc)"
                v-model="row.saleAttrValueName"
                placeholder="请输入属性值"
                size="small"
                style="width: 100px"
                @blur="addSaleVal(row)"
              />
              <el-button
                v-else
                icon="Plus"
                size="small"
                type="primary"
                class="ml-3"
                @click="toEdit(row, $index)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130px" align="center">
            <template #default="{ $index }">
              <el-button
                type="danger"
                icon="Delete"
                @click="saleAttr.splice($index, 1)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
