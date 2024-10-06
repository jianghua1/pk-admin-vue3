export function useWork() {
  const localId = ref('')
  const routeIds = ref({})
  const message = ref()

  const events = new Map()
  const worker = new SharedWorker(new URL('@/utils/shared-worker.ts', import.meta.url))

  worker.port.start()

  const route = useRoute()

  worker.port.onmessage = function (event) {
    const { type, id, eventName, data } = event.data
    if (type === 'connected') {
      console.log('注册成功')
      localId.value = id
      routeIds.value[id] = route.fullPath
    } else {
      console.log('收到消息：', 11111)
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
    console.log('我执行了2')
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

  onUnmounted(() => {
    // TODO 销毁event
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
