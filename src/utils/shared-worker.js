/* eslint-disable no-undef */
// 页面在初始化 worker 的时候，会传入一个 id 与 name
const connections = {}
let nextId = 0

function generatedUnqueId() {
  return `id-${nextId++}`
}

// 广播消息
// message - 消息内容，excludeId - 排除的 id
function broadcast(message, execludeId) {
  Object.values(connections).forEach(({ port, id }) => {
    if (id !== execludeId) {
      port.postMessage(message)
    }
  })
}

function getRouteIds() {
  // { id: route }
  const routeIds = Object.fromEntries(
    Object.entries(connections).map(([id, { route }]) => [id, route])
  )
  return routeIds
}

onconnect = function (e) {
  const port = e.ports[0]
  const id = generatedUnqueId()
  connections[id] = { port, id }

  // port.onmessage
  port.onmessage = function (event) {
    const { type, eventName, data, route } = event.data
    if (type === 'emit') {
      broadcast({ eventName, data, fromId: id }, id)
    } else if (type === 'routeUpdate') {
      connections[id].route = route
      // 通知其他页面
      const routeIds = getRouteIds()
      broadcast({ type: 'update', routeIds }, id)
    } else if (type == 'close') {
      delete connections[id]
      const routeIds = getRouteIds()
      broadcast({ type: 'update', routeIds }, id)
    } else {
      const sendData = type === 'broadcast' ? { eventName: 'message' } : {}
      broadcast({ ...event.data, ...sendData, fromId: id }, id)
    }
  }

  port.postMessage({ type: 'connected', id, ids: Object.keys(connections) })
  port.start() // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}
