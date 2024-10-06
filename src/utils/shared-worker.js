/* eslint-disable no-undef */
const connections = {}
let nextId = 0

function generatedUnqueId() {
  return `id-${nextId++}`
}

/**
 * Broadcast a message to all ports in the connections object, except for the ports specified in the execludeIds array.
 *
 * @param {any} message - 收到的消息
 * @param {string[]} execludeIds - 排除的id
 */
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

  port.addEventListener('message', function (event) {
    const { type, eventName, data, route } = event.data
    if (type === 'emit') {
      broadcast({ eventName, data, formId: id }, id)
    } else if (type === 'routeUpdate') {
      connections[id].route = route
      const routeIds = getRouteIds()
      broadcast({ type: 'update', routeIds }, id)
    } else if (type === 'close') {
      delete connections[id]
      const routeIds = getRouteIds()
      broadcast({ type: 'update', routeIds }, id)
    } else {
      const sendData = type === 'broadcast' ? { eventName: 'message' } : {}
      broadcast({ ...event.data, ...sendData, formId: id }, id)
    }
  })

  port.postMessage({ type: 'connected', id, ids: Object.keys(connections) })
  port.start() // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}
