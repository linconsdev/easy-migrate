const singleConstraint = function(table, constraint) {
    if (constraint.type == 'primary-key') {
        return `ALTER TABLE ${table} ADD CONSTRAINT ${constraint.name} PRIMARY KEY (${constraint.value.join(',')})`
    } else if (constraint.type == 'unique-key') {
        return `ALTER TABLE ${table} ADD CONSTRAINT ${constraint.name} UNIQUE (${constraint.value.join(',')})`
    } else if (constraint.type == 'foreign-key') {
        return `ALTER TABLE ${table} ADD CONSTRAINT ${constraint.name} FOREIGN KEY (${constraint.value.join(',')}) REFERENCES ${constraint.foreignKey.table}(${constraint.foreignKey.column})`
    } else if (constraint.type == 'index') {
        return `CREATE INDEX ${constraint.name} ON ${table} (${constraint.value.join(',')})`
    }
}

exports.constraint = singleConstraint

exports.constraints = function(table, constraints) {
    let queries = []

    Object.keys(constraints).forEach(name => {
        let constraint = constraints[name]
        queries.push(singleConstraint(table, constraint))
    })

    return queries
}

exports.renameConstraints = function(table, oldName, newName) {
    return `ALTER TABLE ${table} RENAME CONSTRAINT ${oldName} TO ${newName}`
}

exports.dropConstraint = function(table, constraint) {
    return `ALTER TABLE ${table} DROP CONSTRAINT ${constraint}`
}

exports.dropPrimary = function(table, constraint) {
    return `ALTER TABLE ${table} DROP CONSTRAINT ${constraint}`
}

exports.dropUnique = function(table, constraint) {
    return `ALTER TABLE ${table} DROP CONSTRAINT ${constraint}`
}

exports.dropForeign = function(table, constraint) {
    return `ALTER TABLE ${table} DROP CONSTRAINT ${constraint}`
}

exports.dropIndex = function(table, constraint) {
    return `DROP INDEX ${table}.${constraint}`
}

