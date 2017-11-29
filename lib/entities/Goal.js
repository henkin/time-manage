const Entity = require('./Entity')

class Goal extends Entity {
  constructor (name) {
    super()
    this.name = name
  }
}

module.exports = Goal
