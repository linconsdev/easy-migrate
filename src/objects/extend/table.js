const base = require('./base')
const rename = require('./rename')
const drop = require('./drop')
const constraints = require('./constraints')
const columns = require('./columns')

module.exports = class Table extends columns(constraints(drop(rename(base)))) {}