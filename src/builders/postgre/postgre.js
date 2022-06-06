const ColumnQuery = require('./columns')
const ConstraintQuery = require('./constraints')

const createTable = function(definition) {
    let table = definition.blueprint
    
    let columnsToCreateQuery = ColumnQuery.createColumns(table.columns)
    let constraintsQueries = ConstraintQuery.constraints(table.name, table.constraints)
    let renameQueries = []
    let dropQueries = []

    let createTableQuery = `CREATE TABLE ${table.name} (\n\t${columnsToCreateQuery}\n)`

    table.rename.forEach(element => {
        if (element.type == 'column') {
            renameQueries.push(ColumnQuery.renameColumn(table.name, element.oldName, element.newName))
        } else if (element.type = 'constraint') {
            renameQueries.push(ConstraintQuery.renameConstraints(table.name, element.oldName, element.newName))
        }
    });

    table.drop.forEach(element => {
        if (element.type == 'column') {
            dropQueries.push(ColumnQuery.dropColumn(table.name, element.value))
        } else if (element.type == 'constraint') {
            switch (element.constraint) {
                case 'foreign-key':
                    dropQueries.push(ConstraintQuery.dropForeign(table.name, element.value))
                    break;
                case 'primary-key':
                    dropQueries.push(ConstraintQuery.dropPrimary(table.name, element.value))
                    break;
                case 'unique-key':
                    dropQueries.push(ConstraintQuery.dropUnique(table.name, element.value))
                    break;
                case 'index':
                    dropQueries.push(ConstraintQuery.dropIndex(table.name, element.value))
                    break;
                default:
                    dropQueries.push(ConstraintQuery.dropConstraint(table.name, element.value))
            }
        }
    })
    
    return [
        createTableQuery,
        ...constraintsQueries,
        ...renameQueries,
        ...dropQueries
    ]
}

const alterTable = function(definition) {
    let table = definition.blueprint
    
    let columnsToAlterQuery = ColumnQuery.alterColumns(table.name, table.columns)
    let constraintsQueries = ConstraintQuery.constraints(table.name, table.constraints)
    let renameQueries = []
    let dropQueries = []
    
    table.rename.forEach(element => {
        if (element.type == 'column') {
            renameQueries.push(ColumnQuery.renameColumn(table.name, element.oldName, element.newName))
        } else if (element.type = 'constraint') {
            renameQueries.push(ConstraintQuery.renameConstraints(table.name, element.oldName, element.newName))
        }
    });

    table.drop.forEach(element => {
        if (element.type == 'column') {
            dropQueries.push(ColumnQuery.dropColumn(table.name, element.value))
        } else if (element.type == 'constraint') {
            switch (element.constraint) {
                case 'foreign-key':
                    dropQueries.push(ConstraintQuery.dropForeign(table.name, element.value))
                    break;
                case 'primary-key':
                    dropQueries.push(ConstraintQuery.dropPrimary(table.name, element.value))
                    break;
                case 'unique-key':
                    dropQueries.push(ConstraintQuery.dropUnique(table.name, element.value))
                    break;
                case 'index':
                    dropQueries.push(ConstraintQuery.dropIndex(table.name, element.value))
                    break;
                default:
                    dropQueries.push(ConstraintQuery.dropConstraint(table.name, element.value))
            }
        }
    })
    
    return [
        ...columnsToAlterQuery,
        ...constraintsQueries,
        ...renameQueries,
        ...dropQueries
    ]

}

const dropTable = function(definition) {
    return `DROP TABLE ${definition.table}`
}

const dropTableIfExists = function (definition) {
    return `DROP TABLE IF EXISTS ${definition.table}`
}

const renameTable = function(definition) {
    return `ALTER TABLE ${definition.from} RENAME TO ${definition.to}` 
}






exports.createTable         = createTable
exports.alterTable          = alterTable
exports.dropTable           = dropTable
exports.dropTableIfExists   = dropTableIfExists
exports.renameTable         = renameTable