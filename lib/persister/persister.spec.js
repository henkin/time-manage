// const persister = require('./persister')
const Entity = require('../entities/Entity')
const expect = require('chai').expect

class TestItem extends Entity {
}

describe('repo', function () {
  it('create', function (done) {
    let testItem = new TestItem()
    expect(testItem.tableName).to.equal('test-items')
    done()
    // const createdItem = await persister.create('item', {name: 'test item'})
    //
    // console.log(createdItem)
    //
    // await repo.deleteAll(createdItem.id)
    //
    // await persister.deleteAll('event')
  })
})
