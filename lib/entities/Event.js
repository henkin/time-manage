const Entity = require('./Entity')

class Event extends Entity {
  constructor (entity) {
    super()
    this.entity = entity
  }
}

module.exports = Event
