<script setup lang='ts'>
import type { recordsType } from '@/api/acl/user/type'

const table = ref()
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const userListData = ref<any>([])
const selectionList = ref([]) // 选中的列表
const userName = ref('') // 搜索参数，根据用户名
const drawerVisible = ref<boolean>(false) // 控制抽屉开关

async function getUsers(page = 1) { // 获取用户列表
  currentPage.value = page
  const res = await getUserList(currentPage.value, pageSize.value)
  if (res.code === 200)
    userListData.value = res.data.records
  total.value = res.data.total
  console.log(res)
}
onMounted(() => {
  getUsers()
})

function handleSizeChange() { // 切换每页数量回调 ，这里的参数已经双向绑定，只需要再次获取即可
  // pageSize.value = size
  getUsers()
}
function handleSelectionChange(item: any) { // 列表被选择回调,多选
  selectionList.value = item
}
function handleRole() { // 分配角色
  drawerVisible.value = true
}
function handleUpdate() { // 编辑
  drawerVisible.value = true
}
async function handleDelete(row: recordsType) { // 删除
  ElMessageBox.confirm(
    `是否确认删除${row.username}?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      delUser(row.id!).then((res) => {
        if (res.code === 200) {
          getUsers(userListData.value.length > 1 ? currentPage.value : currentPage.value - 1)
          ElMessage.success('删除成功！')
        }
        else {
          ElMessage.error(res.data!)
        }
      }).catch((err) => {
        console.error(err)
      })
    })
}

function batchDelete() { // 批量删除

}

function addUser() { // 添加用户
  drawerVisible.value = true
}
</script>

<template>
  <div>
    <el-card class="h-18">
      <el-form :inline="true" class="flex justify-between items-center ">
        <el-form-item label="用户名:">
          <el-input v-model="userName" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            搜索
          </el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt-5">
      <el-button type="primary" icon="Plus" @click="addUser">
        添加
      </el-button>
      <el-button type="danger" icon="Delete" :disabled="selectionList.length === 0" @click="batchDelete">
        批量删除
      </el-button>
      <el-table ref="table" :data="userListData" border stripe height="calc(100vh - 360px)" class="mt-5" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="100" align="center" />
        <el-table-column label="id" align="center" prop="id" />
        <el-table-column label="用户名字" align="center" prop="username" />
        <el-table-column label="用户名称" align="center" prop="name" />
        <el-table-column label="用户角色" align="center" prop="roleName" />
        <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip />
        <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip />
        <el-table-column label="操作" align="center" width="300px">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="User" @click="handleRole()">
              分配角色
            </el-button>
            <el-button type="primary" size="small" icon="Edit" @click="handleUpdate()">
              编辑
            </el-button>
            <el-button type="primary" size="small" icon="Delete" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer
        v-model="drawerVisible"
        size="35%"
        title="编辑用户"
        direction="rtl"
      >
        123
      </el-drawer>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :background="true"
        class="my-5"
        :page-sizes="[10, 20, 50, 100]"
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getUsers"
      />
    </el-card>
  </div>
</template>

<style scoped lang='scss'>
</style>
