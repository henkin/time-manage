const Nuxt = require('nuxt').Nuxt
const Builder = require('nuxt').Builder
let express = require('express')
const goals = require('./api/goals')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const router = express.Router()
router.use(goals)

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}))

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  try {
    await builder.build()
  } catch (e) {
    console.error(error)
    process.exit(1)
  }
}

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error);
});

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console

// Socket.io
// let messages = []
io.on('connection', (socket) => {
  console.log('connected')
  // socket.on('last-messages', function (fn) {
  //   fn(messages.slice(-50))
  // });
  // socket.on('send-message', function (message) {
  //   messages.push(message)
  //   socket.broadcast.emit('new-message', message)
  // })
})
