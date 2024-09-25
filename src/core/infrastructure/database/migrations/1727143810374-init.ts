import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1727143810374 implements MigrationInterface {
    name = 'Init1727143810374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "query" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" varchar NOT NULL, "generatedSql" varchar NOT NULL, "queryDate" datetime NOT NULL, "modelName" varchar, "result" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "customerId" integer)`);
        await queryRunner.query(`CREATE TABLE "llm_model" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "modelName" varchar NOT NULL, "apiEndpoint" varchar, "apiKey" varchar, "isActive" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "database_connection" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "host" varchar NOT NULL, "port" integer NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "databaseName" varchar NOT NULL, "databaseInfo" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "customerId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_query" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" varchar NOT NULL, "generatedSql" varchar NOT NULL, "queryDate" datetime NOT NULL, "modelName" varchar, "result" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "customerId" integer, CONSTRAINT "FK_aa33bb42c3acf0d63e2e9446f22" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_query"("id", "question", "generatedSql", "queryDate", "modelName", "result", "createdAt", "updatedAt", "customerId") SELECT "id", "question", "generatedSql", "queryDate", "modelName", "result", "createdAt", "updatedAt", "customerId" FROM "query"`);
        await queryRunner.query(`DROP TABLE "query"`);
        await queryRunner.query(`ALTER TABLE "temporary_query" RENAME TO "query"`);
        await queryRunner.query(`CREATE TABLE "temporary_database_connection" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "host" varchar NOT NULL, "port" integer NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "databaseName" varchar NOT NULL, "databaseInfo" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "customerId" integer, CONSTRAINT "FK_65e59d455b079272b5da227f863" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_database_connection"("id", "host", "port", "username", "password", "databaseName", "databaseInfo", "createdAt", "updatedAt", "customerId") SELECT "id", "host", "port", "username", "password", "databaseName", "databaseInfo", "createdAt", "updatedAt", "customerId" FROM "database_connection"`);
        await queryRunner.query(`DROP TABLE "database_connection"`);
        await queryRunner.query(`ALTER TABLE "temporary_database_connection" RENAME TO "database_connection"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "database_connection" RENAME TO "temporary_database_connection"`);
        await queryRunner.query(`CREATE TABLE "database_connection" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "host" varchar NOT NULL, "port" integer NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "databaseName" varchar NOT NULL, "databaseInfo" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "customerId" integer)`);
        await queryRunner.query(`INSERT INTO "database_connection"("id", "host", "port", "username", "password", "databaseName", "databaseInfo", "createdAt", "updatedAt", "customerId") SELECT "id", "host", "port", "username", "password", "databaseName", "databaseInfo", "createdAt", "updatedAt", "customerId" FROM "temporary_database_connection"`);
        await queryRunner.query(`DROP TABLE "temporary_database_connection"`);
        await queryRunner.query(`ALTER TABLE "query" RENAME TO "temporary_query"`);
        await queryRunner.query(`CREATE TABLE "query" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" varchar NOT NULL, "generatedSql" varchar NOT NULL, "queryDate" datetime NOT NULL, "modelName" varchar, "result" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "customerId" integer)`);
        await queryRunner.query(`INSERT INTO "query"("id", "question", "generatedSql", "queryDate", "modelName", "result", "createdAt", "updatedAt", "customerId") SELECT "id", "question", "generatedSql", "queryDate", "modelName", "result", "createdAt", "updatedAt", "customerId" FROM "temporary_query"`);
        await queryRunner.query(`DROP TABLE "temporary_query"`);
        await queryRunner.query(`DROP TABLE "database_connection"`);
        await queryRunner.query(`DROP TABLE "llm_model"`);
        await queryRunner.query(`DROP TABLE "query"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
