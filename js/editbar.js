const about = require('#/package.json')

// bar with buttons to remove pack, edit title and length
// embeded into each pack
module.exports = class {
  fire (event) {
    let pack = $(event.target.parentNode.parentNode.parentNode)
    if (pack.find('.line-pack-header input').length === 0) {
      let bar = $(event.target.parentNode.parentNode)
      let header = pack.find('.line-pack-header')
      let value = pack.find('.line-pack-header').text()
      header.html(`<input class="line-edit-input" value="${value}"></input>`)
      bar.addClass('visible')

      header.find('input')
        .on('blur', (event) => {
          let value = $(event.currentTarget).val()
          let id = parseInt($(event.target.parentNode.parentNode).attr('data-id'))

          window[about.id].storage.renamePack(id, value)
          $(event.target.parentNode).html(value)
          bar.removeClass('visible') // FIXME doesn't actually gets removed
        })
        .on('keydown', (event) => {
          if ((event.key === 'Escape') || (event.key === 'Enter')) {
            event.stopPropagation()
            event.preventDefault()
            event.target.blur()
          }
        })
        .focus()
    }
  }
  initializeAll () {
    $('#bda-qem-line-container .line-editbar .icon-edit').off('click')
    $('#bda-qem-line-container .line-editbar .icon-edit').on('click', (event) => {
      this.fire(event)
    })
  }
  initializeOne (id) {
    $(`#bda-qem-line-container .line-pack[data-id="${id}"] .icon-edit`).on('click', (event) => {
      this.fire(event)
    })
  }
}
