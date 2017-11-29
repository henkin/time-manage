const r = require('rethinkdbdash')()

async function create (entity) {
  // create entity
  try {
    await ensureTable(entity.tableName)

    let insertResult
    insertResult = await r.table(entity.tableName)
      .insert(entity, {returnChanges: true})
      .run({durability: 'soft'})

    if (insertResult.errors > 0) {
      throw new Error(insertResult.errors)
    }

    return insertResult.changes[0].new_val
  } catch (err) {
    let msg = 'create error: ' + err
    console.error(msg)
    throw new Error(msg)
  }
}

async function find (tableName, query) {
  // find all entities
  console.log('persister.find', tableName, query)

  try {
    await ensureTable(tableName)

    return r.table(tableName).run()
  } catch (e) {
    console.error(e)
  }
}

async function deleteAll (tableName) {
  try {
    console.log('deleteAll - ' + tableName)
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
