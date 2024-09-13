import { BusinessCustomer } from '../../entities/customer/business-customer.entity';
import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';
import { AccountManager } from '../../entities/functionary/account-manager.entity';

export abstract class BusinessCustomerFactory {
  static create(createCustomerDto: CreateCustomerDTO, manager: AccountManager): BusinessCustomer {
    return new BusinessCustomer(createCustomerDto, manager);
  }
}
