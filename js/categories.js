const about = require('#/package.json')
const l10n = require('#/js/l10n')
const template = require('#/templates/categories')

module.exports = class {
  initialize () {
    let root = window[about.id]
    root.editbar.initializeAll()
    $('#bda-qem-line-container .categories-container .categories-wrapper').bind('mousewheel', function (event) {
      if ((event.originalEvent.wheelDelta || event.originalEvent.detail) > 0) {
        this.scrollLeft -= 25
      } else {
        this.scrollLeft += 25
      }
      return false
    })
    $('#bda-qem-line-container .categories-container .add-pack').off('click')
    $('#bda-qem-line-container .categories-container .add-pack').on('click', (event) => {
      let state = $('#bda-qem-line-container .add-form').css('opacity')
      if (state === '1') {
        $('#bda-qem-line-container .categories-container .add-pack').addClass('icon-plus')
        $('#bda-qem-line-container .categories-container .add-pack').removeClass('icon-minus')
        $('#bda-qem-line-container .add-form').css('opacity', '0')
        $('#bda-qem-line-container .add-form').css('pointer-events', 'none')
      } else if (state === '0') {
        $('#bda-qem-line-container .categories-container .add-pack').addClass('icon-minus')
        $('#bda-qem-line-container .categories-container .add-pack').removeClass('icon-plus')
        $('#bda-qem-line-container .add-form').css('opacity', '1')
        $('#bda-qem-line-container .add-form').css('pointer-events', 'unset')
      }
    })

    var state = {
      'id': false,
      'length': true,
      'title': false
    }

    function validate () {
      function clearAndSet (target, state) {
        $(target).removeClass('valid')
        $(target).removeClass('invalid')
        $(target).addClass(state)
      }
      if (state.id && state.length && state.title) {
        clearAndSet('#bda-qem-line-container .line-add-button', 'valid')
        return true
      } else {
        clearAndSet('#bda-qem-line-container .line-add-button', 'invalid')
        return false
      }
    }

    $('#line-add-title').off()
    $('#line-add-length').off()
    $('#line-add-id').off()

    $('#line-add-title').keyup((event) => {
      if ($(event.target).val()) state['title'] = true
      else state['title'] = false
      validate()
    })
    $(`#line-add-length`).keyup((event) => {
      if (Number($(event.target).val())) state['length'] = true
      else state['length'] = false
      validate()
    })
    $(`#line-add-id`).keyup((event) => {
      if (Number($(event.target).val().trim())) state['id'] = true
      else state['id'] = false
      validate()
    })

    $('#bda-qem-line-container .line-add-button').off('click')
    $('#bda-qem-line-container .line-add-button').off('mouseenter')
    $('#bda-qem-line-container .line-add-button').on('mouseenter', (event) => validate())
    $('#bda-qem-line-container .line-add-button').on('click', (event) => {
      if (!validate()) return
      let title = $('#line-add-title').val().trim()
      let length = $('#line-add-length').val().trim()
      let id = $('#line-add-id').val().trim()
      root.pack.addPack(title, id, length)
      $('#line-add-title').val('')
      $('#line-add-length').val(40)
      $('#line-add-id').val('')
    })
  }
  buildContainer () {
    let categories = ''
    let stickers = window[about.id].storage.get('stickers')
    if (stickers) {
      for (var i = 0; i < stickers.length; ++i) {
        let pack = stickers[i]
        let onclick = `$('#bda-qem-line-container .line-pack[data-id=${pack['startingId']}]')[0].scrollIntoView()`
        let style = `background-image: url("https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/${pack['startingId']}/android/sticker.png;compress=true")`
        categories += `<div class="item" data-id="${pack['startingId']}" onclick="${onclick}" style='${style}'></div>`
      }
    }
    return template({
      addformTitle: l10n.getToken('addform-title'),
      addformLength: l10n.getToken('addform-length'),
      addformId: l10n.getToken('addform-id'),
      addformAdd: l10n.getToken('addform-add'),
      categories: categories
    })
  }
}
