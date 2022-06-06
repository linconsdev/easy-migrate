module.exports = (superclass) => class Drop extends superclass  {
    /**DROPING COLUMNS*/

    dropColumn(name) {
        this.drop.push({
            type: 'column',
            value: name
        })
    }

    dropRememberToken() {
        this.drop.push({
            type: 'column',
            value: 'remember_token'
        })
    }

    dropSoftDeletes() {
        this.drop.push({
            type: 'column',
            value: 'is_deleted'
        })
    }

    dropSoftDeletesTz() {
        this.drop.push({
            type: 'column',
            value: 'is_deleted_tz'
        })
    }

    dropTimestamps() {
        this.drop.push({
            type: 'column',
            value: 'created_at'
        })
        this.drop.push({
            type: 'column',
            value: 'updated_at'
        })
    }

    dropTimestampsTz() {
        this.drop.push({
            type: 'column',
            value: 'created_at_tz'
        })
        this.drop.push({
            type: 'column',
            value: 'updated_at_tz'
        })
    }

    /**drop CONSTRAINTS */

    dropConstraint(name) {
        this.drop.push({
            type: 'constraint',
            constraint: null,
            value:name
        })
    }


    dropIndex(name) {
        this.drop.push({
            type: 'constraint',
            constraint: 'index',
            value: name
        })
    }

    dropPrimary(name) {
        this.drop.push({
            type: 'constraint',
            constraint: 'primary-key',
            value: name
        })
    }

    dropUnique(name) {
        this.drop.push({
            type: 'constraint',
            constraint: 'unique-key',
            value: name
        })
    }

    dropForeign(name) {
        this.drop.push({
            type: 'constraint',
            constraint: 'foreign-key',
            value: name
        })
    }

    dropUnique(name) {
        this.drop.push({
            type: 'constraint',
            constraint: 'unique-key',
            value: name
        })
    }

    dropFullTexst(name) {
        this.drop.push({
            type: 'constraint',
            constraint: 'full-text',
            value: name
        })
    }

    dropSpatialIndex(name) {
        this.drop.push({
            type: 'constraint',
            constraint: 'spatial-index',
            value: name
        })
    }
}