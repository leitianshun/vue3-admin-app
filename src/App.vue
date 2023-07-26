<script setup lang="ts">
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/dist/locale/en.mjs'

const { locale } = useI18n()
</script>

<template>
  <div>
    <el-config-provider :locale="locale === 'en' ? en : zh">
      <router-view />
    </el-config-provider>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
