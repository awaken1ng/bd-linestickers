const about = require('#/package.json')

module.exports = class {
  buildContainer () {
    let container = '<div class="preview-container">'
    container += '<div class="preview-wrapper" style="visibility: hidden; opacity: 0; background-size: inherit;">'
    container += '</div>'
    return container
  }
  initialize () {
    $('#bda-qem-line-container .emote-menu-inner img')
      .mouseenter(function (e) { window[about.id].preview.show(e.target.src) })
      .mouseleave(function (e) { window[about.id].preview.hide() })
  }
  show (url) {
    var preview = $('#bda-qem-line-container .preview-container .preview-wrapper')
    preview.css('visibility', 'visible')
    preview.css('opacity', '1')
    preview.css('background-image', `url("${url}")`)
  }
  hide () {
    var preview = $('#bda-qem-line-container .preview-container .preview-wrapper')
    preview.css('visibility', 'hidden')
    preview.css('opacity', '0')
  }
}
