_Feel free to [join the Discord server](https://discordapp.com/invite/wCX6K8q) and ping me if you have any questions or [open an Issue on GitHub](https://github.com/awaken1ng/bd-linestickers/issues)_

[日本語の解説](README_ja.md)

# BetterDiscord LINE Stickers Plugin

Extends BetterDiscord emote menu to add a tab with LINE stickers to it
[![](https://camo.githubusercontent.com/6b145ba99071dd660d1ac866cc507e74de704874/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3332333539363635363935343137393538352f756e6b6e6f776e2e706e67)](https://github.com/awaken1ng/bd-linestickers#installation)
[![](https://camo.githubusercontent.com/84a146ee8b202df573c4c4303759ea19a8b150ee/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3332333539363637393032303431323932382f756e6b6e6f776e2e706e67)](https://github.com/awaken1ng/bd-linestickers#installation)

*※ to enable Dark theme, enable Dark mode in BetterDiscord settings*

## Installation

* Install [Bandaged BetterDiscord](https://github.com/rauenzi/BetterDiscordApp)
* Install the plugin by using one of the following methods:
  * Downloading it:
    * Open the the plugin folder:
      * using the button on plugins tab or
      * opening it with your file manager at:
        * Windows: `C:\Users\<user>\AppData\Roaming\BetterDiscord\plugins`
        * Linux: `/home/<user>/.config/BetterDiscord/plugins/`
        * MacOS: `/Users/<user>/Library/Preferences/BetterDiscord/plugins`
    * [Download the plugin](https://github.com/awaken1ng/bd-linestickers/releases) and copy it there
  * Building it yourself:
    * Clone the repository and run the following commands:
      * `npm install`
      * `npm run build`
* Make sure the plugin is enabled:
  * Open `User Settings` - `BetterDiscord` - `Plugins`
  * If you don't see the plugin in the list, try restarting Discord (*Ctrl + R or a method of your choice*)
  * Enable it
* Open the Emote menu, you should see a **LINE** tab in there

## Removing or renaming stickers

Move your cursor into the right part of the title, you'll see two icons there

![](https://camo.githubusercontent.com/1cf0df3ea7383c2ab2798705d5f29b18eb841ab5/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3330363032303830333534363434373837322f3334353934333731343336353137373835362f756e6b6e6f776e2e706e67)

### Deleting

Click on the cross icon and confirm deletion

![](https://camo.githubusercontent.com/badffdb26d735d0d0807333d5dd3c8e4d60ffebd/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3330363032303830333534363434373837322f3334353934343033343730393334303138312f756e6b6e6f776e2e706e67)

### Renaming 

Click on the pen icon, edit the name, then either press `Enter` or click away

*※ In case of an emergency, you can edit the config at `%appdata%\BetterDiscord\plugins\lineemotes.config.json` manually, after making changes, please fully restart Discord by closing it and opening it again*

## Adding stickers

### Getting stickers

You can find them on [LINE Store](https://store.line.me/home/en)

*※ No, you don't need to buy them*

To add a sticker pack you'll need:
* it's title
* the ID of a first sticker
* total count of stickers in a pack

There are two ways of adding stickers:
* via tab in emote menu
* via Discord console

### Via tab in the menu

* Open the tab by pressing the plus sign at the bottom

  ![](https://camo.githubusercontent.com/c1f110a58855ef1f197fae9f3fc5f17feee2ba79/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3332333630313937353139373330323738352f756e6b6e6f776e2e706e67)

* The following form should show up:

  ![](https://camo.githubusercontent.com/b679d291fabdb1fc8a6ce36917d68275f31a963c/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3332333630323130313939313234333737382f756e6b6e6f776e2e706e67)

* Enter the title, amount of stickers in a pack and the ID of the first sticker and press `Add` button

  ![](https://camo.githubusercontent.com/756765fef0bc6a58ea242015d0bab7481c210e5a/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3332333630323332323536313137313435382f756e6b6e6f776e2e706e67)

### Via Discord console

* Open the developer tools by pressing `Ctrl + Shift + I`

* In a console, execute the following command: ``lineemotes.appendPack(`title`, first_sticker_id, sticker count)``
<br> *※ for example ``lineemotes.appendPack(`Miko sister of fox`, 1133826, 40)``*


### Getting sticker's title, ID and sticker count

#### Grease/Tampermonkey user script
[![](https://camo.githubusercontent.com/90e0741670663dbc6e414478d793b5a50ffbb2cb/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303138363631353934313336353736302f756e6b6e6f776e2e706e67)](https://greasyfork.org/en/scripts/23630)

If you're using [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) you can [download a user script](https://greasyfork.org/en/scripts/23630) that will show you the title, first sticker ID, amount of stickers and append string on the page

#### Javascript in the console
Similar to user script above, you can run the following scary looking line of JavaScript in your browser's console. It will output the same thing script above would.

*※ You can access the console by opening Developer Tools from context menu by right clicking somewhere on the page or using the same Ctrl + Shift + I hotkey to open Developer Tools*

```
console.log('Title: ' + $('.mdCMN08Ttl').text() + '\nFirst sticker ID: ' + $('.mdCMN09Image').first().css('background-image').match(/sticker\/(\d+)/)[1] + '\nLength: ' + $('.mdCMN09Li').length.toString() + '\nAppend string:\n' + 'lineemotes.appendPack(`' + $('.mdCMN08Ttl').text() + '`, ' + $('.mdCMN09Image').first().css('background-image').match(/sticker\/(\d+)/)[1] + ', ' + $('.mdCMN09Li').length.toString() + ')')
```

#### Manual way
##### Finding first sticker ID
Sticker ID can be found in a sticker URL, the said URL can be extracted from a page by right clicking on a sticker and inspecting the element

![](https://camo.githubusercontent.com/78635b5611f1cb82378737c741dd3a3c255569e7/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303139333031353831353739383738362f756e6b6e6f776e2e706e67)

##### Finding sticker count
Just count them =P

Default sticker count is 40, which is the standard for most sticker packs, however, some packs, usually animated, can be an exception to this

## Resizing the window

You can resize the LINE tab using the following commands in console:

`lineemotes.menu.setWidth(width)`

`lineemotes.menu.setHeight(height)`

`lineemotes.menu.setSize(width, height)`

*※ for example `lineemotes.menu.setSize(494, 326)`*

## Adding unavailable stickers
[![](https://camo.githubusercontent.com/6a6c9d4febc36ae58e9e0f7577aab1756a020f70/68747470733a2f2f696d616765732d312e646973636f72646170702e6e65742f2e654a774e7955734f7779414d414e47376341444d78355130743045456b61674a52746852466c5876586d6235357176756361705637534b64563444743445786a30797730556932364574577a704836777a6e5242456b6c3576306f54427563746f6e50653277556a786f426d556c6a4d793367625a2d453948397a74302d687075726571666e384642434c532e72394b32513273713566664d526b786a6f466175426d7a30663755)](https://store.line.me/stickershop/product/2999/ja)

Some sticker packs might greet you with the message above

One way to get sticker IDs is to download the pack using the API endpoint that LINE app is using, use the following template

`https://dl.stickershop.line.naver.jp/products/0/0/1/<packid>/android/stickers.zip`

For example `https://dl.stickershop.line.naver.jp/products/0/0/1/2999/android/stickers.zip` for the pack above

*Note: you can find the pack ID in the page's URL*
![](https://camo.githubusercontent.com/fe841f6288a0dd1c28c161494ed36d4a97f6acca/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303139343039333631333531343737342f756e6b6e6f776e2e706e67)

Using a file archiver of your choice, open the zip file, find the sticker with the lowest ID, that will be the first sticker ID

*※ assuming sticker count is 40, if the zip file doesn't contain 83 files (40 stickers, 40 thumbnails, 2 category icons, 1 metadata file), set the sticker count accordingly*

## CSS patches for theme compatibility

Copy and paste the CSS patch into Custom CSS

- Beard's Material Design ([theme](https://github.com/BeardDesign1/Material-design-theme), [patch](https://gist.github.com/awaken1ng/417d8faf8dc69f5df9c43ede3c841856))
- Full Dark ([theme](https://github.com/fluffingtons/fulldark), [patch](https://gist.github.com/awaken1ng/3ff89021b3f913254e515ae0393790af))
