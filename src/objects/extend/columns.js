const Column = require('../column')

module.exports = (superclass) => class Columns extends superclass {
    bigIncrements(columnName) {
        this.columns[columnName] = new Column(columnName, 'bigIncrements').unsigned().autoIncrement()
        return this.columns[columnName]
    }

    bigInteger(columnName) {
        this.columns[columnName] = new Column(columnName, 'bigInteger')
        return this.columns[columnName]
    }

    binary(columnName) {
        this.columns[columnName] = new Column(columnName, 'binary')
        return this.columns[columnName]
    }

    boolean(columnName) {
        this.columns[columnName] = new Column(columnName, 'boolean')
        return this.columns[columnName]
    }

    bool(columnName) {
        return this.boolean(columnName)
    }

    char(columnName, size) {
        this.columns[columnName] = new Column(columnName, 'char').size(size)
        return this.columns[columnName]
    }

    varchar(columnName, size = 1000) {
        return this.string(columnName, size)
    }

    string(columnName, size = 1000) {
        this.columns[columnName] = new Column(columnName, 'string').size(size)
        return this.columns[columnName]
    }

    lineString(columnName, size = 1000) {
        this.columns[columnName] = new Column(columnName, 'lineString').size(size)
        return this.columns[columnName]
    }

    dateTimeTz(columnName, precision = 0) {
        this.columns[columnName] = new Column(columnName, 'dateTimeTz').precision(precision)
        return this.columns[columnName]
    }

    dateTime(columnName, precision = 0) {
        this.columns[columnName] = new Column(columnName, 'dateTime').precision(precision)
        return this.columns[columnName]
    }

    date(columnName) {
        this.columns[columnName] = new Column(columnName, 'date')
        return this.columns[columnName]
    }

    decimal(columnName, precision = 8, scale = 2) {
        this.columns[columnName] = new Column(columnName, 'decimal').precision(precision).scale(scale)
        return this.columns[columnName]
    }

    double(columnName, precision = 8, scale = 2) {
        this.columns[columnName] = new Column(columnName, 'double').precision(precision).scale(scale)
        return this.columns[columnName]
    }

    float(columnName, precision = 8, scale = 2) {
        this.columns[columnName] = new Column(columnName, 'float').precision(precision).scale(scale)
        return this.columns[columnName]
    }

    enum(columnName, values = []) {
        this.columns[columnName] = new Column(columnName, 'enum').value(values)
        return this.columns[columnName]
    }

    id(columnName = 'id') {
        this.columns['id'] = new Column(columnName, 'id').unsigned().autoIncrement().primary()
        return this.columns['id']
    }

    increments(columnName) {
        this.columns[columnName] = new Column(columnName, 'increments').unsigned().autoIncrement()
        return this.columns[columnName]
    }

    integer(columnName) {
        this.columns[columnName] = new Column(columnName, 'integer')
        return this.columns[columnName]
    }

    ipAddress(columnName) {
        this.columns[columnName] = new Column(columnName, 'ipAddress').size(48)
        return this.columns[columnName]
    }

    json(columnName) {
        this.columns[columnName] = new Column(columnName, 'json')
        return this.columns[columnName]
    }

    jsonb(columnName) {
        this.columns[columnName] = new Column(columnName, 'jsonb')
        return this.columns[columnName]
    }

    time(columnName, precision = 0) {
        this.columns[columnName] = new Column(columnName, 'time').precision(precision)
        return this.columns[columnName]
    }

    timestamp(columnName, precision = 0) {
        this.columns[columnName] = new Column(columnName, 'timestamp').precision(precision)
        return this.columns[columnName]
    }

    timestampTz(columnName, precision = 0) {
        this.columns[columnName] = new Column(columnName, 'timestampTz').precision(precision)
        return this.columns[columnName]
    }

    timestamps(precision = 0) {
        this.columns['created_at'] = new Column('created_at', 'timestamp').precision(precision).default('CURRENT_TIMESTAMP', true)
        this.columns['updated_at'] = new Column('updated_at', 'timestamp').precision(precision).default('CURRENT_TIMESTAMP', true)
    }

    timestampsTz(precision = 0) {
        this.columns['created_at'] = new Column('created_at', 'timestampTz').precision(precision).default('CURRENT_TIMESTAMP', true)
        this.columns['updated_at'] = new Column('updated_at', 'timestampTz').precision(precision).default('CURRENT_TIMESTAMP', true)
    }

    users() {
        this.columns['created_by'] = new Column('created_by', 'integer').nullable()
        this.columns['updated_by'] = new Column('updated_by', 'integer').nullable()
    }

    year(columnName) {
        this.columns[columnName] = new Column(columnName, 'year')
        return this.columns[columnName]
    }
}



/**

 */