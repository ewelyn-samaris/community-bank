import { CreateCustomerDTO } from '../../../application/dtos/create-customer.dto';
import { BusinessCustomerFactory } from './business-customer.factory';
import { PersonalCustomerFactory } from './personal-customer.factory';
import { NationalIdentifierLengths } from '../../enums/national-identifier-lengths.enum';
import { Customer } from '../../entities/customer/customer.entity';
import { InternalServerErrorException } from '@nestjs/common';

export abstract class CustomerFactory {
  static create(createCustomerDto: CreateCustomerDTO, managerId: string): Customer {
    try {
      const customerFactories = {
        [NationalIdentifierLengths.CPF]: PersonalCustomerFactory,
        [NationalIdentifierLengths.CNPJ]: BusinessCustomerFactory,
      };

      const customerFactory = customerFactories[createCustomerDto.nationalIdentifier.length];
      return customerFactory.create(createCustomerDto, managerId);
    } catch (error) {
      throw new InternalServerErrorException(`Can't create customer. Internal server error: ${error}`);
    }
  }
}
