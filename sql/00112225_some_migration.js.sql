--MIGRATION: 00112225_some_migration.js
--FILE: D:\NEST.JS\sql-migrations\test\migrations\module_one_migrations\00112225_some_migration.js
--ROLLBACK: FALSE

CREATE TABLE somenewtable_to_create (
	id  INTEGER  NOT NULL,
	mase  BOOLEAN  DEFAULT 'true',
	created_at  TIMESTAMP  DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	updated_at  TIMESTAMP  DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	mase2  BOOLEAN  NOT NULL
);

















