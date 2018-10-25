const Base = require('#/js/storage-base')
const about = require('#/package.json')
const migrate = require('#/js/storage-migrate')

class Storage extends Base {
  initialize () {
    if (!this.get('stickers')) { this.set('stickers', []) }
    if (!this.get('width')) { this.set('width', 344) }
    if (!this.get('height')) { this.set('height', 326) }
    migrate(this)
  }
  get (key) { return window.BdApi.getData(about.id, key) }
  set (key, value) { window.BdApi.setData(about.id, key, value) }
}

module.exports = Storage
