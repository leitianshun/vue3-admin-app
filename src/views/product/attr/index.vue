<script setup lang='ts'>
const tableData = ref([])
function handleTradmark() {}
function deleteTradmark() {}
</script>

<template>
  <div>
    <el-card>
      <el-row :span="24" justify="space-around" :gutter="10">
        <el-col :span="6" class="text-center ">
          <span class="mr-3">一级分类</span> <el-select />
        </el-col>
        <el-col :span="6" class="text-center">
          <span class="mr-3">二级分类</span><el-select />
        </el-col>
        <el-col :span="6" class="text-center">
          <span class="mr-3">三级分类</span><el-select />
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt-3">
      <el-button icon="Plus" type="primary">
        添加平台属性
      </el-button>
      <el-table :data="tableData" border height="calc(100vh - 300px)" class="mt-5">
        <el-table-column type="index" width="80" align="center" label="序号" />
        <el-table-column prop="tmName" label="属性名称" align="center" />
        <el-table-column prop="tmName" label="属性值名称" align="center" />
        <el-table-column label="操作" align="center">
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
