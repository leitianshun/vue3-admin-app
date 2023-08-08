<script setup lang="ts">
import type {
  addSkuParamType,
  recordsDataObj,
  saleAttrType,
  spuImageObj,
} from '@/api/product/spu/type'
import type { attrObj } from '@/api/product/attr/type'

const emits = defineEmits(['changeScene'])

const skuParams = ref<addSkuParamType>({
  // 添加sku参数类型
  // 添加sku参数类型
  category3Id: '', // 三级分类id
  spuId: '', // 已有spu id
  tmId: '', // 品牌id
  skuName: '', // sku名称
  price: '', // sku价格
  weight: '', // 重量
  skuDesc: '', // 描述
  skuDefaultImg: '', // sku默认图片
  skuAttrValueList: [
    // 平台属性的收集
    // {
    //   attrId: '', // 平台属性id
    //   valueId: '', // 属性值
    // },
  ],
  skuSaleAttrValueList: [
    // 销售属性
    // {
    //   saleAttrId: '', // 销售属性id
    //   saleAttrValueId: '', // 属性值
    // },
  ],
})
const formRef = ref()
const tableRef = ref()
const spuImgData = ref<spuImageObj[]>([]) // 商品图片
const hasSaleAttr = ref<saleAttrType[]>([]) // 已有的销售属性
const attrListArr = ref<attrObj[]>([]) // 平台属性
const categoryStore = useCategoryStore()

function cancel() {
  emits('changeScene', { flag: 0 })
}

async function addSkuInit(row: recordsDataObj) {
  console.log(row)
  skuParams.value.category3Id = row.category3Id
  skuParams.value.tmId = row.tmId
  skuParams.value.spuId = row.id! // id 是可选属性，可能为undefined，需要非空断言
  const imgData = await getSpuImage(row.id!) // spu对应商品图片   as 是类型断言    !是非空断言 意思是不会为空，undefined
  const SaleAttr = await getSpuSaleAttrList(row.id as number) // 类型断言 row.id as number 因为id是可选属性，可能为undefined,所以需要断言为number，此处还可以写为 row.id!, '!'是非空断言，意思就是row.id不为空,undefined
  const attrList = await getAttrList(
    categoryStore.category1Id as number,
    categoryStore.category2Id as number,
    categoryStore.category3Id as number,
  )
  spuImgData.value = imgData.data // spu照片
  hasSaleAttr.value = SaleAttr.data // 已有的销售属性
  attrListArr.value = attrList.data // 平台属性
}
function setDefault(row: any) {
  // 设置sku默认图片
  skuParams.value.skuDefaultImg = row.imgUrl
  tableRef.value.clearSelection() // 清空所有选中状态

  // spuImgData.value.forEach((item: any) => {  //遍历，将所有的选中状态清空
  //   tableRef.value.toggleRowSelection(item, false)
  // })
  tableRef.value.toggleRowSelection(row, true) // 第二个参数也可以传index
}

async function onSubmit() {
  skuParams.value.skuAttrValueList = attrListArr.value.reduce(
    (prev: any, item: any) => {
      // 对已选择的平台属性进行遍历，返回出属性值和属性id
      if (item.attrIdAndValId) {
        // 这里要先判断是否存在这个属性
        const [attrId, valueId] = item.attrIdAndValId.split(':')
        prev.push({ attrId, valueId })
      }
      return prev
    },
    [],
  ) // 表示的是prev,初始值为空数组

  // 对选中的销售属性数据进行格式化，取出销售属性id，以及属性值
  skuParams.value.skuSaleAttrValueList = hasSaleAttr.value.reduce(
    (prev: any, item: any) => {
      // 对已选择的平台属性进行遍历，返回出属性值和属性id
      if (item.saleIdAndValId) {
        // 这里要先判断是否存在这个属性
        const [saleAttrId, saleAttrValueId] = item.saleIdAndValId.split(':')
        prev.push({
          saleAttrId,
          saleAttrValueId,
        })
      }
      return prev
    },
    [],
  )
  if (attrListArr.value.length !== skuParams.value.skuAttrValueList?.length) {
    // 判断平台属性是否全部选择
    ElMessage.error('请选择平台属性')
    return
  }
  if (
    hasSaleAttr.value.length !== skuParams.value.skuSaleAttrValueList?.length
  ) {
    // 判断销售属性是否全部选择
    ElMessage.error('请选择销售属性')
    return
  }
  const res = await addSku(skuParams.value)
  if (res.code === 200) {
    ElMessage.success('添加成功！')
    emits('changeScene', { flag: 0 })
  } else {
    ElMessage.error('添加失败！')
  }
}
defineExpose({ addSkuInit })
</script>

<template>
  <div>
    <el-form ref="formRef" label-width="120px">
      <el-form-item label="sku名称">
        <el-input v-model="skuParams.skuName" placeholder="SKU名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuParams.price"
          type="number"
          placeholder="价格(元)"
        />
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input
          v-model="skuParams.weight"
          placeholder="重量(克)"
          type="number"
        />
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input
          v-model="skuParams.skuDesc"
          placeholder="sku描述"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="auto" :inline="true">
          <el-form-item
            v-for="item in attrListArr"
            :key="item.id"
            :label="item.attrName"
            class="mt-5"
          >
            <!-- size="small" -->
            <el-select
              v-model="item.attrIdAndValId"
              value-key=""
              placeholder=""
              clearable
              filterable
            >
              <el-option
                v-for="item2 in item.attrValueList"
                :key="item2.id"
                :label="item2.valueName"
                :value="`${item.id}:${item2.id!}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="auto" :inline="true">
          <el-form-item
            v-for="item in hasSaleAttr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select
              v-model="item.saleIdAndValId"
              value-key=""
              placeholder=""
              clearable
              filterable
            >
              <el-option
                v-for="item2 in item.spuSaleAttrValueList"
                :key="item2.id"
                :label="item2.saleAttrValueName"
                :value="`${item.id}:${item2.id!}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table ref="tableRef" :data="spuImgData" border stripe>
          <el-table-column type="selection" width="100" align="center" />
          <!-- <el-table-column label="序号" type="index" width="100" /> -->
          <el-table-column label="图片" prop="imgUrl" align="center">
            <template #default="{ row }">
              <img :src="row.imgUrl" class="w-20 h-20" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button type="success" size="default" @click="setDefault(row)">
                设为默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
