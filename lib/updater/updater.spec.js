import { update }  from './index'
import { expect } from 'chai'

describe('updater', function () {
  it('create', function () {
    let target = [{id: 'abc'}]
    let newVal = {id: 'xyz', name: 'something'}

    update(target, {
      new_val: newVal,
      old_val: null
    });
    expect(target).to.deep.equal([{id: 'abc'}, newVal])
  })

  it('thinks create, but is really an update', function() {
    let target = [{id: 'abc'}, {id: 'xyz', name: 'orig'}]
    let newVal = {id: 'xyz', name: 'something'}

    update(target, {
      new_val: newVal,
      old_val: null
    });
    expect(target).to.deep.equal([{id: 'abc'}, newVal])
  })

  it('delete', function() {
    let target = [{id: 'abc'}, {id: 'xyz', name: 'remove'}]

    update(target, {
      old_val: {id: 'xyz', name: 'remove'},
      new_val: null
    });
    expect(target).to.deep.equal([{id: 'abc'}])
  })

  it('update', function() {
    let original = [{id: 'xyz', name: 'orig'}]
    let updated = [{id: 'xyz', name: 'new name!'}]

    update(original, {
      old_val: {id: 'xyz', name: 'orig'},
      new_val: {id: 'xyz', name: 'new name!'}
    });
    expect(original).to.deep.equal([{id: 'xyz', name: 'new name!'}])
  })
})