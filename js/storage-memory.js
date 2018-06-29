const Base = require('#/js/storage-base')

class Storage extends Base {
  initialize () { this.data = {'stickers': []} }
  get (key) { return this.data[key] }
  set (key, value) { this.data[key] = value }
}

module.exports = Storage
