<script lang="ts" setup>
const formRef = ref()
const router = useRouter()
const ruleForm = reactive({
  password: 'atguigu123',
  username: 'admin',
})
const rules = ref({

  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    }, { min: 6, max: 10, message: '密码长度最少6位', trigger: 'blur' },
  ],

})
function submitForm() {
  formRef.value.validate((res: any) => {
    if (res) {
      useUserStore().login(ruleForm).then(() => {
        router.push('/')
        ElNotification({
          type: 'success',
          message: '欢迎回来',
          title: `Hello ${getTime()}好`,
        })
      }).catch((err) => {
        ElMessage({ type: 'error', message: err })
      })
    }
  })
}
</script>

<template>
  <div class="w-full h-screen bg relative  flex items-center justify-end">
    <div class="p-6 mr-60 w-1/3  rounded-xl bg-gradient-to-b from-indigo-500 to-blue-400">
      <h3 class="text-center text-2xl my-3 text-white">
        欢迎来到小雷甄选运行平台
      </h3>
      <el-form
        ref="formRef"
        :model="ruleForm"
        status-icon
        label-position="top"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <div class="text-center ">
          <el-button type="success" class="w-full" @click="submitForm()">
            登录
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
