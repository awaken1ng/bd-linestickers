//META{"name":"lineemotes"}*//

var lineemotes = function () {};

lineemotes.prototype.load = function () {
    lineemotes.log('Loading');
};

lineemotes.prototype.start = function () {
    lineemotes.log('Initializing');
    lineemotes.menu.init();
    /*lineemotes.prototype.observer.status.read();*/
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

lineemotes.prototype.initSettingsPanel = function() {
    console.log('test');
    $('#line-settings-hideurl').click(() => {
        console.log(this);
    });
};

lineemotes.prototype.settings = function () {};
lineemotes.prototype.settings.toggleHide = function () {
    console.log('toggling hide');
    if (document.getElementById('line-settings-hideurl').checked) { 
        bdPluginStorage.set(lineemotes.storage.getName(), 'hideURLs', true); 
    } else { 
        bdPluginStorage.set(lineemotes.storage.getName(), 'hideURLs', false); 
    }
};
    
lineemotes.prototype.getSettingsPanel = function () {
    console.log(this);
    
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
    
    toggle.appendChild(input);
    toggle.appendChild(div);

    return "<div style='display:flex;'><h3 style='color:#b0b6b9;'>Hide sticker URL on client side (others will see it, switch text channel or server for the change to apply)</h3>" + toggle.outerHTML + "</div>";
};

//logger function, outputs console message in '[Line Stickers] <message>' format
lineemotes.log = (message) => console.log(`[${lineemotes.prototype.getName()}] ${message}`);

lineemotes.prototype.getName = () => "Line Stickers";
lineemotes.prototype.getDescription = () => "Extends emote menu to add Line stickers.";
lineemotes.prototype.getVersion = () => "0.6.3";
lineemotes.prototype.getAuthor = () => "Awakening";