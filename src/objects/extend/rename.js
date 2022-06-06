module.exports = (superclass) => class Rename extends superclass {
    /**RENAMING */

    /**
     * Renaming columns
     * @param {String} old Old column name
     * @param {String} new New column name
     */ 
     renameColumn(oldName, newName) {
        this.rename.push({
            type:'column',
            oldName,
            newName
        })
    }

    /**
     * Rename constraint
     * @param {String} oldName Old constraint name
     * @param {String} newName New constraint name
     */
    renameConstraint(oldName, newName) {
        this.rename.push({
            type:'constraint',
            oldName,
            newName
        })
    }

    /**
     * Rename index
     * @param {String} oldName Old index name
     * @param {String} newName New index name
     */
    renameIndex(oldName, newName) { 
        this.renameConstraint(oldName, newName) 
    }
}
