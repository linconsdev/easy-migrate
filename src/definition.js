const definitionActions = [
    'create-table',
    'alter-table',
    'rename-table',
    'drop-table',
    'drop-table-if-exists'
]

module.exports = class Definition {
    constructor(definition) {
        this.title      = null
        this.action     = null
        this.connection = null
        this.table      = null
        this.from       = null
        this.to         = null
        this.blueprint  = null
        this.sql        = {
            build: false,
            query: '',
            runnerResults: [],
        }

        if (!definitionActions.includes(definition.action)) 
            throw new Error(`Unknown schema definition action`)
        else this.action = definition.action

        this.connection = definition.connection ? definition.connection : null;
        this.table      = definition.table      ? definition.table      : null;
        this.from       = definition.from       ? definition.from       : null;
        this.to         = definition.to         ? definition.to         : null;
        this.blueprint  = definition.blueprint  ? definition.blueprint  : null;

        this.builders = {
            mysql: require('./builders/mysql/mysql'),
            sqlsrv: require('./builders/sqlsrv/sqlsrv'),
            postgre: require('./builders/postgre/postgre'),
            oracle: require('./builders/oracle/oracle'),
        }
        this.drivers = {
            mysql: require('./drivers/mysql'),
            sqlsrv: require('./drivers/sqlsrv'),
            postgre: require('./drivers/postgre'),
            oracle: require('./drivers/oracle'),
        }
    }

    /**
     * Method that attaches name to this definition
     * @param {String} name Name of this defintion 
     * @returns Definition
     */
    name(name) {
        this.title = name
        return this
    }

    /**
     * Method that builds sql queries of this definition
     * @returns Definition
     */
    build() {
        let driver = this.connection.driver
        let builderAction = require('./helpers/topascalcase')(this.action)

        if (this.builders[driver]) {
            if (this.builders[driver][builderAction]) {
                this.sql.query = this.builders[driver][builderAction](this);
                this.sql.build = true

                if (typeof this.sql.query == 'array' || this.sql.query instanceof Array) this.sql.query = this.sql.query.join(";\n")
            } else
                throw new Error(`No query builder for action driver "${builderAction}"`)
        } else {
            throw new Error(`No query builder for database driver "${driver}"`)
        }

        return this
    }

    /**
     * Method runs build query against database 
     * @returns Promise
     */
    async run() {
        if (!this.sql.build) this.build()

        let driver = this.connection.driver
        if (!this.drivers[driver])
            throw new Error(`There is no database driver implemented for driver name "${driver}"`)

        return await new Promise((resolve, reject) => {
            let client = new this.drivers[driver](this.connection)
            client.query(this.sql.query).then(res => {
                this.sql.runnerResults.push(res)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        });
    }

    query() {
        if (!this.sql.build) this.build()
        return this.sql.query
    }


    logSql() {
        console.log(this.sql.query, this.connection)
    }
}