const express = require('express')
const router = express.Router()
const ideas = require('./ideas')
const passport = require('passport')

let app = express()
app.use(router)

router.use(ideas)
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ message: 'Bad credentials' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  req.logout()
  res.json({ ok: true })
})

// Passport Auth
router.get('/auth', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/auth/callback',
  passport.authenticate('google', {
    failureRedirect: '/ideas#BAD',
    successRedirect: '/ideas'
  }),
  (req, res) => {
    console.log('authenticated')
  }
);

module.exports = {
  path: '/api',
  handler: app
}
