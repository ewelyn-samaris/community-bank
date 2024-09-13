import { Column, Entity } from 'typeorm';
import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';
import { CustomerType } from '../../enums/customer-type.enum';
import { Customer } from './customer.entity';
import { AccountManager } from '../functionary/account-manager.entity';

@Entity('personal_customers')
export class PersonalCustomer extends Customer {
  @Column({ type: 'enum', enum: CustomerType, default: CustomerType.PERSONAL })
  public type: CustomerType;

  constructor(createCustomerDto?: CreateCustomerDTO, manager?: AccountManager) {
    super(createCustomerDto, manager);
  }
}
