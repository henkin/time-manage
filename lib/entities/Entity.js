const pluralize = require('pluralize')
const changeCase = require('change-case')

class Entity {
  constructor () {
    console.log(`${this.type} constructed`)
  }

  get type () {
    return this.constructor.name
  }

  get tableName () {
    return changeCase.paramCase(pluralize(this.type))
  }
}

module.exports = Entity
