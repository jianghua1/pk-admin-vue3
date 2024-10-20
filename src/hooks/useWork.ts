export function useWork() {
  const localId = ref('')
  const routeIds = ref({})
  const message = ref()

  const events = new Map()
  const worker = new SharedWorker(new URL('@/utils/shared-worker.js', import.meta.url))

  worker.port.start()

  const route = useRoute()

  worker.port.onmessage = function (event) {
    const { type, id, eventName, data, routeIds: updatedRouteIds } = event.data
    if (type === 'connected') {
      localId.value = id
      console.log('connected 成功', localId.value)
      // routeIds.value[id] = route.fullPath
      worker.port.postMessage({ type: 'routeUpdate', route: route.fullPath })
    } else if (type === 'update') {
      // 更新本地存储的路由ID信息
      routeIds.value = updatedRouteIds
    } else {
      // 往指定的事件名称发送消息
      if (events.has(eventName)) {
        const handlers = events.get(eventName)
        handlers.forEach((handler) => handler(data))
      }
      // 点对点发送消息 emit(routePath)
      if (eventName === route.fullPath) {
        const handlers = events.get('message') || []
        handlers.forEach((handler) => handler(data))
      }
      // console.log('收到消息：', event.data)
      message.value = event.data
    }
  }

  function emit(eventName: string, data: any) {
    worker.port.postMessage({ type: 'emit', eventName, data })
  }
  function on(eventName, handler) {
    // 判断 eventName 是否有存在于 events
    if (!events.has(eventName)) {
      events.set(eventName, new Set())
    }
    events.get(eventName).add(handler)
  }

  function broadcast(data) {
    worker.port.postMessage({ type: 'broadcast', data })
  }

  function off(eventName, handler) {
    if (events.has(eventName)) {
      const handlers = events.get(eventName)
      handlers.delete(handler)
      if (handlers.size === 0) {
        events.delete(eventName)
      }
    }
  }

  const handleClose = () => {
    // console.log('Tab is closing')
    worker.port.postMessage({ type: 'close' })
  }

  // tab关闭事件
  window.addEventListener('beforeunload', handleClose)

  onUnmounted(() => {
    events.forEach((handlers, eventName) => {
      handlers.forEach((handler) => {
        off(eventName, handler)
      })
    })
    window.removeEventListener('beforeunload', handleClose)
  })

  return {
    worker,
    routeIds,
    localId,
    message,
    emit,
    on,
    broadcast
  }
}
