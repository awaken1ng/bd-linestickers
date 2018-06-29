module.exports = class {
  observer (mutation) {
    let status = lineemotes.storage.get('hideURLs')
    if (status === null) {
      status = false
    }
    if (status === true) {
      for (var i = 0; i < mutation.addedNodes.length; ++i) {
        var next = mutation.addedNodes.item(i)
        if (next) {
          var nodes = this.observer.getNodes(next)
          for (var node in nodes) {
            if (nodes.hasOwnProperty(node)) {
              var element = nodes[node].parentElement
              if (element) {
                // skip code blocks
                if (element.tagName !== 'CODE') {
                  if (element.classList.contains('edited')) {
                    // if message with a sticker was edited, apply the sticker url hide
                    this.observer.inject(element)
                  } else {
                    // apply the sticker url hide
                    this.observer.inject(nodes[node])
                  }
                }
                // if message is being edited, unhide the text
                if (element.tagName == "TEXTAREA" && element.style.display == "none") {
                  element.style.display = ""
                }
              }
            }
          }
        }
      }
    }
  }
  getNodes (node) {
    var next
    var nodes = []
    var treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false)
    while (next = treeWalker.nextNode()) {
      nodes.push(next)
    }
    return nodes
  }
  inject (node) {
    if ((node.textContent.match(/sdl-stickershop.line.naver.jp/g)||[]).length < 1) return
    $(node).parent()[0].style.display = "none"
  }
}
