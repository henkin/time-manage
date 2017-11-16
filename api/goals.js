const router = require('express').Router()

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]

console.info('loaded Goals API')

/* GET goals. */
router.get('/goals', function (req, res, next) {
  console.log(req)
  res.json(users)
})

/* POST create goal */
router.post('/goals', function (req, res, next) {
  // console.log('got data: ', req.body)
  console.log('name: ', req.body.name)
  res.json(users)
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
