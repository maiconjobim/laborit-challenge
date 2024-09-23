import { Injectable } from '@nestjs/common';
import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepository } from '../infrastructure/repositories/customer.repository';
@Injectable()
export class CoreService {
  constructor(private customerRepository: CustomerRepository) {}

  async createCustomer(name: string): Promise<Customer> {
    const customer = new Customer(name);
    return this.customerRepository.createCustomer(customer);
  }
}
