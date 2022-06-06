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
ALTER TABLE somenewtable_to_create ADD CONSTRAINT PrimaryKey PRIMARY KEY (id);
ALTER TABLE somenewtable_to_create ADD CONSTRAINT FKunqiue FOREIGN KEY (id) REFERENCES tabletest(someColumn);
CREATE INDEX cretedIndex ON somenewtable_to_create (id,mase);
ALTER TABLE somenewtable_to_create RENAME COLUMN some TO old;
ALTER TABLE somenewtable_to_create RENAME CONSTRAINT someindex TO somenewindexname;
ALTER TABLE somenewtable_to_create DROP COLUMN somecolumn ;
ALTER TABLE somenewtable_to_create DROP CONSTRAINT keyForeign;
ALTER TABLE somenewtable_to_create DROP CONSTRAINT keyunique;
ALTER TABLE somenewtable_to_create DROP CONSTRAINT keyPrimary;
ALTER TABLE somenewtable_to_create DROP CONSTRAINT defaultconst;
ALTER TABLE someTableToEdit ADD mase  VARCHAR (100);
ALTER TABLE someTableToEdit ALTER COLUMN code TYPE CHAR (10);
ALTER TABLE someTableToEdit ADD id  INTEGER  NOT NULL;
ALTER TABLE someTableToEdit ADD CONSTRAINT uniqueCodeANDID UNIQUE (code,id);
ALTER TABLE someTableToEdit DROP CONSTRAINT codeName;
ALTER TABLE tableaStara RENAME TO tabelaNova;
DROP TABLE tableaStara;
DROP TABLE IF EXISTS tableaStara