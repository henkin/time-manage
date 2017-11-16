const express = require('express')
const router = express.Router()
const goals = require('./goals')
let app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.json({ it: 'works!' })
})

router.use(goals)

app.use(router)

module.exports = {
  path: '/api',
  handler: app
}
