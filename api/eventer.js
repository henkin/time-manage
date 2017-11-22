const r = require('rethinkdbdash')()

async function ensureTable () {
  let tableList = await r.tableList()
  if (!tableList.find(e => e === 'events')) {
    await r.tableCreate('events')
  }
}

async function create (type, data) {
  let insertResult
  try {
    await this.ensureTable()

    insertResult = await r.table('events').insert({createdAt: new Date(), entity: data})
    // console.log(insertResult, Array.isArray(insertResult))
    // console.log('craete data: ', data)
  } catch (err) {
    console.err('create error')
  }
  return insertResult
}

async function find (type, data) {
  let result = {}
  try {
    await this.ensureTable()

    // let result = await db.table('goals')
    result = await r.table('events').run()
    // console.log(result, Array.isArray(result)) // true
  } catch (err) {
    console.error('find error')
  }
  return result
}

module.exports = {
  ensureTable,
  create,
  find
}
