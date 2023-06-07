<script setup lang='ts'>
import type { FormInstance, FormRules, UploadFile, UploadProps } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import type { recordsData, tradmerk } from '@/api/product/trademark/type'
import { delTradmark } from '@/api/product/trademark/trademark'

const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const tableData = ref<recordsData>([])
const dialogFormVisible = ref<boolean>(false)
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const disabled = ref(false)
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' },
    { min: 2, max: 15, message: '品牌名称长度在2-15之间', trigger: 'blur' }],
  logoUrl: [
    { required: true, message: '请上传品牌LOGO', trigger: 'blur' },
  ],
})
const formData = ref<tradmerk>({
  tmName: '',
  logoUrl: '',
})
function handleSizeChange(size: number) {
  console.log(size)
  pageSize.value = size
  getData()
}
function handleCurrentChange(page: number) {
  console.log(page)
  currentPage.value = page
  getData()
}
function getData() {
  getTrademark(currentPage.value, pageSize.value).then((res) => {
    console.log(res)
    tableData.value = res.data.records
  })
}
function addTradmark() {
  dialogFormVisible.value = true
}
function deleteTradmark(row: any) {
  console.log(row)
  ElMessageBox.confirm(
    '是否确认删除?',
    '提示',
    {
      type: 'warning',
      icon: markRaw(Delete),
    },
  ).then(() => {
    delTradmark(row.id).then((res) => {
      ElMessage.error(res.data)
    }).then(() => {
      getData()
    })
  })
}
function handlePictureCardPreview(file: UploadFile) {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
function handleDownload(file: UploadFile) {
  console.log(file)
}
function handleRemove(file: UploadFile) {
  console.log(file)
}

const onSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  formData.value.logoUrl = URL.createObjectURL(uploadFile.raw!)
}
onMounted(() => {
  getData()
})
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <el-button class="button" type="primary" icon="Plus" @click="addTradmark">
        添加品牌
      </el-button>
    </template>
    <el-table :data="tableData" border height="calc(100vh - 300px)">
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
          <el-button type="danger" icon="Delete" @click="deleteTradmark(row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="添加品牌" align-center>
      <el-form ref="ruleFormRef" :model="formData" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="formData.tmName" autocomplete="off" class="!w-1/2" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="" prop="logoUrl">
          <el-upload action="#" list-type="picture-card" :auto-upload="false" @on-success="onSuccess">
            <div class="text-center">
              <el-icon><Plus /></el-icon>
              <div>
                点击上传图片
              </div>
            </div>
            <!-- <template #tip>
              <div>
                点击上传图片
              </div>
            </template> -->
            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in /></el-icon>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <el-icon><Download /></el-icon>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image">
          </el-dialog>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
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
  </el-card>
</template>

<style scoped lang='scss'>
</style>
