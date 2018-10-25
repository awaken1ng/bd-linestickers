const Categories = require('#/js/categories')
const Menu = require('#/js/menu-betterdiscord')
const Preview = require('#/js/preview')
const Storage = require('#/js/storage-betterdiscord')
const Pack = require('#/js/pack')
const EditBar = require('#/js/editbar')
const Confirm = require('#/js/confirm')
const Settings = require('#/js/settings')
const observer = require('#/js/observer')

const about = require('#/package.json')
const css = require('#/css/stylesheet')
const log = require('#/js/logger')

module.exports = class {
  constructor () {
    this.storage = new Storage()
    this.settings = new Settings()
    this.categories = new Categories()
    this.menu = new Menu()
    this.preview = new Preview()
    this.pack = new Pack(this)
    this.editbar = new EditBar()
    this.confirm = new Confirm()
    this.observer = observer
    window[about.id] = this
  }
  load () { log('Loaded') }
  unload () { log('Unloaded') }
  start () {
    log('Initializing')
    BdApi.clearCSS('lineemotes')
    BdApi.injectCSS('lineemotes', css)
    this.storage.initialize()
    this.menu.initialize()
  }
  stop () {
    log('Stopping, reverting emote menu to default')
    this.menu.destroy()
    BdApi.clearCSS('lineemotes')
  }
  onMessage () {}
  onSwitch () {}
  getSettingsPanel () { return this.settings.getPanel() }
  getName () { return about.prettyName }
  getDescription () { return about.description }
  getAuthor () { return about.author }
  getVersion () { return about.version }
}
