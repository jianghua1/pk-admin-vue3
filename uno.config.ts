// uno.config.ts
import { defineConfig } from 'unocss'
// import presetWind from '@unocss/preset-wind'
import { presetWind, presetIcons } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  rules: [
    [
      'm-safe',
      {
        'margin-top': 'env(safe-area-inset-top)',
        'margin-right': 'env(safe-area-inset-right)',
        'margin-bottom': 'env(safe-area-inset-bottom)',
        'margin-left': 'env(safe-area-inset-left)'
      }
    ],
    [
      /^bg-img-\[(.+)\]$/,
      ([, value]) => {
        // 替换下划线为正常的路径分隔符
        const path = value.replace(/_/g, '/')
        return { 'background-image': `url(${path})` }
      }
    ]
  ],
  shortcuts: {
    'bg-default': 'bg-[var(--el-bg-color)]',
    'bg-info': 'bg-[var(--el-color-info)]',
    'bg-primary': 'bg-[var(--el-color-primary)]',
    'bg-success': 'bg-[var(--el-color-success)]',
    'bg-warning': 'bg-[var(--el-color-warning)]',
    'bg-error': 'bg-[var(--el-color-error)]',
    // container默认背景与内边距
    'container-default': 'bg-default rounded p-4',
    'left-marker':
      "relative pl-4 after:(content-[''] inline-block absolute left-0 top-0 w-[4px] h-[22px] bg-[var(--el-color-primary)])"
  },
  presets: [
    presetWind(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block'
      }
    })
  ],
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xl2: '1444px',
      '2xl': '1536px'
    }
  },
  safelist: ['ep:full-screen', 'ri:fullscreen-exit-fill'],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
