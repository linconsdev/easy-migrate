const Blueprint = require('./objects/blueprint')
const Definition = require('./definition')

module.exports = class Schema {
    constructor(name = null, path = null) {
        this.name = name
        this.path = path
        this.config = {
            connection: 'default',
            connections: {},
            foreignKeysConstraints: true,
        }
        this.definitions = []
    }

    create(table, callback = (table) => { return table }) {
        let blueprint = new Blueprint(table)
        callback(blueprint)
        this.definitions.push(new Definition({
            connection: this.dboConnection,
            action: 'create-table',
            table,
            blueprint 
        }))

        return this.connection('default')
    }

    table(table, callback = (table) => { return table }) {
        let blueprint = new Blueprint(table)
        callback(blueprint)
        this.definitions.push(new Definition({
            connection: this.dboConnection,
            action: 'alter-table',
            table,
            blueprint 
        }))

        return this.connection('default')
    }

    drop(table) {
        this.definitions.push(new Definition({
            connection: this.dboConnection,
            action: 'drop-table',
            table: table,
        }))

        return this.connection('default')
    }

    dropIfExists(table) {
        this.definitions.push(new Definition({
            connection: this.dboConnection,
            action: 'drop-table-if-exists',
            table: table,
        }))

        return this.connection('default')
    }
    
    rename(from, to) {
        this.definitions.push(new Definition({
            connection: this.dboConnection,
            action: 'rename-table',
            from, 
            to
        }))
        return this.connection('default')
    }

    connection(connection) {
        this.config.connection = connection
        return this
    }

    connections(connections) {
        this.config.connections = {
            ...this.config.connections, 
            ...connections
        }
        return this
    }

    get dboConnection(){
        if (this.config.connection  in this.config.connections) 
            return this.config.connections[this.config.connection]
        else 
            throw new Error(`Connection ${this.config.connection} is not found in database connections configurations`)
    }

    hasTable(table) {}
    hasColumn(table, column) {}


    enableForeignKeyConstraints() { this.config.foreignKeysConstraints = true; return this; }
    disableForeignKeyConstraints() { this.config.foreignKeysConstraints = false; return this; }
}

