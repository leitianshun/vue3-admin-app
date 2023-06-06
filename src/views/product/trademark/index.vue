<script setup lang='ts'>
import { getTrademark } from '@/api/product/trademark/type'

const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const tableData = ref([])
function handleSizeChange() {}
function handleCurrentChange() {}
onMounted(() => {
  getTrademark(1, 5).then((res) => {
    console.log(res)
    tableData.value = res.data.records
  })
})
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <el-button class="button" type="primary" icon="Plus">
        添加品牌
      </el-button>
    </template>
    <el-table :data="tableData" border>
      <el-table-column type="index" width="80" align="center" label="序号" />
      <el-table-column prop="tmName" label="品牌名称" align="center" />
      <el-table-column prop="logoUrl" label="品牌LOGO" align="center">
        <template #default="{ row }">
          <img :src="row.logoUrl" class="w-30 h-30" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="品牌操作" label="品牌操作" align="center">
        <template #default="{ row }">
          <el-button type="warning" icon="Edit" />
          <el-button type="danger" icon="Delete" />
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="flex justify-center p-3"> -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="true"
      class="my-5"
      :page-sizes="[10, 20, 50, 100]"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- </div> -->
  </el-card>
</template>

<style scoped lang='scss'>
</style>
