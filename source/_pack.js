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
    storage.pushPack(stickerpack);
    lineemotes.menu.rebuild();
    lineemotes.menu.appendPack(stickerid);
 
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

