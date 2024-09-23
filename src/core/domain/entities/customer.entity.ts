import { DatabaseConnection } from './databaseConection.entity';
import { Query } from './query.entity';

export class Customer {
  id: number;
  name: string;
  registrationDate: Date;
  connections: DatabaseConnection[] = [];
  queries: Query[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
