import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed21727262474740 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        UPDATE database_connection
        SET schema = 'northwind'
        WHERE id = 1;
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
