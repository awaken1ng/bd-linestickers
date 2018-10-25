// ==UserScript==
// @name        LINE Append String
// @namespace   lineappendstring
// @description Automatic generation of append string for BetterDiscord plugin
// @include     https://store.line.me/stickershop/product/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     0.3.6
// @grant       none
// ==/UserScript==

var title = $('.mdCMN08Ttl').text()
var firstStickerID = $('.mdCMN09Image').first().css('background-image').match(/sticker\/(\d+)/)[1]
var length = $('.mdCMN09Li').length.toString()
var appendString = 'lineemotes.appendPack(`' + title + '`, ' + firstStickerID + ', ' + length + ')'

var href = window.location.pathname.split('/')
var locale = href[href.length - 1]

var strings
if (locale === 'ja') {
  strings = {
    'title': 'タイトル',
    'count': 'スタンプの数',
    'firstID': '最初のスタンプID',
    'append': '追加のコマンド'
  }
} else {
  strings = {
    'title': 'Title',
    'count': 'Sticker count',
    'firstID': 'First sticker ID',
    'append': 'Console command'
  }
}

var inlineCSS = `
background: #2e3136;
padding: 1em;
-webkit-border-radius: 3px;
border-radius: 3px;
font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
line-height: 16px;
color: rgba(255,255,255,.7);
margin: 10px 0;`

console.log(`
${strings['title']}: ${title}
${strings['firstID']}: ${firstStickerID}
${strings['count']}: ${length}
${strings['append']}:
${appendString}`)

$('.mdCMN08Txt').append(`
<p style='${inlineCSS}'>
${strings['title']}: ${title}<br>
${strings['firstID']}: ${firstStickerID}<br>
${strings['count']}: ${length}<br>
${strings['append']}: <br>
${appendString}
</p>`)
