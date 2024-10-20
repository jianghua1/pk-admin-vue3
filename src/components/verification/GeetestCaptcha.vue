<template>
  <div id="captcha" ref="captchaRef"></div>
</template>

<script setup lang="ts">
import { loadScript } from '@/utils'
import type { CaptchaConfigType, CaptchaEventsType } from './types'

const props = withDefaults(defineProps<CaptchaConfigType>(), {
  product: 'float',
  nativeButton: () => ({ width: '260px', height: '50px' }),
  rem: 1,
  language: 'zho',
  timeout: 30000,
  hideBar: () => [],
  mask: () => ({ outside: true, bgColor: '#0000004d' }),
  apiServers: () => ['gcaptcha4.geetest.com'],
  hideSuccess: false
})

const emits = defineEmits<CaptchaEventsType>()

const captchaRef = ref()
const captcha = ref()

defineExpose({
  getInstance: () => captcha.value,
  reset: () => captcha.value.reset(),
  destroy: () => captcha.value.destroy(),
  showCaptcha: () => captcha.value.showCaptcha(),
  getValidate: () => captcha.value.getValidate()
})

function captchaHandler(captchaObj: any) {
  captcha.value = captchaObj

    .appendTo(captchaRef.value)
    .onReady(function () {
      emits('onReady')
    })
    .onNextReady(function () {
      emits('onNextReady')
    })
    .onBoxShow(function () {
      emits('onBoxShow')
    })
    .onError(function (e: any) {
      emits('onError', e)
    })
    .onSuccess(async function () {
      emits('onSuccess')
    })
}

watch(
  props,
  () => {
    initGeetest4(toRaw(props), captchaHandler)
  },
  { deep: true }
)

onMounted(() => {
  loadScript('https://static.geetest.com/v4/gt4.js', { defer: true })

  const { pause } = useIntervalFn(
    () => {
      if (typeof initGeetest4 === 'function') {
        initGeetest4(toRaw(props), captchaHandler)
        pause()
      }
    },
    100,
    { immediate: true }
  )
})
// import { defineComponent } from 'vue'

// export default defineComponent({
//   name: 'GeetestCaptcha',
//   props: ['captchaConfig'],
//   setup(prop) {
//     ;(window as any).initGeetest4(prop.captchaConfig.config, prop.captchaConfig.handler)
//   }
// })
</script>
