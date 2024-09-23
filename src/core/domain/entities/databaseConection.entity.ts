import { Customer } from './customer.entity';

export class DatabaseConnection {
  connectionId: number;

  customer: Customer;

  host: string;

  port: number = 3306;

  username: string;

  private password: string;

  databaseName: string;

  creationDate: Date;

  databaseInfo?: string;

  constructor(
    connectionId: number,
    customer: Customer,
    host: string,
    username: string,
    password: string,
    databaseName: string,
    creationDate: Date,
    port?: number,
    databaseInfo?: string,
  ) {
    this.connectionId = connectionId;
    this.customer = customer;
    this.host = host;
    this.username = username;
    this.password = password;
    this.databaseName = databaseName;
    this.creationDate = creationDate;
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
