<template>
  <div ref="widgetRef"></div>
</template>

<script setup lang="ts">
import { loadScript } from '@/utils'
import type { TurnstileConfigType, TurnstileEventsType } from './types'

const props = withDefaults(defineProps<TurnstileConfigType>(), {
  sitekey: '',
  action: '',
  cData: '',
  callback: () => {},
  'error-callback': () => {},
  execution: 'render',
  'expired-callback': () => {},
  'before-interactive-callback': () => {},
  'after-interactive-callback': () => {},
  'unsupported-callback': () => {},
  theme: 'auto',
  language: 'auto',
  tabindex: 0,
  'timeout-callback': () => {},
  'response-field': true,
  'response-field-name': 'cf-turnstile-response'
})

const emits = defineEmits<TurnstileEventsType>()

const domRef = ref()
const widgetRef = ref()
const id = ref('')

defineExpose({
  dom: () => widgetRef.value,
  reset: () => turnstile.reset(id.value),
  getResponse: () => turnstile.getResponse(id.value),
  destroy
})

const cbNameArr = [
  '',
  'error',
  'expired',
  'before-interactive',
  'after-interactive',
  'unsupported',
  'timeout'
]

function mergeCallback() {
  const obj = {}
  for (const key of cbNameArr) {
    const callbackName = !key ? 'callback' : `${key}-callback`
    const camelCaseName = callbackName.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

    obj[callbackName] = (...args) => {
      if (props[callbackName] && typeof props[callbackName] === 'function') {
        props[callbackName](...args)
      }
      emits(camelCaseName.replace('Callback', '') as any, args instanceof Array ? args[0] : args)
    }
  }
  // [key]: (...args) => {
  //   if (props[key] && typeof props[key] === 'function') {
  //     props[key](...args)
  //   }
  //   emits(key, args)
  // }
  return obj
}

function destroy() {
  if (widgetRef.value) {
    widgetRef.value.remove()
  }
  if (domRef.value) {
    domRef.value.remove()
  }
}

onMounted(() => {
  const res = mergeCallback()
  window.onloadTurnstileCallback = function () {
    if (widgetRef.value) {
      id.value = turnstile.render(widgetRef.value, toRaw({ ...props, ...res }))
    }
  }
  domRef.value = loadScript(
    'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback'
  )
})

onBeforeUnmount(() => {
  if (domRef.value) {
    domRef.value?.remove()
  }
})
</script>

<style scoped></style>
