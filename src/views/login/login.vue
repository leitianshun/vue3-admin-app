<script lang="ts" setup>
import { Lock, User } from '@element-plus/icons-vue'

import i18n from '@/language' // 引入语言配置

const formRef = ref()
const loading = ref(false)
const ruleForm = reactive({
  password: 'atguigu123',
  username: 'admin',
})
const router = useRouter()
const route = useRoute()
// const { t } = useI18n()
// const userPlaceholder = computed(() => {
//   t('login.userPlaceholder')
// })
// const passwordPlaceholder = computed(() => {
//   t('login.passwordPlaceholder')
// })
const rules = ref<any>({
  username: [
    {
      required: true,
      message: i18n.global.t('login.userPlaceholder'),
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: i18n.global.t('login.passwordPlaceholder'),
      trigger: 'blur',
    }, { min: 6, max: 10, message: '密码长度最少6位', trigger: 'blur' },
  ],

})

async function submitForm() {
  await formRef.value.validate()
  useUserStore().login(ruleForm).then(() => {
    const redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hello ${getTime()}好`,
    })
    loading.value = false
  }).catch((err) => {
    loading.value = false
    ElMessage({ type: 'error', message: (err as Error).message })
  })
}
</script>

<template>
  <div class="w-full h-screen bg relative  flex items-center justify-center xl:justify-end">
    <div class="p-6 xl:mr-60 xl:w-1/3  rounded-xl bg-gradient-to-b from-indigo-500 to-blue-400">
      <h3 class="text-center text-2xl my-3 text-white">
        {{ $t('login.title') }}
      </h3>
      <el-form
        ref="formRef"
        :model="ruleForm"
        status-icon
        label-position="top"
        :rules="rules"
      >
        <el-form-item :label="$t('login.userName')" prop="username">
          <el-input
            v-model="ruleForm.username" autocomplete="off"
            :prefix-icon="User"
            :placeholder="$t('login.userPlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="password">
          <el-input
            v-model="ruleForm.password"
            :prefix-icon="Lock"
            type="password"
            autocomplete="off"
            :placeholder="$t('login.passwordPlaceholder')"
            show-password
            @keydown.enter="submitForm"
          />
        </el-form-item>
        <div class="text-center ">
          <el-button type="success" class="w-full" :loading="loading" @click="submitForm()">
            {{ $t('login.login') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg{
  background: url('../../../src/assets/image/background.jpg');
background-position: center ;
background-repeat: no-repeat;
background-size: cover;
}
</style>
