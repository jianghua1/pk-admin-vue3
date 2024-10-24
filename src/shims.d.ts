declare interface Window {
  onloadTurnstileCallback: () => void
}

declare const initGeetest4: import('@/components/verification/types').initType
declare const turnstile: any

declare module '*.vue' {
  import { type DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare const __APP_VERSION__: string
