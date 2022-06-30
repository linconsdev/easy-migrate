module.exports = class Column {
    constructor(name, dataType) {
        this.name       = name
        this.type       = dataType
        this.comment    = null
        this.alter      = false
        this.definition = {}
        this.modifiers  = {}
    }

    change(change = true) {
        this.alter = change
        return this
    }

    description(description) {
        this.comment = description
        return this
    }

    size(size) {
        this.definition.size = size
        return this
    }

    precision(precision) {
        this.definition.precision = precision
        return this
    }

    scale(scale) {
        this.definition.scale = scale
        return this
    }

    value(value) {
        this.definition.value = value
        return this
    }

    after(columnName) {
        this.modifiers.afterColumn = columnName
        return this
    }

    autoIncrement() {
        this.modifiers.isAutoIncrement = true
        return this
    }

    charset(charset) {
        this.modifiers.charset = charset
        return this
    }

    collation(collation) {
        this.modifiers.collation = collation
        return this
    }

    comment(comment) {
        this.modifiers.comment = comment
        return this
    }

    default(value, raw = false) {
        this.modifiers.default = value
        this.modifiers.isDefaultRaw = raw
        return this
    }

    first() {
        this.modifiers.first = true
        return this
    }

    from(integer) {
        this.modifiers.from  = integer
        return this
    }

    invisible() {
        this.modifiers.invisible = true
        return this
    }

    nullable() {
        this.modifiers.nullable = true
        return this
    }

    storedAs(expression) {
        this.modifiers.storedAs = expression
        return this
    }

    unsigned() {
        this.modifiers.unsigned = true
        return this
    }

    useCurrent() {
        this.modifiers.useCurrent = true
        return this
    }

    useCurrentOnUpdate() {
        this.modifiers.useCurrentOnUpdate = true
        return this
    }

    virtualAs(expression) {
        this.modifiers.virtualAs = expression
        return this
    }

    generatedAs(expression) {
        this.modifiers.generatedAs = expression
        return this
    }

    always() {
        this.modifiers.always = true
        return this
    }

    isGeometry() {
        this.modifiers.isGeometry = true
        return this
    }

    primary() {
        this.modifiers.primaryKey = true
        return this
    }
}