const persister = require('../persister')
const Entity = require('../entities/Entity')
const expect = require('chai').expect

class TestItem extends Entity {
}

describe('persister', function () {
  it('create', async function () {
    let testItem = new TestItem()
    expect(testItem.tableName).to.equal('test_items')

    const id = await persister.create(testItem)
    console.log(id)
    expect(id)

    await persister.deleteAll(testItem.tableName)
  })
})
