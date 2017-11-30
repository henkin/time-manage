const express = require('express')
const router = express.Router()
const goals = require('./goals')
let app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.json({ it: 'works!' })
})

io.on('connection', function(socket) {
  console.log('a user connected');
});

router.use(goals)

app.use(router)

process.on('unhandledRejection', error => {
  // Won't execute
  console.log('unhandledRejection', error);
});

module.exports = {
  path: '/api',
  handler: app
}
