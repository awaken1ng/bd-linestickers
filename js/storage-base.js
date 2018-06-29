const log = require('#/js/logger')

class Storage {
  getPack (id) {
    let stickers = this.get('stickers')
    for (let i = 0; i < stickers.length; i++) {
      if (stickers[i].starting_id === id) return stickers[i]
    }
  }
  addPack (pack) {
    if (this.getPack(pack.starting_id)) {
      log('Pack is already in storage, aborting')
      return
    }
    let stickers = this.get('stickers')
    stickers.push(pack)
    this.set('stickers', stickers)
    log(`Successfully added pack '${pack['title']}' to the storage`)
  }
  deletePack (id) {
    let stickers = this.get('stickers')
    for (let i = 0; i < stickers.length; i++) {
      log(`Deleting pack ${id} - ${stickers[i]['title']}`)
      stickers.splice(i, 1)
      this.set('stickers', stickers)
      lineemotes.menu.rebuild()
      return
    }
    log(`Pack ${id} was not found in storage during deletion`)
  }
  swapPack (from, to) {
    let stickers = this.get('stickers')
    let temp = stickers[from]
    stickers[from] = stickers[to]
    stickers[to] = temp
    this.set('stickers', stickers)
    log(`Successfully swapped packs '${stickers[to]['title']}' and '${stickers[from]['title']}'`)
  }
  renamePack (id, newTitle) {
    if (!this.getPack(id)) {
      log(`Pack ${id} was not found in storage`)
      return
    }
    let stickers = this.get('stickers')
    for (let i = 0; i < stickers.length; i++) {
      if (stickers[i].starting_id === id) {
        stickers[i].title = newTitle
        this.set('stickers', stickers)
        lineemotes.menu.rebuild()
        return
      }
    }
  }
}

module.exports = Storage
