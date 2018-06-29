const Categories = require('#/js/_categories.js')
const Menu = require('#/js/menu-betterdiscord.js')
const Observer = require('#/js/_observer.js')
const Preview = require('#/js/_preview.js')
const Storage = require('#/js/storage-betterdiscord')
const Pack = require('#/js/pack')
const EditBar = require('#/js/editbar.js')
const Confirm = require('#/js/confirm.js')
const Settings = require('#/js/settings.js')

const about = require('./package.json')
const log = require('#/js/logger')
const css = require('#/css/stylesheet')

module.exports = class {
  constructor () {
    this.storage = new Storage()
    this.settings = new Settings()
    this.categories = new Categories()
    this.menu = new Menu()
    this.observer = new Observer()
    this.preview = new Preview()
    this.pack = new Pack(this)
    this.editbar = new EditBar()
    this.confirm = new Confirm()
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
  getSettingsPanel () {
    let checked = ''

    let hideURLs = lineemotes.storage.get('hideURLs')
    if (hideURLs) { checked = 'checked=""' }

    let toggle = document.createElement('label')
    toggle.classList.add('ui-switch-wrapper', 'ui-flex-child')
    toggle.setAttribute('style', 'flex:0 0 auto;')

    let input = document.createElement('input')
    input.classList.add('ui-switch-checkbox')
    input.setAttribute('id', 'line-settings-hideurl')
    input.setAttribute('type', 'checkbox')
    if (hideURLs) { input.setAttribute('checked', '') }
    input.setAttribute('onclick', 'lineemotes.settings.toggleHide()')

    let div = document.createElement('div')
    div.classList.add('ui-switch')
    if (hideURLs) {
      div.classList.add('checked')
    }

    toggle.appendChild(input)
    toggle.appendChild(div)

    return "<div style='display:flex;'><h3 style='color:#b0b6b9;'>Hide sticker URL on client side (others will still see it, switch text channel or server for the change to apply)</h3>" + toggle.outerHTML + "</div>"
  }
  getName () { return about.prettyName }
  getDescription () { return about.description }
  getAuthor () { return about.author }
  getVersion () { return about.version }
}
