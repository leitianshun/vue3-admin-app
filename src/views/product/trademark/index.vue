<script setup lang='ts'>
import type { UploadFile, UploadProps } from 'element-plus'
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
const ruleFormRef = ref()
const total = ref<number>(0)
const uploadRef = ref()
// watch([currentPage, pageSize], ([n1, n2], [o1, o2]) => {
//   getData()
// })
const rules = reactive({
  tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' },
    { min: 2, max: 15, message: '品牌名称长度在2-15之间', trigger: 'blur' }],
  logoUrl: [
    // { required: true, message: '请上传品牌LOGO', trigger: 'blur' },
    { required: true, validator: logoUrlRuleFun },
  ],
})
function logoUrlRuleFun(rule: any, value: any, callback: any) {
  if (value)
    callback()
  else
    callback(new Error('请上传品牌LOGO'))
}

const formData = ref<tradmerk>({
  tmName: '',
  logoUrl: '',
})
function handleSizeChange(size: number) {
  pageSize.value = size
  getData()
}
function handleCurrentChange(page: number) {
  currentPage.value = page // 这里也可以不写，因为双向绑定了，页数会自动改变
  getData()
}
function getData() { // 这可以写为getData(page = 1){ currentPage.value = page} 当切换size时自动获取第一页的数据
  getTrademark(currentPage.value, pageSize.value).then((res) => {
    if (res.code === 200) {
      tableData.value = res.data.records
      total.value = res.data.total
    }
  })
}
function handleTradmark(row?: tradmerk) {
  dialogFormVisible.value = true
  nextTick(() => {
    ruleFormRef.value?.clearValidate()
  })
  if (row && row.id) {
    formData.value.id = row.id
    formData.value.tmName = row.tmName
    formData.value.logoUrl = row.logoUrl
    // Object.assign(formData.value, row)
  }
  else {
    formData.value = {} as tradmerk
  }
}

async function submitForm() {
  await ruleFormRef.value?.validate()
  addTradmark(formData.value).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(!formData.value.id ? '添加成功' : '修改成功') // 这里也可以通过formData.id来判断类型是增加还是修改
      uploadRef.value.clearFiles()
      getData()
      dialogFormVisible.value = false
    }
    else {
      ElMessage.error(!formData.value.id ? '添加失败' : '修改失败') // 这里也可以通过formData.id来判断类型是增加还是修改
      dialogFormVisible.value = false
    }
  }).catch(() => {
    dialogFormVisible.value = false
  })
  console.log(formData.value)
}
function dialogFormVisibleClose() {
  dialogFormVisible.value = false
  formData.value = {} as tradmerk
  ruleFormRef.value?.clearValidate()
}

function deleteTradmark(row: any) {
  ElMessageBox.confirm(
    `是否确认删除${row.tmName}?`,
    '提示',
    {
      type: 'warning',
      icon: markRaw(Delete),
    },
  ).then(() => {
    delTradmark(row.id).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success('操作成功')
        getData() // getData(tableData.value.length>1 ? pageSize.value : pageSize.value - 1)  //如果当前页有数据，就用当前页，否则获取上一页的数据
      }
      else {
        ElMessage.error(res.data)
      }
    }).catch((err) => {
      return Promise.reject(err)
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
function handleRemove() {
  uploadRef.value.clearFiles()
}

const onSuccess: UploadProps['onSuccess'] = (
  response,
) => {
  if (response.code === 200) {
    ruleFormRef.value?.clearValidate('logoUrl')
    ElMessage.success('上传成功')
    formData.value.logoUrl = response.data
  }
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isLimit = rawFile.size / 1024 / 1024 < 1
  const isImg = rawFile.type === 'image/jpg' || rawFile.type === 'image/png' || rawFile.type === 'image/jpeg'
  if (!isLimit) {
    ElMessage.error('图片大小不能超过1m')
    return false
  }
  if (!isImg) {
    ElMessage.error('上传图片格式为: png,jpeg,jpg')
    return false
  }
  return true
}
onMounted(() => {
  getData()
})
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <el-button class="button" type="primary" icon="Plus" @click="handleTradmark">
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
          <el-button type="warning" icon="Edit" @click="handleTradmark(row)" />
          <el-button type="danger" icon="Delete" @click="deleteTradmark(row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" :title="!formData.id ? '添加品牌' : '修改品牌'" align-center>
      <el-form ref="ruleFormRef" :model="formData" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="formData.tmName" autocomplete="off" class="!w-1/2" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="" prop="logoUrl">
          <el-upload ref="uploadRef" action="/api/admin/product/fileUpload" list-type="picture-card" :on-success="onSuccess" :limit="1" :before-upload="beforeUpload">
            <img v-if="formData.logoUrl && formData.id" :src="formData.logoUrl" class="w-full h-full p-3" alt="">
            <div v-else class="text-center">
              <el-icon><Plus /></el-icon>
              <div>
                点击上传图片
              </div>
            </div>
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
                    @click="handleRemove()"
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
          <el-button @click="dialogFormVisibleClose">取消</el-button>
          <el-button type="primary" @click="submitForm ">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 这里可以直接绑定获取数据的函数 v-model:current-page="getData" -->
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
</template>

<style scoped lang='scss'>
</style>
