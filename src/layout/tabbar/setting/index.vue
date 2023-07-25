<script setup lang='ts'>
import screenfull from 'screenfull'

// import { useI18n } from 'vue-i18n'

// import i18n from '@/language'

const { locale } = useI18n()

const userStore = useUserStore()
const layoutStore = useLayoutStore()
function setFullScreen() {
  if (screenfull.isEnabled)
    screenfull.toggle()
}
const predefineColors = ref([ // 预设颜色列表
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// function fullScreen() {  //不使用插件实现全屏
//   const isFullScreen = document.fullscreenElement  //用来判断是否为全屏幕，如果是全屏则返回true，否则返回 null/false
//   if (!isFullScreen)  //如果不是全屏页面，则进行全屏操作
//     document.documentElement.requestFullscreen()
//   else
//     document.exitFullscreen()  //退出全屏操作
// }

onMounted(() => {
  const html = document.documentElement
  layoutStore.isDark ? html.className = 'dark' : html.className = '' // 设置深色模式，防止刷新后样式失效
  getComputedStyle(html).getPropertyValue('--el-color-primary')
  html.style.setProperty('--el-color-primary', layoutStore.color) // 设置主题
  locale.value = layoutStore.language
})

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

function setLanguage(val: string) {
  layoutStore.setLanguage(val)
  // i18n.global.locale = val
  locale.value = val
}
</script>

<template>
  <div class="flex items-center justify-around">
    <el-button icon="Refresh" circle @click="layoutStore.setRefresh" />
    <el-button icon="FullScreen" circle @click="setFullScreen" />
    <el-popover
      trigger="hover" placement="bottom" :width="260"
    >
      <template #reference>
        <el-button icon="Setting" circle />
      </template>
      <div class="text-lg font-bold">
        <span>
          主题设置

        </span>
      </div>
      <div class="my-3">
        <span>
          主题颜色
        </span>
        <el-color-picker v-model="layoutStore.color" :predefine="predefineColors" @change="layoutStore.setColor" />
      </div>
      <div class="my-3">
        <span>
          语言切换
        </span>
        <!-- <el-radio-group  class="ml-4">
          <el-radio label="1" size="large" @click="setLanguage('zh')">
            中文
          </el-radio>
          <el-radio label="2" size="large" @click="setLanguage('en')">
            english
          </el-radio>
        </el-radio-group> -->
        <el-button type="primary" size="default" @click="setLanguage('zh')">
          中文
        </el-button>
        <el-button type="primary" size="default" @click="setLanguage('en')">
          英文
        </el-button>
      </div>
      <span class="mr-2">
        暗黑模式
      </span>
      <el-switch v-model="layoutStore.isDark" active-icon="Moon" inline-prompt inactive-icon="Sunny" @change="layoutStore.setDark" />
    </el-popover>
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
