import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';
import { CustomerType } from '../../enums/customer-type.enum';
import { Customer } from './customer.entity';

export class PersonalCustomer extends Customer {
  static personalCustomers: PersonalCustomer[] = [];
  public type: CustomerType;

  constructor(createCustomerDto: CreateCustomerDTO, managerId: string) {
    super(createCustomerDto, managerId);
    this.type = CustomerType.PERSONAL;
    PersonalCustomer.personalCustomers.push(this);
  }
}
