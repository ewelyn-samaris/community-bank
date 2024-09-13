import { CustomerType } from '../../enums/customer-type.enum';
import { Customer } from './customer.entity';
import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';
import { Column, Entity } from 'typeorm';
import { AccountManager } from '../functionary/account-manager.entity';

@Entity('business_customers')
export class BusinessCustomer extends Customer {
  @Column({ type: 'enum', enum: CustomerType, default: CustomerType.BUSINESS })
  public type: CustomerType;

  constructor(createCustomerDto?: CreateCustomerDTO, manager?: AccountManager) {
    super(createCustomerDto, manager);
  }
}
