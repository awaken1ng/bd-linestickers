const about = require('#/package.json')

function log (message) { console.log(`%c[${about.prettyName}] %c${message}`, 'color: #01B901', '') }

module.exports = log
