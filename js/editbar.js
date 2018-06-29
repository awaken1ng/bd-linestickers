// bar with buttons to remove pack, edit title and length
// embeded into each pack
module.exports = class {
  init () {
    $('#bda-qem-line-container .line-editbar .icon-edit').off('click')
    $('#bda-qem-line-container .line-editbar .icon-edit').on('click', (event) => {
      var pack = $(event.target.parentNode.parentNode.parentNode)
      if (pack.find('.line-pack-header input').length === 0) {
        var bar = $(event.target.parentNode.parentNode)
        var header = pack.find('.line-pack-header')
        var value = pack.find('.line-pack-header').text()
        header.html(`<input class="line-edit-input" value="${value}"></input>`)
        bar.addClass('visible')

        function save (event) {
          var value = $(event.target).val()
          var id = $(event.target.parentNode.parentNode).attr('data-id')
          lineemotes.storage.renamePack(id, value)
          $(event.target.parentNode).html(value)
        }

        header.find('input')
          .on('blur', (event) => {
            save(event)
            bar.removeClass('visible')  // FIXME doesn't actually gets removed
          })
          .on('keydown', (event) => {
            if ((event.key === 'Escape') || (event.key ==='Enter')) {
              event.stopPropagation()
              event.preventDefault()
              // save(event)
              event.target.blur()
            }
          })
          .focus()
      }
    })
  }
}
