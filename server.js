const Nuxt = require('nuxt').Nuxt
const Builder = require('nuxt').Builder
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportAuth = require('./passport-auth')
const eventer = require('./lib/eventer')
const app = express()

passportAuth(passport);
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  secret: 'henkin-ville',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))
app.use(passport.initialize());
app.use(passport.session());

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch(err => {
    console.error('builder', err)
    process.exit(1)
  })
}

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
});

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console

io.on('connection', eventer.socketServerInit)
// (socket) => {
//   console.log('socket connected: ' + socket.id)
//   // socket.on('last-messages', function (fn) {
//   //   fn(messages.slice(-50))
//   // });
//   // socket.on('send-message', function (message) {
//   //   messages.push(message)
//   //   socket.broadcast.emit('new-message', message)
//   // })
// })
