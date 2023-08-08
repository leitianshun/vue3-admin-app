<script setup lang="ts">
import type { recordsType, rolesObj } from '@/api/acl/user/type'

const table = ref()
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const userListData = ref<recordsType[]>([])
const selectionList = ref<recordsType[]>([]) // 选中的列表
const keyword = ref('') // 搜索参数，根据用户名
const drawerVisible = ref<boolean>(false) // 控制添加或更新用户，抽屉开关
const roleDrawerVisible = ref<boolean>(false) // 控制分配用户角色，抽屉开关
const userParams = ref<recordsType>({
  username: '',
  name: '',
  password: '',
})
const userRef = ref() // 添加或更新用户的表单ref
const checkAll = ref<boolean>(false)
const allRoleList = ref<rolesObj[]>([]) // 存储全部角色
const checked = ref<any>([]) // 存储已选中过的角色
const isIndeterminate = ref(true) // 用于设置不确定样式，为true就是未勾选

function validatorUserName(value: any, callback: any) {
  // 自定义校验规则 validator
  if (value.trim().length >= 5) callback()
  else callback(new Error('用户姓名长度最小5位'))
}

const rules = ref({
  username: [{ required: true, validator: validatorUserName, trigger: 'blur' }],
  name: [
    { required: true, message: '请填写用户昵称', trigger: 'blur' },
    { min: 2, max: 15, message: '用户昵称长度最小2位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请填写用户密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度最小6位', trigger: 'blur' },
  ],
})

async function getUsers(page = 1, username = '') {
  // 获取用户列表
  currentPage.value = page
  const res = await getUserList(currentPage.value, pageSize.value, username)
  if (res.code === 200) userListData.value = res.data.records
  total.value = res.data.total
  console.log(res)
}
onMounted(() => {
  getUsers()
})

const idList = computed(() => {
  // 批量删除，获取id数组
  const ids = selectionList.value.map((item) => `${item.id}`) // 使用字符串拼接方式，获取字符串数组
  return ids
})

function handleSizeChange() {
  // 切换每页数量回调 ，这里的参数已经双向绑定，只需要再次获取即可
  // pageSize.value = size
  getUsers()
}
function handleSelectionChange(item: any) {
  // 列表被选择回调,多选
  selectionList.value = item
}

function handleUpdate(row: recordsType) {
  // 编辑,当前后台做了处理，无法修改
  drawerVisible.value = true
  Object.assign(userParams.value, row)
  nextTick(() => {
    userRef.value.clearValidate()
  })

  // userParams.value.id = row.id
  // userParams.value.name = row.name
  // userParams.value.username = row.username
  // userParams.value.password = row.password
}
async function handleDelete(row: recordsType) {
  // 删除某个用户
  ElMessageBox.confirm(`是否确认删除${row.username}?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    delUser(row.id!)
      .then((res) => {
        if (res.code === 200) {
          getUsers(
            userListData.value.length > 1
              ? currentPage.value
              : currentPage.value - 1,
          ) // 如果删除后当前页还有数据，就留在当前，否则获取上一页的数据
          ElMessage.success('删除成功！')
        } else {
          ElMessage.error(res.data!)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  })
}

async function batchDelete() {
  // 批量删除用户
  // if (selectionList.value.length === 0) {  //这里不需要判断，因为按钮已经做了禁用处理
  //   ElMessage.error('最少选择一项')
  //   return
  // }
  await ElMessageBox.confirm('是否确认删除所选数据?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const res = await batchDel(idList.value)
  if (res.code === 200) {
    getUsers(
      userListData.value.length > 1 ? currentPage.value : currentPage.value - 1,
    ) // 如果删除后当前页还有数据，就留在当前，否则获取上一页的数据
    table.value.clearSelection()
    ElMessage.success('删除成功')
  } else {
    ElMessage.error(res.data!)
    table.value.clearSelection()
  }
}

function addUsers() {
  // 添加用户
  drawerVisible.value = true
  userParams.value = {
    username: '',
    name: '',
    password: '',
  }
  nextTick(() => {
    userRef.value.clearValidate()
  })
}

function cancel() {
  // 取消
  drawerVisible.value = false
  userRef.value.clearValidate()
}

async function submit() {
  // 添加或更新
  await userRef.value.validate()
  const res = await addOrUpdateUser(userParams.value)
  if (res.code === 200) {
    getUsers(userParams.value.id ? currentPage.value : 1)
    ElMessage.success(userParams.value.id ? '修改成功' : '添加成功')
    drawerVisible.value = false
    if (userParams.value.id) window.location.reload() // 如果修改的是当前登录的用户，则需要刷新页面，返回到登录页
  } else {
    ElMessage.error(userParams.value.id ? '修改失败' : '添加失败,用户名已存在')
    drawerVisible.value = false
  }
}

// async function getRoleData(adminId: number) { // 根据用户获取角色列表
//   const res = await getRoleList(adminId)
//   if (res.code === 200)
//     allRoleList.value = res.data.allRolesList // 全部角色列表
//   checked.value = res.data.assignRoles.map(item => item.id) // 已分配的角色列表,取出id赋值到已选中的数组中，因为el-checkbox的label的值绑定的是id，所以这里要取出id，然后就会显示已选中的状态
//   // checked.value = res.data.assignRoles // 如果el-checkbox的lable绑定的是item，那么这里可以直接赋值到已选中的数组中，不用取出id，这样就会展示已选种的状态
// }

async function handleRole(row: recordsType) {
  // 分配角色,打开抽屉，获取全部的角色列表
  // getRoleData(row.id!) // 获取全部的角色列表
  userParams.value = row // 将当前选中的角色数据存储起来
  const res = await getRoleList(row.id!) // 根据用户获取角色列表
  if (res.code === 200) allRoleList.value = res.data.allRolesList // 全部角色列表
  checked.value = res.data.assignRoles.map((item) => item.id) // 已分配的角色列表,取出id赋值到已选中的数组中，因为el-checkbox的label的值绑定的是id，所以这里要取出id，然后就会显示已选中的状态
  // checked.value = res.data.assignRoles // 如果el-checkbox的lable绑定的是item，那么这里可以直接赋值到已选中的数组中，不用取出id，这样就会展示已选种的状态
  roleDrawerVisible.value = true // 等待页面数据加载完成后再打开弹窗
}

function handleCheckAllChange(val: any) {
  // 是否全选
  // val:true(全选)|false(没有全选)
  checked.value = val ? allRoleList.value.map((item) => item.id) : [] // 还可写为 checked.value = val ? allRoleList.value : []，这里分配时要取出id
  isIndeterminate.value = false
}
function handleCheckedCitiesChange(value: any) {
  // 单选
  checked.value = value // 将选中的单条数据存储到变量中
  const checkedCount = value.length // 已经选中数量
  checkAll.value = checkedCount === allRoleList.value.length // 判断是否全选，就是拿已经选中的数量和总数据列表的长度对比是否相等
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoleList.value.length // 设置不确定状态，当没有全选时就是不确定状态
  // isIndeterminate.value = value.length !== allRoleList.value.length  // 设置不确定状态，第二种写法，当选中的长度不等于全部数据的长度时
}
async function assignRole() {
  // 分配角色确定按钮
  const res = await doAssignRole({
    roleIdList: checked.value,
    userId: userParams.value.id as number,
  })
  // const res = await doAssignRole({ roleIdList:allRoleList.value.map(item=>item.id) , userId: curUserData.value.id })  还可写为此种方法,取出id
  if (res.code === 200) {
    roleDrawerVisible.value = false
    getUsers(currentPage.value)
    ElMessage.success('角色分配成功')
  }
}
function cancelAssignRole() {
  // 取消分配角色
  roleDrawerVisible.value = false
}
function beforeClose() {
  // 抽屉关闭前的回调，用于清空选中过的数据
  checked.value = []
  roleDrawerVisible.value = false
}
function search() {
  // 根据用户名进行搜索
  if (keyword.value) getUsers(1, keyword.value)
  keyword.value = ''
}
function reset() {
  // 重置按钮
  getUsers()
  keyword.value = ''
}
</script>

<template>
  <div>
    <el-card class="h-18">
      <el-form :inline="true" class="flex justify-between items-center">
        <el-form-item :label="$t('login.userName')">
          <el-input
            v-model="keyword"
            :placeholder="$t('login.userPlaceholder')"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="keyword ? false : true"
            @click="search"
          >
            {{ $t('common.search') }}
          </el-button>
          <el-button @click="reset">
            {{ $t('common.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt-5">
      <el-button
        type="primary"
        icon="Plus"
        @click="addUsers"
        v-has="`btn.User.add`"
      >
        {{ $t('common.add') }}
      </el-button>
      <el-button
        type="danger"
        icon="Delete"
        :disabled="selectionList.length === 0"
        @click="batchDelete"
        v-has="`btn.User.remove`"
      >
        {{ $t('common.batchDel') }}
      </el-button>
      <el-table
        ref="table"
        :data="userListData"
        border
        stripe
        height="calc(100vh - 430px)"
        class="mt-5"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="100" align="center" />
        <el-table-column label="id" align="center" prop="id" />
        <el-table-column
          label="用户名字"
          align="center"
          prop="username"
          show-overflow-tooltip
        />
        <el-table-column
          label="用户名称"
          align="center"
          prop="name"
          show-overflow-tooltip
        />
        <el-table-column
          label="用户角色"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        />
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        />
        <el-table-column label="操作" align="center" width="300px">
          <template #default="{ row }">
            <el-button
              type="success"
              size="small"
              icon="User"
              @click="handleRole(row)"
              v-has="`btn.User.assgin`"
            >
              {{ $t('common.assignRole') }}
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="handleUpdate(row)"
              v-has="`btn.User.update`"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="handleDelete(row)"
              v-has="`btn.User.remove`"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加或更新用户抽屉 -->
      <el-drawer
        v-model="drawerVisible"
        size="30%"
        :title="userParams.id ? '编辑用户' : '添加用户'"
        direction="rtl"
      >
        <el-form
          ref="userRef"
          :model="userParams"
          :rules="rules"
          label-width="80px"
          :inline="false"
        >
          <el-form-item label="用户姓名" prop="username">
            <el-input
              v-model="userParams.username"
              placeholder="请填写用户姓名"
            />
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="userParams.name" placeholder="请填写用户昵称" />
          </el-form-item>
          <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
            <el-input
              v-model="userParams.password"
              type="password"
              placeholder="请填写用户密码"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" size="default" @click="submit">
            {{ $t('common.confirm') }}
          </el-button>
          <el-button size="default" @click="cancel">
            {{ $t('common.cancel') }}
          </el-button>
        </template>
      </el-drawer>

      <!-- 角色分配抽屉 -->
      <el-drawer
        v-model="roleDrawerVisible"
        size="35%"
        title="分配用户角色 "
        :before-close="beforeClose"
        direction="rtl"
      >
        <!-- 这里可以使用el-form -->
        <el-row :gutter="10">
          <el-col :span="6" :offset="0">用户姓名</el-col>
          <el-col :span="18" :offset="0">
            <el-input
              v-model="userParams.username"
              placeholder="用户姓名"
              disabled
            />
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt-5">
          <el-col :span="6" :offset="0">角色列表</el-col>
          <el-col :span="18" :offset="0">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <!-- v-model="checked" 绑定已选中的数据   lable表示绑定的值   这里的label 可以是item，也就是:label="item"这样的话获取数据的时候就可以将已分配的角色赋值到checked上，这样已分配的就会显示被选中 -->
            <el-checkbox-group
              v-model="checked"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="item in allRoleList"
                :key="item.id"
                :label="item.id"
              >
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <template #footer>
          <el-button
            type="primary"
            size="default"
            :disabled="checked.length === 0"
            @click="assignRole"
          >
            确定
          </el-button>
          <el-button size="default" @click="cancelAssignRole">取消</el-button>
        </template>
      </el-drawer>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        class="my-5"
        :background="true"
        :page-sizes="[10, 20, 50, 100]"
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getUsers"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
