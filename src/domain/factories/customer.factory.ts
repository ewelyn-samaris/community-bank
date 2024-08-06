import { CreateCustomerDTO } from '../../application/dtos/create-customer.dto';
import { Customer } from '../entities/customer.entity';

export abstract class CustomerFactory {
  static create(createCustomerDto: CreateCustomerDTO, managerId: string): Customer {
    return new Customer(createCustomerDto, managerId);
  }
}
