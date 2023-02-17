const fs = require('fs')
var pkg = require('./package.json')
const ver = pkg.version = pkg.version.split('.').map((o, i) => {
    return i == 2 ? Number(o) + 1 : o
}).join('.')
fs.writeFileSync('./package.json', fs.readFileSync('./package.json', { encoding: 'utf8' }).replace(/"version":[" \.\d]+/, `"version": "${ver}"`))
