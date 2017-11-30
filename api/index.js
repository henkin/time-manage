const express = require('express')
const router = express.Router()
const goals = require('./goals')
let app = express()
router.use(goals)
app.use(router)

module.exports = {
  path: '/api',
  handler: app
}
