const Constraint = require('../constraint')

module.exports = (superclass) => class Constraints extends superclass {
    /**CONSTRAINTS */

    primary(values, name) {
        if (!(values instanceof Array  || typeof values == 'array' || typeof values === 'string' || values instanceof String))
            throw new Error(`Please provide primary key column/s`)
        else if (!(name instanceof String) && name == '')
            throw new Error(`Please provide name for primary key constraint for columns: [${$values.join(',')}]`)
        this.constraints.primary = new Constraint('primary-key', values, name)
        return this.constraints.primary
    }

    unique(values, name) {
        if (!(values instanceof Array  || typeof values == 'array' || typeof values === 'string' || values instanceof String))
            throw new Error(`Please provide unique key column/s`)
        else if (!(name instanceof String) && name == '')
            throw new Error(`Please provide name for unique key constraint for columns: [${$values.join(',')}]`)
        this.constraints[name] = new Constraint('unique-key', values, name)
        return this.constraints[name]
    }

    index(values, name) {
        if (!(values instanceof Array  || typeof values == 'array' || typeof values === 'string' || values instanceof String))
            throw new Error(`Please provide index column/s`)
        else if (!(name instanceof String) && name == '')
            throw new Error(`Please provide name for unique key constraint for columns: [${$values.join(',')}]`)
        this.constraints[name] = new Constraint('index', values, name)
        return this.constraints[name]
    }

    foreign(values, name) {
        if (!(values instanceof Array  || typeof values == 'array' || typeof values == 'string' || values instanceof String))
            throw new Error(`Please provide foreign key column/s`)
        else if (!(name instanceof String) && name == '')
            throw new Error(`Please provide name for foreign key constraint for columns: [${$values.join(',')}]`)
        this.constraints[name] = new Constraint('foreign-key', values, name)
        return this.constraints[name]
    }
}