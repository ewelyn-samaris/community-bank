import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalCustomer } from '../../domain/entities/customer/personal-customer.entity';
import { ICustomerRepository } from '../interfaces/customer-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PersonalCustomerRepository implements ICustomerRepository<PersonalCustomer> {
  constructor(
    @InjectRepository(PersonalCustomer)
    private readonly iPersonalCutomerRepository: Repository<PersonalCustomer>,
  ) {}

  async save(personalCustomer: PersonalCustomer): Promise<PersonalCustomer> {
    return await this.iPersonalCutomerRepository.save(personalCustomer);
  }

  async findAll(): Promise<PersonalCustomer[]> {
    return await this.iPersonalCutomerRepository.find();
  }

  async findOneByNationalIdentifier(nationalIdentifier: string): Promise<PersonalCustomer> {
    return await this.iPersonalCutomerRepository.findOne({ where: { nationalIdentifier } });
  }

  async findOneById(id: string): Promise<PersonalCustomer> {
    return await this.iPersonalCutomerRepository.findOne({ where: { id } });
  }

  async softRemove(customer: PersonalCustomer): Promise<void> {
    await this.iPersonalCutomerRepository.softRemove(customer);
  }
}
