# BetterDiscord Line Stickers Plugin

BetterDiscordの絵文字欄にLINEスタンプを追加するプラグインです。
![](https://camo.githubusercontent.com/0378294c045e60db0208f807a13c93e07fa8b36d/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303137363533333937303934343030382f756e6b6e6f776e2e706e67)


## インストール

* [BetterDiscord](https://betterdiscord.net/)をインストールする。
* プラグインをインストール
	* BetterDiscordのプラグインフォルダ(`%appdata%\BetterDiscord\plugins`)をエクスプローラーで開く
  * [`lineemotes.plugin.js`](https://raw.githubusercontent.com/awaken1ng/bd-linestickers/master/dist/lineemotes.plugin.js)を保存してプラグインフォルダに入れる
*  Discordを再起動 (Ctrl + R で再起動します)
* プラグインを有効化する
  * `ユーザー設定` - `BetterDiscord` - `Plugins`を開き、プラグインリストから __Line Stickers__ を有効化します。
* 絵文字メニューを開けば __Line__ タブが追加されているはずです。


## パックを追加する

パックを追加するのに必要なもの:
* パックのタイトル
* パックの最初のスタンプのID
* パックに含まれているスタンプ数

パックを追加するには2つの方法があります:
* 絵文字メニューから
* Discordのconsoleから

### 絵文字メニューから

* タブの左下にある __+__ を開くと

  ![](https://camo.githubusercontent.com/b2b1760c891150672be63302950331d40bbde6a4/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303138313630313130313437393933372f756e6b6e6f776e2e706e67)

* 入力フォームが出てきます:

  ![](https://camo.githubusercontent.com/b6b1383a84d7cfd45707c273b196b3ab2fa74ca6/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303138313936343537313231333832342f756e6b6e6f776e2e706e67)

* タイトルとID、スタンプの数を入力して`Add`を押せば完了です。

  ![](https://camo.githubusercontent.com/876e2e35b8f92022667d8c4e52dd1d7817b9a6a6/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3330363032303830333534363434373837322f3331323734363535393937343637303334362f756e6b6e6f776e2e706e67)

### Discordのconsoleから

* `Ctrl + Shift + I`を押してDeveloper toolsを開きます。

* consoleで以下のコマンドを実行します: ``lineemotes.appendPack(`タイトル`, 最初のスタンプのID, スタンプの数)``
<br> 例: ``lineemotes.appendPack(`Miko sister of fox`, 1133826, 40)``*

### パックを手に入れる

パックは[Line Store](https://store.line.me/home/ja)で手に入れることができます。

このプラグインで使用するために購入する必要はありません。

### スタンプのID、スタンプの数を取得する

#### Grease/Tampermonkeyのユーザースクリプトを使って取得する
![](https://camo.githubusercontent.com/90e0741670663dbc6e414478d793b5a50ffbb2cb/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303138363631353934313336353736302f756e6b6e6f776e2e706e67)

もしあなたが[Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)か[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)を使っているならば、[このスクリプト](https://greasyfork.org/en/scripts/23630)を使用するとストアのページにIDなど必要な情報を自動で表示することができます。

#### consoleでJavascriptを使って取得する
下記のぐちゃぐちゃしたJavaScriptをブラウザのconsoleに入力することで先述したユーザースクリプトと同じ効果を得ることができます。

consoleには開発者ツールからアクセスできます。  
開発者ツールはページを右クリックして __要素を検証__ か`Ctrl + Shift + I`で出すことができます。

```
console.log('タイトル: ' + $('.mdCMN08Ttl').text() + '\n最初のスタンプID: ' + $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).slice($('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).lastIndexOf('/') + 1) + '\nスタンプの数: ' + $('.mdCMN09Li').length.toString() + '\n追加コマンド:\n' + 'lineemotes.appendPack(`' + $('.mdCMN08Ttl').text() + '`, ' + $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).slice($('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).slice(0, $('.mdCMN09Image').first().css('background-image').slice($('.mdCMN09Image').first().css('background-image').search('/products/') + 10).search('/android/')).lastIndexOf('/') + 1) + ', ' + $('.mdCMN09Li').length.toString() + ')')
```

#### 手動で探す
##### 最初のスタンプのID
パックのURLからIDを見つけることができます。ページの最初のスタンプ画像を右クリックして __要素を検証__ しURLからIDを見つけます。

![](https://camo.githubusercontent.com/78635b5611f1cb82378737c741dd3a3c255569e7/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3233313434323233333138343734373534302f3331303139333031353831353739383738362f756e6b6e6f776e2e706e67)

##### 画像の数
数えて下さい =P

基本的には40です。しかしアニメーションスタンプなどは数が違うことがあります。

## ウィンドウサイズを変える

consoleに以下のコマンドを打つことで、Lineタブの大きさを変えることができます。

`lineemotes.menu.setWidth(width)`

`lineemotes.menu.setHeight(height)`

`lineemotes.menu.setSize(width, height)`


## 利用不能なスタンプを追加する
![](https://camo.githubusercontent.com/6a6c9d4febc36ae58e9e0f7577aab1756a020f70/68747470733a2f2f696d616765732d312e646973636f72646170702e6e65742f2e654a774e7955734f7779414d414e47376341444d78355130743045456b61674a52746852466c5876586d6235357176756361705637534b64563444743445786a30797730556932364574577a704836777a6e5242456b6c3576306f54427563746f6e50653277556a786f426d556c6a4d793367625a2d453948397a74302d687075726571666e384642434c532e72394b32513273713566664d526b786a6f466175426d7a30663755)

いくつかのスタンプは利用できないことがあります。

スタンプのIDを取得する1つの方法は、LINEアプリが使用しているAPIエンドポイントを使用してパックをダウンロードすることです。次のテンプレートを使用します:

`https://dl.stickershop.line.naver.jp/products/0/0/1/パックID/android/stickers.zip`

例: `https://dl.stickershop.line.naver.jp/products/0/0/1/2999/android/stickers.zip`

パックIDはページのURLから見つけることができます。
![](http://i.imgur.com/96dJgJr.png)

適当なアーカイバでダウンロードしたzipを開き、画像の最初のIDを確認します。

例えばスタンプの数が40だった場合83のファイルが含まれています。(40のスタンプ画像, 40のサムネイル, 2つのアイコン, 1つのメタデータファイル)

あとはスタンプの数を確認して登録ができます。
