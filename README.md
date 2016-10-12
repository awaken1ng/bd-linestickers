# BetterDiscord Line Stickers Plugin

Extends BetterDiscord emote menu to add a tab with Line stickers to it
![](https://images-2.discordapp.net/.eJwVwlEOgyAMANC7cADaCdrgbQgSNGpLaM0-lt19Wd77uGdcbnW7WdcVYDu0yNi8mozcqm8i7aq5H-qL3JDNctnvyqYwIaWQMFDCv4ARpjDHV1qWSISIhBHh4ZPlzb5zc98fBl4izw.ck5ayHbH8eRafxBrT6QxQYinoOA)


## Installation 

*   Install [BetterDiscord](https://betterdiscord.net/)
*   Restart Discord (*Ctrl + R to do a fast restart*)

    BetterDiscord should be initialized by now, to open plugins folder:
	
	*   Go to `User Settings` - `BetterDiscord` - `Plugins` and click on `Open Plugins Folder`
	*   or open the folder by yourself at `C:\Users\<user>\AppData\Roaming\BetterDiscord\plugins`

*   Drop the plugin [`LineEmotes.plugin.js`](https://raw.githubusercontent.com/awaken1ng/bd-linestickers/master/LineEmotes.plugin.js) off there
*   Restart Discord (*Ctrl + R should do the trick*)
*   Open `User Settings` - `BetterDiscord` - `Plugins`, you should see plugin in the list, enable it by checking the box
*   Restart Discord once again (*psst... Ctrl+R*) 
*   Open the Emote menu, you should see **Line** tab in there


## Adding stickers

There are two ways of adding stickers:

*   via settings tab in emote menu
*   via Discord console

### User script

![](https://images-1.discordapp.net/.eJwNyMsNwyAMANBdGADzsUOUbRBBJGpiI3DUQ9Xd23d8H_OMy2zmUO1zA9jPWWTsdqqM3KptIu2quZ_TFrkhq-Zy3JV1QogeMYQY_YoJE6H7F6U1OYq4LOQTOYSHXyxvtp2b-f4ABU4i0g.OrvthoOSXV27-F1JgirG_viHXH0)

If you're using [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) you can [download a user script](https://greasyfork.org/en/scripts/23630) that will automatically form and show you a command for adding the sticker pack

Copy the command and paste it either in Discord console that can be accessed by opening *Developer Tools* with **Ctrl + Shift + I** or add the pack using the settings menu in the tab

### Javascript in the console
Similar to user script above, you can run the following line of code in your browser's console. It will output the command in the console.

*Note: You can access the console by inspecting some element on the page or using the same **Ctrl + Shift + I** hotkey to open Developer Tools* 

```
console.log("lineemotes.appendPack('"+$('.mdCMN08Ttl').text()+"', "+$('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).slice($('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).lastIndexOf('/') + 1)+", "+$('.mdCMN09Image').first().attr('data-sticker-id')+", "+$('.mdCMN09Image').first().css('background-image').slice(0, $('.mdCMN09Image').first().css('background-image').search('/android')).slice(0, $('.mdCMN09Image').first().css('background-image').search(location.pathname.slice(1, -3).slice(location.pathname.slice(0, -3).lastIndexOf('/'))) - 1).slice($('.mdCMN09Image').first().css('background-image').slice(0, $('.mdCMN09Image').first().css('background-image').search('/android')).slice(0, $('.mdCMN09Image').first().css('background-image').search(location.pathname.slice(1, -3).slice(location.pathname.slice(0, -3).lastIndexOf('/'))) - 1).lastIndexOf('/') + 1)+", "+$('.mdCMN09Li').length.toString()+")")
```

### Manual command forming

To manually form the command you need the following:

  * Sticker Pack ID
  * First sticker ID
  * Base prefix (*optional*)
  * Length or total ammount of stickers (*optional*)

Sticker Pack ID can be found in a couple of places, in address bar (*assuming the page is open, otherwise in a URL of a sticker pack*) or in any URL to a sticker

![](https://images-2.discordapp.net/.eJwNyMENwyAMAMBdGABiMHGaPToAAkSQCEbgvqLu3t7zHvWZTZ3qEhnrNCbVFXkmvYRnKFkX5tJyGHXpyLcJIiFed-6yjHWAaK1zcCAhedz-5enlHZBFOtwO-2beXaq0nECPXtT3B0kzIz0.-bM9Wl9JxDB8FjYm4QGeV2NInbM)

Sticker ID can be found in a sticker URL, the said URL can be extracted from a page by right clicking on a sticker and inspecting the element

*Note: you can copy the URL by right clicking on it in style inspector on the right (might require double right clicking)*

![](https://images-2.discordapp.net/.eJwNyEEOhCAMAMC_8ACqUALrbwgSNGpLaM0ezP59neM85h6nWcym2mUBWHcpPFYryiO3ahtzO2vuu9jCF2TVXLarkgo4PyM65_2cMGIMOL0V4if5hMEFRD9FBzcdxF-ynZr5_QEFuiLV.ymBP2UZZnvdptHk594Csml_iDJU)

Base prefix defaults to 1 if none specified, which seems to be what creator's stickers are mostly using, it can be found in the same sticker URL

![](https://images-2.discordapp.net/.eJwNyEEOhCAMAMC_8ACQUgT9DUGCRm0J1Oxhs39f5zhf9fRLrWoXaWM1ZjtG5r7pIdxTLboy16ukdgyd-TZJJOX9LiTDgLOIAM7ZiAGDx-ktHye72DAD-Ohgmc1DJ_GHdKOqfn8FCSLT.Yiw4CJreyn16sXVtpc9J7JiiG0g)

Length defaults to 40 if none specified, which is the standart length for most sticker packs, however, some packs, usually animated, are exception to this

After getting the required information, either manually add the pack in via settings menu or form a command using the following template
`lineemotes.appendPack("title", packID, firstStickerID, basePrefix, length)` and execute it in Discord console

### Adding unavailable stickers

![](https://images-1.discordapp.net/.eJwNyUsOwyAMANG7cADMx5Q0t0EEkagJRthRFlXvXmb55qvucapV7SKdV4Dt4Exj0yw0Ui26EtWzpH6wznRBEkl5v0oTBuctonPe2wUjxoBmUljMy3gbZ-E9H9zt0-hpureqfn8FBCLS.r9K2Q2sq5ffMRkxjoFauBmz0f7U)

Some of the sticker packs might greet you with the message above, since the page doesn't display any actual stickers, getting their IDs is rather difficult.

One way to get sticker IDs is to download the pack using the API endpoint that LINE app is using for, well, downloading sticker packs, use the following template

`https://dl.stickershop.line.naver.jp/products/0/0/<basePrefix>/<packid>/android/stickers.zip`

For example `https://dl.stickershop.line.naver.jp/products/0/0/1/2999/android/stickers.zip` for the pack above

*Note: assume base prefix is 1, if assuming didn't help, open element inspector, find the image element and extract the prefix from there*

Using a file archiver of your choice, open the zip file, find the sticker with the lowest ID, that will be the first sticker ID

Now you have pack ID, first sticker ID and base prefix, add the pack

*Note: assuming length is 40, if the zip file doesn't contain 83 files (40 stickers, 40 thumbnails, 2 category icons, 1 metadata file), set the length accordingly*
