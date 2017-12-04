const Entity = require('../lib/entities/Entity')

class Idea extends Entity {
  constructor ({name, id}) {
    super()
    this.name = name
    this.id = id
  }
}

module.exports = Idea
