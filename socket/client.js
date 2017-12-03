let clientSubscribers = {}
let socket;

function init (clientSocket) {
  socket = clientSocket
  socket.on('data', ({ tableName, record }) => {
    console.info(`socket received - ${tableName}`, record)
    clientSubscribers[tableName](record) // love js
  })
}

function subscribe (io, url, action) {
  clientSubscribers[url] = action
  io.emit('subscribe', url)
}

module.exports = {
  subscribe,
  init
}
