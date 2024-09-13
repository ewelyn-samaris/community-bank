import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';
import { BusinessCustomerFactory } from './business-customer.factory';
import { PersonalCustomerFactory } from './personal-customer.factory';
import { NationalIdentifierLengths } from '../../enums/national-identifier-lengths.enum';
import { Customer } from '../../entities/customer/customer.entity';
import { AccountManager } from '../../entities/functionary/account-manager.entity';

export abstract class CustomerFactory {
  static create(createCustomerDto: CreateCustomerDTO, manager: AccountManager): Customer {
    const customerFactories = {
      [NationalIdentifierLengths.CPF]: PersonalCustomerFactory,
      [NationalIdentifierLengths.CNPJ]: BusinessCustomerFactory,
    };

    const customerFactory = customerFactories[createCustomerDto.nationalIdentifier.length];
    return customerFactory.create(createCustomerDto, manager);
  }
}
