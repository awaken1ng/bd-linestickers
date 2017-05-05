// ==UserScript==
// @name        Line Append String
// @namespace   lineappendstring
// @description Automatic generation of append string for Discord plugin
// @include     https://store.line.me/stickershop/product/*
// @version     0.3.1
// @grant       none
// ==/UserScript==

var title = $('.mdCMN08Ttl').text();
var firstStickerID = $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).slice($('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).lastIndexOf('/') + 1);
var length = $('.mdCMN09Li').length.toString();
var append_string = 'lineemotes.appendPack(`' + title + '`, ' + firstStickerID + ', ' + length + ')';

var inlineCSS = `background: #2e3136;
padding: 1em;
-webkit-border-radius: 3px;
border-radius: 3px;
font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
line-height: 16px;
color: rgba(255,255,255,.7);
margin: 10px 0;`;

console.log(
`Title: ${title}
First sticker ID: ${firstStickerID}
Length: ${length}
Append string:
${append_string}`);

$('.mdCMN08Txt').append(
`<p style='${inlineCSS}'>
Title: ${title}<br>
First sticker ID: ${firstStickerID}<br>
Length: ${length}<br>
Append string:<br>
${append_string}
</p>`
);
