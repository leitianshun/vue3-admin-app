<script setup lang="ts">
import type { attrObj, attrValueListObj } from '@/api/product/attr/type'
import { addAttr, delAttr } from '@/api/product/attr/attr'

const scene = ref<number>(0)
const categoryStore = useCategoryStore()
const inpRefArr = ref<any>([])
async function handleDelete(row: attrObj) {
  const res = await delAttr(row.id as number)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    categoryStore.getAttrListData()
  }
}
const addPrams = ref<attrObj>({
  attrName: '', // 属性名称
  attrValueList: [
    // {
    // valueName: '', // 属性值
    // }
  ],
  categoryId: '', // 三级分类
  categoryLevel: 3, // 代表的是三级分类，也就是第三级
})

function handleEdit(row: any) {
  scene.value = 1
  Object.assign(addPrams.value, JSON.parse(JSON.stringify(row)))
}
function addAttrs() {
  scene.value = 1
  addPrams.value.categoryId = categoryStore.category3Id
}

function addAttrValue() {
  addPrams.value.attrValueList.push({ valueName: '', flag: true })
  nextTick(() => {
    inpRefArr.value[addPrams.value.attrValueList.length - 1].focus()
  })
}
function deleteAttrVal(index: number) {
  addPrams.value.attrValueList.splice(index, 1)
}
async function save() {
  if (addPrams.value.attrName === '') {
    ElMessage.error('属性名称不能为空')
    return
  }
  if (addPrams.value.attrValueList.length === 0) {
    ElMessage.error('属性值不能为空')
    return
  }
  const res = await addAttr(addPrams.value)
  if (res.code === 200) scene.value = 0
  ElMessage.success(addPrams.value.id ? '修改成功' : '添加成功')
  categoryStore.getAttrListData()
  console.log(res)
}
function cancel() {
  scene.value = 0
  addPrams.value.attrName = ''
  addPrams.value.attrValueList = []
  addPrams.value.id = ''
}

onBeforeUnmount(() => {
  // 组件销毁时，清空仓库数据
  categoryStore.$reset()
})

function toView(row: attrValueListObj, index: number) {
  if (row.valueName?.trim() === '') {
    // 判断输入值是否为空
    addPrams.value.attrValueList.splice(index, 1) // 如果为空，删除掉
    ElMessage.error('属性值不能为空')
    return
  }

  // const repeat = addPrams.value.attrValueList.find((item) => { // 判断属性值是否重复
  //   if (item !== row)  //这里注意一定要判断两个对象不相等,否则无法通过判断逻辑
  //     return item.valueName === row.valueName
  //   return false
  // })

  let repeat = false
  addPrams.value.attrValueList.map((item) => {
    if (item !== row && item.valueName === row.valueName)
      // 这里注意一定要判断两个对象不相等,否则无法通过判断逻辑
      repeat = true
    return false
  })

  if (repeat) {
    addPrams.value.attrValueList.splice(index, 1)
    ElMessage.error('属性值不能重复')
    return
  }

  row.flag = false
}
function toEdit(row: attrValueListObj, index: number) {
  row.flag = true
  nextTick(() => {
    // 获取更新后的dom
    inpRefArr.value[index].focus() // 获取焦点
  })
}

watch(
  () => categoryStore.category3Id,
  () => {
    categoryStore.attrListData = []
    if (!categoryStore.category3Id) return
    categoryStore.getAttrListData()
  },
)
</script>

<template>
  <div>
    <Category :scene="scene" />
    <el-card class="mt-3">
      <div v-show="scene === 0">
        <!-- 通过判断是否有三级分类id 决定按钮的禁用  也可以写成 !categoryStore.category3Id 来判断 -->
        <el-button
          icon="Plus"
          type="primary"
          :disabled="categoryStore.category3Id ? false : true"
          @click="addAttrs"
        >
          添加平台属性
        </el-button>
        <el-table
          :data="categoryStore.attrListData"
          border
          height="calc(100vh - 300px)"
          class="mt-5"
        >
          <el-table-column
            type="index"
            width="80"
            align="center"
            label="序号"
          />
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="120"
            align="center"
          />
          <el-table-column
            prop="attrValueList"
            label="属性值名称"
            align="center"
          >
            <template #default="{ row }">
              <div>
                <el-button
                  v-for="item in row.attrValueList"
                  :key="item.id"
                  type="primary"
                  size="small"
                >
                  {{ item.valueName }}
                </el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template #default="{ row }">
              <el-button type="warning" icon="Edit" @click="handleEdit(row)" />
              <el-popconfirm
                :title="`是否确认删除${row.attrName}?`"
                @confirm="handleDelete(row)"
              >
                <template #reference>
                  <el-button type="danger" icon="Delete" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称" prop="attrName">
            <el-input
              v-model="addPrams.attrName"
              placeholder="请输入属性名称"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!addPrams.attrName"
          @click="addAttrValue"
        >
          添加属性名称
        </el-button>
        <el-button type="info" icon="Close" @click="cancel">取消</el-button>
        <el-table border class="my-5" :data="addPrams.attrValueList">
          <el-table-column
            type="index"
            label="序号"
            width="100"
            align="center"
          />
          <el-table-column label="属性值名称" prop="valueName" align="center">
            <template #default="{ row, $index }">
              <el-input
                v-if="row.flag"
                :ref="(vc: any) => (inpRefArr[$index] = vc)"
                v-model="row.valueName"
                autofocus
                placeholder="请输入属性值名称"
                @blur="toView(row, $index)"
              />
              <div
                v-else
                class="p-2 w-full text-white bg-gradient-to-r from-yellow-200 via-blue-500 via-yellow-600 to-red-500"
                @click="toEdit(row, $index)"
              >
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" align="center">
            <template #default="{ $index }">
              <el-button
                type="danger"
                icon="Delete"
                @click="deleteAttrVal($index)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="addPrams.attrValueList.length === 0"
          @click="save"
        >
          保存
        </el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
