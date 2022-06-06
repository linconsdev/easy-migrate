const path = require('path')
const fs = require('fs')


const Schema = require('./schema')

class Migrations{
    constructor(config = require('../test/config')) {
        this.config = {
            connection: null,
            toSql: false,
            toSqlPath: null,
            recrusive: false
        }
        this.connections = {}
        this.directories = []
        this.files = []
        this.migrations = []

        this.up = []
        this.down = []

        

        //functions that help in migration process
        this.migrators = {
            connectionSet: (connectionName) => {
                if (connectionName == 'default') return this.connections[this.config.connection]
                else if (connectionName in this.connections) return this.connections[connectionName]
                else throw new Error(`Connection ${connectionName} is not found in database connections configurations`)
            },
            
        }

        //Setting migrations config
        this.config.connection = config.default
        this.connections = config.connections
        if (!(this.config.connection in this.connections))
            throw new Error(`Default connection '${this.config.connection}' is not found in connections.`)
        else
            this.connections.default = this.connections[this.config.connection]
    }

    /**
     * Method acknowledge folders from which migrations should be loaded
     * @param  {...directories} directories Paths to directories containing migration files
     * @returns Migrations
     */
    fromDirectories(...directories) {
        directories.forEach(directory => {
            if (fs.statSync(directory).isDirectory()) {
                this.directories.push(directory)
               
            } else 
                throw new Error(`Path '${directory}' is not a dir (directory/folder).`)
        })

        return this
    }

    /**
     * Method acknowledge migrations files that should be loaded
     * @param  {...uris} files Paths to directories containing migration files
     * @returns Migrations
     */
    fromFiles(...files) {
        files.forEach(uri => {
            if (fs.statSync(uri).isFile() && path.extname(uri) == '.js') {
                this.files.push(uri)
            } else 
                throw new Error(`Path '${uri}' is not a file or javascript file.`)
        })

        return this
    }

    /**
     * Method that sets if migration directories should be read recrusevly
     * @param {Boolean} bool true for recrusive false for not, defaults to true
     * @returns Migrations
     */
    recrusive(bool = true) {
        this.config.recrusive = bool
        return this
    }

    /**
     * Method that finds migration files and checks for validity of "up" and "down" functions
     * @param {Array} directories array of directroy paths, defaults to dirs provided with method fromDirectories
     * @returns Migrations
     */
    loadMigrations() {
        this.directories.forEach(directory => {
            if (fs.statSync(directory).isDirectory()) {
                fs.readdirSync(directory).forEach(file => {
                    let uri = path.join(directory, file)
                    if (fs.statSync(uri).isFile() && path.extname(uri) == '.js') {
                        this.migrations.push({
                            file,
                            uri
                        })
                    } else if (fs.statSync(uri).isDirectory() && this.config.recrusive) {
                        this.loadMigrations([uri], true)
                    }
                })
            }
        })
        this.files.forEach(uri => {
            if (fs.statSync(uri).isFile() && path.extname(uri) == '.js') {
                this.migrations.push({
                    file: path.basename(uri),
                    uri
                })
            }
        })
        this.migrations.sort((a, b) => { 
            return a.file.localeCompare(b.file) 
        })
        return this
    }

    migrate(migration, rollback = false) {
        let { name, description, up, down } = require(migration.uri)

        if (!(up instanceof Function) || !(down instanceof Function)) 
            throw new Error(`Migration "${file}" must export functions for "up" and "down" migrations`)
        
        let schema = new Schema(name ? name : migration.file, migration.uri)
            schema.connections(this.connections)

        if (!rollback)  up(schema)
        else            down(schema)

        let queryToExecute = `--MIGRATION: ${schema.name}\n--FILE: ${schema.path}\n--ROLLBACK: ${rollback ? 'TRUE' : 'FALSE'}\n\n`
        let queries = []

        schema.definitions.forEach(definition => {
            definition.run()
                .then(console.log)
                .catch(console.log)

            queries = queries.concat(definition.sql.query)
        })

        queryToExecute += queries.join(`;\n\r`)

        if (this.config.toSql) {
            fs.writeFileSync(path.join(this.config.toSqlPath, schema.name + '.sql'), queryToExecute)
        } else {
            console.log("QUERY DATABASE")
        }
        return this
    }

    /**
     * Method that sets config to output sql queries to files.
     * Calling migrate method will output to files instead of querying database
     * @param {String} path path to directory / folder
     * @returns 
     */
    toSQL(path) {
        if (fs.statSync(path).isDirectory()) {
            this.config.toSql = true
            this.config.toSqlPath = path
        } else
            throw new Error(`Path provided to toSQL method must be directory. It is location where sql queries will be outputed!`)
        return this
    }
}


module.exports = new Migrations()

/*



*/