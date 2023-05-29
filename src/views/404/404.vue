<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <div class="flex w-full h-screen justify-center items-center">
    <div class="p-3 text-center">
      <svgIcons icon="404" width="180px" height="180px" />
      <div class="mt-5 text-gray-400 text-2xl">
        抱歉，您访问的路径不存在
      </div>
      <div class="mt-5">
        <el-button type="primary" @click="router.push('/')">
          点此回到首页
        </el-button>
      </div>
    </div>
  </div>
</template>
