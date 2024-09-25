import { Customer } from './customer.entity';

export class Query {
  id: number;

  customer: Customer;

  question: string;

  generatedSql: string;

  queryDate: Date;

  modelName?: string;

  result?: any;

  createdAt: Date;

  updatedAt: Date;

  constructor(
    customer: Customer,
    question: string,
    generatedSql: string,
    queryDate: Date,
    modelName?: string,
    result?: any,
  ) {
    this.customer = customer;
    this.question = question;
    this.generatedSql = generatedSql;
    this.queryDate = queryDate;
    this.result = result;
    this.modelName = modelName;
  }
}
