const l10n = require('#/js/l10n')
const template = require('#/templates/confirm')

class Confirm {
  buildContainer () {
    return template({
      title: l10n.getToken('delete-confirm'),
      yes: l10n.getToken('yes'),
      no: l10n.getToken('no')
    })
  }
  initialize () {
    $('#bda-qem-line-container .line-editbar .icon-plus-cross').on('click', (event) => {
      var id = $(event.target.parentNode.parentNode.parentNode).attr('data-id')
      $('#bda-qem-line-container .confirm .no').attr('onclick', 'lineemotes.confirm.hide();')
      $('#bda-qem-line-container .confirm .yes').attr(
        'onclick',
        `lineemotes.storage.deletePack(${id}); lineemotes.menu.removePack(${id}); lineemotes.confirm.hide();`)
      this.show()
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
}
module.exports = Confirm
