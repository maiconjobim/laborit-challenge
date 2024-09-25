import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  CustomerEntity,
  DatabaseConnectionEntity,
  LLMModelEntity,
  QueryEntity,
} from './src/core/infrastructure/database/schema';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: false,
  logging: false,
  entities: [
    CustomerEntity,
    QueryEntity,
    LLMModelEntity,
    DatabaseConnectionEntity,
  ],
  migrations: ['src/core/infrastructure/database/migrations/*.ts'],
});
