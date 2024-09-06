import { PersonalCustomer } from '../../entities/customer/personal-customer.entity';
import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';

export abstract class PersonalCustomerFactory {
  static create(createCustomerDto: CreateCustomerDTO, managerId: string): PersonalCustomer {
    return new PersonalCustomer(createCustomerDto, managerId);
  }
}
