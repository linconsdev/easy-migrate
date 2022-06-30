const postgres = {
    bigint: {
        alias: 'int8',
        description: 'signed eight-byte integer',
        definition: null
    },
    bigserial: {
        alias: 'serial8',
        description: 'autoincrementing eight-byte integer',
        definition: null
    },
    bit: {
        alias: null,
        description: 'fixed-length bit string',
        definition: { size: Number }
    },
    varbit: {
        alias: 'bit varying',
        description: 'variable-length bit string',
        definition: { size: Number }
    },
    boolean: {
        alias: 'bool',
        description: 'logical Boolean (true/false)',
        definition: null
    },
    box: {
        alias: null,
        description: 'rectangular box in the plane',
        definition: null
    },
    bytea: {
        alias: null,
        description: 'binary data (“byte array”)',
        definition: null
    },
    char: {
        alias: 'character',
        description: 'fixed-length character string',
        definition: { size: Number }
    },
    varchar: {
        alias: 'character varying',
        description: 'variable-length character string',
        definition: { size: Number }
    },
    circle: {
        alias: null,
        description: 'circle on a plane',
        definition: null
    },
    date: {
        alias: null,
        description: 'calendar date (year, month, day)',
        definition: null
    },
    float8: {
        alias: 'double precision',
        description: 'double precision floating-point number (8 bytes)',
        definition: null
    },
    inet: {
        alias: null,
        description: 'IPv4 or IPv6 host address',
        definition: null
    },
    integer: {
        alias: 'int',
        description: 'signed four-byte integer',
        definition: null
    },
    interval: {
        alias: null,
        description: 'time span',
        definition: { fields: Array, p: String }
    },
    json: {
        alias: null,
        description: 'textual JSON data',
        definition: null
    },
    jsonb: {
        alias: null,
        description: 'binary JSON data, decomposed',
        definition: null
    },
    line: {
        alias: null,
        description: 'infinite line on a plane',
        definition: null
    },
    lseg: {
        alias: null,
        description: 'line segment on a plane',
        definition: null
    },
    macaddr: {
        alias: null,
        description: 'MAC (Media Access Control) address',
        definition: null
    },
    macaddr8: {
        alias: null,
        description: 'MAC (Media Access Control) address (EUI-64 format)',
        definition: null
    },
    money: {
        alias: null,
        description: 'currency amount',
        definition: null
    },
    numeric: {
        alias: 'decimal',
        description: 'exact numeric of selectable precision',
        definition: { precision: Number, size: Number }
    },
    path: {
        alias: null,
        description: 'geometric path on a plane',
        definition: null
    },
    pg_lsn: {
        alias: null,
        description: 'PostgreSQL Log Sequence Number',
        definition: null
    },
    pg_snapshot: {
        alias: null,
        description: 'user-level transaction ID snapshot',
        definition: null
    },
    point: {
        alias: null,
        description: 'geometric point on a plane',
        definition: null
    },
    polygon: {
        alias: null,
        description: 'closed geometric path on a plane',
        definition: null
    },
    real: {
        alias: 'float4',
        description: 'single precision floating-point number (4 bytes)',
        definition: null
    },
    smallint: {
        alias: 'int2',
        description: 'signed two-byte integer',
        definition: null
    },
    smallserial: {
        alias: 'serial2',
        description: 'autoincrementing two-byte integer',
        definition: null
    },
    serial: {
        alias: 'serial4',
        description: 'autoincrementing four-byte integer',
        definition: null,
    },
    text: {
        alias: null,
        description: 'variable-length character string',
        definition: null,
    },
    time: {
        alias: null,
        description: 'time of day (no time zone)',
        definition: { precision: Number }
    },
    timetz: {
        alias: null,
        description: 'time of day, including time zone',
        definition: { precision: Number },
    },
    timestamp: {
        alias: null,
        description: 'date and time (no time zone)',
        definition: {precision: Number }
    },
    timestamptz: {
        alias: null,
        description: 'date and time, including time zone',
        definition: {precision: Number }
    },
    tsquery: {
        alias: null,
        description: 'text search query',
        definition: null
    },
    tsvector: {
        alias: null,
        description: 'text search document',
        definition: null
    },
    txid_snapshot:  {
        alias: null,
        description: 'user-level transaction ID snapshot (deprecated; see pg_snapshot)',
        definition: null
    },
    uuid: {
        alias: null,
        description: 'universally unique identifier',
        definition: null,
    },
    xml: {
        alias: null,
        description: 'XML data',
        definition: null
    }
}

Object.keys(postgres).forEach(key => {
    postgres[key].type = key
})


module.exports = {
    'bigIncrements': postgres.bigserial,
    'bigInteger': postgres.bigint,
    'binary': postgres.bit,
    'boolean': postgres.boolean,
    'char': postgres.char,
    'dateTimeTz': postgres.timestamptz,
    'dateTime': postgres.timestamp,
    'date': postgres.date,
    'decimal': postgres.decimal,
    'double': postgres.float8,
    'enum': null,
    'float': postgres.float8,
    'foreignId': null,
    'foreignIdFor': null,
    'foreignUuid': null,
    'geometryCollection': null,
    'geometry': null,
    'id': postgres.bigserial,
    'increments': postgres.serial,
    'integer': postgres.integer,
    'ipAddress': postgres.inet,
    'json': postgres.json,
    'jsonb': postgres.jsonb,
    'lineString': postgres.varchar,
    'longText': postgres.text,
    'macAddress': postgres.macaddr,
    'mediumIncrements': postgres.serial,
    'mediumInteger': postgres.integer,
    'mediumText': postgres.text,
    'morphs': null,
    'multiLineString': postgres.text,
    'multiPoint': null,
    'multiPolygon': null,
    'nullableMorphs': null,
    'nullableTimestamps': null,
    'nullableUuidMorphs': null,
    'point': postgres.point,
    'polygon': postgres.polygon,
    'rememberToken': postgres.varchar,
    'set': null,
    'smallIncrements': postgres.smallserial,
    'smallInteger': postgres.smallint,
    'softDeletesTz': postgres.timestamptz,
    'softDeletes': postgres.timestamp,
    'string': postgres.varchar,
    'text': postgres.text,
    'timeTz': postgres.timetz,
    'time': postgres.timetz,
    'timestampTz': postgres.timestamptz,
    'timestamp': postgres.timestamp,
    'tinyIncrements': postgres.smallserial,
    'tinyInteger': postgres.smallint,
    'tinyText': postgres.text,
    'unsignedBigInteger': null,
    'unsignedDecimal': null,
    'unsignedInteger': null,
    'unsignedMediumInteger': null,
    'unsignedSmallInteger': null,
    'unsignedTinyInteger': null,
    'uuidMorphs': null,
    'uuid': postgres.uuid,
    'year': null,
    'xml': postgres.xml,
}
