<script setup lang='ts'>
import screenfull from 'screenfull'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
function setFullScreen() {
  if (screenfull.isEnabled)
    screenfull.toggle()
}

// function fullScreen() {  //不使用插件实现全屏
//   const isFullScreen = document.fullscreenElement  //用来判断是否为全屏幕，如果是全屏则返回true，否则返回 null/false
//   if (!isFullScreen)  //如果不是全屏页面，则进行全屏操作
//     document.documentElement.requestFullscreen()
//   else
//     document.exitFullscreen()  //退出全屏操作
// }

async function logout() {
  ElMessageBox.confirm(
    '是否确认退出登录?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      userStore.logout().then(() => {
        ElMessage({
          type: 'info',
          message: '已退出',
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '退出失败',
        })
        useRouter().push('/login')
      })
    })
}
</script>

<template>
  <div class="flex items-center justify-around">
    <el-button icon="Refresh" circle @click="layoutStore.setRefresh" />
    <el-button icon="FullScreen" circle @click="setFullScreen" />
    <el-button icon="Setting" circle />
    <img src="@/assets/image/jntm.gif" class="w-11 h-11 rounded-full border border-solid border-black border-opacity-20 mx-5" alt="">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang='scss'>
</style>
