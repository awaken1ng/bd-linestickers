const template = require('#/templates/confirm')

class Confirm {
  constructor (l10n) {
    this.l10n = l10n
  }
  buildContainer () {
    let l10n = this.l10n
    return template({
      title: l10n.getToken('delete-confirm'),
      yes: l10n.getToken('yes'),
      no: l10n.getToken('no')
    })
  }
  show () {
    // $('#bda-qem-line-container .confirm').show()
    $('#bda-qem-line-container .confirm').css('opacity', '1')
    $('#bda-qem-line-container .confirm').css('pointer-events', 'unset')
  }
  hide () {
    // $('#bda-qem-line-container .confirm').hide()
    $('#bda-qem-line-container .confirm').css('opacity', '0')
    $('#bda-qem-line-container .confirm').css('pointer-events', 'none')
    $('#bda-qem-line-container .confirm .yes').attr('onclick', '')
  }
  init () {
    $('#bda-qem-line-container .line-editbar .icon-plus-cross').on('click', (event) => {
      var id = $(event.target.parentNode.parentNode.parentNode).attr('data-id')
      $('#bda-qem-line-container .confirm .no').attr('onclick', 'lineemotes.confirm.hide();')
      $('#bda-qem-line-container .confirm .yes').attr(
        'onclick',
        `lineemotes.storage.deletePack(${id}); lineemotes.menu.removePack(${id}); lineemotes.confirm.hide();`)
      this.show()
    })
  }
}
// used to confirm delete action
module.exports = Confirm
