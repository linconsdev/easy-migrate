const Migrations = require('../src/migrations')



Migrations
    .toSQL(require('path').join(__dirname, '..','sql'))
    //.fromDirectories(require('path').join(__dirname, '..', 'test','migrations'))
    .fromFiles(
        require('path').join(__dirname, '..', 'test','migrations', 'module_one_migrations','00112225_some_migration.js'),
        require('path').join(__dirname, '..', 'test','migrations', '123456789_create_test_tables.js'),
    )
    .recrusive(false)
    .loadMigrations()
    .migrate(Migrations.migrations[0])
    //.migrate(Migrations.migrations[1])



    //console.log(Migrations)



