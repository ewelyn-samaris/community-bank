import { CustomerType } from '../../enums/customer-type.enum';
import { Customer } from './customer.entity';
import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';

export class BusinessCustomer extends Customer {
  static businessCustomers: BusinessCustomer[] = [];
  public type: CustomerType;

  constructor(createCustomerDto: CreateCustomerDTO, managerId: string) {
    super(createCustomerDto, managerId);
    this.type = CustomerType.BUSINESS;

    BusinessCustomer.businessCustomers.push(this);
  }
}
