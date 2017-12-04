const pluralize = require('pluralize')
const changeCase = require('change-case')
const uuidv4 = require('uuid/v4')

class Entity {
  constructor () {
    this.id = uuidv4();
    this.createdAt = new Date()
    this.type = this.constructor.name
    console.log(`${this.type} constructed`)
  }

  get tableName () {
    return changeCase.snakeCase(pluralize(this.type))
  }
}

module.exports = Entity
