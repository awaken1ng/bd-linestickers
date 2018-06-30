function getNodes (node) {
  let next
  let nodes = []
  let treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false)
  while (next = treeWalker.nextNode()) {
    nodes.push(next)
  }
  return nodes
}

function inject (node) {
  if ((node.textContent.match(/sdl-stickershop.line.naver.jp/g) || []).length < 1) return
  $(node).parent()[0].style.display = 'none'
}

function observer (mutation) {
  const about = require('#/package.json') // context gets overriden somewhere later on, function doesn't see constants outside
  let enabled = window[about.id].storage.get('hideURLs')
  if (!enabled) return

  for (let i = 0; i < mutation.addedNodes.length; ++i) {
    let next = mutation.addedNodes.item(i)
    if (!next) continue

    let nodes = getNodes(next)
    for (let node in nodes) {
      if (!nodes.hasOwnProperty(node)) continue
      let element = nodes[node].parentElement
      if (!element) continue

      // skip code blocks
      if (element.tagName !== 'CODE') {
        if (element.classList.contains('edited')) {
          // if message with a sticker was edited, apply the sticker url hide
          inject(element)
        } else {
          // apply the sticker url hide
          inject(nodes[node])
        }
      }
      // if message is being edited, unhide the text
      if (element.tagName === 'TEXTAREA' && element.style.display === 'none') {
        element.style.display = ''
      }
    }
  }
}

module.exports = observer
