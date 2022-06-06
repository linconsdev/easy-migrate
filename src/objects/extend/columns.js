const Column = require('../column')

module.exports = (superclass) => class Columns extends superclass {
    bigIncrements(columnName) {
        this.columns[columnName] = new Column(columnName, 'integer').unsigned().autoIncrement()
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

    char(columnName, size) {
        this.columns[columnName] = new Column(columnName, 'char').size(size)
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

    enum(columnName, values = []) {
        this.columns[columnName] = new Column(columnName, 'enum').value(values)
        return this.columns[columnName]
    }

    float(columnName, precision = 8, scale = 2) {
        this.columns[columnName] = new Column(columnName, 'float').precision(precision).scale(scale)
        return this.columns[columnName]
    }

    float(columnName, precision = 8, scale = 2) {
        this.columns[columnName] = new Column(columnName, 'float').precision(precision).scale(scale)
        return this.columns[columnName]
    }

    id() {
        this.columns['id'] = new Column('id', 'integer').unsigned().autoIncrement()
        return this.columns['id']
    }

    increments(columnName) {
        this.columns[columnName] = new Column(columnName, 'integer').unsigned().autoIncrement()
        return this.columns[columnName]
    }

    integer(columnName) {
        this.columns[columnName] = new Column(columnName, 'integer')
        return this.columns[columnName]
    }

    ipAddress(columnName) {
        this.columns[columnName] = new Column(columnName, 'varchar').size(48)
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

    string(columnName, size = 1000) {
        this.columns[columnName] = new Column(columnName, 'varchar').size(size)
        return this.columns[columnName]
    }

    time(columnName, precision = 0) {
        this.columns[columnName] = new Column(columnName, 'time').precision(precision)
        return this.columns[columnName]
    }

    timestamps(precision = 0) {
        this.columns['created_at'] = new Column('created_at', 'timestamp').precision(precision).default('CURRENT_TIMESTAMP')
        this.columns['updated_at'] = new Column('updated_at', 'timestamp').precision(precision).default('CURRENT_TIMESTAMP')
    }

    year(columnName) {
        this.columns[columnName] = new Column(columnName, 'year')
        return this.columns[columnName]
    }
}