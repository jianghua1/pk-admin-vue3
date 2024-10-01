<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="用户名注册" name="pass">
        <VpForm :schema="regFormSchema" hide-required-asterisk ref="regFormRef" v-model="model">
          <template #actions>
            <el-button type="primary" @click="onSubmit" class="w-full">立即注册</el-button>
          </template>
        </VpForm>
      </el-tab-pane>
      <el-tab-pane label="手机注册" name="code">
        <VpForm :schema="codeFormSchema" @submit="handleSubmit" hide-required-asterisk ref="codeFormRef">
          <template #actions>
            <el-button type="primary" @click="onSubmit" class="w-full">立即注册</el-button>
          </template>
        </VpForm>
      </el-tab-pane>
    </el-tabs>
    <div class="flex justify-between mt-4 text-sm">
      <div>
        <span>已有账号？</span>
        <router-link to="/login" class="text-blue-400">立即登录></router-link>
      </div>
    </div>
  </div>

</template>

<script setup lang="tsx">
import { useForm } from "el-admin-components"
import type { VpFormSchema } from "el-admin-components"

const activeName = ref('pass')

const regFormRef = ref()

const codeFormRef = ref()

const userIcon = () => <i class="i-ep:user text-xl self-center"></i>

const passIcon = () => <i class="i-ep:lock text-xl self-center"></i>

const mobileIcon = () => <i class="i-ep:cellphone text-xl self-center"></i>

const messageIcon = () => <i class="i-ep:message text-xl self-center"></i>

const regFormSchema = ref<VpFormSchema>([
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
  },
  {
    prop: 'repassword',
    value: '',
    type: 'input',
    attrs: {
      placeholder: '请再次输入密码',
      type: 'password'
    },
    rules: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      // 密码需要6-32位的字符
      { min: 6, max: 32, message: '密码格式不正确', trigger: 'blur' },
      { validator: checkPass, trigger: 'blur' }
    ],
    span: 24,
    labelSlot: passIcon
  }
])

const { model, formValue } = useForm(regFormSchema.value);

//密码验证
function checkPass(rule: any, value: string, callback: any) {
  if (value !== formValue.value.password) {
    callback(new Error('两次输入密码不一致!'));
  }
  callback();
}

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
      placeholder: '请设置密码',
      type: 'password'
    },
    span: 24,
    labelSlot: passIcon
  }
])

const onSubmit = () => {
  regFormRef.value?.validate((valid) => {
    console.log(valid)
  })
}

const handleSubmit = (form: any) => {
  console.log('🚀 ~ file: login.vue:37 ~ handleSubmit ~ form:', form)
}
</script>

<style scoped></style>
