const r = require('rethinkdbdash')({pool: false})

async function create (tableName, entity) {
  // create entity
  try {
    let insertResult
    insertResult = await r.table(tableName).insert(entity)
    return insertResult
  } catch (err) {
    let msg = 'create error: ' + err
    console.error(msg)
    throw new Error(msg)
  }
}

async function find (query) {
  // find all entities
  return r.table('events').run()
}

async function deleteAll (tableName) {

}

async function ensureTable (tableName) {
  let tableList = await r.tableList()
  if (!tableList.find(e => e === tableName)) {
    await r.tableCreate(tableName)
  }
}

module.exports = {
  create,
  find
}
