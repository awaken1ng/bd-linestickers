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
lineemotes.prototype.getVersion = () => "0.6.1";
lineemotes.prototype.getAuthor = () => "Awakening";