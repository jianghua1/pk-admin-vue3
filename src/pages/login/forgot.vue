<template>
  <div>
    <div class="text-2xl text-center pb-10">找回密码</div>
    <VpForm hide-required-asterisk :schema="codeFormSchema" ref="codeFormRef">
      <template #actions>
        <el-button class="w-full mt-4 h-12!" type="primary" @click="onSubmit">重置密码</el-button>
      </template></VpForm
    >

    <div class="flex justify-center mt-5 text-sm">
      <div class="flex items-center">
        <span>已有账号？</span>
        <el-link type="primary" :underline="false"
          ><router-link to="/login">立即登录</router-link>></el-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { VpFormSchema } from 'el-admin-components'

const passIcon = () => <i class="i-ep:lock text-xl self-center"></i>
const mobileIcon = () => <i class="i-ep:cellphone text-xl self-center"></i>
const messageIcon = () => <i class="i-ep:message text-xl self-center"></i>

definePage({
  meta: {
    title: 'pages.login.forgot',
    hideMenu: true
  }
})

const loginFormRef = ref()
const codeFormRef = ref()

const codeFormSchema = ref<VpFormSchema>([
  {
    prop: 'mobile',
    value: '',
    type: 'input',
    attrs: {
      placeholder: '请输入手机号'
    },
    span: 24,
    labelSlot: mobileIcon,
    rules: [
      { required: true, message: '手机号不能为空', trigger: 'blur' },
      // 1位手机号
      { pattern: /^1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }
    ]
  },
  {
    prop: 'code',
    value: '',
    type: 'input',
    attrs: {
      placeholder: '请输入验证码'
    },
    span: 24,
    rules: [
      { required: true, message: '验证码不能为空', trigger: 'blur' },
      // 只能输入6位数字
      { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' }
    ],
    labelSlot: messageIcon,
    suffixSlot: () => (
      <el-button type="primary" class="ml-3">
        获取验证码
      </el-button>
    )
  },
  {
    prop: 'password',
    value: '',
    type: 'input',
    attrs: {
      placeholder: '请输入密码',
      type: 'password'
    },
    rules: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      // 密码需要6-32位的字符
      { min: 6, max: 32, message: '密码格式不正确', trigger: 'blur' }
    ],
    span: 24,
    labelSlot: passIcon
  }
])

const onSubmit = () => {
  loginFormRef?.value?.validate((valid) => {
    console.log('🚀 ~ onSubmit ~ valid:', valid)
  })
  // console.log('🚀 ~ file: login.vue:37 ~ handleSubmit ~ form:', form)
}
</script>

<style scoped lang="scss"></style>
