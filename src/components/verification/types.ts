export interface CaptchaConfigType {
  captchaId: string // 验证 id，极验后台申请得到
  product?: 'float' | 'popup' | 'bind' // 设置下一步验证的展现形式
  nativeButton?: { width: string; height: string } // 极验按钮样式设置
  rem?: number // 设置验证码整体的缩放比例
  language?:
    | 'zho'
    | 'eng'
    | 'zho-tw'
    | 'zho-hk'
    | 'udm'
    | 'jpn'
    | 'ind'
    | 'kor'
    | 'rus'
    | 'ara'
    | 'spa'
    | 'pon'
    | 'por'
    | 'fra'
    | 'deu' // 设置验证界面文字的语言
  protocol?: string // 协议头
  timeout?: number // 设置验证过程中单个请求超时时间
  hideBar?: ('close' | 'refresh')[] // 隐藏后续验证界面的关闭按钮、刷新按钮
  mask?: { outside: boolean; bgColor: string } // 弹窗相关配置项
  apiServers?: string[] // 控制api请求的地址
  nextWidth?: string // 验证码弹窗的宽度
  riskType?: string // 结合风控融合，指定验证形式
  hideSuccess?: boolean // 隐藏bind展现形式下的验证成功弹窗
  offlineCb?: Function // 宕机模式处理函数
  onError?: Function // 初始化验证码之前的错误捕获
  userInfo?: string // 客户端信息
}

export type CaptchaEventsType = {
  onReady: []
  onNextReady: []
  onBoxShow: []
  onError: [error: any]
  onSuccess: []
}

export type CaptchaHandlerType = (captcha: any) => void

export type initType = (config: CaptchaConfigType, handler: CaptchaHandlerType) => void

export type TurnstileLanguageType =
  | 'auto'
  | 'ar-eg'
  | 'ar'
  | 'de'
  | 'en'
  | 'es'
  | 'fa'
  | 'fr'
  | 'id'
  | 'it'
  | 'ja'
  | 'ko'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'pt-br'
  | 'ru'
  | 'tlh'
  | 'tr'
  | 'uk'
  | 'uk-ua'
  | 'zh'
  | 'zh-cn'
  | 'zh-tw'

export type TurnstileEventsType = {
  callback: [token: string]
  error: [error: any]
  expired: []
  beforeInteractive: []
  afterInteractive: []
  unsupported: []
  timeout: []
}

export interface TurnstileConfigType {
  sitekey: string
  action?: string
  cData?: string
  callback?: (token: string) => void
  'error-callback'?: (error: any) => void
  execution?: 'render' | 'execute'
  'expired-callback'?: () => void
  'before-interactive-callback'?: () => void
  'after-interactive-callback'?: () => void
  'unsupported-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  language?: TurnstileLanguageType
  tabindex?: number
  'timeout-callback'?: () => void
  'response-field'?: boolean
  'response-field-name'?: string
}
