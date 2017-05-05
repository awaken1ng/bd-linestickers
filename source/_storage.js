
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
        log(`Successfully added pack '${pack['title']}'`);
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