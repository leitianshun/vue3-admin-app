<script setup lang='ts'>
import { deleteSpu, getSpuList } from '@/api/product/spu/spu'
import type { recordsDataArr } from '@/api/product/spu/type'

const show = ref<boolean>(true)
const currentPage = ref<number>(1)
const total = ref<number>(0)
const spuData = ref<recordsDataArr>([])
const pageSize = ref<number>(10)
const categoryStore = useCategoryStore()
function handleEdit() {}
async function handleDelete(id: number) {
  const res = await deleteSpu(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getSpuData()
  }
  console.log(res)
}
function getInfo() {}
function handleSizeChange() {
  // pageSize.value = size
  getSpuData()
}
function handleCurrentChange() {
  // currentPage.value = page // 这里也可以不写，因为双向绑定了，页数会自动改变
  getSpuData()
}
async function getSpuData() {
  const res = await getSpuList(currentPage.value, pageSize.value, categoryStore.category3Id)
  if (res.code === 200)
    spuData.value = res.data.records
  currentPage.value = res.data.current
  total.value = res.data.total
  console.log(res)
}
watch(() => categoryStore.category3Id, () => {
  spuData.value = []
  if (!categoryStore.category3Id)
    return
  getSpuData()
})
</script>

<template>
  <div>
    <category :show="show" />
    <el-card class="mt-5">
      <el-button type="primary" icon="Plus">
        添加SPU
      </el-button>
      <el-table :data="spuData" border height="calc(100vh - 300px)" class="mt-5">
        <el-table-column type="index" width="80" align="center" label="序号" />
        <el-table-column prop="spuName" label="SPU名称" align="center" />
        <el-table-column prop="description" label="SPU描述" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="primary" icon="Plus" @click="handleEdit(row)" />
            <el-button type="warning" icon="Edit" @click="handleEdit(row)" />
            <el-button type="info" icon="InfoFilled" @click="getInfo(row)" />
            <el-popconfirm :title="`是否确认删除${row.spuName}?`" @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button type="danger" icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :background="true"
        class="my-5"
        :page-sizes="[10, 20, 50, 100]"
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang='scss'>
</style>
