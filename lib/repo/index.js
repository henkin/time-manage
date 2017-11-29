const eventer = require('../eventer')
const persister = require('../persister')
const uuidv4 = require('uuid/v4')
const Event = require('../entities/Event')

async function create (entity) {
  // validate entity

  // persist entity
  await persister.create(entity)

  // raise event
  await persister.create(new Event(entity))

  console.log('raised event')
  // console.log(result)
  return entity
}

async function update (entity) {
  // update all the found results
}

async function find (query) {
  console.log('find')
}

async function deleteAll (tableName) {
  return persister.deleteAll(tableName)
}

module.exports = {
  create,
  update,
  find,
  deleteAll
}
