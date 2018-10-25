const about = require('#/package.json')
const log = require('#/js/logger')
const l10n = require('#/js/l10n')
const containerTemplate = require('#/templates/menu-container')

class Menu {
  initialize () {
    this.restore = {
      obsCallback: QuickEmoteMenu.prototype.obsCallback,
      switchQem: QuickEmoteMenu.prototype.switchQem
    }

    quickEmoteMenu.lsContainer = this.buildContainer()

    // overriding
    // adding LINE tab into the callback function
    QuickEmoteMenu.prototype.obsCallback = function (elem) {
      let e = $(elem)
      // Emotes - Show Discord emoji menu
      if (!settingsCookie['bda-es-9']) {
        e.addClass('bda-qme-hidden')
      } else {
        e.removeClass('bda-qme-hidden')
      }

      if (!this.locale) {
        this.locale = l10n.getCurrentLocale()
      } else if (this.locale !== document.children[0].getAttribute('lang')) {
        log('Language changed, rebuilding container to reflect changes')
        this.locale = l10n.getCurrentLocale()
        this.lsContainer = window[about.id].menu.buildContainer()
      }

      let qmeHeader = '<div id="bda-qem">'
      qmeHeader += '<button class="active" id="bda-qem-twitch" onclick="quickEmoteMenu.switchHandler(this); return false;">Twitch</button>'
      qmeHeader += `<button id="bda-qem-favourite" onclick="quickEmoteMenu.switchHandler(this); return false;">${l10n.getToken('bda-qem-favourite')}</button>`
      qmeHeader += `<button id="bda-qem-emojis" onclick="quickEmoteMenu.switchHandler(this); return false;">${l10n.getToken('bda-qem-emojis')}</button>`
      qmeHeader += `<button id="bda-qem-line" onclick="quickEmoteMenu.switchHandler(this); return false;">${l10n.getToken('bda-qem-line')}</button>`
      qmeHeader += `<div>`
      e.prepend(qmeHeader)

      // Emotes - Show Twitch/Favourite
      if (settingsCookie['bda-es-0']) {
        e.append(this.teContainer)
        e.append(this.faContainer)
        e.removeClass('bda-qme-te-hidden')
      } else {
        e.addClass('bda-qme-te-hidden')
      }

      e.append(this.lsContainer)

      // if twitch/favourite tab and discord emoji tab disabled
      if ((!settingsCookie['bda-es-0']) && (!settingsCookie['bda-es-9'])) {
        this.lastTab = 'bda-qem-line'
      }

      // if twitch/favourite tab is disabled and the last open tab was one of them
      if (((this.lastTab === 'bda-qem-emojis') || (this.lastTab === 'bda-qem-favourite')) && (!settingsCookie['bda-es-0'])) {
        this.lastTab = 'bda-qem-emojis'
      }

      // if discord emoji tab is disabled and it was the last open tab
      if ((this.latTab === 'bda-qem-emojis') && (!settingsCookie['bda-es-9'])) {
        this.lastTab = 'bda-qem-favourite'
      }

      if (!this.lastTab) {
        // if twitch tab is disabled, default to discord emoji tab
        if (!settingsCookie['bda-es-0']) {
          this.lastTab = 'bda-qem-emojis'
        } else {
          this.lastTab = 'bda-qem-favourite'
        }
      }

      this.switchQem(this.lastTab)
    }
    // initializing stuff,
    // making the tab openable, copying sticker URL into text area on click, initializing on-hover preview
    QuickEmoteMenu.prototype.switchQem = function (id) {
      let twitch = $('#bda-qem-twitch')
      let fav = $('#bda-qem-favourite')
      let emojis = $('#bda-qem-emojis')
      let line = $('#bda-qem-line')
      twitch.removeClass('active')
      fav.removeClass('active')
      emojis.removeClass('active')
      line.removeClass('active')

      $('.emojiPicker-3m1S-j').hide()
      $('#bda-qem-favourite-container').hide()
      $('#bda-qem-twitch-container').hide()
      $('#bda-qem-line-container').hide()

      switch (id) {
        case 'bda-qem-twitch':
          twitch.addClass('active')
          $('#bda-qem-twitch-container').show()
          break
        case 'bda-qem-favourite':
          fav.addClass('active')
          $('#bda-qem-favourite-container').show()
          break
        case 'bda-qem-emojis':
          emojis.addClass('active')
          $('.emojiPicker-3m1S-j').show()
          $('.emojiPicker-3m1S-j .search-bar-inner input').focus()
          break
        case 'bda-qem-line':
          line.addClass('active')
          $('#bda-qem-line-container').show()
          break
      }
      this.lastTab = id

      let emoteIcon = $('.emote-icon')
      emoteIcon.off()
      emoteIcon.on('click', function (event) {
        window[about.id].menu.onEmoteClick(event.target)
      })

      window[about.id].preview.initialize()
      window[about.id].categories.initialize()
      window[about.id].confirm.initializeAll()
      window[about.id].menu.resize()
    }
  }
  buildContainer () {
    var stickers = ''
    let storage = window[about.id].storage.get('stickers')

    for (var pack = 0; pack < storage.length; ++pack) {
      stickers += window[about.id].pack.wrapPack(storage[pack]['startingId'])
    }

    return containerTemplate({
      confirm: window[about.id].confirm.buildContainer(),
      stickers: stickers,
      preview: window[about.id].preview.buildContainer(),
      categories: window[about.id].categories.buildContainer()
    })
  }
  rebuild () {
    log('Rebuilding container')
    quickEmoteMenu.lsContainer = this.buildContainer()
  }
  destroy () {
    QuickEmoteMenu.prototype.obsCallback = this.restore.obsCallback
    QuickEmoteMenu.prototype.switchQem = this.restore.switchQem
    quickEmoteMenu.lastTab = 'bda-qem-emojis' // set the last opened tab to emoji tab
  }
  setWidth (width) {
    if (width < 344) { width = 344; log("Can't set width less than 344px") }
    window[about.id].storage.set('width', width)
    this.resize()
  }
  setHeight (height) {
    if (height < 326) { height = 326; log("Can't set height less than 326px") }
    window[about.id].storage.set('height', height)
    this.resize()
  }
  setSize (width, height) {
    this.setWidth(width)
    this.setHeight(height)
  }
  getWidth () { return window[about.id].storage.get('width') }
  getHeight () { return window[about.id].storage.get('height') }
  getSize () {
    return {
      width: this.getWidth(),
      height: this.getHeight()
    }
  }
  resize () {
    if (!this.isOpen()) { return }
    let width = this.getWidth()
    let height = this.getHeight()
    if (width === null) { this.setWidth(0); return }
    if (height === null) { this.setHeight(0); return }

    $('#bda-qem-line-container').css('width', width)
    $('#bda-qem-line-container').css('height', height)

    let qemHeight = 30
    if ((!settingsCookie['bda-es-0']) && (!settingsCookie['bda-es-9'])) {
      qemHeight = 0
    }

    BdApi.clearCSS('lineemotes-offset')
    BdApi.injectCSS('lineemotes-offset', `:root {--bd-les-offset: ${qemHeight}px; --bd-les-border-offset:1px; --bd-les-height: ${height}px; --bd-les-width: ${width}px;}`)
  }
  removePack (id) {
    // remove sticker pack from current container
    $(`#bda-qem-line-container .line-pack[data-id="${id}"]`).remove()
    $(`#bda-qem-line-container .categories-container .item[data-id="${id}"]`).remove()
  }
  appendPack (id) {
    if (!this.isOpen()) { return }
    log('Appending a pack to the current container')
    // append the pack to the current container
    var pack = window[about.id].pack.wrapPack(id)
    $('#bda-qem-line-container .emote-menu-inner').append(pack)

    // append the pack to navigation bar below
    var pack = window[about.id].storage.getPack(id)
    var id = pack.startingId
    var position = $('#bda-qem-line-container .categories-wrapper .item').length - 1
    var category = `<div class="item" data-id="${id}" onclick="$('#bda-qem-line-container .line-pack')[${position}].scrollIntoView()" style='background-image: url("https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/${id}/android/sticker.png;compress=true")'></div>`
    $('#bda-qem-line-container .categories-wrapper').append(category)

    // enable preview on the added pack
    // make stickers copy url on a click
    let sticker = $(`#bda-qem-line-container .line-pack[data-id="${id}"] img`)
    sticker
      .mouseenter(function (e) { window[about.id].preview.show(e.target.src) })
      .mouseleave(function (e) { window[about.id].preview.hide() })
      .on('click', () => this.onStickerClick(sticker))

    // enable deletion
    window[about.id].confirm.initializeOne(id)

    // enable editing
    window[about.id].editbar.initializeOne(id)
  }
  isOpen () {
    // Check if the LINE tab is currently open and visible
    let container = document.getElementById('bda-qem-line-container')
    if (container) {
      let display = container.style.display
      if (display !== 'none') { return true }
    }
    return false
  }
  onEmoteClick (element) {
    let container = $(element).parent().parent()
    let emoteElement = $(element)
    let emote = container.hasClass('line-pack-stickers') ? emoteElement.attr('src') : emoteElement.attr('title')

    let ta = Utils.getTextArea()
    Utils.insertText(ta[0], ta.val().slice(-1) === ' ' ? ta.val() + emote : ta.val() + ' ' + emote)
    ta[0].dispatchEvent(new Event('input', { bubbles: true })) // force textarea to resize if it needs to
  }
}

module.exports = Menu
