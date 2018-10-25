const log = require('#/js/logger')
const template = require('#/templates/pack')

class Pack {
  constructor (root) {
    this.storage = root.storage
    this.menu = root.menu
    root.appendPack = this.addPack.bind(this)
  }
  getPack (title, stickerId, length) {
    return {
      title: title,
      startingId: Number(stickerId),
      length: Number(length)
    }
  }
  addPack (title, stickerId, length) {
    function parseAsInteger (name, variable) {
      if (!Number.isInteger(variable)) {
        if (typeof variable !== 'string') { throw Error(`Parsing: ${name} is not a number nor string`) }
        variable = parseInt(variable, 10)
        if (isNaN(variable)) { throw Error(`Parsing: ${name} is not a number`) }
        log(`${name} was passed as string, parsed as integer ${variable}`)
      }
      return variable
    }

    if (!title) { throw Error('Parsing: Title is not defined') }
    if (typeof title !== 'string') { throw Error('Parsing: Title is not a string') }

    if (!stickerId) { throw Error('Parsing: Sticker ID is not a defined') }
    stickerId = parseAsInteger('First sticker ID', stickerId)

    if (!length) {
      length = 40
      log(`Length is not explicitly defined, defaulting to ${length}`)
    }
    length = parseAsInteger('Length', length)

    let storage = this.storage
    if (storage.getPack(stickerId)) {
      log('Pack already exists in storage')
      return
    }

    let pack = this.getPack(title, stickerId, length)
    storage.addPack(pack)
    this.menu.rebuild()
    this.menu.appendPack(stickerId)
  }
  wrapPack (stickerId) {
    let pack = this.storage.getPack(stickerId)
    if (!pack) { return }
    return template(pack)
  }
}

module.exports = Pack
