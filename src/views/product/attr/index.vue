<script setup lang='ts'>
import type { attrObj } from '@/api/product/attr/type'
import { addAttr } from '@/api/product/attr/attr'

const show = ref<boolean>(true)

function handleDelete(row: any) {}
const categoryStore = useCategoryStore()
const addPrams = ref<attrObj>({
  attrName: '', // 属性名称
  attrValueList: [
    // {
    // valueName: '', // 属性值
  // }
  ],
  categoryId: '', // 三级分类id
  categoryLevel: 3, // 代表的是三级分类，也就是第三级
})

function handleUpload(row: any) {
  show.value = false
  Object.assign(addPrams.value, row)
  console.log(row)
}
function addAttrs() {
  show.value = false
  addPrams.value.categoryId = categoryStore.category3Id
}

function addAttrValue() {
  addPrams.value.attrValueList.push({ valueName: '' })
}
function deleteAttrVal(index: number) {
  addPrams.value.attrValueList.splice(index, 1)
}
async function save() {
  const res = await addAttr(addPrams.value)
  if (res.code === 200)
    show.value = true
  ElMessage.success(addPrams.value.id ? '修改成功' : '添加成功')
  console.log(res)
}
function cancel() {
  show.value = true
  addPrams.value.attrName = ''
  addPrams.value.attrValueList = []
  addPrams.value.id = ''
}
</script>

<template>
  <div>
    <Category :show="show" />
    <el-card class="mt-3">
      <div v-show="show">
        <!-- 通过判断是否有三级分类id 决定按钮的禁用  也可以写成 !categoryStore.category3Id 来判断 -->
        <el-button icon="Plus" type="primary" :disabled="categoryStore.category3Id ? false : true" @click="addAttrs ">
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
              <el-button type="warning" icon="Edit" @click="handleUpload(row)" />
              <el-button type="danger" icon="Delete" @click="handleDelete(row)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!show">
        <el-form :inline="true">
          <el-form-item label="属性名称" prop="attrName">
            <el-input v-model="addPrams.attrName" placeholder="请输入属性名称" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus" :disabled="!addPrams.attrName" @click="addAttrValue">
          添加属性名称
        </el-button>
        <el-button type="info" icon="Close" @click="cancel">
          取消
        </el-button>
        <el-table border class="my-5" :data="addPrams.attrValueList">
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column label="属性值名称" prop="valueName" align="center">
            <template #default="{ row }">
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" />
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" align="center">
            <template #default="{ row, $index }">
              <el-button type="danger" icon="Delete" @click="deleteAttrVal($index)" />
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save">
          保存
        </el-button>
        <el-button type="info" @click="cancel ">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang='scss'>
</style>
