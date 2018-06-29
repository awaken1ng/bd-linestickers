const Base = require('#/js/storage-base')
const about = require('#/package.json')

class Storage extends Base {
  initialize () { if (!this.get('stickers')) { this.set('stickers', []) } }
  get (key) { return window.bdPluginStorage.get(about.id, key) }
  set (key, value) { window.bdPluginStorage.set(about.id, key, value) }
}

module.exports = Storage
