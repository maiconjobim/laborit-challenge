import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  QueryEntity,
  CustomerEntity,
  LLMModelEntity,
  DatabaseConnectionEntity,
} from './infrastructure/database/schema';
import { CoreController } from './api/controller';
import { CustomerRepository } from './infrastructure/repositories/customer.repository';
import { LlmProviderModule } from 'src/llm-provider/llm-provider.module';
import { DatabaseConnectionRepository } from './infrastructure/repositories/databaseConnection.repository';
import { LLMModelRepository } from './infrastructure/repositories/llmModel.repository';
import { QueryRepository } from './infrastructure/repositories/query.repository';
import { GenerateQueryUseCase } from './application/use-cases/generate-query.usecase';
import { GenerateDatabaseInfoUseCase } from './application/use-cases/generate-database-info.usecase';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [
        QueryEntity,
        CustomerEntity,
        LLMModelEntity,
        DatabaseConnectionEntity,
      ],
      logger: 'debug',
      migrations: ['dist/src/core/infrastructure/database/migrations/*.js'],
      migrationsRun: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      QueryEntity,
      CustomerEntity,
      LLMModelEntity,
      DatabaseConnectionEntity,
    ]),
    LlmProviderModule,
  ],
  controllers: [CoreController],
  providers: [
    GenerateQueryUseCase,
    GenerateDatabaseInfoUseCase,
    CustomerRepository,
    DatabaseConnectionRepository,
    LLMModelRepository,
    QueryRepository,
  ],
  exports: [],
})
export class CoreModule {}
