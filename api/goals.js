const router = require('express').Router()
const eventer = require('./eventer')

// Mock Users
const users = [
  {name: 'Alexandre'},
  {name: 'Pooya'},
  {name: 'Sébastien'}
]

console.info('loaded Goals API')

/* GET goals. */
router.get('/goals', async function (req, res, next) {
  let result = await eventer.find('goal')
  res.json(result)
})

/* POST create goal */
router.post('/goals', async function (req, res, next) {
  let result = await eventer.create('goal', req.body)
  res.json(result)
})

/* GET user by ID. */
router.get('/goals/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
