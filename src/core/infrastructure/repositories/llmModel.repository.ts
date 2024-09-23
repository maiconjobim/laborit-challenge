import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LLMModel } from '../../domain/entities/llmModel.entity';
import { LLMModelEntity } from '../database/schema';

@Injectable()
export class LLMModelRepository extends Repository<LLMModel> {
  constructor(private dataSource: DataSource) {
    super(LLMModelEntity, dataSource.manager);
  }

  async findActiveModel(): Promise<LLMModel> {
    return this.findOne({
      where: { isActive: true },
    });
  }

  async findById(id: number): Promise<LLMModel | null> {
    return this.findOne({
      where: { id },
    });
  }
}
