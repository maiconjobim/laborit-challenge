import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { QueryEntity } from '../database/schema';
import { Query } from '../../domain/entities/query.entity';

@Injectable()
export class QueryRepository extends Repository<Query> {
  constructor(private dataSource: DataSource) {
    super(QueryEntity, dataSource.manager);
  }

  async createQuery(query: Query): Promise<Query> {
    return this.save(query);
  }

  async findQueryById(id: number): Promise<Query | undefined> {
    return this.findOne({ where: { id } });
  }

  async findQueriesByCustomerId(customerId: number): Promise<Query[]> {
    return this.find({ where: { customer: { id: customerId } } });
  }

  async updateQuery(
    id: number,
    partialQuery: Partial<Query>,
  ): Promise<Query | undefined> {
    await this.update(id, partialQuery);
    return this.findOne({ where: { id } });
  }

  async deleteQuery(id: number): Promise<void> {
    await this.delete(id);
  }
}
