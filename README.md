# BetterDiscord Line Stickers Plugin

Extends BetterDiscord emote menu to add a tab with Line stickers to it
![](https://camo.githubusercontent.com/0378294c045e60db0208f807a13c93e07fa8b36d/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303137363533333937303934343030382f756e6b6e6f776e2e706e67)


## Installation

* Install [BetterDiscord](https://betterdiscord.net/)
* Install the plugin
	* Open the folder at `C:\Users\<user>\AppData\Roaming\BetterDiscord\plugins` by navigating there via File Explorer of your choice
  * Drop the plugin [`lineemotes.plugin.js`](https://raw.githubusercontent.com/awaken1ng/bd-linestickers/master/dist/lineemotes.plugin.js) off there
*  Restart Discord (*Ctrl + R or a method of your choice*)
* Make sure the plugin is enabled
  * Open `User Settings` - `BetterDiscord` - `Plugins`, you should see plugin in the list, enable it by checking the box
* Open the Emote menu, you should see a **Line** tab in there


## Adding stickers

To add a sticker pack you'll need:
* it's title
* the ID of a first sticker
* total count of stickers in a pack

There are two ways of adding stickers:
* via tab in emote menu
* via Discord console

### Via tab in the menu

* Open the tab by pressing the plus sign at the bottom

  ![](https://camo.githubusercontent.com/b2b1760c891150672be63302950331d40bbde6a4/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303138313630313130313437393933372f756e6b6e6f776e2e706e67)

* The following form should show up:

  ![](https://camo.githubusercontent.com/b6b1383a84d7cfd45707c273b196b3ab2fa74ca6/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303138313936343537313231333832342f756e6b6e6f776e2e706e67)

* Enter the title, length (amount of stickers in a pack) and the ID of the first sticker and press `Add` button

### Via Discord console

* Open the developer tools by pressing `Ctrl + Shift + I`

* In a console, execute the following command: ``lineemotes.appendPack(`title`, first_sticker_id, length)``


### Getting sticker's title, ID and length

#### Grease/Tampermonkey user script
![](https://camo.githubusercontent.com/90e0741670663dbc6e414478d793b5a50ffbb2cb/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303138363631353934313336353736302f756e6b6e6f776e2e706e67)

If you're using [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) you can [download a user script](https://greasyfork.org/en/scripts/23630) that will show you the title, first sticker ID, amount of stickers and append string on the page

#### Javascript in the console
Similar to user script above, you can run the following scary looking line of JavaScript in your browser's console. It will output the same thing script above would.

*Note: You can access the console by opening Developer Tools from context menu by right clicking somewhere on the page or using the same Ctrl + Shift + I hotkey to open Developer Tools*

```
console.log('Title: ' + $('.mdCMN08Ttl').text() + '\nFirst sticker ID: ' + $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).slice($('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).lastIndexOf('/') + 1) + '\nLength: ' + $('.mdCMN09Li').length.toString() + '\nAppend string:\n' + 'lineemotes.appendPack(`' + $('.mdCMN08Ttl').text() + '`, ' + $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).slice($('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).lastIndexOf('/') + 1) + ', ' + $('.mdCMN09Li').length.toString() + ')')
```

#### Manual way
##### Finding first sticker ID
Sticker ID can be found in a sticker URL, the said URL can be extracted from a page by right clicking on a sticker and inspecting the element

![](https://camo.githubusercontent.com/78635b5611f1cb82378737c741dd3a3c255569e7/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303139333031353831353739383738362f756e6b6e6f776e2e706e67)

##### Finding length
Just count them =P

Default length is 40, which is the standard length for most sticker packs, however, some packs, usually animated, can be an exception to this

## Resizing the window

You can resize the Line tab using the following commands in console:

`lineemotes.menu.setWidth(width)`

`lineemotes.menu.setHeight(height)`

`lineemotes.menu.setSize(width, height)`


## Adding unavailable stickers
![](https://camo.githubusercontent.com/6a6c9d4febc36ae58e9e0f7577aab1756a020f70/68747470733a2f2f696d616765732d312e646973636f72646170702e6e65742f2e654a774e7955734f7779414d414e47376341444d78355130743045456b61674a52746852466c5876586d6235357176756361705637534b64563444743445786a30797730556932364574577a704836777a6e5242456b6c3576306f54427563746f6e50653277556a786f426d556c6a4d793367625a2d453948397a74302d687075726571666e384642434c532e72394b32513273713566664d526b786a6f466175426d7a30663755)

Some sticker packs might greet you with the message above

One way to get sticker IDs is to download the pack using the API endpoint that LINE app is using, use the following template

`https://dl.stickershop.line.naver.jp/products/0/0/1/<packid>/android/stickers.zip`

For example `https://dl.stickershop.line.naver.jp/products/0/0/1/2999/android/stickers.zip` for the pack above

*Note: you can find the pack ID in the page's URL*
![](https://camo.githubusercontent.com/fe841f6288a0dd1c28c161494ed36d4a97f6acca/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303139343039333631333531343737342f756e6b6e6f776e2e706e67)

Using a file archiver of your choice, open the zip file, find the sticker with the lowest ID, that will be the first sticker ID

*Note: assuming length is 40, if the zip file doesn't contain 83 files (40 stickers, 40 thumbnails, 2 category icons, 1 metadata file), set the length accordingly*
