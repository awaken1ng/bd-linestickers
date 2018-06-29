const log = require('#/js/logger')

class Settings {
  toggleHide () {
    let checked = lineemotes.storage.get('hideURLs')
    log(`Toggling hide, was ${checked}`)
    if (!checked) {
      lineemotes.storage.set('hideURLS', true)
      $('#line-settings-hideurl').parent().find('.ui-switch').addClass('checked')
    } else {
      lineemotes.storage.set('hideURLs', false)
      $('#line-settings-hideurl').parent().find('.ui-switch').removeClass('checked')
    }
  }
}
module.exports = Settings
