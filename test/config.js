module.exports = {
    default: 'postgre',
    table: 'tDBO_MigrationsTable',
    connections: {
        conn: {
            driver: 'sqlsrv',
            host: '127.0.0.1',
            port: 1,
            username: '',
            password: ''
        },
        mysql: {
            driver: 'mysql',
            host: '',
            port: 1,
            username: '',
            password: ''
        },
        postgre: {
            driver: 'postgre',
            host: '127.0.0.1',
            port: 5432,
            database: 'root',
            user: 'postgres',
            password: 'password'
        },
        posdbo2: {
            driver: 'postgre',
            host: '',
            port: 1,
            username: '',
            password: ''
        }
    }
}