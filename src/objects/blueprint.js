const Column = require('./column')
const Constraint = require('./constraint')
const Table = require('./extend/table')

/**
 * Blueprint for table including it columns, indexes, constraints, renaming, and droping
 * @param {String} tableName name of the table 
 */
class Blueprint extends Table {
    constructor(tableName) {
        super()
        this.name = tableName
        this.connection = null
        this.columns = {}
        this.rename = []
        this.drop = []
        this.constraints = {}
    }

    toLog() {
        let toBeLoged = []
        Object.keys(this.columns).forEach(column => {
            toBeLoged.push({
                column,
                type: this.columns[column].type,
                definition: this.columns[column].definition,
                modifiers: this.columns[column].modifiers
            })
        })
        console.log(`Schema for table "${this.name}":`)
        console.table(toBeLoged)
    }

}


module.exports = Blueprint