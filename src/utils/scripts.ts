// 动态加载 script 到页面，判断 script 是否加载，如果已经加载则跳过
// attrs: { flag: boolean } , flag - true强制删除 script 并重新加载
export function loadScript(src: string, attrs: Record<string, any> = {}) {
  const dom = document.querySelector(`script[src="${src}"]`)
  if (dom && !attrs.flag) return dom

  if (dom) {
    dom.remove()
  }

  const script = document.createElement('script')
  script.src = src

  Object.entries(attrs).forEach(([key, value]) => {
    script.setAttribute(key, value)
  })

  document.head.appendChild(script)
  return script
}
