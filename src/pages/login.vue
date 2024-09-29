<template>
  <div class="w-[900px] h-[600px] rounded">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="密码登录" name="pass">
        <VpForm :schema="loginFormSchema" @submit="handleSubmit"></VpForm>
      </el-tab-pane>
      <el-tab-pane label="验证码登录" name="code">Config</el-tab-pane>
    </el-tabs>
  </div>

</template>

<script setup lang="tsx">
import type { VpFormSchema } from "el-admin-components"
import type { TabsPaneContext } from "element-plus/es/components/tabs/src/constants";
definePage({
  meta: {
    title: '欢迎 回来',
    hideMenu: true,
    layout: 'single-page',
    position: 'center',
    backgroundImage: './bg.jpg'
  }
})
const activeName = ref('pass')

const userIcon = () => <i class="i-ep:user text-xl self-center"></i>

const passIcon = () => <i class="i-ep:lock text-xl self-center"></i>

const loginFormSchema = ref<VpFormSchema[]>([
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
      placeholder: '请输入密码'
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

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}


const handleSubmit = (form: any) => {
  console.log('🚀 ~ file: login.vue:37 ~ handleSubmit ~ form:', form)
}
</script>

<style scoped></style>
