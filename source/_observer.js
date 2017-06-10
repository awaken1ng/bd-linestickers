

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

/*
lineemotes.prototype.observer.status.read = function() {
    this.current = bdPluginStorage.get(lineemotes.storage.getName(), 'hideURLs');
    if (this.current === null) {
        this.current = false;
    }
}
*/

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
