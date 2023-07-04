<script setup lang='ts'>
import { deleteSpu, getSpuInfo, getSpuList } from '@/api/product/spu/spu'
import type { recordsDataArr } from '@/api/product/spu/type'

const show = ref<boolean>(true)
const currentPage = ref<number>(1)
const total = ref<number>(0)
const spuData = ref<recordsDataArr>([])
const pageSize = ref<number>(10)
const categoryStore = useCategoryStore()
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: '小米',
  },
  {
    value: 'Option2',
    label: '华为',
  },
  {
    value: 'Option3',
    label: '苹果',
  },
]
async function handleEdit(id: number) {
  // show.value = false
  const res = await getSpuInfo(id)
  console.log(res)
}
async function handleDelete(id: number) {
  const res = await deleteSpu(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getSpuData(spuData.value.length > 1 ? currentPage.value : currentPage.value - 1)
  }
  else {
    ElMessage.error(res.data as string)
  }
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
async function getSpuData(page = 1) {
  currentPage.value = page
  const res = await getSpuList(currentPage.value, pageSize.value, categoryStore.category3Id)
  if (res.code === 200)
    spuData.value = res.data.records
  currentPage.value = res.data.current
  total.value = res.data.total
  console.log(res)
}
watch(() => categoryStore.category3Id, () => {
  spuData.value = []
  if (!categoryStore.category3Id) // 确保有3级分类id在发送请求
    return
  getSpuData()
})
function addSpu() {
  show.value = false
}
function onSuccess() {}
function beforeUpload() {}
</script>

<template>
  <div>
    <category :show="show" />
    <el-card class="mt-5">
      <div v-show="show">
        <el-button type="primary" icon="Plus" :disabled="!categoryStore.category3Id" @click="addSpu">
          添加SPU
        </el-button>
        <el-table :data="spuData" border height="calc(100vh - 370px)" class="mt-5">
          <el-table-column type="index" width="80" align="center" label="序号" />
          <el-table-column prop="spuName" label="SPU名称" align="center" />
          <el-table-column prop="description" label="SPU描述" align="center" />
          <!-- show-overflow-tooltip 表格内容溢出隐藏 -->
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button type="primary" icon="Plus" title="添加SKU" @click="handleEdit(row)" />
              <el-button type="warning" icon="Edit" title="修改SPU" @click="handleEdit(row.id)" />
              <el-button type="info" icon="View" title="查看SKU列表" @click="getInfo(row)" />
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
        <!-- @current-change="getSpuData" 这里可以直接调用函数 -->
      </div>
      <div v-show="!show">
        <el-form>
          <el-form-item label="spu名称">
            <el-input placeholder="请输入spu名称" />
          </el-form-item>
          <el-form-item label="spu品牌">
            <el-select v-model="value" placeholder="请选择品牌">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="spu描述">
            <el-input type="textarea" placeholder="请输入描述" />
          </el-form-item>
          <el-form-item label="spu图片">
            <el-upload
              class="avatar-uploader"
              action="/api/admin/product/fileUpload" list-type="picture-card"
              :on-success="onSuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <div v-else class="text-center">
                <el-icon><Plus /></el-icon>
                <div>
                  点击上传图片
                </div>
              </div>
            </el-upload>
          </el-form-item>
          <el-button type="primary">
            确定
          </el-button>
          <el-button @click="show = true">
            取消
          </el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang='scss'>
</style>
