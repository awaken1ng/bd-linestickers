const Categories = require('#/js/_categories.js')
const Menu = require('#/js/menu-betterdiscord.js')
const Observer = require('#/js/_observer.js')
const Preview = require('#/js/_preview.js')
const Storage = require('#/js/storage-betterdiscord')
const Pack = require('#/js/pack')
const EditBar = require('#/js/editbar.js')
const Confirm = require('#/js/confirm.js')
const Settings = require('#/js/settings.js')
const L10N = require('#/js/l10n')

const about = require('./package.json')
const log = require('#/js/logger')
const css = require('#/css/stylesheet')

module.exports = class {
  constructor () {
    this.l10n = new L10N()
    this.storage = new Storage()

    this.settings = new Settings()
    this.categories = new Categories()
    this.menu = new Menu()
    this.observer = new Observer()
    this.preview = new Preview()
    this.pack = new Pack(this)
    this.editbar = new EditBar()
    this.confirm = new Confirm(this.l10n)
    window[about.id] = this
  }
  load () { this.log('Loaded') }
  unload () { this.log('Unloaded') }
  start () {
    this.log('Initializing')
    BdApi.clearCSS('lineemotes')
    BdApi.injectCSS('lineemotes', css)
    this.storage.initialize()
    this.menu.initialize()
  }
  stop () {
    this.log('Stopping, reverting emote menu to default')
    this.menu.destroy()
    BdApi.clearCSS('lineemotes')
  }
  onMessage () {}
  onSwitch () {}
  getSettingsPanel () {
    let checked = ''
    
    let hideURLs = lineemotes.storage.get('hideURLs')
    if (hideURLs == true) { checked = 'checked=""' }

    let toggle = document.createElement('label')
    toggle.classList.add('ui-switch-wrapper', 'ui-flex-child')
    toggle.setAttribute('style', 'flex:0 0 auto;')

    let input = document.createElement('input')
    input.classList.add('ui-switch-checkbox')
    input.setAttribute('id', 'line-settings-hideurl')
    input.setAttribute('type', 'checkbox')
    if (hideURLs == true) { input.setAttribute('checked', '') }
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
  getLocalizationStrings () {
    var locale = document.children[0].getAttribute('lang')
    var localization_strings = {
      'bda-qem-emojis': 'Emojis',
      'bda-qem-favourite': 'Favourite',
      'bda-qem-line': 'LINE',
      'addform-title': 'Title',
      'addform-length': 'Sticker count',
      'addform-id': 'First sticker ID',
      'addform-add': 'Add',
      'delete-confirm': 'Are you sure you want to delete this pack?',
      'yes': 'Yes',
      'no': 'No'
    }
    if (locale === 'ja') {
      localization_strings['bda-qem-emojis'] = '絵文字',
      localization_strings['bda-qem-favourite'] = 'お気に入り'
      localization_strings['addform-title'] = 'タイトル',
      localization_strings['addform-length'] = 'スタンプの数',
      localization_strings['addform-id'] = '最初のスタンプID',
      localization_strings['addform-add'] = '追加',
      localization_strings['delete-confirm'] = 'このパックを削除しますか？',
      localization_strings['yes'] = 'はい',
      localization_strings['no'] = 'いいえ'
    }
    return localization_strings
  }
  log (message) { log(message) }
  getBDRepo () {
    var script_url = $("script[src*='BetterDiscordApp']").attr('src').split('/')
    if (script_url[4] !== 'BetterDiscordApp') { throw Error(`Error in getBDRepo(), expected 'BetterDiscordApp', found '${script_url[4]}'`) }
    return script_url[3]
  }
  getName () { return about.prettyName }
  getDescription () { return about.description }
  getAuthor () { return about.author }
  getVersion () { return about.version }
}
