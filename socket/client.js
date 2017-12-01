let clientSubscribers = {}
let socket;

function init (clientSocket) {
  socket = clientSocket
  socket.on('data', data => {
    console.log('client received "data": ', data)
  })
}

function subscribe (url, action) {
  clientSubscribers[url] = action
  socket.emit('subscribe', {url, action})
}

module.exports = {
  subscribe,
  init
}
