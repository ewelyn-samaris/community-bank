import { PersonalCustomer } from '../../entities/customer/personal-customer.entity';
import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';
import { AccountManager } from '../../entities/functionary/account-manager.entity';

export abstract class PersonalCustomerFactory {
  static create(createCustomerDto: CreateCustomerDTO, manager: AccountManager): PersonalCustomer {
    return new PersonalCustomer(createCustomerDto, manager);
  }
}
