const about = require('#/package.json')
const log = require('#/js/logger')

class Settings {
  constructor (storage) { this.storage = storage }
  toggleHide () {
    let checked = this.storage.get('hideURLs')
    if (checked) {
      log(`Setting URL hide to 'false', was '${checked}'`)
      this.storage.set('hideURLs', false) // BD storage saves it as `null` instead
      $('#line-settings-hideurl').parent().find('.ui-switch').removeClass('checked')
    } else {
      log(`Setting URL hide to 'true', was '${checked}'`)
      this.storage.set('hideURLs', true)
      $('#line-settings-hideurl').parent().find('.ui-switch').addClass('checked')
    }
  }
  getPanel () {
    let hideURLs = this.storage.get('hideURLs')

    let toggle = document.createElement('label')
    toggle.classList.add('ui-switch-wrapper', 'ui-flex-child')
    toggle.setAttribute('style', 'flex: 0 0 auto')

    let input = document.createElement('input')
    input.classList.add('ui-switch-checkbox')
    input.setAttribute('id', 'line-settings-hideurl')
    input.setAttribute('type', 'checkbox')
    if (hideURLs) { input.setAttribute('checked', '') }
    input.setAttribute('onclick', `window['${about.id}'].settings.toggleHide()`)

    let div = document.createElement('div')
    div.classList.add('ui-switch')
    if (hideURLs) { div.classList.add('checked') }

    toggle.appendChild(input)
    toggle.appendChild(div)

    let container
    container = '<div style="display:flex">'
    container += '<h3 style="color: #b0b6b9">Hide sticker URL on client side (others will still see it, switch text channel or server for the change to apply)</h3>'
    container += toggle.outerHTML
    container += '</div>'
    return container
  }
}
module.exports = Settings
