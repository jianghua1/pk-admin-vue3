<template>
  <div>
    <div class="text-3xl font-[500] pb-10">toimc后台管理系统</div>
    <el-tabs v-model="activeName" class="login-tabs" @tab-change="handleTabChange">
      <el-tab-pane label="密码登录" name="pass">
        <VpForm hide-required-asterisk :schema="loginFormSchema" ref="loginFormRef">
          <template #actions>
            <!-- <div class="cf-turnstile" data-sitekey="0x4AAAAAAATnx8uLjRGaUQgT"></div> -->
            <TurnstileCaptcha
              sitekey="0x4AAAAAAATnx8uLjRGaUQgT"
              @callback="handleCallback"
              ref="testRef"
            ></TurnstileCaptcha>
            <el-button class="w-full mt-4 h-12!" type="primary" @click="onSubmit">登录</el-button>
          </template>
        </VpForm>
      </el-tab-pane>
      <el-tab-pane label="验证码登录" name="code">
        <VpForm hide-required-asterisk :schema="codeFormSchema" ref="codeFormRef">
          <template #actions>
            <el-button class="w-full mt-4 h-12!" type="primary" @click="onSubmit">登录</el-button>
          </template></VpForm
        >
      </el-tab-pane>
    </el-tabs>

    <div class="flex justify-between mt-5 text-sm">
      <el-link type="primary" :underline="false"
        ><router-link to="/login/forgot">忘记密码</router-link></el-link
      >
      <div class="flex items-center">
        <span>还没有账号？</span>
        <el-link type="primary" :underline="false"
          ><router-link to="/login/reg">立即注册</router-link>></el-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { VpFormSchema } from 'el-admin-components'

import axios from 'axios'
import { loadScript } from '@/utils'

definePage({
  meta: {
    title: 'pages.login.index',
    hideMenu: true
  }
})

// config: {
//   captchaId: 'a0d0fb780077660c40b3c784450aca55',
//   language: 'zho',
//   product: 'popup'
// },

const userIcon = () => <i class="i-ep:user text-xl self-center"></i>
const passIcon = () => <i class="i-ep:lock text-xl self-center"></i>
const mobileIcon = () => <i class="i-ep:cellphone text-xl self-center"></i>
const messageIcon = () => <i class="i-ep:message text-xl self-center"> </i>

const domRef = ref()
const tokenRef = ref()
const testRef = ref()

const handleCallback = (token) => {
  console.log('🚀 ~ handleCallback ~ token:', token)
}

const handleTabChange = (tab) => {
  if (tab === 'pass') {
    // 重新加载 api.js 并回调
    domRef.value = loadScript(
      'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback',
      {
        flag: true
      }
    )
  }
}

const loginFormRef = ref()
const codeFormRef = ref()
const activeName = ref('pass')
const loginFormSchema = ref<VpFormSchema>([
  {
    prop: 'username',
    value: '',
    type: 'input',
    attrs: {
      placeholder: '请输入用户名'
    },
    span: 24,
    labelSlot: userIcon,
    rules: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
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
