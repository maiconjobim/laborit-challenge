import { Test, TestingModule } from '@nestjs/testing';
import { GenerateQueryUseCase } from './generate-query.usecase';
import { Customer } from '../../domain/entities/customer.entity';
import { DatabaseConnection } from '../../domain/entities/databaseConection.entity';
import { LLMModel } from '../../domain/entities/llmModel.entity';
import { DatabaseConnectionRepository } from '../../infrastructure/repositories/databaseConnection.repository';
import { LLMProviderService } from '../../../llm-provider/llm-proviser.service';
import { CustomerRepository } from '../../infrastructure/repositories/customer.repository';
import { LLMModelRepository } from '../../infrastructure/repositories/llmModel.repository';
import { QueryRepository } from '../../infrastructure/repositories/query.repository';

describe('GenerateQueryUseCase', () => {
  let generateQueryUseCase: GenerateQueryUseCase;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let databaseConnectionRepository: jest.Mocked<DatabaseConnectionRepository>;
  let llmModelRepository: jest.Mocked<LLMModelRepository>;
  let llmProviderService: jest.Mocked<LLMProviderService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateQueryUseCase,
        {
          provide: CustomerRepository,
          useValue: {
            findCustomerById: jest.fn(),
          },
        },
        {
          provide: DatabaseConnectionRepository,
          useValue: {
            findByCustomerId: jest.fn(),
          },
        },
        {
          provide: LLMModelRepository,
          useValue: {
            findActiveModel: jest.fn(),
          },
        },
        {
          provide: QueryRepository,
          useValue: {
            createQuery: jest.fn(),
          },
        },
        {
          provide: LLMProviderService,
          useValue: {
            getLLMProvider: jest.fn(),
          },
        },
      ],
    }).compile();

    generateQueryUseCase =
      module.get<GenerateQueryUseCase>(GenerateQueryUseCase);
    customerRepository = module.get(
      CustomerRepository,
    ) as jest.Mocked<CustomerRepository>;
    databaseConnectionRepository = module.get(
      DatabaseConnectionRepository,
    ) as jest.Mocked<DatabaseConnectionRepository>;
    llmModelRepository = module.get(
      LLMModelRepository,
    ) as jest.Mocked<LLMModelRepository>;
    llmProviderService = module.get(
      LLMProviderService,
    ) as jest.Mocked<LLMProviderService>;
  });

  it('should be defined', () => {
    expect(generateQueryUseCase).toBeDefined();
  });

  it('should generate a query successfully', async () => {
    const mockCustomer = new Customer('Test Customer');
    const mockDatabaseConnection = new DatabaseConnection(
      mockCustomer,
      'info',
      'username',
      'password',
      'host',
      3306,
      'databaseInfo',
    );
    const mockLLMModel = new LLMModel({ modelName: 'gpt' });
    const mockLLMProvider = {
      addDatabaseInfo: jest.fn(),
      generateQuery: jest
        .fn()
        .mockResolvedValue({ success: true, query: 'SELECT * FROM users' }),
    };

    customerRepository.findCustomerById.mockResolvedValue(mockCustomer);
    databaseConnectionRepository.findByCustomerId.mockResolvedValue(
      mockDatabaseConnection,
    );
    llmModelRepository.findActiveModel.mockResolvedValue(mockLLMModel);
    llmProviderService.getLLMProvider.mockResolvedValue(mockLLMProvider);

    const result = await generateQueryUseCase.execute('Get all users', 1);

    expect(result).toBe('SELECT * FROM users');
  });

  it('should throw an error if customer is not found', async () => {
    customerRepository.findCustomerById.mockResolvedValue(null);

    await expect(
      generateQueryUseCase.execute('Get all users', 1),
    ).rejects.toThrow('Customer not found');
  });

  it('should throw an error if database connection is not found', async () => {
    const mockCustomer = new Customer('Test Customer');
    customerRepository.findCustomerById.mockResolvedValue(mockCustomer);
    databaseConnectionRepository.findByCustomerId.mockResolvedValue(null);

    await expect(
      generateQueryUseCase.execute('Get all users', 1),
    ).rejects.toThrow('Database connection not found');
  });

  it('should throw an error if LLM model is not activated', async () => {
    const mockCustomer = new Customer('Test Customer');
    const mockDatabaseConnection = new DatabaseConnection(
      new Customer('Test Customer'),
      'info',
      'username',
      'password',
      'host',
      3306,
      'databaseInfo',
    );
    customerRepository.findCustomerById.mockResolvedValue(mockCustomer);
    databaseConnectionRepository.findByCustomerId.mockResolvedValue(
      mockDatabaseConnection,
    );
    llmModelRepository.findActiveModel.mockResolvedValue(null);

    await expect(
      generateQueryUseCase.execute('Get all users', 1),
    ).rejects.toThrow('LLM Provider not activated');
  });

  it('should throw an error if database info is not found', async () => {
    const mockCustomer = new Customer('Test Customer');
    const mockDatabaseConnection = new DatabaseConnection(
      new Customer('Test Customer'),
      'info',
      'username',
      'password',
      'host',
      3306,
      null,
    );
    const mockLLMModel = new LLMModel({ modelName: 'gpt' });
    const mockLLMProvider = {
      addDatabaseInfo: jest.fn(),
      generateQuery: jest.fn().mockResolvedValue({
        success: true,
        query: 'SELECT * FROM users',
      }),
    };

    customerRepository.findCustomerById.mockResolvedValue(mockCustomer);
    databaseConnectionRepository.findByCustomerId.mockResolvedValue(
      mockDatabaseConnection,
    );
    llmModelRepository.findActiveModel.mockResolvedValue(mockLLMModel);
    llmProviderService.getLLMProvider.mockResolvedValue(mockLLMProvider);

    await expect(
      generateQueryUseCase.execute('Get all users', 1),
    ).rejects.toThrow(
      'Database info not found, please generate database info first',
    );
  });

  it('should throw an error if query generation fails', async () => {
    const mockCustomer = new Customer('Test Customer');
    const mockDatabaseConnection = new DatabaseConnection(
      new Customer('Test Customer'),
      'info',
      'username',
      'password',
      'host',
      3306,
      'databaseInfo',
    );
    const mockLLMModel = new LLMModel({ modelName: 'gpt' });
    const mockLLMProvider = {
      addDatabaseInfo: jest.fn(),
      generateQuery: jest.fn().mockResolvedValue({
        success: false,
        error: 'Query generation failed',
      }),
    };

    customerRepository.findCustomerById.mockResolvedValue(mockCustomer);
    databaseConnectionRepository.findByCustomerId.mockResolvedValue(
      mockDatabaseConnection,
    );
    llmModelRepository.findActiveModel.mockResolvedValue(mockLLMModel);
    llmProviderService.getLLMProvider.mockResolvedValue(mockLLMProvider);

    await expect(
      generateQueryUseCase.execute('Get all users', 1),
    ).rejects.toThrow('Error generating query : Query generation failed');
  });
});
