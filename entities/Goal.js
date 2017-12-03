const Entity = require('../lib/entities/Entity')

class Goal extends Entity {
  constructor ({name, id}) {
    super()
    this.name = name
    this.id = id
  }
}

module.exports = Goal
