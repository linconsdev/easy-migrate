const { Client } = require('pg')


module.exports = class ConnectionPostGre {
    constructor(config) {
        this.config = config
        console.log(config)
        if (!this.config.host)      throw new Error(`Connection configuration "host" parameter missing for postgre driver`)
        if (!this.config.database)  throw new Error(`Connection configuration "database" parameter missing for postgre driver`)
        if (!this.config.port)      throw new Error(`Connection configuration "port" parameter missing for postgre driver`)
        if (!this.config.user)      throw new Error(`Connection configuration "user" parameter missing for postgre driver`)
        if (!this.config.password)  throw new Error(`Connection configuration "password" parameter missing for postgre driver`)

        this.client = new Client(this.config)
    }

    async query(query) {
        return await new Promise((resolve, reject) => {
            this.client.connect().then(connected => {
                this.client.query(query).then(results => {
                    resolve(results)
                }).catch(error => { 
                    reject(error) 
                })
            }).catch(error => { 
                throw error 
            })
        })
    }
}