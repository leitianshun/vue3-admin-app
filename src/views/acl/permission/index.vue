<script setup lang="ts">
import type { addOrUpdateMenuParam, menuObj } from '@/api/acl/menu/type'

const allMenuList = ref<menuObj[]>([]) // 存储所有菜单列表数据
const dialogVisible = ref<boolean>(false)
const menuParams = ref<addOrUpdateMenuParam>({
  // 收集添加或更新菜单参数
  // name: '',
  // code: '',
})
const form = ref()
const rules = ref({
  // 表单校验规则
  name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
  code: [{ required: true, message: '请填写属性值', trigger: 'blur' }],
})

onMounted(() => {
  getAllMenuList()
})

async function getAllMenuList() {
  // 获取所有的菜单列表
  const res = await getAllMenu()
  if (res.code === 200) allMenuList.value = res.data
}

function addMenu(row: menuObj) {
  // 添加菜单
  dialogVisible.value = true
  menuParams.value = {}
  menuParams.value.level = row.level + 1 // level,表示要添加的菜单层级， 添加菜单时，添加到当前层级的下一级菜单
  menuParams.value.pid = row.id // 表示给谁添加
}
function update(row: menuObj) {
  // 更新菜单
  dialogVisible.value = true
  Object.assign(menuParams.value, row)
}

async function onDelMenu(row: menuObj) {
  // 删除菜单
  await ElMessageBox.confirm(`你确定删除${row.name}?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const res = await delMenu(row.id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getAllMenuList()
  } else {
    ElMessage.error(res.data)
  }
}
async function submit() {
  // 添加或更新菜单
  const res = await addOrUpdateMenu(menuParams.value)
  if (res.code === 200) getAllMenuList()
  ElMessage.success(menuParams.value.id ? '修改成功' : '添加成功')
  dialogVisible.value = false
}

function cancel() {
  // 取消
  dialogVisible.value = false
  form.value.clearValidate()
}
</script>

<template>
  <el-card>
    <el-table
      :data="allMenuList"
      style="width: 100%"
      row-key="id"
      :expand-row-keys="['1']"
      border
      height="calc(100vh - 160px)"
    >
      <el-table-column prop="name" label="名称" align="center" width="160px" />
      <el-table-column prop="id" label="id" align="center" />
      <el-table-column prop="code" label="权限" align="center" />
      <el-table-column prop="level" label="层级" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column prop="updateTime" label="修改时间" align="center" />
      <el-table-column prop="address" label="操作" align="center" width="370px">
        <template #default="{ row, $index }">
          <el-button
            type="success"
            size="default"
            icon="Plus"
            v-has="`btn.Permission.add`"
            :disabled="row.level === 4"
            @click="addMenu(row)"
          >
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            v-has="`btn.Permission.update`"
            size="default"
            icon="Edit"
            :disabled="$index === 0"
            @click="update(row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="default"
            v-has="`btn.Permission.remove`"
            icon="Delete"
            :disabled="row.level === 1"
            @click="onDelMenu(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="menuParams.id ? '编辑菜单' : '添加菜单'"
      width="30%"
    >
      <el-form ref="form" label-width="80px" :model="menuParams" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="menuParams.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="权限值" prop="code">
          <el-input v-model="menuParams.code" placeholder="请输入权限值" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped lang="scss"></style>
