import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  QueryEntity,
  CustomerEntity,
  LLMModelEntity,
  DatabaseConnectionEntity,
} from './infrastructure/database/schema';
import { CoreService } from './application/core.service';
import { CoreController } from './api/controller';
import { CustomerRepository } from './infrastructure/repositories/customer.repository';
import { LlmProviderModule } from 'src/llm-provider/llm-provider.module';
import { DatabaseConnectionRepository } from './infrastructure/repositories/databaseConnection.repository';
import { LLMModelRepository } from './infrastructure/repositories/llmModel.repository';
import { QueryRepository } from './infrastructure/repositories/query.repository';
import { GenerateQueryUseCase } from './application/use-cases/generate-query.usecase';

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
      synchronize: true,
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
    CoreService,
    GenerateQueryUseCase,
    CustomerRepository,
    DatabaseConnectionRepository,
    LLMModelRepository,
    QueryRepository,
  ],
  exports: [CoreService],
})
export class CoreModule {}
