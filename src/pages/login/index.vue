<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="密码登录" name="pass">
        <VpForm :schema="loginFormSchema" hide-required-asterisk ref="loginFormRef">
          <template #actions>
            <el-button type="primary" @click="onSubmit" class="w-full">登录</el-button>
          </template>
        </VpForm>
      </el-tab-pane>
      <el-tab-pane label="验证码登录" name="code">
        <VpForm :schema="codeFormSchema" @submit="handleSubmit" hide-required-asterisk ref="codeFormRef">
        </VpForm>
      </el-tab-pane>
    </el-tabs>
    <div class="flex justify-between mt-4 text-sm">
      <router-link to="/forget" class="text-blue-400">忘记密码
      </router-link>
      <div>
        <span>还没有账号？</span>
        <router-link to="/login/reg" class="text-blue-400">立即注册></router-link>
      </div>
    </div>
  </div>

</template>

<script setup lang="tsx">
import type { VpFormSchema } from "el-admin-components"

const activeName = ref('pass')

const loginFormRef = ref()

const codeFormRef = ref()

const userIcon = () => <i class="i-ep:user text-xl self-center"></i>

const passIcon = () => <i class="i-ep:lock text-xl self-center"></i>

const mobileIcon = () => <i class="i-ep:cellphone text-xl self-center"></i>

const messageIcon = () => <i class="i-ep:message text-xl self-center"></i>

const loginFormSchema = ref<VpFormSchema>([
  {
    prop: 'username',
    value: '',
    attrs: {
      placeholder: '请输入用户名'
    },
    type: 'input',
    span: 24,
    labelSlot: userIcon,
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      }
    ]
  },
  {
    prop: 'password',
    value: '',
    attrs: {
      placeholder: '请输入密码',
      type: 'password'
    },
    type: 'input',
    span: 24,
    labelSlot: passIcon,
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      }
    ]
  }
])

const codeFormSchema = ref<VpFormSchema>([
  {
    prop: 'phone',
    value: '',
    attrs: {
      placeholder: '请输入手机号'
    },
    type: 'input',
    span: 24,
    labelSlot: mobileIcon,
    rules: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'blur'
      },
      {
        pattern: /^1[3456789]\d{9}$/,
        message: '手机号格式不正确',
        trigger: 'blur'
      }
    ]
  },
  {
    prop: 'code',
    value: '',
    attrs: {
      placeholder: '请输入验证码'
    },
    type: 'input',
    span: 24,
    labelSlot: messageIcon,
    suffixSlot: () => (
      <el-button type="primary" class="ml-2">获取验证码</el-button>
    ),
    rules: [
      {
        required: true,
        message: '验证码不能为空',
        trigger: 'blur'
      }, {
        min: 6,
        max: 6,
        message: '验证码长度为6位',
        trigger: 'blur'
      }, {
        pattern: /^\d{6}$/,
        message: '验证码格式不正确',
        trigger: 'blur'
      }
    ]
  }
])

const onSubmit = () => {
  loginFormRef.value?.validate((valid) => {
    console.log(valid)
  })
}

const handleSubmit = (form: any) => {
  console.log('🚀 ~ file: login.vue:37 ~ handleSubmit ~ form:', form)
}
</script>

<style scoped></style>
