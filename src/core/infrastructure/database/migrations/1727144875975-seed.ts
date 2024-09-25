import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1727144875975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Seed data for Customer
        await queryRunner.query(`
            INSERT INTO customer (name, createdAt, updatedAt)
            VALUES
            ('Laborit', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            ('Jane Smith', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
        `);
  
      await queryRunner.query(`
        INSERT INTO llm_model (modelName, apiEndpoint, apiKey, isActive, createdAt, updatedAt)
        VALUES
          ('GPT-4', 'https://api.gpt-4.com', 'gpt4apikey', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
          ('BERT', 'https://api.bert.com', 'bertapikey', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `);
  
      // Seed data for DatabaseConnection
      await queryRunner.query(`
        INSERT INTO database_connection (host, port, username, password, databaseName, databaseInfo, createdAt, updatedAt, customerId)
        VALUES
          ('database-1.c04ivxysluch.us-east-1.rds.amazonaws.com', 3306, 'user_read_only', 'laborit_teste_2789', 'northwind', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);
      `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM database_connection;`);
        await queryRunner.query(`DELETE FROM llm_model;`);
        await queryRunner.query(`DELETE FROM customer;`);
    }

}
