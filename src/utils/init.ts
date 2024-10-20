// 1. timestamp -> new timestamp => 7-30
// 2. package.json -> version -> localStorage
export async function checkForUpdatesStorege(flag: boolean = false, url: string = '') {
  let appVersion = localStorage.getItem('appVersion') || __APP_VERSION__
  const lastLoginTime = localStorage.getItem('lastLoginTime') || 0
  const now = new Date().getTime()

  let shouldUpdate = flag

  // 超过7天
  if (lastLoginTime && now - parseInt(lastLoginTime) > 7 * 24 * 60 * 60 * 1000) {
    shouldUpdate = true
  }

  try {
    const res = await fetch(url || 'ver.json')
    if (!res.ok) throw new Error('请求ver.json 失败')
    const { version } = await res.json()
    if (version && appVersion !== version) {
      shouldUpdate = true
      appVersion = version
    }
  } catch (error) {
    console.error('error', error)
  }

  if (shouldUpdate) {
    // 强制更新 localStorage，清空之前的缓存
    localStorage.clear()
  }
  localStorage.setItem('lastLoginTime', now.toString())
  localStorage.setItem('appVersion', appVersion)
}
