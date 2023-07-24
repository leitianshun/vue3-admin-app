<script setup lang='ts'>
import type { permisstionObj, rolesObj } from '@/api/acl/role/type'

const table = ref()
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const roleListData = ref<rolesObj[]>([])
const selectionList = ref<rolesObj[]>([]) // 选中的列表
const keyword = ref('') // 搜索参数，根据用户名
const dialogVisible = ref<boolean>(false) // 控制添加或更新用户，弹窗开关
const roleDrawerVisible = ref<boolean>(false) // 控制分配用户角色，抽屉开关
const roleParams = ref<rolesObj>({})
const userRef = ref() // 添加或更新用户的表单ref
// const checkAll = ref<boolean>(false)
const allMenuList = ref<permisstionObj[]>([]) // 存储全部角色
const checked = ref<any>([]) // 存储已选中过的角色
// const isIndeterminate = ref(true)
const rules = ref({
  roleName: [{ required: true, message: '请填写角色名称', trigger: 'blur' }],
})
const tree = ref() // 树形控件的ref

const selectArr = ref<Array<string>>([]) // 储存被选中id数组，用于展示，被选中效果

async function getRoleList(page = 1, rolename = '') { // 获取角色列表
  currentPage.value = page
  const res = await getAllRoleList(currentPage.value, pageSize.value, rolename)
  if (res.code === 200)
    roleListData.value = res.data.records
  total.value = res.data.total
  console.log(res)
}
onMounted(() => {
  getRoleList()
})

const idList = computed(() => { // 批量删除，获取id数组
  const ids = selectionList.value.map(item => `${item.id}`) // 使用字符串拼接方式，获取字符串数组
  return ids
})

function handleSizeChange() { // 切换每页数量回调 ，这里的参数已经双向绑定，只需要再次获取即可
  // pageSize.value = size
  getRoleList()
}
function handleSelectionChange(item: any) { // 列表被选择回调,多选
  selectionList.value = item
}

function handleUpdate(row: rolesObj) { // 编辑角色
  dialogVisible.value = true
  Object.assign(roleParams.value, row)
  nextTick(() => {
    userRef.value.clearValidate()
  })

  // roleParams.value.id = row.id
  // roleParams.value.name = row.name
  // roleParams.value.username = row.username
  // roleParams.value.password = row.password
}
async function handleDelete(row: rolesObj) { // 删除某个角色
  ElMessageBox.confirm(
    `是否确认删除${row.roleName}?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      delRole(row.id!).then((res) => {
        if (res.code === 200) {
          getRoleList(roleListData.value.length > 1 ? currentPage.value : currentPage.value - 1) // 如果删除后当前页还有数据，就留在当前，否则获取上一页的数据
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

async function batchDelete() { // 批量删除角色
  // if (selectionList.value.length === 0) {  //这里不需要判断，因为按钮已经做了禁用处理
  //   ElMessage.error('最少选择一项')
  //   return
  // }
  await ElMessageBox.confirm(
    '是否确认删除所选数据?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
  const res = await batchDelRole(idList.value)
  if (res.code === 200) {
    getRoleList(roleListData.value.length > 1 ? currentPage.value : currentPage.value - 1) // 如果删除后当前页还有数据，就留在当前，否则获取上一页的数据
    table.value.clearSelection()
    ElMessage.success('删除成功')
  }
  else {
    ElMessage.error(res.data!)
    table.value.clearSelection()
  }
}

function addUsers() { // 添加角色
  dialogVisible.value = true
  roleParams.value = { }
  nextTick(() => {
    userRef.value.clearValidate()
  })
}

function cancel() { // 取消
  dialogVisible.value = false
  userRef.value.clearValidate()
}

async function submit() { // 添加或更新
  await userRef.value.validate()
  const res = await addOrUpdateRole(roleParams.value)
  if (res.code === 200) {
    getRoleList(roleParams.value.id ? currentPage.value : 1)
    ElMessage.success(roleParams.value.id ? '修改成功' : '添加成功')
    dialogVisible.value = false
    if (roleParams.value.id)
      window.location.reload() // 如果修改的是当前登录的用户，则需要刷新页面，返回到登录页
  }
  else {
    ElMessage.error(roleParams.value.id ? '修改失败' : '添加失败,用户名已存在')
    dialogVisible.value = false
  }
}

// async function getMenuData(roleId: number) { // 分配权限按钮，根据角色获取菜单
//   selectArr.value = [] // 每次打开时，清空数据
//   const res = await getMenuByRoleId(roleId)
//   if (res.code === 200)
//     allMenuList.value = res.data // 全部角色列表
//   selectArr.value = filterSelectRoleId(allMenuList.value)
// }

async function handleRole(row: rolesObj) { // 分配角色,打开抽屉，获取全部的角色列表
  // getMenuData(row.id!) // 根据角色获取菜单
  roleParams.value = row // 将当前选中的角色数据存储起来
  selectArr.value = [] // 每次打开时，清空数据
  const res = await getMenuByRoleId(row.id!)
  if (res.code === 200) // 这里要等到数据获取成功后再打开弹窗，渲染数据
    allMenuList.value = res.data // 全部角色列表
  selectArr.value = filterSelectRoleId(allMenuList.value) // 过滤出已经被选中的id
  roleDrawerVisible.value = true // 等待页面数据加载完成后再打开弹窗
}

// 第一种写法
function filterSelectRoleId(arr: any) { // 过滤出角色列表中以选中的权限id,注意这里要拿旧数组拼接，否则数据丢失
  let res: string[] = []
  arr.forEach((item: any) => {
    if (item.select && item.level === 4) // if (item.select && item.level === 4) 这里选第4级，是因为这一级才有子数据
      res.push(item.id)
    if (item.children && item.children.length > 0)
      // res = res.concat(filterSelectRoleId(item.children)) // 注意这里要用数组拼接进去，否则之前数组里push的数据就丢失
      res = [...res, ...filterSelectRoleId(item.children)] // 这里还可以用 [...res,...filterSelectRoleId(item.children)]
  })
  return res
}

// 第二种写法，不需要拼接数组，将数组作为参数传进去，这样递归时就不会被销毁，数据也就不会丢失
// function filterSelectRoleId(arr: any, initArr: any) { // 过滤出角色列表中以选中的权限id,这里的第二个参数的目的是为了在递归时保证以有数据不被丢失，进行数据存储
//   arr.forEach((item: any) => {
//     if (item.select && item.level === 4) // 这里写第4级，是因为这一级才有子数据，可以被选择
//       initArr.push(item.id)
//     if (item.children && item.children.length > 0)
//       filterSelectRoleId(item.children, initArr) // 注意这里递归用的是已经有数据的数组，不会被销毁，并不是新的空数组。
//   })
//   return initArr
// }

// 第三种写法
// function filterSelectRoleId(arr: any) { // 过滤出角色列表中以选中的权限id,注意这里要拿旧数组拼接，否则数据丢失
//   const res = arr.reduce((prev: any, item: any) => {
//     if (item.select && item.level === 4) // 这里写第4级，是因为这一级才有子数据，可以被选择
//       prev.push(item.id)
//     if (item.children && item.children.length > 0)
//       // prev = prev.concat(filterSelectRoleId(item.children)) // 注意这里要用数组拼接进去，否则之前数组里push的数据就丢失
//       prev = [...prev, ...filterSelectRoleId(item.children)] // 这里还可以用 [...prev,...filterSelectRoleId(item.children)]
//     return prev
//   }, [])
//   return res
// }

async function assignRole() { // 分配角色确定按钮
  // tree.value.getCheckedKeys() //getCheckedKeys() 可以取出选中节点，key的数组，也就是node-key对应的选中的id值组成的数组
  // console.log(tree.value.getCheckedKeys())

  // 这里注意，在收集选中得id时，因为是在半选状态，所以导致父级不是选中状态，因此无法收集到完整的id，所以这里除了使用getCheckedKeys()获取到已经选中过的id时但是无法获取到半选状态的父级id，还要获取到半选状态的id，也就是父级的id，因为子级没有全部选中，所以父级是半选状态
  // [...tree.value.getCheckedKeys(), ...tree.value.getHalfCheckedNodes()]  //这里获取到已经选中的id和半选中的id，因为子级没有全选所以父级是不确定样式，也就是半选状态，因为要将半选的和已经选择的合并起来
  console.log([...tree.value.getCheckedKeys(), ...tree.value.getHalfCheckedKeys()])
  const res = await doAssignPermission({ permissionIdList: [...tree.value.getCheckedKeys(), ...tree.value.getHalfCheckedKeys()], roleId: roleParams.value.id as number })
  if (res.code === 200) {
    roleDrawerVisible.value = false
    getRoleList(currentPage.value)
    ElMessage.success('权限分配成功')
    window.location.reload()
  }
  else {
    ElMessage.error('权限分配失败')
  }
}
function cancelAssignRole() { // 取消分配角色
  roleDrawerVisible.value = false
}
function beforeClose() { // 抽屉关闭前的回调，用于清空选中过的数据
  checked.value = []
  roleDrawerVisible.value = false
}
function search() { // 根据用户名进行搜索
  if (keyword.value)
    getRoleList(1, keyword.value)
  keyword.value = ''
}
function reset() { // 重置按钮
  getRoleList()
  keyword.value = ''
}
</script>

<template>
  <div>
    <el-card class="h-18">
      <el-form :inline="true" class="flex justify-between items-center ">
        <el-form-item label="角色名:">
          <el-input v-model="keyword" placeholder="请输入角色名" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="keyword ? false : true" @click="search">
            搜索
          </el-button>
          <el-button @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt-5">
      <el-button type="primary" icon="Plus" @click="addUsers">
        添加
      </el-button>
      <el-button type="danger" icon="Delete" :disabled="selectionList.length === 0" @click="batchDelete">
        批量删除
      </el-button>
      <el-table ref="table" :data="roleListData" border stripe height="calc(100vh - 430px)" class="mt-5" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="100" align="center" />
        <el-table-column label="id" align="center" prop="id" />
        <el-table-column label="角色名称" align="center" prop="roleName" show-overflow-tooltip />
        <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip />
        <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip />
        <el-table-column label="操作" align="center" width="300px">
          <template #default="{ row }">
            <el-button type="success" size="small" icon="User" @click="handleRole(row)">
              分配权限
            </el-button>
            <el-button type="warning" size="small" icon="Edit" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" icon="Delete" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加或更新用户弹窗 -->
      <el-dialog
        v-model="dialogVisible"
        size="30%"
        :title="roleParams.id ? '编辑角色' : '添加角色' "
      >
        <el-form ref="userRef" :model="roleParams" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="roleParams.roleName" placeholder="请填写角色名称" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" size="default" @click="submit">
            确定
          </el-button>
          <el-button size="default" @click=" cancel">
            取消
          </el-button>
        </template>
      </el-dialog>

      <!-- 角色分配抽屉 -->
      <el-drawer
        v-model="roleDrawerVisible"
        size="35%"
        title="分配角色权限 "
        :before-close="beforeClose"
        direction="rtl"
      >
        <el-row :gutter="10">
          <el-col :span="6" :offset="0">
            角色名称
          </el-col>
          <el-col :span="18" :offset="0">
            <el-input v-model="roleParams.roleName" placeholder="用户姓名" disabled />
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt-5 ">
          <el-col :span="6" :offset="0">
            菜单列表
          </el-col>
          <el-col :span="18" :offset="0">
            <!-- check-strictly="true"  这个是严格模式，也就是父子层级选中时没有关联，各选各的，(默认是父级选中子集都会被选中,子集全部选中之后父级才会选中)，但是加上这个属性，这样可以做到权限菜单细分，如果不加，只有当父级下的所有子集都选中才会将父级选中，且设置选中状态 ,-----
              这个问题已解决，通过获取到已选中的和半选状态的id即可解决 -->
            <!-- :default-checked-keys="selectArr" 默认选中的id数组，根据node-key的值来决定    default-expand-all 默认全部展开 -->
            <el-tree
              ref="tree"
              :data="allMenuList"
              show-checkbox
              node-key="id"
              default-expand-all
              highlight-current
              :default-checked-keys="selectArr"
              :props="{
                children: 'children',
                label: 'name',
              }"
            />
          </el-col>
        </el-row>
        <template #footer>
          <el-button type="primary" size="default" @click="assignRole">
            确定
          </el-button>
          <el-button size="default" @click="cancelAssignRole">
            取消
          </el-button>
        </template>
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
        @current-change="getRoleList"
      />
    </el-card>
  </div>
</template>

<style scoped lang='scss'>
</style>
