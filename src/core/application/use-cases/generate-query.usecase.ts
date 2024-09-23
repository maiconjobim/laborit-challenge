import { Injectable } from '@nestjs/common';
import { LLMProviderService } from '../../../llm-provider/llm-proviser.service';
import { CustomerRepository } from '../../infrastructure/repositories/customer.repository';
import { DatabaseConnectionRepository } from '../../infrastructure/repositories/databaseConnection.repository';
import { LLMModelRepository } from '../../infrastructure/repositories/llmModel.repository';
import { QueryRepository } from '../../infrastructure/repositories/query.repository';
import { Query } from '../../domain/entities/query.entity';

@Injectable()
export class GenerateQueryUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly databaseConnectionRepository: DatabaseConnectionRepository,
    private readonly llmModelRepository: LLMModelRepository,
    private readonly queryRepository: QueryRepository,
    private readonly llmProviderService: LLMProviderService,
  ) {}

  async execute(question: string, customerId: number): Promise<string> {
    // TODO: add validator

    const customer = await this.customerRepository.findCustomerById(customerId);

    if (!customer) {
      throw new Error('Customer not found');
    }

    const databaseConnection =
      await this.databaseConnectionRepository.findByCustomerId(customerId);

    if (!databaseConnection) {
      throw new Error('Database connection not found');
    }

    const llmModelActivated = await this.llmModelRepository.findActiveModel();

    if (!llmModelActivated) {
      throw new Error('LLM Provider not activated');
    }

    const llmProvider = await this.llmProviderService.getLLMProvider(
      llmModelActivated.modelName,
    );

    llmProvider.addDatabaseInfo(databaseConnection.databaseInfo);

    const queryResult = await llmProvider.generateQuery(question);

    if (!queryResult.success) {
      throw new Error(`Error generating query : ${queryResult.error}`);
    }

    const queryEntity = new Query(
      customer,
      question,
      queryResult.query,
      new Date(),
    );

    await this.queryRepository.createQuery(queryEntity);

    return queryResult.query;
  }
}
