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

onconnect = function (e) {
  const port = e.ports[0] as MessagePort
  const id = generatedUnqueId()
  connections[id] = { port, id }

  port.addEventListener('message', function (event) {
    const { type, data, eventName } = event.data
    if (type === 'emit') {
      broadcast({ eventName, data, formId: id }, id)
    } else {
      const sendData = type === 'broadcast' ? { eventName: 'message' } : {}
      broadcast({ ...event.data, ...sendData, formId: id }, id)
    }
  })

  port.onclose = function () {
    delete connections[id]
    port.postMessage({ type: 'update', ids: Object.keys(connections) })
  }

  port.postMessage({ type: 'connected', id, ids: Object.keys(connections) })
  port.start() // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}
