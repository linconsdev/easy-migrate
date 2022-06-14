const path = require('path')
const fs = require('fs')
const Schema = require('./schema')


function migrationSQLQueryHead(name, path, title, rollback, database = null, host = null) {
    return `--MIGRATION: ${name}
--FILE: ${path}
--DEFINITION: ${title}
--ROLLBACK: ${rollback ? 'TRUE' : 'FALSE'}
--DATABASE: "${database}" on host "${host}"\n\n`
}

module.exports = class Migrations{
    constructor(config) {
        this.config = {
            root: null,
            connection: null,
            toSql: false,
            toSqlPath: null,
            recrusive: false,
            logToConsole: false,
        }
        this.connections = {}
        this.directories = []
        this.files = []
        this.migrations = []

        this.up = []
        this.down = []

        //Setting migrations config
        this.config.connection = config.default
        this.connections = config.connections
        if (!(this.config.connection in this.connections))
            throw new Error(`Default connection '${this.config.connection}' is not found in connections.`)
        else
            this.connections.default = this.connections[this.config.connection]

        if (config.root) { 
            this.fromDirectories(config.root)
            this.config.root = root
        }
        if (config.recrusive) this.recrusive(config.recrusive)
        
        
        if (config.autoLoad) this.loadMigrations()
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
                            uri,
                            run: false
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
                    uri,
                    run: false
                })
            }
        })
        this.migrations.sort((a, b) => {  return a.file.localeCompare(b.file) })
        return this
    }

    /**
     * Method that migrates one migration/file completly
     * @param {Object} migration migration registered object with name and uri { name: 'migration', uri: 'c:\migration.js' }
     * @param {Boolean} rollback should migration be rolledback
     * @returns 
     */
    async migrate(migration, rollback = false) {
        if (!migration.run)
            throw new Error(`Migration ${migration.file} has already been ran`)
        console.log(`Migrating ${migration.file}`)
        let start_time = process.hrtime()

        let { name, description, up, down } = require(migration.uri)

        if (!(up instanceof Function) || !(down instanceof Function)) 
            throw new Error(`Migration "${file}" must export functions for "up" and "down" migrations`)
        
        let schema = new Schema(name ? name : migration.file, migration.uri)
            schema.connections(this.connections)
            schema.rollback = rollback

        if (!rollback)  up(schema)
        else            down(schema)

        return await new Promise(async (resolve, reject) => {
            this.runDefinitions(schema, [...schema.definitions])
                .then(success => {
                    let total_time = process.hrtime(start_time)
                    migration.run = true
                    console.log(`Migration ${migration.file} run successfully in ${total_time}ms`)
                    resolve(success)
                })
                .catch(error => { reject(error)})
        })
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


    async runDefinitions(schema, definitions, i = 0) {
        let definition = definitions.shift()
        i++
        return await new Promise((resolve, reject) => {
            if (!definition.title) definition.title = `schema_definition_${i}`
            if (this.config.toSql) {
                let definitionQueryString = migrationSQLQueryHead(
                    schema.name,
                    schema.path,
                    definition.title,
                    schema.rollback,
                    definition.connection.database,
                    definition.connection.host
                )
                if (this.config.logToConsole)
                    console.log(`Dumping schema definition "${definition.title}" with action "${definition.action}" to .sql file.`)
                fs.writeFileSync(
                    path.join(this.config.toSqlPath, `${path.basename(schema.path).replace('.js','_')}${definition.title}.sql`),
                    definitionQueryString + definition.query()
                )
                if (definitions.length == 0) resolve(true)
                else this.runDefinitions(schema, definitions, i).then(resolve).catch(reject)
            } else {
                if (this.config.logToConsole)
                    console.log(`Running schema definition "${definition.title}" with action "${definition.action}"`)
                definition.run().then(result => {
                    if (definitions.length == 0) resolve(result)
                    else this.runDefinitions(schema, definitions, i).then(resolve).catch(reject)
                }).catch(error => {
                    reject(error)
                })               
            }
        })
    }
}