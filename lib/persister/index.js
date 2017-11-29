const r = require('rethinkdbdash')()

async function create (entity) {
  // create entity
  try {
    await ensureTable(entity.tableName)

    let insertResult
    insertResult = await r.table(entity.tableName)
      .insert(entity)
      .run({durability: 'soft'})
    //return insertResult
    if (insertResult.errors > 0) {
      throw new Error(insertResult.errors)
    }

    return entity.id
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
  try {
    console.log('deleteAll')
    await r.table(tableName).delete()
  } catch (err) {
    console.error(err)
  }
}

async function ensureTable (tableName) {
  let tableList = await r.tableList()
  if (!tableList.find(e => e === tableName)) {
    await r.tableCreate(tableName)
  }
}

module.exports = {
  create,
  find,
  deleteAll
}
