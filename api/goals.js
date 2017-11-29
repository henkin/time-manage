const router = require('express').Router()
const repo = require('../lib/repo')
const Goal = require('../lib/entities/Goal')

console.info('loaded Goals API')

/* GET goals. */
router.get('/goals', async function (req, res, next) {
  let result = await repo.find('goals')
  res.json(result)
})

/* POST create goal */
router.post('/goals', async function (req, res, next) {
  let result = await repo.create(new Goal(req.body.name))
  res.json(result)
})

/* GET user by ID. */
// router.get('/goals/:id', function (req, res, next) {
//   const id = parseInt(req.params.id)
//   if (id >= 0 && id < users.length) {
//     res.json(users[id])
//   } else {
//     res.sendStatus(404)
//   }
// })

module.exports = router
