export function update (target, changes) {
  if (changes.old_val) {
    let old = target.findIndex(t => t.id === changes.old_val.id)
    if (changes.new_val) { // update
      Object.assign(target[0], {}, changes.new_val)
    } else { // delete
      target.splice(old, 1)
    }
    return;
  }
  if (changes.new_val) {
    // create
    // let old = target.findIndex(t => t.id === changes.old_val.id)
    // if (old)
    target.push(changes.new_val)
  }
}
