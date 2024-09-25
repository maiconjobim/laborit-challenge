import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSchema1727148430056 implements MigrationInterface {
    name = 'AddSchema1727148430056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_database_connection" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "host" varchar NOT NULL, "port" integer NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "databaseName" varchar NOT NULL, "databaseInfo" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "customerId" integer, "schema" varchar NOT NULL DEFAULT ('public'), CONSTRAINT "FK_65e59d455b079272b5da227f863" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_database_connection"("id", "host", "port", "username", "password", "databaseName", "databaseInfo", "createdAt", "updatedAt", "customerId") SELECT "id", "host", "port", "username", "password", "databaseName", "databaseInfo", "createdAt", "updatedAt", "customerId" FROM "database_connection"`);
        await queryRunner.query(`DROP TABLE "database_connection"`);
        await queryRunner.query(`ALTER TABLE "temporary_database_connection" RENAME TO "database_connection"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "database_connection" RENAME TO "temporary_database_connection"`);
        await queryRunner.query(`CREATE TABLE "database_connection" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "host" varchar NOT NULL, "port" integer NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "databaseName" varchar NOT NULL, "databaseInfo" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "customerId" integer, CONSTRAINT "FK_65e59d455b079272b5da227f863" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "database_connection"("id", "host", "port", "username", "password", "databaseName", "databaseInfo", "createdAt", "updatedAt", "customerId") SELECT "id", "host", "port", "username", "password", "databaseName", "databaseInfo", "createdAt", "updatedAt", "customerId" FROM "temporary_database_connection"`);
        await queryRunner.query(`DROP TABLE "temporary_database_connection"`);
    }

}
