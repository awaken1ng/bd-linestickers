let tokens = {
  'en': {
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
  },
  'ja': {
    'bda-qem-emojis': '絵文字',
    'bda-qem-favourite': 'お気に入り',
    'bda-qem-line': 'LINE',
    'addform-title': 'タイトル',
    'addform-length': 'スタンプの数',
    'addform-id': '最初のスタンプID',
    'addform-add': '追加',
    'delete-confirm': 'このパックを削除しますか？',
    'yes': 'はい',
    'no': 'いいえ'
  }
}

class L10N {
  getCurrentLocale () { return document.children[0].getAttribute('lang') }
  getToken (id) {
    let currentLocale = this.getCurrentLocale()
    if (!(currentLocale in tokens)) { currentLocale = 'en' }
    return tokens[currentLocale][id]
  }
}

let l10n = new L10N()
module.exports = l10n
