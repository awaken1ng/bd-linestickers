// ==UserScript==
// @name        LINE Append String
// @namespace   lineappendstring
// @description Automatic generation of append string for BetterDiscord plugin
// @include     https://store.line.me/stickershop/product/*
// @version     0.4.0
// @grant       none
// ==/UserScript==

function getStrings () {
  let href = window.location.pathname.split('/')
  let locale = href[href.length - 1]
  if (locale === 'ja') {
    return {
      'title': 'タイトル',
      'count': 'スタンプの数',
      'firstID': '最初のスタンプID',
      'append': '追加のコマンド'
    }
  } else {
  	return {
      'title': 'Title',
      'count': 'Sticker count',
      'firstID': 'First sticker ID',
      'append': 'Console command'
    }
  }
}


let title = document.querySelector('.mdCMN38Item01Ttl').innerText
let firstStickerID = document.querySelector('.mdCMN09Image').style['background-image'].match(/sticker\/(\d+)/)[1]
let length = document.querySelectorAll('.mdCMN09Li').length
let append_string = 'lineemotes.appendPack(`' + title + '`, ' + firstStickerID + ', ' + length + ')'
let strings = getStrings()
let inlineCSS = `
background: #2e3136;
padding: 1em;
-webkit-border-radius: 3px;
border-radius: 3px;
font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
line-height: 16px;
color: rgba(255,255,255,.7);
margin: 10px 0;`

// Output to console
console.log(
`${strings['title']}: ${title}
${strings['firstID']}: ${firstStickerID}
${strings['count']}: ${length}
${strings['append']}:
${append_string}`)

// Output on page
let output = document.createElement('p')
output.appendChild(document.createTextNode(`${strings['title']}: ${title}`))
output.appendChild(document.createElement('br'))
output.appendChild(document.createTextNode(`${strings['firstID']}: ${firstStickerID}`))
output.appendChild(document.createElement('br'))
output.appendChild(document.createTextNode(`${strings['count']}: ${length}`))
output.appendChild(document.createElement('br'))
output.appendChild(document.createTextNode(`${strings['append']}:`))
output.appendChild(document.createElement('br'))
output.appendChild(document.createTextNode(`${append_string}`))
output.style = inlineCSS

document.querySelector('.mdCMN38Item01').appendChild(output)
