<script setup lang='ts'>
// import type {category1Data} from '@/api/product/attr/type'

function handleTradmark() {}
function deleteTradmark() {}
const categoryStore = useCategoryStore()
</script>

<template>
  <div>
    <Category />
    <el-card class="mt-3">
      <!-- 通过判断是否有三级分类id 决定按钮的禁用  也可以写成 !categoryStore.category3Id 来判断 -->
      <el-button icon="Plus" type="primary" :disabled="categoryStore.category3Id ? false : true">
        添加平台属性
      </el-button>
      <el-table :data="categoryStore.attrListData" border height="calc(100vh - 300px)" class="mt-5">
        <el-table-column type="index" width="80" align="center" label="序号" />
        <el-table-column prop="attrName" label="属性名称" width="120" align="center" />
        <el-table-column prop="attrValueList" label="属性值名称" align="center">
          <template #default="{ row }">
            <div>
              <el-button v-for="item in row.attrValueList" :key="item.id" type="primary" size="small">
                {{ item.valueName }}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template #default="{ row }">
            <el-button type="warning" icon="Edit" @click="handleTradmark(row)" />
            <el-button type="danger" icon="Delete" @click="deleteTradmark(row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang='scss'>
</style>
