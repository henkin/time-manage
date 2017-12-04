const router = require('express').Router()
const repo = require('../lib/repo')
const Idea = require('../entities/Idea')

console.info('loaded Idea API')

/* GET ideas. */
router.get('/ideas', async function (req, res, next) {
  let result = await repo.find('ideas')
  res.json(result)
})

/* POST create idea */
router.post('/ideas', async function (req, res, next) {
  await timeout(3000);
  let result = await repo.create(new Idea({ id: req.body.id, name: req.body.name }))
  res.json(result)
})

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* GET user by ID. */
// router.get('/ideas/:id', function (req, res, next) {
//   const id = parseInt(req.params.id)
//   if (id >= 0 && id < users.length) {
//     res.json(users[id])
//   } else {
//     res.sendStatus(404)
//   }
// })

module.exports = router
