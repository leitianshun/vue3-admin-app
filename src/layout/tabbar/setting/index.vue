<script setup lang='ts'>
import screenfull from 'screenfull'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
function setFullScreen() {
  if (screenfull.isEnabled)
    screenfull.toggle()
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
          <el-dropdown-item @click="userStore.logout()">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang='scss'>
</style>
