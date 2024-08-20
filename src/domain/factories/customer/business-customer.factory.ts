import { BusinessCustomer } from '../../entities/customer/business-customer.entity';
import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';

export abstract class BusinessCustomerFactory {
  static create(createCustomerDto: CreateCustomerDTO, managerId: string): BusinessCustomer {
    return new BusinessCustomer(createCustomerDto, managerId);
  }
}
