export function update (target, changes) {
  if (changes.old_val) {
    let old = target.findIndex(t => t.id === changes.old_val.id)
    if (changes.new_val) { // update
      Object.assign(target[old], {}, changes.new_val)
    } else { // delete
      target.splice(old, 1)
    }
    return;
  }
  if (changes.new_val) {
    // create
    let existing = target.findIndex(t => t.id === changes.new_val.id)
    if (existing >= 0) {
      Object.assign(target[existing], {}, changes.new_val)
    } else {
      target.push(changes.new_val)
    }
  }
}
