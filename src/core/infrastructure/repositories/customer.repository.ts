import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../database/schema';
import { Customer } from '../../domain/entities/customer.entity';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private dataSource: DataSource) {
    super(CustomerEntity, dataSource.manager);
  }

  async createCustomer(customer: Customer): Promise<Customer> {
    return this.save(customer);
  }

  async findCustomerById(id: number): Promise<Customer | undefined> {
    return this.findOne({ where: { id } });
  }

  async findAllCustomers(): Promise<Customer[]> {
    return this.find();
  }

  async updateCustomer(
    id: number,
    partialCustomer: Partial<Customer>,
  ): Promise<Customer | undefined> {
    await this.update(id, partialCustomer);
    return this.findOne({ where: { id } });
  }

  async deleteCustomer(id: number): Promise<void> {
    await this.delete(id);
  }
}
