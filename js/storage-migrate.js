const log = require('#/js/logger')

let currentVersion = 2

function migrate (storage) {
  let version = storage.get('version')
  if (!version) { version = 1 }

  switch (version) {
    case 1:
      log('Migrating storage from version 1 to version 2')
      let stickers = storage.get('stickers')
      for (let i = 0; i < stickers.length; i++) {
        stickers[i].startingId = parseInt(stickers[i].starting_id) // wrap in parseInt to get a copy
        delete stickers[i].starting_id
      }
      storage.set('stickers', stickers)
      break
  }
  storage.set('version', currentVersion)
}

module.exports = migrate
