function columnDefinition(column, withModifiers = true, inject = '') {
    let query = `${column.name} ${inject + ' '}${column.type.toUpperCase()}`

    switch (column.type) {
        case 'varchar':
        case 'char':
            query += ` (${column.definition.size ? column.definition.size : 'MAX'})`
            break;

        case 'decimal':
        case 'float':
            query += ` (${column.definition.precision ? column.definition.precision : 8}, ${column.definition.scale ? column.definition.scale : 2})`
            break;

        default:
            query += ' '
    }

    if (withModifiers)
        Object.keys(column.modifiers).forEach(modifier => {
            switch (modifier) {                
                case 'unique':
                    if (column.modifiers.unique == true) query += ' UNIQUE'
                    break;

                case 'default':
                    if (column.modifiers.default) query += ` DEFAULT '${column.modifiers.default}'`
                    break;

                default:
            }
        })
    
    if (withModifiers) {
        if (column.modifiers.nullable == true) query += ''
        else query += ' NOT NULL' 
    }
    
    return query
}

const alterColumn = function  (table, column) { return `ALTER TABLE ${table} ALTER COLUMN ${columnDefinition(column, false, 'TYPE')}` }
const addColumn = function(table, column) { return `ALTER TABLE ${table} ADD ${columnDefinition(column)}` }

exports.alterColumn = alterColumn
exports.addColumn = addColumn

exports.createColumns = function(columns) {
    let queries = []

    Object.keys(columns).forEach(columnName => {
        let column = columns[columnName]
        let query = `${columnDefinition(column)}`        
        queries.push(query)

    });

    return queries.join(',\n\t')
}

exports.alterColumns = function(table, columns) {
    let queries = []
    Object.keys(columns).forEach(colName => {
        let column = columns[colName]
        if (column.alter == true)
            queries.push(alterColumn(table, column))
        else 
            queries.push(addColumn(table, column))
    })

    return queries
}

exports.dropColumn = function(table, column) {
    return `ALTER TABLE ${table} DROP COLUMN ${column} `
}

exports.renameColumn = function(table, oldName, newName) {
    return `ALTER TABLE ${table} RENAME COLUMN ${oldName} TO ${newName}`
}