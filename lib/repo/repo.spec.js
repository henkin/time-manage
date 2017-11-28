const repo = require('./index')('item')
const persister = require('../persister')

describe('repo', function () {
  it('create', async function () {
    const createdItem = await repo.create({name: 'test item'})

    console.log(createdItem)

    await repo.deleteAll(createdItem.id)

    await persister.deleteAll('event')
  })
})