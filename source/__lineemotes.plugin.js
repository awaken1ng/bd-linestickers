//META{"name":"lineemotes"}*//

var lineemotes = function () {};

lineemotes.prototype.load = function () {
    lineemotes.log('Loading');
};

lineemotes.prototype.start = function () {
    lineemotes.log('Initializing');
    BdApi.clearCSS('lineemotes');
    BdApi.injectCSS('lineemotes', lineemotes.getStylesheet())
    lineemotes.menu.init();
};


lineemotes.prototype.stop = function () {
    lineemotes.log('Stopping, reverting emote menu to default');
    lineemotes.menu.unload();
    BdApi.clearCSS('lineemotes');
};

lineemotes.prototype.unload = function () {
    lineemotes.log('Unloading');
};

lineemotes.prototype.onMessage = function () {
    //called when a message is received
};

lineemotes.prototype.onSwitch = function () {
    //called when a server or channel is switched
};

lineemotes.prototype.settings = function () {};
lineemotes.prototype.settings.toggleHide = function () {
    let checked = bdPluginStorage.get(lineemotes.storage.getName(), 'hideURLs')
    lineemotes.log(`Toggling hide, was ${checked}`)
    if (!checked) {
        bdPluginStorage.set(lineemotes.storage.getName(), 'hideURLs', true);
        $('#line-settings-hideurl').parent().find('.ui-switch').addClass('checked')
    } else {
        bdPluginStorage.set(lineemotes.storage.getName(), 'hideURLs', false);
        $('#line-settings-hideurl').parent().find('.ui-switch').removeClass('checked')
    }
};

lineemotes.prototype.getSettingsPanel = function () {
    let checked = ''
    if (bdPluginStorage.get(lineemotes.storage.getName(), 'hideURLs') == true) { checked = 'checked=""'; }

    let toggle = document.createElement('label');
    toggle.classList.add('ui-switch-wrapper', 'ui-flex-child');
    toggle.setAttribute('style', 'flex:0 0 auto;');

    let input = document.createElement('input');
    input.classList.add('ui-switch-checkbox');
    input.setAttribute('id', 'line-settings-hideurl');
    input.setAttribute('type', 'checkbox');
    if (bdPluginStorage.get(lineemotes.storage.getName(), 'hideURLs') == true) { input.setAttribute('checked', ''); }
    input.setAttribute('onclick', 'lineemotes.prototype.settings.toggleHide()')

    let div = document.createElement('div');
    div.classList.add('ui-switch');
    if (bdPluginStorage.get(lineemotes.storage.getName(), 'hideURLs'))
        div.classList.add('checked');

    toggle.appendChild(input);
    toggle.appendChild(div);

    return "<div style='display:flex;'><h3 style='color:#b0b6b9;'>Hide sticker URL on client side (others will still see it, switch text channel or server for the change to apply)</h3>" + toggle.outerHTML + "</div>";
};

lineemotes.prototype.getLocalizationStrings = function () {
  var locale = document.children[0].getAttribute('lang');
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

  return localization_strings;
}

//logger function, outputs console message in '[Line Stickers] <message>' format
lineemotes.log = (message) => console.log(`[${lineemotes.prototype.getName()}] ${message}`);
lineemotes.getBDRepo = () => {
    var script_url = $("script[src*='BetterDiscordApp']").attr('src').split('/')
    if (script_url[4] !== 'BetterDiscordApp')
        throw ReferenceError(`Error in getBDRepo(), expected 'BetterDiscordApp', found '${script_url[4]}'`)
    return script_url[3]
};

lineemotes.prototype.getName = () => "Line Stickers";
lineemotes.prototype.getDescription = () => "Extends emote menu to add Line stickers.";
// lineemotes.prototype.getVersion = () => "0.6.3";
lineemotes.prototype.getAuthor = () => "Awakening";

