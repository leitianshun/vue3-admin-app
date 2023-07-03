<script setup lang='ts'>
import { getSpuList } from '@/api/product/spu/spu'

const show = ref<boolean>(true)
const currentPage = ref<number>(1)
const total = ref<number>(0)
const spuData = ref([])
const pageSize = ref<number>(10)
const categoryStore = useCategoryStore()
function handleEdit() {}
function handleDelete() {}
function getInfo() {}
function handleSizeChange(size: number) {
  pageSize.value = size
}
function handleCurrentChange(page: number) {
  currentPage.value = page // 这里也可以不写，因为双向绑定了，页数会自动改变
}
async function getSpuData() {
  const res = await getSpuList(currentPage.value, pageSize.value, categoryStore.category3Id)
  spuData.value = res.data.records
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
        <el-table-column prop="description" label="SPU描述" align="center">
          <!-- <template #default="{ row }">
            <div>
              <el-button v-for="item in row.attrValueList" :key="item.id" type="primary" size="small">
                {{ item.valueName }}
              </el-button>
            </div>
          </template> -->
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="primary" icon="Plus" @click="handleEdit(row)" />
            <el-button type="warning" icon="Edit" @click="handleEdit(row)" />
            <el-button type="info" icon="InfoFilled" @click="getInfo(row)" />
            <el-popconfirm :title="`是否确认删除${row.attrName}?`" @confirm="handleDelete(row)">
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
