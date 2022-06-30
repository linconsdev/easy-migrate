const { Client } = require('pg')


module.exports = class ConnectionPostGre {
    constructor(config) {
        this.config = config
        if (!this.config.host)      throw new Error(`Connection configuration "host" parameter missing for postgre driver`)
        if (!this.config.database)  throw new Error(`Connection configuration "database" parameter missing for postgre driver`)
        if (!this.config.port)      throw new Error(`Connection configuration "port" parameter missing for postgre driver`)
        if (!this.config.user)      throw new Error(`Connection configuration "user" parameter missing for postgre driver`)
        if (!this.config.password)  throw new Error(`Connection configuration "password" parameter missing for postgre driver`)

        this.client = new Client(this.config)
        this.connected = false
    }

    async query(query) {
        return await new Promise((resolve, reject) => {
            this.client.connect().then(connected => {
                this.client.query(query).then(results => {
                    resolve(results)
                }).catch(reject)
                .finally(() => {
                    this.client.end()
                })
            }).catch(reject)
        })
    }

    async connect() {
        return await new Promise((resolve, reject) => {
            if (this.connected) resolve()
            else
                this.client.connect().then(connected => {
                    this.connected = true
                    resolve()
                }).catch(reject)
        })
    }

    async disconnect() {
        return await new Promise((resolve, reject) => {
            if (!this.connected) resolve()
            else
                this.client.end().then(disconnected => {
                    this.connected = false
                    resolve()
                }).catch(reject)
        })
    }

    async migrations(table) {
        table = table.toLowerCase()
        return await new Promise((resolve, reject) => {
            this.connect().then(() => {
                this.client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = '${table}');`)
                .then(results => {
                    if (results.rows[0].exists) {
                        console.log("just select")
                        this.client.query(`SELECT * FROM ${table};`).then(migrations => {
                            resolve(migrations.rows)
                        }).catch(reject)
                    } else {
                        this.client.query(`CREATE TABLE ${table} (
                            migration_id SERIAL PRIMARY KEY,
                            migration_file varchar(100),
                            migration_name varchar(100),
                            migration_description varchar(2000),
                            migration_batch_number integer default 1,
                            migration_ran_at timestamp default CURRENT_TIMESTAMP
                        );`).then(created => {
                            console.log("created and selected")
                            this.client.query(`SELECT * FROM ${table};`).then(migrations => {
                                    resolve(migrations.rows)
                            }).catch(reject)
                        })
                    }      
                }).catch(error => { 
                    reject(error) 
                })
            }).catch(error => { 
                reject(error)
            })
        })
    }

    async migrate(table, file, name, description, batch, rollback = false) {
        table = table.toLowerCase()
        return await new Promise((resolve, reject) => {
            this.connect().then(() => {
                let query = ``
                let values = []
                if (rollback) {
                    query = `DELETE FROM ${table}  WHERE migration_path = $1 and migration_batch_number $2`
                    values = [ file, batch ]
                } else {
                    query = `INSERT INTO ${table} (migration_file, migration_name, migration_description, migration_batch_number) VALUES ($1, $2, $3, $4)`
                    values = [ file, name, description, batch ]
                }
                this.client.query(query, values)
                .then(results => {
                    resolve(results)
                }).catch(reject)
            }).catch(reject)
        })
    }
}


