import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CoreService } from '../application/core.service';
import { Customer } from '../domain/entities/customer.entity';
import { GenerateQueryUseCase } from '../application/use-cases/generate-query.usecase';

@ApiTags('core')
@Controller('core')
export class CoreController {
  constructor(
    private readonly coreService: CoreService,
    private readonly generateQueryUseCase: GenerateQueryUseCase,
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
}
