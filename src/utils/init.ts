export async function checkForUpdatesStorege(flag: boolean = false,
  url: string = '') {
  let appVersion = localStorage.getItem('appVersion') || __APP_VERSION__
  const lastLoginTime = localStorage.getItem('lastLoginTime') || 0
  const now = new Date().getTime()

  let shouldUpdate = flag

  if (lastLoginTime && now - parseInt(lastLoginTime) > 30 * 24 * 60 * 60 * 1000) {
    shouldUpdate = true
  }

  try {
    const res = await fetch(url || 'ver.json')
    if (!res.ok) throw new Error('Network response was not ok')
    const { version } = await res.json()
    if (version && appVersion !== version) {
      shouldUpdate = true
      appVersion = version
    }
  } catch (error) {
    console.error('error', error)
  }
  if (shouldUpdate) {
    localStorage.clear()
  }
  localStorage.setItem('appVersion', appVersion)
  localStorage.setItem('lastLoginTime', now.toString())
}
