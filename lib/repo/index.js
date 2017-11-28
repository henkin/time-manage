const eventer = require('../eventer')
const uuidv4 = require('uuid/v4')
class Repository {
  constructor (tableName) {
    this.tableName = tableName
  }

  async create (entity) {
    // validate entity
    // raise event
    entity.id = uuidv4()
    const result = await eventer.raise('create', this.tableName, entity)
    console.log(result)
    return entity
  }

  find (query) {
  }

  async deleteAll () {
    return persister.deleteAll(this.type)
  }
}

module.exports = (type) => {
  return new Repository(type)
}
