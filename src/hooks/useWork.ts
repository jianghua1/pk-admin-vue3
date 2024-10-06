export function useWork() {
  const localId = ref('')
  const routeIds = ref({})
  const message = ref()

  const events = new Map()
  const worker = new SharedWorker(new URL('@/utils/shared-worker.js', import.meta.url))

  worker.port.start()

  const route = useRoute()

  worker.port.onmessage = function (event) {
    const { type, id, eventName, data } = event.data
    if (type === 'connected') {
      localId.value = id
      routeIds.value[id] = route.fullPath
    } else {
      //往指定的事件名发送消息
      if (events.has(eventName)) {
        const handlers = events.get(eventName)
        handlers.forEach((handler) => handler(data))
      }
      //点对点消息
      if (eventName === route.fullPath) {
        const handlers = events.get('message') || []
        handlers.forEach((handler) => handler(data))
      }
      console.log('收到消息：', event.data)
      message.value = event.data
    }
  }
  //发送消息
  function emit(eventName: string, data: any) {
    worker.port.postMessage({ type: 'emit', eventName, data })
  }

  function on(eventName: string, handler) {
    if (!events.has(eventName)) {
      events.set(eventName, new Set())
    }
    events.get(eventName).add(handler)
  }

  function broadcast(data: any) {
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
    worker.port.postMessage({ type: 'close' })
  }

  //添加关闭事件
  window.addEventListener('beforeunload', handleClose)

  onUnmounted(() => {
    events.forEach((handlers, eventName) => {
      handlers.forEach((handler) => {
        off(eventName, handler)
      })
    })
    //移除关闭事件
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
