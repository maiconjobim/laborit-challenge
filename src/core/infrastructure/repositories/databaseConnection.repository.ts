import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DatabaseConnection } from '../../domain/entities/databaseConection.entity';
import { DatabaseConnectionEntity } from '../database/schema';

@Injectable()
export class DatabaseConnectionRepository extends Repository<DatabaseConnection> {
  constructor(private dataSource: DataSource) {
    super(DatabaseConnectionEntity, dataSource.manager);
  }

  async findByCustomerId(customerId: number): Promise<DatabaseConnection> {
    return this.findOne({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }
}
