<script setup lang="ts">
import spuForm from './spuForm.vue'
import sKuForm from './skuForm.vue'
import { deleteSpu, getSpuList } from '@/api/product/spu/spu'
import type {
  recordsDataArr,
  recordsDataObj,
  skuInfoObjType,
} from '@/api/product/spu/type'

const scene = ref<number>(0) // 场景切换控制
const currentPage = ref<number>(1)
const total = ref<number>(0)
const spuData = ref<recordsDataArr>([])
const pageSize = ref<number>(10)
const categoryStore = useCategoryStore()
const spu = ref()
const sku = ref()
const skuDialogVisible = ref<boolean>(false)
const skuInfo = ref<skuInfoObjType[]>([])

provide('getData', { getSpuData }) // 父组件提供方法，给子组件使用
async function handleEdit(row: recordsDataObj) {
  scene.value = 1
  // const res = await getSpuInfo(id)
  spu.value.getHasSpuData(row) // 调用子组件defineExpose的方法，并传值
}
async function handleDelete(id: number) {
  const res = await deleteSpu(id)
  if (res.code === 200) {
    ElNotification({
      title: '删除成功',
      message: '提示信息',
      type: 'success',
    })
    getSpuData(
      spuData.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage.error(res.data as string)
  }
}
function handleSizeChange() {
  // pageSize.value = size
  getSpuData()
}
// function handleCurrentChange() {
//   // currentPage.value = page // 这里也可以不写，因为双向绑定了，页数会自动改变
//   getSpuData()
// }
async function getSpuData(page = 1) {
  currentPage.value = page
  const res = await getSpuList(
    currentPage.value,
    pageSize.value,
    categoryStore.category3Id,
  )
  if (res.code === 200) spuData.value = res.data.records
  currentPage.value = res.data.current
  total.value = res.data.total
}
watch(
  () => categoryStore.category3Id,
  () => {
    spuData.value = []
    if (!categoryStore.category3Id)
      // 确保有3级分类id在发送请求
      return
    getSpuData()
  },
)
function addSpu() {
  // 添加spu
  scene.value = 1
  spu.value.addSpuInit(categoryStore.category3Id) // 调用子组件方法，传递3级分类id
}

interface eventType {
  flag: number
  params?: string
}
function handleChange(obj: eventType) {
  // 处理切换场景事件，解构出子组件出发事件的参数
  scene.value = obj.flag
  if (obj.params) getSpuData(obj.params === 'add' ? 1 : currentPage.value) // 如果是添加类型，那就获取第一页内容，否则如果是更新，那就留在当前页
}
function addSku(row: recordsDataObj) {
  // 添加sku
  scene.value = 2
  sku.value.addSkuInit(row)
}
async function handleView(row: recordsDataObj) {
  // 查看sku
  skuDialogVisible.value = true
  const res = await getSkuInfo(row.id!)
  if (res.code === 200) skuInfo.value = res.data
}
onBeforeUnmount(() => {
  // 组件销毁前，清空仓库数据
  categoryStore.$reset()
})
</script>

<template>
  <div>
    <category :scene="scene" />
    <el-card class="mt-5">
      <div v-show="scene === 0">
        <el-button
          v-has="`btn.Spu.add`"
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.category3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table
          :data="spuData"
          border
          height="calc(100vh - 370px)"
          class="mt-5"
        >
          <el-table-column
            type="index"
            width="80"
            align="center"
            label="序号"
          />
          <el-table-column prop="spuName" label="SPU名称" align="center" />
          <el-table-column prop="description" label="SPU描述" align="center" />
          <!-- show-overflow-tooltip 表格内容溢出隐藏 -->
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button
                type="primary"
                icon="Plus"
                title="添加SKU"
                v-has="`btn.Spu.addsku`"
                @click="addSku(row)"
              />
              <el-button
                type="warning"
                icon="Edit"
                v-has="`btn.Spu.update`"
                title="修改SPU"
                @click="handleEdit(row)"
              />
              <el-button
                type="info"
                icon="View"
                title="查看SKU列表"
                v-has="`btn.Spu.skus`"
                @click="handleView(row)"
              />
              <el-popconfirm
                :title="`是否确认删除${row.spuName}?`"
                @confirm="handleDelete(row.id)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    v-has="`btn.Spu.delete`"
                    icon="Delete"
                  />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog v-model="skuDialogVisible" title="SKU列表" width="50%">
          <el-table :data="skuInfo" border stripe height="calc(100vh - 200px)">
            <el-table-column
              type="index"
              label="序号"
              width="80"
              align="center"
            />
            <el-table-column label="sku名字" prop="skuName" align="center" />
            <el-table-column label="sku价格" prop="price" align="center" />
            <el-table-column label="sku重量" prop="weight" align="center" />
            <el-table-column
              label="sku图片"
              prop="skuDefaultImg"
              align="center"
            >
              <template #default="{ row }">
                <img :src="row.skuDefaultImg" class="w-24 h-25" alt="" />
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :background="true"
          class="my-5"
          :page-sizes="[10, 20, 50, 100]"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="getSpuData"
        />
        <!-- @current-change="getSpuData" 这里可以直接调用函数 -->
      </div>
      <div v-show="scene === 1">
        <spuForm ref="spu" @change-scene="handleChange" />
      </div>
      <div v-show="scene === 2">
        <sKuForm ref="sku" @change-scene="handleChange" />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
