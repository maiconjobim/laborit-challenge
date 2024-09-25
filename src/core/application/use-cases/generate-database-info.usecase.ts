import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseConnectionRepository } from '../../infrastructure/repositories/databaseConnection.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class GenerateDatabaseInfoUseCase {
  constructor(
    private readonly databaseConnectionRepository: DatabaseConnectionRepository,
  ) {}

  async execute(databaseId: number): Promise<string> {
    const databaseConnection =
      await this.databaseConnectionRepository.findById(databaseId);

    if (!databaseConnection) {
      throw new NotFoundException('Database connection not found');
    }

    const dataSource = new DataSource({
      type: 'mysql',
      host: databaseConnection.host,
      port: databaseConnection.port,
      username: databaseConnection.username,
      password: databaseConnection.getPassword(),
      database: databaseConnection.databaseName,
    });

    const connection = await dataSource.initialize();

    const listOfDDL = await connection.query<{ ddl: string }[]>(`
      SELECT CONCAT('SHOW CREATE TABLE ', table_name, ';') AS ddl
      FROM information_schema.tables
      WHERE table_schema = '${databaseConnection.schema}'
      AND table_type = 'BASE TABLE';
    `);

    const databaseInfo = [];

    let i = 0;
    for (const row of listOfDDL) {
      if (i > 12) break;

      const result = await connection.query(row.ddl as any);
      databaseInfo.push(JSON.stringify(result));
      i++;
    }

    await connection.destroy();

    databaseConnection.addDatabaseInfo(databaseInfo.join('\n'));

    await this.databaseConnectionRepository.save(databaseConnection);

    return 'Database info generated';
  }
}
