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


lineemotes.categories = function() {}

lineemotes.categories.buildContainer = function() {
    var container = '';
    var categories = '';


    var storage = lineemotes.storage.get();
    if (storage) {
        for (var pack = 0; pack < storage.length; ++pack) {
            categories += `<div class="item" data-id="${storage[pack]['starting_id']}" onclick="$('#bda-qem-line-container .line-pack')[${pack}].scrollIntoView()" style='background-image: url("https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/${storage[pack]['starting_id']}/android/sticker.png;compress=true")'></div>`;
        }
    }
    var localization_strings = lineemotes.prototype.getLocalizationStrings();
    var numbersOnly = "return event.charCode >= 48 && event.charCode <= 57";
    container += `
<div class="add-form" style="opacity: 0; pointer-events: none;">
    <div class="labels">
        <label for="line-add-title">${localization_strings['addform-title']}</label>
        <label for="line-add-length">${localization_strings['addform-length']}</label>
        <label for="line-add-id">${localization_strings['addform-id']}</label>
    </div>
    <div class="inputs">
        <input id="line-add-title" placeholder="${localization_strings['addform-title']}">
        <input id="line-add-length" onkeypress="${numbersOnly}" placeholder="${localization_strings['addform-length']}" value="40">
        <input id="line-add-id" onkeypress="${numbersOnly}" placeholder="${localization_strings['addform-id']}">
    </div>

    <button type="button" class="line-add-button ui-button filled brand small">
        <div class="ui-button-contents">${localization_strings['addform-add']}</div>
    </button>
</div>
<div class="categories-container">
    <div class="categories-wrapper">
        <div class="item add-pack-button">
            <svg class="add-pack" width="20" height="20" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
            </svg>
        </div>
        ${categories}
    </div>
</div>
`;
    return container;
};

lineemotes.categories.init = function () {
    lineemotes.editbar.init();
    $('#bda-qem-line-container .categories-container .categories-wrapper').bind('mousewheel', function(event) {
	if ((event.originalEvent.wheelDelta || event.originalEvent.detail) > 0)
            this.scrollLeft -= 25;
        else
            this.scrollLeft += 25;
	return false;
    });
    $('#bda-qem-line-container .categories-container .add-pack').off('click');
    $('#bda-qem-line-container .categories-container .add-pack').on('click', (event) => {
        var state = $('#bda-qem-line-container .add-form').css('opacity');
        if (state == '1') {
            $('#bda-qem-line-container .categories-container .add-pack').addClass('icon-plus');
            $('#bda-qem-line-container .categories-container .add-pack').removeClass('icon-minus');
            $('#bda-qem-line-container .add-form').css('opacity', '0');
            $('#bda-qem-line-container .add-form').css('pointer-events', 'none');
        }
        else if (state == '0') {
            $('#bda-qem-line-container .categories-container .add-pack').addClass('icon-minus');
            $('#bda-qem-line-container .categories-container .add-pack').removeClass('icon-plus');
            $('#bda-qem-line-container .add-form').css('opacity', '1');
            $('#bda-qem-line-container .add-form').css('pointer-events', 'unset');
        }
    });

    var state = {
        'id': false,
        'length': true,
        'title': false
    };

    function validate() {
        function clearAndSet(target, state) {
            $(target).removeClass('valid');
            $(target).removeClass('invalid');
            $(target).addClass(state);
        }
        if (state['id'] && state['length'] && state['title']) {
            clearAndSet($('#bda-qem-line-container .line-add-button'), 'valid');
            return true;
        } else {
            clearAndSet($('#bda-qem-line-container .line-add-button'), 'invalid');
            return false;
        }
    }

    $(`#line-add-title`).off();
    $(`#line-add-length`).off();
    $(`#line-add-id`).off();

    $(`#line-add-title`).keyup((event) => {
        if ($(event.target).val()) state['title'] = true;
        else state['title'] = false;
        validate();
    });
    $(`#line-add-length`).keyup((event) => {
        if (Number($(event.target).val())) state['length'] = true;
        else state['length'] = false;
        validate();
    });
    $(`#line-add-id`).keyup((event) => {
        if (Number($(event.target).val().trim())) state['id'] = true;
        else state['id'] = false;
        validate();
    });

    $('#bda-qem-line-container .line-add-button').off('click');
    $('#bda-qem-line-container .line-add-button').mouseenter((event) => {
        validate();
    });
    $('#bda-qem-line-container .line-add-button').on('click', (event) => {
        if (validate()) {
            var title = $('#line-add-title').val().trim();
            var length = $('#line-add-length').val().trim();
            var id = $('#line-add-id').val().trim();
            lineemotes.appendPack(title, id, length);
            $('#line-add-title').val('');
            $('#line-add-length').val(40);
            $('#line-add-id').val('');
        }
    });
};

lineemotes.menu = function () {}

lineemotes.menu.init = function () {
    quickEmoteMenu.lsContainer = this.buildContainer();
    
    // band aid fix for compatibility with Zerebos fork
    if (lineemotes.getBDRepo() === 'rauenzi') {
        // overriding
        // adding line tab into the callback function
        QuickEmoteMenu.prototype.obsCallback = function(elem) {
            var e = $(elem);
            // Emotes - Show Discord emoji menu
            if (!settingsCookie["bda-es-9"])
                e.addClass("bda-qme-hidden");
            else
                e.removeClass("bda-qme-hidden");

            // rebuild container if the language was changed
            var localization_strings = lineemotes.prototype.getLocalizationStrings();
            if (this.locale === undefined) {
                this.locale = document.children[0].getAttribute('lang');
            } else if (this.locale !== document.children[0].getAttribute('lang')) {
                lineemotes.log('Language changed, rebuilding container to reflect changes')
                this.locale = document.children[0].getAttribute('lang');
                this.lsContainer = lineemotes.menu.buildContainer();
            }

            // avoid unnecessary whitespace
            var qmeHeader = `<div id="bda-qem">`
            qmeHeader += `<button class="active" id="bda-qem-twitch" onclick='quickEmoteMenu.switchHandler(this); return false;'>Twitch</button>`
            qmeHeader += `<button id="bda-qem-favourite" onclick='quickEmoteMenu.switchHandler(this); return false;'>${localization_strings['bda-qem-favourite']}</button>`
            qmeHeader += `<button id="bda-qem-emojis" onclick='quickEmoteMenu.switchHandler(this); return false;'>${localization_strings['bda-qem-emojis']}</button>`
            qmeHeader += `<button id="bda-qem-line" onclick="quickEmoteMenu.switchHandler(this); return false;">${localization_strings['bda-qem-line']}</button>`
            qmeHeader += `<div>`
            e.prepend(qmeHeader);

            // Emotes - Show Twitch/Favourite
            if (settingsCookie["bda-es-0"]) {
                e.append(this.teContainer);
                e.append(this.faContainer);
                e.removeClass("bda-qme-te-hidden");
            } else {
                e.addClass("bda-qme-te-hidden");
            }

            e.append(this.lsContainer);

            // if twitch/favourite tab and discord emoji tab disabled
            if ((!settingsCookie["bda-es-0"]) && (!settingsCookie["bda-es-9"]))
                this.lastTab = "bda-qem-line";

            // if twitch/favourite tab is disabled and the last open tab was one of them
            if (((this.lastTab == 'bda-qem-emojis') || (this.lastTab == 'bda-qem-favourite')) && (!settingsCookie["bda-es-0"]))
                this.lastTab = "bda-qem-emojis";

            // if discord emoji tab is disabled and it was the last open tab
            if ((this.latTab == 'bda-qem-emojis') && (!settingsCookie["bda-es-9"]))
                this.lastTab = "bda-qem-favourite";

            if (this.lastTab === undefined)
                // if twitch tab is disabled, default to discord emoji tab
                if (!settingsCookie["bda-es-0"])
                    this.lastTab = 'bda-qem-emojis';
                else
                    this.lastTab = "bda-qem-favourite";

            this.switchQem(this.lastTab);
        };
        // initializing stuff,
        // making the tab openable, copying sticker URL into text area on click, initializing on-hover preview
        QuickEmoteMenu.prototype.switchQem = function(id) {
            var twitch = $("#bda-qem-twitch");
            var fav = $("#bda-qem-favourite");
            var emojis = $("#bda-qem-emojis");
            var line = $("#bda-qem-line");
            twitch.removeClass("active");
            fav.removeClass("active");
            emojis.removeClass("active");
            line.removeClass("active");
            $(".emoji-picker, .emojiPicker-3g68GS").hide();
            $("#bda-qem-favourite-container").hide();
            $("#bda-qem-twitch-container").hide();
            $("#bda-qem-line-container").hide();
            switch (id) {
            case "bda-qem-twitch":
                twitch.addClass("active");
                $("#bda-qem-twitch-container").show();
                break;
            case "bda-qem-favourite":
                fav.addClass("active");
                $("#bda-qem-favourite-container").show();
                break;
            case "bda-qem-emojis":
                emojis.addClass("active");
                $(".emoji-picker, .emojiPicker-3g68GS").show();
                    $(".emoji-picker .search-bar-inner input, .emojiPicker-3g68GS .search-bar-inner input").focus();
                break
            case "bda-qem-line":
                line.addClass("active");
                $("#bda-qem-line-container").show();
                break
            }
            this.lastTab = id;
            var emoteIcon = $(".emote-icon");
            emoteIcon.off();
            emoteIcon.on("click", function() {
                // find out what tab we're dealing with
                if ($(this).parent().parent().attr("class") === 'line-pack-stickers') {
                    // if dealing with line stickers tab, grab src
                    var emote = $(this).attr("src") // + '\n';
                } else {
                    // otherwise grab title attribute
                    var emote = $(this).attr("title");
                }
                var ta = utils.getTextArea();
                utils.insertText(ta[0], ta.val().slice(-1) == " " ? ta.val() + emote : ta.val() + " " + emote)
                // force the textarea to resize if needed
                ta[0].dispatchEvent(new Event('input', { bubbles: true }));
                
            });
            lineemotes.preview.init();
            lineemotes.categories.init();
            lineemotes.confirm.init();
            lineemotes.menu.resize();
        };
    } else {
        // overriding
        // adding line tab into the callback function
        QuickEmoteMenu.prototype.obsCallback = function(e) {
            // Emotes - Show Discord emoji menu
            if (!settingsCookie["bda-es-9"])
                e.addClass("bda-qme-hidden");
             else
                e.removeClass("bda-qme-hidden");
    
            var self = this;
    
            // rebuild container if the language was changed
            var localization_strings = lineemotes.prototype.getLocalizationStrings();
            if (this.locale === undefined) {
                this.locale = document.children[0].getAttribute('lang');
            } else if (this.locale !== document.children[0].getAttribute('lang')) {
                lineemotes.log('Language changed, rebuilding container to reflect changes')
                this.locale = document.children[0].getAttribute('lang');
                this.lsContainer = lineemotes.menu.buildContainer();
            }
    
            // avoid unnecessary whitespace
            var qmeHeader = `<div id="bda-qem">`
            qmeHeader += `<button class="active" id="bda-qem-twitch" onclick='quickEmoteMenu.switchHandler(this); return false;'>Twitch</button>`
            qmeHeader += `<button id="bda-qem-favourite" onclick='quickEmoteMenu.switchHandler(this); return false;'>${localization_strings['bda-qem-favourite']}</button>`
            qmeHeader += `<button id="bda-qem-emojis" onclick='quickEmoteMenu.switchHandler(this); return false;'>${localization_strings['bda-qem-emojis']}</button>`
            qmeHeader += `<button id="bda-qem-line" onclick="quickEmoteMenu.switchHandler(this); return false;">${localization_strings['bda-qem-line']}</button>`
            qmeHeader += `<div>`
            e.prepend(qmeHeader);
    
            // Emotes - Show Twitch/Favourite
            if (settingsCookie["bda-es-0"]) {
                e.append(this.teContainer);
                e.append(this.faContainer);
                e.removeClass("bda-qme-te-hidden");
            } else {
                e.addClass("bda-qme-te-hidden");
            }
    
            e.append(this.lsContainer);
    
            // if twitch/favourite tab and discord emoji tab disabled
            if ((!settingsCookie["bda-es-0"]) && (!settingsCookie["bda-es-9"]))
                this.lastTab = "bda-qem-line";
    
            // if twitch/favourite tab is disabled and the last open tab was one of them
            if (((this.lastTab == 'bda-qem-emojis') || (this.lastTab == 'bda-qem-favourite')) && (!settingsCookie["bda-es-0"]))
                this.lastTab = "bda-qem-emojis";
    
            // if discord emoji tab is disabled and it was the last open tab
            if ((this.latTab == 'bda-qem-emojis') && (!settingsCookie["bda-es-9"]))
                this.lastTab = "bda-qem-favourite";
    
            if (this.lastTab === undefined)
                // if twitch tab is disabled, default to discord emoji tab
                if (!settingsCookie["bda-es-0"])
                    this.lastTab = 'bda-qem-emojis';
                else
                    this.lastTab = "bda-qem-favourite";
    
            this.switchQem(this.lastTab);
        };    
        // initializing stuff,
        // making the tab openable, copying sticker URL into text area on click, initializing on-hover preview
        QuickEmoteMenu.prototype.switchQem = function(id) {
            var twitch = $("#bda-qem-twitch");
            var fav = $("#bda-qem-favourite");
            var emojis = $("#bda-qem-emojis");
            var line = $("#bda-qem-line");
            twitch.removeClass("active");
            fav.removeClass("active");
            emojis.removeClass("active");
            line.removeClass("active");
            $(".emoji-picker").hide();
            $("#bda-qem-favourite-container").hide();
            $("#bda-qem-twitch-container").hide();
            $("#bda-qem-line-container").hide();
            switch (id) {
            case "bda-qem-twitch":
                twitch.addClass("active");
                $("#bda-qem-twitch-container").show();
                break;
            case "bda-qem-favourite":
                fav.addClass("active");
                $("#bda-qem-favourite-container").show();
                break;
            case "bda-qem-emojis":
                emojis.addClass("active");
                $(".emoji-picker").show();
                break
            case "bda-qem-line":
                line.addClass("active");
                $("#bda-qem-line-container").show();
            }
            this.lastTab = id;
            var emoteIcon = $(".emote-icon");
            emoteIcon.off();
            emoteIcon.on("click", function() {
                // find out what tab we're dealing with
                if ($(this).parent().parent().attr("class") === 'line-pack-stickers') {
                    // if dealing with line stickers tab, grab src
                    var emote = $(this).attr("src") // + '\n';
                } else {
                    // otherwise grab title attribute
                    var emote = $(this).attr("title");
                }
                var ta = $(".chat form textarea");
                var text = ta.val().slice(-1) == " " ? emote : " " + emote
                ta.focus();
                document.execCommand("insertText", false, text);
                // force the textarea to resize if needed
                ta[0].dispatchEvent(new Event('input', { bubbles: true }));
                
            });
            lineemotes.preview.init();
            lineemotes.categories.init();
            lineemotes.confirm.init();
            lineemotes.menu.resize();
        };
    }

    
};

lineemotes.menu.buildContainer = function () {
    var stickers = '';
    var storage = lineemotes.storage.get();

    for (var pack = 0; pack < storage.length; ++pack) {
        stickers += lineemotes.pack.wrapPack(storage[pack]['starting_id']);
    }

    // var container = `${lineemotes.getStylesheet()}
    var container = `
<div id="bda-qem-line-container">
    <div class="scroller-wrap fade">
        ${lineemotes.confirm.buildContainer()}
        <div class="scroller">
            <div class="emote-menu-inner">
                ${stickers}
            </div>
        </div>
    </div>
    ${lineemotes.preview.buildContainer()}
    ${lineemotes.categories.buildContainer()}
</div>`;
    return container;
};

lineemotes.menu.rebuild = function () {
    lineemotes.log('Rebuilding container');
    quickEmoteMenu.lsContainer = this.buildContainer();
};

lineemotes.menu.unload = function () {
    // reverting the overriden functions
    if (lineemotes.getBDRepo() === 'rauenzi') {  // band aid fix for compatibility with Zerebos fork
        QuickEmoteMenu.prototype.obsCallback = function (elem) {
            var e = $(elem);
            if(!settingsCookie["bda-es-9"]) {
                e.addClass("bda-qme-hidden");
            } else {
                e.removeClass("bda-qme-hidden");
            }
        
            if(!settingsCookie["bda-es-0"]) return;
        
            e.prepend(this.qmeHeader);
            e.append(this.teContainer);
            e.append(this.faContainer);
        
            if(this.lastTab == undefined) {
                this.lastTab = "bda-qem-favourite";
            } 
            this.switchQem(this.lastTab);
        };
        QuickEmoteMenu.prototype.switchQem = function (id) {
            var twitch = $("#bda-qem-twitch");
            var fav = $("#bda-qem-favourite");
            var emojis = $("#bda-qem-emojis");
            twitch.removeClass("active");
            fav.removeClass("active");
            emojis.removeClass("active");
        
            $(".emoji-picker, .emojiPicker-3g68GS").hide();
            $("#bda-qem-favourite-container").hide();
            $("#bda-qem-twitch-container").hide();
        
            switch(id) {
                case "bda-qem-twitch":
                    twitch.addClass("active");
                    $("#bda-qem-twitch-container").show();
                break;
                case "bda-qem-favourite":
                    fav.addClass("active");
                    $("#bda-qem-favourite-container").show();
                break;
                case "bda-qem-emojis":
                    emojis.addClass("active");
                    $(".emoji-picker, .emojiPicker-3g68GS").show();
                    $(".emoji-picker .search-bar-inner input, .emojiPicker-3g68GS .search-bar-inner input").focus();
                break;
            }
            this.lastTab = id;
        
            var emoteIcon = $(".emote-icon");
            emoteIcon.off();
            emoteIcon.on("click", function () {
                var emote = $(this).attr("title");
                var ta = utils.getTextArea();
                utils.insertText(ta[0], ta.val().slice(-1) == " " ? ta.val() + emote : ta.val() + " " + emote);
            });
        };
    } else {
        QuickEmoteMenu.prototype.obsCallback = function(e) {
            if (!settingsCookie["bda-es-9"]) {
                e.addClass("bda-qme-hidden");
            } else {
                e.removeClass("bda-qme-hidden");
            }
            if (!settingsCookie["bda-es-0"])
                return;
            var self = this;
            e.prepend(this.qmeHeader);
            e.append(this.teContainer);
            e.append(this.faContainer);
            if (this.lastTab == undefined) {
                this.lastTab = "bda-qem-favourite";
            }
            this.switchQem(this.lastTab);
        };

        QuickEmoteMenu.prototype.switchQem = function(id) {
            var twitch = $("#bda-qem-twitch");
            var fav = $("#bda-qem-favourite");
            var emojis = $("#bda-qem-emojis");
            twitch.removeClass("active");
            fav.removeClass("active");
            emojis.removeClass("active");
            $(".emoji-picker").hide();
            $("#bda-qem-favourite-container").hide();
            $("#bda-qem-twitch-container").hide();
            switch (id) {
            case "bda-qem-twitch":
                twitch.addClass("active");
                $("#bda-qem-twitch-container").show();
                break;
            case "bda-qem-favourite":
                fav.addClass("active");
                $("#bda-qem-favourite-container").show();
                break;
            case "bda-qem-emojis":
                emojis.addClass("active");
                $(".emoji-picker").show();
                break;
            }
            this.lastTab = id;
            var emoteIcon = $(".emote-icon");
            emoteIcon.off();
            emoteIcon.on("click", function() {
                var emote = $(this).attr("title");
                var ta = $(".channel-text-area-default textarea");
                ta.val(ta.val().slice(-1) == " " ? ta.val() + emote : ta.val() + " " + emote);
            });
        }
    }
    
    

    // setting the last opened tab to emoji tab
    quickEmoteMenu.lastTab = "bda-qem-emojis"
};


lineemotes.menu.setWidth = function(width) {
    if (width < 344) { width = 344; lineemotes.log("Can't set width less than 344px"); }
    bdPluginStorage.set('lineemotes', 'width', width);
    lineemotes.menu.resize();
};

lineemotes.menu.setHeight = function(height) {
    if (height < 326) { height = 326; lineemotes.log("Can't set height less than 326px"); }
    bdPluginStorage.set('lineemotes', 'height', height);
    lineemotes.menu.resize();
};

lineemotes.menu.setSize = function(width, height) {
    lineemotes.menu.setWidth(width);
    lineemotes.menu.setHeight(height);
};

lineemotes.menu.getWidth = function(width) { return bdPluginStorage.get('lineemotes', 'width'); };
lineemotes.menu.getHeight = function(height) { return bdPluginStorage.get('lineemotes', 'height'); };
lineemotes.menu.getSize = function(width, height) {
    return {
        width: lineemotes.menu.getWidth(width),
        height: lineemotes.menu.getHeight(height)
    };
};

lineemotes.menu.resize = function() {
    if (!lineemotes.menu.open()) return;
    var width = bdPluginStorage.get('lineemotes', 'width');
    var height = bdPluginStorage.get('lineemotes', 'height');
    if (width === null) { lineemotes.menu.setWidth(0); return; }
    if (height === null) { lineemotes.menu.setHeight(0); return; }

    $('#bda-qem-line-container').css('width', width);
    $('#bda-qem-line-container').css('height', height);

    var qem_height = 30;
    if ((!settingsCookie["bda-es-0"]) && (!settingsCookie["bda-es-9"]))
        qem_height = 0;

    BdApi.clearCSS('lineemotes-offset');
    BdApi.injectCSS('lineemotes-offset', `:root {--bd-les-offset: ${qem_height}px; --bd-les-border-offset:1px; --bd-les-height: ${height}px; --bd-les-width: ${width}px;}`)
    // $('#bda-qem-line-container .preview-wrapper').css('height', height + qem_height);
    // $('#bda-qem-line-container .preview-wrapper').css('transform', `translateX(-258px) translateY(-${height + qem_height + 1}px) translateZ(0px)`);

    // $('#bda-qem-line-container .categories-container').css('width', width - 15);
    // $('#bda-qem-line-container .add-form').css('width', width - 45);
    // $('#line-add-title').css('width', width - 220);
    // $('#line-add-length').css('width', width - 220);
    // $('#line-add-id').css('width', width - 219);
};

// remove sticker pack from current container
lineemotes.menu.removePack = function(id) {
    $(`#bda-qem-line-container .line-pack[data-id="${id}"]`).remove();
    $(`#bda-qem-line-container .categories-container .item[data-id="${id}"]`).remove();
};

lineemotes.menu.appendPack = function(id) {
    if (!lineemotes.menu.open()) return;
    lineemotes.log('Appending a pack to the current container');
    // append the pack to the current container
    var pack = lineemotes.pack.wrapPack(id);
    $('#bda-qem-line-container .emote-menu-inner').append(pack);

    // append the pack to navigation bar below
    var pack = lineemotes.storage.getPack(id);
    var id = pack['starting_id'];
    var position = $('#bda-qem-line-container .categories-wrapper .item').length - 1;
    var category = `<div class="item" data-id="${id}" onclick="$('#bda-qem-line-container .line-pack')[${position}].scrollIntoView()" style='background-image: url("https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/${id}/android/sticker.png;compress=true")'></div>`;
    $('#bda-qem-line-container .categories-wrapper').append(category);

    // enable preview on the added pack
    // make stickers copy url on a click
    $(`#bda-qem-line-container .line-pack[data-id="${id}"] img`)
        .mouseenter(function(e) { lineemotes.preview.show(e.target.src); })
        .mouseleave(function(e) { lineemotes.preview.hide(); })
        .on("click", function() {
            // find out what tab we're dealing with
            if ($(this).parent().parent().attr("class") === 'line-pack-stickers') {
                // if dealing with line stickers tab, grab src
                var emote = $(this).attr("src");
            } else {
                // otherwise grab title attribute
                var emote = $(this).attr("title");
            }
            var ta = $(".chat form textarea");
            var text = ta.val().slice(-1) == " " ? emote : " " + emote
            ta.focus();
            document.execCommand("insertText", false, text);
        });

    // enable deletion
    $(`#bda-qem-line-container .line-pack[data-id="${id}"] .icon-plus-cross`).on('click', (event) => {
        var id = $(event.target.parentNode.parentNode.parentNode).attr('data-id');
        $('#bda-qem-line-container .confirm .yes').attr(
            'onclick',
            `lineemotes.storage.deletePack(${id}); lineemotes.menu.removePack(${id}); lineemotes.confirm.hide();`);
        lineemotes.confirm.show();
    });

    // enable editing
    $(`#bda-qem-line-container .line-pack[data-id="${id}"] .icon-edit`).on('click', (event) => {
        var pack = $(event.target.parentNode.parentNode.parentNode);
        if (pack.find('.line-pack-header input').length === 0) {
            var bar = $(event.target.parentNode.parentNode);
            var header = pack.find('.line-pack-header');
            var value = pack.find('.line-pack-header').text();
            header.html(`<input class="line-edit-input" value="${value}"></input>`);
            bar.addClass('visible')

            function save(event) {
                var value = $(event.target).val();
                var id = $(event.target.parentNode.parentNode).attr('data-id');
                lineemotes.storage.renamePack(id, value);
                $(event.target.parentNode).html(value);
            }

            header.find('input')
                .on('blur', (event) => {
                    save(event);
                    bar.removeClass('visible');
                })
                .on('keydown', (event) => {
                    if ((event.key === 'Escape') || (event.key ==='Enter')) {
                        event.stopPropagation();
                        event.preventDefault();
                        //save(event);
                        event.target.blur();
                    }
                })
                .focus();
        }
    });
};

lineemotes.menu.open = function() {
    // Check if the LINE tab is currently open and visible
    let container = document.getElementById('bda-qem-line-container')
    if (container) {
        let display = container.style.display;
        if (display !== 'none') return true;
    }
    return false
};



lineemotes.prototype.observer = function (mutation) {
    var status = bdPluginStorage.get(lineemotes.storage.getName(), 'hideURLs');
    if (status === null) {
        status = false;
    }
    if (status === true) {
            for (var i = 0; i < mutation.addedNodes.length; ++i) {
            var next = mutation.addedNodes.item(i);
            if (next) {
                var nodes = this.observer.getNodes(next);
                for (var node in nodes) {
                    if (nodes.hasOwnProperty(node)) {
                        var element = nodes[node].parentElement;
                        if (element) {
                            // skip code blocks
                            if (element.tagName !== 'CODE') {
                                if (element.classList.contains('edited')) { 
                                    // if message with a sticker was edited, apply the sticker url hide
                                    this.observer.inject(element); 
                                } else {
                                    // apply the sticker url hide
                                    this.observer.inject(nodes[node]); 
                                }
                                }
                                // if message is being edited, unhide the text
                                if (element.tagName == "TEXTAREA" && element.style.display == "none") {
                                    element.style.display = "";
                            }
                        }
                    }
                }
            }
        }
    }
};

lineemotes.prototype.observer.status = function () {}

lineemotes.prototype.observer.status.set = function(value) {
    if (value === true) {
        bdPluginStorage.set(lineemotes.storage.getName(), 'hideURLs', true)
        this.current = true;
    } else if (value === false) {
        bdPluginStorage.set(lineemotes.storage.getName(), 'hideURLs', false)
        this.current = false;
    } else {
        lineemotes.log('Unknown value passed while setting observer status')
    }
}

lineemotes.prototype.observer.getNodes = function (node) {
    var next;
    var nodes = [];
    var treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    while (next = treeWalker.nextNode()) {
        nodes.push(next);
    }
    return nodes;
};

lineemotes.prototype.observer.inject = function (node) {
    if ((node.textContent.match(/sdl-stickershop.line.naver.jp/g)||[]).length < 1) return
    $(node).parent()[0].style.display = "none";
};

lineemotes.pack = function () {}

lineemotes.pack.getPack = function (title, stickerid, length) {
    var pack = {
        title: title,
        starting_id: Number(stickerid),
        length: Number(length)
    };

    return pack;
};

lineemotes.pack.appendPack = function (title, stickerid, length) {
    var log = lineemotes.log;
    var storage = lineemotes.storage;
    var pack = lineemotes.pack;

    // parsing arguments
    if (typeof title     === 'undefined') { throw 'ParsingError: Title is not defined'; }
    if (typeof stickerid === 'undefined') { throw 'ParsingError: Sticker ID is not a defined'; }
    if (typeof length    === 'undefined') { length = 40; log(`Length is not explicitly defined, defaulting to ${length}`); }

    if (typeof title !== 'string') { throw 'ParsingError: Title is not a string'; }
    if (Number.isInteger(stickerid) === false) {
        if (typeof stickerid === 'string') {
            stickerid = parseInt(stickerid, 10);
            if (isNaN(stickerid)) {
                throw 'ParsingError: First sticker ID is not a number';
            } else {
                log(`First sticker ID passed as a string, parsed as integer ${stickerid}`);
            }
        } else {
            throw 'ParsingError: First sticker ID is not a number nor string';
        }
    }
    if (Number.isInteger(length) === false) {
        if (length === null) {
            length = 40;
            log(`Null length passed, defaulting to ${length}`);
        } else if (typeof length === 'string') {
            length = parseInt(length, 10);
            if (isNaN(length)) {
                throw 'ParsingError: Length is not a number';
            } else {
                log(`Length passed as a string, parsed as integer ${length}`);
            }
        } else {
            throw 'ParsingError: Length is not a number nor string';
        }
    }

    var stickerpack = pack.getPack(title, stickerid, length);
    if (lineemotes.storage.getPack(stickerid) === null) {
        storage.pushPack(stickerpack);
        lineemotes.menu.rebuild();
        lineemotes.menu.appendPack(stickerid);
    } else {
        log('Pack already exists in storage');
    }
    return true;
};

// alias
lineemotes.appendPack = function (title, stickerid, length) {
    this.pack.appendPack(title, stickerid, length);
};

lineemotes.pack.wrapPack = function (stickerid) {
    var pack = lineemotes.storage.getPack(stickerid);
    if (pack === null) { return ''; }
    var stickers = '';
    for (var i = 0; i < pack['length']; ++i) {
        stickers += `<div class="emote-container"><img class="emote-icon" src="https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/${Number(pack['starting_id']) + i}/android/sticker.png;compress=true"></div>`;
    }
    var container = `
<div class="line-pack" data-id="${pack['starting_id']}">
    <div class="line-editbar">
        <span class="item">
            <span class="icon-plus-cross icon-plus"></span>
        </span>
        <span class="item">
            <span class="icon-edit"></span>
        </span>

        <span class="item" style="display: none; text-align: center; width: 30px; vertical-align: middle; line-height: 23.5px; color: #d1d1d1;">
            <span class="icon-edit-len">LEN</span>
        </span>
    </div>
    <div class="line-pack-header">${pack['title']}</div>
    <div class="line-pack-stickers">
        ${stickers}
    </div>
</div>`;
    return container;
};

// bar with buttons to remove pack, edit title and length
// embeded into each pack, code above ^
lineemotes.editbar = function() {}

lineemotes.editbar.init = function () {
    $('#bda-qem-line-container .line-editbar .icon-edit').off('click');
    $('#bda-qem-line-container .line-editbar .icon-edit').on('click', (event) => {
        var pack = $(event.target.parentNode.parentNode.parentNode);
        if (pack.find('.line-pack-header input').length === 0) {
            var bar = $(event.target.parentNode.parentNode);
            var header = pack.find('.line-pack-header');
            var value = pack.find('.line-pack-header').text();
            header.html(`<input class="line-edit-input" value="${value}"></input>`);
            bar.addClass('visible')

            function save(event) {
                var value = $(event.target).val();
                var id = $(event.target.parentNode.parentNode).attr('data-id');
                lineemotes.storage.renamePack(id, value);
                $(event.target.parentNode).html(value);
            }

            header.find('input')
                .on('blur', (event) => {
                    save(event);
                    bar.removeClass('visible')
                })
                .on('keydown', (event) => {
                    if ((event.key === 'Escape') || (event.key ==='Enter')) {
                        event.stopPropagation();
                        event.preventDefault();
                        //save(event);
                        event.target.blur();
                    }
                })
                .focus();
        }
    });
};

// used to confirm delete action
lineemotes.confirm = function () {}

lineemotes.confirm.buildContainer = function () {
  var localization_strings = lineemotes.prototype.getLocalizationStrings();
  var container = '';
  container += `
<div class="confirm" style="opacity: 0; pointer-events: none;">
    <div class="box">
        <h3 class="value"></h3>
        <h3 style="padding: 10px;">${localization_strings['delete-confirm']}</h3>
        <div>
            <span class="yes">${localization_strings['yes']}</span>
            <span class="no" onclick="lineemotes.confirm.hide();">${localization_strings['no']}</span>
        </div>
    </div>
</div>`;
  return container;
};

lineemotes.confirm.show = function() {
    //$('#bda-qem-line-container .confirm').show();
    $('#bda-qem-line-container .confirm').css('opacity', '1');
    $('#bda-qem-line-container .confirm').css('pointer-events', 'unset');
};

lineemotes.confirm.hide = function() {
    //$('#bda-qem-line-container .confirm').hide();
    $('#bda-qem-line-container .confirm').css('opacity', '0');
    $('#bda-qem-line-container .confirm').css('pointer-events', 'none');
    $('#bda-qem-line-container .confirm .yes').attr('onclick', '');
};

lineemotes.confirm.init = function () {
    $('#bda-qem-line-container .line-editbar .icon-plus-cross').on('click', (event) => {
        var id = $(event.target.parentNode.parentNode.parentNode).attr('data-id');
        $('#bda-qem-line-container .confirm .yes').attr(
            'onclick',
            `lineemotes.storage.deletePack(${id}); lineemotes.menu.removePack(${id}); lineemotes.confirm.hide();`);
        lineemotes.confirm.show();
    });
};

lineemotes.preview = function() {}

lineemotes.preview.buildContainer = function() {
    var container = '';
    container += `
<div class="preview-container">
    <div class="preview-wrapper" style="visibility: hidden; opacity: 0; background-size: inherit;"></div>
</div>`;
    return container;
}

lineemotes.preview.init = function() {
    $('#bda-qem-line-container .emote-menu-inner img')
        .mouseenter(function(e) { lineemotes.preview.show(e.target.src); })
        .mouseleave(function(e) { lineemotes.preview.hide(); });
};

lineemotes.preview.show = function(url) {
    var preview = $('#bda-qem-line-container .preview-container .preview-wrapper');
    preview.css('visibility', 'visible');
    preview.css('opacity', '1');
    // preview.css('background', `url("${url}") rgb(53, 53, 53) no-repeat center`);
    preview.css('background-image', `url("${url}")`);
};

lineemotes.preview.hide = function() {
    var preview = $('#bda-qem-line-container .preview-container .preview-wrapper');
    preview.css('visibility', 'hidden');
    preview.css('opacity', '0');
};


lineemotes.storage = function () {}

lineemotes.storage.getName = function () { return 'lineemotes' }

lineemotes.storage.get = function () {
    var storage = bdPluginStorage.get(this.getName(), 'stickers');
    if (typeof storage === 'undefined' || storage === null) {
        // if storage is not declared, declare it
        bdPluginStorage.set(this.getName(), 'stickers', []);
        storage = [];
    }
    return storage;
};

lineemotes.storage.set = function(value) {
    bdPluginStorage.set(this.getName(), 'stickers', value);
};

lineemotes.storage.wipe = function () {
    bdPluginStorage.set(this.getName(), 'stickers', []);
    return null
};

lineemotes.storage.pushPack = function (pack) {
    var log = lineemotes.log;
    if (this.getPack(pack['starting_id']) === null) {
        var storage = this.get();
        storage.push(pack);
        this.set(storage);
        log(`Successfully added pack '${pack['title']}' to the storage`);
        return true;
    } else {
        log('Pack is already in storage, aborting');
    }
};

lineemotes.storage.getPack = function(id) {
    var storage = this.get();
    for (var i = 0; i < storage.length; i++) {
	if (storage[i]['starting_id'] == id) {
            return storage[i];
        }
    }
    return null;
};

/*
lineemotes.storage.getPackID = function(id) {
    // look up the pack by one of its sticker IDs or its name
    var log = lineemotes.log;
    var mode;
    
    if (typeof id === 'number') {
        if (Number.isInteger(id) === false) {
            throw 'ParsingError: ID cannot be float';
        } else {
            mode = 'integer';
        }
    } 
    if (typeof id === 'string') {
        mode = 'string';
    }
    
    var storage = this.get();
    if (mode === 'integer') {
        for (var index = 0; index < storage.length; index++) {
            for (var sticker = 0; sticker < storage[index].stickers.length; sticker++) {
                if (storage[index]['stickers'][sticker] === id) {
                    return storage[index];
                }
            }
        }
    }
    if (mode === 'string') {
        for (var index = 0; index < storage.length; index++) {
            if (storage[index]['title'] === id) {
                return storage[index];
            }
        }
    }
    
    return null;
};
*/

lineemotes.storage.deletePack = function(id) {
    var storage = this.get();
    var log = lineemotes.log;
    var pack = id;
    var wasFound = false;
    
    for (var i = 0; i < storage.length; i++) {
	if (storage[i]['starting_id'] == id) {
            wasFound = true;
            pack = `${id} - ${storage[i]['title']}`;
            storage.splice(i, 1);
            this.set(storage);
            lineemotes.menu.rebuild();
            break;
        }
    }
    
    
    if (wasFound) {
        log(`Successfully deleted pack ${pack}`);
        return true;
    } else {
        log(`Pack ${pack} was not found in storage during deletion`);
        return false;
    }
};

lineemotes.storage.swapPack = function(from, to) {
    var storage = this.get();
    var log = lineemotes.log;
    var temp = storage[from];
    
    storage[from] = storage[to];
    storage[to] = temp;
    this.set(storage);
    log(`Successfully swapped packs '${storage[to]['title']}' and '${storage[from]['title']}'`);
    return true;
};

lineemotes.storage.renamePack = function(id, newtitle) {    
    if (this.getPack(id) === null) {
        log(`getPack() returned null, pack ${id} was not found in storage`);
        return;
    } else {
        var storage = lineemotes.storage.get();
        for (var pack = 0; pack < storage.length; ++pack) {
            if (storage[pack]['starting_id'] == id) {
                storage[pack]['title'] = newtitle;
                this.set(storage);
                lineemotes.menu.rebuild();
                break;
            }
        }
    }
}
lineemotes.getStylesheet = function () { 
var stylesheet = `#bda-qem-line-container .icon-plus {
  width: 22px;
  height: 22px;
  background-image: url(/assets/99d227db4a23596956637210e624d79b.png);
  background-position: -220px -484px;
  background-size: 924px 682px;
  filter: grayscale(100%);
  margin: 11px 0 0 0; }

#bda-qem-line-container .icon-plus-cross {
  display: inherit;
  margin: 0;
  transform: rotate(45deg);
  filter: invert(100%) grayscale(100%); }

#bda-qem-line-container .icon-minus {
  width: 22px;
  height: 22px;
  background-image: url(/assets/99d227db4a23596956637210e624d79b.png);
  background-position: -242px -484px;
  background-size: 924px 682px;
  filter: grayscale(100%);
  margin: 11px 0 0 0; }

#bda-qem-line-container .icon-edit {
  display: inherit;
  width: inherit;
  height: inherit;
  background-image: url(/assets/99d227db4a23596956637210e624d79b.png);
  background-position: -528px -374px;
  background-size: 924px 682px;
  filter: grayscale(100%);
  transform: rotate(90deg) scale(0.8); }

#bda-qem-line-container .icon-triangle {
  width: 22px;
  height: 22px;
  background-image: url(/assets/99d227db4a23596956637210e624d79b.png);
  background-position: -858px -484px;
  background-size: 924px 682px;
  filter: hue-rotate(130deg);
  float: right;
  margin-right: 5px; }

#bda-qem-line-container .add-form {
  position: absolute;
  display: flex;
  bottom: 48px;
  width: calc(var(--bd-les-width) - 45px);
  transition: opacity .1s ease-in-out .05s;
  background: inherit;
  padding: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-transform: uppercase; }
  #bda-qem-line-container .add-form .labels, #bda-qem-line-container .add-form .inputs {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    font-size: 12px;
    line-height: 17px; }
    #bda-qem-line-container .add-form .labels input::-webkit-input-placeholder, #bda-qem-line-container .add-form .inputs input::-webkit-input-placeholder {
      color: rgba(152, 170, 182, 0.5); }
    #bda-qem-line-container .add-form .labels input, #bda-qem-line-container .add-form .inputs input {
      border-bottom: solid 1px; }
    #bda-qem-line-container .add-form .labels #line-add-title,
    #bda-qem-line-container .add-form .labels #line-add-length,
    #bda-qem-line-container .add-form .labels #line-add-id, #bda-qem-line-container .add-form .inputs #line-add-title,
    #bda-qem-line-container .add-form .inputs #line-add-length,
    #bda-qem-line-container .add-form .inputs #line-add-id {
      width: 100%;
      height: 16px; }
  #bda-qem-line-container .add-form .inputs {
    flex-grow: 1; }
  #bda-qem-line-container .add-form .line-add-button {
    top: 1px;
    width: 35px;
    height: auto;
    padding: 0px;
    border-radius: 3px;
    background-color: #98aab6; }
  #bda-qem-line-container .add-form .line-add-button.invalid:hover {
    background-color: #ad0000 !important; }
  #bda-qem-line-container .add-form .line-add-button.valid:hover {
    background-color: #15ad00 !important; }

.popout.bda-qme-te-hidden #bda-qem-twitch, .popout.bda-qme-te-hidden #bda-qem-favourite {
  display: none; }

.popout.bda-qme-hidden.bda-qme-te-hidden #bda-qem {
  display: none; }

.popout.bda-qme-hidden.bda-qme-te-hidden #bda-qem-line-container {
  border-radius: 5px; }

#bda-qem button {
  box-shadow: #EFEFEF 1px 0 0 0; }

#bda-qem-twitch,
#bda-qem-favourite {
  border-radius: unset; }

#bda-qem-line {
  border-radius: 5px 0 0 0; }

.bda-dark .emoji-picker {
  border-color: #2b2b2b; }
  .bda-dark .emoji-picker .search-bar {
    border-radius: 0 4px 4px 0px; }

.bda-dark #bda-qem {
  border-bottom: 1px solid #2b2b2b !important; }
  .bda-dark #bda-qem button {
    box-shadow: #2b2b2b 1px 0 0 0; }

.bda-dark #bda-qem-line-container {
  background-color: #353535;
  border-color: #2b2b2b; }
  .bda-dark #bda-qem-line-container .scroller::-webkit-scrollbar,
  .bda-dark #bda-qem-line-container .scroller::-webkit-scrollbar-track,
  .bda-dark #bda-qem-line-container .scroller::-webkit-scrollbar-track-piece {
    background-color: #303030 !important;
    border-color: #303030 !important; }
  .bda-dark #bda-qem-line-container .scroller::-webkit-scrollbar-thumb {
    border-color: #202020 !important;
    background-color: #202020 !important; }
  .bda-dark #bda-qem-line-container .preview-container .preview-wrapper {
    background-color: #353535;
    border-color: #2b2b2b; }
  .bda-dark #bda-qem-line-container .confirm {
    background-color: rgba(35, 35, 35, 0.8); }
  .bda-dark #bda-qem-line-container .add-pack {
    opacity: 1; }

.popout.bda-qme-hidden.bda-qme-te-hidden #bda-qem-line-container {
  border-top-width: 1px; }

#bda-qem-line-container {
  border-radius: 0 0 5px 5px;
  font-weight: 800;
  color: #98aab6;
  background-color: #fff;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: rgba(191, 191, 191, 0.2); }
  #bda-qem-line-container .scroller-wrap {
    height: 100%; }
  #bda-qem-line-container .emote-menu-inner {
    padding: 5px 15px 48px 15px; }
  #bda-qem-line-container .line-pack-header {
    display: flex;
    color: #98aab6;
    height: 12px;
    font-size: 12px;
    padding: 12px 0 12px 0;
    text-transform: uppercase; }
  #bda-qem-line-container .emote-container {
    width: 71px;
    height: 71px; }
  #bda-qem-line-container .preview-container .preview-wrapper {
    position: absolute;
    width: 256px;
    height: calc(var(--bd-les-height) + var(--bd-les-offset));
    background-color: #fff;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(191, 191, 191, 0.2);
    border-radius: 5px;
    box-shadow: -10px 0px 80px 0px rgba(0, 0, 0, 0.2);
    transform: translateX(-258px) translateY(calc(0px - var(--bd-les-height) - var(--bd-les-offset) - var(--bd-les-border-offset))) translateZ(0px);
    transition: all .15s ease-in-out .15s; }
  #bda-qem-line-container .categories-container {
    position: absolute;
    width: calc(var(--bd-les-width) - 15px);
    bottom: 1px;
    overflow: hidden;
    z-index: 1;
    margin-top: -44px;
    background-color: inherit;
    border-top: 1px solid rgba(0, 0, 0, 0.1); }
    #bda-qem-line-container .categories-container .categories-wrapper {
      clear: right;
      overflow: hidden;
      white-space: nowrap; }
      #bda-qem-line-container .categories-container .categories-wrapper .item:first-of-type {
        margin-left: 15px;
        margin-right: 0px; }
      #bda-qem-line-container .categories-container .categories-wrapper .item:nth-child(2) {
        margin-left: 0px; }
      #bda-qem-line-container .categories-container .categories-wrapper .item:hover {
        filter: grayscale(0%); }
      #bda-qem-line-container .categories-container .categories-wrapper .item {
        display: inline-block;
        box-sizing: border-box;
        cursor: pointer;
        width: 28px;
        height: 44px;
        margin-right: 4px;
        margin-left: 2.5px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 32px 32px;
        border-bottom: 3px solid transparent;
        filter: grayscale(100%);
        transition: filter .1s ease-in-out; }
  #bda-qem-line-container .visible {
    opacity: 1 !important; }
  #bda-qem-line-container .line-pack input {
    width: 100%; }
  #bda-qem-line-container .line-pack .line-editbar:hover {
    opacity: 1; }
  #bda-qem-line-container .line-pack .line-editbar {
    float: right;
    display: flex;
    padding-top: 7px;
    opacity: 0;
    transition: opacity .1s ease-in-out; }
    #bda-qem-line-container .line-pack .line-editbar .item {
      display: inline-block;
      width: 22px;
      height: 22px;
      opacity: 0.5;
      transition: opacity .1s ease-in-out .05s; }
    #bda-qem-line-container .line-pack .line-editbar .item:hover {
      opacity: 1; }
  #bda-qem-line-container input:focus {
    box-shadow: 0px 2px 0px 0px;
    outline: none; }
  #bda-qem-line-container input {
    color: #98aab6;
    background-color: inherit;
    border: none;
    margin: 0;
    height: 12px;
    padding: 0px;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase; }
  #bda-qem-line-container .box {
    width: 100%;
    color: #98aab6;
    text-align: center;
    transform: translateY(250%); }
  #bda-qem-line-container .confirm {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    transition: opacity .1s ease-in-out .05s;
    z-index: 10; }
    #bda-qem-line-container .confirm .yes, #bda-qem-line-container .confirm .no {
      padding: 10px;
      text-transform: uppercase;
      cursor: pointer;
      color: rgba(152, 170, 182, 0.8);
      transition: color .1s ease-in-out .05s; }
    #bda-qem-line-container .confirm .yes:hover {
      color: #ad0000; }
    #bda-qem-line-container .confirm .no:hover {
      color: #98aab6; }
  #bda-qem-line-container .categories-container .categories-wrapper .item.add-pack-button {
    filter: unset; }
  #bda-qem-line-container .add-pack-button {
    position: relative;
    width: 20px;
    height: 20px;
    margin-right: 5px; }
  #bda-qem-line-container .add-pack-button > svg {
    position: absolute;
    top: 13px; }
  #bda-qem-line-container .add-pack-button > svg > path {
    opacity: 0.5;
    fill: #8c8c8c; }
  #bda-qem-line-container .add-pack-button > svg > path:hover {
    opacity: 1; }
` 
return "<style>" + stylesheet + "</style>"; 
};
lineemotes.prototype.getVersion = () => "0.6.9a";