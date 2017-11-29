const repo = require('./index')
const persister = require('../persister')
const Entity = require('../entities/Entity')

class TestItem extends Entity {
  constructor (data) {
    super()
    this.data = data
  }
}

describe.only('repo', function () {
  it('create', async function () {
    let testItem = new TestItem({foo: 'bar'})
    const createdItem = await repo.create(testItem)

    console.log(createdItem)

    await repo.deleteAll(testItem)

    await persister.deleteAll('events')
  })
})
