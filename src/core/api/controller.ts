import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { GenerateQueryUseCase } from '../application/use-cases/generate-query.usecase';
import { GenerateDatabaseInfoUseCase } from '../application/use-cases/generate-database-info.usecase';

@ApiTags('core')
@Controller('core')
export class CoreController {
  constructor(
    private readonly generateQueryUseCase: GenerateQueryUseCase,
    private readonly generateDatabaseInfoUseCase: GenerateDatabaseInfoUseCase,
  ) {}

  @Post(':customerId/generate-query')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
        },
      },
    },
  })
  async generateQuery(
    @Param('customerId') customerId: string,
    @Body('question') question: string,
  ) {
    return this.generateQueryUseCase.execute(question, parseInt(customerId));
  }

  @Post(':databaseId/generate-databaseInfo')
  async generateDatabaseInfo(@Param('databaseId') databaseId: string) {
    return this.generateDatabaseInfoUseCase.execute(parseInt(databaseId));
  }
}
