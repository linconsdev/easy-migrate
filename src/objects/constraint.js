class Constraints{
    constructor(type, value, name) {
        this.types = [
            'index',
            'primary-key',
            'unique-key',
            'foreign-key',
            'spatial',
            'full-text',
            'default',
            'check',
            'not null',
        ]
        this.type = null
        this.value = null
        this.name = null

        this.foreignKey = {
            column: null,
            table: null,
            onUpdate: null,
            onDelete: null,
        }
        
        if (!this.types.includes(type))
            throw new Error(`Unknown constraint type "${type}"`)
        else
            this.type = type


        if (value instanceof Array || typeof value == 'array') {
            this.value = value
        } else if (value instanceof String || typeof value == 'string') {
            this.value = [ value ]
        } else 
            throw new Error(`Missing constraint value!`)

        if (!name) {
            throw new Error(`Missing constraint name`)
        }

        this.name = name
    }

    get composite() { 
        if (this.value.length > 0) 
            if (this.value.length == 1) return false
            else return true
        else return false
    }

    references(column) {
        if (this.type == 'foreign-key') 
            this.foreignKey.column = column
        else 
            throw new Error(`Can not reference to column "${value}" for index "${this.name}" that is not of type "foreign"!
                \rKey type is "${this.type}"`)
        return this
    }

    on(table) {
        if (this.type == 'foreign-key') 
            this.foreignKey.table = table
        else 
            throw new Error(`Can not reference on table "${table}" for index "${this.name}" that is not of type "foreign"! 
                \rKey type is "${this.type}"`)
        return this
    }

    onUpdate(action) {
        if (this.type == 'foreign-key') 
            this.foreignKey.onUpdate = action
        else 
            throw new Error(`Can not set ON UPDATE constraint for index "${this.name}" that is not of type "foreign"! 
                \rKey type is "${this.type}"`)
        return this
    }

    onDelete(action) {
        if (this.type == 'foreign-key') 
            this.foreignKey.onDelete = action
        else 
            throw new Error(`Can not set ON UPDATE constraint for index "${this.name}" that is not of type "foreign"!
                \rKey type is "${this.type}"`)
        return this
    }
}


module.exports = Constraints