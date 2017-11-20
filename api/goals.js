const router = require('express').Router()
const r = require('rethinkdbdash')()

// Mock Users
const users = [
  {name: 'Alexandre'},
  {name: 'Pooya'},
  {name: 'Sébastien'}
]

console.info('loaded Goals API')

/* GET goals. */
router.get('/goals', async function (req, res, next) {
  console.log(req)
  try {
    let result = await r.table('data').run()
    console.log(result, Array.isArray(result)) // true
  } catch (err) {
    console.error(err)
  }
  res.json(users)
})

/* POST create goal */
router.post('/goals', async function (req, res, next) {
  // console.log('got data: ', req.body)
  let tableList = await r.tableList()
  if (!tableList.find(e => e === 'events')) {
    await r.tableCreate('events')
  }
  let insertResult = await r.table('events').insert({ createdAt: new Date(), entity: req.body })
  console.log(insertResult, Array.isArray(insertResult))
  console.log('body: ', req.body)
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
