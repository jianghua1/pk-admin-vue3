/* eslint-disable no-undef */
const ports = []
onconnect = function (e) {
  const port = e.ports[0] as MessagePort
  ports.push(port)

  port.addEventListener('message', function (e) {
    ports.forEach((p) => {
      if (p !== port) {
        p.postMessage(e.data)
      }
    })
  })

  port.start() // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}
