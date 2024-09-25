import { EntitySchema } from 'typeorm';
import { Customer } from '../../domain/entities/customer.entity';
import { DatabaseConnection } from '../../domain/entities/databaseConection.entity';
import { LLMModel } from '../../domain/entities/llmModel.entity';
import { Query } from '../../domain/entities/query.entity';

export const QueryEntity = new EntitySchema<Query>({
  name: 'query',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    question: {
      type: String,
    },
    generatedSql: {
      type: String,
    },
    queryDate: {
      type: Date,
    },
    modelName: {
      type: String,
      nullable: true,
    },
    result: {
      type: 'simple-json',
      nullable: true,
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true,
    },
  },
  relations: {
    customer: {
      type: 'many-to-one',
      target: 'customer',
      inverseSide: 'queries',
    },
  },
});

export const CustomerEntity = new EntitySchema<Customer>({
  name: 'customer',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: true,
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true,
    },
  },
  relations: {
    connections: {
      type: 'one-to-many',
      target: 'database_connection',
    },
    queries: {
      type: 'one-to-many',
      target: 'query',
    },
  },
});

export const LLMModelEntity = new EntitySchema<LLMModel>({
  name: 'llm_model',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    modelName: {
      type: String,
    },
    apiEndpoint: {
      type: String,
      nullable: true,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    apiKey: {
      type: String,
      nullable: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true,
    },
  },
});

export const DatabaseConnectionEntity = new EntitySchema<DatabaseConnection>({
  name: 'database_connection',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    host: {
      type: String,
    },
    port: {
      type: Number,
    },
    username: {
      type: String,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    password: {
      type: String,
    },
    databaseName: {
      type: String,
    },
    schema: {
      type: String,
      default: 'public',
    },
    databaseInfo: {
      type: String,
      nullable: true,
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true,
    },
  },
  relations: {
    customer: {
      type: 'many-to-one',
      target: 'customer',
    },
  },
});
