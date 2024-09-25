import { DatabaseConnection } from './databaseConection.entity';
import { Query } from './query.entity';

export class Customer {
  id: number;
  name: string;
  connections: DatabaseConnection[] = [];
  queries: Query[] = [];

  createdAt: Date;
  updatedAt: Date;

  constructor(name: string) {
    this.name = name;
  }
}
