import { Injectable, BadRequestException } from '@nestjs/common';
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
      throw new BadRequestException('Customer not found');
    }

    const databaseConnection =
      await this.databaseConnectionRepository.findByCustomerId(customerId);

    if (!databaseConnection) {
      throw new BadRequestException('Database connection not found');
    }

    if (!databaseConnection.databaseInfo) {
      throw new BadRequestException(
        'Database info not found, please generate database info first',
      );
    }

    const llmModelActivated = await this.llmModelRepository.findActiveModel();

    if (!llmModelActivated) {
      throw new BadRequestException('LLM Provider not activated');
    }

    const llmProvider = await this.llmProviderService.getLLMProvider(
      llmModelActivated.modelName,
    );

    llmProvider.addDatabaseInfo(databaseConnection.databaseInfo);

    const queryResult = await llmProvider.generateQuery(question);

    if (!queryResult.success) {
      throw new BadRequestException(
        `Error generating query : ${queryResult.error}`,
      );
    }

    const queryEntity = new Query(
      customer,
      question,
      queryResult.query,
      new Date(),
      llmModelActivated.modelName,
    );

    await this.queryRepository.createQuery(queryEntity);

    return queryResult.query;
  }
}
