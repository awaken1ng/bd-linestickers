//META{"name":"lineemotes"}*//

var lineemotes = function () {};

lineemotes.prototype.load = function () {
    lineemotes.log('Loading');
};

lineemotes.prototype.start = function () {
    lineemotes.log('Initializing');
    lineemotes.menu.init();
    lineemotes.prototype.observer.status.read();
};


lineemotes.prototype.stop = function () {
    lineemotes.log('Stopping, reverting emote menu to default');
    lineemotes.menu.unload();
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

lineemotes.prototype.getSettingsPanel = function () {
    //return "<h3>Settings Panel</h3>";
};

//logger function, outputs console message in '[Line Stickers] <message>' format
lineemotes.log = (message) => console.log(`[${lineemotes.prototype.getName()}] ${message}`);

lineemotes.prototype.getName = () => "Line Stickers";
lineemotes.prototype.getDescription = () => "Extends emote menu to add Line stickers.";
lineemotes.prototype.getVersion = () => "0.6.2";
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
    
    var numbersOnly = "return event.charCode >= 48 && event.charCode <= 57";
    container += `
<div class="add-form" style="display: inline-flex; opacity: 0; pointer-events: none;">
    <div class="labels" style="margin-right: 10px; font-size: 14px; line-height: 17px;">
        <label for="line-add-title">Title</label><br>
        <label for="line-add-length">Length</label><br>
        <label for="line-add-id">First sticker ID</label>
    </div>
    <div class="inputs" style="padding-top: 0.5px";>
        <input id="line-add-title" placeholder="Title"><br>
        <input id="line-add-length" onkeypress="${numbersOnly}" placeholder="Length" value="40"><br>
        <input id="line-add-id" onkeypress="${numbersOnly}" placeholder="First sticker ID">
    </div>
    
    <button type="button" class="line-add-button ui-button filled brand small" style="margin-left: 10px; width: 42px; height: auto; top: 1px; padding: 0px; background-color: #98aab6;">
        <div class="ui-button-contents">Add</div>
    </button>
</div>
<div class="categories-container">
  <div class="categories-wrapper"><div class="item"><div class="add-pack icon-plus"></div></div>${categories}</div>
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
            $('#line-add-length').val('');
            $('#line-add-id').val('');
        }
    });
};
lineemotes.menu = function () {}

lineemotes.menu.init = function () {
    quickEmoteMenu.lsContainer = this.buildContainer();
    
    // overriding
    // adding line tab into the callback function
    QuickEmoteMenu.prototype.obsCallback = function(e) {
        if (!settingsCookie["bda-es-9"]) 
            e.addClass("bda-qme-hidden");
         else 
            e.removeClass("bda-qme-hidden");
      
        if (!settingsCookie["bda-es-0"])
            return;
        e.prepend(this.qmeHeader);
        
        $('#bda-qem').append('<button id="bda-qem-line" onclick="quickEmoteMenu.switchHandler(this); return false;" class="active">Line</button>');
        
        e.append(this.teContainer);
        e.append(this.faContainer);
        e.append(this.lsContainer);
        if (this.lastTab === undefined)
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
                var emote = $(this).attr("src");
            } else {
                // otherwise grab title attribute
                var emote = $(this).attr("title");
            }
            var ta = $(".channel-textarea-inner textarea");
            ta.val(ta.val().slice(-1) == " " ? ta.val() + emote : ta.val() + " " + emote);
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
    
    var container = `${lineemotes.getStylesheet()}
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
    if (width < 346) { width = 346; lineemotes.log("Can't set width less than 346px"); }
    bdPluginStorage.set('lineemotes', 'width', width); 
    lineemotes.menu.resize();
};

lineemotes.menu.setHeight = function(height) { 
    if (height < 327) { height = 327; lineemotes.log("Can't set height less than 327px"); } 
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
    if (width < 346) { 
        bdPluginStorage.set('lineemotes', 'width', 346);
        throw "Can't set width less than 346px"; }
    if (height < 327) { 
        bdPluginStorage.set('lineemotes', 'height', 327);
        throw "Can't set height less than 327px"; } 
    
    $('#bda-qem-line-container').css('width', width);
    $('#bda-qem-line-container').css('height', height);
    
    $('#bda-qem-line-container .preview-wrapper').css('height', height + 31);
    $('#bda-qem-line-container .preview-wrapper').css('transform', `translateX(-256px) translateY(-${height + 31}px) translateZ(0px)`);
    
    $('#bda-qem-line-container .categories-container').css('width', width - 15);
    $('#bda-qem-line-container .add-form').css('width', width - 45);
    $('#line-add-title').css('width', width - 220);
    $('#line-add-length').css('width', width - 220);
    $('#line-add-id').css('width', width - 219);
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


lineemotes.prototype.observer = function (mutation) {
    var status = lineemotes.prototype.observer.status.current;
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

lineemotes.prototype.observer.status.read = function() {
    this.current = bdPluginStorage.get(lineemotes.storage.getName(), 'hideURLs');
    if (this.current === null) {
        this.current = false;
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
    var container = '';
    container += `
<div class="confirm" style="opacity: 0; pointer-events: none;">
    <div class="box">
        <h3 class="value"></h3>
        <h3 style="padding: 10px;">Are you sure you want to delete this pack?</h3>
        <div>
            <span class="yes">Yes</span>
            <span class="no" onclick="lineemotes.confirm.hide();">No</span>
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
    <div class="preview-wrapper" style="background-position: center; visibility: hidden; opacity: 0; background-size: contain;"></div>
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
    preview.css('background', `url("${url}") rgb(53, 53, 53) no-repeat center`);
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
    var stylesheet = '';
    
    stylesheet += `
#bda-qem-line-container {
    width: 346px;
    height: 327px;
    border-radius: 0 0 5px 5px;
    font-weight: 800;
    color: #98aab6;
    background-color: #353535;
}`;
    
    // styling the scroller so it looks consistent across the tabs
    stylesheet += `
.bda-dark #bda-qem-line-container .scroller::-webkit-scrollbar, 
.bda-dark #bda-qem-line-container .scroller::-webkit-scrollbar-track, 
.bda-dark #bda-qem-line-container .scroller::-webkit-scrollbar-track-piece {
    background-color: #303030 !important;
    border-color: #303030 !important;
}
 
.bda-dark #bda-qem-line-container .scroller::-webkit-scrollbar-thumb {
    border-color: #202020 !important;
    background-color: #202020 !important;
}`;

    // preventing overflow
    stylesheet += `
#bda-qem-line-container .scroller-wrap {
    height: 100%;
}`;
    
    // padding the inner container
    stylesheet += `
#bda-qem-line-container .emote-menu-inner {
    padding: 5px 15px 48px 15px;
}`;
    
    // header for a sticker pack
    stylesheet += `
#bda-qem-line-container .line-pack-header {
    display: flex;
    color: #98aab6;
    height: 12px;
    font-size: 12px;
    padding: 12px 0 12px 0;
    text-transform: uppercase;
}`;
    
    // sizing stickers up from default 30x30
    stylesheet += `
#bda-qem-line-container .emote-container {
    width: 71px;
    height: 71px;
}`;
    
    // preview stylesheet
    stylesheet += `
#bda-qem-line-container .preview-container .preview-wrapper {
    position: absolute; 
    width: 256px;
    height: 358px; 
    background: #353535; 
    background-size: contain; 
    border-top-left-radius: 3px; 
    border-bottom-left-radius: 3px; 
    box-shadow: -10px 0px 80px 0px rgba(0, 0, 0, 0.2); 
    transform: translateX(-256px) translateY(-358px) translateZ(0px); 
    transition: all .15s ease-in-out .15s; 
}`;
    
    // categories stylesheet
    stylesheet += `
#bda-qem-line-container .categories-container {
    position: absolute;
    width: 331px;
    bottom: 0;
    overflow: hidden;
    z-index: 1;
    margin-top: -44px;
    background-color: #353535;
    border-top: 1px solid rgba(0,0,0,.1);   
}

#bda-qem-line-container .categories-container .categories-wrapper {
    clear: right;
    overflow: hidden;
    white-space: nowrap;
}
    
#bda-qem-line-container .categories-container .categories-wrapper .item:first-of-type {
    margin-left: 15px;
    margin-right: 0px;
}
    
#bda-qem-line-container .categories-container .categories-wrapper .item:nth-child(2) {
    margin-left: 0px;
}


#bda-qem-line-container .categories-container .categories-wrapper .item:hover { 
    filter: grayscale(0%); 
}

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
    transition: filter .1s ease-in-out;
}`;


    stylesheet += `
#bda-qem-line-container .visible {
    opacity: 1 !important;
}
    
#bda-qem-line-container .line-pack .line-editbar:hover {
    opacity: 1;
}
    
#bda-qem-line-container .line-pack .line-editbar {
    float: right;
    display: flex;
    padding-top: 7px;
    opacity: 0;
    transition: opacity .1s ease-in-out;
}

#bda-qem-line-container .line-pack .line-editbar .item {
    display: inline-block;
    width: 22px;
    height: 22px;
    opacity: 0.5;
    transition: opacity .1s ease-in-out .05s;
}
    
#bda-qem-line-container .line-pack .line-editbar .item:hover {
    opacity: 1;
}

#bda-qem-line-container .line-pack .line-editbar .icon-edit {
    display: inherit;
    width: inherit;
    height: inherit;
    background-image: url(/assets/99d227db4a23596956637210e624d79b.png);
    background-position: -528px -374px;
    background-size: 924px 682px;
    filter: grayscale(100%);
    transform: rotate(90deg) scale(0.8);
}



#bda-qem-line-container .icon-plus {
    width: 22px;
    height: 22px;
    background-image: url(/assets/99d227db4a23596956637210e624d79b.png);
    background-position: -220px -484px;
    background-size: 924px 682px;
    filter: grayscale(100%);
    margin: 11px 0 0 0;
}

#bda-qem-line-container .icon-plus-cross {
    display: inherit;
    margin: 0;
    transform: rotate(45deg);
    filter: invert() grayscale(100%);
}

#bda-qem-line-container .icon-minus {
    width: 22px;
    height: 22px;
    background-image: url(/assets/99d227db4a23596956637210e624d79b.png);
    background-position: -242px -484px;
    background-size: 924px 682px;
    filter: grayscale(100%);
    margin: 11px 0 0 0;
}
        

#bda-qem-line-container input:focus {
    box-shadow: 0px 2px 0px 0px;
    outline: none;
}

#bda-qem-line-container input {
    color: #98aab6;
    background-color: #353535;
    border: none;
    margin: 0;
    height: 12px;
    padding: 0px;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
}
    
#bda-qem-line-container .line-pack input {
    width: 100%;
}

#bda-qem-line-container .add-form {
    position: absolute;
    bottom: 48px;
    width: 301px;
    transition: opacity .1s ease-in-out .05s;
    background: #353535;
    padding: 15px;
    border-top: 1px solid rgba(0, 0, 0, .1);
    text-transform: uppercase;
}

#bda-qem-line-container .add-form input::-webkit-input-placeholder {
    color: rgba(152, 170, 182, 0.5);
}
#bda-qem-line-container .add-form input {
    border-bottom: solid 1px;
    margin: 0;
}
#bda-qem-line-container .add-form input:focus {
    border: none;
}
    
#line-add-id {
}
    
#line-add-length {
}
    
#line-add-title {
}

#bda-qem-line-container .categories-container .icon-triangle {
    width: 22px;
    height: 22px;
    background-image: url(/assets/99d227db4a23596956637210e624d79b.png);
    background-position: -858px -484px;
    background-size: 924px 682px;
    filter: hue-rotate(130deg);
    float: right;
    margin-right: 5px;
}

#bda-qem-line-container .confirm {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(35, 35, 35, 0.8);
    transition: opacity .1s ease-in-out .05s;
    z-index: 10;
}
    
#bda-qem-line-container .box {
    width: 100%; 
    color: #98aab6; 
    text-align: center;
    transform: translateY(250%);
}
    
#bda-qem-line-container .confirm .yes, #bda-qem-line-container .confirm .no {
    padding: 10px;
    text-transform: uppercase;
    cursor: pointer;
    color: rgba(152, 170, 182, 0.8);
    transition: color .1s ease-in-out .05s;
}

#bda-qem-line-container .confirm .yes:hover {
    color: #ad0000
}

#bda-qem-line-container .confirm .no:hover {
    color: rgb(152, 170, 182);
} 
    
#bda-qem-line-container .line-add-button.invalid:hover {
    background-color: #ad0000 !important; 
}
#bda-qem-line-container .line-add-button.valid:hover {
    background-color: #15ad00 !important; 
}
`;
    return `<style>${stylesheet}</style>`;
};