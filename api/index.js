const express = require('express')
const router = express.Router()
const ideas = require('./ideas')
let app = express()
router.use(ideas)
app.use(router)

module.exports = {
  path: '/api',
  handler: app
}
