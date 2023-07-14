<script setup lang='ts'>
import type { skuInfoObjType } from '@/api/product/spu/type'

const skuData = ref<skuInfoObjType[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)

async function getSkuData(page = 1) { // 获取sku分页数据
  currentPage.value = page
  const res = await getSkuList(currentPage.value, pageSize.value)
  if (res.code === 200)
    skuData.value = res.data.records
  total.value = res.data.total
  console.log(res)
}
getSkuData()
async function deleteSku(skuId: number) {
  const res = await delSku(skuId)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getSkuData(skuData.value.length > 1 ? currentPage.value : currentPage.value - 1)
  }
  else {
    ElMessage.error(res.data!)
  }

  console.log(res)
}
</script>

<template>
  <div>
    <el-card class="">
      <el-table :data="skuData" border stripe height="calc(100vh - 210px)">
        <el-table-column type="index" width="80" label="序号" align="center" />
        <el-table-column label="名称" prop="skuName" show-overflow-tooltip align="center" />
        <el-table-column label="描述" show-overflow-tooltip prop="skuDesc" align="center" />
        <el-table-column label="默认图片" align="center" prop="skuDefaultImg">
          <template #default="{ row, $index }">
            <img :src="row.skuDefaultImg" class="w-25 h-25" alt="">
          </template>
        </el-table-column>
        <el-table-column label="重量(g)" align="center" prop="weight" />
        <el-table-column label="价格(元)" align="center" prop="price" />
        <el-table-column label="操作" width="260" fixed="right" align="center">
          <template #default="{ row, $index }">
            <el-button :type="row.isSale === 0 ? 'success' : 'warning'" :icon="row.isSale === 0 ? 'Top' : 'Bottom'" />
            <el-button type="primary" icon="Edit" />
            <el-button type="info" icon="InfoFilled" />
            <el-popconfirm :title="`是否确认删除${row.skuName}?`" @confirm="deleteSku(row.id)">
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
        @size-change="getSkuData"
        @current-change="getSkuData"
      />
    </el-card>
  </div>
</template>

<style scoped lang='scss'>
</style>
