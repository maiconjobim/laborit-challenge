import { Customer } from './customer.entity';

export class DatabaseConnection {
  id: number;

  customer: Customer;

  host: string;

  port: number = 3306;

  username: string;

  private password: string;

  databaseName: string;

  schema: string;

  databaseInfo?: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(
    customer: Customer,
    host: string,
    username: string,
    password: string,
    databaseName: string,
    port?: number,
    databaseInfo?: string,
  ) {
    this.customer = customer;
    this.host = host;
    this.username = username;
    this.password = password;
    this.databaseName = databaseName;
    if (port) this.port = port;
    if (databaseInfo) this.databaseInfo = databaseInfo;
  }

  getPassword(): string {
    return this.password;
  }

  addDatabaseInfo(databaseInfo: string): void {
    this.databaseInfo = databaseInfo;
  }
}
