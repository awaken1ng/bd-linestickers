lineemotes.menu = function () {}

lineemotes.menu.init = function () {
    quickEmoteMenu.lsContainer = this.buildContainer();

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
            var ta = $(".channel-textarea-inner textarea");
            ta.val(ta.val().slice(-1) == " " ? ta.val() + emote : ta.val() + " " + emote);
            // force the textarea to resize if needed
            ta[0].dispatchEvent(new Event('input', { bubbles: true }));
        });
        lineemotes.preview.init();
        lineemotes.categories.init();
        lineemotes.confirm.init();
        lineemotes.menu.resize();
    };
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
            break
        }
        this.lastTab = id;
        var emoteIcon = $(".emote-icon");
        emoteIcon.off();
        emoteIcon.on("click", function() {
            var emote = $(this).attr("title");
            var ta = $(".channel-textarea-inner textarea");
            ta.val(ta.val().slice(-1) == " " ? ta.val() + emote : ta.val() + " " + emote);
        });
    };

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

    if ((width === null) || (height === null)) return;
    if (width < 344) {
        bdPluginStorage.set('lineemotes', 'width', 344);
        throw "Can't set width less than 344px"; }
    if (height < 326) {
        bdPluginStorage.set('lineemotes', 'height', 326);
        throw "Can't set height less than 326px"; }

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
            var ta = $(".channel-textarea-inner textarea");
            ta.val(ta.val().slice(-1) == " " ? ta.val() + emote : ta.val() + " " + emote);
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
    if ($(`#bda-qem-line-container`).length === 1)
        return true;
    else
        return false;
};
