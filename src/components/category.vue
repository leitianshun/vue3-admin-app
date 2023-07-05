<script setup lang='ts'>
defineProps({
  scene: {
    type: Number,
    default: 0,
  },
})
const categoryStore = useCategoryStore()
function getC1Data() {
  categoryStore.getC1()
}

function handlerChange() {
  categoryStore.category2Id = ''
  categoryStore.category3Id = ''
  categoryStore.c2Data = []
  categoryStore.c3Data = []
  categoryStore.attrListData = []
  categoryStore.getC2()
}
function handlerChange2() {
  categoryStore.c3Data = []
  categoryStore.attrListData = []
  categoryStore.category3Id = ''
  categoryStore.getC3()
}

function handlerChange3() {
  // categoryStore.getAttrListData()
}

onMounted(() => {
  getC1Data()
})
</script>

<template>
  <div>
    <el-card>
      <!-- <el-row :span="24" justify="space-around" :gutter="10">
        <el-col :span="7" class="text-center flex">
          <span class="mr-3">一级分类</span>
          <el-select class="w-1/2">
            <el-option v-for="item in getCategory1Data" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-col>
        <el-col :span="7" class="text-center">
          <span class="mr-3">二级分类</span><el-select class="w-1/2" />
        </el-col>
        <el-col :span="7" class="text-center">
          <span class="mr-3">三级分类</span><el-select class="w-1/2" />
        </el-col>
      </el-row> -->
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select v-model="categoryStore.category1Id" :disabled="scene === 1" @change="handlerChange">
            <el-option v-for="item in categoryStore.c1Data" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="categoryStore.category2Id" :disabled="scene === 1" @change="handlerChange2">
            <el-option v-for="item in categoryStore.c2Data" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="categoryStore.category3Id" :disabled="scene === 1" @change="handlerChange3">
            <el-option v-for="item in categoryStore.c3Data" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang='scss'>
</style>
