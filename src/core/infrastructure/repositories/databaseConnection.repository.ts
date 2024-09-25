import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DatabaseConnection } from '../../domain/entities/databaseConection.entity';
import { DatabaseConnectionEntity } from '../database/schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DatabaseConnectionRepository extends Repository<DatabaseConnection> {
  constructor(private dataSource: DataSource) {
    super(
      DatabaseConnectionEntity,
      dataSource.manager,
      dataSource.manager.queryRunner,
    );
  }

  async findByCustomerId(customerId: number): Promise<DatabaseConnection> {
    return this.findOne({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }

  async findById(id: number): Promise<DatabaseConnection> {
    const result = await this.findOneBy({
      id,
    });
    return plainToInstance(DatabaseConnection, result);
  }
}
